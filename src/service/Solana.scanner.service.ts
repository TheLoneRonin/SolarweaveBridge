
import { remove, read, write } from 'fs-jetpack';
import { SolarweaveConfig } from '../Config';
import { Log } from '../util/Log.util';
import { ArweaveTransaction } from '../interface/Arweave.interface';
import { SubmitBlockToArweave, RetrieveBlockByBlockhash } from '../service/Arweave.service';
import { GetSlot, GetBlock } from './Solana.rpc.service';

export async function GetLatestBlock() {
    const slotPayload = await GetSlot();
    const slot: number = slotPayload.body.result;

    const blockPayload = await GetBlock(slot);
    const block = blockPayload.body.result;

    return block;
}

export async function AddBlockToCache(Block, Slot: number): Promise<Error> {
    try {
        if (SolarweaveConfig.local) {
            const File = read(SolarweaveConfig.localFile);
            const Data = File ? JSON.parse(File) : [];
    
            if (SolarweaveConfig.verify) {
                if (Data.filter(block => block.blockhash === Block.blockhash).length > 0) {
                    return new Error(`Block #${Block.parentSlot + 1} ${Block.blockhash} has already been cached`.yellow);
                }
            }
            
            Data.unshift(Block);
            write(SolarweaveConfig.localFile, JSON.stringify(Data, null, 2));

            Log(`Locally Cached Solana Block with Parent Slot `.green + `#${Block.parentSlot}`.green.bold);
            Log(`Block Hash: `.green + `${Block.blockhash}\n`.green.bold);    
        } else {
            if (SolarweaveConfig.verify) {
                if (await RetrieveBlockByBlockhash(Block.blockhash)) {
                    return new Error(`Block #${Block.parentSlot + 1} ${Block.blockhash} has already been cached`.yellow);
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

            await SubmitBlockToArweave(transaction);
        }
        
        return null;
    } catch (error) {
        return new Error(error);
    }
}

export async function CacheBlock(Slot) {
    const blockPayload = await GetBlock(Slot);
    const Block = blockPayload.body.result;

    if (Block.blockhash) {
        const Error: Error = await AddBlockToCache(Block, Slot);
        if (Error) { Log(Error) }
    } else {
        Log(`Solarweave is now in sync with the latest block`.yellow);
    }
}