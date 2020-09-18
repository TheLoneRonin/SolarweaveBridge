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
import { RetrieveBlockBySlot } from '@theronin/solarweave';

// OK
const { RetrieveBlockBySlot } = require('@theronin/solarweave');

// OK
const solarweave = require('@theronin/solarweave');
```

---

### Type Definitions with Examples

#### `RetrieveBlockBySlot`

**Type Definition**:

```typescript
function RetrieveBlockBySlot(slot: number, database?: string): Promise<string>
```

**Example Usage**:

```typescript
import { RetrieveBlockBySlot } from '@theronin/solarweave';

const BlockData = await RetrieveBlockBySlot(88888);

if (BlockData) {
    const Block = JSON.parse(BlockData);
    console.log(Block);
}
```

#### `RetrieveBlockByBlockhash`

**Type Definition**:

```typescript
function RetrieveBlockByBlockhash(blockhash: string, database?: string): Promise<string>
```

**Example Usage**:

```typescript
import { RetrieveBlockByBlockhash } from '@theronin/solarweave';

const BlockData = await RetrieveBlockByBlockhash('6r7DWE4Mmkn9SpW5WCdnCdjCTfn1wwt61QdWJJtHV7z7');

if (BlockData) {
    const Block = JSON.parse(BlockData);
    console.log(Block);
}
```

#### `RetrieveBlocksFromAccount`

**Type Definition**:

```typescript
function RetrieveBlocksFromAccount(accountKey: string, database?: string): Promise<Array<string>>
```

**Example Usage**:

```typescript
import { RetrieveBlocksFromAccount } from '@theronin/solarweave';

const BlockTransactions = await RetrieveBlocksFromAccount('Vote111111111111111111111111111111111111111');

console.log(BlockTransactions);
```

#### `RetrieveBlocksFromSignature`

**Type Definition**:

```typescript
function RetrieveBlockBySignature(signature: string, database?: string): Promise<Array<string>>
```

**Example Usage**:

```typescript
import { RetrieveBlockBySignature } from '@theronin/solarweave';

const BlockData = await RetrieveBlockBySignature('3kKSaci98YvEYa8df66qkHNYYE83gTox9DtBcH5ubSGXcSFc2AcDGBoU7MizVrErYpTzz2pxxFoubWFzJKkqcy8u');

if (BlockData) {
    const Block = JSON.parse(BlockData);
    console.log(Block);
}
```

#### `RetrieveBlockData`

**Type Definition**:

```typescript
function RetrieveBlockData(arweaveTxId: string): Promise<{
    database: string;
    slot: string;
    parentSlot: string;
    accountKey: string;
    blockhash: string;
    defaultSignature: string;
}>
```

**Example Usage**:

```typescript
import { RetrieveBlocksFromAccount, RetrieveBlockData } from '@theronin/solarweave';

const BlockTransactions = await RetrieveBlocksFromAccount('Vote111111111111111111111111111111111111111');

const ExampleTx = BlockTransactions[0];
const BlockData = await RetrieveBlockData(ExampleTx);
```