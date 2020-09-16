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
exports.LatestBlock = void 0;
const Log_util_1 = require("../util/Log.util");
const Benchmark_util_1 = require("../util/Benchmark.util");
const Solana_scanner_service_1 = require("../service/Solana.scanner.service");
function LatestBlock() {
    return __awaiter(this, void 0, void 0, function* () {
        Log_util_1.Log(`Preparing to retrieve the latest block\n`.green);
        const Block = yield Solana_scanner_service_1.GetLatestBlock();
        Log_util_1.Log(`Found Block with Parent Slot `.green + `#${Block.parentSlot}`.green.bold);
        Log_util_1.Log(`Block Hash: ${Block.blockhash}`.green);
        Log_util_1.Log(`Previous Block Hash: ${Block.previousBlockhash}`.green + '\n\n');
        Log_util_1.Log(`Block Data`);
        Log_util_1.Log(JSON.stringify(Block, null, 2));
        Benchmark_util_1.LogBenchmark('get_latest_block');
    });
}
exports.LatestBlock = LatestBlock;
//# sourceMappingURL=Latest.command.js.map