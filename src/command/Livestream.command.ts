import { read, write } from 'fs-jetpack';

import { SolarweaveConfig } from '../Config';
import { Log } from '../util/Log.util';
import { Sleep } from '../util/Sleep.util';

import { GetSlot, GetConfirmedBlocks } from '../service/Solana.rpc.service';
import { CacheBlocks } from '../service/Solana.scanner.service';

export async function Livestream() {
    const File = read(`.solarweave.temp`);

    if (SolarweaveConfig.start && !isNaN(SolarweaveConfig.start)) {
        Log(`Starting Solarweave at Block #${SolarweaveConfig.start}\n`.yellow.bold);
        StreamBlocks(SolarweaveConfig.start);
    } else if (File) {
        Log('An existing temp cache was found, restarting the livestream process\n'.yellow.bold);
        const slot: number = Number(File);
        StreamBlocks(slot);
    } else {
        const slotPayload = await GetSlot();
        const slot: number = slotPayload.body.result;
        StreamBlocks(slot);
    }
}

export async function StreamBlocks(slot: number) {
    let lastSlot = slot;
    
    try {
        const slotPayload = await GetSlot();
        const latestSlot: number = slotPayload.body.result;
        
        Log(`Livestream is at Block `.yellow + `${slot}`.yellow.bold +`, latest block is `.yellow + `${latestSlot}`.yellow.bold);

        let EndSlot = slot + (SolarweaveConfig.parallelize * SolarweaveConfig.batch) - 1;
        let end = false;
        if (SolarweaveConfig.end && !isNaN(SolarweaveConfig.end) && EndSlot > SolarweaveConfig.end) {
            EndSlot = SolarweaveConfig.end;
            end = true;
        }

        const ConfirmedBlocks = await GetConfirmedBlocks(slot, EndSlot);
        const Slots = ConfirmedBlocks.body.result;

        if (latestSlot && Slots) {
            for (let i = 0; i < Slots.length; i += (SolarweaveConfig.parallelize * SolarweaveConfig.batch)) {
                const PromisedSlots = [];
                
                for (let j = 0; j < (SolarweaveConfig.parallelize * SolarweaveConfig.batch) && i + j < Slots.length; j++) {
                    PromisedSlots.push(Slots[i + j]);
                }

                if (PromisedSlots.length > 0) {
                    await CacheBlocks(PromisedSlots);
                }
            }

            if (!isNaN(Slots[Slots.length - 1])) {
                lastSlot = Slots[Slots.length - 1] + 1;
                write(`.solarweave.temp`, (lastSlot).toString());
            }

            if (!Slots || Slots.length === 0) {
                throw new Error('Could not retrieve slots');
            }

            if (end) {
                Log(`Solarweave has reached your specified end block, now exiting`.green);
                process.exit();
            }

            if (Slots.length > 0) {
                StreamBlocks(lastSlot);
            } else {
                Log(`Solarweave did not retrieve any blocks on the last query, waiting a few seconds before querying again`.blue);
                await Sleep(5000);
                StreamBlocks(lastSlot);
            }
            
        } else {
            if (slotPayload.body.error) {
                Log(`RPC ERROR CODE ${slotPayload.body.error.code}: ${slotPayload.body.error.message}`.red.bold);
            } else {
                Log(`Could not retrieve slots`.red.bold);
            }
        }
    } catch (error) {
        if (error.response) {
            console.error(`RPC ERROR: ${error.response}\n`.red.bold);
        } else {
            console.error(error);
        }

        Log(`Attempting to restart streaming service\n`.yellow.bold)
        
        await Sleep(2500);
        
        StreamBlocks(lastSlot);
    }
}