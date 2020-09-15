import 'colors';
import { read } from 'fs-jetpack';

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

const Cache1 = JSON.parse(read(`${__dirname}/../../benchmarks/benchmark.cache.p1.json`));

console.log('');

let Cache1Total = 0;
let Cache1Average = '';
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

Cache1Average = (Cache1Total / Cache1.actions.length).toFixed(0);

console.log(`Cache P1 Block Average Block Upload Time`, `${Cache1Average}ms`.green.bold);
console.log(`Cache P1 Block Lowest Block Upload Time`, `${Cache1Low}ms`.green.bold);
console.log(`Cache P1 Block Highest Block Upload Time`, `${Cache1High}ms`.green.bold);

const Livestream1 = JSON.parse(read(`${__dirname}/../../benchmarks/benchmark.livestream.p1.json`));

console.log('');

let Livestream1Total = 0;
let Livestream1Average = '';
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

Livestream1Average = (Livestream1Total / Livestream1.actions.length).toFixed(0);

console.log(`Livestream P1 Block Average Block Upload Time`, `${Livestream1Average}ms`.green.bold);
console.log(`Livestream P1 Block Lowest Block Upload Time`, `${Livestream1Low}ms`.green.bold);
console.log(`Livestream P1 Block Highest Block Upload Time`, `${Livestream1High}ms`.green.bold);