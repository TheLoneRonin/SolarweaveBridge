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
exports.verifyEncodedTagSize = exports.verifyEncodedTagsArray = exports.verify = exports.MAX_TAG_COUNT = exports.MAX_TAG_VALUE_LENGTH_BYTES = exports.MAX_TAG_KEY_LENGTH_BYTES = void 0;
var ar_data_base_1 = require("./ar-data-base");
exports.MAX_TAG_KEY_LENGTH_BYTES = 1024 * 1;
exports.MAX_TAG_VALUE_LENGTH_BYTES = 1024 * 3;
exports.MAX_TAG_COUNT = 128;
/**
 * Verifies a DataItem is valid.
 *
 * @param deps
 * @param d
 * @param jwk
 */
function verify(deps, d) {
    return __awaiter(this, void 0, void 0, function () {
        var signatureData, signatureBytes, idBytes, idOk, signatureOk, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, ar_data_base_1.getSignatureData(deps, d)];
                case 1:
                    signatureData = _a.sent();
                    signatureBytes = deps.utils.b64UrlToBuffer(d.signature);
                    return [4 /*yield*/, deps.crypto.hash(signatureBytes)];
                case 2:
                    idBytes = _a.sent();
                    idOk = deps.utils.bufferTob64Url(idBytes) === d.id;
                    if (!idOk) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, deps.crypto.verify(d.owner, signatureData, signatureBytes)];
                case 3:
                    signatureOk = _a.sent();
                    if (!signatureOk) {
                        return [2 /*return*/, false];
                    }
                    // Verify tags array is valid. 
                    if (!verifyEncodedTagsArray(deps, d.tags)) {
                        return [2 /*return*/, false];
                    }
                    // Everything passed. 
                    return [2 /*return*/, true];
                case 4:
                    e_1 = _a.sent();
                    console.warn(e_1);
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.verify = verify;
/**
 *
 * Verify an array of tags only contains objects with exactly two keys, `name` and `value`
 * that they are both non-empty strings, and are with the bounds of tag sizes.
 *
 * @param tags
 */
function verifyEncodedTagsArray(deps, tags) {
    if (tags.length > exports.MAX_TAG_COUNT) {
        return false;
    }
    // Search for something invalid.
    var invalid = tags.find(function (t) {
        return Object.keys(t).length !== 2
            ||
                typeof t.name !== 'string'
            ||
                typeof t.value !== 'string'
            ||
                !verifyEncodedTagSize(deps, t);
    });
    return !invalid;
}
exports.verifyEncodedTagsArray = verifyEncodedTagsArray;
/**
 * Verifies the tag name or value does not exceed reasonable bounds in bytes.
 *
 * @param deps
 * @param tag
 */
function verifyEncodedTagSize(deps, tag) {
    var nameLen = deps.utils.b64UrlToBuffer(tag.name).length;
    if (nameLen < 1 || nameLen > exports.MAX_TAG_KEY_LENGTH_BYTES) {
        return false;
    }
    var valueLen = deps.utils.b64UrlToBuffer(tag.value).length;
    if (valueLen < 1 || nameLen > exports.MAX_TAG_VALUE_LENGTH_BYTES) {
        return false;
    }
    return true;
}
exports.verifyEncodedTagSize = verifyEncodedTagSize;
//# sourceMappingURL=ar-data-verify.js.map