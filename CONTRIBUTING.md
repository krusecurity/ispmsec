

---

### **CONTRIBUTING.md**
```markdown
# Contributing to ISRDO Security Package

We appreciate your interest in contributing to our security package! Please follow these guidelines to ensure a smooth process.

## 🛠 Setting Up the Project

1. **Fork the Repository** on GitHub.
2. **Clone your Fork**:
   ```sh
   git clone https://github.com/krusecurity/ispmsec.git
   ```
3. **Navigate into the Directory**:
   ```sh
   cd ispmsec
   ```
4. **Install Dependencies**:
   ```sh
   npm install
   ```

## 🚀 How to Contribute

### 📝 1. Reporting Bugs
- If you find a bug, please [open an issue](https://github.com/krusecurity/ispmsec/issues).
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
