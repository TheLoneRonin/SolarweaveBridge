import Arweave from 'arweave/node';
import deepHash from 'arweave/node/lib/deepHash';
import ArweaveData from 'arweave-bundles';

import { SolarweaveInterface } from './interface/Solarweave.interface';

export const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
});

export const ArData = ArweaveData({
    utils: Arweave.utils,
    crypto: Arweave.crypto,
    deepHash,
})

export let SolarweaveConfig: SolarweaveInterface = {
    rpc_version: `2.0`,
    database: 'solarweave-devnet',
    arweaveGraphQL: 'https://arweave.dev/graphql',
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
    arweaveGraphQL: string,
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
        arweaveGraphQL,
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