/// <reference types="node" />
import type { S3 as S3Type } from 'aws-sdk';
import { ImageAdapter } from '../interfaces';
export declare class S3Adapter implements ImageAdapter {
    readonly bucketName: string;
    private readonly s3client?;
    private log;
    constructor(bucketName: string, s3client?: S3Type | undefined);
    fetch(id: string): Promise<Buffer | undefined>;
}
