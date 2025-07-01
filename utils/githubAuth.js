const CLIENT_ID = 'Ov23li82naiOl6jKbwE7'
const CLIENT_SECRET = '06bc4260392816db9be237fa09d4ca6a6a3a20eb'
const REDIRECT_URI = chrome.identity.getRedirectURL()
const SCOPES = ['repo', 'read:user'].join(' ')
const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`

export async function loginWithGitHub() {
  return new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      {
        url: AUTH_URL,
        interactive: true,
      },
      async (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          return reject(new Error('Authorization failed.'))
        }

        const url = new URL(redirectUrl)
        const code = url.searchParams.get('code')
        if (!code) return reject(new Error('No code returned'))

        try {
          const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              code,
              redirect_uri: REDIRECT_URI,
            }),
          })
          console.log(tokenResponse)

          const tokenData = await tokenResponse.json()
          console.log({ tokenData })

          if (!tokenData.access_token) {
            return reject(new Error('Failed to get access token'))
          }

          const userResponse = await fetch('https://api.github.com/user', {
            headers: {
              Authorization: `token ${tokenData.access_token}`,
              Accept: 'application/vnd.github.v3+json',
            },
          })

          const userData = await userResponse.json()

          chrome.storage.local.set(
            {
              github_token: tokenData.access_token,
              github_username: userData.login,
              github_user_data: userData,
            },
            () => {
              resolve({
                token: tokenData.access_token,
                username: userData.login,
              })
            },
          )
        } catch (err) {
          reject(new Error('Token exchange failed: ' + err.message))
        }
      },
    )
  })
}
