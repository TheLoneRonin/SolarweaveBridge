import { read } from 'fs-jetpack';

import { SolarweaveConfig, arweave } from '../Config';
import { Log } from '../util/Log.util';
import { DetermineLowerbound, DetermineUpperbound } from '../util/Bound.util';
import { ArweaveTransaction } from '../interface/Arweave.interface';
import { CompressBlock } from '../service/Compression.service';

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

export async function SubmitBlockToArweave(transaction: ArweaveTransaction) {
    const key = await LoadWallet();
    const data = SolarweaveConfig.compressed ? await CompressBlock(JSON.stringify(transaction.payload)) : JSON.stringify(transaction.payload);

    let tx = await arweave.createTransaction({ data }, key);

    tx.addTag('database', transaction.tags.database);

    tx.addTag('parentSlot', transaction.tags.parentSlot);
    tx.addTag('slot', transaction.tags.slot);
    tx.addTag('blockhash', transaction.tags.blockhash);
    tx.addTag('compressed', SolarweaveConfig.compressed ? 'true' : 'false');

    tx.addTag('lowerbound', DetermineLowerbound(Number(transaction.tags.slot)).toString());
    tx.addTag('upperbound', DetermineUpperbound(Number(transaction.tags.slot)).toString());

    for (let i = 0; i < transaction.tags.transactions.length; i++) {
        const solTx = transaction.tags.transactions[i];

        tx.addTag(`tx-${i}-numReadonlySignedAccounts`, solTx.numReadonlySignedAccounts.toString());
        tx.addTag(`tx-${i}-numReadonlyUnsignedAccounts`, solTx.numReadonlyUnsignedAccounts.toString());
        tx.addTag(`tx-${i}-numRequiredSignatures`, solTx.numRequiredSignatures.toString());
    
        for (let ii = 0; ii < solTx.signatures.length; ii++) {
            tx.addTag(`tx-${i}-signature-${ii}`, solTx.signatures[ii]);
        }
    
        for (let ii = 0; ii < solTx.accountKeys.length; ii++) {
            tx.addTag(`tx-${i}-accountKey-${ii}`, solTx.accountKeys[ii]);
        }
        
        for (let ii = 0; ii < solTx.programIdIndex.length; ii++) {
            tx.addTag(`tx-${i}-programIdIndex-${ii}`, solTx.programIdIndex[ii].toString());
        }
    } 

    await CreateBlockIndices(key, transaction);
    await arweave.transactions.sign(tx, key);
    await arweave.transactions.post(tx);

    Log(`Transmitted Solana Block to Arweave with Parent Slot `.green + `#${transaction.tags.parentSlot}`.green.bold);
    Log(`Solana Block Hash: `.green + `${transaction.tags.blockhash}\n`.green.bold);

    return true;
}

export async function CreateBlockIndices(key, transaction: ArweaveTransaction) {
    const blockhash = transaction.tags.blockhash;
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

    let defaultSignature = '';

    if (signatures.length > 0) {
        defaultSignature = signatures[0];
    }    

    for (let i = 0; i < signatures.length; i++) {
        const tx = await arweave.createTransaction({ data: blockhash }, key);

        tx.addTag('database', `${transaction.tags.database}-index`);
        tx.addTag('signature', signatures[i]);
        tx.addTag('parentSlot', transaction.tags.parentSlot);
        tx.addTag('slot', transaction.tags.slot);
        tx.addTag('blockhash', transaction.tags.blockhash);

        tx.addTag('lowerbound', DetermineLowerbound(Number(transaction.tags.slot)).toString());
        tx.addTag('upperbound', DetermineUpperbound(Number(transaction.tags.slot)).toString());

        await arweave.transactions.sign(tx, key);
        await arweave.transactions.post(tx);
    }

    for (let i = 0; i < accountKeys.length; i++) {
        const tx = await arweave.createTransaction({ data: blockhash }, key);

        tx.addTag('database', `${transaction.tags.database}-index`);
        tx.addTag('accountKey', accountKeys[i]);
        tx.addTag('defaultSignature', defaultSignature);
        tx.addTag('parentSlot', transaction.tags.parentSlot);
        tx.addTag('slot', transaction.tags.slot);
        tx.addTag('blockhash', transaction.tags.blockhash);

        tx.addTag('lowerbound', DetermineLowerbound(Number(transaction.tags.slot)).toString());
        tx.addTag('upperbound', DetermineUpperbound(Number(transaction.tags.slot)).toString());

        await arweave.transactions.sign(tx, key);
        await arweave.transactions.post(tx);
    }
}