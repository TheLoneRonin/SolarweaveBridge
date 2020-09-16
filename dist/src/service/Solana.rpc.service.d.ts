import * as superagent from 'superagent';
export declare function GenesisHash(id?: number): Promise<superagent.Response>;
export declare function GetFirstSlot(id?: number): Promise<superagent.Response>;
export declare function GetSlot(id?: number): Promise<superagent.Response>;
export declare function GetBlock(index: number, id?: number): Promise<superagent.Response>;
export declare function GetConfirmedBlocks(start: number, end: number, id?: number): Promise<superagent.Response>;
