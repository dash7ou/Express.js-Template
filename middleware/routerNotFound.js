import HttpError from "../models/HttpError.js";

const routerNotFound = (err, req, res, next) => {
    if (!err) {
        const error = new HttpError("Could not found this route", 404);
        throw error
    } else {
        throw err;
    }
}

export default routerNotFound;