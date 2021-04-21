import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import moment from "moment";

import logger from "./logger.js";
import configS3Object from "./configS3.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async () => {
    const h24 = 1000 * 60 * 60 * 24;
    try {
        setInterval(async () => {
            try {
                const allLogsPath = path.resolve(__dirname, "..", "allLogs.log");
                const errorsLogsPath = path.resolve(__dirname, "..", "errors.log");
                const today = moment().format("YYYY-MM-DD hh:mm:ss");

                const s3 = await configS3Object();

                if (fs.existsSync(allLogsPath)) {
                    const fileData = fs.readFileSync(allLogsPath)
                    await s3.putObject({
                        Key: `microservice_logs/${process.env.NODE_ENV}/date-${today}/allLogs.log`,
                        Body: fileData
                    }).promise()
                    fs.writeFileSync(allLogsPath, "")
                    logger.info(`Upload info logs for date: ${today}, you can found it in s3 path: /microservice_logs/${process.env.NODE_ENV}/${today}/allLogs.log`)
                }

                if (fs.existsSync(errorsLogsPath)) {
                    const fileData = fs.readFileSync(errorsLogsPath);
                    await s3.putObject({
                        Key: `microservice_logs/${process.env.NODE_ENV}/date-${today}/errors.log`,
                        Body: fileData
                    }).promise()
                    fs.writeFileSync(errorsLogsPath, "")
                    logger.info(`Upload errors logs for data: ${today}, you can found it in s3 path: /microservice_logs/${process.env.NODE_ENV}/${today}/errors.log`)
                }
            } catch (err) {
                logger.error(JSON.stringify(err))
            }
        }, h24)
    } catch (err) {
        logger.error(JSON.stringify(err))
    }
}