#  LeetPush – Automate Your LeetCode to GitHub Workflow

<div align="center">
  <img src="public/img/logo-128.png" alt="LeetPush Logo" width="128" height="128">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)]()
[![Version](https://img.shields.io/badge/Version-0.0.0-orange.svg)]()
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)](https://vitejs.dev/)

  <br />
  <strong>Push your LeetCode solutions to GitHub automatically—clean, fast, and customizable.</strong>


</div>


# 

<p style="margin-top: 40px;" align="">
  <img src="https://github.com/user-attachments/assets/d251ec06-887b-4409-b676-0f85051fd8d2" alt="leetpush LeetCode to GitHub Demo">
  
  [Demo Video](http://www.youtube.com/watch?v=Bz5dn61Hgs0)
</p>



## Why Use leetpush?

Ever solved a brilliant LeetCode problem, only to lose the code or forget your logic? leetpush solves this by providing LeetCode-to-GitHub integration.

* **Build a Portfolio:** Automatically create a GitHub repository that showcases your coding skills and dedication to potential employers.
* **Track Your Progress:** Keep a detailed commit history of every problem you solve, making it easy to review your improvement over time.
* **Never Lose Your Work:** Your solutions are safely backed up in your own GitHub repository, accessible from anywhere.
* **Focus on Solving:** Forget the hassle of copy-pasting. We handle the backup, so you can focus on the problem.

## Features

*  **Automatic Sync:** Pushes your solution to GitHub the moment you successfully submit it on LeetCode.
*  **Problem Metadata:** Automatically includes the problem title, description, difficulty, and other details in the commit.
*  **Language Detection:** Correctly identifies the programming language and creates files with the proper extension (e.g., `.py`, `.js`, `.java`).
*  **Private & Public Repos:** You have full control over whether your solutions repository is public or private.
*  **Easy Setup:** Get up and running in under two minutes.



## Getting Started: 2-Minute Setup

1.  **Install the Extension:**
    * Get `leetpush` from the [**Chrome Web Store**](https://chromewebstore.google.com/detail/leetpush/fppdnbfkhpmppifbmmchnhpnmmickbin).

2.  **Configure `leetpush`:**
    * Click on the `leetpush` icon in your browser toolbar.
    * Follow the on-screen instructions to link your GitHub account and select a repository. If you don't have one, `leetpush` can help you create it.

That's it! You're ready to go.

## How It Works

Once configured, `leetpush` works silently in the background.

1.  Navigate to any problem on LeetCode and write your solution.
2.  Click the "Submit" button on LeetCode.
3.  Once your solution is accepted, `leetpush` automatically commits and pushes the code and problem details to your designated GitHub repository.

## Installation

### Prerequisites

* Node.js ≥ 14.18.0
* Google Chrome (or any Chromium-based browser)
* GitHub Account

### Development Setup

```bash
git clone https://github.com/singhJasvinder101/leetpush.git
cd leetpush

npm install

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



## Architecture

### Tech Stack

* **Framework**: React 18 + Vite
* **Styling**: Tailwind CSS, Radix UI
* **Animations**: Framer Motion
* **Extension Build**: CRXJS + Vite
* **Languages**: TypeScript & JavaScript

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before starting.

### Steps

1. Fork the repo
2. Create a feature branch:

   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit and push:

   ```bash
   git commit -m 'feat: add my feature'
   git push origin feature/my-feature
   ```
4. Open a Pull Request


## 📄 License

This project is licensed under the [MIT License](LICENSE).


## Support

If you find this project helpful:

* ⭐ Star the repository
* 🐞 Report issues or bugs
* 💡 Suggest enhancements
* 📢 Share it with others


<div align="center">
  <p><strong>Made with ❤️</strong></p>
  <p><em>Happy Coding! 🚀</em></p>
</div>
