import Arweave from 'arweave/node';
import deepHash from 'arweave/node/lib/deepHash';
import ArweaveData from 'arweave-bundles';

import { SolarweaveInterface } from './interface/Solarweave.interface';
import { Solarweave } from './Solarweave';

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

export const SolarweaveConfig: SolarweaveInterface = {
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
    index: false,
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
    index: boolean,
) {
    SolarweaveConfig.rpc_version = rpc_version;
    SolarweaveConfig.database = database;
    SolarweaveConfig.arweaveGraphQL = arweaveGraphQL;
    SolarweaveConfig.url = url;
    SolarweaveConfig.credentials = credentials;
    SolarweaveConfig.local = local;
    SolarweaveConfig.localFile = localFile;
    SolarweaveConfig.console = console;
    SolarweaveConfig.compressed = compressed;
    SolarweaveConfig.parallelize = parallelize;
    SolarweaveConfig.benchmark = benchmark;
    SolarweaveConfig.verify = verify;
    SolarweaveConfig.index = index;
}