/// <reference types="superagent" />
export declare function GenesisHash(id?: number): Promise<import("superagent").Response>;
export declare function GetFirstSlot(id?: number): Promise<import("superagent").Response>;
export declare function GetSlot(id?: number): Promise<import("superagent").Response>;
export declare function GetBlock(index: number, id?: number): Promise<import("superagent").Response>;
export declare function GetBlocks(Slots: Array<number>): Promise<import("superagent").Response>;
export declare function GetConfirmedBlocks(start: number, end: number, id?: number): Promise<import("superagent").Response>;
