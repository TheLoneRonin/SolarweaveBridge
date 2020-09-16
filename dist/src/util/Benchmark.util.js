"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogBenchmark = void 0;
const fs_jetpack_1 = require("fs-jetpack");
const Config_1 = require("../Config");
const Solarweave_1 = require("../Solarweave");
function LogBenchmark(action) {
    if (Config_1.SolarweaveConfig.benchmark) {
        const epoch = Number(new Date());
        Solarweave_1.Benchmark.actions.push({ action, epoch });
        fs_jetpack_1.write('benchmark.json', JSON.stringify(Solarweave_1.Benchmark, null, 2));
    }
}
exports.LogBenchmark = LogBenchmark;
//# sourceMappingURL=Benchmark.util.js.map