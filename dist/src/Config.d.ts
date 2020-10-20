import Arweave from 'arweave/node';
import { SolarweaveInterface } from './interface/Solarweave.interface';
export declare const arweave: Arweave;
export declare const ArData: {
    createData: any;
    sign: any;
    addTag: any;
    verify: any;
    decodeData: any;
    decodeTag: any;
    decodeTagAt: any;
    unpackTags: any;
    bundleData: any;
    unbundleData: any;
};
export declare let SolarweaveConfig: SolarweaveInterface;
export declare function UpdateConfig(rpc_version: string, database: string, arweaveGraphQL: string, url: string, credentials: string, local: boolean, localFile: string, console: boolean, compressed: boolean, parallelize: number, benchmark: boolean, verify: boolean): void;
