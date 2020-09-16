"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveBlockByBlockhash = exports.RetrieveBlockBySlot = exports.CreateBlockIndices = exports.SubmitBlockToArweave = exports.GetBalance = exports.LoadWallet = void 0;
const fs_jetpack_1 = require("fs-jetpack");
const arql_ops_1 = require("arql-ops");
const Config_1 = require("../Config");
const Log_util_1 = require("../util/Log.util");
const Compression_service_1 = require("../service/Compression.service");
function LoadWallet() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = JSON.parse(fs_jetpack_1.read(Config_1.SolarweaveConfig.credentials));
        return key;
    });
}
exports.LoadWallet = LoadWallet;
function GetBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield LoadWallet();
        const address = yield Config_1.arweave.wallets.jwkToAddress(key);
        const balance = yield Config_1.arweave.wallets.getBalance(address);
        return { address, balance };
    });
}
exports.GetBalance = GetBalance;
function SubmitBlockToArweave(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield LoadWallet();
        const data = Config_1.SolarweaveConfig.compressed ? yield Compression_service_1.CompressBlock(JSON.stringify(transaction.payload)) : JSON.stringify(transaction.payload);
        let tx = yield Config_1.arweave.createTransaction({ data }, key);
        tx.addTag('database', transaction.tags.database);
        tx.addTag('parentSlot', transaction.tags.parentSlot);
        tx.addTag('slot', transaction.tags.slot);
        tx.addTag('blockhash', transaction.tags.blockhash);
        tx.addTag('compressed', Config_1.SolarweaveConfig.compressed ? 'true' : 'false');
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
        tx = yield CreateBlockIndices(key, tx, transaction);
        yield Config_1.arweave.transactions.sign(tx, key);
        yield Config_1.arweave.transactions.post(tx);
        Log_util_1.Log(`Transmitted Solana Block to Arweave with Parent Slot `.green + `#${transaction.tags.parentSlot}`.green.bold);
        Log_util_1.Log(`Solana Block Hash: `.green + `${transaction.tags.blockhash}\n`.green.bold);
        return true;
    });
}
exports.SubmitBlockToArweave = SubmitBlockToArweave;
function CreateBlockIndices(key, tx, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
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
        for (let i = 0; i < signatures.length; i++) {
            tx.addTag('database', `${transaction.tags.database}-index`);
            tx.addTag('signature', signatures[i]);
        }
        for (let i = 0; i < accountKeys.length; i++) {
            tx.addTag('database', `${transaction.tags.database}-index`);
            tx.addTag('accountKey', accountKeys[i]);
        }
        return tx;
    });
}
exports.CreateBlockIndices = CreateBlockIndices;
function RetrieveBlockBySlot(slot) {
    return __awaiter(this, void 0, void 0, function* () {
        const txs = yield Config_1.arweave.arql(arql_ops_1.and(arql_ops_1.equals('database', Config_1.SolarweaveConfig.database), arql_ops_1.equals('slot', slot.toString())));
        if (txs.length > 0) {
            const data = yield Config_1.arweave.transactions.getData(txs[0], { decode: true, string: true });
            let isBase64 = false;
            let payload = null;
            try {
                payload = JSON.parse(data.toString());
            }
            catch (error) {
                isBase64 = true;
            }
            if (isBase64) {
                payload = yield Compression_service_1.DecompressBlock(data.toString());
            }
            return payload;
        }
        else {
            return null;
        }
    });
}
exports.RetrieveBlockBySlot = RetrieveBlockBySlot;
function RetrieveBlockByBlockhash(blockhash) {
    return __awaiter(this, void 0, void 0, function* () {
        const txs = yield Config_1.arweave.arql(arql_ops_1.and(arql_ops_1.equals('database', Config_1.SolarweaveConfig.database), arql_ops_1.equals('blockhash', blockhash)));
        if (txs.length > 0) {
            const data = yield Config_1.arweave.transactions.getData(txs[0], { decode: true, string: true });
            let isBase64 = false;
            let payload = null;
            try {
                payload = JSON.parse(data.toString());
            }
            catch (error) {
                isBase64 = true;
            }
            if (isBase64) {
                payload = yield Compression_service_1.DecompressBlock(data.toString());
            }
            return payload;
        }
        else {
            return null;
        }
    });
}
exports.RetrieveBlockByBlockhash = RetrieveBlockByBlockhash;
//# sourceMappingURL=Arweave.service.js.map