import { SolanaTransaction } from './Solana.interface';
export interface ArweaveTransaction {
    tags: {
        database: string;
        parentSlot: string;
        slot: string;
        blockhash: string;
        transactions: Array<SolanaTransaction>;
    };
    payload: any;
}
