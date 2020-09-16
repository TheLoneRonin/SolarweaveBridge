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
exports.TraverseBlocks = exports.Cache = void 0;
const fs_jetpack_1 = require("fs-jetpack");
const Log_util_1 = require("../util/Log.util");
const Sleep_util_1 = require("../util/Sleep.util");
const Solana_rpc_service_1 = require("../service/Solana.rpc.service");
const Solana_scanner_service_1 = require("../service/Solana.scanner.service");
const Config_1 = require("../Config");
function Cache() {
    return __awaiter(this, void 0, void 0, function* () {
        const File = fs_jetpack_1.read(`.solarweave.temp`);
        if (File) {
            Log_util_1.Log('An existing temp cache was found, restarting the cache process\n'.yellow.bold);
            const slot = Number(File);
            TraverseBlocks(slot);
        }
        else {
            const slotPayload = yield Solana_rpc_service_1.GetFirstSlot();
            const slot = slotPayload.body.result;
            TraverseBlocks(slot);
        }
    });
}
exports.Cache = Cache;
function TraverseBlocks(slot) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastSlot = slot;
        try {
            const slotPayload = yield Solana_rpc_service_1.GetSlot();
            const latestSlot = slotPayload.body.result;
            Log_util_1.Log(`Cache is at Block `.yellow + `${slot}`.yellow.bold + `, latest block is `.yellow + `${latestSlot ? latestSlot : 'Unknown (getSlot RPC Error)'}`.yellow.bold);
            const ConfirmedBlocks = yield Solana_rpc_service_1.GetConfirmedBlocks(slot, slot + 1000);
            const Slots = ConfirmedBlocks.body.result;
            if (Slots) {
                for (let i = 0; i < Slots.length; i += Config_1.SolarweaveConfig.parallelize) {
                    const PromisedBlocks = [];
                    for (let j = 0; j < Config_1.SolarweaveConfig.parallelize && i + j < Slots.length; j++) {
                        PromisedBlocks.push(Solana_scanner_service_1.CacheBlock(Slots[i + j]));
                    }
                    yield Promise.all(PromisedBlocks);
                    lastSlot = Slots[i];
                    fs_jetpack_1.write(`.solarweave.temp`, (lastSlot).toString());
                }
                TraverseBlocks(lastSlot);
            }
            else {
                if (slotPayload.body.error) {
                    Log_util_1.Log(`RPC ERROR CODE ${slotPayload.body.error.code}: ${slotPayload.body.error.message}`.red.bold);
                }
                else {
                    Log_util_1.Log(`Could not retrieve slots`.red.bold);
                }
            }
        }
        catch (error) {
            if (error.response) {
                console.error(`RPC ERROR: ${error.response.text}\n`.red.bold);
            }
            else {
                console.error(error);
            }
            Log_util_1.Log(`Attempting to restart caching process\n`.yellow.bold);
            yield Sleep_util_1.Sleep(2500);
            TraverseBlocks(lastSlot);
        }
    });
}
exports.TraverseBlocks = TraverseBlocks;
//# sourceMappingURL=Cache.command.js.map