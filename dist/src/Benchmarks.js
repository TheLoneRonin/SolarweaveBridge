"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var fs_jetpack_1 = require("fs-jetpack");
var Balance = JSON.parse(fs_jetpack_1.read(__dirname + "/../../benchmarks/benchmark.balance.json"));
var BalanceEpoch = Balance.epoch;
var BalanceEpochEnd = Balance.actions[0].epoch;
var BalanceTime = BalanceEpochEnd - BalanceEpoch;
console.log("Estimated time in ms to query balance", (BalanceTime + "ms").green.bold);
var Block = JSON.parse(fs_jetpack_1.read(__dirname + "/../../benchmarks/benchmark.block.json"));
var BlockEpoch = Block.epoch;
var BlockEpochEnd = Block.actions[0].epoch;
var BlockTime = BlockEpochEnd - BlockEpoch;
console.log("Estimated time in ms to query latest block", (BlockTime + "ms").green.bold);
CacheBench('p1', 1);
CacheBench('p4', 4);
CacheBench('p8', 8);
LivestreamBench('p1', 1);
LivestreamBench('p4', 4);
LivestreamBench('p8', 8);
function CacheBench(p, divisor) {
    var Cache1 = JSON.parse(fs_jetpack_1.read(__dirname + "/../../benchmarks/benchmark.cache." + p + ".json"));
    console.log('');
    var Cache1Total = 0;
    var Cache1Average = 0;
    var Cache1Low = 9999999;
    var Cache1High = -1;
    for (var i = 1; i < Cache1.actions.length; i++) {
        var PrevAction = Cache1.actions[i - 1];
        var Action = Cache1.actions[i];
        var Time = Action.epoch - PrevAction.epoch;
        Cache1Total += Time;
        if (Time < Cache1Low) {
            Cache1Low = Time;
        }
        if (Time > Cache1High) {
            Cache1High = Time;
        }
    }
    Cache1Average = (Cache1Total / Cache1.actions.length);
    console.log("Cache " + p + " Block Average Block Upload Time", ((Cache1Average / divisor).toFixed(0) + "ms").green.bold);
    console.log("Cache " + p + " Block Lowest Block Upload Time", ((Cache1Low / divisor).toFixed(0) + "ms").green.bold);
    console.log("Cache " + p + " Block Highest Block Upload Time", ((Cache1High / divisor).toFixed(0) + "ms").green.bold);
}
function LivestreamBench(p, divisor) {
    var Livestream1 = JSON.parse(fs_jetpack_1.read(__dirname + "/../../benchmarks/benchmark.livestream." + p + ".json"));
    console.log('');
    var Livestream1Total = 0;
    var Livestream1Average = 0;
    var Livestream1Low = 9999999;
    var Livestream1High = -1;
    for (var i = 1; i < Livestream1.actions.length; i++) {
        var PrevAction = Livestream1.actions[i - 1];
        var Action = Livestream1.actions[i];
        var Time = Action.epoch - PrevAction.epoch;
        Livestream1Total += Time;
        if (Time < Livestream1Low) {
            Livestream1Low = Time;
        }
        if (Time > Livestream1High) {
            Livestream1High = Time;
        }
    }
    Livestream1Average = (Livestream1Total / Livestream1.actions.length);
    console.log("Livestream " + p + " Block Average Block Upload Time", ((Livestream1Average / divisor).toFixed(0) + "ms").green.bold);
    console.log("Livestream " + p + " Block Lowest Block Upload Time", ((Livestream1Low / divisor).toFixed(0) + "ms").green.bold);
    console.log("Livestream " + p + " Block Highest Block Upload Time", ((Livestream1High / divisor).toFixed(0) + "ms").green.bold);
}
//# sourceMappingURL=Benchmarks.js.map