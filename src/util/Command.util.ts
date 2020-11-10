import { UpdateConfig } from '../Config';

export function ProcessCommand(Solarweave) {
    const { database, gql, url, credentials, local, localFile, console, uncompressed, parallelize, benchmark, noverify, index, start, end } = Solarweave;
    UpdateConfig(
        `2.0`,
        database,
        gql,
        url,
        credentials,
        local,
        localFile,
        console ? false : true,
        uncompressed ? false : true,
        Number(parallelize),
        benchmark,
        noverify ? false : true,
        index,
        Number(start),
        Number(end),
    );
}