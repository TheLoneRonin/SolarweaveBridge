import snappy from 'snappyjs';

export async function CompressBlock(Block): Promise<string> {
    const buffer = Buffer.from(JSON.stringify(Block), 'utf-8');

    const compressed = snappy.compress(buffer);
    const compressedString = compressed.toString('base64');

    return compressedString;
}

export async function DecompressBlock(Block64): Promise<any> {
    const uncompressed = snappy.uncompress(Buffer.from(Block64, 'base64'));
    const data = JSON.parse(uncompressed.toString());

    return data;
}