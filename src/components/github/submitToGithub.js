export const submitToGithub = async ({
    token,
    username,
    repo,
    filePath,
    content,
    commitMessage,
    sha
}) => {
    const url = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;
    const payload = {
        message: commitMessage,
        content: btoa(content),
        branch: 'main'
    };
    if (sha) payload.sha = sha;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown GitHub error');
    }
    return response.json();
};


export const fetchGithubFileSha = async ({ token, username, repo, filePath }) => {
    const url = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;
    try {
        const res = await fetch(url, {
            headers: { Authorization: `token ${token}` }
        });
        if (res.ok) {
            const meta = await res.json();
            return meta.sha;
        }
    } catch (e) {}
    return undefined;
};
