import "../styles/dialog.css"

import { initializeReactDialog } from "../components/Dialog.jsx"

initializeReactDialog();
(() => {
    if (!window.location.hostname.includes("leetcode.com")) return

    function getCSRFToken() {
        return document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="))
            ?.split("=")[1]
    }

    const token = getCSRFToken()
    console.log(token)
    if (token) {
        chrome.storage.local.set({ csrf_token: token }, () => {
            console.log("token stored")
        })
    } else {
        console.warn("token not found.")
    }
})()

function injectButtons() {
    const rows = document.querySelectorAll('a[href^="/problems/"][class*="group"]')

    rows.forEach((row) => {
        const statusEl = row.querySelector("span.text-green-s")
        if (!statusEl) return

        const alreadyAdded = row.querySelector(".lc-extra-btn")
        if (alreadyAdded) return

        const btn = document.createElement("button")
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Push</span>
        `
        btn.className = "lc-extra-btn"
        btn.style = `
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-left: 12px;
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 6px 12px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
            position: relative;
            overflow: hidden;
        `

        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "translateY(-1px)"
            btn.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)"
            btn.style.background = "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
        })

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translateY(0)"
            btn.style.boxShadow = "0 2px 4px rgba(34, 197, 94, 0.2)"
            btn.style.background = "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
        })

        btn.onclick = (e) => {
            e.preventDefault()
            e.stopPropagation()

            // Add click animation
            btn.style.transform = "scale(0.95)"
            setTimeout(() => {
                btn.style.transform = "scale(1)"
            }, 150)

            const title = row.getAttribute("href") || "LeetCode Submission"
            const submissionId = row.getAttribute("href").split("/").pop()
            console.log({ submissionId })

            if (window.openLeetCodeDialog) {
                console.log({ submissionId, title })
                window.openLeetCodeDialog(
                    submissionId,
                    title,
                    `You clicked on submission for:<br><br><strong>${title}</strong>`,
                )
            }
        }

        statusEl.parentElement.appendChild(btn)
    })
}

function addFloatingActionButton() {
    const existingFab = document.querySelector(".lc-fab")
    if (existingFab) return

    const fab = document.createElement("button")
    fab.className = "lc-fab"
    fab.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 16l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `
    fab.style = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `

    fab.addEventListener("mouseenter", () => {
        fab.style.transform = "scale(1.1)"
        fab.style.boxShadow = "0 12px 40px rgba(59, 130, 246, 0.4)"
    })

    fab.addEventListener("mouseleave", () => {
        fab.style.transform = "scale(1)"
        fab.style.boxShadow = "0 8px 32px rgba(59, 130, 246, 0.3)"
    })

    fab.onclick = () => {
        if (window.openLeetCodePushAllDialog) {
            window.openLeetCodePushAllDialog()
        }
    }

    document.body.appendChild(fab)
}

// observing changes due to client-side routing
const observer = new MutationObserver(() => {
    injectButtons()
    addFloatingActionButton()
})

observer.observe(document.body, { childList: true, subtree: true })
injectButtons()
addFloatingActionButton()
