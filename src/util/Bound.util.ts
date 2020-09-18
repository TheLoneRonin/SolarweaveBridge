export function DetermineLowerbound(slot: number, range: number = 25) {
    for (let i = slot - range; i < slot + range; i++) {
        const mod = i % range;
        if (mod === 0) {
            return i;
        }
    }

    return null;
}

export function DetermineUpperbound(slot: number, range: number = 25) {
    for (let i = slot + range; i > slot - range; i--) {
        const mod = i % range;
        if (mod === 0) {
            return i;
        }
    }

    return null;
}