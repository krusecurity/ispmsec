const winston = require("winston");
const path = require("path");

// 🔹 Default Logging Configuration (Developers Can Override)
let loggerConfig = {
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.colorize() }),
        new winston.transports.File({ filename: path.join(__dirname, "../logs/app.log"), level: "info" }),
        new winston.transports.File({ filename: path.join(__dirname, "../logs/error.log"), level: "error" })
    ]
};

// 🔹 Create Winston Logger
let logger = winston.createLogger(loggerConfig);

/**
 * 🔹 Allow Developers to Override Logging Configuration
 * @param {object} customConfig - Custom Winston Logger options
 */
function setLoggerConfig(customConfig) {
    if (typeof customConfig === "object") {
        loggerConfig = { ...loggerConfig, ...customConfig };
        logger = winston.createLogger(loggerConfig); // Apply new configuration
    } else {
        throw new Error("Logger configuration must be an object");
    }
}

// Export for Developer Use
module.exports = { logger, setLoggerConfig };
