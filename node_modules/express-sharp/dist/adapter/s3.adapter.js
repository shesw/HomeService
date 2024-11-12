"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Adapter = void 0;
const logger_1 = require("../logger");
const optional_require_1 = require("../optional-require");
class S3Adapter {
    constructor(bucketName, s3client) {
        var _a;
        this.bucketName = bucketName;
        this.s3client = s3client;
        this.log = (0, logger_1.getLogger)('adapter:s3');
        const { S3 } = (0, optional_require_1.optionalRequire)('aws-sdk');
        (_a = this.s3client) !== null && _a !== void 0 ? _a : (this.s3client = new S3());
        this.log(`Using bucket name: ${bucketName}`);
    }
    async fetch(id) {
        this.log(`Fetching image "${id}" from bucket "${this.bucketName}"`);
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const object = await this.s3client.getObject({
                Bucket: this.bucketName,
                Key: id,
            }).promise();
            if (!Buffer.isBuffer(object.Body)) {
                return undefined;
            }
            return object.Body;
        }
        catch (error) {
            this.log(`Fetching bucket "${id}" failed: ${JSON.stringify(error)}`);
            return undefined;
        }
    }
}
exports.S3Adapter = S3Adapter;
//# sourceMappingURL=s3.adapter.js.map