import { ConfigService } from './config.service';
export declare class ObjectHash {
    private readonly config;
    constructor(config: ConfigService);
    stringify(object: any): string;
    hash(object: any): string;
}
