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
exports.sign = exports.addTag = exports.createData = void 0;
var ar_data_base_1 = require("./ar-data-base");
var ar_data_verify_1 = require("./ar-data-verify");
/**
 * Create a DataItem, encoding tags and data, setting owner, but not
 * sigining it.
 *
 * @param deps
 * @param opts
 * @param jwk
 */
function createData(deps, opts, jwk) {
    return __awaiter(this, void 0, void 0, function () {
        var d;
        return __generator(this, function (_a) {
            d = {
                owner: jwk.n,
                target: opts.target || '',
                nonce: opts.nonce || '',
                tags: opts.tags ?
                    opts.tags.map(function (t) { return ({ name: deps.utils.stringToB64Url(t.name), value: deps.utils.stringToB64Url(t.value) }); }) :
                    [],
                data: typeof opts.data === 'string' ?
                    deps.utils.stringToB64Url(opts.data) :
                    deps.utils.bufferTob64Url(opts.data),
                signature: '',
                id: '',
            };
            if (!ar_data_verify_1.verifyEncodedTagsArray(deps, d.tags)) {
                throw new Error("Tags are invalid, a maximum of " + ar_data_verify_1.MAX_TAG_COUNT + " tags, a key length of " + ar_data_verify_1.MAX_TAG_KEY_LENGTH_BYTES + ", a value length of " + ar_data_verify_1.MAX_TAG_VALUE_LENGTH_BYTES + " has been exceeded, or the tags are otherwise malformed.");
            }
            return [2 /*return*/, d];
        });
    });
}
exports.createData = createData;
function addTag(deps, d, name, value) {
    d.tags.push({
        name: deps.utils.stringToB64Url(name),
        value: deps.utils.stringToB64Url(value)
    });
}
exports.addTag = addTag;
/**
 * Signs a data item and sets the `signature` and `id` fields to valid values.
 *
 * @param deps
 * @param d
 * @param jwk
 */
function sign(deps, d, jwk) {
    return __awaiter(this, void 0, void 0, function () {
        var signatureData, signatureBytes, idBytes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ar_data_base_1.getSignatureData(deps, d)];
                case 1:
                    signatureData = _a.sent();
                    return [4 /*yield*/, deps.crypto.sign(jwk, signatureData)];
                case 2:
                    signatureBytes = _a.sent();
                    return [4 /*yield*/, deps.crypto.hash(signatureBytes)];
                case 3:
                    idBytes = _a.sent();
                    // Assign. TODO: Don't mutate. For familiarity with existing sign tx api we mutate. 
                    d.signature = deps.utils.bufferTob64Url(signatureBytes);
                    d.id = deps.utils.bufferTob64Url(idBytes);
                    return [2 /*return*/, d];
            }
        });
    });
}
exports.sign = sign;
//# sourceMappingURL=ar-data-create.js.map