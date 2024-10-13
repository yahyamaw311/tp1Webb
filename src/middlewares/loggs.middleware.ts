import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export function loggerMiddleWareHttp(req: Request, res: Response, next: NextFunction){
    logger.http(`${req.method} ${req.url}`);
    next();
};

export function loggerMiddleWareError(err: Error, req: Request, res: Response, next: NextFunction){
    logger.error(err.message);
    next();
}