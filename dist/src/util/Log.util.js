"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
var Config_1 = require("../Config");
function Log(output) {
    Config_1.SolarweaveConfig.console ? console.log(output) : null;
}
exports.Log = Log;
//# sourceMappingURL=Log.util.js.map