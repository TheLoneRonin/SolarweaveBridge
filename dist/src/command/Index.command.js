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
exports.TraverseBlocks = exports.Index = void 0;
var fs_jetpack_1 = require("fs-jetpack");
var Config_1 = require("../Config");
var Log_util_1 = require("../util/Log.util");
var Sleep_util_1 = require("../util/Sleep.util");
var ARQL_service_1 = require("../service/ARQL.service");
var Solana_scanner_service_1 = require("../service/Solana.scanner.service");
function Index() {
    return __awaiter(this, void 0, void 0, function () {
        var File;
        return __generator(this, function (_a) {
            File = fs_jetpack_1.read(".solarweave.temp");
            if (File) {
                Log_util_1.Log('An existing temp cache was found, restarting the cache process\n'.yellow.bold);
                TraverseBlocks();
            }
            else {
                TraverseBlocks();
            }
            return [2 /*return*/];
        });
    });
}
exports.Index = Index;
function TraverseBlocks(cursor) {
    if (cursor === void 0) { cursor = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var Cursor, BlockIndices, BlockPromises, _loop_1, i, Blocks, Error_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Cursor = cursor;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 9]);
                    return [4 /*yield*/, ARQL_service_1.RetrieveBlocks(Config_1.SolarweaveConfig.parallelize, cursor)];
                case 2:
                    BlockIndices = _a.sent();
                    BlockPromises = [];
                    _loop_1 = function (i) {
                        var BlockIndex = BlockIndices[i];
                        var ArweaveId = BlockIndex.node.id;
                        Cursor = BlockIndex.cursor;
                        var BlockTags = BlockIndex.node.tags.map(function (tag) {
                            return { name: tag.name, value: tag.value };
                        });
                        var BlockPromise = new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                            var Block, _a, _b, Slot;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = (_a = JSON).parse;
                                        return [4 /*yield*/, ARQL_service_1.RetrieveBlock(ArweaveId)];
                                    case 1:
                                        Block = _b.apply(_a, [_c.sent()]);
                                        Slot = Number(BlockTags.filter(function (t) { return t.name === 'slot'; })[0].value);
                                        return [2 /*return*/, resolve({ Block: Block, Slot: Slot })];
                                }
                            });
                        }); });
                        BlockPromises.push(BlockPromise);
                    };
                    for (i = 0; i < BlockIndices.length; i++) {
                        _loop_1(i);
                    }
                    return [4 /*yield*/, Promise.all(BlockPromises)];
                case 3:
                    Blocks = (_a.sent()).filter(function (b) { return b !== null; });
                    if (!(Blocks.length > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Solana_scanner_service_1.AddBlocksToCache(Blocks, 'index')];
                case 4:
                    Error_1 = _a.sent();
                    if (Error_1) {
                        Log_util_1.Log(Error_1);
                    }
                    TraverseBlocks(Cursor);
                    return [3 /*break*/, 6];
                case 5:
                    Log_util_1.Log("Solarweave Index Database is now in sync with the latest block".yellow);
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    error_1 = _a.sent();
                    if (error_1.response) {
                        console.error(("RPC ERROR: " + error_1.response.text + "\n").red.bold);
                    }
                    else {
                        console.error(error_1);
                    }
                    Log_util_1.Log("Attempting to restart caching process\n".yellow.bold);
                    return [4 /*yield*/, Sleep_util_1.Sleep(2500)];
                case 8:
                    _a.sent();
                    TraverseBlocks(Cursor);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.TraverseBlocks = TraverseBlocks;
//# sourceMappingURL=Index.command.js.map