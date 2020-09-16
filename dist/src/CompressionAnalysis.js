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
exports.Analyze = void 0;
require("colors");
const Solana_rpc_service_1 = require("./service/Solana.rpc.service");
const Compression_service_1 = require("./service/Compression.service");
function Analyze() {
    return __awaiter(this, void 0, void 0, function* () {
        const firstSlotPayload = yield Solana_rpc_service_1.GetFirstSlot();
        const firstSlot = firstSlotPayload.body.result;
        const Benchmarks = [];
        for (let i = firstSlot; i < firstSlot + 25; i++) {
            const BlockPayload = yield Solana_rpc_service_1.GetBlock(i);
            const Block = BlockPayload.body.result;
            const CompressedBlock = yield Compression_service_1.CompressBlock(Block);
            Benchmarks.push({
                n: JSON.stringify(Block).length,
                c: CompressedBlock.length,
            });
        }
        let totaln = 0;
        let averagen = 0;
        let totalc = 0;
        let averagec = 0;
        let highn = -1;
        let lown = 999999;
        let highc = -1;
        let lowc = 999999;
        for (let i = 0; i < Benchmarks.length; i++) {
            const B = Benchmarks[i];
            totaln += B.n;
            totalc += B.c;
            if (B.n > highn) {
                highn = B.n;
            }
            if (B.n < lown) {
                lown = B.n;
            }
            if (B.c > highc) {
                highc = B.c;
            }
            if (B.c < lowc) {
                lowc = B.c;
            }
        }
        averagen = (totaln / Benchmarks.length);
        averagec = (totalc / Benchmarks.length);
        console.log(`Uncompressed Average Block Size`, `${averagen} bytes`.green.bold);
        console.log(`Uncompressed Lowest Block Size`, `${lown} bytes`.green.bold);
        console.log(`Uncompressed Highest Block Size`, `${highn} bytes`.green.bold);
        console.log('');
        console.log(`Compressed Average Block Size`, `${averagec} bytes`.green.bold);
        console.log(`Compressed Lowest Block Size`, `${lowc} bytes`.green.bold);
        console.log(`Compressed Highest Block Size`, `${highc} bytes`.green.bold);
    });
}
exports.Analyze = Analyze;
(() => __awaiter(void 0, void 0, void 0, function* () { return yield Analyze(); }))();
//# sourceMappingURL=CompressionAnalysis.js.map