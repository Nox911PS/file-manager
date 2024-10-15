import {osEOL, osCpus, osHomeDir, osUserName, osArchitecture} from "./os/index.js";
import {getCurrentPathMessage} from "../currentPath.js";
import {getArgsErrorMessage} from "../helpers/helpres.js";

export const osFn = (args) => {
    const [arg] = args;

    switch (arg) {
        case '--EOL':
            osEOL();
            break;
        case '--cpus':
            osCpus();
            break;
        case '--homedir':
            osHomeDir();
            break;
        case '--username':
            osUserName();
            break;
        case '--architecture':
            osArchitecture();
            break;

        default:
            process.stdout.write(getArgsErrorMessage() + getCurrentPathMessage());
            break;
    }
}