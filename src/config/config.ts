import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET || ""
};