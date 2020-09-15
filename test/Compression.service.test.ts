import { equal } from 'assert';
import { CompressBlock, DecompressBlock } from '../src/service/Compression.service';

describe('Compression Service Tests', () => {
    it('Should compress a sample JSON object', async () => {
        const data = await CompressBlock({ example: 'hello world' });
        equal(typeof data, 'string');
    });

    it('Should compress and decompress a sample JSON object', async () => {
        const data = await CompressBlock({ example: 'hello world' });
        equal(typeof data, 'string');

        const parsed = await DecompressBlock(data);
        equal(parsed.example, 'hello world');
    });
});