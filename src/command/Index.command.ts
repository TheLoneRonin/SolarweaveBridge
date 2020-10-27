import { read, write } from 'fs-jetpack';

import { SolarweaveConfig } from '../Config';
import { Log } from '../util/Log.util';
import { Sleep } from '../util/Sleep.util';

import { RetrieveBlocks, RetrieveBlock } from '../service/ARQL.service';
import { GetFirstSlot } from '../service/Solana.rpc.service';
import { AddBlocksToCache } from '../service/Solana.scanner.service';

export async function Index() {
  const File = read(`.solarweave.temp`);

  if (File) {
      Log('An existing temp cache was found, restarting the cache process\n'.yellow.bold);
      TraverseBlocks();
  } else {
      TraverseBlocks();
  }
}

export async function TraverseBlocks(cursor: string = '') {
  let Cursor = cursor;

  try {
    const BlockIndices = await RetrieveBlocks(SolarweaveConfig.parallelize, cursor);
    const BlockPromises = [];
    
    for (let i = 0; i < BlockIndices.length; i++) {
      const BlockIndex = BlockIndices[i];
      const ArweaveId = BlockIndex.node.id;
      
      Cursor = BlockIndex.cursor;

      const BlockTags = BlockIndex.node.tags.map(tag => {
        return { name: tag.name, value: tag.value };
      });

      const BlockPromise = new Promise(async resolve => {
        const Block = JSON.parse(await RetrieveBlock(ArweaveId));
        const Slot = Number(BlockTags.filter(t => t.name === 'slot')[0].value);
  
        return resolve({ Block, Slot });
      });

      BlockPromises.push(BlockPromise);
    }

    const Blocks = (await Promise.all(BlockPromises)).filter(b => b !== null);    

    if (Blocks.length > 0) {
      const Error: string = await AddBlocksToCache(Blocks, 'index');
      if (Error) { Log(Error) }
      TraverseBlocks(Cursor);
    } else {
      Log(`Solarweave Index Database is now in sync with the latest block`.yellow);
    }
  } catch (error) {
      if (error.response) {
          console.error(`RPC ERROR: ${error.response.text}\n`.red.bold);
      } else {
          console.error(error);
      }
      Log(`Attempting to restart caching process\n`.yellow.bold)
      
      await Sleep(2500);
      
      TraverseBlocks(Cursor);
  }
}