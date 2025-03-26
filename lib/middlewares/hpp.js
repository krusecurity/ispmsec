const hpp = require("hpp");

// 🔹 Default HPP Protection Config (Developers Can Override)
let hppConfig = { checkBody: true, checkQuery: true };

/**
 * 🔹 Allow Developers to Override HPP Protection Config
 * @param {object} customConfig - Custom HPP options
 */
function setHppConfig(customConfig) {
    if (typeof customConfig === "object") {
        hppConfig = { ...hppConfig, ...customConfig };
    } else {
        throw new Error("HPP configuration must be an object");
    }
}

// 🔹 Middleware Function for HPP Protection
function hppMiddleware() {
    return hpp(hppConfig);
}

// Export for Developer Use
module.exports = { hppMiddleware, setHppConfig };
