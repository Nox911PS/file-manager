import {ls, up, cd, osFn, hash, compress, decompress, file} from "./commands/index.js";
import {getCurrentPathMessage} from "./currentPath.js";

process.stdin.on('data',(data) => {
    const command = data.trim().split(' ')[0];
    const args = data.trim().split(' ').slice(1);

    switch (command) {
        case 'ls':
            ls();
            break;
        case 'up':
            up();
            break;
        case 'cd':
            cd(args);
            break;
        case 'os':
            osFn(args);
            break;
        case 'hash':
            hash(args);
            break;
        case 'compress':
            compress(args);
            break;
        case 'decompress':
            decompress(args);
            break;
        case 'cat' :
        case 'add' :
        case 'rn' :
        case 'cp' :
        case 'mv' :
        case 'rm' :
            file(command, args);
            break;

        default:
            process.stderr.write('Wrong command, please try again \n' + getCurrentPathMessage());
            break;

    }
})