import { encodeToBase64 } from '@/utils/encode'

export const submitToGithub = async ({
  token,
  username,
  repo,
  filePath,
  content,
  commitMessage,
  sha,
}) => {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`
  const payload = {
    message: commitMessage,
    content: encodeToBase64(content),
    branch: 'main',
  }
  if (sha) payload.sha = sha
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Unknown GitHub error')
  }
  return response.json()
}

export const fetchGithubFileSha = async ({ token, username, repo, filePath }) => {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`
  try {
    const res = await fetch(url, {
      headers: { Authorization: `token ${token}` },
    })
    if (res.ok) {
      const meta = await res.json()
      return meta.sha
    }
  } catch (e) {}
  return undefined
}

export const updateRepoTopics = async ({ token, username, repo, topics }) => {
  console.log({ token, username, repo, topics })
  const url = `https://api.github.com/repos/${username}/${repo}/topics`

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.mercy-preview+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ names: topics }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update repo topics')
  }

  return response.json()
}
