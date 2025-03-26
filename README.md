# **📖 ISRDO Security Package – Developer's Guide**  
### **A complete guide to integrating `ispm` into new and existing Node.js projects.**  

---

# **🔹 Introduction**  
The **ISRDO Security Package** provides security middleware and authentication utilities for Node.js applications. It includes **authentication, session management, security headers, rate limiting, logging, and more.**  

### **🌟 Features**
✅ Secure authentication (Passport.js & JWT)  
✅ Session management (Express sessions)  
✅ Security headers (Helmet.js)  
✅ CORS protection  
✅ Rate limiting  
✅ Input validation  
✅ Logging (Winston)  
✅ CSRF protection  
✅ HPP (HTTP Parameter Pollution) protection  
✅ Compression middleware  

---

# **🚀 1. Installation**  
### **For New Projects**  
```sh
mkdir my-secure-app && cd my-secure-app
npm init -y
npm install ispm express dotenv
```

### **For Existing Projects**  
```sh
npm install ispm
```

---

# **📌 2. Basic Usage**  
### **🔹 Importing and Applying Middleware**
Modify your `index.js` or `app.js` file:
```js
const express = require("express");
const isrdoSecurity = require("ispm");

const app = express();

// Load Environment Variables
require("dotenv").config();

// Apply Security Middleware
app.use(express.json());
app.use(isrdoSecurity.helmet);    // Secure HTTP headers
app.use(isrdoSecurity.cors);      // Cross-Origin Resource Sharing
app.use(isrdoSecurity.rateLimit); // Rate limiting
app.use(isrdoSecurity.session);   // Secure session management
app.use(isrdoSecurity.passport.initialize());
app.use(isrdoSecurity.passport.session());
app.use(isrdoSecurity.csrf);      // CSRF protection
app.use(isrdoSecurity.hpp);       // Prevent HTTP Parameter Pollution
app.use(isrdoSecurity.compression()); // Enable compression
app.use(isrdoSecurity.logger);    // Logging

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to ISRDO Secure App!");
});

// Global Error Handler
app.use(isrdoSecurity.errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

# **🔑 3. Authentication Setup**
### **🔹 Using JWT Authentication**
```js
const { generateToken, verifyToken } = require("ispm");

const user = { id: 1, username: "admin" };

// Generate Token
const token = generateToken(user);
console.log("JWT Token:", token);

// Verify Token
try {
    const decoded = verifyToken(token);
    console.log("Decoded Token:", decoded);
} catch (err) {
    console.error("Invalid Token:", err.message);
}
```

---

### **🔹 Using Passport Authentication**
Modify your authentication routes:
```js
const express = require("express");
const passport = require("ispm").passport;
const { setAuthHandlers } = require("ispm").auth;

const router = express.Router();

// Custom authentication logic
setAuthHandlers({
    register: async (req, res) => {
        // Implement user registration logic
        res.json({ success: true, message: "User registered!" });
    },
    login: async (req, res) => {
        // Implement user login logic
        res.json({ success: true, message: "User logged in!" });
    }
});

// Routes
router.post("/register", passport.authenticate("local"), (req, res) => {
    res.json({ success: true, message: "User registered successfully" });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ success: true, message: "User logged in successfully" });
});

module.exports = router;
```

---

# **🔒 4. Security Features**
### **🔹 CSRF Protection**
Automatically enabled via:
```js
app.use(ispm.csrf);
```
**For frontend compatibility**, send the CSRF token in requests:
```js
fetch("/api", {
    method: "POST",
    headers: {
        "CSRF-Token": document.cookie.split("csrfToken=")[1]
    },
    body: JSON.stringify(data)
});
```

---

### **🔹 Rate Limiting**
Prevent brute-force attacks:
```js
app.use(ispm.rateLimit);
```
To customize rate limits:
```js
const rateLimit = require("express-rate-limit");

const customLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50 // Limit each IP to 50 requests per 10 minutes
});

app.use(customLimiter);
```

---

### **🔹 HTTP Parameter Pollution Protection**
Prevents duplicate parameters in requests:
```js
app.use(ispm.hpp);
```

---

### **🔹 Security Headers**
Set secure HTTP headers:
```js
app.use(ispm.helmet);
```

---

# **🔍 5. Logging & Monitoring**
### **🔹 Winston Logging**
ISRDO Security provides **built-in logging**:
```js
const logger = require("ispm").logger;

logger.info("Server started successfully");
logger.error("Error occurred");
```
Logs are stored in `logs/error.log`.

---

# **🔧 6. Utility Functions**
### **🔹 UUID Generator**
```js
const { generateUUID } = require("ispm");
console.log(generateUUID()); // Example: "b15f9c8e-8d2f-4d3e-9886-a1b3c5e6f7d8"
```

---

### **🔹 Input Validation**
```js
const { validateUserInput } = require("ispm");

const { error } = validateUserInput({ username: "admin", password: "123456" });
if (error) console.log(error.details[0].message);
```

---

# **🛠 7. Deployment & Environment Setup**
### **🔹 Create `.env` File**
```env
PORT=3000
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
```

### **🔹 Start Your Secure App**
```sh
node index.js
```

---

# **📢 8. Updating the Package**
To upgrade to the latest version:
```sh
npm update ispm
```

---

# **🎯 Conclusion**
🎉 **Congratulations!** You have successfully integrated the `isrdo-security` package into your project. This package provides a **plug-and-play security solution** for your Node.js applications.

**📌 Next Steps:**
- **Contribute to ISRDO Security:** Fork & improve it on [GitHub](https://github.com/krusecurity/ispmsec).
- **Report Issues:** Open a GitHub issue for bug reports & feature requests.
- **Spread the Word:** Share with other developers! 🚀

---

# **💬 Need Help?**
📩 **Support Email:** support@isrdo.in  
🌎 **Website:** [ISRDO](https://isrdo.in)  
👨‍💻 **Community:** Join our developer forum for discussions!
