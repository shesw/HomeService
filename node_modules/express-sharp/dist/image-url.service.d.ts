import { ConfigService } from './config.service';
import { Signer } from './interfaces';
import { ResizeDto } from './resize.dto';
export declare class ImageUrl {
    private readonly endpoint;
    private readonly urlSigner;
    private readonly config;
    constructor(endpoint: string, urlSigner: Signer, config: ConfigService);
    private _buildUrl;
    url(imageId: string, params: Partial<Omit<ResizeDto, 'url'>>): string;
    pathQuery(imageId: string, params: Partial<Omit<ResizeDto, 'url'>>): string;
}
