import { Log } from '../util/Log.util';
import { LogBenchmark } from '../util/Benchmark.util';
import { GetBalance } from '../service/Arweave.service';

export async function Balance() {
    const { address, balance } = await GetBalance();
    Log(`Your Arweave public address is `.green + `${address}`.green.bold)
    Log(`Your Arweave balance is `.green + `${balance}\n`.green.bold);
    LogBenchmark('get_balance');
}