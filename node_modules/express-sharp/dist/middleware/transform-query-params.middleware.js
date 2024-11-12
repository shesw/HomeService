"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformQueryParams = void 0;
const interfaces_1 = require("../interfaces");
function transformQueryParams(req, _res, next) {
    Object.entries(interfaces_1.QueryParams)
        .filter(([, shortName]) => shortName in req.query)
        .forEach(([name, shortName]) => {
        req.query[name] = req.query[shortName];
        delete req.query[shortName];
    });
    next();
}
exports.transformQueryParams = transformQueryParams;
//# sourceMappingURL=transform-query-params.middleware.js.map