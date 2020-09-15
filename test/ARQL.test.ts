import Arweave = require('arweave');
import { equal } from 'assert';
import { and, equals } from 'arql-ops';

export const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
});

describe('ARQL Tests', () => {
    const block = '1025219';

    it('Should retrieve Block #1025219 from the database', async () => {
        const txs = await arweave.arql(
            and(
                equals('database', 'solarweave-devnet'),
                equals('slot', block),
            ),
        );

        const dataString = await arweave.transactions.getData(txs[0], { decode: true, string: true });
        equal(typeof dataString, 'string');
    });

    it('Should retrieve the first block found from the Solarweave Database', async () => {
        const txs = await arweave.arql(
            and(
                equals('database', 'solarweave-devnet'),
            ),
        );

        const dataString = await arweave.transactions.getData(txs[0], { decode: true, string: true });
        equal(typeof dataString, 'string');
    });
});