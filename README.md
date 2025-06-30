# 🚀 LeetPush - Seamless LeetCode to GitHub Integration

<div align="center">
  <img src="public/img/logo-128.png" alt="LeetPush Logo" width="128" height="128">
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue.svg)]()
  [![Version](https://img.shields.io/badge/Version-0.0.0-orange.svg)]()
  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)]()
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)](https://vitejs.dev/)

  **Automate your LeetCode journey by seamlessly pushing solutions to GitHub with one click!**
  
  [Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing) • [Support](#-support)
</div>

---

## Features

### **One-Click Solution Sync**
- **Instant Push**
- **Smart File Naming**
- **Language Detection**

### **Repository Management**
- **Multi-Repository Support**
- **Custom Directory Structure**
- **Automatic README Generation**

### **Advanced Configuration**
- **Custom Commit Messages**
- **Repository Topics**

### **Beautiful User Experience**
- **Modern UI**
- **Smooth Animations**:
- **Dark Mode Ready**
- **Responsive Design**

### **Community Features**
- **Leaderboard**
- **GitHub Integration**
- **Real-time Updates**

---

## Installation

### Prerequisites
- Node.js (≥14.18.0)
- Google Chrome or Chromium-based browser
- GitHub account

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/singhJasvinder101/leetpush.git
   cd leetpush
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Load extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

### Production Build

```bash
npm run build
npm run zip
```

This creates a production-ready extension in the `dist` folder and a distributable zip file.

---


## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18.3.1 + Vite
- **Styling**: Tailwind CSS + Radix UI
- **Animations**: Framer Motion
- **Build Tool**: Vite + CRXJS
- **Language**: JavaScript/TypeScript

### Extension Components

```
src/
├── background/          # Service worker
├── contentScript/       # LeetCode page injection
├── popup/              # Extension popup
├── options/            # Settings page
├── sidepanel/          # Chrome side panel
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
└── utils/              # Helper functions
```

### Key Files
- `manifest.js` - Extension configuration
- `contentScript/index.js` - LeetCode page integration
- `components/SubmissionDialog.jsx` - Main push interface
- `hooks/useLeetcode.jsx` - LeetCode API integration
- `hooks/useGithub.jsx` - GitHub API integration

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run fmt
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---



<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=singhJasvinder101&repo=leetpush&show_icons=true&theme=radical" alt="LeetPush Stats" width="400">
</div>

---


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Support the Project

If LeetPush has helped you in your coding journey, consider:

- ⭐ Starring this repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 🤝 Contributing to the codebase
- 📢 Sharing with fellow developers

---

<div align="center">
  <p><strong>Made with ❤️ by developers, for developers</strong></p>
  <p><em>Happy Coding! 🚀</em></p>
</div>

