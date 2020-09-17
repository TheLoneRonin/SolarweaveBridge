import { and, equals } from 'arql-ops';

import { SolarweaveConfig, arweave } from '../Config';
import { CompressBlock, DecompressBlock } from '../service/Compression.service';

export async function ParsePayload(data) {
    let isBase64 = false;
    let payload = null;

    try {
        payload = JSON.parse(data.toString());
    } catch (error) {
        isBase64 = true;
    }

    if (isBase64) {
        payload = await DecompressBlock(data.toString());
    }

    return payload;
}

export async function RetrieveBlockBySlot(slot: number, database: string = `${SolarweaveConfig.database}`) {
    const txs = await arweave.arql(
        and(
            equals('database', database),
            equals('slot', slot.toString()),
        ),
    );
    
    if (txs.length > 0) {
        const data = await arweave.transactions.getData(txs[0], { decode: true, string: true });
        return await ParsePayload(data);
    } else {
        return null;
    }
}

export async function RetrieveBlockByBlockhash(blockhash: string, database: string = `${SolarweaveConfig.database}`) {
    const txs = await arweave.arql(
        and(
            equals('database', database),
            equals('blockhash', blockhash),
        ),
    );

    if (txs.length > 0) {
        try {
            const metadata = await arweave.transactions.get(txs[0]);
            metadata.get('tags').forEach(tag => {
                const key = tag.get('name', { decode: true, string: true });
                const value = tag.get('value', { decode: true, string: true });

                console.log(key, value);
            });
        } catch (error) {
            console.log(error);
        }

        const data = await arweave.transactions.getData(txs[0], { decode: true, string: true });
        return await ParsePayload(data);
    } else {
        return null;
    }
}

export async function RetrieveBlocksFromAccount(accountKey: string, database: string = `${SolarweaveConfig.database}-index`) {
    const txs = await arweave.arql(
        and(
            equals('database', database),
            equals('accountKey', accountKey),
        ),
    );

    return txs;
}

export async function RetrieveBlocksFromSignature(signature: string, database: string = `${SolarweaveConfig.database}-index`) {
    const txs = await arweave.arql(
        and(
            equals('database', database),
            equals('signature', signature),
        ),
    );

    return txs;
}

export async function RetrieveBlockData(arweaveTxId: string) {
    const data = {
        database: '',
        slot: '',
        parentSlot: '',
        accountKey: '',
        blockhash: '',
        defaultSignature: '',
    };

    const metadata = await arweave.transactions.get(arweaveTxId);

    metadata.get('tags').forEach(tag => {
        const key = tag.get('name', { decode: true, string: true });
        const value = tag.get('value', { decode: true, string: true });

        data[key] = value;
    });

    return data;
}