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
exports.StreamBlocks = exports.Livestream = void 0;
var fs_jetpack_1 = require("fs-jetpack");
var Config_1 = require("../Config");
var Log_util_1 = require("../util/Log.util");
var Sleep_util_1 = require("../util/Sleep.util");
var Solana_rpc_service_1 = require("../service/Solana.rpc.service");
var Solana_scanner_service_1 = require("../service/Solana.scanner.service");
function Livestream() {
    return __awaiter(this, void 0, void 0, function () {
        var File, slot, slotPayload, slot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    File = fs_jetpack_1.read(".solarweave.temp");
                    if (!File) return [3 /*break*/, 1];
                    Log_util_1.Log('An existing temp cache was found, restarting the livestream process\n'.yellow.bold);
                    slot = Number(File);
                    StreamBlocks(slot);
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, Solana_rpc_service_1.GetSlot()];
                case 2:
                    slotPayload = _a.sent();
                    slot = slotPayload.body.result;
                    StreamBlocks(slot);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.Livestream = Livestream;
function StreamBlocks(slot) {
    return __awaiter(this, void 0, void 0, function () {
        var lastSlot, slotPayload, latestSlot, ConfirmedBlocks, Slots, i, PromisedSlots, j, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastSlot = slot;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 10, , 12]);
                    return [4 /*yield*/, Solana_rpc_service_1.GetSlot()];
                case 2:
                    slotPayload = _a.sent();
                    latestSlot = slotPayload.body.result;
                    Log_util_1.Log("Livestream is at Block ".yellow + ("" + slot).yellow.bold + ", latest block is ".yellow + ("" + latestSlot).yellow.bold);
                    return [4 /*yield*/, Solana_rpc_service_1.GetConfirmedBlocks(slot, slot + 1000)];
                case 3:
                    ConfirmedBlocks = _a.sent();
                    Slots = ConfirmedBlocks.body.result;
                    if (!(latestSlot && Slots)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < Slots.length)) return [3 /*break*/, 7];
                    PromisedSlots = [];
                    for (j = 0; j < Config_1.SolarweaveConfig.parallelize && i + j < Slots.length; j++) {
                        PromisedSlots.push(Slots[i + j]);
                    }
                    return [4 /*yield*/, Solana_scanner_service_1.CacheBlocks(PromisedSlots)];
                case 5:
                    _a.sent();
                    lastSlot = Slots[i];
                    fs_jetpack_1.write(".solarweave.temp", (lastSlot).toString());
                    _a.label = 6;
                case 6:
                    i += Config_1.SolarweaveConfig.parallelize;
                    return [3 /*break*/, 4];
                case 7:
                    StreamBlocks(slot + Slots.length);
                    return [3 /*break*/, 9];
                case 8:
                    if (slotPayload.body.error) {
                        Log_util_1.Log(("RPC ERROR CODE " + slotPayload.body.error.code + ": " + slotPayload.body.error.message).red.bold);
                    }
                    else {
                        Log_util_1.Log("Could not retrieve slots".red.bold);
                    }
                    _a.label = 9;
                case 9: return [3 /*break*/, 12];
                case 10:
                    error_1 = _a.sent();
                    if (error_1.response) {
                        console.error(("RPC ERROR: " + error_1.response + "\n").red.bold);
                    }
                    else {
                        console.error(error_1);
                    }
                    Log_util_1.Log("Attempting to restart streaming service\n".yellow.bold);
                    return [4 /*yield*/, Sleep_util_1.Sleep(2500)];
                case 11:
                    _a.sent();
                    StreamBlocks(lastSlot);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.StreamBlocks = StreamBlocks;
//# sourceMappingURL=Livestream.command.js.map