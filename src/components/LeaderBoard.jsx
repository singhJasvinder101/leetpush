import useGithub from '@/hooks/useGithub'
import LoadingSpinner from './LoadingSpinner'
import { motion, AnimatePresence } from 'framer-motion'

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
    transition: { duration: 0.4, ease: 'easeOut' },
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
      ease: 'easeOut',
    },
  }),
}

export default function Leaderboard() {
  const { data: leetpushUsers, loading: loadingLeetpush } = useGithub(
    'search/repositories?q=topic:leetpush&sort=stars&per_page=5',
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
          topics: ['leetpush'],
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
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h4
        className="text-lg font-bold text-slate-800 flex items-center gap-2"
        variants={itemVariants}
      >
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
                      src={user.avatar || '/placeholder.svg'}
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
                        transition={{ delay: 0.5, type: 'spring', bounce: 0.6 }}
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
