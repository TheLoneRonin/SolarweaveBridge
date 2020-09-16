import { ArweaveTransaction } from '../interface/Arweave.interface';
export declare function LoadWallet(): Promise<any>;
export declare function GetBalance(): Promise<{
    address: string;
    balance: string;
}>;
export declare function SubmitBlockToArweave(transaction: ArweaveTransaction): Promise<boolean>;
export declare function CreateBlockIndices(key: any, tx: any, transaction: ArweaveTransaction): Promise<any>;
export declare function RetrieveBlockBySlot(slot: number): Promise<any>;
export declare function RetrieveBlockByBlockhash(blockhash: string): Promise<any>;
