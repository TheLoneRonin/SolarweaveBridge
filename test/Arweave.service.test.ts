import Arweave = require('arweave');
import { equal } from 'assert';
import { SolarweaveConfig } from '../src/Config';
import { ArweaveTransaction } from '../src/interface/Arweave.interface';
import { LoadWallet, GetBalance, SubmitBlocksToArweave } from '../src/service/Arweave.service';

export const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
});

function PrepareTransaction(Block, Slot) {
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

    return transaction;
}

describe('Arweave Service Tests', () => {
    const slot = 1025219;
    const blockhash = '34zRbXQZktKRZarTzP6NHVFncyw8LqHtat8sXd7rwWUb';
    let SampleBlock = null;

    it('Should load the default wallet', async () => {
        const key = await LoadWallet();
        equal(key !== null, true);
    });

    it('Should get the appropriate address and balance', async () => {
        const { address, balance } = await GetBalance();

        equal(typeof address, 'string');
        equal(address.length > 1, true);

        equal(isNaN(Number(balance)), false);
        equal(Number(balance) > -1, true);
    });

    it('Should submit a block to Arweave', async () => {
        equal(SampleBlock !== null, true);
        
        const key = await LoadWallet();
        equal(key !== null, true);

        const transaction: ArweaveTransaction = PrepareTransaction(SampleBlock, slot);

        await SubmitBlocksToArweave([transaction]);
    });
});