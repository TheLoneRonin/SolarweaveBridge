import { GenesisHash } from '../src/service/Solana.rpc.service';
import { equal } from 'assert';

describe('Solana RPC Service Test', () => {
    it('Should retrieve the Genesis Hash', async () => {
        const payload = await GenesisHash();
        equal(payload.body.result.length > 0, true);
    });
});