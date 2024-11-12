/// <reference types="node" />
import { ImageAdapter } from '../interfaces';
export declare class FsAdapter implements ImageAdapter {
    rootPath: string;
    private log;
    constructor(rootPath: string);
    fetch(path: string): Promise<Buffer | undefined>;
}
