const cors = require("cors");

// 🔹 Default CORS Config (Developers Can Override)
let corsConfig = {
    origin: "*",  // Allow all origins (change in production)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    exposedHeaders: ["Authorization"], // Expose headers to clients
    credentials: true, // Allow credentials like cookies
    optionsSuccessStatus: 204 // Status for preflight requests
};

/**
 * 🔹 Allow Developers to Override CORS Config
 * @param {object} customConfig - Custom CORS configuration
 */
function setCorsConfig(customConfig) {
    if (typeof customConfig === "object") {
        corsConfig = { ...corsConfig, ...customConfig };
    } else {
        throw new Error("CORS configuration must be an object");
    }
}

// 🔹 Middleware Function for CORS
function corsMiddleware() {
    return cors(corsConfig);
}

// Export for Developer Use
module.exports = { corsMiddleware, setCorsConfig };
