import { equal } from 'assert';

import { ProcessCommand } from '../src/util/Command.util';
import { Log } from '../src/util/Log.util';
import { Sleep } from '../src/util/Sleep.util';

describe('Util Function Tests', () => {
    it('Should run the process command with no errors', () => {
        const Solarweave = {
            rpc_version: `2.0`,
            database: 'solarweave-devnet',
            url: `https://devnet.solana.com`,
            credentials: `.arweave.creds.json`,
            local: false,
            localFile: `solarweave.cache.json`,
            console: true,
            uncompressed: true,
            parallelize: 1,
            benchmark: false,
            noverify: true,
        };

        ProcessCommand(Solarweave);
    });

    it('Should log to console with no errors', () => {
        Log('');
    });

    it ('Should sleep for 500ms with no errors', async () => {
        await Sleep(500);
    });
});