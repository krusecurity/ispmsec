const logger = require("./logging"); // Using Winston or any logging mechanism

/**
 * 🔹 Global Error Handling Middleware
 * @param {Object} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
function errorHandler(err, req, res, next) {
    // Default error structure
    const statusCode = err.status || 500;
    const errorResponse = {
        success: false,
        status: statusCode,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method,
    };

    // Log the error for debugging
    logger.error(`[${req.method}] ${req.originalUrl} - ${err.message}`, { error: err });

    // Send structured JSON error response
    res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;
