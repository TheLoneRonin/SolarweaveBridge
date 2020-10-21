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
exports.BundleIndices = exports.BundleItem = exports.SubmitBlockToArweave = exports.GetBalance = exports.LoadWallet = exports.NONCE = void 0;
var fs_jetpack_1 = require("fs-jetpack");
var Config_1 = require("../Config");
var Log_util_1 = require("../util/Log.util");
var Compression_service_1 = require("../service/Compression.service");
exports.NONCE = "170A240D55E8D4A96647180DEE407C28D5388DF5653895859B4C76B6D5D99DD7";
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
function SubmitBlockToArweave(transactions) {
    return __awaiter(this, void 0, void 0, function () {
        var key, bundles, i, transaction, bundledItem, bundledIndices, _a, data, tx;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, LoadWallet()];
                case 1:
                    key = _b.sent();
                    bundles = [];
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < transactions.length)) return [3 /*break*/, 8];
                    transaction = transactions[i];
                    return [4 /*yield*/, BundleItem(transaction, key)];
                case 3:
                    bundledItem = _b.sent();
                    if (!Config_1.SolarweaveConfig.index) return [3 /*break*/, 5];
                    return [4 /*yield*/, BundleIndices(transaction, key)];
                case 4:
                    _a = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _a = [];
                    _b.label = 6;
                case 6:
                    bundledIndices = _a;
                    bundles = bundles.concat(bundledItem, bundledIndices);
                    _b.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 2];
                case 8: return [4 /*yield*/, Config_1.ArData.bundleData(bundles)];
                case 9:
                    data = _b.sent();
                    return [4 /*yield*/, Config_1.arweave.createTransaction({ data: JSON.stringify(data) }, key)];
                case 10:
                    tx = _b.sent();
                    tx.addTag('Bundle-Type', 'ANS-102');
                    tx.addTag('Bundle-Format', 'json');
                    tx.addTag('Bundle-Version', '1.0.0');
                    tx.addTag('Content-Type', 'application/json');
                    return [4 /*yield*/, Config_1.arweave.transactions.sign(tx, key)];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, Config_1.arweave.transactions.post(tx)];
                case 12:
                    _b.sent();
                    Log_util_1.Log(("Transmitted Solana Blocks with the Slots " + transactions.map(function (t) { return t.tags.slot; }) + " to Arweave\n").green);
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.SubmitBlockToArweave = SubmitBlockToArweave;
function BundleItem(transaction, key) {
    return __awaiter(this, void 0, void 0, function () {
        var address, data, _a, tags, bundle;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Config_1.arweave.wallets.jwkToAddress(key)];
                case 1:
                    address = _b.sent();
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
                    tags = [
                        { name: 'database', value: transaction.tags.database },
                        { name: 'parentSlot', value: transaction.tags.parentSlot },
                        { name: 'slot', value: transaction.tags.slot },
                        { name: 'blockhash', value: transaction.tags.blockhash },
                        { name: 'compressed', value: Config_1.SolarweaveConfig.compressed ? 'true' : 'false' },
                    ];
                    return [4 /*yield*/, Config_1.ArData.createData({
                            data: data,
                            tags: tags,
                            nonce: exports.NONCE,
                            target: address,
                        }, key)];
                case 5:
                    bundle = _b.sent();
                    return [4 /*yield*/, Config_1.ArData.sign(bundle, key)];
                case 6: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.BundleItem = BundleItem;
function BundleIndices(transaction, key) {
    return __awaiter(this, void 0, void 0, function () {
        var items, address, data, _a, blockhash, tags, signatures, accountKeys, i, solTx, ii, ii, i, IndexTags, bundle, signedBundle, i, IndexTags, bundle, signedBundle;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    items = [];
                    return [4 /*yield*/, Config_1.arweave.wallets.jwkToAddress(key)];
                case 1:
                    address = _b.sent();
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
                    blockhash = transaction.tags.blockhash;
                    tags = [
                        { name: 'database', value: transaction.tags.database + '-index' },
                        { name: 'parentSlot', value: transaction.tags.parentSlot },
                        { name: 'slot', value: transaction.tags.slot },
                        { name: 'blockhash', value: blockhash },
                        { name: 'compressed', value: Config_1.SolarweaveConfig.compressed ? 'true' : 'false' },
                    ];
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
                    i = 0;
                    _b.label = 5;
                case 5:
                    if (!(i < signatures.length)) return [3 /*break*/, 9];
                    IndexTags = Object.assign([], tags);
                    IndexTags.push({ name: 'signature', value: signatures[i] });
                    return [4 /*yield*/, Config_1.ArData.createData({
                            data: data,
                            tags: IndexTags,
                            nonce: exports.NONCE,
                            target: address,
                        }, key)];
                case 6:
                    bundle = _b.sent();
                    return [4 /*yield*/, Config_1.ArData.sign(bundle, key)];
                case 7:
                    signedBundle = _b.sent();
                    items.push(signedBundle);
                    _b.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 5];
                case 9:
                    i = 0;
                    _b.label = 10;
                case 10:
                    if (!(i < accountKeys.length)) return [3 /*break*/, 14];
                    IndexTags = Object.assign([], tags);
                    IndexTags.push({ name: 'accountKey', value: accountKeys[i] });
                    return [4 /*yield*/, Config_1.ArData.createData({
                            data: data,
                            tags: IndexTags,
                            nonce: exports.NONCE,
                            target: address,
                        }, key)];
                case 11:
                    bundle = _b.sent();
                    return [4 /*yield*/, Config_1.ArData.sign(bundle, key)];
                case 12:
                    signedBundle = _b.sent();
                    items.push(signedBundle);
                    _b.label = 13;
                case 13:
                    i++;
                    return [3 /*break*/, 10];
                case 14: return [2 /*return*/, items];
            }
        });
    });
}
exports.BundleIndices = BundleIndices;
//# sourceMappingURL=Arweave.service.js.map