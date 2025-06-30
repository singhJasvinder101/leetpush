import { useEffect, useMemo, useState } from "react"
import useGithub from "../hooks/useGithub"
import useLeetcode from "../hooks/useLeetcode"
import { getGithubAccessToken, getGithubUsername } from "../../utils/getAccessToken"
import { QUESTION_DETAILS_QUERY, SUBMISSION_DETAILS_QUERY } from "../utils/LEETCODE_QUERIES"
import { submitToGithub, fetchGithubFileSha, updateRepoTopics } from "./github/submitToGithub"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Github,
    Code2,
    FolderOpen,
    GitCommit,
    FileText,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Upload,
    BookOpen,
    Shield,
    Globe,
} from "lucide-react"
import SkeletonCard from "./SkeletonCard"
import SkeletonCodePreview from "./SkeletonCodePreview"
import getDifficultyClass from "@/utils/getDifficultyClass"
import { useLayoutEffect } from 'react';


export const PortalWrapper = ({ children }) => {
    useLayoutEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && (node).matches('[data-radix-popper-content-wrapper]')) {
                        const element = node;
                        element.classList.add('tailwind');
                        // Force visibility and high z-index
                        element.style.opacity = '1';
                        element.style.pointerEvents = 'auto';
                        element.style.zIndex = '100001';
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);
    return children;
};


