import {cat, add, rn, cp, mv, rm} from "./file/index.js";
import {getCurrentPathMessage} from "../currentPath.js";

export const file = (command, args) => {



    switch (command) {
        case 'cat':
            cat(args);
            break;
        case 'add':
            add(args);
            break;
        case 'rn':
            rn(args);
            break;
        case 'cp':
            cp(args);
            break;
        case 'mv':
            mv(args);
            break;
        case 'rm':
            rm(args);
            break;

        default:
            process.stdout.write('Wrong command, please try again \n' + getCurrentPathMessage());
            break;
    }
}