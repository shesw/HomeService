export declare class HttpException extends Error {
    readonly status: number;
    constructor(status: number, message: string);
}
export declare class BadRequestException extends HttpException {
    constructor(message: string);
}
export declare class NotFoundException extends HttpException {
    constructor(message: string);
}
export declare class ForbiddenException extends HttpException {
    constructor(message: string);
}
