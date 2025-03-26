const helmet = require("helmet");

// 🔹 Default Helmet Config (Developers Can Override)
let helmetConfig = {
    contentSecurityPolicy: true, 
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-origin" },
    dnsPrefetchControl: { allow: false },
    expectCt: { enforce: true, maxAge: 30 },
    frameguard: { action: "deny" },
    hidePoweredBy: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: { policy: "none" },
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: true
};

/**
 * 🔹 Allow Developers to Override Helmet Config
 * @param {object} customConfig - Custom Helmet configuration
 */
function setHelmetConfig(customConfig) {
    if (typeof customConfig === "object") {
        helmetConfig = { ...helmetConfig, ...customConfig };
    } else {
        throw new Error("Helmet configuration must be an object");
    }
}

// 🔹 Middleware Function for Helmet
function helmetMiddleware() {
    return helmet(helmetConfig);
}

// Export for Developer Use
module.exports = { helmetMiddleware, setHelmetConfig };
