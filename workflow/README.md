### Example Workflows

This folder contains example workflows in Typescript to interact with Soalrweave's caching interface via a library.

#### Configuration

Workflows are fairly straight forward. The only thing you need to be mindful of is configuring Solarweave for your streaming needs.
Below is a handy reference for library usage.

```typescript
import { SolarweaveConfig } from '@theronin/solarweave';

SolarweaveConfig.rpc_version = rpc_version;
SolarweaveConfig.database = database;
SolarweaveConfig.arweaveGraphQL = arweaveGraphQL;
SolarweaveConfig.url = url;
SolarweaveConfig.credentials = credentials;
SolarweaveConfig.local = local;
SolarweaveConfig.localFile = localFile;
SolarweaveConfig.console = console;
SolarweaveConfig.compressed = compressed;
SolarweaveConfig.parallelize = parallelize;
SolarweaveConfig.benchmark = benchmark;
SolarweaveConfig.verify = verify;
SolarweaveConfig.index = index;
```


#### Caching

Check out the `Cache.workflow.ts` file for an example workflow.

#### Livestreaming

Check out the `Livestream.workflow.ts` file for an example workflow.

### Solarweave temp file

If the program exits are crashes. Solarweave keeps track of your last cached block in a `.solarweave.temp` file. If you're caching a different network or you don't need the `.temp` file no more. Make sure to remove it for your workflow!