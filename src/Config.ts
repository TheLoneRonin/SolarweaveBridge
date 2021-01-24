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
    debug: false,
    compressed: true,
    parallelize: 1,
    batch: 1,
    benchmark: false,
    verify: true,
    index: false,
    start: null,
    end: null,
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
    debug: boolean,
    compressed: boolean,
    parallelize: number,
    batch: number,
    benchmark: boolean,
    verify: boolean,
    index: boolean,
    start?: number,
    end?: number,
) {
    SolarweaveConfig.rpc_version = rpc_version;
    SolarweaveConfig.database = database;
    SolarweaveConfig.arweaveGraphQL = arweaveGraphQL;
    SolarweaveConfig.url = url;
    SolarweaveConfig.credentials = credentials;
    SolarweaveConfig.local = local;
    SolarweaveConfig.localFile = localFile;
    SolarweaveConfig.console = console;
    SolarweaveConfig.debug = debug;
    SolarweaveConfig.compressed = compressed;
    SolarweaveConfig.parallelize = parallelize;
    SolarweaveConfig.batch = batch;
    SolarweaveConfig.benchmark = benchmark;
    SolarweaveConfig.verify = verify;
    SolarweaveConfig.index = index;
    SolarweaveConfig.start = start;
    SolarweaveConfig.end = end;
}