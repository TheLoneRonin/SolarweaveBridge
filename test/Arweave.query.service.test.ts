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

describe('Arweave Query Service Test', () => {
    const block = '1025219';
    const sig = '38ZjmF6c68Psp3ABYWw6RoDk7zxaKctqAiE1vYeDUqBHgSuX7wer8cutaFLiAxdpRUCrYdmDqo93Y8nP9PzgiSj9';
    const key = 'dv1LfzJvDF7S1fBKpFgKoKXK5yoSosmkAdfbxBo1GqJ';

    it('Should retrieve Block #1025219 from the database', async () => {
        const txs = await arweave.arql(
            and(
                equals('database', 'solarweave-devnet'),
                equals('slot', block),
            ),
        );

        const dataString = await arweave.transactions.getData(txs[0], { decode: true, string: true });
        const data = JSON.parse(dataString.toString());
    });

    it('Should retrieve the first block found from the "dv1LfzJvDF7S1fBKpFgKoKXK5yoSosmkAdfbxBo1GqJ" account key', async () => {
        const txs = await arweave.arql(
            and(
                equals('database', 'solarweave-devnet-index'),
                equals('accountKey', key),
            ),
        );

        console.log(`A total of ${txs.length} found with the dv1LfzJvDF7S1fBKpFgKoKXK5yoSosmkAdfbxBo1GqJ: address`);

        const blockhash = await arweave.transactions.getData(txs[0], { decode: true, string: true });

        const txBlock = await arweave.arql(
            and(
                equals('database', 'solarweave-devnet'),
                equals('blockhash', blockhash.toString()),
            ),
        );

        const dataString = await arweave.transactions.getData(txBlock[0], { decode: true, string: true });
        const data = JSON.parse(dataString.toString());

        console.log('Retrieved the first block', data);
    });

    it('Should retrieve the block with the "38ZjmF6c68Psp3ABYWw6RoDk7zxaKctqAiE1vYeDUqBHgSuX7wer8cutaFLiAxdpRUCrYdmDqo93Y8nP9PzgiSj9" signature', async () => {
        const txs = await arweave.arql(
            and(
                equals('database', 'solarweave-devnet-index'),
                equals('signature', sig),
            ),
        );

        console.log(`A total of ${txs.length} found with the signature: 38ZjmF6c68Psp3ABYWw6RoDk7zxaKctqAiE1vYeDUqBHgSuX7wer8cutaFLiAxdpRUCrYdmDqo93Y8nP9PzgiSj9`);

        const blockhash = await arweave.transactions.getData(txs[0], { decode: true, string: true });

        const txBlock = await arweave.arql(
            and(
                equals('database', 'solarweave-devnet'),
                equals('blockhash', blockhash.toString()),
            ),
        );

        const dataString = await arweave.transactions.getData(txBlock[0], { decode: true, string: true });
        const data = JSON.parse(dataString.toString());

        console.log('Retrieved the associated block', data);
    });
});