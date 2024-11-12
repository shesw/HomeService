import { NextFunction, Request, Response } from 'express';
export declare function validate<T extends {}>(Dto: {
    new (...args: any[]): T;
}): (req: Request, res: Response, next: NextFunction) => Promise<void>;
