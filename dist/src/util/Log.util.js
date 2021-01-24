"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogArweave = exports.LogRequest = exports.Log = void 0;
var Config_1 = require("../Config");
function Log(output) {
    Config_1.SolarweaveConfig.console ? console.log(output) : null;
}
exports.Log = Log;
function LogRequest(type, request, payload) {
    if (Config_1.SolarweaveConfig.debug) {
        var code = payload.status;
        var body = payload.body;
        Log(("[" + code + "] " + type + " Solana RPC Request").yellow.bold);
        Log("RPC Request".blue.bold);
        Log(JSON.stringify(request, null, 2));
        Log("RPC Response".blue.bold);
        Log(JSON.stringify(body, null, 2));
    }
}
exports.LogRequest = LogRequest;
function LogArweave(status, statusText) {
    if (Config_1.SolarweaveConfig.debug) {
        Log(("[" + status + "] Arweave Upload").yellow.bold);
        Log(statusText);
    }
}
exports.LogArweave = LogArweave;
//# sourceMappingURL=Log.util.js.map