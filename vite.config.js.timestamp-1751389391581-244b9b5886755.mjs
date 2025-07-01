// vite.config.js
import { defineConfig } from "file:///home/jasvinder-singh/Documents/leetpush/node_modules/vite/dist/node/index.js";
import { crx } from "file:///home/jasvinder-singh/Documents/leetpush/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import react from "file:///home/jasvinder-singh/Documents/leetpush/node_modules/@vitejs/plugin-react/dist/index.mjs";

// src/manifest.js
import { defineManifest } from "file:///home/jasvinder-singh/Documents/leetpush/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "leetpush",
  displayName: "LeetPush",
  version: "1.0.0",
  author: "LeetPush Contributors",
  description: "Seamlessly push your LeetCode solutions to GitHub with one click! Automate your coding journey with beautiful UI and powerful features.",
  type: "module",
  license: "MIT",
  keywords: [
    "chrome-extension",
    "leetcode",
    "github",
    "automation",
    "coding",
    "algorithms",
    "data-structures",
    "programming",
    "react",
    "vite",
    "javascript",
    "typescript",
    "developer-tools",
    "productivity",
    "open-source"
  ],
  engines: {
    node: ">=14.18.0"
  },
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview",
    fmt: "prettier --write '**/*.{jsx,js,json,css,scss,md}'",
    zip: "npm run build && node src/zip.js"
  },
  dependencies: {
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@tailwindcss/forms": "^0.5.10",
    "@tailwindcss/typography": "^0.5.16",
    "@tailwindcss/vite": "^4.1.8",
    "class-variance-authority": "^0.7.1",
    clsx: "^2.1.1",
    "framer-motion": "^12.16.0",
    "lucide-react": "^0.513.0",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.3.0",
    "tailwindcss-animate": "^1.0.7"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.26",
    "@types/chrome": "^0.0.326",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react": "^4.1.0",
    autoprefixer: "^10.4.21",
    "css-loader": "^7.1.2",
    glob: "^10.3.10",
    gulp: "^5.0.0",
    "gulp-zip": "^6.0.0",
    postcss: "^8.5.4",
    "postcss-loader": "^8.1.1",
    prettier: "^3.0.3",
    "style-loader": "^4.0.0",
    tailwindcss: "^3.4.17",
    "ts-loader": "^9.5.2",
    typescript: "^5.8.3",
    vite: "^5.4.10",
    "vite-plugin-string": "^1.2.3",
    webpack: "^5.99.9",
    "webpack-cli": "^6.0.1"
  }
};

// src/manifest.js
var isDev = process.env.NODE_ENV == "development";
var manifest_default = defineManifest({
  name: `${package_default.displayName || package_default.name}${isDev ? ` \u27A1\uFE0F Dev` : ""}`,
  description: package_default.description,
  version: package_default.version,
  manifest_version: 3,
  icons: {
    16: "img/logo-16.png",
    32: "img/logo-32.png",
    48: "img/logo-48.png",
    128: "img/logo-128.png"
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/logo-48.png"
  },
  options_page: "options.html",
  devtools_page: "devtools.html",
  background: {
    service_worker: "src/background/index.js",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/contentScript/index.js"]
    }
  ],
  side_panel: {
    default_path: "sidepanel.html"
  },
  web_accessible_resources: [
    {
      resources: ["img/logo-16.png", "img/logo-32.png", "img/logo-48.png", "img/logo-128.png"],
      matches: []
    }
  ],
  permissions: ["identity", "storage", "sidePanel"],
  // chrome_url_overrides: {
  //   newtab: 'newtab.html',
  // },
  oauth2: {
    client_id: "Ov23li82naiOl6jKbwE7",
    scopes: ["repo", "read:user"]
  }
});

