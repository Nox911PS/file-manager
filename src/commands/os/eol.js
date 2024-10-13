import os from 'node:os';
import {getCurrentPathMessage} from "../../currentPath.js";

export const osEOL = () => {
    console.log(`Current EOL is ${os.EOL === '\n' ? '\\n' : '\\r\\n'}`);

    process.stdout.write(getCurrentPathMessage());
}