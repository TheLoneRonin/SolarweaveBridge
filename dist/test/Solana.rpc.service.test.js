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
var assert_1 = require("assert");
var Solana_rpc_service_1 = require("../src/service/Solana.rpc.service");
describe('Solana Base RPC Service Test', function () {
    it('Should retrieve the Genesis Hash', function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Solana_rpc_service_1.GenesisHash()];
                case 1:
                    payload = _a.sent();
                    assert_1.equal(payload.body.result.length > 0, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should retrieve the Current Slot', function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Solana_rpc_service_1.GetSlot()];
                case 1:
                    payload = _a.sent();
                    assert_1.equal(typeof payload.body.result, 'number');
                    assert_1.equal(payload.body.result > 0, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should retrieve the Latest Block', function () { return __awaiter(void 0, void 0, void 0, function () {
        var slotPayload, slot, blockPayload, hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Solana_rpc_service_1.GetSlot()];
                case 1:
                    slotPayload = _a.sent();
                    slot = slotPayload.body.result;
                    return [4 /*yield*/, Solana_rpc_service_1.GetBlock(slot)];
                case 2:
                    blockPayload = _a.sent();
                    hash = blockPayload.body.result.blockhash;
                    assert_1.equal(typeof hash, 'string');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Solana Block Traversal Test', function () { return __awaiter(void 0, void 0, void 0, function () {
    var blocks, latestSlot;
    return __generator(this, function (_a) {
        blocks = [];
        latestSlot = -1;
        it('Retrieve the latest 4 blocks', function () { return __awaiter(void 0, void 0, void 0, function () {
            var slotPayload, i, blockPayload, block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Solana_rpc_service_1.GetSlot()];
                    case 1:
                        slotPayload = _a.sent();
                        latestSlot = slotPayload.body.result;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < 4)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Solana_rpc_service_1.GetBlock(latestSlot - i)];
                    case 3:
                        blockPayload = _a.sent();
                        block = blockPayload.body.result;
                        assert_1.equal(typeof block.blockhash, 'string');
                        blocks.unshift(block);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it('Previous block hashes match', function () { return __awaiter(void 0, void 0, void 0, function () {
            var i, previousBlock, block;
            return __generator(this, function (_a) {
                for (i = 1; i < blocks.length; i++) {
                    previousBlock = blocks[i - 1];
                    block = blocks[i];
                    assert_1.equal(block.previousBlockhash, previousBlock.blockhash);
                }
                return [2 /*return*/];
            });
        }); });
        it('Should retrieve the latest 100 confirmed blocks', function () { return __awaiter(void 0, void 0, void 0, function () {
            var confirmedBlocks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Solana_rpc_service_1.GetConfirmedBlocks(latestSlot - 100, latestSlot)];
                    case 1:
                        confirmedBlocks = _a.sent();
                        assert_1.equal(confirmedBlocks.body.result.length > 10, true);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Solana.rpc.service.test.js.map