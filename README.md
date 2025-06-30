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

## ✨ Features

### 🎯 **One-Click Solution Sync**
- **Instant Push**: Push your accepted LeetCode solutions to GitHub with a single click
- **Smart File Naming**: Automatically generates clean filenames based on problem titles
- **Language Detection**: Supports all LeetCode programming languages with proper file extensions

### 📂 **Repository Management**
- **Multi-Repository Support**: Choose from all your GitHub repositories
- **Custom Directory Structure**: Organize solutions in custom folders (e.g., `leetcode/`, `algorithms/`)
- **Automatic README Generation**: Optional README.md creation with problem descriptions and notes

### 🔧 **Advanced Configuration**
- **Custom Commit Messages**: Personalize your commit messages or use smart defaults
- **Batch Operations**: Push multiple solutions at once with the floating action button
- **Repository Topics**: Automatically tags repositories with relevant topics (`leetcode`, `dsa`, `algorithms`)

### 🎨 **Beautiful User Experience**
- **Modern UI**: Sleek interface built with React and Tailwind CSS
- **Smooth Animations**: Framer Motion powered interactions
- **Dark Mode Ready**: Adapts to your system preferences
- **Responsive Design**: Works perfectly on all screen sizes

### 📊 **Community Features**
- **Leaderboard**: See top contributors in the LeetPush community
- **GitHub Integration**: Seamless OAuth authentication
- **Real-time Updates**: Live sync with your GitHub repositories

---

## 🔧 Installation

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

## 🎮 Usage

### First Time Setup

1. **Install the Extension**
   - Install from Chrome Web Store (coming soon) or load unpacked for development

2. **Connect GitHub**
   - Click the LeetPush icon in your browser toolbar
   - Click "Connect GitHub" and authorize the application
   - Grant necessary permissions for repository access

3. **Configure Settings**
   - Set your preferred directory structure
   - Choose default commit message format
   - Enable/disable README generation

### Pushing Solutions

#### Method 1: Individual Push Buttons
1. Navigate to your LeetCode problems list
2. Look for the green "Push" button next to accepted solutions
3. Click the button to open the submission dialog
4. Configure repository, directory, and commit message
5. Click "Submit to GitHub"

#### Method 2: Batch Push (Floating Action Button)
1. On any LeetCode page, click the blue floating action button
2. Select multiple solutions to push
3. Configure batch settings
4. Push all selected solutions at once

### Customization Options

#### Directory Structure
```
├── leetcode/
│   ├── easy/
│   ├── medium/
│   ├── hard/
│   └── README.md
```

#### File Naming Convention
- `Two_Sum.py` (for Python)
- `Valid_Parentheses.js` (for JavaScript)
- `Merge_Two_Sorted_Lists.cpp` (for C++)

#### Commit Message Templates
- `Added LeetCode solution: [Problem Name]`
- `Solved: [Problem Name] - [Difficulty]`
- Custom format: `feat: solve [Problem Name] in [Language]`

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

## 📋 Roadmap

### Version 1.0.0
- [ ] Chrome Web Store publication
- [ ] Enhanced error handling
- [ ] Comprehensive testing suite
- [ ] User onboarding flow

### Version 1.1.0
- [ ] Firefox extension support
- [ ] Custom repository templates
- [ ] Solution statistics dashboard
- [ ] Export/import settings

### Version 1.2.0
- [ ] Multi-platform support (HackerRank, CodeForces)
- [ ] Team collaboration features
- [ ] Advanced filtering and search
- [ ] Performance optimizations

---

## 🐛 Troubleshooting

### Common Issues

**GitHub Authentication Failed**
- Ensure you have the latest version of Chrome
- Check if third-party cookies are enabled
- Try clearing extension data and re-authenticating

**Solutions Not Appearing**
- Refresh the LeetCode page
- Ensure you're logged into LeetCode
- Check if the solution is marked as "Accepted"

**Push Failed**
- Verify repository permissions
- Check GitHub API rate limits
- Ensure repository exists and is accessible

### Getting Help
- 📖 Check our [FAQ](https://github.com/singhJasvinder101/leetpush/wiki/FAQ)
- 🐛 [Report bugs](https://github.com/singhJasvinder101/leetpush/issues)
- 💬 [Join discussions](https://github.com/singhJasvinder101/leetpush/discussions)

---

## 📊 Statistics

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=singhJasvinder101&repo=leetpush&show_icons=true&theme=radical" alt="LeetPush Stats" width="400">
</div>

---

## 🙏 Acknowledgments

- **LeetCode**: For providing an excellent platform for coding practice
- **GitHub**: For robust API and seamless integration
- **Chrome Extensions Team**: For comprehensive extension APIs
- **Open Source Community**: For incredible tools and libraries

### Special Thanks
- [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext) - Extension boilerplate
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Beautiful animations

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

