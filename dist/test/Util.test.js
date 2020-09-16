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
const Command_util_1 = require("../src/util/Command.util");
const Log_util_1 = require("../src/util/Log.util");
const Sleep_util_1 = require("../src/util/Sleep.util");
describe('Util Function Tests', () => {
    it('Should run the process command with no errors', () => {
        const Solarweave = {
            rpc_version: `2.0`,
            database: 'solarweave-devnet',
            url: `https://devnet.solana.com`,
            credentials: `.arweave.creds.json`,
            local: false,
            localFile: `solarweave.cache.json`,
            console: true,
            uncompressed: true,
            parallelize: 1,
            benchmark: false,
            noverify: true,
        };
        Command_util_1.ProcessCommand(Solarweave);
    });
    it('Should log to console with no errors', () => {
        Log_util_1.Log('');
    });
    it('Should sleep for 500ms with no errors', () => __awaiter(void 0, void 0, void 0, function* () {
        yield Sleep_util_1.Sleep(500);
    }));
});
//# sourceMappingURL=Util.test.js.map