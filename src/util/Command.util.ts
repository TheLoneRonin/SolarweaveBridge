import { UpdateConfig } from '../Config';

export function ProcessCommand(Solarweave) {
    const { database, gql, url, credentials, local, localFile, console, debug, uncompressed, parallelize, batch, benchmark, noverify, index, start, end } = Solarweave;
    UpdateConfig(
        `2.0`,
        database,
        gql,
        url,
        credentials,
        local,
        localFile,
        console ? false : true,
        debug,
        uncompressed ? false : true,
        Number(parallelize),
        Number(batch),
        benchmark,
        noverify ? false : true,
        index,
        Number(start),
        Number(end),
    );
}