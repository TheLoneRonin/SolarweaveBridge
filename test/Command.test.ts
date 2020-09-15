import 'colors';
import { Balance } from '../src/command/Balance.command';
import { Cache } from '../src/command/Cache.command';
import { LatestBlock } from '../src/command/Latest.command';
import { Livestream } from '../src/command/Livestream.command';

describe('CLI Command Tests', () => {
    it('Should retrieve the balance from the default wallet', async () => {
        await Balance();
    });

    it('Retrieve the latest block', async () => {
        await LatestBlock();
    });
});