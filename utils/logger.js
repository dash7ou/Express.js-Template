import winston from "winston";


const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.File({ filename: "errors.log", level: "error" }),
        new winston.transports.File({ filename: "allLogs.log" }),
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
    ]
});



export default logger;