#  LeetPush – Seamless LeetCode to GitHub Integration

<div align="center">
  <img src="public/img/logo-128.png" alt="LeetPush Logo" width="128" height="128">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)]()
[![Version](https://img.shields.io/badge/Version-0.0.0-orange.svg)]()
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)](https://vitejs.dev/)

  <br />
  <strong>Push your LeetCode solutions to GitHub automatically—clean, fast, and customizable.</strong>

<br/><br/> <a href="#features">Features</a> • <a href="#installation">Installation</a> • <a href="#architecture">Architecture</a> • <a href="#contributing">Contributing</a> • <a href="#license">License</a>

</div>

---

## Features

* **One-Click Push**: Sync LeetCode submissions instantly to GitHub.
* **Language Auto-Detection**: Detects and handles multiple languages.
* **Smart File Naming**: Organizes problems by difficulty and tags.
* **Custom Directory Structure**: Configure how your GitHub repo is structured.
* **Automatic README Generation**: Keeps your GitHub README updated.
* **Custom Commit Messages**: Configure commit formats.
* **Multi-Repo Support**: Use different repositories if desired.
* **Modern UI**: Sleek and responsive interface with animations and dark mode.

---

## Installation

### Prerequisites

* Node.js ≥ 14.18.0
* Google Chrome (or any Chromium-based browser)
* GitHub Account

### Development Setup

```bash
# Clone the repository
git clone https://github.com/singhJasvinder101/leetpush.git
cd leetpush

# Install dependencies
npm install

# Start development server
npm run dev
```

### Load the Extension in Chrome

1. Go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the `dist/` directory

### Production Build

```bash
npm run build
npm run zip
```

This creates a production-ready build in the `dist/` folder and a zip file for Chrome submission.

---

## Architecture

### Tech Stack

* **Framework**: React 18 + Vite
* **Styling**: Tailwind CSS, Radix UI
* **Animations**: Framer Motion
* **Extension Build**: CRXJS + Vite
* **Languages**: TypeScript & JavaScript

### Directory Structure

```
src/
├── background/         # Service worker scripts
├── contentScript/      # Injects functionality into LeetCode pages
├── popup/              # Chrome popup UI
├── options/            # Settings/configuration UI
├── sidepanel/          # Chrome side panel UI
├── components/         # Shared UI components
├── hooks/              # Custom React hooks
└── utils/              # Utility/helper functions
```

### Notable Files

* `manifest.js` – Extension metadata and permissions
* `useLeetcode.jsx` – Handles LeetCode API
* `useGithub.jsx` – Handles GitHub API
* `SubmissionDialog.jsx` – Core submission logic interface

---

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before starting.

### Steps

1. Fork the repo
2. Create a feature branch:

   ```bash
   git checkout -b feature/my-feature
   ```
3. Make your changes and format code:

   ```bash
   npm run fmt
   ```
4. Commit and push:

   ```bash
   git commit -m 'feat: add my feature'
   git push origin feature/my-feature
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## Support

If you find this project helpful:

* ⭐ Star the repository
* 🐞 Report issues or bugs
* 💡 Suggest enhancements
* 📢 Share it with others


<div align="center">
  <p><strong>Made with ❤️ by developers, for developers</strong></p>
  <p><em>Happy Coding! 🚀</em></p>
</div>
