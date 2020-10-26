# Solarweave Bridge

![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Build Status](https://travis-ci.org/TheLoneRonin/SolarweaveBridge.svg?branch=master)](https://travis-ci.org/TheLoneRonin/SolarweaveBridge)
[![codecov](https://codecov.io/gh/TheLoneRonin/SolarweaveBridge/branch/master/graph/badge.svg)](https://codecov.io/gh/TheLoneRonin/SolarweaveBridge)

An easy, simple and effective way to store Solana Blocks into Arweave via command line. Solarweave's core objective is to make it as easy as possible to navigate, store and analyze blocks from Solana.

Solarweave uses extensive tag annotations in order to make it as easy as possible to navigate the database via `ArQL`. Check the **ArQL** section to learn more.

If you want to review the benchmarks for Solarweave, check out the [Benchmarks](./BENCHMARKS.md) document.

Solarweave is also now accessible as a library. Check out the [Library](./LIBRARY.md) document to learn more!

Do you need more flexibility when livestreaming blocks? Check out the example [Workflows](./workflow/README.md) documents to learn more.

----

## Getting started

<img align="center" src="https://gitlab.com/cervoneluca/openbits/-/raw/master/assets/logo-black.png" height="50px" alt="OpenBits logo" title="OpenBits Logo"> This package is also available on OpenBits

First install `solarweave` via `npm`, `yarn` or `openbits`

```bash
npm install @theronin/solarweave --global
```

*or*

```bash
yarn global add @theronin/solarweave
```

*or*

```bash
npm install openbits --global
openbits install @theronin/solarweave --global
```

Confirm your installation of `solarweave` by running the help command which will output the following:

```bash
$ solarweave help

Usage: Solarweave Bridge [options] [command]

Options:
  --database [name]          the name of the database (for Arweave ArQL tags) (default: "solarweave-devnet")
  --gql [URL]                the Arweave GraphQL URL to query blocks (default: "https://arweave.dev/graphql")
  --url [RPC URL]            the Solana RPC URL to query blocks from (default: "https://devnet.solana.com")
  --credentials [file path]  specify the path to the json file containing your Arweave credentials (default: ".arweave.creds.json")
  --local                    cache locally to a JSON file instead of to Arweave (default: false)
  --localFile [file path]    if caching data locally, specify the file path (default: "solarweave.cache.json")
  --console                  do not output log data to console (default: false)
  --uncompressed             store blocks in an uncompressed format (default: false)
  --parallelize [blocks]     the amount of blocks to process at a time, 1 processes 1 block at a time, 8, 8 blocks at a time (default: "1")
  --benchmark                benchmark Solarweave and start tracking size and speed stats stored in benchmark.json (default: false)
  --noverify                 if caching to Arweave do not double check if the block was already submitted (default: false)
  --index                    if caching to Arweave, index blocks according to signatures and account keys (default: false)
  -h, --help                 display help for command

Commands:
  balance                    retrieve the public address and balance of your Arweave wallet
  latest                     retrieve the latest block and output the block to console
  livestream                 livestream blocks directly to your arweave database (or locally)
  cache                      retrieve all the blocks that are still available and store them in Arweave
  index                      index an existing database with their Account Keys and Signatures
  help [command]             display help for command
```

#### Setting credentials

In order to use the Solarweave bridge. *You must have Arweave credentials readily available with tokens*. You can store credentials in the root project directory under `.arweave.creds.json`. Or, whilst using the command line tool. You can pass in your credentials manually.

```bash
solarweave --credentials /path/to/.arweave.creds.json
```

---

## Storing Blocks to Arweave

Before attempting to store data with Solarweave. First check and make sure that you can store data into Arweave by running the `balance` command.

```bash
$ solarweave balance

Your Arweave public address is 1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
Your Arweave balance is 149998554627
```

If you can't see your public address and balance. It means your `.arweave.creds.json` is not properly configured. Make sure to have a sufficent balance to post data too.

Furthermore, you can also run the `latest` command to make sure you have a working connection with Solana.

```bash
$ solarweave latest

Preparing to retrieve the latest block

Found Block with Parent Slot #1025206
Block Hash: 7HSFZ67NQNPDDhGGUzEgd3afVxpEoKoox9ZHuJE9u5BR
Previous Block Hash: 4Qw6EnjmXD9PJWpA2QWoZZK2zPRhbVBeyPqCsVB4epSy
```

#### Livestreaming Blocks

You can choose to start at the latest slot and start livestreaming Solana blocks to Arweave with the `livestream`. You can then query those blocks via **`ArQL`**.

```bash
$ solarweave livestream

Transmitted Solana Block to Arweave with Parent Slot #1025206
Solana Block Hash: 7HSFZ67NQNPDDhGGUzEgd3afVxpEoKoox9ZHuJE9u5BR
```

#### Caching all Blocks

If you want to start caching every block and not just new ones. You can run the `cache` command.

```bash
$ solarweave cache

Cache is at Block 1025207, latest block is 1925007

Transmitted Solana Block to Arweave with Parent Slot #1025206
Solana Block Hash: 7HSFZ67NQNPDDhGGUzEgd3afVxpEoKoox9ZHuJE9u5BR
```

#### Indexing Blocks

If you want to index an existing Arweave Database. You can run the `index` command.

```bash
$ solarweave cache

Cache is at Block 1025207, latest block is 1925007

Transmitted Solana Block to Arweave with Parent Slot #1025206
Solana Block Hash: 7HSFZ67NQNPDDhGGUzEgd3afVxpEoKoox9ZHuJE9u5BR
```

----

## Additional Configuration

#### Local streaming

For testing purposes. You might want to store blocks locally. All you need to do is pass the `--local` flag to Solarweave.

```bash
$ solarweave livestream --local
```

This will start streaming blocks to a JSON file `solarweave.cache.json`. If you want to stream to a different file, use:

```bash
$ solarweave livestream --local --localFile /path/to/solarweave.cache.json
```

#### Console output

You can turn off console out put by passing the `console` flag.

```bash
$ solarweave --console
```

#### Compression

This command does not impact local files. However, when storing blocks in Arweave. If you wanted to store a raw JSON string instead of a serialized binary `flatbuffer`. You can pass the `uncompressed` flag.

```bash
$ solarweave --uncompressed
```

#### RPC URL

If you want to query blocks from a different RPC url. You can use the `url` flag.

```bash
$ solarweave --url https://devnet.solana.com
```

#### GraphQL URL

If you want to query blocks from a different GraphQL url. You can use the `gql` flag.

```bash
$ solarweave --gql https://arweave.dev/graphql
```

#### Database tag

You can change the `database` tag for `ArQL` by using the `database` flag. This will change `database` tag and can help you navigate blocks from different networks.

```bash
$ solarweave --database devnet
```

#### Increasing throughput

You can change the rate and speed at which Solarweave processes blocks by using the `--parallelize` flag. The number you specify is the number of blocks that Solarweave will process at a time. The default is 1, but say you were working with a local validator. You could easily bump it to 8 or 16.

```bash
$ solarweave --parallelize 8
```

#### Benchmarking

If you wanted to keep track of the stats for Solarweave. You can use the `--benchmark` flag. It will store in `benchmark.json` how long it took for each block to be processed as well as the final size of the block.

```bash
$ solarweave --benchmark
```

#### Double Checking

If in any case you didn't want to double check that if a block was already submitted to Arweave. You can use the `--noverify` flag.

```bash
$ solarweave --noverify
```

#### Indexing Blocks

If you wanted to index blocks by both signature and account key. You can use pass the `--index` flag.

***Note that this has been disabled by default for performance reasons***

```bash
$ solarweave --index
```

----

## Finding Blocks with ArQL

Each block is supplied several tags in order to help you traverse the database. The top level tags are as follows.

##### database

As mentioned in the **Additional Configuration** section. The database tag should be used to identify which chain (or archive version) of Solana you're navigating.

##### parentSlot

This is the parent slot provided by the confirmed block.

##### slot

This is the slot of the confirmed block.

##### blockhash

This is the blockhash provided by the confirmed block.

### Transaction Indexed Tags

In the case you ever wanted to navigate blocks by specific transaction account keys or signatures. You can navigate the indexed version of the database.

##### Signatures

Signatures are compacted into arrays and are indexed based on the order of transactions. Retrieving the signature is fairly straight forward.

```typescript
const signature = IndexBlock.Tags.filter(t => t.name === 'signature')[0];
```
**Example Usage**

```typescript
import { RetrieveSignature } from '@theronin/solarweave';
const Block = await RetrieveSignature('...Solana Signature');

console.log(Block);
// { BlockData, Tags }
```

##### Account Keys

You can retrieve several blocks associated with an account key by using the `RetrieveAccount` function.

```typescript
const accountKey = IndexBlock.Tags.filter(t => t.name === 'accountKey')[0];
```
**Example Usage**

```typescript
import { RetrieveAccount } from '@theronin/solarweave';
const Blocks = await RetrieveAccount('...Account Key', 10);

console.log(Blocks);
// [ { BlockData, Tags } ... ]
```

#### Additional Tags

Additional tags are provided for the metadata of the transaction.

```bash
programIdIndex
numReadonlySignedAccounts
numReadonlyUnsignedAccounts
numRequiredSignatures

accountKey[]
signature[]
```

If you want to get a specific accountKey via Arweave Tags.

```bash
accountKey[0]
accountKey[1]
```

```bash
signature[0]
signature[1]
```

----

## License

[MIT ©](./LICENSE)