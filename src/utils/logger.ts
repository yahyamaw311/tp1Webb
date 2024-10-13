import winston, { level } from "winston";


const logger = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: './logs/app.log', level: 'http' }),
        new winston.transports.File({ filename: './logs/error.log', level: 'error' })
    ]
});

export default logger;