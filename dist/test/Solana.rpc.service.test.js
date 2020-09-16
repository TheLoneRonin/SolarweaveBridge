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
const assert_1 = require("assert");
const Solana_rpc_service_1 = require("../src/service/Solana.rpc.service");
describe('Solana Base RPC Service Test', () => {
    it('Should retrieve the Genesis Hash', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = yield Solana_rpc_service_1.GenesisHash();
        assert_1.equal(payload.body.result.length > 0, true);
    }));
    it('Should retrieve the Current Slot', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = yield Solana_rpc_service_1.GetSlot();
        assert_1.equal(typeof payload.body.result, 'number');
        assert_1.equal(payload.body.result > 0, true);
    }));
    it('Should retrieve the Latest Block', () => __awaiter(void 0, void 0, void 0, function* () {
        const slotPayload = yield Solana_rpc_service_1.GetSlot();
        const slot = slotPayload.body.result;
        const blockPayload = yield Solana_rpc_service_1.GetBlock(slot);
        const hash = blockPayload.body.result.blockhash;
        assert_1.equal(typeof hash, 'string');
    }));
});
describe('Solana Block Traversal Test', () => __awaiter(void 0, void 0, void 0, function* () {
    const blocks = [];
    let latestSlot = -1;
    it('Retrieve the latest 4 blocks', () => __awaiter(void 0, void 0, void 0, function* () {
        const slotPayload = yield Solana_rpc_service_1.GetSlot();
        latestSlot = slotPayload.body.result;
        for (let i = 0; i < 4; i++) {
            const blockPayload = yield Solana_rpc_service_1.GetBlock(latestSlot - i);
            const block = blockPayload.body.result;
            assert_1.equal(typeof block.blockhash, 'string');
            blocks.unshift(block);
        }
    }));
    it('Previous block hashes match', () => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 1; i < blocks.length; i++) {
            const previousBlock = blocks[i - 1];
            const block = blocks[i];
            assert_1.equal(block.previousBlockhash, previousBlock.blockhash);
        }
    }));
    it('Should retrieve the latest 100 confirmed blocks', () => __awaiter(void 0, void 0, void 0, function* () {
        const confirmedBlocks = yield Solana_rpc_service_1.GetConfirmedBlocks(latestSlot - 100, latestSlot);
        assert_1.equal(confirmedBlocks.body.result.length > 10, true);
    }));
}));
//# sourceMappingURL=Solana.rpc.service.test.js.map