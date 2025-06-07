import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import useGithub from '../hooks/useGithub';
import useLeetcode from '../hooks/useLeetcode';
import { getGithubAccessToken, getGithubUsername } from '../../utils/getAccessToken';
import { QUESTION_DETAILS_QUERY, SUBMISSION_DETAILS_QUERY } from '../utils/LEETCODE_QUERIES';
import { submitToGithub, fetchGithubFileSha } from './github/submitToGithub';


const SubmissionDialog = ({ id, isOpen, onClose, title, content }) => {
    const [username, setUsername] = useState('');
    const [selectedRepo, setSelectedRepo] = useState('');
    const [directory, setDirectory] = useState('leetcode');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [commitMessage, setCommitMessage] = useState('');
    const [pushReadme, setPushReadme] = useState(false);


    useEffect(() => {
        const fetchLocalStorageData = async () => {
            const github_username = await getGithubUsername();
            setUsername(github_username);
        }
        fetchLocalStorageData();
    }, []);

    const { data: reposData } = useGithub(`users/${username}/repos?sort=created&direction=desc`);

    const submissionPayload = SUBMISSION_DETAILS_QUERY(id);
    const { data: leetcodeData } = useLeetcode(submissionPayload);
    console.log({ leetcodeData });

    const titleSlug = leetcodeData?.submissionDetails?.question?.titleSlug

    const questionPayload = useMemo(() => {
        return titleSlug ? QUESTION_DETAILS_QUERY(titleSlug) : null;
    }, [titleSlug]);

    const { data: questionData } = useLeetcode(questionPayload);
    console.log({ questionData })

    const handleSubmit = async () => {
        if (!selectedRepo || !username) {
            alert('Please select a repository');
            return;
        }
        setIsSubmitting(true);
        try {
            const token = await getGithubAccessToken();
            const codeContent = leetcodeData?.submissionDetails?.code || '';
            const lang = leetcodeData?.submissionDetails?.lang?.name?.toLowerCase() || 'txt';
            const problemTitle = questionData?.question?.title || title || `problem-${id}`;
            const safeTitle = problemTitle.replace(/[\\/:"*?<>|]+/g, '_').replace(/\s+/g, '_');
            const fileName = `${safeTitle}.${lang}`;
            const safeDirectory = directory.replace(/\/+$/, '');
            const filePath = safeDirectory ? `${safeDirectory}/${fileName}` : fileName;
            const commitMsg = commitMessage || `Add LeetCode solution: ${problemTitle}`;

            const sha = await fetchGithubFileSha({
                token,
                username,
                repo: selectedRepo,
                filePath
            });

            await submitToGithub({
                token,
                username,
                repo: selectedRepo,
                filePath,
                content: codeContent,
                commitMessage: commitMsg,
                sha
            });

            if (pushReadme && questionData?.question?.content) {
                const readmePath = safeDirectory ? `${safeDirectory}/README.md` : 'README.md';
                const readmeSha = await fetchGithubFileSha({
                    token,
                    username,
                    repo: selectedRepo,
                    filePath: readmePath
                });
                const readmeContent = `# ${problemTitle} (${questionData.question.difficulty})\n\n---\n\n${questionData.question.content}\n`;
                await submitToGithub({
                    token,
                    username,
                    repo: selectedRepo,
                    filePath: readmePath,
                    content: readmeContent,
                    commitMessage: `Add README for ${problemTitle}`,
                    sha: readmeSha
                });
            }

            alert('Code submitted successfully!');
            onClose();
        } catch (err) {
            console.error('Submit error:', err);
            alert(`Submission failed: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                background: 'white',
                border: '2px solid #22c55e',
                borderRadius: '10px',
                padding: '20px',
                color: 'black',
                boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '80vh',
                overflow: 'auto'
            }}>
                <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>
                    Push to GitHub - {id}
                </div>

                {questionData?.question && (
                    <div style={{
                        marginBottom: '15px',
                        padding: '10px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '5px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                            {questionData.question.title} ({questionData.question.difficulty})
                        </div>
                        <div
                            style={{
                                fontSize: '14px',
                                lineHeight: '1.6',
                                color: '#333'
                            }}
                            dangerouslySetInnerHTML={{ __html: questionData.question.content }}
                        />
                    </div>
                )}

                <div style={{
                    marginBottom: '15px',
                    maxHeight: '200px',
                    overflow: 'auto',
                    border: '1px solid #e5e5e5',
                    borderRadius: '5px',
                    padding: '10px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                        Code Preview:
                    </div>
                    <pre
                        style={{
                            fontSize: '13px',
                            fontFamily: 'monospace',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            color: '#111827'
                        }}
                    >
                        <code>
                            {leetcodeData?.submissionDetails?.code}
                        </code>
                    </pre>

                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Select Repository:
                    </label>
                    <select
                        value={selectedRepo}
                        onChange={(e) => setSelectedRepo(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    >
                        <option value="">Choose a repository...</option>
                        {reposData?.map((repo) => (
                            <option key={repo.id} value={repo.name}>
                                {repo.name} {repo.private ? '(Private)' : '(Public)'}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Directory (optional):
                    </label>
                    <input
                        type="text"
                        value={directory}
                        onChange={(e) => setDirectory(e.target.value)}
                        placeholder="e.g., leetcode, algorithms, solutions"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                        Leave empty to save in root directory
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Commit Message:
                    </label>
                    <input
                        type="text"
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                        placeholder="e.g., leetcode, algorithms, solutions"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                        Leave empty to save in root directory
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', fontSize: '14px', gap: '6px' }}>
                        <input
                            type="checkbox"
                            checked={pushReadme}
                            onChange={e => setPushReadme(e.target.checked)}
                            style={{ marginRight: '6px' }}
                        />
                        <span>Also push <b>README.md</b> with question details</span>
                    </label>
                    <button
                        onClick={onClose}
                        style={{
                            background: '#6b7280',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedRepo || isSubmitting}
                        style={{
                            background: !selectedRepo || isSubmitting ? '#9ca3af' : '#22c55e',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: !selectedRepo || isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Push to GitHub'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const PushAllDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                background: 'white',
                border: '2px solid #22c55e',
                borderRadius: '10px',
                padding: '32px',
                color: 'black',
                boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                maxWidth: '400px',
                width: '90%',
                textAlign: 'center'
            }}>
                <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '18px' }}>
                    Are you sure you want to push all your LeetCode codes to GitHub?
                </div>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
                    <button
                        onClick={onClose}
                        style={{ background: '#ef4444', color: 'white', padding: '8px 24px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{ background: '#22c55e', color: 'white', padding: '8px 24px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

const DialogApp = () => {
    const [dialog, setDialog] = useState(null);
    const [pushAllOpen, setPushAllOpen] = useState(false);

    const openDialog = (id, title, content) => {
        if (dialog && dialog.id === id) {
            setDialog(null);
        } else {
            setDialog({ id, title, content });
        }
    };
    const closeDialog = () => setDialog(null);

    // Push All dialog logic
    const openPushAllDialog = () => setPushAllOpen(true);
    const closePushAllDialog = () => setPushAllOpen(false);
    const handlePushAllConfirm = async () => {
        setPushAllOpen(false);
        // Find all commit buttons and trigger them one by one
        const commitBtns = document.querySelectorAll('.lc-extra-btn');
        for (const commitBtn of commitBtns) {
            commitBtn.click();
            await new Promise(res => setTimeout(res, 2000));
            // Try to find and click the submit button in the dialog
            const dialogBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Push to GitHub'));
            if (dialogBtn) dialogBtn.click();
            await new Promise(res => setTimeout(res, 2500));
        }
    };

    useEffect(() => {
        window.openLeetCodeDialog = openDialog;
        window.openLeetCodePushAllDialog = openPushAllDialog;
        return () => {
            delete window.openLeetCodeDialog;
            delete window.openLeetCodePushAllDialog;
        };
    }, [dialog]);

    return (
        <>
            {dialog && (
                <SubmissionDialog
                    isOpen={true}
                    title={dialog.title}
                    content={dialog.content}
                    onClose={closeDialog}
                    id={dialog.id}
                />
            )}
            <PushAllDialog isOpen={pushAllOpen} onClose={closePushAllDialog} onConfirm={handlePushAllConfirm} />
        </>
    );
};

export function initializeReactDialog() {
    let container = document.getElementById('leetcode-extension-react-root');
    if (!container) {
        container = document.createElement('div');
        container.id = 'leetcode-extension-react-root';
        document.body.appendChild(container);
    }

    const root = createRoot(container);
    root.render(<DialogApp />);
}

export default DialogApp;