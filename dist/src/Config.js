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
    benchmark: false,
    verify: true,
};
function UpdateConfig(rpc_version, database, arweaveGraphQL, url, credentials, local, localFile, console, compressed, parallelize, benchmark, verify) {
    exports.SolarweaveConfig = {
        database: database,
        rpc_version: rpc_version,
        arweaveGraphQL: arweaveGraphQL,
        url: url,
        credentials: credentials,
        local: local,
        localFile: localFile,
        console: console,
        compressed: compressed,
        parallelize: parallelize,
        benchmark: benchmark,
        verify: verify
    };
}
exports.UpdateConfig = UpdateConfig;
//# sourceMappingURL=Config.js.map