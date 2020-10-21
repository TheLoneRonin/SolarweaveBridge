import { SolarweaveConfig, Cache } from 'theronin/solarweave';

export async function Start() {
  try {
    SolarweaveConfig.database = 'workflow-database';
    SolarweaveConfig.url = 'https://testnet.node';
    SolarweaveConfig.credentials = '/path/to/creds.json';
    await Cache();
  } catch (error) {
    // Log your error here
    console.error(error);
    process.exit(1);
  }
}

(async () => await Start())();