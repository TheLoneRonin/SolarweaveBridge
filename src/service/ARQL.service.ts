import { post } from 'superagent';
import { SolarweaveConfig, arweave } from '../Config';
import { DecompressBlock } from '../service/Compression.service';

export async function ParsePayload(data) {
    let isBase64 = false;
    let payload = null;

    try {
        payload = JSON.parse(data.toString());
    } catch (error) {
        isBase64 = true;
    }

    if (isBase64) {
        payload = await DecompressBlock(data.toString());
    }

    return payload;
}

export async function GraphQL(query: string) {
    const payload = await post(SolarweaveConfig.arweaveGraphQL)
        .send({ query });
    
    return payload.body.data.transactions.edges;
}

export async function RetrieveBlocks(first: number = 25, after?: string,  database: string = `${SolarweaveConfig.database}`) {
    const query = `query {
        transactions(
            first: ${first},
            ${after ? `after: "${after}"` : ``},
            tags: [
                { name: "database", values: ["${database}"] }
            ],
            sort: HEIGHT_DESC
        ) {
            edges {
                cursor
                node {
                    id
                    tags {
                        name
                        value
                    }
                }
            }
        }
    }`;

    return await GraphQL(query);
}

export async function RetrieveBlock(arweaveBlockhash: string) {
    const data = await arweave.transactions.getData(arweaveBlockhash, { decode: true, string: true });
    if (data) {
        return await ParsePayload(data);
    } else {
        return null;
    }
}

export async function RetrieveBlockhash(solanaBlockhash: string, database: string = `${SolarweaveConfig.database}`) {
    const query = `query {
        transactions(
            first: 1,
            tags: [
                { name: "database", values: ["${database}"] }
                { name: "blockhash", values: ["${solanaBlockhash}"] }
            ]
        ) {
            edges {
                cursor
                node {
                    id
                    tags {
                        name
                        value
                    }
                }
            }
        }
    }`;

    const edges = await GraphQL(query);

    if (edges.length > 0) {
        const BlockData = await RetrieveBlock(edges[0].node.id);
        const Tags = edges[0].node.tags;

        return { BlockData: JSON.parse(BlockData), Tags };
    } else {
        return null;
    } 
}

export async function RetrieveSlot(solanaSlot: string, database: string = `${SolarweaveConfig.database}`) {
    const query = `query {
        transactions(
            first: 1,
            tags: [
                { name: "database", values: ["${database}"] }
                { name: "slot", values: ["${solanaSlot}"] }
            ]
        ) {
            edges {
                cursor
                node {
                    id
                    tags {
                        name
                        value
                    }
                }
            }
        }
    }`;

    const edges = await GraphQL(query);

    if (edges.length > 0) {
        const BlockData = await RetrieveBlock(edges[0].node.id);
        const Tags = edges[0].node.tags;

        return { BlockData: JSON.parse(BlockData), Tags };
    } else {
        return null;
    } 
}

export async function RetrieveSignature(solanaSignature: string, database: string = `${SolarweaveConfig.database}`) {
    const query = `query {
        transactions(
            first: 1,
            tags: [
                { name: "database", values: ["${database + '-index'}"] }
                { name: "signature", values: ["${solanaSignature}"] }
            ]
        ) {
            edges {
                cursor
                node {
                    id
                    tags {
                        name
                        value
                    }
                }
            }
        }
    }`;

    const edges = await GraphQL(query);

    if (edges.length > 0) {
        const BlockData = await RetrieveBlock(edges[0].node.id);
        const Tags = edges[0].node.tags;

        return { BlockData: JSON.parse(BlockData), Tags };
    } else {
        return null;
    } 
}

export async function RetrieveAccount(accountKey: string, first: number = 25, after?: string, database: string = `${SolarweaveConfig.database}`) {
    const query = `query {
        transactions(
            first: ${first},
            ${after ? `after: "${after}"` : ``},
            tags: [
                { name: "database", values: ["${database + '-index'}"] },
                { name: "accountKey", values: ["${accountKey}"] }
            ],
            sort: HEIGHT_DESC
        ) {
            edges {
                cursor
                node {
                    id
                    tags {
                        name
                        value
                    }
                }
            }
        }
    }`;

    return await GraphQL(query);
}
