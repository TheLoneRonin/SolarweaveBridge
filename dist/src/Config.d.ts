import Arweave from 'arweave/node';
import { SolarweaveInterface } from './interface/Solarweave.interface';
export declare const arweave: Arweave;
export declare const ArData: {
    createData(opts: import("arweave-bundles").DataItemCreateOptions, jwk: import("arweave-bundles/lib/interface-jwk").JWKPublicInterface): Promise<import("arweave-bundles").DataItemJson>;
    sign(d: import("arweave-bundles").DataItemJson, jwk: import("arweave-bundles/lib/interface-jwk").JWKInterface): Promise<import("arweave-bundles").DataItemJson>;
    addTag(d: import("arweave-bundles").DataItemJson, name: string, value: string): void;
    verify(d: import("arweave-bundles").DataItemJson): Promise<boolean>;
    decodeData(d: import("arweave-bundles").DataItemJson, options?: {
        string: boolean;
    }): Promise<string | Uint8Array>;
    decodeTag(tag: {
        name: string;
        value: string;
    }): Promise<{
        name: string;
        value: string;
    }>;
    decodeTagAt(d: import("arweave-bundles").DataItemJson, index: number): Promise<{
        name: string;
        value: string;
    }>;
    unpackTags(d: import("arweave-bundles").DataItemJson): Promise<Record<string, string | string[]>>;
    bundleData(txData: any): Promise<{
        items: import("arweave-bundles").DataItemJson[];
    }>;
    unbundleData(txData: any): Promise<import("arweave-bundles").DataItemJson[]>;
};
export declare const SolarweaveConfig: SolarweaveInterface;
export declare function UpdateConfig(rpc_version: string, database: string, arweaveGraphQL: string, url: string, credentials: string, local: boolean, localFile: string, console: boolean, debug: boolean, compressed: boolean, parallelize: number, batch: number, benchmark: boolean, verify: boolean, index: boolean, start?: number, end?: number): void;
