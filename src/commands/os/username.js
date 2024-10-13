import os from 'node:os';
import {getCurrentPathMessage} from "../../currentPath.js";

export const osUserName = () => {
    console.log(`Current User is ${os.userInfo().username}`);

    process.stdout.write(getCurrentPathMessage());
}