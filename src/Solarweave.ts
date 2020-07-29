import { Command } from 'commander';

export const Solarweave = new Command('Solarweave Bridge');

export function Start() {
    Solarweave
        .option('-c, --credentials [file path]', 'specify the path to the json file containing your Arweave credentials');

    Solarweave
        .command('livestream')
        .description('livestream blocks directly to your arweave database')
        .action(() => {
            console.log('Livestream');
        });

    Solarweave
        .command('cache')
        .description('cache blocks to your arweave database')
        .option('--all', 'start caching all blocks')
        .option('--block <number>', 'specify the block number you want to cache')
        .option('--start <number>', 'specify the starting block number')
        .option('--end <number>', 'specify the ending block number')
        .action(() => {
            console.log('Cache');
        });

    Solarweave
        .command('retrieve')
        .description('retrieve blocks from your arweave database')
        .option('--block <number>', 'specify the block number you want to retrieve')
        .option('--start <number>', 'specify the starting block number')
        .option('--end <number>', 'specify the ending block number')
        .action(() => {
            console.log('Retrieve');
        });

    Solarweave.parse(process.argv);
}