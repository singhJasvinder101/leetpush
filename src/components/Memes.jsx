import { useCallback, useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { motion, AnimatePresence } from 'framer-motion'
import memeData from '../utils/DATA.json'

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
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

export default function Memes() {
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
      console.error('Error loading meme:', err)
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
        <div className="w-6 h-6 bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full flex items-center justify-center">
          <span className="text-sm">😄</span>
        </div>
        Memes
      </motion.h4>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
                className="w-full rounded-xl"
                style={{
                  maxHeight: '300px',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onLoad={() => setLoading(false)}
                onError={() => {
                  console.error('Failed to load image')
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
