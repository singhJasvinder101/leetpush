function getCSRFToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1]
}

const CSRF_TOKEN = getCSRFToken()

async function getSubmissionCodeOnly(submissionId) {
  const query = {
    query: `
            query questionData($titleSlug: String!) {
                question(titleSlug: $titleSlug) {
                    questionId
                    title
                    titleSlug
                    content
                    difficulty
                }
            }
        `,
    variables: {
      titleSlug: 'combinations',
    },
  }

  const response = await fetch('https://leetcode.com/graphql/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-csrftoken': CSRF_TOKEN,
    },
    body: JSON.stringify(query),
    credentials: 'include',
  })

  const result = await response.json()
  console.log('Response:', result)

  if (result.data?.submissionDetails?.code) {
    console.log('Code:', result.data.submissionDetails.code)
    return result.data.submissionDetails.code
  } else {
    console.log('Could not retrieve code.')
    return null
  }
}

getSubmissionCodeOnly(1655830762)

async function getSubmissionCodeOnly(submissionId) {
  const CSRF_TOKEN = 'rfp9x1rVvs1nT5pI5hBAFd0EX4bOeAZbPErlHQ8qlcquzBLZXBZ5PukEuLGX1zT1'

  const query = {
    query: `
            query submissionDetails($submissionId: Int!) {
                submissionDetails(submissionId: $submissionId) {
                    id
                    code
                    note
                    question {
                        questionId
                        titleSlug
                        title
                    }
                }
            }
        `,
    variables: {
      submissionId: parseInt(submissionId),
    },
  }

  const response = await fetch('https://leetcode.com/graphql/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-csrftoken': CSRF_TOKEN,
    },
    body: JSON.stringify(query),
    credentials: 'include',
  })

  const result = await response.json()
  console.log('Response:', result)

  if (result.data?.submissionDetails?.code) {
    console.log('Code:', result.data.submissionDetails.code)
    return result.data.submissionDetails.code
  } else {
    console.log('Could not retrieve code.')
    return null
  }
}
getSubmissionCodeOnly(1655830762)
