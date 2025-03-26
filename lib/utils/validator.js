const Joi = require("joi");

/**
 * 🔹 Validate User Input with Custom Error Messages
 * @param {Object} data - User input object
 * @returns {Object} - Validation result
 */
function validateUserInput(data) {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.empty": "Username is required.",
                "string.min": "Username must be at least 3 characters.",
                "string.max": "Username must be less than 30 characters.",
                "string.alphanum": "Username must contain only letters and numbers."
            }),
        password: Joi.string()
            .min(6)
            .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{6,}$"))
            .required()
            .messages({
                "string.empty": "Password is required.",
                "string.min": "Password must be at least 6 characters.",
                "string.pattern.base": "Password must contain at least one letter and one number."
            })
    });

    return schema.validate(data, { abortEarly: false });
}

module.exports = { validateUserInput };
