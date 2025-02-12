class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export const errorMiddleware = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ErrorHandler)) {
        error = new ErrorHandler(error.message || "Internal Server Error", error.statusCode || 500);
    }
    if (error.name === "CastError") {
        error = new ErrorHandler(`Resource not found. Invalid ${error.path}`, 400);
    }
    if (error.code === 11000) {
        error = new ErrorHandler("Duplicate field value entered", 400);
    }
    if (error.name === "JsonWebTokenError") {
        error = new ErrorHandler("Invalid JSON Web Token", 400);
    }
    if (error.name === "TokenExpiredError") {
        error = new ErrorHandler("JSON Web Token has expired", 400);
    }
    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};
export default ErrorHandler;
