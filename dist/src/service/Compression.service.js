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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecompressBlock = exports.CompressBlock = void 0;
const zlib_1 = __importDefault(require("zlib"));
function CompressBlock(Block) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = Buffer.from(JSON.stringify(Block), 'utf-8');
        const compressed = zlib_1.default.deflateSync(buffer);
        const compressedString = compressed.toString('base64');
        return compressedString;
    });
}
exports.CompressBlock = CompressBlock;
function DecompressBlock(Block64) {
    return __awaiter(this, void 0, void 0, function* () {
        const uncompressed = zlib_1.default.inflateSync(Buffer.from(Block64, 'base64'));
        const data = JSON.parse(uncompressed.toString());
        return data;
    });
}
exports.DecompressBlock = DecompressBlock;
//# sourceMappingURL=Compression.service.js.map