# Solarweave Bridge

**Please note that the following documentation is part of a proposal spec and does not represent the final product**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Build status](https://badge.buildkite.com/ff3f310e25a5d1dab15f1ed206bae9d6178ebda863ec72d461.svg)](https://buildkite.com/the-lone-ronin/solarweavebridge)
![Coverage](https://img.shields.io/badge/coverage-unknown-yellow.svg)

An easy, simple and effective way to store Solana Data into Arweave via command line. Solarweave's core objective is to make it as easy as possible to navigate, store and analyze blocks from the Solana Blockchain by using Arweave as the primary storage and database.

## Usage

#### Getting started

First install `solarweave-bridge` via `npm` or `yarn`

```bash
npm install solarweave-bridge --global
```

*or*

```bash
yarn global add solarweave-bridge
```

You should be then able to run the `solarweave-bridge` help command which will output the following:

```bash
solarweave-bridge --help

Usage: Solarweave Bridge [options] [command]

Options:
  -c, --credentials [file path]  specify the path to the json file
                                 containing your Arweave credentials
  -h, --help                     display help for command

Commands:
  livestream                     livestream blocks directly to your
                                 arweave database
  cache [options]                cache blocks to your arweave database       
  retrieve [options]             retrieve blocks from your arweave
                                 database
  help [command]                 display help for command
```

#### Setting credentials

In order to use the Solarweave bridge. *You must have Arweave credentials readily available with tokens*. You can store credentials in the root project directory under `.arweave-credentials.json`. Or, whilst using the command line tool. You can pass in your credentials manually.

```bash
solarweave-bridge --credentials /path/to/.arweave-credentials.json
```

#### Livestreaming data

You can choose to stream live transaction data and will receive an Arweave url. It will be stored in `.arweave-cache`

```bash
solarweave-bridge livestream --cache .arweave-cache
```

Which will output

```
Your blocks will be stored at the following url: https://arweave.net/3T261RAQIj2DQmOk1t_zPQnoxVbh5qtMA1-NdzOHKKE
```

#### Caching blocks

You can also cache previous blocks and block ranges to an arweave url.

```bash
# Cache block 10
solarweave-bridge cache --block 10

# Cache blocks 10-25
solarweave-bridge cache --start 10 ---end 25

# Cache blocks 10 to latest block
solarweave-bridge cache --start 10 --end $HEAD
```

#### Retrieving block data

If you want to retrieve the data from the arweave cache url. Run the following command.

```bash
solarweave-bridge retrieve 0
```

You can also output the block data to a `.json` file

```bash
solarweave-bridge retrieve 0 --output solarweave.block.0.json
```

Which will output the transaction data for that block in this format

```json
{
    "blockhash": "2WcrsKSVANoe6xQHKtCcqNdUpCQPQ3vb6QTgi1dcE2oL",
    "recentBlockhash": "7GytRgrWXncJWKhzovVoP9kjfLwoiuDb3cWjpXGnmxWh",
    "signatures": ["dhjhJp2V2ybQGVfELWM1aZy98guVVsxRCB5KhNiXFjCBMK5KEyzV8smhkVvs3xwkAug31KnpzJpiNPtcD5bG1t6"],
    "pubkeys": [
        "Bbqg1M4YVVfbhEzwA9SpC9FhsaG83YMTYoR4a8oTDLX",
        "47Sbuv6jL7CViK9F2NMW51aQGhfdpUu7WNvKyH645Rfi",
        "11111111111111111111111111111111"
    ],
    "parentSlot": 4,
    "programIdIndex": 2,

}
```

You can also retrieve blocks in batches.

```bash
# Retrieve block 10
solarweave-bridge retrieve --block 10

# Retrieve blocks 10-25
solarweave-bridge retrieve --start 10 ---end 10

# Retrieve blocks 10 to latest block
solarweave-bridge retrieve --start 10 --end $HEAD
```

*Please note that caching blocks is optional. The `retrieve` command will automatically cache blocks for you.*