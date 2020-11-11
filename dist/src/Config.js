"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfig = exports.SolarweaveConfig = exports.ArData = exports.arweave = void 0;
var node_1 = __importDefault(require("arweave/node"));
var deepHash_1 = __importDefault(require("arweave/node/lib/deepHash"));
var arweave_bundles_1 = __importDefault(require("arweave-bundles"));
exports.arweave = node_1.default.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
});
exports.ArData = arweave_bundles_1.default({
    utils: node_1.default.utils,
    crypto: node_1.default.crypto,
    deepHash: deepHash_1.default,
});
exports.SolarweaveConfig = {
    rpc_version: "2.0",
    database: 'solarweave-devnet',
    arweaveGraphQL: 'https://arweave.dev/graphql',
    url: "https://devnet.solana.com",
    credentials: ".arweave.creds.json",
    local: false,
    localFile: "solarweave.cache.json",
    console: true,
    compressed: true,
    parallelize: 1,
    batch: 1,
    benchmark: false,
    verify: true,
    index: false,
    start: null,
    end: null,
};
function UpdateConfig(rpc_version, database, arweaveGraphQL, url, credentials, local, localFile, console, compressed, parallelize, batch, benchmark, verify, index, start, end) {
    exports.SolarweaveConfig.rpc_version = rpc_version;
    exports.SolarweaveConfig.database = database;
    exports.SolarweaveConfig.arweaveGraphQL = arweaveGraphQL;
    exports.SolarweaveConfig.url = url;
    exports.SolarweaveConfig.credentials = credentials;
    exports.SolarweaveConfig.local = local;
    exports.SolarweaveConfig.localFile = localFile;
    exports.SolarweaveConfig.console = console;
    exports.SolarweaveConfig.compressed = compressed;
    exports.SolarweaveConfig.parallelize = parallelize;
    exports.SolarweaveConfig.batch = batch;
    exports.SolarweaveConfig.benchmark = benchmark;
    exports.SolarweaveConfig.verify = verify;
    exports.SolarweaveConfig.index = index;
    exports.SolarweaveConfig.start = start;
    exports.SolarweaveConfig.end = end;
}
exports.UpdateConfig = UpdateConfig;
//# sourceMappingURL=Config.js.map