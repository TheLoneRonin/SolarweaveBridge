import 'colors';
import { GetFirstSlot, GetConfirmedBlocks, GetBlock } from './service/Solana.rpc.service';
import { CompressBlock } from './service/Compression.service';

export async function Analyze() {
    const firstSlotPayload = await GetFirstSlot();
    const firstSlot = firstSlotPayload.body.result;

    const Benchmarks = [];

    for (let i = firstSlot; i < firstSlot + 25; i++) {
        const BlockPayload = await GetBlock(i);
        const Block = BlockPayload.body.result;
        const CompressedBlock = await CompressBlock(Block);
    
        Benchmarks.push({
            n: JSON.stringify(Block).length,
            c: CompressedBlock.length,
        });
    }

    let totaln = 0;
    let averagen = 0;
    let totalc = 0;
    let averagec  = 0;
    let highn = -1;
    let lown = 999999;
    let highc = -1;
    let lowc = 999999;

    for (let i = 0; i < Benchmarks.length; i++) {
        const B = Benchmarks[i];
        totaln += B.n;
        totalc += B.c;

        if (B.n > highn) { highn = B.n; }
        if (B.n < lown) { lown = B.n; }
        
        if (B.c > highc) { highc = B.c; }
        if (B.c < lowc) { lowc = B.c; }
    }

    averagen = (totaln / Benchmarks.length);
    averagec = (totalc / Benchmarks.length);

    console.log(`Uncompressed Average Block Size`, `${averagen} bytes`.green.bold);
    console.log(`Uncompressed Lowest Block Size`, `${lown} bytes`.green.bold);
    console.log(`Uncompressed Highest Block Size`, `${highn} bytes`.green.bold);

    console.log('');

    console.log(`Compressed Average Block Size`, `${averagec} bytes`.green.bold);
    console.log(`Compressed Lowest Block Size`, `${lowc} bytes`.green.bold);
    console.log(`Compressed Highest Block Size`, `${highc} bytes`.green.bold);
}

(async () => await Analyze())();