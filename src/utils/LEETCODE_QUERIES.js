export const SUBMISSION_DETAILS_QUERY = (submissionId) => ({
  query: `
        query submissionDetails($submissionId: Int!) {
            submissionDetails(submissionId: $submissionId) {
                id
                code
                lang { name }
                notes
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
})

export const QUESTION_DETAILS_QUERY = (titleSlug) => ({
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
    titleSlug,
  },
})
