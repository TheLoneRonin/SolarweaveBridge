"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfig = exports.SolarweaveConfig = exports.arweave = void 0;
var Arweave = require('arweave');
exports.arweave = Arweave.init ?
    Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
        timeout: 20000,
        logging: false,
    })
    :
        Arweave.default.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https',
            timeout: 20000,
            logging: false,
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