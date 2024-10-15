import os from 'node:os';
import {getCurrentPathMessage} from "../../currentPath.js";

export const osCpus = () => {
    const cpus = os.cpus();

    const dataTable = cpus.map(item => ({Model: item.model, Speed: item.speed + 'MHz'}))
    console.log(`Current number of CPU is ${cpus.length}`);
    console.table(dataTable);

    process.stdout.write(getCurrentPathMessage());
}