export declare function GetLatestBlock(): Promise<any>;
export declare function AddBlocksToCache(Blocks: any, type?: string): Promise<string>;
export declare function CacheBlocks(Slots: Array<number>, type?: string): Promise<void>;
