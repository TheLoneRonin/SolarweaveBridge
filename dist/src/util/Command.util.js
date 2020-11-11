"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessCommand = void 0;
var Config_1 = require("../Config");
function ProcessCommand(Solarweave) {
    var database = Solarweave.database, gql = Solarweave.gql, url = Solarweave.url, credentials = Solarweave.credentials, local = Solarweave.local, localFile = Solarweave.localFile, console = Solarweave.console, uncompressed = Solarweave.uncompressed, parallelize = Solarweave.parallelize, batch = Solarweave.batch, benchmark = Solarweave.benchmark, noverify = Solarweave.noverify, index = Solarweave.index, start = Solarweave.start, end = Solarweave.end;
    Config_1.UpdateConfig("2.0", database, gql, url, credentials, local, localFile, console ? false : true, uncompressed ? false : true, Number(parallelize), Number(batch), benchmark, noverify ? false : true, index, Number(start), Number(end));
}
exports.ProcessCommand = ProcessCommand;
//# sourceMappingURL=Command.util.js.map