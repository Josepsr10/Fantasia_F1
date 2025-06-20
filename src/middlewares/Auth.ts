import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export class Auth {
    authenticate(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).send();
            return;
        }

        const tokenWithoutPrefix = token.replace('Bearer ', '');

        const data: any = jwt.verify(tokenWithoutPrefix, process.env.JWT_SECRET!);

        if (!data) {
            res.status(401).send();
            return;
        }

        res.locals = {
            id: data.id
        };

        next();
    }
}