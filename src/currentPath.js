import {homedir} from 'node:os';
import {endPathSymbol} from "./helpers/helpres.js";
import path from 'node:path';

let currentPath = homedir();

export const  setCurrentPath = (dir) =>  currentPath = dir;

export const getCurrentPath = () => currentPath;

export const getCurrentPathMessage = () => `You are currently in ${getCurrentPath()}${endPathSymbol}`;

export const getResolvedPath = (pathToResolve) =>  path.resolve(getCurrentPath(), pathToResolve);