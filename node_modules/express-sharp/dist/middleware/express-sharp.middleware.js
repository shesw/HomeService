"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressSharp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const keyv_1 = __importDefault(require("keyv"));
const tsyringe_1 = require("tsyringe");
const config_service_1 = require("../config.service");
const resize_dto_1 = require("../resize.dto");
const etag_caching_middleware_1 = require("./etag-caching.middleware");
const signed_url_middleware_1 = require("./signed-url.middleware");
const transform_image_middleware_1 = require("./transform-image.middleware");
const transform_query_params_middleware_1 = require("./transform-query-params.middleware");
const use_webp_if_supported_middleware_1 = require("./use-webp-if-supported.middleware");
const validator_middleware_1 = require("./validator.middleware");
function extractActiveMiddlewares(middlewaresDefinitions) {
    return middlewaresDefinitions
        .filter(([, active]) => active !== null && active !== void 0 ? active : true)
        .map(([middleware]) => middleware);
}
function expressSharp(options) {
    var _a;
    const configService = tsyringe_1.container.resolve(config_service_1.ConfigService);
    if (options.secret) {
        configService.set('signedUrl.secret', options.secret);
    }
    tsyringe_1.container.register(keyv_1.default, { useValue: options.cache || new keyv_1.default() });
    const middlewares = extractActiveMiddlewares([
        [
            (req, res, next) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                res.locals.imageAdapter = options.imageAdapter;
                next();
            },
        ],
        [transform_query_params_middleware_1.transformQueryParams],
        [(0, validator_middleware_1.validate)(resize_dto_1.ResizeDto)],
        [use_webp_if_supported_middleware_1.useWebpIfSupported, (_a = options.autoUseWebp) !== null && _a !== void 0 ? _a : true],
        [(0, cors_1.default)(options.cors)],
        [signed_url_middleware_1.signedUrl, configService.get('signedUrl.secret') !== undefined],
        [etag_caching_middleware_1.etagCaching],
        [transform_image_middleware_1.transformImage],
    ]);
    const router = (0, express_1.Router)();
    router.get('/:url(*)', ...middlewares);
    return router;
}
exports.expressSharp = expressSharp;
//# sourceMappingURL=express-sharp.middleware.js.map