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
const assert_1 = require("assert");
const Compression_service_1 = require("../src/service/Compression.service");
describe('Compression Service Tests', () => {
    it('Should compress a sample JSON object', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield Compression_service_1.CompressBlock({ example: 'hello world' });
        assert_1.equal(typeof data, 'string');
    }));
    it('Should compress and decompress a sample JSON object', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield Compression_service_1.CompressBlock({ example: 'hello world' });
        assert_1.equal(typeof data, 'string');
        const parsed = yield Compression_service_1.DecompressBlock(data);
        assert_1.equal(parsed.example, 'hello world');
    }));
});
//# sourceMappingURL=Compression.service.test.js.map