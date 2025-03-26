const AppError = require('../utils/AppError.js');

const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError ? err.message : 'Internal Server Error';

    res.status(statusCode).json({ erro: message });
};

module.exports = errorHandler;
