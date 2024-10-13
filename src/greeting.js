import {getUserName} from "./helpers/helpres.js";
import {getCurrentPathMessage} from "./currentPath.js";

process.stdout.write(`Welcome to the File Manager, ${getUserName()}! \n${getCurrentPathMessage()}`);

process.on('SIGINT', () => {
    exitApp();
})

process.stdin.on('data',(data) => {
    if (data.trim() === '.exit') {
        exitApp();
    }
})

const exitApp = () => {
    process.stdout.write(`\nThank you for using File Manager, ${getUserName()}, goodbye!`);
    process.exit(0);
}

