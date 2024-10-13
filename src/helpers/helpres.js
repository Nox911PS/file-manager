import {platform} from "node:os";

export const endPathSymbol = platform() === 'win32' ? '>' : '\\';

export const getUserName = () => {
    const args = process.argv.slice(2);
    const userNameIdx = args.findIndex(element => element.includes('user'));;

    return userNameIdx === -1 ? 'Anonymous' : args[userNameIdx].split('=')[1];
}

export const logFullError = (err) => {
    const args = process.argv.slice(2);
    const isLogErrorEnable = args.findIndex(element => element.includes('log-error'));
    if (isLogErrorEnable !== -1) {
        console.log(err);
    }
}


export const getArgsErrorMessage = (extraContent) => `Invalid input. Wrong or missing arguments. ${extraContent ? extraContent : ''} Please try again. \n`
export const getErrorMessage = () => `Operation failed. Please try again. \n`


