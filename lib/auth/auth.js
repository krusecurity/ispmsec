const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const router = express.Router();
let users = []; // In-memory user storage (for testing)

let jwtSecret = process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");
let sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
let googleClientID = process.env.GOOGLE_CLIENT_ID || "";
let googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

// OTP Storage
let otpStore = {};

// Passport Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientID,
            clientSecret: googleClientSecret,
            callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            let user = users.find(u => u.email === profile.emails[0].value);
            if (!user) {
                user = { id: users.length + 1, email: profile.emails[0].value, name: profile.displayName };
                users.push(user);
            }
            done(null, user);
        }
    )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Default Register Handler (Developers Can Override)
async function registerHandler(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    users.push({ id: users.length + 1, username, email, password: hashedPassword, role: "user" });
    res.json({ success: true, message: "User registered" });
}

// Default Login Handler
async function loginHandler(req, res) {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: "1h" });
    res.json({ success: true, message: "Login successful", token });
}

// Multi-Factor Authentication (OTP)
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via Email (Example: Nodemailer)
async function sendOTP(email) {
    const otp = generateOTP();
    otpStore[email] = otp;

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
        from: '"Security Team" <no-reply@isrdo.com>',
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}`
    });

    return otp;
}

// Verify OTP
async function verifyOTPHandler(req, res) {
    const { email, otp } = req.body;
    if (otpStore[email] === otp) {
        delete otpStore[email]; // OTP used, remove it
        return res.json({ success: true, message: "OTP Verified" });
    }
    res.status(401).json({ success: false, message: "Invalid OTP" });
}

// Password Reset
async function resetPasswordHandler(req, res) {
    const { email, newPassword } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 12);
    res.json({ success: true, message: "Password updated successfully" });
}

// Role-Based Access Control Middleware
function authorizeRoles(...roles) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

        try {
            const decoded = jwt.verify(token, jwtSecret);
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ success: false, message: "Access denied" });
            }
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ success: false, message: "Invalid token" });
        }
    };
}

// Routes
router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/verify-otp", verifyOTPHandler);
router.post("/reset-password", resetPasswordHandler);
router.get("/protected", authorizeRoles("admin"), (req, res) => res.json({ success: true, message: "Admin Access Granted" }));

// Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => res.redirect("/dashboard"));

// Export Authentication System
module.exports = { router, setAuthHandlers };
