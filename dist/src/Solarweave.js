#!/usr/bin/env node
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solarweave = exports.Benchmark = void 0;
require("colors");
var commander_1 = require("commander");
var Command_util_1 = require("./util/Command.util");
var Balance_command_1 = require("./command/Balance.command");
var Latest_command_1 = require("./command/Latest.command");
var Livestream_command_1 = require("./command/Livestream.command");
var Cache_command_1 = require("./command/Cache.command");
var Index_command_1 = require("./command/Index.command");
exports.Benchmark = {
    epoch: Number(new Date()),
    actions: [],
};
exports.Solarweave = new commander_1.Command('Solarweave Bridge');
exports.Solarweave
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
    .option('--index', 'if caching to Arweave, index blocks according to signatures and account keys', false);
exports.Solarweave
    .command('balance')
    .description('retrieve the public address and balance of your Arweave wallet')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        Command_util_1.ProcessCommand(exports.Solarweave);
        Balance_command_1.Balance();
        return [2 /*return*/];
    });
}); });
exports.Solarweave
    .command('latest')
    .description('retrieve the latest block and output the block to console')
    .action(function () {
    Command_util_1.ProcessCommand(exports.Solarweave);
    Latest_command_1.LatestBlock();
});
exports.Solarweave
    .command('livestream')
    .description('livestream blocks directly to your arweave database (or locally)')
    .action(function () {
    Command_util_1.ProcessCommand(exports.Solarweave);
    Livestream_command_1.Livestream();
});
exports.Solarweave
    .command('cache')
    .description('retrieve all the blocks that are still available and store them in Arweave')
    .action(function () {
    Command_util_1.ProcessCommand(exports.Solarweave);
    Cache_command_1.Cache();
});
exports.Solarweave
    .command('index')
    .description('index an existing database with their Account Keys and Signatures')
    .action(function () {
    Command_util_1.ProcessCommand(exports.Solarweave);
    Index_command_1.Index();
});
exports.Solarweave
    .command('version')
    .description('Get the current version of Solarweave')
    .action(function () {
    console.log("Solarweave v1.9.3".green.bold);
});
exports.Solarweave.parse(process.argv);
//# sourceMappingURL=Solarweave.js.map