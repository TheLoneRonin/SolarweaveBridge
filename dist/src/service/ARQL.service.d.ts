export declare function ParsePayload(data: any): Promise<any>;
export declare function RetrieveBlockBySlot(slot: number, database?: string): Promise<any>;
export declare function RetrieveBlockByBlockhash(blockhash: string, database?: string): Promise<any>;
export declare function RetrieveBlockBySignature(signature: string, database?: string): Promise<any>;
export declare function RetrieveBlocksFromAccount(accountKey: string, database?: string): Promise<any>;
export declare function RetrieveBlockData(arweaveTxId: string): Promise<{
    database: string;
    slot: string;
    parentSlot: string;
    accountKey: string;
    blockhash: string;
    defaultSignature: string;
}>;
