const crypto = require("crypto");

// Default configurations (Developers can override)
let cryptoConfig = {
    saltLength: 16, // Default salt length
    hashIterations: 10000, // Increase security with more iterations
    hashKeyLength: 64,
    hashAlgorithm: "sha512",
    encryptionAlgorithm: "aes-256-gcm"
};

/**
 * 🔹 Generate a Cryptographic Salt
 * @param {number} length - Salt length (default: 16 bytes)
 * @returns {string} - Hex encoded salt
 */
function generateSalt(length = cryptoConfig.saltLength) {
    return crypto.randomBytes(length).toString("hex");
}

/**
 * 🔹 Hash a Password using PBKDF2
 * @param {string} password - User password
 * @param {string} salt - Cryptographic salt
 * @returns {string} - Hex encoded hash
 */
function hashPassword(password, salt) {
    return crypto
        .pbkdf2Sync(password, salt, cryptoConfig.hashIterations, cryptoConfig.hashKeyLength, cryptoConfig.hashAlgorithm)
        .toString("hex");
}

/**
 * 🔹 Encrypt Data using AES-256-GCM
 * @param {string} data - Data to encrypt
 * @param {string} secretKey - Secret key (must be 32 bytes)
 * @returns {object} - Encrypted payload { iv, encryptedData, authTag }
 */
function encryptData(data, secretKey) {
    if (secretKey.length !== 32) throw new Error("Secret key must be 32 bytes for AES-256-GCM");

    const iv = crypto.randomBytes(16); // Generate IV (Initialization Vector)
    const cipher = crypto.createCipheriv(cryptoConfig.encryptionAlgorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");

    return { iv: iv.toString("hex"), encryptedData: encrypted, authTag };
}

/**
 * 🔹 Decrypt Data using AES-256-GCM
 * @param {object} encryptedPayload - { iv, encryptedData, authTag }
 * @param {string} secretKey - Secret key (must be 32 bytes)
 * @returns {string} - Decrypted data
 */
function decryptData({ iv, encryptedData, authTag }, secretKey) {
    if (secretKey.length !== 32) throw new Error("Secret key must be 32 bytes for AES-256-GCM");

    const decipher = crypto.createDecipheriv(cryptoConfig.encryptionAlgorithm, Buffer.from(secretKey), Buffer.from(iv, "hex"));
    decipher.setAuthTag(Buffer.from(authTag, "hex"));
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

/**
 * 🔹 Allow Developers to Configure Crypto Settings
 * @param {object} customConfig - Custom crypto settings
 */
function setCryptoConfig(customConfig) {
    if (typeof customConfig === "object") {
        cryptoConfig = { ...cryptoConfig, ...customConfig };
    } else {
        throw new Error("Crypto configuration must be an object");
    }
}

// Export for Developer Use
module.exports = { generateSalt, hashPassword, encryptData, decryptData, setCryptoConfig };
