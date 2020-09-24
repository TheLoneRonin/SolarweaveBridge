export interface SolarweaveInterface {
    rpc_version: string;
    database: string;
    arweaveGraphQL: string;
    url: string;
    credentials: string;
    local: boolean;
    localFile: string;
    console: boolean;
    compressed: boolean;
    parallelize: number;
    benchmark: boolean;
    verify: boolean;
}
