import { Log } from '../util/Log.util';
import { GetLatestBlock } from '../service/Solana.scanner.service';

export async function LatestBlock() {
    Log(`Preparing to retrieve the latest block\n`.green);
    const Block = await GetLatestBlock();

    Log(`Found Block with Parent Slot `.green + `#${Block.parentSlot}`.green.bold);
    Log(`Block Hash: ${Block.blockhash}`.green);
    Log(`Previous Block Hash: ${Block.previousBlockhash}`.green + '\n\n');
    
    Log(`Block Data`);
    Log(JSON.stringify(Block, null, 2));
}