import { SolarweaveInterface } from './interface/Solarweave.interface';
export declare const arweave: any;
export declare let SolarweaveConfig: SolarweaveInterface;
export declare function UpdateConfig(rpc_version: string, database: string, url: string, credentials: string, local: boolean, localFile: string, console: boolean, compressed: boolean, parallelize: number, benchmark: boolean, verify: boolean): void;
