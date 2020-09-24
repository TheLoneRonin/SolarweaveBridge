export declare function ParsePayload(data: any): Promise<any>;
export declare function GraphQL(query: string): Promise<any>;
export declare function RetrieveBlocks(first?: number, after?: string, database?: string): Promise<any>;
export declare function RetrieveBlock(arweaveBlockhash: string): Promise<any>;
export declare function RetrieveBlockhash(solanaBlockhash: string, database?: string): Promise<{
    BlockData: any;
    Tags: any;
}>;
export declare function RetrieveSignature(solanaSignature: string, database?: string): Promise<{
    BlockData: any;
    Tags: any;
}>;
export declare function RetrieveAccount(accountKey: string, first?: number, after?: string, database?: string): Promise<any>;
