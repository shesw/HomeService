"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const class_validator_1 = require("class-validator");
const http_exception_1 = require("../http-exception");
// eslint-disable-next-line @typescript-eslint/ban-types
function validate(Dto) {
    return async (req, res, next) => {
        try {
            const dto = new Dto({ ...req.query, ...req.params });
            const errors = await (0, class_validator_1.validate)(dto, {
                forbidUnknownValues: true,
            });
            if (errors.length > 0) {
                const message = errors
                    .map((error) => { var _a; return Object.values((_a = error.constraints) !== null && _a !== void 0 ? _a : {}); })
                    .join(', ');
                next(new http_exception_1.BadRequestException(message || 'Unknown error'));
            }
            else {
                ;
                res.locals.dto = dto;
                next();
            }
        }
        catch (error) {
            next(error);
        }
    };
}
exports.validate = validate;
//# sourceMappingURL=validator.middleware.js.map