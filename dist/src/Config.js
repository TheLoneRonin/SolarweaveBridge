"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfig = exports.SolarweaveConfig = exports.arweave = void 0;
const Arweave = require("arweave");
exports.arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
});
exports.SolarweaveConfig = {
    rpc_version: `2.0`,
    database: 'solarweave-devnet',
    url: `https://devnet.solana.com`,
    credentials: `.arweave.creds.json`,
    local: false,
    localFile: `solarweave.cache.json`,
    console: true,
    compressed: true,
    parallelize: 1,
    benchmark: false,
    verify: true,
};
function UpdateConfig(rpc_version, database, url, credentials, local, localFile, console, compressed, parallelize, benchmark, verify) {
    exports.SolarweaveConfig = {
        database,
        rpc_version,
        url,
        credentials,
        local,
        localFile,
        console,
        compressed,
        parallelize,
        benchmark,
        verify
    };
}
exports.UpdateConfig = UpdateConfig;
//# sourceMappingURL=Config.js.map