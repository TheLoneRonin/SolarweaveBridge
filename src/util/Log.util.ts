import { Response } from 'superagent';
import { SolarweaveConfig } from '../Config';

export function Log(output: any) {
    SolarweaveConfig.console ? console.log(output) : null;
}

export function LogRequest(type: string, request: any, payload: Response) {
    if (SolarweaveConfig.debug) {
        const code = payload.status;
        const body = payload.body;

        Log(`[${code}] ${type} Solana RPC Request`.yellow.bold);
        Log(`RPC Request`.blue.bold);
        Log(JSON.stringify(request, null , 2));
        Log(`RPC Response`.blue.bold);
        Log(JSON.stringify(body, null , 2));
    }
}

export function LogArweave(status: number, statusText: string) {
    if (SolarweaveConfig.debug) {
        Log(`[${status}] Arweave Upload`.yellow.bold);
        Log(statusText);
    }
}