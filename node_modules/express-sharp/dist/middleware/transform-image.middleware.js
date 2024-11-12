"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformImage = void 0;
const tsyringe_1 = require("tsyringe");
const transformer_service_1 = require("../transformer.service");
async function transformImage(req, res, next) {
    const { dto, imageAdapter } = res.locals;
    try {
        const transformer = tsyringe_1.container.resolve(transformer_service_1.Transformer);
        if (!dto.url) {
            throw new Error('Image url missing');
        }
        const { format, image } = await transformer.transform(dto.url, dto, imageAdapter);
        if (!image || !format) {
            next();
            return;
        }
        // TODO: Cache-Control, Last-Modified
        res.type(`image/${format}`);
        res.send(image);
    }
    catch (error) {
        next(error);
    }
}
exports.transformImage = transformImage;
//# sourceMappingURL=transform-image.middleware.js.map