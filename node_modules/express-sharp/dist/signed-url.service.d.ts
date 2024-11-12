/// <reference types="node" />
import { URL } from 'url';
import { ConfigService } from './config.service';
export declare class UrlSigner {
    private readonly config;
    constructor(config: ConfigService);
    private makeUrlSafe;
    private getSignature;
    private getParamName;
    sign(url: string | URL): string;
    verify(url: string | URL): boolean;
}
