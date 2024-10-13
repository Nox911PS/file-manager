import {createReadStream, createWriteStream, access} from 'node:fs';
import {getCurrentPathMessage, getResolvedPath} from "../../currentPath.js";
import path from "node:path";
import {getArgsErrorMessage, getErrorMessage, logFullError} from "../../helpers/helpres.js";

export const cp = (args) => {
    const [pathToFile, pathToCopyDir] = args;

    if (!pathToFile || !pathToCopyDir) {
        process.stdout.write(getArgsErrorMessage('You need to specify path to file and path to copy the file.') + getCurrentPathMessage());
        return;
    }

    const resolvedPathToFile = getResolvedPath(pathToFile);
    const resolvedPathToCurrentDir = getResolvedPath(pathToCopyDir);

    access(resolvedPathToFile, (err) => {
        if (err) {
            logFullError(err);
            process.stdout.write('File not exist or something went wrong, please try again \n' + getCurrentPathMessage());
            return;
        }

        access(resolvedPathToCurrentDir, (err) => {
            if (err) {
                logFullError(err);
                process.stdout.write('Directory to copy does not exist or something went wrong, please try again \n' + getCurrentPathMessage());
                return;
            }

            const parsedFilePath = path.parse(resolvedPathToFile);
            const pathToCopiedFile = path.join(resolvedPathToCurrentDir, parsedFilePath.base)

            const readableStream = createReadStream(resolvedPathToFile);
            const writableStream = createWriteStream(pathToCopiedFile);

            readableStream.pipe(writableStream);

            writableStream.on('finish', () => {
                process.stdout.write('File is copied successfully \n');
                process.stdout.write(getCurrentPathMessage());
            })

            readableStream.on('error', (err) => {
                logFullError(err);
                process.stdout.write(getErrorMessage() + getCurrentPathMessage());
                return;
            })

            writableStream.on('error', (err) => {
                logFullError(err);
                process.stdout.write(getErrorMessage() + getCurrentPathMessage());
                return;
            })
        });
    });
};
