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
exports.CacheBlock = exports.AddBlockToCache = exports.GetLatestBlock = void 0;
const fs_jetpack_1 = require("fs-jetpack");
const Config_1 = require("../Config");
const Log_util_1 = require("../util/Log.util");
const Benchmark_util_1 = require("../util/Benchmark.util");
const Arweave_service_1 = require("../service/Arweave.service");
const Solana_rpc_service_1 = require("./Solana.rpc.service");
function GetLatestBlock() {
    return __awaiter(this, void 0, void 0, function* () {
        const slotPayload = yield Solana_rpc_service_1.GetSlot();
        const slot = slotPayload.body.result;
        const blockPayload = yield Solana_rpc_service_1.GetBlock(slot);
        const block = blockPayload.body.result;
        return block;
    });
}
exports.GetLatestBlock = GetLatestBlock;
function AddBlockToCache(Block, Slot) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (Config_1.SolarweaveConfig.local) {
                const File = fs_jetpack_1.read(Config_1.SolarweaveConfig.localFile);
                const Data = File ? JSON.parse(File) : [];
                if (Config_1.SolarweaveConfig.verify) {
                    if (Data.filter(block => block.blockhash === Block.blockhash).length > 0) {
                        return (`Block #${Block.parentSlot + 1} ${Block.blockhash} has already been cached`.yellow);
                    }
                }
                Data.unshift(Block);
                fs_jetpack_1.write(Config_1.SolarweaveConfig.localFile, JSON.stringify(Data, null, 2));
                Log_util_1.Log(`Locally Cached Solana Block with Parent Slot `.green + `#${Block.parentSlot}`.green.bold);
                Log_util_1.Log(`Block Hash: `.green + `${Block.blockhash}\n`.green.bold);
            }
            else {
                if (Config_1.SolarweaveConfig.verify) {
                    if (yield Arweave_service_1.RetrieveBlockByBlockhash(Block.blockhash)) {
                        return (`Block #${Block.parentSlot + 1} ${Block.blockhash} has already been cached`.yellow);
                    }
                }
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
                yield Arweave_service_1.SubmitBlockToArweave(transaction);
            }
            Benchmark_util_1.LogBenchmark('cache_block');
            return null;
        }
        catch (error) {
            return (error.message);
        }
    });
}
exports.AddBlockToCache = AddBlockToCache;
function CacheBlock(Slot) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockPayload = yield Solana_rpc_service_1.GetBlock(Slot);
        const Block = blockPayload.body.result;
        if (Block.blockhash) {
            const Error = yield AddBlockToCache(Block, Slot);
            if (Error) {
                Log_util_1.Log(Error);
            }
        }
        else {
            Log_util_1.Log(`Solarweave is now in sync with the latest block`.yellow);
        }
    });
}
exports.CacheBlock = CacheBlock;
//# sourceMappingURL=Solana.scanner.service.js.map