import * as superagent from 'superagent';
import { SolarweaveConfig } from '../Config';

export async function GenesisHash(id :number = 1) {
    const payload = await superagent
        .post(SolarweaveConfig.url)
        .send({
            jsonrpc: SolarweaveConfig.rpc_version,
            id,
            method: `getGenesisHash`,
        });

    return payload;
}

export async function GetFirstSlot(id :number = 1) {
    const payload = await superagent
        .post(SolarweaveConfig.url)
        .send({
            jsonrpc: SolarweaveConfig.rpc_version,
            id,
            method: `getFirstAvailableBlock`,
        });

    return payload;
}

export async function GetSlot(id :number = 1) {
    const payload = await superagent
        .post(SolarweaveConfig.url)
        .send({
            jsonrpc: SolarweaveConfig.rpc_version,
            id,
            method: `getSlot`,
        });

    return payload;
}

export async function GetBlock(index: number, id?: number) {
    const payload = await superagent
        .post(SolarweaveConfig.url)
        .send({
            jsonrpc: SolarweaveConfig.rpc_version,
            id: (id ? id : index),
            method: `getConfirmedBlock`,
            params: [index],
        });

    return payload;
}

export async function GetConfirmedBlocks(start: number, end: number, id?: number) {
    const payload = await superagent
        .post(SolarweaveConfig.url)
        .send({
            jsonrpc: SolarweaveConfig.rpc_version,
            id: (id ? id : start),
            method: `getConfirmedBlocks`,
            params: [start, end],
        });

    return payload;
}