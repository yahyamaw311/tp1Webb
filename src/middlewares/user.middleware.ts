import { config } from '../config/config';
import app from '../app';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { object } from 'joi';


export function authentificateToken(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.headers['authorization'];
        if (!token){
            res.status(403).json({message: "no token detected"});
            return;
        }

        const decoded = jwt.verify(token, config.jwt_secret);
        req.body.user = decoded;
        next();
    }catch(error){
        res.status(403).json({message: "token invalide"})
    }
}

export function authorizeRole(roles: string[]) {

    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.body.user?.role;
        if(!roles.includes(userRole)){
            res.status(403).json({message: 'Accès interdit.'});
            return;
        }
        next();
    };
}