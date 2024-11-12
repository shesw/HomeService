/// <reference types="debug" />
/// <reference types="node" />
import Keyv from 'keyv';
import { ImageAdapter } from './interfaces';
export declare class CachedImage {
    private readonly cache;
    log: import("debug").Debugger;
    constructor(cache: Keyv<Buffer>);
    fetch(id: string, adapter: ImageAdapter): Promise<Buffer | undefined>;
}
