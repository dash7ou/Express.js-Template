class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.statusCode = errorCode;
        this.name = "HttpError"
    }
}

export default HttpError;