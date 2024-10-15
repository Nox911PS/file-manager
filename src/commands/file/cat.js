import {createReadStream, access} from 'node:fs';
import {getCurrentPathMessage, getResolvedPath} from "../../currentPath.js";
import {getArgsErrorMessage, getErrorMessage, logFullError} from "../../helpers/helpres.js";

export const cat = (args) => {
    let content = '';
    const [pathToFile] = args;

    if (!pathToFile) {
        process.stdout.write(getArgsErrorMessage() + getCurrentPathMessage());
        return;
    }

    const resolvedPathToFile= getResolvedPath(pathToFile);

    access(resolvedPathToFile, (err) => {
        if (err) {
            logFullError(err);
            process.stdout.write(getErrorMessage() + getCurrentPathMessage());
            return;
        }

        const stream = new createReadStream(resolvedPathToFile, {encoding: "utf-8"});

        stream.on('data', (chunk) => {
            content = content + chunk;
        });

        stream.on('end', () => {
            console.log(`Content of the file is: ${content}`);
            process.stdout.write(getCurrentPathMessage());
        });

        stream.on('error', (err) => {
            logFullError(err);
            process.stdout.write(getErrorMessage() + getCurrentPathMessage());
        });
    })
};
