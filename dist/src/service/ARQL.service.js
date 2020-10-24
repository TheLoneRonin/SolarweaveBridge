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
exports.RetrieveAccount = exports.RetrieveSignature = exports.RetrieveSlot = exports.RetrieveBlockhash = exports.RetrieveBlock = exports.RetrieveBlocks = exports.GraphQL = exports.ParsePayload = void 0;
var superagent_1 = require("superagent");
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
function GraphQL(query) {
    return __awaiter(this, void 0, void 0, function () {
        var payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, superagent_1.post(Config_1.SolarweaveConfig.arweaveGraphQL)
                        .send({ query: query })];
                case 1:
                    payload = _a.sent();
                    return [2 /*return*/, payload.body.data.transactions.edges];
            }
        });
    });
}
exports.GraphQL = GraphQL;
function RetrieveBlocks(first, after, database) {
    if (first === void 0) { first = 25; }
    if (database === void 0) { database = "" + Config_1.SolarweaveConfig.database; }
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "query {\n        transactions(\n            first: " + first + ",\n            " + (after ? "after: \"" + after + "\"" : "") + ",\n            tags: [\n                { name: \"database\", values: [\"" + database + "\"] }\n            ],\n            sort: HEIGHT_DESC\n        ) {\n            edges {\n                cursor\n                node {\n                    id\n                    tags {\n                        name\n                        value\n                    }\n                }\n            }\n        }\n    }";
                    return [4 /*yield*/, GraphQL(query)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.RetrieveBlocks = RetrieveBlocks;
function RetrieveBlock(arweaveBlockhash) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Config_1.arweave.transactions.getData(arweaveBlockhash, { decode: true, string: true })];
                case 1:
                    data = _a.sent();
                    if (!data) return [3 /*break*/, 3];
                    return [4 /*yield*/, ParsePayload(data)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/, null];
            }
        });
    });
}
exports.RetrieveBlock = RetrieveBlock;
function RetrieveBlockhash(solanaBlockhash, database) {
    if (database === void 0) { database = "" + Config_1.SolarweaveConfig.database; }
    return __awaiter(this, void 0, void 0, function () {
        var query, edges, BlockData, Tags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "query {\n        transactions(\n            first: 1,\n            tags: [\n                { name: \"database\", values: [\"" + database + "\"] }\n                { name: \"blockhash\", values: [\"" + solanaBlockhash + "\"] }\n            ]\n        ) {\n            edges {\n                cursor\n                node {\n                    id\n                    tags {\n                        name\n                        value\n                    }\n                }\n            }\n        }\n    }";
                    return [4 /*yield*/, GraphQL(query)];
                case 1:
                    edges = _a.sent();
                    if (!(edges.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, RetrieveBlock(edges[0].node.id)];
                case 2:
                    BlockData = _a.sent();
                    Tags = edges[0].node.tags;
                    return [2 /*return*/, { BlockData: JSON.parse(BlockData), Tags: Tags }];
                case 3: return [2 /*return*/, null];
            }
        });
    });
}
exports.RetrieveBlockhash = RetrieveBlockhash;
function RetrieveSlot(solanaSlot, database) {
    if (database === void 0) { database = "" + Config_1.SolarweaveConfig.database; }
    return __awaiter(this, void 0, void 0, function () {
        var query, edges, BlockData, Tags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "query {\n        transactions(\n            first: 1,\n            tags: [\n                { name: \"database\", values: [\"" + database + "\"] }\n                { name: \"slot\", values: [\"" + solanaSlot + "\"] }\n            ]\n        ) {\n            edges {\n                cursor\n                node {\n                    id\n                    tags {\n                        name\n                        value\n                    }\n                }\n            }\n        }\n    }";
                    return [4 /*yield*/, GraphQL(query)];
                case 1:
                    edges = _a.sent();
                    if (!(edges.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, RetrieveBlock(edges[0].node.id)];
                case 2:
                    BlockData = _a.sent();
                    Tags = edges[0].node.tags;
                    return [2 /*return*/, { BlockData: JSON.parse(BlockData), Tags: Tags }];
                case 3: return [2 /*return*/, null];
            }
        });
    });
}
exports.RetrieveSlot = RetrieveSlot;
function RetrieveSignature(solanaSignature, database) {
    if (database === void 0) { database = "" + Config_1.SolarweaveConfig.database; }
    return __awaiter(this, void 0, void 0, function () {
        var query, edges, BlockData, Tags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "query {\n        transactions(\n            first: 1,\n            tags: [\n                { name: \"database\", values: [\"" + (database + '-index') + "\"] }\n                { name: \"signature\", values: [\"" + solanaSignature + "\"] }\n            ]\n        ) {\n            edges {\n                cursor\n                node {\n                    id\n                    tags {\n                        name\n                        value\n                    }\n                }\n            }\n        }\n    }";
                    return [4 /*yield*/, GraphQL(query)];
                case 1:
                    edges = _a.sent();
                    if (!(edges.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, RetrieveBlock(edges[0].node.id)];
                case 2:
                    BlockData = _a.sent();
                    Tags = edges[0].node.tags;
                    return [2 /*return*/, { BlockData: JSON.parse(BlockData), Tags: Tags }];
                case 3: return [2 /*return*/, null];
            }
        });
    });
}
exports.RetrieveSignature = RetrieveSignature;
function RetrieveAccount(accountKey, first, after, database) {
    if (first === void 0) { first = 25; }
    if (database === void 0) { database = "" + Config_1.SolarweaveConfig.database; }
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "query {\n        transactions(\n            first: " + first + ",\n            " + (after ? "after: \"" + after + "\"" : "") + ",\n            tags: [\n                { name: \"database\", values: [\"" + (database + '-index') + "\"] },\n                { name: \"accountKey\", values: [\"" + accountKey + "\"] }\n            ],\n            sort: HEIGHT_DESC\n        ) {\n            edges {\n                cursor\n                node {\n                    id\n                    tags {\n                        name\n                        value\n                    }\n                }\n            }\n        }\n    }";
                    return [4 /*yield*/, GraphQL(query)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.RetrieveAccount = RetrieveAccount;
//# sourceMappingURL=ARQL.service.js.map