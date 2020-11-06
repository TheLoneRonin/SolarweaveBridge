import { read, write } from 'fs-jetpack';

import { SolarweaveConfig } from '../Config';
import { Log } from '../util/Log.util';
import { Sleep } from '../util/Sleep.util';

import { GetFirstSlot, GetSlot, GetConfirmedBlocks } from '../service/Solana.rpc.service';
import { CacheBlocks } from '../service/Solana.scanner.service';

export async function Cache() {
    const File = read(`.solarweave.temp`);

    if (File) {
        Log('An existing temp cache was found, restarting the cache process\n'.yellow.bold);
        const slot: number = Number(File);
        TraverseBlocks(slot);
    } else {
        const slotPayload = await GetFirstSlot();
        const slot: number = slotPayload.body.result;
        TraverseBlocks(slot);
    }
}

export async function TraverseBlocks(slot: number) {
    let lastSlot = slot;

    try {
        const slotPayload = await GetSlot();
        const latestSlot: number = slotPayload.body.result;

        Log(`Cache is at Block `.yellow + `${slot}`.yellow.bold +`, latest block is `.yellow + `${latestSlot ? latestSlot : 'Unknown (getSlot RPC Error)'}`.yellow.bold);

        const ConfirmedBlocks = await GetConfirmedBlocks(slot, slot + SolarweaveConfig.parallelize * 10);
        const Slots = ConfirmedBlocks.body.result;

        if (Slots) {
            for (let i = 0; i < Slots.length; i += SolarweaveConfig.parallelize) {
                const PromisedSlots = [];
                
                for (let j = 0; j < SolarweaveConfig.parallelize && i + j < Slots.length; j++) {
                    PromisedSlots.push(Slots[i + j]);
                }

                await CacheBlocks(PromisedSlots);
                
                lastSlot = Slots[i];
                write(`.solarweave.temp`, (lastSlot).toString());
            }

            TraverseBlocks(lastSlot);
        } else {
            if (slotPayload.body.error) {
                Log(`RPC ERROR CODE ${slotPayload.body.error.code}: ${slotPayload.body.error.message}`.red.bold);
            } else {
                Log(`Could not retrieve slots`.red.bold);
            }
        }
    } catch (error) {
        if (error.response) {
            console.error(`RPC ERROR: ${error.response.text}\n`.red.bold);
        } else {
            console.error(error);
        }
        Log(`Attempting to restart caching process\n`.yellow.bold)
        
        await Sleep(2500);
        
        TraverseBlocks(lastSlot);
    }
}