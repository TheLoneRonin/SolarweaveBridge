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
exports.Analyze = void 0;
require("colors");
var Solana_rpc_service_1 = require("./service/Solana.rpc.service");
var Compression_service_1 = require("./service/Compression.service");
function Analyze() {
    return __awaiter(this, void 0, void 0, function () {
        var firstSlotPayload, firstSlot, Benchmarks, i, BlockPayload, Block, CompressedBlock, totaln, averagen, totalc, averagec, highn, lown, highc, lowc, i, B;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Solana_rpc_service_1.GetFirstSlot()];
                case 1:
                    firstSlotPayload = _a.sent();
                    firstSlot = firstSlotPayload.body.result;
                    Benchmarks = [];
                    i = firstSlot;
                    _a.label = 2;
                case 2:
                    if (!(i < firstSlot + 25)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Solana_rpc_service_1.GetBlock(i)];
                case 3:
                    BlockPayload = _a.sent();
                    Block = BlockPayload.body.result;
                    return [4 /*yield*/, Compression_service_1.CompressBlock(Block)];
                case 4:
                    CompressedBlock = _a.sent();
                    Benchmarks.push({
                        n: JSON.stringify(Block).length,
                        c: CompressedBlock.length,
                    });
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6:
                    totaln = 0;
                    averagen = 0;
                    totalc = 0;
                    averagec = 0;
                    highn = -1;
                    lown = 999999;
                    highc = -1;
                    lowc = 999999;
                    for (i = 0; i < Benchmarks.length; i++) {
                        B = Benchmarks[i];
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
                    console.log("Uncompressed Average Block Size", (averagen + " bytes").green.bold);
                    console.log("Uncompressed Lowest Block Size", (lown + " bytes").green.bold);
                    console.log("Uncompressed Highest Block Size", (highn + " bytes").green.bold);
                    console.log('');
                    console.log("Compressed Average Block Size", (averagec + " bytes").green.bold);
                    console.log("Compressed Lowest Block Size", (lowc + " bytes").green.bold);
                    console.log("Compressed Highest Block Size", (highc + " bytes").green.bold);
                    return [2 /*return*/];
            }
        });
    });
}
exports.Analyze = Analyze;
(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, Analyze()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); })();
//# sourceMappingURL=CompressionAnalysis.js.map