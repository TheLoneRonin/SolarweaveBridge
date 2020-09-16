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
exports.arweave = void 0;
const Arweave = require("arweave");
const assert_1 = require("assert");
const Config_1 = require("../src/Config");
const Arweave_service_1 = require("../src/service/Arweave.service");
exports.arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
});
function PrepareTransaction(Block, Slot) {
    const transaction = {
        tags: {
            database: Config_1.SolarweaveConfig.database,
            parentSlot: Block.parentSlot.toString(),
            slot: Slot.toString(),
            blockhash: Block.blockhash,
            transactions: [],
        },
        payload: Block,
    };
    for (let i = 0; i < Block.transactions.length; i++) {
        const tx = Block.transactions[i];
        transaction.tags.transactions.push({
            signatures: tx.transaction.signatures,
            accountKeys: tx.transaction.message.accountKeys,
            programIdIndex: tx.transaction.message.instructions.map(instruction => instruction.programIdIndex),
            numReadonlySignedAccounts: tx.transaction.message.header.numReadonlySignedAccounts,
            numReadonlyUnsignedAccounts: tx.transaction.message.header.numReadonlyUnsignedAccounts,
            numRequiredSignatures: tx.transaction.message.header.numRequiredSignatures,
        });
    }
    return transaction;
}
describe('Arweave Service Tests', () => {
    const slot = 1025219;
    const blockhash = '34zRbXQZktKRZarTzP6NHVFncyw8LqHtat8sXd7rwWUb';
    let SampleBlock = null;
    it('Should load the default wallet', () => __awaiter(void 0, void 0, void 0, function* () {
        const key = yield Arweave_service_1.LoadWallet();
        assert_1.equal(key !== null, true);
    }));
    it('Should get the appropriate address and balance', () => __awaiter(void 0, void 0, void 0, function* () {
        const { address, balance } = yield Arweave_service_1.GetBalance();
        assert_1.equal(typeof address, 'string');
        assert_1.equal(address.length > 1, true);
        assert_1.equal(isNaN(Number(balance)), false);
        assert_1.equal(Number(balance) > -1, true);
    }));
    it('Should retrieve a block by slot number', () => __awaiter(void 0, void 0, void 0, function* () {
        const Block = yield Arweave_service_1.RetrieveBlockBySlot(slot);
        SampleBlock = JSON.parse(Block);
        assert_1.equal(Block !== null, true);
    }));
    it('Should retrieve a block by blockhash', () => __awaiter(void 0, void 0, void 0, function* () {
        const Block = yield Arweave_service_1.RetrieveBlockByBlockhash(blockhash);
        assert_1.equal(Block !== null, true);
    }));
    it('Should create the appropriate block indices for a new transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        assert_1.equal(SampleBlock !== null, true);
        console.log('Sample Block', SampleBlock);
        const key = yield Arweave_service_1.LoadWallet();
        assert_1.equal(key !== null, true);
        const transaction = PrepareTransaction(SampleBlock, slot);
        let tx = yield exports.arweave.createTransaction({ data: JSON.stringify(SampleBlock) }, key);
        tx = yield Arweave_service_1.CreateBlockIndices(key, tx, transaction);
    }));
    it('Should submit a block to Arweave', () => __awaiter(void 0, void 0, void 0, function* () {
        assert_1.equal(SampleBlock !== null, true);
        const key = yield Arweave_service_1.LoadWallet();
        assert_1.equal(key !== null, true);
        const transaction = PrepareTransaction(SampleBlock, slot);
        yield Arweave_service_1.SubmitBlockToArweave(transaction);
    }));
});
//# sourceMappingURL=Arweave.service.test.js.map