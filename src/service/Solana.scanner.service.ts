
import { read, write } from 'fs-jetpack';
import { SolarweaveConfig } from '../Config';
import { Log } from '../util/Log.util';
import { Sleep } from '../util/Sleep.util';
import { LogBenchmark } from '../util/Benchmark.util';
import { ArweaveTransaction } from '../interface/Arweave.interface';
import { SubmitBlocksToArweave } from './Arweave.service';
import { RetrieveBlockhash, RetrieveSlot } from './ARQL.service';
import { GetSlot, GetBlock, GetBlocks } from './Solana.rpc.service';

export async function GetLatestBlock() {
    const slotPayload = await GetSlot();
    const slot: number = slotPayload.body.result;

    const blockPayload = await GetBlock(slot);
    const block = blockPayload.body.result;

    return block;
}

export async function AddBlocksToCache(Blocks, type: string = 'standard'): Promise<string> {
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
                    if (await RetrieveBlockhash(Block.blockhash, type === 'standard' ? SolarweaveConfig.database : SolarweaveConfig.database + '-index')) {
                        return (`Block #${Block.parentSlot + 1} ${Block.blockhash} has already been cached ${type === 'index' ? 'to the index database' : ''}`.yellow);
                    }
                }
    
                const transaction: ArweaveTransaction = {
                    tags: {
                        database: SolarweaveConfig.database + (type === 'index' ? '-index' : ''),
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

            SubmitBlocksToArweave(transactions, type);
        }

        LogBenchmark('cache_block');
        
        return null;
    } catch (error) {
        return (error.message);
    }
}

export async function CacheBlocks(Slots: Array<number>, type: string = 'standard') {
    const Blocks = [];
    const Result = await GetBlocks(Slots);

    for (let i = 0; i < Result.body.length; i++) {
        const Item = Result.body[i];
        const Block = Item.result;
        const Slot = Item.id;

        Blocks.push({ Block, Slot });
    }
    
    if (Blocks.length > 0) {
        const Error: string = await AddBlocksToCache(Blocks, type);
        if (Error) { Log(Error) }
    } else {
        Log(`Solarweave is now in sync with the latest block`.yellow);
    }
}