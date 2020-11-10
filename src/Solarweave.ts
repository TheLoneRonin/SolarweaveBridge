import 'colors';
import { Command } from 'commander';
import { ProcessCommand } from './util/Command.util';

import { Balance } from './command/Balance.command';
import { LatestBlock } from './command/Latest.command';
import { Livestream } from './command/Livestream.command';
import { Cache } from './command/Cache.command';
import { Index } from './command/Index.command';

export const Benchmark = {
    epoch: Number(new Date()),
    actions: [],
};

export const Solarweave = new Command('Solarweave Bridge');

Solarweave
    .option('--database [name]', 'the name of the database (for Arweave ArQL tags)', 'solarweave-devnet')
    .option('--gql [URL]', 'the Arweave GraphQL URL to query blocks', 'https://arweave.dev/graphql')
    .option('--url [RPC URL]', 'the Solana RPC URL to query blocks from', 'https://devnet.solana.com')
    .option('--credentials [file path]', 'specify the path to the json file containing your Arweave credentials', '.arweave.creds.json')
    .option('--local', 'cache locally to a JSON file instead of to Arweave', false)
    .option('--localFile [file path]', 'if caching data locally, specify the file path', 'solarweave.cache.json')
    .option('--console', 'do not output log data to console', false)
    .option('--uncompressed', 'store blocks in an uncompressed format', false)
    .option('--parallelize [blocks]', 'the amount of blocks to process at a time, 1 processes 1 block at a time, 8, 8 blocks at a time', '1')
    .option('--benchmark', 'benchmark Solarweave and start tracking size and speed stats stored in benchmark.json', false)
    .option('--noverify', 'if caching to Arweave do not double check if the block was already submitted', false)
    .option('--index', 'if caching to Arweave, index blocks according to signatures and account keys', false)
    .option('--start [number]', 'the block number to start at')
    .option('--end [number]', 'the block number to end at');


Solarweave
    .command('balance')
    .description('retrieve the public address and balance of your Arweave wallet')
    .action(async () => {
        ProcessCommand(Solarweave);
        Balance();
    });

Solarweave
    .command('latest')
    .description('retrieve the latest block and output the block to console')
    .action(() => {
        ProcessCommand(Solarweave);
        LatestBlock();
    });

Solarweave
    .command('livestream')
    .description('livestream blocks directly to your arweave database (or locally)')
    .action(() => {
        ProcessCommand(Solarweave);
        Livestream();
    });

Solarweave
    .command('cache')
    .description('retrieve all the blocks that are still available and store them in Arweave')
    .action(() => {
        ProcessCommand(Solarweave);
        Cache();
    });

Solarweave
    .command('index')
    .description('index an existing database with their Account Keys and Signatures')
    .action(() => {
        ProcessCommand(Solarweave);
        Index();
    });

Solarweave
    .command('version')
    .description('Get the current version of Solarweave')
    .action(() => {
        console.log(`Solarweave v2.0.0`.green.bold);
    });

Solarweave.parse(process.argv);