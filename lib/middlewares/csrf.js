const csrf = require("csurf");

// 🔹 Default CSRF Protection Config (Developers Can Override)
let csrfConfig = {
    cookie: true, // Store CSRF token in a cookie
    ignoreMethods: ["GET", "HEAD", "OPTIONS"], // Ignore safe methods
    value: (req) => req.headers["x-csrf-token"] || req.body._csrf || req.query._csrf // Token extraction logic
};

/**
 * 🔹 Allow Developers to Override CSRF Protection Config
 * @param {object} customConfig - Custom CSRF options
 */
function setCsrfConfig(customConfig) {
    if (typeof customConfig === "object") {
        csrfConfig = { ...csrfConfig, ...customConfig };
    } else {
        throw new Error("CSRF configuration must be an object");
    }
}

// 🔹 Middleware Function for CSRF Protection
function csrfMiddleware() {
    return csrf(csrfConfig);
}

// Export for Developer Use
module.exports = { csrfMiddleware, setCsrfConfig };
