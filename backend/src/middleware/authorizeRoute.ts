import { NextFunction, Request, Response } from 'express';
import { AppError } from './errorHandler';

const jwt = require('jsonwebtoken');
export const protectRoute = (req: Request, res: Response, next: NextFunction) => {

    const { PRIVATE_KEY } = process.env;
    console.log(req.headers);
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
        return next(new AppError('No way dawg.', 500));
    }
    const token = bearerToken.split(' ')[1];
    if (!token) {
        return next(new AppError('No way dawg.', 500));

    }
    jwt.verify(token, PRIVATE_KEY, (err: any, data: any) => {
        if (err) {
            return next(new AppError('No way dawg.', 500));
        }
        next();
    });


};


