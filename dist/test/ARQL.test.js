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
exports.arweave = void 0;
const Arweave = require("arweave");
const assert_1 = require("assert");
const arql_ops_1 = require("arql-ops");
exports.arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
});
describe('ARQL Tests', () => {
    const block = '1025219';
    it('Should retrieve Block #1025219 from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const txs = yield exports.arweave.arql(arql_ops_1.and(arql_ops_1.equals('database', 'solarweave-devnet'), arql_ops_1.equals('slot', block)));
        const dataString = yield exports.arweave.transactions.getData(txs[0], { decode: true, string: true });
        assert_1.equal(typeof dataString, 'string');
    }));
    it('Should retrieve the first block found from the Solarweave Database', () => __awaiter(void 0, void 0, void 0, function* () {
        const txs = yield exports.arweave.arql(arql_ops_1.and(arql_ops_1.equals('database', 'solarweave-devnet')));
        const dataString = yield exports.arweave.transactions.getData(txs[0], { decode: true, string: true });
        assert_1.equal(typeof dataString, 'string');
    }));
});
//# sourceMappingURL=ARQL.test.js.map