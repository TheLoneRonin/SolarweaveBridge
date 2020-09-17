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
exports.arweave = void 0;
var Arweave = require("arweave");
var assert_1 = require("assert");
var Config_1 = require("../src/Config");
var Arweave_service_1 = require("../src/service/Arweave.service");
var ARQL_service_1 = require("../src/service/ARQL.service");
exports.arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
});
function PrepareTransaction(Block, Slot) {
    var transaction = {
        tags: {
            database: Config_1.SolarweaveConfig.database,
            parentSlot: Block.parentSlot.toString(),
            slot: Slot.toString(),
            blockhash: Block.blockhash,
            transactions: [],
        },
        payload: Block,
    };
    for (var i = 0; i < Block.transactions.length; i++) {
        var tx = Block.transactions[i];
        transaction.tags.transactions.push({
            signatures: tx.transaction.signatures,
            accountKeys: tx.transaction.message.accountKeys,
            programIdIndex: tx.transaction.message.instructions.map(function (instruction) { return instruction.programIdIndex; }),
            numReadonlySignedAccounts: tx.transaction.message.header.numReadonlySignedAccounts,
            numReadonlyUnsignedAccounts: tx.transaction.message.header.numReadonlyUnsignedAccounts,
            numRequiredSignatures: tx.transaction.message.header.numRequiredSignatures,
        });
    }
    return transaction;
}
describe('Arweave Service Tests', function () {
    var slot = 1025219;
    var blockhash = '34zRbXQZktKRZarTzP6NHVFncyw8LqHtat8sXd7rwWUb';
    var SampleBlock = null;
    it('Should load the default wallet', function () { return __awaiter(void 0, void 0, void 0, function () {
        var key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Arweave_service_1.LoadWallet()];
                case 1:
                    key = _a.sent();
                    assert_1.equal(key !== null, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get the appropriate address and balance', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, address, balance;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Arweave_service_1.GetBalance()];
                case 1:
                    _a = _b.sent(), address = _a.address, balance = _a.balance;
                    assert_1.equal(typeof address, 'string');
                    assert_1.equal(address.length > 1, true);
                    assert_1.equal(isNaN(Number(balance)), false);
                    assert_1.equal(Number(balance) > -1, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should retrieve a block by slot number', function () { return __awaiter(void 0, void 0, void 0, function () {
        var Block;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ARQL_service_1.RetrieveBlockBySlot(slot)];
                case 1:
                    Block = _a.sent();
                    SampleBlock = JSON.parse(Block);
                    assert_1.equal(Block !== null, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should retrieve a block by blockhash', function () { return __awaiter(void 0, void 0, void 0, function () {
        var Block;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ARQL_service_1.RetrieveBlockByBlockhash(blockhash)];
                case 1:
                    Block = _a.sent();
                    assert_1.equal(Block !== null, true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should create the appropriate block indices for a new transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var key, transaction, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    assert_1.equal(SampleBlock !== null, true);
                    console.log('Sample Block', SampleBlock);
                    return [4 /*yield*/, Arweave_service_1.LoadWallet()];
                case 1:
                    key = _a.sent();
                    assert_1.equal(key !== null, true);
                    transaction = PrepareTransaction(SampleBlock, slot);
                    return [4 /*yield*/, exports.arweave.createTransaction({ data: JSON.stringify(SampleBlock) }, key)];
                case 2:
                    tx = _a.sent();
                    return [4 /*yield*/, Arweave_service_1.CreateBlockIndices(key, transaction)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should submit a block to Arweave', function () { return __awaiter(void 0, void 0, void 0, function () {
        var key, transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    assert_1.equal(SampleBlock !== null, true);
                    return [4 /*yield*/, Arweave_service_1.LoadWallet()];
                case 1:
                    key = _a.sent();
                    assert_1.equal(key !== null, true);
                    transaction = PrepareTransaction(SampleBlock, slot);
                    return [4 /*yield*/, Arweave_service_1.SubmitBlockToArweave(transaction)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=Arweave.service.test.js.map