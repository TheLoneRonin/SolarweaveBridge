"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetermineUpperbound = exports.DetermineLowerbound = void 0;
function DetermineLowerbound(slot, range) {
    if (range === void 0) { range = 25; }
    for (var i = slot - range; i < slot + range; i++) {
        var mod = i % range;
        if (mod === 0) {
            return i;
        }
    }
    return null;
}
exports.DetermineLowerbound = DetermineLowerbound;
function DetermineUpperbound(slot, range) {
    if (range === void 0) { range = 25; }
    for (var i = slot + range; i > slot - range; i--) {
        var mod = i % range;
        if (mod === 0) {
            return i;
        }
    }
    return null;
}
exports.DetermineUpperbound = DetermineUpperbound;
//# sourceMappingURL=Bound.util.js.map