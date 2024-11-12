"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.etagCaching = void 0;
const etag_1 = __importDefault(require("etag"));
function etagCaching(req, res, next) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.setHeader('ETag', (0, etag_1.default)(JSON.stringify(res.locals.dto), { weak: true }));
    if (!req.fresh) {
        next();
        return;
    }
    // eslint-disable-next-line no-magic-numbers
    res.sendStatus(304);
}
exports.etagCaching = etagCaching;
//# sourceMappingURL=etag-caching.middleware.js.map