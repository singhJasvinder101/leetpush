export function getGithubAccessToken() {
  return chrome.storage.local.get(['github_token']).then((result) => {
    if (chrome.runtime.lastError) {
      return new Error('Failed to retrieve access token')
    }
    const token = result.github_token
    if (!token) {
      return new Error('No access token found')
    }
    return token
  })
}

export function getGithubUsername() {
  return chrome.storage.local.get(['github_username']).then((result) => {
    if (chrome.runtime.lastError) {
      return new Error('Failed to retrieve GitHub username')
    }
    const username = result.github_username
    if (!username) {
      return new Error('No GitHub username found')
    }
    return username
  })
}

export function getLeetcodeCSRFToken() {
  return chrome.storage.local.get(['csrf_token']).then((result) => {
    if (chrome.runtime.lastError) {
      return new Error('Failed to retrieve access token')
    }
    const token = result.csrf_token
    if (!token) {
      return new Error('No access token found')
    }
    return token
  })
}
