import * as superagent from 'superagent';
import { SOLANA_RPC_URL, SOLANA_RPC_VERSION as jsonrpc } from '../Config';

export async function GenesisHash(id :number = 1) {
    const payload = await superagent
        .post(SOLANA_RPC_URL)
        .send({
            jsonrpc,
            id,
            method: `getGenesisHash`,
        });

    return payload;
}