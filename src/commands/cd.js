import {getCurrentPathMessage, getResolvedPath, setCurrentPath} from "../currentPath.js";
import {stat} from 'node:fs';
import {getArgsErrorMessage, getErrorMessage, logFullError} from "../helpers/helpres.js";

export const cd = (args) => {
    const [dir] = args

    if (!dir) {
        process.stdout.write(getArgsErrorMessage() + getCurrentPathMessage());
        return;
    }

    const newPath = getResolvedPath(dir);

    stat(newPath, (err) => {
        if (err) {
            logFullError(err);
            process.stdout.write(getErrorMessage() + getCurrentPathMessage());
            return;
        }

        setCurrentPath(newPath);
        process.stdout.write(getCurrentPathMessage());

    })
};