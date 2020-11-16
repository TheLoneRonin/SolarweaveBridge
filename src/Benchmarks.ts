import 'colors';
import { read } from 'fs-jetpack';
import { Livestream } from './command/Livestream.command';

const Balance = JSON.parse(read(`${__dirname}/../../benchmarks/benchmark.balance.json`));
const BalanceEpoch = Balance.epoch;
const BalanceEpochEnd = Balance.actions[0].epoch;
const BalanceTime = BalanceEpochEnd - BalanceEpoch;

console.log(`Estimated time in ms to query balance`, `${BalanceTime}ms`.green.bold);

const Block = JSON.parse(read(`${__dirname}/../../benchmarks/benchmark.block.json`));
const BlockEpoch = Block.epoch;
const BlockEpochEnd = Block.actions[0].epoch;
const BlockTime = BlockEpochEnd - BlockEpoch;

console.log(`Estimated time in ms to query latest block`, `${BlockTime}ms`.green.bold);

CacheBench('p1', 1);
CacheBench('p4', 4);
CacheBench('p8', 8);
CacheBench('p25', 25);
CacheBench('p50', 50);
CacheBench('p100', 100);

LivestreamBench('p1', 1);
LivestreamBench('p4', 4);
LivestreamBench('p8', 8);
LivestreamBench('p25', 25);
LivestreamBench('p50', 50);
LivestreamBench('p100', 100);

function CacheBench(p: string, divisor: number) {
    const Cache1 = JSON.parse(read(`${__dirname}/../../benchmarks/benchmark.cache.${p}.json`));

    console.log('');

    let Cache1Total = 0;
    let Cache1Average = 0;
    let Cache1Low = 9999999;
    let Cache1High = -1;

    for (let i = 1; i < Cache1.actions.length; i++) {
        const PrevAction = Cache1.actions[i - 1];
        const Action = Cache1.actions[i];
        const Time = Action.epoch - PrevAction.epoch;

        Cache1Total += Time;

        if (Time < Cache1Low) {
            Cache1Low = Time;
        }

        if (Time > Cache1High) {
            Cache1High = Time;
        }
    }

    Cache1Average = (Cache1Total / Cache1.actions.length)

    console.log(`Cache ${p} Block Average Block Upload Time`, `${(Cache1Average / divisor).toFixed(0)}ms`.green.bold);
    console.log(`Cache ${p} Block Lowest Block Upload Time`, `${(Cache1Low / divisor).toFixed(0)}ms`.green.bold);
    console.log(`Cache ${p} Block Highest Block Upload Time`, `${(Cache1High / divisor).toFixed(0)}ms`.green.bold);
}

function LivestreamBench(p: string, divisor: number) {
    const Livestream1 = JSON.parse(read(`${__dirname}/../../benchmarks/benchmark.livestream.${p}.json`));

    console.log('');

    let Livestream1Total = 0;
    let Livestream1Average = 0;
    let Livestream1Low = 9999999;
    let Livestream1High = -1;

    for (let i = 1; i < Livestream1.actions.length; i++) {
        const PrevAction = Livestream1.actions[i - 1];
        const Action = Livestream1.actions[i];
        const Time = Action.epoch - PrevAction.epoch;

        Livestream1Total += Time;

        if (Time < Livestream1Low) {
            Livestream1Low = Time;
        }

        if (Time > Livestream1High) {
            Livestream1High = Time;
        }
    }

    Livestream1Average = (Livestream1Total / Livestream1.actions.length);

    console.log(`Livestream ${p} Block Average Block Upload Time`, `${(Livestream1Average / divisor).toFixed(0)}ms`.green.bold);
    console.log(`Livestream ${p} Block Lowest Block Upload Time`, `${(Livestream1Low / divisor).toFixed(0)}ms`.green.bold);
    console.log(`Livestream ${p} Block Highest Block Upload Time`, `${(Livestream1High / divisor).toFixed(0)}ms`.green.bold);
}