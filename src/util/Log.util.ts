import { SolarweaveConfig } from '../Config';

export function Log(output: any) {
    SolarweaveConfig.console ? console.log(output) : null;
}