import { post } from 'superagent';
import { SolarweaveConfig } from '../Config';
import { LogRequest } from '../util/Log.util';

export async function GenesisHash(id :number = 1) {
    const request = {
        jsonrpc: SolarweaveConfig.rpc_version,
        id,
        method: `getGenesisHash`,
    };

    const payload = await post(SolarweaveConfig.url).send(request);
    
    LogRequest('getGenesisHash', request, payload);

    return payload;
}

export async function GetFirstSlot(id :number = 1) {
    const request = {
        jsonrpc: SolarweaveConfig.rpc_version,
        id,
        method: `getFirstAvailableBlock`,
    };

    const payload = await post(SolarweaveConfig.url).send(request);
    
    LogRequest('getFirstAvailableBlock', request, payload);

    return payload;
}

export async function GetSlot(id :number = 1) {
    const request = {
        jsonrpc: SolarweaveConfig.rpc_version,
        id,
        method: `getSlot`,
    };

    const payload = await post(SolarweaveConfig.url).send(request);

    LogRequest('getSlot', request, payload);

    return payload;
}

export async function GetBlock(index: number, id?: number) {
    const request = {
        jsonrpc: SolarweaveConfig.rpc_version,
        id: (id ? id : index),
        method: `getConfirmedBlock`,
        params: [index],
    };

    const payload = await post(SolarweaveConfig.url).send(request);

    LogRequest('getConfirmedBlock', request, payload);

    return payload;
}

export async function GetBlocks(Slots: Array<number>) {
    const object = [];

    for (let i = 0; i < Slots.length; i++) {
        object.push({
            jsonrpc: SolarweaveConfig.rpc_version,
            id: Slots[i],
            method: `getConfirmedBlock`,
            params: [Slots[i]],
        });
    }

    const payload = await post(SolarweaveConfig.url).send(object);

    LogRequest('getConfirmedBlock', object, payload);

    return payload;
}

export async function GetConfirmedBlocks(start: number, end: number, id?: number) {
    const request = {
        jsonrpc: SolarweaveConfig.rpc_version,
        id: (id ? id : start),
        method: `getConfirmedBlocks`,
        params: [start, end],
    };

    const payload = await post(SolarweaveConfig.url).send(request);

    LogRequest('getConfirmedBlocks', request, payload);

    return payload;
}