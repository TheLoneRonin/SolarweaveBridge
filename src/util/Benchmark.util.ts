import { write } from 'fs-jetpack';
import { SolarweaveConfig } from '../Config';
import { Benchmark } from '../Solarweave';

export function LogBenchmark(action) {
    if (SolarweaveConfig.benchmark) {
        const epoch = Number(new Date());
        Benchmark.actions.push({ action, epoch });
        write('benchmark.json', JSON.stringify(Benchmark, null, 2));
    }
}