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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackTags = exports.decodeTagAt = exports.decodeTag = exports.decodeData = void 0;
/**
 * Decode the data content of a DataItem, either to a string or Uint8Array of bytes
 *
 * @param deps
 * @param d
 * @param param2
 */
function decodeData(deps, d, options) {
    if (options === void 0) { options = { string: false }; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (options.string) {
                return [2 /*return*/, deps.utils.b64UrlToString(d.data)];
            }
            else {
                return [2 /*return*/, deps.utils.b64UrlToBuffer(d.data)];
            }
            return [2 /*return*/];
        });
    });
}
exports.decodeData = decodeData;
/**
 * Decode an individual tag from a DataItem. Always decodes name and value as strings
 *
 * @param deps
 * @param tag
 */
function decodeTag(deps, tag) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, { name: deps.utils.b64UrlToString(tag.name), value: deps.utils.b64UrlToString(tag.value) }];
        });
    });
}
exports.decodeTag = decodeTag;
/**
 * Decodes an individual tag from a DataItem at index. Throws if index is out of bounds.
 *
 */
function decodeTagAt(deps, d, index) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (d.tags.length < index - 1) {
                throw new Error("Invalid index " + index + " when tags array has " + d.tags.length + " tags");
            }
            return [2 /*return*/, decodeTag(deps, d.tags[index])];
        });
    });
}
exports.decodeTagAt = decodeTagAt;
/**
 * Unpack all tags in a DataItem into a key value map of
 *
 * `name: string | string[]`
 *
 * Always decodes as string values, maintains the order
 * the tags were seriliazed in when converting a collection
 * of tags with the same key.
 *
 * @param deps
 * @param d
 */
function unpackTags(deps, d) {
    return __awaiter(this, void 0, void 0, function () {
        var tags, i, _a, name_1, value;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tags = {};
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < d.tags.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, decodeTag(deps, d.tags[i])];
                case 2:
                    _a = _b.sent(), name_1 = _a.name, value = _a.value;
                    if (!tags.hasOwnProperty(name_1)) {
                        tags[name_1] = value;
                        return [3 /*break*/, 3];
                    }
                    tags[name_1] = __spread(tags[name_1], [value]);
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, tags];
            }
        });
    });
}
exports.unpackTags = unpackTags;
//# sourceMappingURL=ar-data-read.js.map