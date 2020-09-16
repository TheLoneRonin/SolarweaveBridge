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
require("colors");
const Balance_command_1 = require("../src/command/Balance.command");
const Latest_command_1 = require("../src/command/Latest.command");
describe('CLI Command Tests', () => {
    it('Should retrieve the balance from the default wallet', () => __awaiter(void 0, void 0, void 0, function* () {
        yield Balance_command_1.Balance();
    }));
    it('Retrieve the latest block', () => __awaiter(void 0, void 0, void 0, function* () {
        yield Latest_command_1.LatestBlock();
    }));
});
//# sourceMappingURL=Command.test.js.map