const SubmissionDialog = ({ id, isOpen, onClose, title, content }) => {
    const [username, setUsername] = useState("")
    const [selectedRepo, setSelectedRepo] = useState("")
    const [directory, setDirectory] = useState("leetcode")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [commitMessage, setCommitMessage] = useState("")
    const [pushReadme, setPushReadme] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isLoadingRepos, setIsLoadingRepos] = useState(true)
    const [isLoadingSubmission, setIsLoadingSubmission] = useState(true)
    const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)

    useEffect(() => {
        if (isOpen) {
            setMounted(true)
            const fetchLocalStorageData = async () => {
                const github_username = await getGithubUsername()
                setUsername(github_username)
            }
            fetchLocalStorageData()
        }
    }, [isOpen])

    const { data: reposData, loading, error } = useGithub(
        `user/repos?per_page=50&sort=created&direction=desc&visibility=all&affiliation=owner,collaborator,organization_member`,
        'application/vnd.github.v3+json'
    )

    console.log(reposData)

    useEffect(() => {
        if (username) {
            setIsLoadingRepos(true)
            const timer = setTimeout(() => {
                setIsLoadingRepos(false)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [username])

    useEffect(() => {
        if (reposData) {
            setIsLoadingRepos(false)
        }
    }, [reposData])

    const submissionPayload = SUBMISSION_DETAILS_QUERY(id)
    const { data: leetcodeData } = useLeetcode(submissionPayload)

    console.log(leetcodeData)

    useEffect(() => {
        if (id) {
            setIsLoadingSubmission(true)
            const timer = setTimeout(() => {
                setIsLoadingSubmission(false)
            }, 800)
            return () => clearTimeout(timer)
        }
    }, [id])

    useEffect(() => {
        if (leetcodeData) {
            setIsLoadingSubmission(false)
        }
    }, [leetcodeData])

    const titleSlug = leetcodeData?.submissionDetails?.question?.titleSlug

    const questionPayload = useMemo(() => {
        return titleSlug ? QUESTION_DETAILS_QUERY(titleSlug) : null
    }, [titleSlug])

    const { data: questionData } = useLeetcode(questionPayload)

    useEffect(() => {
        if (titleSlug) {
            setIsLoadingQuestion(true)
            const timer = setTimeout(() => {
                setIsLoadingQuestion(false)
            }, 600)
            return () => clearTimeout(timer)
        }
    }, [titleSlug])

    useEffect(() => {
        if (questionData) {
            setIsLoadingQuestion(false)
        }
    }, [questionData])

    


    const handleSubmit = async () => {
        if (!selectedRepo || !username) {
            alert("Please select a repository")
            return
        }
        setIsSubmitting(true)
        try {
            const token = await getGithubAccessToken()
            const codeContent = leetcodeData?.submissionDetails?.code || ""
            const lang = leetcodeData?.submissionDetails?.lang?.name?.toLowerCase() || "txt"
            const problemTitle = questionData?.question?.title || title || `problem-${id}`
            const safeTitle = problemTitle.replace(/[\\/:"*?<>|]+/g, "_").replace(/\s+/g, "_")
            const fileName = `${safeTitle}.${lang}`
            const safeDirectory = directory.replace(/\/+$/, "")
            const filePath = safeDirectory ? `${safeDirectory}/${fileName}` : fileName
            const commitMsg = commitMessage || `Added LeetCode solution: ${problemTitle}`

            const sha = await fetchGithubFileSha({
                token,
                username,
                repo: selectedRepo,
                filePath,
            })

            await submitToGithub({
                token,
                username,
                repo: selectedRepo,
                filePath,
                content: codeContent,
                commitMessage: commitMsg,
                sha,
            })

            if (pushReadme && questionData?.question?.content && leetcodeData?.submissionDetails?.notes) {
                const readmePath = safeDirectory ? `${safeDirectory}/README.md` : "README.md"
                const readmeSha = await fetchGithubFileSha({
                    token,
                    username,
                    repo: selectedRepo,
                    filePath: readmePath,
                })
                const readmeContent = `# ${problemTitle} (${questionData.question.difficulty})\n\n---\n\n${questionData.question.content}\n\n 📝 Notes \n ---\n\n ${leetcodeData?.submissionDetails.notes}\n`
                await submitToGithub({
                    token,
                    username,
                    repo: selectedRepo,
                    filePath: readmePath,
                    content: readmeContent,
                    commitMessage: `Add README for ${problemTitle}`,
                    sha: readmeSha,
                })
            }

            await updateRepoTopics({
                token,
                username,
                repo: selectedRepo,
                topics: ["leetcode", "leetpush", "dsa", "algorithms", "coding", "solutions"],
            });

            alert("Code submitted successfully!")
            onClose()
        } catch (err) {
            console.error("Submit error:", err)
            alert(`Submission failed: ${err.message}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div style={{ zIndex: 100000 }} className="tailwind">
            <div style={{ zIndex: 100000 }} className="fixed submission-dialog inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div
                    className={`tailwind
            modern-glass rounded-xl
            w-full max-w-3xl h-[90vh] flex flex-col
            transform transition-all duration-300 ease-out
            ${mounted ? "animate-fade-in" : "opacity-0"}
            shadow-xl
          `}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0 rounded-t-xl">
                        <div className="tailwind flex items-center gap-4 animate-slide-up">
                            <div className="tailwind p-3 bg-blue-500/20 border border-blue-500/40 rounded-xl">
                                <Github className="tailwind w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Push to GitHub</h2>
                                <p className="text-sm text-gray-400">Submission #{id}</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-gray-400 hover:text-white hover:bg-red-500/20 focus-ring rounded-xl"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="tailwind flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
                        <div className="p-6 space-y-6">
                            {isLoadingQuestion ? (
                                <SkeletonCard />
                            ) : (
                                questionData?.question && (
                                        <Card className="tailwind rounded-xl modern-card animate-slide-up">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-xl text-white flex items-center gap-3">
                                                    <div className="p-2 bg-blue-500/20 border border-blue-500/40 rounded-xl">
                                                        <BookOpen className="w-5 h-5 text-blue-400" />
                                                    </div>
                                                    {questionData.question.title}
                                                </CardTitle>
                                                <Badge
                                                    className={`${getDifficultyClass(questionData.question.difficulty)} px-3 py-1 rounded-full`}
                                                >
                                                    {questionData.question.difficulty}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className="text-sm text-gray-300 leading-relaxed prose prose-invert max-w-none prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:border prose-code:border-gray-700 prose-code:rounded"
                                                dangerouslySetInnerHTML={{ __html: questionData.question.content }}
                                            />
                                        </CardContent>
                                    </Card>
                                )
                            )}

                            {isLoadingSubmission ? (
                                <SkeletonCodePreview />
                            ) : (
                                <Card className="modern-card animate-slide-up rounded-xl">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl text-white flex items-center gap-3">
                                            <div className="p-2 bg-purple-500/20 border border-purple-500/40 rounded-xl">
                                                <Code2 className="w-5 h-5 text-purple-400" />
                                            </div>
                                            Solution Preview
                                            {leetcodeData?.submissionDetails?.lang?.name && (
                                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 rounded-full">
                                                    {leetcodeData.submissionDetails.lang.name}
                                                </Badge>
                                            )}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 max-h-48 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
                                            <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                                                <code className="text-blue-400">{leetcodeData?.submissionDetails?.code}</code>
                                            </pre>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            <Card className="modern-card animate-slide-up rounded-xl">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-white flex items-center gap-3">
                                        <div className="p-2 bg-cyan-500/20 border border-cyan-500/40 rounded-xl">
                                            <GitCommit className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        Repository Configuration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="tailwind">
                                        <div className="tailwind space-y-3">
                                            <Label className=" text-white flex items-center gap-2">
                                                <FolderOpen className="w-4 h-4 text-blue-400" />
                                                Repository
                                            </Label>
                                            {isLoadingRepos ? (
                                                <div className="modern-input focus-ring h-12 rounded-xl flex items-center px-3">
                                                    <Loader2 className="w-4 h-4 animate-spin text-blue-400 mr-2" />
                                                    <span className="text-gray-400">Loading repositories...</span>
                                                </div>
                                            ) : (
                                               <PortalWrapper>
                                                        <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                                                            <SelectTrigger className="modern-input focus-ring h-12 rounded-xl">
                                                                <SelectValue placeholder="Choose a repository..." />
                                                            </SelectTrigger>
                                                            <SelectContent

                                                                container={<div className="tailwind" ></div>}
                                                                className="tailwind bg-gray-800 border-gray-700 rounded-xl">
                                                                {reposData?.map((repo) => (
                                                                    <SelectItem
                                                                        key={repo.id}
                                                                        value={repo.name}
                                                                        className="text-white hover:bg-gray-700 rounded-md"
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="flex items-center gap-2">
                                                                                {repo.private ? (
                                                                                    <Shield className="w-4 h-4 text-yellow-400" />
                                                                                ) : (
                                                                                    <Globe className="w-4 h-4 text-green-400" />
                                                                                )}
                                                                                <span>{repo.name}</span>
                                                                            </div>
                                                                            <Badge
                                                                                className={`text-xs rounded-full ${repo.private
                                                                                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
                                                                                    : "bg-green-500/20 text-green-300 border-green-500/40"
                                                                                    }`}
                                                                            >
                                                                                {repo.private ? "Private" : "Public"}
                                                                            </Badge>
                                                                        </div>
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                               </PortalWrapper>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <Label className="text-white">Directory Path</Label>
                                            <Input
                                                value={directory}
                                                onChange={(e) => setDirectory(e.target.value)}
                                                placeholder="e.g., leetcode, algorithms"
                                                className="modern-input focus-ring h-12 rounded-xl"
                                            />
                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                <FolderOpen className="w-3 h-3" />
                                                Leave empty for root directory
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-white flex items-center gap-2">
                                                <GitCommit className="w-4 h-4 text-cyan-400" />
                                                Commit Message
                                            </Label>
                                            <Input
                                                value={commitMessage}
                                                onChange={(e) => setCommitMessage(e.target.value)}
                                                placeholder="Add LeetCode solution..."
                                                className="modern-input focus-ring h-12 rounded-xl"
                                            />
                                            <p className="text-xs text-gray-500">Auto-generated if empty</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                                        <Checkbox
                                            id="readme"
                                            checked={pushReadme}
                                            onCheckedChange={setPushReadme}
                                            className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 focus-ring rounded"
                                        />
                                        <Label htmlFor="readme" className="text-sm text-gray-300 flex items-center gap-2 cursor-pointer">
                                            <FileText className="w-4 h-4 text-blue-400" />
                                            Also push README.md with problem details
                                        </Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-6 border-t border-gray-700 flex-shrink-0 rounded-b-xl">
                        <div className="flex items-center gap-3">
                            {selectedRepo ? (
                                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/40 rounded-xl">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    <span className="text-green-300 font-medium">Ready to push to {selectedRepo}</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-xl">
                                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                                    <span className="text-yellow-300 font-medium">Select a repository to continue</span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="modern-button-secondary h-12 px-6 focus-ring rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={!selectedRepo || isSubmitting}
                                className="modern-button-primary h-12 px-6 focus-ring rounded-xl"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Pushing...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Push to GitHub
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionDialog