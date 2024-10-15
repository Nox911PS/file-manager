import { readdir, statSync} from 'node:fs';
import path from 'node:path'
import {getCurrentPath, getCurrentPathMessage} from "../currentPath.js";
import {getErrorMessage, logFullError} from "../helpers/helpres.js";

export const ls = () => {
    const dir = getCurrentPath();

    readdir(dir, (err, list) => {
        if (err) {
            logFullError(err);
            console.log(getErrorMessage());
            process.stdout.write(getCurrentPathMessage());
        }

        const tableData= list.map((item) => {
            try {
                const stats = statSync(path.join(dir, item));
                return {Name: item, Type: stats.isDirectory() ? 'directory' : 'file'};
            }
            catch(err) {
                return {Name: item, Type: 'error'};
            }

        }).sort((a,b) => {
            const order = ['directory', 'file', 'error'];

            return order.indexOf(a.Type) - order.indexOf(b.Type);
        });

        tableData.length === 0 ? console.log('Folder is empty.') : console.table(tableData);

        process.stdout.write(getCurrentPathMessage());
    })
};