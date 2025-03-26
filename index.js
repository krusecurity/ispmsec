// Load environment variables from a .env file
require("dotenv").config();

const express = require("express");

// Import security middleware modules
const helmet = require("./lib/middlewares/helmet");
const cors = require("./lib/middlewares/cors");
const rateLimit = require("./lib/middlewares/rateLimit");
const compression = require("./lib/middlewares/compression");
const csrf = require("./lib/middlewares/csrf");

// Import authentication and session modules
const session = require("./lib/auth/session");
const passport = require("./lib/auth/passport");

// Import global error handler and environment configuration
const errorHandler = require("./lib/utils/errorHandler");
const { PORT } = require("./lib/utils/env");

// Initialize Express application
const app = express();

// -----------------------------------------
// Middleware Setup
// -----------------------------------------

// Parse incoming JSON requests
app.use(express.json());

// Apply security headers using Helmet
app.use(helmet);

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors);

// Apply rate limiting to all requests to prevent abuse
app.use(rateLimit);

// Enable response compression for performance improvements
app.use(compression);

// CSRF protection (ensure your client is set to read the CSRF token)
app.use(csrf);

// Session management: configure sessions with secure cookies
app.use(session);

// Initialize Passport authentication and session handling
app.use(passport.initialize());
app.use(passport.session());

// -----------------------------------------
// Routes
// -----------------------------------------

// Root route for quick health-check
app.get("/", (req, res) => {
    res.send("Welcome to ISRDO Security Package!");
});

// (Optional) You can mount additional routes here, for example:
// app.use("/auth", require("./lib/auth/auth")); 

// -----------------------------------------
// Global Error Handling Middleware
// -----------------------------------------
app.use(errorHandler);

// -----------------------------------------
// Start the Server
// -----------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});

// Export the app for testing purposes
module.exports = app;
