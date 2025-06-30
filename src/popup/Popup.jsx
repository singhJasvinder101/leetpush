import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import '@/styles/dialog.css'
import GitHubLoginButton from "@/components/github/GithubLoginButton"
import Memes from "@/components/Memes"
import Leaderboard from "@/components/LeaderBoard"
import ComplexityAnalyzer from "@/components/ComplexityAnalyzer"

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

export const Popup = () => {
  const [tab, setTab] = useState("memes")

  return (
    <div className="tailwind">
      <motion.main
        className="w-[450px] min-h-[500px] bg-gradient-to-br from-slate-50 to-zinc-100 p-6 font-sans"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6" variants={containerVariants}>
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

          <GitHubLoginButton />

          <motion.div className="relative" variants={itemVariants}>
            <div className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-zinc-200/50">
              <motion.button
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 relative ${tab === "leaderboard" ? "text-white shadow-lg" : "text-zinc-600 hover:text-slate-800"
                  }`}
                onClick={() => setTab("leaderboard")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab === "leaderboard" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl"
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
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 relative ${tab === "memes" ? "text-white shadow-lg" : "text-zinc-600 hover:text-slate-800"
                  }`}
                onClick={() => setTab("memes")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab === "memes" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center justify-center gap-2">
                  <span className="text-sm">😄</span>
                  Memes
                </span>
              </motion.button>

              <motion.button
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 relative ${tab === "analyzer" ? "text-white shadow-lg" : "text-zinc-600 hover:text-slate-800"}`}
                onClick={() => setTab("analyzer")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab === "analyzer" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center justify-center gap-2">
                  🧠 Complexity
                </span>
              </motion.button>

            </div>
          </motion.div>


          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div key={tab} variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                {tab === "leaderboard" && <Leaderboard />}
                {tab === "memes" && <Memes />}
                {tab === "analyzer" && <ComplexityAnalyzer />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}

export default Popup
