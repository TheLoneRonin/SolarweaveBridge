"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignatureData = exports.DataItemJson = exports.verify = exports.unpackTags = exports.decodeTagAt = exports.decodeTag = exports.decodeData = exports.sign = exports.create = void 0;
var ar_data_base_1 = require("./ar-data-base");
Object.defineProperty(exports, "getSignatureData", { enumerable: true, get: function () { return ar_data_base_1.getSignatureData; } });
Object.defineProperty(exports, "DataItemJson", { enumerable: true, get: function () { return ar_data_base_1.DataItemJson; } });
var ar_data_create_1 = require("./ar-data-create");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return ar_data_create_1.createData; } });
Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return ar_data_create_1.sign; } });
var ar_data_read_1 = require("./ar-data-read");
Object.defineProperty(exports, "decodeData", { enumerable: true, get: function () { return ar_data_read_1.decodeData; } });
Object.defineProperty(exports, "decodeTag", { enumerable: true, get: function () { return ar_data_read_1.decodeTag; } });
Object.defineProperty(exports, "decodeTagAt", { enumerable: true, get: function () { return ar_data_read_1.decodeTagAt; } });
Object.defineProperty(exports, "unpackTags", { enumerable: true, get: function () { return ar_data_read_1.unpackTags; } });
var ar_data_bundle_1 = require("./ar-data-bundle");
var ar_data_verify_1 = require("./ar-data-verify");
Object.defineProperty(exports, "verify", { enumerable: true, get: function () { return ar_data_verify_1.verify; } });
function ArweaveData(deps) {
    return {
        createData: ar_data_create_1.createData.bind(null, deps),
        sign: ar_data_create_1.sign.bind(null, deps),
        addTag: ar_data_create_1.addTag.bind(null, deps),
        verify: ar_data_verify_1.verify.bind(null, deps),
        decodeData: ar_data_read_1.decodeData.bind(null, deps),
        decodeTag: ar_data_read_1.decodeTag.bind(null, deps),
        decodeTagAt: ar_data_read_1.decodeTagAt.bind(null, deps),
        unpackTags: ar_data_read_1.unpackTags.bind(null, deps),
        bundleData: ar_data_bundle_1.bundleData.bind(null, deps),
        unbundleData: ar_data_bundle_1.unbundleData.bind(null, deps),
    };
}
exports.default = ArweaveData;
//# sourceMappingURL=index.js.map