import zlib from 'zlib';

export async function CompressBlock(Block): Promise<string> {
    const buffer = Buffer.from(JSON.stringify(Block), 'utf-8');

    const compressed = zlib.deflateSync(buffer, { level: 9 });
    const compressedString = compressed.toString('base64');

    return compressedString;
}

export async function DecompressBlock(Block64): Promise<any> {
    const uncompressed = zlib.inflateSync(Buffer.from(Block64.toString(), 'base64'));
    const data = JSON.parse(uncompressed.toString());

    return data;
}