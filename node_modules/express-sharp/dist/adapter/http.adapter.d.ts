/// <reference types="node" />
import type { ExtendOptions } from 'got';
import { ImageAdapter } from '../interfaces';
export declare class HttpAdapter implements ImageAdapter {
    private client;
    private log;
    constructor(gotOptions: ExtendOptions);
    private getPrefixUrl;
    fetch(url: string): Promise<Buffer | undefined>;
}
