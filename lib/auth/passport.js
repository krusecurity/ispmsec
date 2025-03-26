const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let findUserByUsername = async () => { throw new Error("User lookup not implemented!"); };
let findUserById = async () => { throw new Error("User lookup by ID not implemented!"); };
let verifyPassword = async () => { throw new Error("Password verification not implemented!"); };

/**
 * Default Authentication Strategy (Developers Can Override)
 */
function configureAuth({ findByUsername, findById, passwordVerifier }) {
    if (findByUsername) findUserByUsername = findByUsername;
    if (findById) findUserById = findById;
    if (passwordVerifier) verifyPassword = passwordVerifier;
}

/**
 * Local Authentication Strategy (Can Be Replaced by Developers)
 */
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await findUserByUsername(username);
        if (!user || !(await verifyPassword(password, user.salt, user.hash))) {
            return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

/**
 * User Serialization (Stores User ID in Session)
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/**
 * User Deserialization (Fetches User from Session)
 */
passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Export Passport & Configurable Auth
module.exports = { passport, configureAuth };
