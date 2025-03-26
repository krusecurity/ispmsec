const rateLimit = require("express-rate-limit");

// 🔹 Default Rate Limiting Config (Developers Can Override)
let rateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { success: false, message: "Too many requests, please try again later." },
    headers: true, // Send RateLimit headers
    standardHeaders: true, // RFC 6585 headers
    legacyHeaders: false // Disable legacy headers
};

/**
 * 🔹 Allow Developers to Override Rate Limit Config
 * @param {object} customConfig - Custom rate limiting options
 */
function setRateLimitConfig(customConfig) {
    if (typeof customConfig === "object") {
        rateLimitConfig = { ...rateLimitConfig, ...customConfig };
    } else {
        throw new Error("Rate limit configuration must be an object");
    }
}

// 🔹 Middleware Function for Rate Limiting
function rateLimitMiddleware() {
    return rateLimit(rateLimitConfig);
}

// Export for Developer Use
module.exports = { rateLimitMiddleware, setRateLimitConfig };
