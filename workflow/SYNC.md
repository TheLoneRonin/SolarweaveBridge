### Sync Guide for Mainnet/Testnet

Before we begin, please be mindful that it's fairly expensive to sync mainnet and testnet. Arweave provides an amazing price point per GB of data, however, Solana's network measures up to several TBs and in future will eventually be at the PB scale. So make sure you have considered network fees to sync either network.

#### Distributed Strategy

In order to realistically sync the network from block 0. You can't use a single instance to sync the network. You will need several servers querying the RPC. I recommend 1 instance per 1 million blocks and you can spin down the instance after it syncs the 1 million blocks.

#### Deploying multiple Solarweave's

Solarweave has a `--start` and `--end` flag. This is very useful for syncing a specific range. As suggested prior. Configure each instance to sync 1 million blocks. The following is an example configuration.

```bash
# Have a livestream solarweave to start recording blocks immediately
solarweave livestream --parallelize 100 --database my-database-tag --noverify

# The first instance runs this
solarweave cache --start 0 --end 1000000 --parallelize 100 --batch 10 --database my-database-tag --noverify

# The second instance runs this
solarweave cache --start 1000001 --end 2000000 --parallelize 100 --batch 10 --database my-database-tag --noverify

# iterate new solarweave's for each 1m blocks
```

#### Parallelized and Batched Requests

While the above example utilizes `--parallelize 100` and `--batch 10` which means you upload 1000 blocks per transaction. You can increase the amount of blocks per upload. Please be mindful of RAM, 1000 blocks request needs a minimum of ~2GB of RAM. 10,000 blocks per request will be approximately ~20GB and so forth. This depends on the average size of each block.

#### Why you need `--noverify`

Given the sheer amount of blocks you're uploading at a time. It would be extremely slow to verify and confirm each block. Run solarweave with `--noverify` in order to make sure you can deploy the project effectively.

#### Network considerations

Keep in mind that your largest bottleneck will most likely be the network upload speed itself. Uploading 1000 blocks at a time can potentially be up to 1GB per Arweave transaction. This is a fairly costly transaction from an upload standpoint. Be mindful of your instance's network speed and how it will impact the time to sync from Block 0.