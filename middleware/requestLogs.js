import logger from "../utils/logger.js"

// @desc Logs request to console
const reqLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

export default reqLogger;