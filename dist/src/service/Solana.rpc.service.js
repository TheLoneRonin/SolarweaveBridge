"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.GetConfirmedBlocks = exports.GetBlock = exports.GetSlot = exports.GetFirstSlot = exports.GenesisHash = void 0;
const superagent = __importStar(require("superagent"));
const Config_1 = require("../Config");
function GenesisHash(id = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = yield superagent
            .post(Config_1.SolarweaveConfig.url)
            .send({
            jsonrpc: Config_1.SolarweaveConfig.rpc_version,
            id,
            method: `getGenesisHash`,
        });
        return payload;
    });
}
exports.GenesisHash = GenesisHash;
function GetFirstSlot(id = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = yield superagent
            .post(Config_1.SolarweaveConfig.url)
            .send({
            jsonrpc: Config_1.SolarweaveConfig.rpc_version,
            id,
            method: `getFirstAvailableBlock`,
        });
        return payload;
    });
}
exports.GetFirstSlot = GetFirstSlot;
function GetSlot(id = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = yield superagent
            .post(Config_1.SolarweaveConfig.url)
            .send({
            jsonrpc: Config_1.SolarweaveConfig.rpc_version,
            id,
            method: `getSlot`,
        });
        return payload;
    });
}
exports.GetSlot = GetSlot;
function GetBlock(index, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = yield superagent
            .post(Config_1.SolarweaveConfig.url)
            .send({
            jsonrpc: Config_1.SolarweaveConfig.rpc_version,
            id: (id ? id : index),
            method: `getConfirmedBlock`,
            params: [index],
        });
        return payload;
    });
}
exports.GetBlock = GetBlock;
function GetConfirmedBlocks(start, end, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = yield superagent
            .post(Config_1.SolarweaveConfig.url)
            .send({
            jsonrpc: Config_1.SolarweaveConfig.rpc_version,
            id: (id ? id : start),
            method: `getConfirmedBlocks`,
            params: [start, end],
        });
        return payload;
    });
}
exports.GetConfirmedBlocks = GetConfirmedBlocks;
//# sourceMappingURL=Solana.rpc.service.js.map