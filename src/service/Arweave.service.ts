import Transaction from 'arweave/node/lib/transaction';
import { read } from 'fs-jetpack';

import { SolarweaveConfig, arweave, ArData } from '../Config';
import { Log } from '../util/Log.util';
import { ArweaveTransaction } from '../interface/Arweave.interface';
import { CompressBlock } from '../service/Compression.service';

export const NONCE = `170A240D55E8D4A96647180DEE407C28D5388DF5653895859B4C76B6D5D99DD7`;

export async function LoadWallet() {
    const key = JSON.parse(read(SolarweaveConfig.credentials));
    return key;
}

export async function GetBalance() {
    const key = await LoadWallet();

    const address = await arweave.wallets.jwkToAddress(key);
    const balance = await arweave.wallets.getBalance(address);

    return { address, balance };
}

export async function SubmitBlockToArweave(transactions: ArweaveTransaction[]) {
    const key = await LoadWallet();

    let bundles = [];

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];

        const bundledItem = await BundleItem(transaction, key);
        const bundledIndices = SolarweaveConfig.index ? await BundleIndices(transaction, key) : [];

        bundles = bundles.concat(bundledItem, bundledIndices);
    }

    const data = await ArData.bundleData(bundles);

    let tx = await arweave.createTransaction({ data: JSON.stringify(data) }, key);

    tx.addTag('Bundle-Type', 'ANS-102');
    tx.addTag('Bundle-Format', 'json');
    tx.addTag('Bundle-Version', '1.0.0');
    tx.addTag('Content-Type', 'application/json');

    await arweave.transactions.sign(tx, key);
    await arweave.transactions.post(tx);

    Log(`Transmitted Solana Blocks with the Slots ${transactions.map(t => t.tags.slot)} to Arweave\n`.green);
    return true;
}

export async function BundleItem(transaction: ArweaveTransaction, key) {
    const address = await arweave.wallets.jwkToAddress(key);
    const data = SolarweaveConfig.compressed ? await CompressBlock(JSON.stringify(transaction.payload)) : JSON.stringify(transaction.payload);

    const tags = [
        { name: 'database', value: transaction.tags.database },
        { name: 'parentSlot', value: transaction.tags.parentSlot },
        { name: 'slot', value: transaction.tags.slot },
        { name: 'blockhash', value: transaction.tags.blockhash },
        { name: 'compressed', value: SolarweaveConfig.compressed ? 'true' : 'false' },
    ];
    
    const bundle = await ArData.createData({
        data,
        tags,
        nonce: NONCE,
        target: address,
    }, key);

    return await ArData.sign(bundle, key);
}

export async function BundleIndices(transaction: ArweaveTransaction, key) {
    const items = [];

    const address = await arweave.wallets.jwkToAddress(key);
    const data = SolarweaveConfig.compressed ? await CompressBlock(JSON.stringify(transaction.payload)) : JSON.stringify(transaction.payload);
    const blockhash = transaction.tags.blockhash;

    const tags = [
        { name: 'database', value: transaction.tags.database + '-index' },
        { name: 'parentSlot', value: transaction.tags.parentSlot },
        { name: 'slot', value: transaction.tags.slot },
        { name: 'blockhash', value: blockhash },
        { name: 'compressed', value: SolarweaveConfig.compressed ? 'true' : 'false' },
    ];

    const signatures = [];
    const accountKeys = [];

    for (let i = 0; i < transaction.tags.transactions.length; i++) {
        const solTx = transaction.tags.transactions[i];

        for (let ii = 0; ii < solTx.signatures.length; ii++) {
            if (signatures.indexOf(solTx.signatures[ii]) === -1) {
                signatures.push(solTx.signatures[ii]);
            }
        }
    
        for (let ii = 0; ii < solTx.accountKeys.length; ii++) {
            if (accountKeys.indexOf(solTx.accountKeys[ii]) === -1) {
                accountKeys.push(solTx.accountKeys[ii]);
            }
        }
    }

    for (let i = 0; i < signatures.length; i++) {
        const IndexTags = Object.assign([], tags);

        IndexTags.push({ name: 'signature', value: signatures[i] });

        const bundle = await ArData.createData({
            data,
            tags: IndexTags,
            nonce: NONCE,
            target: address,
        }, key);

        const signedBundle = await ArData.sign(bundle, key);

        items.push(signedBundle);
    }

    for (let i = 0; i < accountKeys.length; i++) {
        const IndexTags = Object.assign([], tags);

        IndexTags.push({ name: 'accountKey', value: accountKeys[i] });

        const bundle = await ArData.createData({
            data,
            tags: IndexTags,
            nonce: NONCE,
            target: address,
        }, key);

        const signedBundle = await ArData.sign(bundle, key);

        items.push(signedBundle);
    }

    return items;
}