import {close, open, write} from 'node:fs';
import {getCurrentPathMessage, getResolvedPath} from "../../currentPath.js";
import {getArgsErrorMessage, getErrorMessage, logFullError} from "../../helpers/helpres.js";

export const add = (args) => {
    const [pathToFile] = args;

    if (!pathToFile) {
        process.stdout.write(getArgsErrorMessage() + getCurrentPathMessage());
        return;
    }

    open(getResolvedPath(pathToFile), 'wx', (err, fd) => {
        if (err) {
            logFullError(err);
            process.stdout.write(getErrorMessage() + getCurrentPathMessage());
            return;
        }

        write(fd, '', (err) => {
            if (err) {
                logFullError(err);
                process.stdout.write(getErrorMessage() + getCurrentPathMessage());
                return;
            }
            close(fd, (err) => {
                if (err) {
                    logFullError(err);
                    process.stdout.write(getErrorMessage() + getCurrentPathMessage());
                    return;
                }

                process.stdout.write('File is created successfully \n');
                process.stdout.write(getCurrentPathMessage());

            });
        })
    });
};
