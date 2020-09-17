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
exports.RetrieveBlockData = exports.RetrieveBlocksFromSignature = exports.RetrieveBlocksFromAccount = exports.RetrieveBlockByBlockhash = exports.RetrieveBlockBySlot = exports.ParsePayload = void 0;
var arql_ops_1 = require("arql-ops");
var Config_1 = require("../Config");
var Compression_service_1 = require("../service/Compression.service");
function ParsePayload(data) {
    return __awaiter(this, void 0, void 0, function () {
        var isBase64, payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isBase64 = false;
                    payload = null;
                    try {
                        payload = JSON.parse(data.toString());
                    }
                    catch (error) {
                        isBase64 = true;
                    }
                    if (!isBase64) return [3 /*break*/, 2];
                    return [4 /*yield*/, Compression_service_1.DecompressBlock(data.toString())];
                case 1:
                    payload = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, payload];
            }
        });
    });
}
exports.ParsePayload = ParsePayload;
function RetrieveBlockBySlot(slot, database) {
    if (database === void 0) { database = "" + Config_1.SolarweaveConfig.database; }
    return __awaiter(this, void 0, void 0, function () {
        var txs, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config_1.arweave.arql(arql_ops_1.and(arql_ops_1.equals('database', database), arql_ops_1.equals('slot', slot.toString())))];
                case 1:
                    txs = _a.sent();
                    if (!(txs.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Config_1.arweave.transactions.getData(txs[0], { decode: true, string: true })];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, ParsePayload(data)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/, null];
            }
        });
    });
}
exports.RetrieveBlockBySlot = RetrieveBlockBySlot;
function RetrieveBlockByBlockhash(blockhash, database) {
    if (database === void 0) { database = "" + Config_1.SolarweaveConfig.database; }
    return __awaiter(this, void 0, void 0, function () {
        var txs, metadata, error_1, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config_1.arweave.arql(arql_ops_1.and(arql_ops_1.equals('database', database), arql_ops_1.equals('blockhash', blockhash)))];
                case 1:
                    txs = _a.sent();
                    if (!(txs.length > 0)) return [3 /*break*/, 8];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, Config_1.arweave.transactions.get(txs[0])];
                case 3:
                    metadata = _a.sent();
                    metadata.get('tags').forEach(function (tag) {
                        var key = tag.get('name', { decode: true, string: true });
                        var value = tag.get('value', { decode: true, string: true });
                        console.log(key, value);
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [4 /*yield*/, Config_1.arweave.transactions.getData(txs[0], { decode: true, string: true })];
                case 6:
                    data = _a.sent();
                    return [4 /*yield*/, ParsePayload(data)];
                case 7: return [2 /*return*/, _a.sent()];
                case 8: return [2 /*return*/, null];
            }
        });
    });
}
exports.RetrieveBlockByBlockhash = RetrieveBlockByBlockhash;
function RetrieveBlocksFromAccount(accountKey, database) {
    if (database === void 0) { database = Config_1.SolarweaveConfig.database + "-index"; }
    return __awaiter(this, void 0, void 0, function () {
        var txs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config_1.arweave.arql(arql_ops_1.and(arql_ops_1.equals('database', database), arql_ops_1.equals('accountKey', accountKey)))];
                case 1:
                    txs = _a.sent();
                    return [2 /*return*/, txs];
            }
        });
    });
}
exports.RetrieveBlocksFromAccount = RetrieveBlocksFromAccount;
function RetrieveBlocksFromSignature(signature, database) {
    if (database === void 0) { database = Config_1.SolarweaveConfig.database + "-index"; }
    return __awaiter(this, void 0, void 0, function () {
        var txs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config_1.arweave.arql(arql_ops_1.and(arql_ops_1.equals('database', database), arql_ops_1.equals('signature', signature)))];
                case 1:
                    txs = _a.sent();
                    return [2 /*return*/, txs];
            }
        });
    });
}
exports.RetrieveBlocksFromSignature = RetrieveBlocksFromSignature;
function RetrieveBlockData(arweaveTxId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, metadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        database: '',
                        slot: '',
                        parentSlot: '',
                        accountKey: '',
                        blockhash: '',
                        defaultSignature: '',
                    };
                    return [4 /*yield*/, Config_1.arweave.transactions.get(arweaveTxId)];
                case 1:
                    metadata = _a.sent();
                    metadata.get('tags').forEach(function (tag) {
                        var key = tag.get('name', { decode: true, string: true });
                        var value = tag.get('value', { decode: true, string: true });
                        data[key] = value;
                    });
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.RetrieveBlockData = RetrieveBlockData;
//# sourceMappingURL=ARQL.service.js.map