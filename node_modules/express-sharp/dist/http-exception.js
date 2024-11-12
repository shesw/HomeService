"use strict";
/* eslint-disable no-magic-numbers */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.NotFoundException = exports.BadRequestException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, HttpException);
    }
}
exports.HttpException = HttpException;
class BadRequestException extends HttpException {
    constructor(message) {
        super(400, message);
        Error.captureStackTrace(this, BadRequestException);
    }
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends HttpException {
    constructor(message) {
        super(404, message);
        Error.captureStackTrace(this, NotFoundException);
    }
}
exports.NotFoundException = NotFoundException;
class ForbiddenException extends HttpException {
    constructor(message) {
        super(403, message);
        Error.captureStackTrace(this, ForbiddenException);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=http-exception.js.map