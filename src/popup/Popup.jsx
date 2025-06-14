import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { loginWithGitHub } from "../../utils/githubAuth"
import useGithub from "../hooks/useGithub"
import memeData from "../utils/DATA.json"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const tabContentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: { duration: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const leaderboardItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
}

function GitHubLoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const { token, username } = await loginWithGitHub()
      alert(`Welcome ${username}`)
    } catch (err) {
      console.log(err)
      alert("GitHub login failed.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.button
      onClick={handleLogin}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"
        initial={false}
        animate={isLoading ? { opacity: [0, 0.1, 0] } : { opacity: 0 }}
        transition={{ duration: 1, repeat: isLoading ? Number.POSITIVE_INFINITY : 0 }}
      />
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {isLoading ? "Connecting..." : "Connect GitHub"}
      </div>
    </motion.button>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <motion.div
        className="w-8 h-8 border-3 border-zinc-200 border-t-indigo-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}

function Leaderboard() {
  const { data: leetpushUsers, loading: loadingLeetpush } = useGithub(
    "search/repositories?q=topic:leetpush&sort=stars&per_page=5",
  )

  if (loadingLeetpush) {
    return <LoadingSpinner />
  }

  const uniqueUsers = new Map()

  if (leetpushUsers?.items) {
    leetpushUsers.items.forEach((repo) => {
      if (!uniqueUsers.has(repo.owner.login)) {
        uniqueUsers.set(repo.owner.login, {
          username: repo.owner.login,
          avatar: repo.owner.avatar_url,
          topics: ["leetpush"],
          stars: repo.stargazers_count,
        })
      } else {
        const user = uniqueUsers.get(repo.owner.login)
        user.stars += repo.stargazers_count
      }
    })
  }
  const users = Array.from(uniqueUsers.values()).sort((a, b) => b.stars - a.stars)

  return (
    <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h4 className="text-lg font-bold text-slate-800 flex items-center gap-2" variants={itemVariants}>
        <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        Top Contributors
      </motion.h4>

      {users.length === 0 ? (
        <motion.div className="text-center py-8 text-zinc-500" variants={itemVariants}>
          <p>No users found</p>
        </motion.div>
      ) : (
        <motion.div className="space-y-3" variants={containerVariants}>
          {users.map((user, index) => (
            <motion.div
              key={user.username}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl border border-zinc-200/50 hover:border-indigo-200 transition-all duration-300"
              variants={leaderboardItemVariants}
              custom={index}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <motion.img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.username}
                      className="w-12 h-12 rounded-full border-2 border-gradient-to-r from-indigo-500 to-fuchsia-500"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                    {index === 0 && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                      >
                        <span className="text-xs">👑</span>
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{user.username}</div>
                    <div className="text-sm text-zinc-500">Rank #{index + 1}</div>
                  </div>
                </div>
                <motion.div
                  className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {user.stars}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

function Memes() {
  const [meme, setMeme] = useState(null)
  const [loading, setLoading] = useState(true)

  const getRandomMeme = useCallback(() => {
    try {
      const randomIndex = Math.floor(Math.random() * memeData.length)
      console.log(randomIndex)
      const selectedMeme = memeData[randomIndex]
      const fullUrl = `https://raw.githubusercontent.com/deep5050/programming-memes/main/${selectedMeme.path}`

      return {
        id: selectedMeme.id,
        url: fullUrl,
        width: selectedMeme.width,
        height: selectedMeme.height,
      }
    } catch (err) {
      console.error("Error loading meme:", err)
      return null
    }
  }, [])

  const loadNewMeme = useCallback(() => {
    setLoading(true)
    const meme = getRandomMeme()
    setMeme(meme)
    setLoading(false)
  }, [getRandomMeme])

  useEffect(() => {
    loadNewMeme()
  }, [loadNewMeme])

  return (
    <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h4 className="text-lg font-bold text-slate-800 flex items-center gap-2" variants={itemVariants}>
        <div className="w-6 h-6 bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full flex items-center justify-center">
          <span className="text-sm">😄</span>
        </div>
        Memes
      </motion.h4>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingSpinner />
          </motion.div>
        ) : !meme ? (
          <motion.div
            key="error"
            className="text-center py-8 space-y-4"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p className="text-zinc-500">Failed to load meme</p>
            <motion.button
              onClick={loadNewMeme}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={meme.id}
            className="space-y-4"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-zinc-200/50 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={meme.url}
                alt={`Meme #${meme.id}`}
                className="w-full rounded-lg"
                style={{
                  maxHeight: "300px",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onLoad={() => setLoading(false)}
                onError={() => {
                  console.error("Failed to load image")
                  setLoading(false)
                }}
              />
            </motion.div>

            <motion.button
              onClick={loadNewMeme}
              className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"
                whileHover={{ opacity: 0.1 }}
              />
              <div className="flex items-center justify-center gap-2">
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </motion.svg>
                Next Meme
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const Popup = () => {
  const [tab, setTab] = useState("memes")

  return (
    <motion.main
      className="w-[350px] min-h-[500px] bg-gradient-to-br from-slate-50 to-zinc-100 p-6 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-6" variants={containerVariants}>
        {/* Header */}
        <motion.div className="text-center" variants={itemVariants}>
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent mb-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            LeetPush
          </motion.h1>
          <motion.p className="text-sm text-zinc-600" variants={itemVariants}>
            Track your coding journey with style
          </motion.p>
        </motion.div>

        {/* GitHub Login */}
        <GitHubLoginButton />

        {/* Tabs */}
        <motion.div className="relative" variants={itemVariants}>
          <div className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-zinc-200/50">
            <motion.button
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 relative ${tab === "leaderboard" ? "text-white shadow-lg" : "text-zinc-600 hover:text-slate-800"
                }`}
              onClick={() => setTab("leaderboard")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab === "leaderboard" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-lg"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Leaderboard
              </span>
            </motion.button>

            <motion.button
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 relative ${tab === "memes" ? "text-white shadow-lg" : "text-zinc-600 hover:text-slate-800"
                }`}
              onClick={() => setTab("memes")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab === "memes" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-lg"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center justify-center gap-2">
                <span className="text-sm">😄</span>
                Memes
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div key={tab} variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
              {tab === "leaderboard" && <Leaderboard />}
              {tab === "memes" && <Memes />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.main>
  )
}

export default Popup
