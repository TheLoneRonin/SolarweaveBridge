import { GenesisHash, GetSlot, GetBlock } from '../src/service/Solana.rpc.service';
import { equal } from 'assert';

describe('Solana Base RPC Service Test', () => {
    it('Should retrieve the Genesis Hash', async () => {
        const payload = await GenesisHash();
        equal(payload.body.result.length > 0, true);
    });

    it('Should retrieve the Current Slot', async () => {
        const payload = await GetSlot();

        equal(typeof payload.body.result, 'number');
        equal(payload.body.result > 0, true);
    });

    it('Should retrieve the Latest Block', async () => {
        const slotPayload = await GetSlot();
        const slot: number = slotPayload.body.result;
        
        const blockPayload = await GetBlock(slot);
        const hash = blockPayload.body.result.blockhash;

        equal(typeof hash, 'string');
    });
});

describe('Solana Block Traversal Test', async () => {
    const blocks = [];

    it('Retrieve the latest 4 blocks', async () => {
        const slotPayload = await GetSlot();
        const slot: number = slotPayload.body.result;

        for (let i = 0; i < 4; i++) {
            const blockPayload = await GetBlock(slot - i);
            const block = blockPayload.body.result;

            equal(typeof block.blockhash, 'string');
            blocks.unshift(block);
        }
    });

    it('Previous block hashes match', async () => {
        for (let i = 1; i < blocks.length; i++) {
            const previousBlock = blocks[i - 1];
            const block = blocks[i];

            equal(block.previousBlockhash, previousBlock.blockhash);
        }
    });
});