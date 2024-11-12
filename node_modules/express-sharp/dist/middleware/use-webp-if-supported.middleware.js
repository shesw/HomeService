"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebpIfSupported = void 0;
function useWebpIfSupported(req, res, next) {
    var _a;
    const { dto } = res.locals;
    if ((_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.includes('image/webp')) {
        dto.format = 'webp';
    }
    next();
}
exports.useWebpIfSupported = useWebpIfSupported;
//# sourceMappingURL=use-webp-if-supported.middleware.js.map