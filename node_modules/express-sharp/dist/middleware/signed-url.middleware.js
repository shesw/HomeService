"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signedUrl = void 0;
const tsyringe_1 = require("tsyringe");
const http_exception_1 = require("../http-exception");
const signed_url_service_1 = require("../signed-url.service");
function signedUrl(req, res, next) {
    const signer = tsyringe_1.container.resolve(signed_url_service_1.UrlSigner);
    if (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    signer.verify(`${req.protocol}://${req.get('host')}${req.originalUrl}`)) {
        next();
        return;
    }
    next(new http_exception_1.ForbiddenException('Invalid signature'));
}
exports.signedUrl = signedUrl;
//# sourceMappingURL=signed-url.middleware.js.map