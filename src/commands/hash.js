import {createHash} from 'node:crypto';
import {createReadStream, stat} from 'node:fs';
import {PassThrough} from 'node:stream'
import {getCurrentPathMessage, getResolvedPath} from "../currentPath.js";
import {getArgsErrorMessage, getErrorMessage, logFullError} from "../helpers/helpres.js";

export const hash = (args) => {
    const [pathToFile] = args;

    if  (!pathToFile) {
        process.stdout.write(getArgsErrorMessage() + getCurrentPathMessage());
        return;
    }

    const resolvedPathToFile = getResolvedPath(pathToFile);

    stat(resolvedPathToFile, (err) => {
        if (err) {
            logFullError(err);
            process.stdout.write(getErrorMessage() + getCurrentPathMessage());
            return;
        }

        let hashValue = '';
        const hash = createHash('sha256');
        const stream = createReadStream(resolvedPathToFile);
        const pathThrough = new PassThrough();

        stream.pipe(hash).setEncoding('hex').pipe(pathThrough);

        pathThrough.on('data', (chunk) => {
            hashValue = hashValue + chunk;
        })

        pathThrough.on('end', () => {
            console.log('Hash value for this file is:\n', hashValue);
            process.stdout.write(getCurrentPathMessage());
        })
    });
};
