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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBlockIndices = exports.SubmitBlockToArweave = exports.GetBalance = exports.LoadWallet = void 0;
var fs_jetpack_1 = require("fs-jetpack");
var Config_1 = require("../Config");
var Log_util_1 = require("../util/Log.util");
var Compression_service_1 = require("../service/Compression.service");
function LoadWallet() {
    return __awaiter(this, void 0, void 0, function () {
        var key;
        return __generator(this, function (_a) {
            key = JSON.parse(fs_jetpack_1.read(Config_1.SolarweaveConfig.credentials));
            return [2 /*return*/, key];
        });
    });
}
exports.LoadWallet = LoadWallet;
function GetBalance() {
    return __awaiter(this, void 0, void 0, function () {
        var key, address, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, LoadWallet()];
                case 1:
                    key = _a.sent();
                    return [4 /*yield*/, Config_1.arweave.wallets.jwkToAddress(key)];
                case 2:
                    address = _a.sent();
                    return [4 /*yield*/, Config_1.arweave.wallets.getBalance(address)];
                case 3:
                    balance = _a.sent();
                    return [2 /*return*/, { address: address, balance: balance }];
            }
        });
    });
}
exports.GetBalance = GetBalance;
function SubmitBlockToArweave(transaction) {
    return __awaiter(this, void 0, void 0, function () {
        var key, data, _a, tx, i, solTx, ii, ii, ii;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, LoadWallet()];
                case 1:
                    key = _b.sent();
                    if (!Config_1.SolarweaveConfig.compressed) return [3 /*break*/, 3];
                    return [4 /*yield*/, Compression_service_1.CompressBlock(JSON.stringify(transaction.payload))];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = JSON.stringify(transaction.payload);
                    _b.label = 4;
                case 4:
                    data = _a;
                    return [4 /*yield*/, Config_1.arweave.createTransaction({ data: data }, key)];
                case 5:
                    tx = _b.sent();
                    tx.addTag('database', transaction.tags.database);
                    tx.addTag('parentSlot', transaction.tags.parentSlot);
                    tx.addTag('slot', transaction.tags.slot);
                    tx.addTag('blockhash', transaction.tags.blockhash);
                    tx.addTag('compressed', Config_1.SolarweaveConfig.compressed ? 'true' : 'false');
                    for (i = 0; i < transaction.tags.transactions.length; i++) {
                        solTx = transaction.tags.transactions[i];
                        tx.addTag("tx-" + i + "-numReadonlySignedAccounts", solTx.numReadonlySignedAccounts.toString());
                        tx.addTag("tx-" + i + "-numReadonlyUnsignedAccounts", solTx.numReadonlyUnsignedAccounts.toString());
                        tx.addTag("tx-" + i + "-numRequiredSignatures", solTx.numRequiredSignatures.toString());
                        for (ii = 0; ii < solTx.signatures.length; ii++) {
                            tx.addTag("tx-" + i + "-signature-" + ii, solTx.signatures[ii]);
                        }
                        for (ii = 0; ii < solTx.accountKeys.length; ii++) {
                            tx.addTag("tx-" + i + "-accountKey-" + ii, solTx.accountKeys[ii]);
                        }
                        for (ii = 0; ii < solTx.programIdIndex.length; ii++) {
                            tx.addTag("tx-" + i + "-programIdIndex-" + ii, solTx.programIdIndex[ii].toString());
                        }
                    }
                    return [4 /*yield*/, CreateBlockIndices(key, transaction, data)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, Config_1.arweave.transactions.sign(tx, key)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, Config_1.arweave.transactions.post(tx)];
                case 8:
                    _b.sent();
                    Log_util_1.Log("Transmitted Solana Block to Arweave with Parent Slot ".green + ("#" + transaction.tags.parentSlot).green.bold);
                    Log_util_1.Log("Solana Block Hash: ".green + (transaction.tags.blockhash + "\n").green.bold);
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.SubmitBlockToArweave = SubmitBlockToArweave;
function CreateBlockIndices(key, transaction, data) {
    return __awaiter(this, void 0, void 0, function () {
        var blockhash, signatures, accountKeys, i, solTx, ii, ii, defaultSignature, i, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockhash = transaction.tags.blockhash;
                    signatures = [];
                    accountKeys = [];
                    for (i = 0; i < transaction.tags.transactions.length; i++) {
                        solTx = transaction.tags.transactions[i];
                        for (ii = 0; ii < solTx.signatures.length; ii++) {
                            if (signatures.indexOf(solTx.signatures[ii]) === -1) {
                                signatures.push(solTx.signatures[ii]);
                            }
                        }
                        for (ii = 0; ii < solTx.accountKeys.length; ii++) {
                            if (accountKeys.indexOf(solTx.accountKeys[ii]) === -1) {
                                accountKeys.push(solTx.accountKeys[ii]);
                            }
                        }
                    }
                    defaultSignature = '';
                    if (signatures.length > 0) {
                        defaultSignature = signatures[0];
                    }
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < accountKeys.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Config_1.arweave.createTransaction({ data: data }, key)];
                case 2:
                    tx = _a.sent();
                    tx.addTag('database', transaction.tags.database + "-index");
                    tx.addTag('accountKey', accountKeys[i]);
                    tx.addTag('defaultSignature', defaultSignature);
                    tx.addTag('parentSlot', transaction.tags.parentSlot);
                    tx.addTag('slot', transaction.tags.slot);
                    tx.addTag('blockhash', blockhash);
                    return [4 /*yield*/, Config_1.arweave.transactions.sign(tx, key)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, Config_1.arweave.transactions.post(tx)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.CreateBlockIndices = CreateBlockIndices;
//# sourceMappingURL=Arweave.service.js.map