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
exports.bundleData = exports.unbundleData = void 0;
var ar_data_verify_1 = require("./ar-data-verify");
/**
 * Unbundles a transaction into an Array of DataItems.
 *
 * Takes either a json string or object. Will throw if given an invalid json
 * string but otherwise, it will return an empty array if
 *
 * a) the json object is the wrong format
 * b) the object contains no valid DataItems.
 *
 * It will verify all DataItems and discard ones that don't pass verification.
 *
 * @param deps
 * @param txData
 */
function unbundleData(deps, txData) {
    return __awaiter(this, void 0, void 0, function () {
        var itemsArray, verifications, failed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof txData === 'string') {
                        txData = JSON.parse(txData);
                    }
                    if (typeof txData !== 'object' || !txData || !txData.items || !Array.isArray(txData.items)) {
                        console.warn("Invalid bundle, should be a json string or obect with an items Array");
                        return [2 /*return*/, []];
                    }
                    itemsArray = txData.items;
                    return [4 /*yield*/, Promise.all(itemsArray.map(function (d) { return ar_data_verify_1.verify(deps, d); }))];
                case 1:
                    verifications = _a.sent();
                    failed = verifications.filter(function (v) { return !v; }).length;
                    if (failed > 0) {
                        console.warn(failed + " peices of Data failed verification and will be discarded");
                        return [2 /*return*/, itemsArray.filter(function (x, idx) { return verifications[idx]; })];
                    }
                    return [2 /*return*/, itemsArray];
            }
        });
    });
}
exports.unbundleData = unbundleData;
/**
 * Verifies all datas and returns a json object with an items array.
 * Throws if any of the data items fail verification.
 *
 * @param deps
 * @param datas
 */
function bundleData(deps, datas) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(datas.map(function (d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ar_data_verify_1.verify(deps, d)];
                            case 1:
                                if (!(_a.sent())) {
                                    throw new Error('Invalid Data');
                                }
                                return [2 /*return*/];
                        }
                    }); }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { items: datas }];
            }
        });
    });
}
exports.bundleData = bundleData;
//# sourceMappingURL=ar-data-bundle.js.map