const { v1: uuidv1, v4: uuidv4, v5: uuidv5 } = require("uuid");

/**
 * 🔹 Generate a Unique ID
 * @param {string} version - UUID version ("v1", "v4", "v5")
 * @param {string} [namespace] - Required for UUIDv5 (default: ISRDO namespace)
 * @param {string} [name] - Required for UUIDv5 name-based generation
 * @returns {string} - Generated UUID
 */
function generateUUID(version = "v4", namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", name = "isrdo") {
    switch (version) {
        case "v1":
            return uuidv1(); // Time-based UUID
        case "v4":
            return uuidv4(); // Random UUID (most commonly used)
        case "v5":
            return uuidv5(name, namespace); // Deterministic UUID
        default:
            throw new Error("Invalid UUID version. Use 'v1', 'v4', or 'v5'.");
    }
}

module.exports = { generateUUID };
