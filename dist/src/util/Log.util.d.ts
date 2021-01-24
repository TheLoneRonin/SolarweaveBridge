import { Response } from 'superagent';
export declare function Log(output: any): void;
export declare function LogRequest(type: string, request: any, payload: Response): void;
export declare function LogArweave(status: number, statusText: string): void;
