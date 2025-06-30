# 🤝 Contributing to LeetPush

Thank you for your interest in contributing to LeetPush! We welcome contributions from developers of all skill levels. This guide will help you get started.

## 📜 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [Community](#community)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behaviors include:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behaviors include:**
- Harassment, trolling, or discriminatory language
- Personal attacks or political arguments
- Publishing others' private information without permission
- Any conduct that would be inappropriate in a professional setting

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** (v14.18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Google Chrome** or Chromium-based browser
- **GitHub account** for authentication testing
- Basic knowledge of **JavaScript/TypeScript** and **React**

### Skills We're Looking For

- **Frontend Development**: React, JavaScript/TypeScript, CSS
- **Chrome Extension Development**: Manifest V3, Content Scripts, Background Scripts
- **API Integration**: GitHub API, LeetCode GraphQL
- **UI/UX Design**: Tailwind CSS, Responsive Design
- **Documentation**: Technical writing, tutorials
- **Testing**: Unit tests, integration tests, manual testing

## 🛠️ Development Setup

### 1. Fork and Clone

```bash
git clone https://github.com/singhJasvinder101/leetpush.git
cd leetpush
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
npm run dev
```

### 4. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `dist` folder
4. The extension should now appear in your browser toolbar

### 5. Development Workflow

```bash
npm run dev

npm run fmt

npm run build

npm run zip
```

## 📝 How to Contribute

### Types of Contributions

1. **🐛 Bug Fixes**: Fix issues and improve stability
2. **✨ New Features**: Add functionality that enhances user experience
3. **📚 Documentation**: Improve guides, examples, and API docs
4. **🎨 UI/UX Improvements**: Enhance design and user interface
5. **⚡ Performance**: Optimize speed and resource usage
6. **🧪 Testing**: Add or improve test coverage
7. **🔧 Tooling**: Improve development workflow and build process

### Areas That Need Help

- **Browser Compatibility**: Firefox and Safari extension support
- **Accessibility**: WCAG compliance and screen reader support
- **Internationalization**: Multi-language support
- **Error Handling**: Better error messages and recovery
- **Performance**: Optimize bundle size and runtime performance
- **Testing**: Comprehensive test suite development
- **Documentation**: Video tutorials and advanced guides

## 🔄 Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout main
git pull upstream main

git checkout -b feature/your-feature-name
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Follow our [coding standards](#coding-standards)
- Write clear, concise commit messages
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
npm run fmt

npm run dev

npm run build
```

### 4. Commit Guidelines

Use conventional commit messages:

```bash
git commit -m "feat: add batch solution export functionality"

git commit -m "fix: resolve GitHub auth token expiration issue"

git commit -m "docs: update installation guide with troubleshooting"

git commit -m "style: improve button hover animations"

git commit -m "refactor: optimize GitHub API rate limiting"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name

```

### 6. PR Requirements

Your pull request should:

- [ ] Have a clear, descriptive title
- [ ] Include a detailed description of changes
- [ ] Reference any related issues (`Fixes #123`)
- [ ] Include screenshots for UI changes
- [ ] Pass all automated checks
- [ ] Be up to date with the main branch
- [ ] Have appropriate test coverage
- [ ] Follow our coding standards

### 7. PR Template

```markdown
## Description
Brief summary of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Tested manually in Chrome
- [ ] Added/updated tests
- [ ] All existing tests pass

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings/errors
```

### File Organization

```
.
├── build
│   ├── assets
│   ├── devtools.html
│   ├── icons
│   ├── img
│   ├── manifest.json
│   ├── options.html
│   ├── popup.html
│   ├── service-worker-loader.js
│   ├── sidepanel.html
│   ├── src
│   ├── utils
│   └── vendor
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── components.json
├── CONTRIBUTING.md
├── devtools.html
├── jsconfig.json
├── LICENSE
├── newtab.html
├── options.html
├── package.json
├── package-lock.json
├── popup.html
├── postcss.config.js
├── public
│   ├── icons
│   └── img
├── README.md
├── SECURITY.md
├── sidepanel.html
├── src
│   ├── assets
│   ├── background
│   ├── components
│   ├── contentScript
│   ├── devtools
│   ├── hooks
│   ├── lib
│   ├── manifest.js
│   ├── newtab
│   ├── options
│   ├── popup
│   ├── sidepanel
│   ├── styles
│   ├── test
│   ├── utils
│   └── zip.js
├── tailwind.config.js
├── tsconfig.json
├── utils
│   ├── getAccessToken.js
│   └── githubAuth.js
└── vite.config.js
```

### Naming Conventions

- **Files**: `camelCase.js`, `PascalCase.jsx` for components
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **CSS Classes**: `kebab-case` or Tailwind utility classes

## 🧪 Testing Guidelines

### Manual Testing Checklist

- [ ] Extension loads without errors
- [ ] GitHub authentication works
- [ ] LeetCode page integration functions
- [ ] Solution push workflow completes
- [ ] UI renders correctly on different screen sizes
- [ ] Error states display appropriate messages
- [ ] Performance is acceptable

### Testing Areas

1. **Authentication Flow**
   - GitHub OAuth login/logout
   - Token refresh handling
   - Permission scopes

2. **LeetCode Integration**
   - Problem detection
   - Solution parsing
   - Content script injection

3. **GitHub Operations**
   - Repository listing
   - File creation/updates
   - Commit message handling
   - Topic management

4. **User Interface**
   - Popup functionality
   - Options page
   - Side panel
   - Responsive design

### Future Testing Framework

We plan to implement:
- **Unit Tests**: Jest for utility functions
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright for full workflow testing
- **Visual Tests**: Chromatic for UI regression testing

## 🐛 Reporting Issues

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Check the FAQ** and troubleshooting guide
3. **Test with the latest version**
4. **Verify it's not a browser-specific issue**

### Issue Templates

#### Bug Report

```markdown
**Describe the Bug**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Windows 10, macOS Big Sur]
- Browser: [e.g., Chrome 91.0.4472.124]
- Extension Version: [e.g., 1.0.0]

**Additional Context**
Any other context about the problem.
```

#### Performance Issue

```markdown
**Performance Problem**
Describe the performance issue.

**Expected Performance**
What performance you expected.

**Current Performance**
Actual performance with metrics if available.

**Environment**
- Device specs
- Browser version
- Network conditions
```

## 💡 Feature Requests

### Before Requesting

1. **Check existing feature requests**
2. **Consider if it fits the project scope**
3. **Think about implementation complexity**
4. **Consider user impact and demand**

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Screenshots, mockups, or examples.

**Implementation ideas**
Any thoughts on how this could be implemented.
```

## 🌐 Community

### Getting Help

- **GitHub Discussions**: For questions and community chat
- **GitHub Issues**: For bug reports and feature requests
- **Wiki**: For detailed documentation and guides
- **Discord** (planned): Real-time community chat

### Recognition

We appreciate all contributors and will:

- Add contributors to our README
- Give credit in release notes
- Highlight significant contributions
- Provide recommendation letters for job applications

### Maintainer Responsibilities

Maintainers will:

- Respond to issues within 48 hours
- Review pull requests within 1 week
- Provide constructive feedback
- Help onboard new contributors
- Maintain project quality and vision

---

## 🚀 Ready to Contribute?

We're excited to have you join the LeetPush community! Here's how to get started:

1. **Star the repository** to show your support
2. **Fork the project** to your GitHub account
3. **Pick a good first issue** labeled `good-first-issue`
4. **Join our discussions** to introduce yourself
5. **Read through the codebase** to understand the architecture

### Good First Issues

Look for issues labeled:
- `good-first-issue`: Perfect for newcomers
- `help-wanted`: Areas where we need assistance
- `documentation`: Improve guides and docs
- `ui/ux`: Design and interface improvements

---

**Questions?** Don't hesitate to ask in our GitHub Discussions or open an issue. We're here to help!

**Thank you for contributing to LeetPush!** 🚀📚

