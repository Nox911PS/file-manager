import {createReadStream, createWriteStream, access, unlink} from 'node:fs';
import {getCurrentPathMessage, getResolvedPath} from "../../currentPath.js";
import path from "node:path";
import {getArgsErrorMessage, getErrorMessage, logFullError} from "../../helpers/helpres.js";

export const mv = (args) => {
    const [pathToFile, pathToDirectory] = args;

    if (!pathToFile || !pathToDirectory) {
        process.stdout.write(getArgsErrorMessage('You need to specify path to file and directory to move the file.') + getCurrentPathMessage());
        return;
    }

    const resolvedPathToFile = getResolvedPath(pathToFile);
    const resolvedPathToDirectory = getResolvedPath(pathToDirectory);

    access(resolvedPathToFile, (err) => {
        if (err) {
            logFullError(err);
            process.stdout.write('File does not exist or something went wrong, please try again \n' + getCurrentPathMessage());
            return;
        }
        access(resolvedPathToDirectory, (err) => {
            if (err) {
                logFullError(err);
                process.stdout.write('Directory to move does not exist or something went wrong, please try again \n' + getCurrentPathMessage());
                return;
            }

            const parsedFilePath = path.parse(resolvedPathToFile);
            const pathToMovedFile = path.join(resolvedPathToDirectory, parsedFilePath.base);

            const readableStream = createReadStream(resolvedPathToFile);
            const writableStream = createWriteStream(pathToMovedFile);

            readableStream.pipe(writableStream);

            writableStream.on('finish', () => {
                unlink(resolvedPathToFile, (err) => {
                    if (err) {
                        logFullError(err);
                        process.stdout.write(getErrorMessage() + getCurrentPathMessage());
                        return;
                    }

                    process.stdout.write('File is moved successfully \n');
                    process.stdout.write(getCurrentPathMessage());
                })
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
