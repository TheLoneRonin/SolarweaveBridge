import Arweave = require('arweave');
import { equal } from 'assert';
import { SolarweaveConfig } from '../src/Config';
import { ArweaveTransaction } from '../src/interface/Arweave.interface';
import { LoadWallet, GetBalance, SubmitBlockToArweave, CreateBlockIndices, RetrieveBlockBySlot, RetrieveBlockByBlockhash } from '../src/service/Arweave.service';

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

    it('Should retrieve a block by slot number', async () => {
        const Block = await RetrieveBlockBySlot(slot);
        SampleBlock = JSON.parse(Block);

        equal(Block !== null, true);
    });

    it('Should retrieve a block by blockhash', async () => {
        const Block = await RetrieveBlockByBlockhash(blockhash);
        
        equal(Block !== null, true);
    });

    it('Should create the appropriate block indices for a new transaction', async () => {
        equal(SampleBlock !== null, true);
        console.log('Sample Block', SampleBlock);
        
        const key = await LoadWallet();
        equal(key !== null, true);

        const transaction: ArweaveTransaction = PrepareTransaction(SampleBlock, slot);

        let tx = await arweave.createTransaction({ data: JSON.stringify(SampleBlock) }, key);

        tx = await CreateBlockIndices(key, tx, transaction);
    });

    it('Should submit a block to Arweave', async () => {
        equal(SampleBlock !== null, true);
        
        const key = await LoadWallet();
        equal(key !== null, true);

        const transaction: ArweaveTransaction = PrepareTransaction(SampleBlock, slot);

        await SubmitBlockToArweave(transaction);
    });
});