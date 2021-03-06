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
exports.TraverseBlocks = exports.Cache = void 0;
var fs_jetpack_1 = require("fs-jetpack");
var Config_1 = require("../Config");
var Log_util_1 = require("../util/Log.util");
var Sleep_util_1 = require("../util/Sleep.util");
var Solana_rpc_service_1 = require("../service/Solana.rpc.service");
var Solana_scanner_service_1 = require("../service/Solana.scanner.service");
function Cache() {
    return __awaiter(this, void 0, void 0, function () {
        var File, slot, slotPayload, slot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    File = fs_jetpack_1.read(".solarweave.temp");
                    if (!(Config_1.SolarweaveConfig.start && !isNaN(Config_1.SolarweaveConfig.start))) return [3 /*break*/, 1];
                    Log_util_1.Log(("Starting Solarweave at Block #" + Config_1.SolarweaveConfig.start + "\n").yellow.bold);
                    TraverseBlocks(Config_1.SolarweaveConfig.start);
                    return [3 /*break*/, 4];
                case 1:
                    if (!File) return [3 /*break*/, 2];
                    Log_util_1.Log('An existing temp cache was found, restarting the cache process\n'.yellow.bold);
                    slot = Number(File);
                    TraverseBlocks(slot);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, Solana_rpc_service_1.GetFirstSlot()];
                case 3:
                    slotPayload = _a.sent();
                    slot = slotPayload.body.result;
                    TraverseBlocks(slot);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.Cache = Cache;
function TraverseBlocks(slot) {
    return __awaiter(this, void 0, void 0, function () {
        var lastSlot, slotPayload, latestSlot, EndSlot, end, ConfirmedBlocks, Slots, i, PromisedSlots, j, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastSlot = slot;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 13, , 15]);
                    return [4 /*yield*/, Solana_rpc_service_1.GetSlot()];
                case 2:
                    slotPayload = _a.sent();
                    latestSlot = slotPayload.body.result;
                    Log_util_1.Log("Cache is at Block ".yellow + ("" + slot).yellow.bold + ", latest block is ".yellow + ("" + (latestSlot ? latestSlot : 'Unknown (getSlot RPC Error)')).yellow.bold);
                    EndSlot = slot + (Config_1.SolarweaveConfig.parallelize * Config_1.SolarweaveConfig.batch) - 1;
                    end = false;
                    if (Config_1.SolarweaveConfig.end && !isNaN(Config_1.SolarweaveConfig.end) && EndSlot > Config_1.SolarweaveConfig.end) {
                        EndSlot = Config_1.SolarweaveConfig.end;
                        end = true;
                    }
                    return [4 /*yield*/, Solana_rpc_service_1.GetConfirmedBlocks(slot, EndSlot)];
                case 3:
                    ConfirmedBlocks = _a.sent();
                    Slots = ConfirmedBlocks.body.result;
                    if (!Slots) return [3 /*break*/, 11];
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < Slots.length)) return [3 /*break*/, 7];
                    PromisedSlots = [];
                    for (j = 0; j < (Config_1.SolarweaveConfig.parallelize * Config_1.SolarweaveConfig.batch) && i + j < Slots.length; j++) {
                        PromisedSlots.push(Slots[i + j]);
                    }
                    if (!(PromisedSlots.length > 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Solana_scanner_service_1.CacheBlocks(PromisedSlots)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i += (Config_1.SolarweaveConfig.parallelize * Config_1.SolarweaveConfig.batch);
                    return [3 /*break*/, 4];
                case 7:
                    if (!isNaN(Slots[Slots.length - 1])) {
                        lastSlot = Slots[Slots.length - 1] + 1;
                        fs_jetpack_1.write(".solarweave.temp", (lastSlot).toString());
                    }
                    if (!Slots || Slots.length === 0) {
                        throw new Error('Could not retrieve slots');
                    }
                    if (end) {
                        Log_util_1.Log("Solarweave has reached your specified end block, now exiting".green);
                        process.exit();
                    }
                    if (!(Slots.length > 0)) return [3 /*break*/, 8];
                    TraverseBlocks(lastSlot);
                    return [3 /*break*/, 10];
                case 8:
                    Log_util_1.Log("Solarweave did not retrieve any blocks on the last query, waiting a few seconds before querying again".blue);
                    return [4 /*yield*/, Sleep_util_1.Sleep(5000)];
                case 9:
                    _a.sent();
                    TraverseBlocks(lastSlot);
                    _a.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (slotPayload.body.error) {
                        Log_util_1.Log(("RPC ERROR CODE " + slotPayload.body.error.code + ": " + slotPayload.body.error.message).red.bold);
                    }
                    else {
                        Log_util_1.Log("Could not retrieve slots".red.bold);
                    }
                    _a.label = 12;
                case 12: return [3 /*break*/, 15];
                case 13:
                    error_1 = _a.sent();
                    if (error_1.response) {
                        console.error(("RPC ERROR: " + error_1.response.text + "\n").red.bold);
                    }
                    else {
                        console.error(error_1);
                    }
                    Log_util_1.Log("Attempting to restart caching process\n".yellow.bold);
                    return [4 /*yield*/, Sleep_util_1.Sleep(2500)];
                case 14:
                    _a.sent();
                    TraverseBlocks(lastSlot);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
exports.TraverseBlocks = TraverseBlocks;
//# sourceMappingURL=Cache.command.js.map