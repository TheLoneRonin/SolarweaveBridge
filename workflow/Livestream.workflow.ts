import { SolarweaveConfig, Livestream } from '@theronin/solarweave';

export async function Start() {
  try {
    SolarweaveConfig.database = 'workflow-database';
    SolarweaveConfig.url = 'https://testnet.node';
    SolarweaveConfig.credentials = '/path/to/creds.json';
    await Livestream();
  } catch (error) {
    // Log your error here
    console.error(error);
    process.exit(1);
  }
}

(async () => await Start())();