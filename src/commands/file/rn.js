import {createReadStream, createWriteStream, access, unlink} from 'node:fs';
import {getCurrentPathMessage, getResolvedPath} from "../../currentPath.js";
import path from 'node:path'
import {getArgsErrorMessage, getErrorMessage, logFullError} from "../../helpers/helpres.js";

export const rn = (args) => {
    const [pathToFile, newName] = args;

    if (!pathToFile || !newName) {
        process.stdout.write(getArgsErrorMessage('You need to specify path to file and new name.') + getCurrentPathMessage());
        return;
    }

    const resolvedPathToFile = getResolvedPath(pathToFile);

    access(resolvedPathToFile, (err) => {
        if (err) {
            logFullError(err);
            process.stdout.write('File not exist or something went wrong, please try again \n' + getCurrentPathMessage());
            return;
        }
        const parsedFilePath = path.parse(resolvedPathToFile);
        const pathToNewFile = path.join(parsedFilePath.dir, newName)

        const readableStream = createReadStream(resolvedPathToFile);
        const writableStream = createWriteStream(pathToNewFile);

        readableStream.pipe(writableStream);

        writableStream.on('finish', () => {
            unlink(resolvedPathToFile, (err) => {
                if (err) {
                    logFullError(err);
                    process.stdout.write(getErrorMessage() + getCurrentPathMessage());
                    return;
                }

                process.stdout.write('File is renamed successfully \n');
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
};
