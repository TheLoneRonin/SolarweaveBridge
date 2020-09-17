const Arweave = require('arweave');
import { SolarweaveInterface } from './interface/Solarweave.interface';

export const arweave = Arweave.init ?
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

export let SolarweaveConfig: SolarweaveInterface = {
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
}

export function UpdateConfig(
    rpc_version: string,
    database: string,
    url: string,
    credentials: string,
    local: boolean,
    localFile: string,
    console: boolean,
    compressed: boolean,
    parallelize: number,
    benchmark: boolean,
    verify: boolean,
) {
    SolarweaveConfig = {
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