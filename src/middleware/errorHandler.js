const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : 'Internal Server Error';
  console.error (err);
  res.status(statusCode).json({ erro: message });
};

module.exports = errorHandler;
