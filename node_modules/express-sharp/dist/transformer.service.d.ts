/// <reference types="debug" />
import Keyv from 'keyv';
import { CachedImage } from './cached-image';
import { ImageAdapter, Result } from './interfaces';
import { ObjectHash } from './object-hash.service';
import { ResizeDto } from './resize.dto';
export declare class Transformer {
    private readonly objectHasher;
    private readonly cache;
    private readonly cachedOriginalImage;
    log: import("debug").Debugger;
    cropMaxSize: number;
    constructor(objectHasher: ObjectHash, cache: Keyv<Result>, cachedOriginalImage: CachedImage);
    getCropDimensions(maxSize: number, width: number, height?: number): number[];
    buildCacheKey(id: string, options: ResizeDto, adapterName: string): string;
    transform(id: string, options: ResizeDto, imageAdapter: ImageAdapter): Promise<Result>;
}
