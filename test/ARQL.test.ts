import { equal } from 'assert';
import { GraphQL, RetrieveAccount, RetrieveBlocks, RetrieveBlock } from '../src/service/ARQL.service';

describe('ARQL Tests', () => {
    it('Should be able to run a basic GraphQL Query', async () => {
        const Edges = await GraphQL(`query {
            transactions {
                edges {
                    cursor 
                    node {
                        id
                    }
                }
            }
        }`);

        console.log(Edges);

        equal(Edges !== null, true);
    });

    it('Should be able to retrieve entries from the Vote Account', async () => {
        const Edges = await RetrieveAccount('Vote111111111111111111111111111111111111111', 3, '', 'solarweave-cache-devnet-testrun1-index');
        equal(Edges.length === 3, true);
    });

    it('Should be able to retrieve latest entries from the database', async () => {
        const Edges = await RetrieveBlocks(3, '', 'solarweave-cache-devnet-testrun1');
        equal(Edges.length === 3, true);
    });

    it('Should be able to retrieve actual block data', async () => {
        const BlockData = await RetrieveBlock('AXhCf_ARKlIEmpvQaRSXnbAuVh0KRxG5B1ybZP0mhMM');
        equal(BlockData !== null, true);
    });
});