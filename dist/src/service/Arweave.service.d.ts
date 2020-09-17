import { ArweaveTransaction } from '../interface/Arweave.interface';
export declare function LoadWallet(): Promise<any>;
export declare function GetBalance(): Promise<{
    address: any;
    balance: any;
}>;
export declare function SubmitBlockToArweave(transaction: ArweaveTransaction): Promise<boolean>;
export declare function CreateBlockIndices(key: any, transaction: ArweaveTransaction): Promise<void>;
