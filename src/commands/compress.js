import {createBrotliCompress} from 'node:zlib';
import {createReadStream, stat, createWriteStream} from 'node:fs';
import {pipeline} from 'node:stream'
import {getCurrentPathMessage, getResolvedPath} from "../currentPath.js";
import {getArgsErrorMessage, getErrorMessage, logFullError} from "../helpers/helpres.js";

export const compress = (args) => {
    const [pathToFile, destFilePath] = args;

    if  (!pathToFile || !destFilePath) {
        process.stdout.write(getArgsErrorMessage() + getCurrentPathMessage());
        return;
    }

    const resolvedPathToFile = getResolvedPath(pathToFile);
    const resolvedDestFilePath = getResolvedPath(destFilePath);

    stat(resolvedPathToFile, (err) => {
        if (err) {
            logFullError(err);
            process.stdout.write(getErrorMessage() + getCurrentPathMessage());
            return;
        }

        pipeline(createReadStream(resolvedPathToFile), createBrotliCompress(), createWriteStream(resolvedDestFilePath), onError);
    });

};

const onError = (err) => {
    if (err) {
        logFullError(err);
        process.stdout.write(getErrorMessage() + getCurrentPathMessage());
        return;
    }
    process.stdout.write('Operation was finished successfully \n');
    process.stdout.write(getCurrentPathMessage());
}


