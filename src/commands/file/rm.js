import {unlink} from 'node:fs';
import {getCurrentPathMessage, getResolvedPath} from "../../currentPath.js";
import {getArgsErrorMessage, logFullError} from "../../helpers/helpres.js";

export const rm = (args) => {
    const [pathToFile] = args;

    if (!pathToFile) {
        process.stdout.write(getArgsErrorMessage('You need to specify path to file.') + getCurrentPathMessage());
        return;
    }

    const resolvedPathToFile = getResolvedPath(pathToFile);

    unlink(resolvedPathToFile, (err) => {
        if (err) {
            logFullError(err);
            process.stdout.write('File does not exist or something went wrong. Please try again \n' + getCurrentPathMessage());
            return;
        }

        process.stdout.write('File is deleted successfully \n');
        process.stdout.write(getCurrentPathMessage());
    });
}

