const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

/**
 * Default JWT Config (Developers Can Override)
 */
const defaultConfig = {
    secret: process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex"),
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    algorithm: process.env.JWT_ALGORITHM || "HS256"
};

/**
 * Generate a JWT Token (Supports Custom Payload & Options)
 * @param {Object} payload - User data or custom claims
 * @param {Object} options - Custom JWT options (optional)
 * @returns {String} - Signed JWT Token
 */
function generateToken(payload, options = {}) {
    return jwt.sign(payload, defaultConfig.secret, { 
        expiresIn: options.expiresIn || defaultConfig.expiresIn,
        algorithm: options.algorithm || defaultConfig.algorithm
    });
}

/**
 * Verify a JWT Token (Handles Expiry & Invalid Tokens Gracefully)
 * @param {String} token - JWT Token
 * @returns {Object|Boolean} - Decoded token or false if invalid
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, defaultConfig.secret);
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return false; // Return false instead of throwing an error
    }
}

/**
 * Decode a JWT Token Without Verifying (Useful for Debugging)
 * @param {String} token - JWT Token
 * @returns {Object|null} - Decoded payload or null if invalid
 */
function decodeToken(token) {
    try {
        return jwt.decode(token);
    } catch (err) {
        console.error("JWT Decode Error:", err.message);
        return null;
    }
}

/**
 * Allow Developers to Override Default Configurations
 * @param {Object} newConfig - New JWT configuration
 */
function configureJWT(newConfig) {
    Object.assign(defaultConfig, newConfig);
}

// Export JWT Utility
module.exports = { generateToken, verifyToken, decodeToken, configureJWT };
