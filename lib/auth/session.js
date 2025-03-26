const session = require("express-session");
require("dotenv").config();

let sessionOptions = {
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 // 1 hour
    },
    store: null // Default: Memory Store (Can be replaced)
};

/**
 * 🔹 Configure Session Middleware (Developers Can Override)
 * @param {object} options - Custom session configuration
 */
function configureSession(options = {}) {
    sessionOptions = { ...sessionOptions, ...options };
    if (options.store) sessionOptions.store = options.store; // Allow custom session stores
}

/**
 * 🔹 Express Session Middleware
 */
const sessionMiddleware = (req, res, next) => {
    session(sessionOptions)(req, res, next);
};

// Export Middleware & Configurable Function
module.exports = { sessionMiddleware, configureSession };
