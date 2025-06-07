import { initializeReactDialog } from '../components/Dialog.jsx';

initializeReactDialog();


(function () {
    if (!window.location.hostname.includes('leetcode.com')) return;

    function getCSRFToken() {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
    }

    const token = getCSRFToken();
    console.log(token)
    if (token) {
        chrome.storage.local.set({ csrf_token: token }, () => {
            console.log('token stored');
        });
    } else {
        console.warn('token not found.');
    }
})();


function injectButtons() {
    const rows = document.querySelectorAll('a[href^="/problems/"][class*="group"]');

    rows.forEach(row => {
        const statusEl = row.querySelector('span.text-green-s');
        if (!statusEl) return;

        const alreadyAdded = row.querySelector('.lc-extra-btn');
        if (alreadyAdded) return;

        const btn = document.createElement('button');
        btn.textContent = 'commit';
        btn.className = 'lc-extra-btn';
        btn.style = `
            margin-left: 8px;
            background: #22c55e;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 12px;
            cursor: pointer;
        `;

        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const title = row.getAttribute('href') || 'LeetCode Submission';
            const submissionId = row.getAttribute('href').split('/').pop();
            console.log({submissionId})

            if (window.openLeetCodeDialog) {
                console.log({submissionId, title});
                window.openLeetCodeDialog(
                    submissionId,
                    title,
                    `You clicked on submission for:<br><br><strong>${title}</strong>`
                );
            }
        };

        statusEl.parentElement.appendChild(btn);
    });
}

// observing changes due to client-side routing
const observer = new MutationObserver(() => {
    injectButtons();
});

observer.observe(document.body, { childList: true, subtree: true });
injectButtons();