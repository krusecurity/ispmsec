Here are the required files:  

---

### **LICENSE (MIT License)**
```plaintext
MIT License

Copyright (c) 2025 ISRDO

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

---

### **CONTRIBUTING.md**
```markdown
# Contributing to ISRDO Security Package

We appreciate your interest in contributing to our security package! Please follow these guidelines to ensure a smooth process.

## 🛠 Setting Up the Project

1. **Fork the Repository** on GitHub.
2. **Clone your Fork**:
   ```sh
   git clone https://github.com/your-username/isrdo-security.git
   ```
3. **Navigate into the Directory**:
   ```sh
   cd isrdo-security
   ```
4. **Install Dependencies**:
   ```sh
   npm install
   ```

## 🚀 How to Contribute

### 📝 1. Reporting Bugs
- If you find a bug, please [open an issue](https://github.com/isrdo/isrdo-security/issues).
- Provide steps to reproduce, expected behavior, and actual behavior.

### ⚡ 2. Adding Features or Fixes
- Create a feature branch:
  ```sh
  git checkout -b feature-name
  ```
- Make your changes and commit:
  ```sh
  git commit -m "Add feature XYZ"
  ```
- Push to your fork:
  ```sh
  git push origin feature-name
  ```
- Open a **Pull Request (PR)** in the main repository.

## ✅ Code Guidelines
- Follow **JavaScript best practices**.
- Use `prettier` for formatting (`npm run format`).
- Write clear commit messages.

---

Happy Coding! 🚀
```

Now you can add these files to your project and republish your package using:
```sh
npm version patch
npm publish
```

Let me know if you need any modifications! 🚀