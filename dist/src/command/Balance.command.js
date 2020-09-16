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
exports.Balance = void 0;
const Log_util_1 = require("../util/Log.util");
const Benchmark_util_1 = require("../util/Benchmark.util");
const Arweave_service_1 = require("../service/Arweave.service");
function Balance() {
    return __awaiter(this, void 0, void 0, function* () {
        const { address, balance } = yield Arweave_service_1.GetBalance();
        Log_util_1.Log(`Your Arweave public address is `.green + `${address}`.green.bold);
        Log_util_1.Log(`Your Arweave balance is `.green + `${balance}\n`.green.bold);
        Benchmark_util_1.LogBenchmark('get_balance');
    });
}
exports.Balance = Balance;
//# sourceMappingURL=Balance.command.js.map