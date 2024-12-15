const {constants}  = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                message: 'Validation Error',
                error: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                message: 'Unauthorized',
                error: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;

        case constants.FORBIDDEN:
            res.json({
                message: 'Forbidden',
                error: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                message: 'Not Found',
                error: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;

        case constants.SERVER_ERROR:
            res.json({
                message: 'Server Error',
                error: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;

        default:
            res.json({
                message: 'Something went wrong',
                error: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;

    }
};

module.exports = errorHandler;
