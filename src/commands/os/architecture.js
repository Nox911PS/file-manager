import os from 'node:os';
import {getCurrentPathMessage} from "../../currentPath.js";

export const osArchitecture = () => {
    console.log(`Current architecture is ${os.arch()}`);

    process.stdout.write(getCurrentPathMessage());
}