import { UpdateConfig } from '../Config';

export function ProcessCommand(Solarweave) {
    const { database, url, credentials, local, localFile, console, uncompressed, parallelize, benchmark, noverify } = Solarweave;
    UpdateConfig(
        `2.0`,
        database,
        url,
        credentials,
        local,
        localFile,
        console ? false : true,
        uncompressed ? false : true,
        Number(parallelize),
        benchmark,
        noverify ? false : true,
    );
}