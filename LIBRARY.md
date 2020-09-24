### Solarweave Library

If you intend on using Solarweave as a library. You can install via:

```bash
npm install @theronin/solarweave
```

or

```bash
yarn add @theronin/solarweave
```


Solarweave supports both `Classic` and `ESNext` imports.

```javascript
// OK
import { RetrieveBlock } from '@theronin/solarweave';

// OK
const { RetrieveBlock } = require('@theronin/solarweave');

// OK
const solarweave = require('@theronin/solarweave');
```

---

### Type Definitions with Examples

#### `GraphQL`

**Type Definition**:

```typescript
function GraphQL(query: string): Promise<ArweaveBlock>
```

Run a GraphQL

**Example Usage**:

```typescript
import { GraphQL } from '@theronin/solarweave';

const Transactions = await GraphQL(`query {
    transactions {
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
}`);

console.log(Transactions);
```

#### `RetrieveBlocks`

**Type Definition**:

```typescript
function RetrieveBlocks(first?: number, after?: string, database?: string): Promise<ArweaveBlock>
```

**Example Usage**:

```typescript
import { RetrieveBlocks } from '@theronin/solarweave';

const Transactions = await RetrieveBlocks(25, '', 'solarweave-devnet');

console.log(Transactions);
```

#### `RetrieveBlock`

**Type Definition**:

```typescript
function RetrieveBlock(arweaveBlockhash: string): Promise<SolanaBlock>
```

**Example Usage**:

```typescript
import { RetrieveBlock } from '@theronin/solarweave';

const BlockData = await RetrieveBlock('L-6uiIpiQWZHCCr_x2qKIOYOutplZaS0BN2YQdq_i-4');

if (BlockData) {
    const Block = JSON.parse(BlockData);
    console.log(Block);
}
```

#### `RetrieveBlockhash`

**Type Definition**:

```typescript
function RetrieveBlockhash(solanaBlockhash: string, database?: string): Promise<SolanaBlock>
```

**Example Usage**:

```typescript
import { RetrieveBlockhash } from '@theronin/solarweave';

const BlockData = await RetrieveBlockhash('21wUtkKgK1PN3xMtSYrJSxxcz171ePqdgv9vfLXdAdNF');

if (BlockData) {
    const Block = JSON.parse(BlockData);
    console.log(Block);
}
```

#### `RetrieveSignature`

**Type Definition**:

```typescript
function RetrieveSignature(solanaSignature: string, database?: string): Promise<SolanaBlock>
```

**Example Usage**:

```typescript
import { RetrieveSignature } from '@theronin/solarweave';

const BlockData = await RetrieveBlockhash('4D7jBHU3d6bSaMmVr8ViLMB3J4G99RR7FqrAy1iQceXvBVBgSYqrxVBAZCcBK6RegudZzTKU4wPWrBL9PFgWvQ4j');

if (BlockData) {
    const Block = JSON.parse(BlockData);
    console.log(Block);
}
```

#### `RetrieveAccount`

**Type Definition**:

```typescript
function RetrieveAccount(accountKey: string, first?: number, after?: string, database?: string): Promise<ArweaveBlock>
```

**Example Usage**:

```typescript
import { RetrieveAccount, RetrieveBlock } from '@theronin/solarweave';

const AccountTransactions = await RetrieveAccount('Vote111111111111111111111111111111111111111', 25, 'WyIyMDIwLTA5LTI0VDE3OjExOjEwLjM4NFoiLDFd', 'solarweave-devnet-index');

AccountTransactions.forEach(async edge => {
    const BlockData = await RetrieveBlock(edge.node.id);

    if (BlockData) {
        const Block = JSON.parse(BlockData);
        console.log(Block);
    }
});
```