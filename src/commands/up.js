import {getCurrentPath, getCurrentPathMessage, setCurrentPath} from "../currentPath.js";
import path from "node:path";
import {endPathSymbol, getArgsErrorMessage} from "../helpers/helpres.js";

export const up = () => {
    const newPath = path.dirname(getCurrentPath())

    setCurrentPath(newPath);

    process.stdout.write(getCurrentPathMessage());
};