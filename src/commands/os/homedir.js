import os from 'node:os';
import {getCurrentPathMessage} from "../../currentPath.js";

export const osHomeDir = () => {
    console.log(`Home directory is ${os.homedir()}`);

    process.stdout.write(getCurrentPathMessage());
}