"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solarweave = exports.Benchmark = void 0;
require("colors");
const commander_1 = require("commander");
const Command_util_1 = require("./util/Command.util");
const Balance_command_1 = require("./command/Balance.command");
const Latest_command_1 = require("./command/Latest.command");
const Livestream_command_1 = require("./command/Livestream.command");
const Cache_command_1 = require("./command/Cache.command");
exports.Benchmark = {
    epoch: Number(new Date()),
    actions: [],
};
exports.Solarweave = new commander_1.Command('Solarweave Bridge');
exports.Solarweave
    .option('--database [name]', 'the name of the database (for Arweave ArQL tags)', 'solarweave-devnet')
    .option('--url [RPC URL]', 'the Solana RPC URL to query blocks from', 'https://devnet.solana.com')
    .option('--credentials [file path]', 'specify the path to the json file containing your Arweave credentials', '.arweave.creds.json')
    .option('--local', 'cache locally to a JSON file instead of to Arweave', false)
    .option('--localFile [file path]', 'if caching data locally, specify the file path', 'solarweave.cache.json')
    .option('--console', 'do not output log data to console', false)
    .option('--uncompressed', 'store blocks in an uncompressed format', false)
    .option('--parallelize [blocks]', 'the amount of blocks to process at a time, 1 processes 1 block at a time, 8, 8 blocks at a time', '1')
    .option('--benchmark', 'benchmark Solarweave and start tracking size and speed stats stored in benchmark.json', false)
    .option('--noverify', 'if caching to Arweave do not double check if the block was already submitted', false);
exports.Solarweave
    .command('balance')
    .description('retrieve the public address and balance of your Arweave wallet')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    Command_util_1.ProcessCommand(exports.Solarweave);
    Balance_command_1.Balance();
}));
exports.Solarweave
    .command('latest')
    .description('retrieve the latest block and output the block to console')
    .action(() => {
    Command_util_1.ProcessCommand(exports.Solarweave);
    Latest_command_1.LatestBlock();
});
exports.Solarweave
    .command('livestream')
    .description('livestream blocks directly to your arweave database (or locally)')
    .action(() => {
    Command_util_1.ProcessCommand(exports.Solarweave);
    Livestream_command_1.Livestream();
});
exports.Solarweave
    .command('cache')
    .description('retrieve all the blocks that are still available and store them in Arweave')
    .action(() => {
    Command_util_1.ProcessCommand(exports.Solarweave);
    Cache_command_1.Cache();
});
exports.Solarweave.parse(process.argv);
//# sourceMappingURL=Solarweave.js.map