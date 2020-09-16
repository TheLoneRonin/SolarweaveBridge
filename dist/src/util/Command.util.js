"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessCommand = void 0;
const Config_1 = require("../Config");
function ProcessCommand(Solarweave) {
    const { database, url, credentials, local, localFile, console, uncompressed, parallelize, benchmark, noverify } = Solarweave;
    Config_1.UpdateConfig(`2.0`, database, url, credentials, local, localFile, console ? false : true, uncompressed ? false : true, Number(parallelize), benchmark, noverify ? false : true);
}
exports.ProcessCommand = ProcessCommand;
//# sourceMappingURL=Command.util.js.map