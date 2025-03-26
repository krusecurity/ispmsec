const compression = require("compression");

// 🔹 Default Compression Configuration (Developers Can Override)
let compressionOptions = {
    level: 6, // Compression level (0-9, higher = better compression but slower)
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
            return false; // Skip compression if 'x-no-compression' header exists
        }
        return compression.filter(req, res);
    }
};

// 🔹 Create Compression Middleware
let compressionMiddleware = compression(compressionOptions);

/**
 * 🔹 Allow Developers to Override Compression Configuration
 * @param {object} customOptions - Custom Compression options
 */
function setCompressionOptions(customOptions) {
    if (typeof customOptions === "object") {
        compressionOptions = { ...compressionOptions, ...customOptions };
        compressionMiddleware = compression(compressionOptions); // Apply new configuration
    } else {
        throw new Error("Compression configuration must be an object");
    }
}

// Export for Developer Use
module.exports = { compressionMiddleware, setCompressionOptions };
