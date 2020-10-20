import { ArweaveTransaction } from '../interface/Arweave.interface';
export declare const NONCE = "170A240D55E8D4A96647180DEE407C28D5388DF5653895859B4C76B6D5D99DD7";
export declare function LoadWallet(): Promise<any>;
export declare function GetBalance(): Promise<{
    address: string;
    balance: string;
}>;
export declare function SubmitBlockToArweave(transactions: ArweaveTransaction[]): Promise<boolean>;
export declare function BundleItem(transaction: ArweaveTransaction, key: any): Promise<import("arweave-bundles").DataItemJson>;
export declare function BundleIndices(transaction: ArweaveTransaction, key: any): Promise<any[]>;
