
import { read, write } from 'fs-jetpack';
import { SolarweaveConfig } from '../Config';
import { Log } from '../util/Log.util';
import { LogBenchmark } from '../util/Benchmark.util';
import { ArweaveTransaction } from '../interface/Arweave.interface';
import { SubmitBlockToArweave } from './Arweave.service';
import { RetrieveBlockhash } from './ARQL.service';
import { GetSlot, GetBlock } from './Solana.rpc.service';

export async function GetLatestBlock() {
    const slotPayload = await GetSlot();
    const slot: number = slotPayload.body.result;

    const blockPayload = await GetBlock(slot);
    const block = blockPayload.body.result;

    return block;
}

export async function AddBlockToCache(Blocks): Promise<string> {
    try {
        if (SolarweaveConfig.local) {
            const File = read(SolarweaveConfig.localFile);
            const Data = File ? JSON.parse(File) : [];
            
            for (let i = 0; i < Blocks.length; i++) {
                const Block = Blocks[i].Block;

                if (SolarweaveConfig.verify) {
                    if (Data.filter(block => block.blockhash === Block.blockhash).length > 0) {
                        return (`Block #${Block.parentSlot + 1} ${Block.blockhash} has already been cached`.yellow);
                    }
                }
                
                Data.unshift(Block);
                write(SolarweaveConfig.localFile, JSON.stringify(Data, null, 2));
    
                Log(`Locally Cached Solana Block with Parent Slot `.green + `#${Block.parentSlot}`.green.bold);
                Log(`Block Hash: `.green + `${Block.blockhash}\n`.green.bold);  
            }  
        } else {
            const transactions: ArweaveTransaction[] = [];

            for (let i = 0; i < Blocks.length; i++) {
                const Block = Blocks[i].Block;
                const Slot = Blocks[i].Slot;

                if (SolarweaveConfig.verify) {
                    if (await RetrieveBlockhash(Block.blockhash)) {
                        return (`Block #${Block.parentSlot + 1} ${Block.blockhash} has already been cached`.yellow);
                    }
                }
    
                const transaction: ArweaveTransaction = {
                    tags: {
                        database: SolarweaveConfig.database,
                        
                        parentSlot: Block.parentSlot.toString(),
                        slot: Slot.toString(),
                        blockhash: Block.blockhash,
    
                        transactions: [],
                    },
    
                    payload: Block,
                };
    
                for (let i = 0; i < Block.transactions.length; i++) {
                    const tx = Block.transactions[i];
    
                    transaction.tags.transactions.push({
                        signatures: tx.transaction.signatures,
                        accountKeys: tx.transaction.message.accountKeys,
                        programIdIndex: tx.transaction.message.instructions.map(instruction => instruction.programIdIndex),
    
                        numReadonlySignedAccounts: tx.transaction.message.header.numReadonlySignedAccounts,
                        numReadonlyUnsignedAccounts: tx.transaction.message.header.numReadonlyUnsignedAccounts,
                        numRequiredSignatures: tx.transaction.message.header.numRequiredSignatures,
                    })
                }

                transactions.push(transaction);
            }

            await SubmitBlockToArweave(transactions);
        }

        LogBenchmark('cache_block');
        
        return null;
    } catch (error) {
        return (error.message);
    }
}

export async function CacheBlocks(Slots: Array<number>) {
    const Blocks = [];
    for (let i = 0; i < Slots.length; i++) {
        const Slot = Slots[i];
        const blockPayload = await GetBlock(Slot);
        const Block = blockPayload.body.result;

        if (!Block) {
            Log(`Solarweave could not retrieve the block data for ${Slot}. Please double check that your validator has all slots available.`.red);
        } else {
            Blocks.push({ Block, Slot });
        }        
    }    

    if (Blocks.length > 0) {
        const Error: string = await AddBlockToCache(Blocks);
        if (Error) { Log(Error) }
    } else {
        Log(`Solarweave is now in sync with the latest block`.yellow);
    }
}