import { config } from '../config/config';
import app from '../app';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export function authentificateToken(req: any, res: any, next: NextFunction){
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        console.log(token);
        if (!token) return res.status(403).json({message: "user not authorized"});

        jwt.verify(token, config.jwt_secret, (err: any, user: any) => {
            if (err) return res.status(403).json({message: "user not authorized"});
            req.user = user;
            next();
        });
    }catch(error){
        res.status(500).json({message: "internal error"})
    }
}