import express from "express";
import bodyParser from "body-parser";
import helment from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import logger from "./utils/logger.js";
import uploadLogs from "./utils/uploadLogs.js";

// import middlewares
import {
    requestLogs,
    errorHandler,
    routerNotFound
} from "./middleware/index.js"

// import routers


const PORT = process.env.PORT || 5400;

const app = express();
app.use(bodyParser.json())

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 10 // limit each IP to 10 requests per windowMs
});

//  apply to all requests
app.use(limiter);


// Set security headers
app.use(helment())

// Prevent XSS attacks
app.use(xss())

// Prevent http param pollution
app.use(hpp())

app.use(requestLogs);

app.use(cors())

// routes



// routes not founds
app.use(() => {
    routerNotFound()
})

// error handler
app.use(errorHandler)


// Server
let server;
server = app.listen(PORT, async () => {
    try {
        logger.info(`Server Run Successful port ${PORT}...`);
        await uploadLogs();
    } catch (err) {
        logger.error(JSON.stringify(err));
    }
});


// Handle unhandled promise rejections
process.on('uncaughtException', (err) => {

})


process.on('unhandledRejection', (err, promise) => {

});