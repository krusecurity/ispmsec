require("dotenv").config();
const Joi = require("joi");

/**
 * 🔹 Define a Configuration Schema for Validation
 */
const configSchema = Joi.object({
    PORT: Joi.number().default(3000).min(1024).max(65535),
    NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
    JWT_SECRET: Joi.string().min(32).required().messages({ "any.required": "JWT_SECRET is required!" }),
    SESSION_SECRET: Joi.string().min(32).required().messages({ "any.required": "SESSION_SECRET is required!" }),
    DATABASE_URL: Joi.string().uri().optional(),
    REDIS_URL: Joi.string().uri().optional(),
}).unknown();

/**
 * 🔹 Validate and Load Environment Variables
 */
const { error, value: envVars } = configSchema.validate(process.env);
if (error) {
    throw new Error(`⚠️ Configuration Error: ${error.message}`);
}

/**
 * 🔹 Centralized Config Object for Developers
 */
const config = {
    app: {
        port: envVars.PORT,
        environment: envVars.NODE_ENV,
    },
    security: {
        jwtSecret: envVars.JWT_SECRET,
        sessionSecret: envVars.SESSION_SECRET,
    },
    database: {
        url: envVars.DATABASE_URL || "mongodb://localhost:27017/myapp",
    },
    cache: {
        redisUrl: envVars.REDIS_URL || null,
    }
};

module.exports = config;
