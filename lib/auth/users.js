const crypto = require("crypto");

// 🔹 Default In-Memory User Store (Developers can replace with DB)
let userStore = [];

/**
 * 🔹 Generate a Secure Salt
 * @returns {string} - A unique salt
 */
function generateSalt() {
    return crypto.randomBytes(16).toString("hex");
}

/**
 * 🔹 Securely Hash a Password
 * @param {string} password - Plaintext password
 * @param {string} salt - Salt value
 * @returns {string} - Hashed password
 */
function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

/**
 * 🔹 Register a New User
 * @param {string} username - Unique username
 * @param {string} password - User password
 * @returns {object} - Success or error response
 */
async function registerUser(username, password) {
    if (userStore.some(user => user.username === username)) {
        return { success: false, message: "Username already exists" };
    }
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);
    const user = { id: userStore.length + 1, username, salt, hash: hashedPassword };
    
    userStore.push(user);
    return { success: true, message: "User registered successfully", user };
}

/**
 * 🔹 Login a User
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {object} - Login response
 */
async function loginUser(username, password) {
    const user = userStore.find(u => u.username === username);
    if (!user || user.hash !== hashPassword(password, user.salt)) {
        return { success: false, message: "Invalid credentials" };
    }
    return { success: true, message: "Login successful", user };
}

/**
 * 🔹 Find User by Username
 * @param {string} username - Username to search
 * @returns {object|null} - User object or null
 */
function findUserByUsername(username) {
    return userStore.find(user => user.username === username) || null;
}

/**
 * 🔹 Allow Developers to Override User Storage (DB Integration)
 * @param {Array} store - Custom user storage (DB, Redis, etc.)
 */
function setUserStore(store) {
    if (Array.isArray(store)) {
        userStore = store;
    } else {
        throw new Error("User store must be an array or a database integration");
    }
}

// Export Functions for Developer Use
module.exports = { registerUser, loginUser, findUserByUsername, setUserStore };
