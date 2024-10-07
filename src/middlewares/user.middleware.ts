import session from 'express-session';
import { config } from '../config/config';
import app from '../app'
import { NextFunction } from 'express';

app.use(session({
    secret: "tesdf", //TO CHANGE
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.nodeEnv === 'production' }
}))

export const getInfo = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`${req.method} ${req.url}`);
    next();
}