// vite.config.js
import path from "path";
var __vite_injected_original_dirname = "/home/jasvinder-singh/Documents/leetpush";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js"
        }
      }
    },
    plugins: [crx({ manifest: manifest_default }), react()],
    legacy: {
      skipWebSocketTokenCheck: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL21hbmlmZXN0LmpzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2phc3ZpbmRlci1zaW5naC9Eb2N1bWVudHMvbGVldHB1c2hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2phc3ZpbmRlci1zaW5naC9Eb2N1bWVudHMvbGVldHB1c2gvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvamFzdmluZGVyLXNpbmdoL0RvY3VtZW50cy9sZWV0cHVzaC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9zcmMvbWFuaWZlc3QuanMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICB9XG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2NodW5rLVtoYXNoXS5qcycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBwbHVnaW5zOiBbY3J4KHsgbWFuaWZlc3QgfSksIHJlYWN0KCldLFxuICAgIGxlZ2FjeToge1xuICAgICAgc2tpcFdlYlNvY2tldFRva2VuQ2hlY2s6IHRydWUsXG4gICAgfSxcbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvamFzdmluZGVyLXNpbmdoL0RvY3VtZW50cy9sZWV0cHVzaC9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2phc3ZpbmRlci1zaW5naC9Eb2N1bWVudHMvbGVldHB1c2gvc3JjL21hbmlmZXN0LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2phc3ZpbmRlci1zaW5naC9Eb2N1bWVudHMvbGVldHB1c2gvc3JjL21hbmlmZXN0LmpzXCI7aW1wb3J0IHsgZGVmaW5lTWFuaWZlc3QgfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgcGFja2FnZURhdGEgZnJvbSAnLi4vcGFja2FnZS5qc29uJyB3aXRoIHsgdHlwZTogJ2pzb24nIH1cblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PSAnZGV2ZWxvcG1lbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1hbmlmZXN0KHtcbiAgbmFtZTogYCR7cGFja2FnZURhdGEuZGlzcGxheU5hbWUgfHwgcGFja2FnZURhdGEubmFtZX0ke2lzRGV2ID8gYCBcdTI3QTFcdUZFMEYgRGV2YCA6ICcnfWAsXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlRGF0YS5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbjogcGFja2FnZURhdGEudmVyc2lvbixcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgaWNvbnM6IHtcbiAgICAxNjogJ2ltZy9sb2dvLTE2LnBuZycsXG4gICAgMzI6ICdpbWcvbG9nby0zMi5wbmcnLFxuICAgIDQ4OiAnaW1nL2xvZ28tNDgucG5nJyxcbiAgICAxMjg6ICdpbWcvbG9nby0xMjgucG5nJyxcbiAgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogJ3BvcHVwLmh0bWwnLFxuICAgIGRlZmF1bHRfaWNvbjogJ2ltZy9sb2dvLTQ4LnBuZycsXG4gIH0sXG4gIG9wdGlvbnNfcGFnZTogJ29wdGlvbnMuaHRtbCcsXG4gIGRldnRvb2xzX3BhZ2U6ICdkZXZ0b29scy5odG1sJyxcbiAgYmFja2dyb3VuZDoge1xuICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXguanMnLFxuICAgIHR5cGU6ICdtb2R1bGUnLFxuICB9LFxuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbJ2h0dHA6Ly8qLyonLCAnaHR0cHM6Ly8qLyonXSxcbiAgICAgIGpzOiBbJ3NyYy9jb250ZW50U2NyaXB0L2luZGV4LmpzJ10sXG4gICAgfSxcbiAgXSxcbiAgc2lkZV9wYW5lbDoge1xuICAgIGRlZmF1bHRfcGF0aDogJ3NpZGVwYW5lbC5odG1sJyxcbiAgfSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbJ2ltZy9sb2dvLTE2LnBuZycsICdpbWcvbG9nby0zMi5wbmcnLCAnaW1nL2xvZ28tNDgucG5nJywgJ2ltZy9sb2dvLTEyOC5wbmcnXSxcbiAgICAgIG1hdGNoZXM6IFtdLFxuICAgIH0sXG4gIF0sXG5cbiAgcGVybWlzc2lvbnM6IFsnaWRlbnRpdHknLCAnc3RvcmFnZScsICdzaWRlUGFuZWwnXSxcblxuICAvLyBjaHJvbWVfdXJsX292ZXJyaWRlczoge1xuICAvLyAgIG5ld3RhYjogJ25ld3RhYi5odG1sJyxcbiAgLy8gfSxcblxuICBvYXV0aDI6IHtcbiAgICBjbGllbnRfaWQ6ICdPdjIzbGk4Mm5haU9sNmpLYndFNycsXG4gICAgc2NvcGVzOiBbJ3JlcG8nLCAncmVhZDp1c2VyJ10sXG4gIH0sXG59KVxuXG4vLyBleHRlcm5hbGx5X2Nvbm5lY3RhYmxlOiB7XG4vLyAgIG1hdGNoZXM6IFsnaHR0cHM6Ly8qLmNocm9taXVtYXBwLm9yZy8qJ10sXG4vLyB9LFxuIiwgIntcbiAgXCJuYW1lXCI6IFwibGVldHB1c2hcIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIkxlZXRQdXNoXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gIFwiYXV0aG9yXCI6IFwiTGVldFB1c2ggQ29udHJpYnV0b3JzXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJTZWFtbGVzc2x5IHB1c2ggeW91ciBMZWV0Q29kZSBzb2x1dGlvbnMgdG8gR2l0SHViIHdpdGggb25lIGNsaWNrISBBdXRvbWF0ZSB5b3VyIGNvZGluZyBqb3VybmV5IHdpdGggYmVhdXRpZnVsIFVJIGFuZCBwb3dlcmZ1bCBmZWF0dXJlcy5cIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImNocm9tZS1leHRlbnNpb25cIixcbiAgICBcImxlZXRjb2RlXCIsXG4gICAgXCJnaXRodWJcIixcbiAgICBcImF1dG9tYXRpb25cIixcbiAgICBcImNvZGluZ1wiLFxuICAgIFwiYWxnb3JpdGhtc1wiLFxuICAgIFwiZGF0YS1zdHJ1Y3R1cmVzXCIsXG4gICAgXCJwcm9ncmFtbWluZ1wiLFxuICAgIFwicmVhY3RcIixcbiAgICBcInZpdGVcIixcbiAgICBcImphdmFzY3JpcHRcIixcbiAgICBcInR5cGVzY3JpcHRcIixcbiAgICBcImRldmVsb3Blci10b29sc1wiLFxuICAgIFwicHJvZHVjdGl2aXR5XCIsXG4gICAgXCJvcGVuLXNvdXJjZVwiXG4gIF0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0xNC4xOC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwiZm10XCI6IFwicHJldHRpZXIgLS13cml0ZSAnKiovKi57anN4LGpzLGpzb24sY3NzLHNjc3MsbWR9J1wiLFxuICAgIFwiemlwXCI6IFwibnBtIHJ1biBidWlsZCAmJiBub2RlIHNyYy96aXAuanNcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtYWxlcnQtZGlhbG9nXCI6IFwiXjEuMS4xNFwiLFxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LWNoZWNrYm94XCI6IFwiXjEuMy4yXCIsXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtZGlhbG9nXCI6IFwiXjEuMS4xNFwiLFxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LWxhYmVsXCI6IFwiXjIuMS43XCIsXG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2Nyb2xsLWFyZWFcIjogXCJeMS4yLjlcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zZWxlY3RcIjogXCJeMi4yLjVcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zZXBhcmF0b3JcIjogXCJeMS4xLjdcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI6IFwiXjEuMi4zXCIsXG4gICAgXCJAdGFpbHdpbmRjc3MvZm9ybXNcIjogXCJeMC41LjEwXCIsXG4gICAgXCJAdGFpbHdpbmRjc3MvdHlwb2dyYXBoeVwiOiBcIl4wLjUuMTZcIixcbiAgICBcIkB0YWlsd2luZGNzcy92aXRlXCI6IFwiXjQuMS44XCIsXG4gICAgXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjogXCJeMC43LjFcIixcbiAgICBcImNsc3hcIjogXCJeMi4xLjFcIixcbiAgICBcImZyYW1lci1tb3Rpb25cIjogXCJeMTIuMTYuMFwiLFxuICAgIFwibHVjaWRlLXJlYWN0XCI6IFwiXjAuNTEzLjBcIixcbiAgICBcInJlYWN0XCI6IFwiXjE4LjMuMVwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjMuMVwiLFxuICAgIFwidGFpbHdpbmQtbWVyZ2VcIjogXCJeMy4zLjBcIixcbiAgICBcInRhaWx3aW5kY3NzLWFuaW1hdGVcIjogXCJeMS4wLjdcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMi4wLjAtYmV0YS4yNlwiLFxuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMzI2XCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMy4yM1wiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4zLjdcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMS4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4yMVwiLFxuICAgIFwiY3NzLWxvYWRlclwiOiBcIl43LjEuMlwiLFxuICAgIFwiZ2xvYlwiOiBcIl4xMC4zLjEwXCIsXG4gICAgXCJndWxwXCI6IFwiXjUuMC4wXCIsXG4gICAgXCJndWxwLXppcFwiOiBcIl42LjAuMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjUuNFwiLFxuICAgIFwicG9zdGNzcy1sb2FkZXJcIjogXCJeOC4xLjFcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMC4zXCIsXG4gICAgXCJzdHlsZS1sb2FkZXJcIjogXCJeNC4wLjBcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4xN1wiLFxuICAgIFwidHMtbG9hZGVyXCI6IFwiXjkuNS4yXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuOC4zXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4xMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tc3RyaW5nXCI6IFwiXjEuMi4zXCIsXG4gICAgXCJ3ZWJwYWNrXCI6IFwiXjUuOTkuOVwiLFxuICAgIFwid2VicGFj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
