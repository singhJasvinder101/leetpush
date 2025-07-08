'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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

const resultVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: { duration: 0.3 },
  },
}

const complexityItemVariants = {
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

const ComplexityAnalyzer = () => {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeCode = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://leetpush.vercel.app/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ error: 'Failed to analyze code.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="space-y-6 max-w-4xl mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
          Complexity Analyzer
        </motion.h4>
        <motion.p className="text-zinc-600" variants={itemVariants}>
          Analyze your code's time and space complexity with AI-powered insights
        </motion.p>
      </motion.div>

      <motion.div className="space-y-4" variants={itemVariants}>
        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Textarea
            rows={12}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here for complexity analysis..."
            className="resize-none w-full text-sm bg-white/80 backdrop-blur-sm border-2 border-zinc-200/50 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 rounded-xl shadow-lg transition-all duration-300 font-mono"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-fuchsia-500/5 rounded-xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </motion.div>

        <motion.div className="flex justify-center" variants={itemVariants}>
          <Button
            onClick={analyzeCode}
            disabled={loading || !code.trim()}
            className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden min-w-[200px]"
            asChild
          >
            <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"
                initial={false}
                animate={loading ? { opacity: [0, 0.1, 0] } : { opacity: 0 }}
                transition={{ duration: 1, repeat: loading ? Number.POSITIVE_INFINITY : 0 }}
              />
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </motion.svg>
                )}
                {loading ? 'Analyzing...' : 'Analyze Complexity'}
              </div>
            </motion.button>
          </Button>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            className="space-y-6"
            variants={resultVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {result.error ? (
              <motion.div
                className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6 shadow-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-red-700 font-semibold">{result.error}</p>
                </div>
              </motion.div>
            ) : (
              result.summary && (
                <motion.div className="space-y-6" variants={containerVariants}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-zinc-200/50 hover:shadow-xl transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Time Complexity</h3>
                      </div>
                      <motion.div className="space-y-3" variants={containerVariants}>
                        {[
                          {
                            label: 'Best Case',
                            value: result.timeComplexity.bestCase,
                            color: 'text-green-500',
                          },
                          {
                            label: 'Average Case',
                            value: result.timeComplexity.averageCase,
                            color: 'text-yellow-500',
                          },
                          {
                            label: 'Worst Case',
                            value: result.timeComplexity.worstCase,
                            color: 'text-red-500',
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            className="flex items-center justify-between p-1 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors duration-200"
                            variants={complexityItemVariants}
                            custom={index}
                            whileHover={{ x: 4 }}
                          >
                            <span className="font-medium text-slate-700">{item.label}:</span>
                            <motion.span
                              className={`px-3 py-1 bg-white border ${item.color} border-${item.color.split('-')[1]}-300 rounded-full text-sm font-semibold`}
                              whileHover={{ scale: 1.05 }}
                            >
                              {item.value}
                            </motion.span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-zinc-200/50 hover:shadow-xl transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Space Complexity</h3>
                      </div>
                      <motion.div className="space-y-3" variants={containerVariants}>
                        {[
                          {
                            label: 'Best Case',
                            value: result.spaceComplexity.bestCase,
                            color: 'text-green-500',
                          },
                          {
                            label: 'Average Case',
                            value: result.spaceComplexity.averageCase,
                            color: 'text-yellow-500',
                          },
                          {
                            label: 'Worst Case',
                            value: result.spaceComplexity.worstCase,
                            color: 'text-red-500',
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            className="flex items-center justify-between p-1 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors duration-200"
                            variants={complexityItemVariants}
                            custom={index}
                            whileHover={{ x: 4 }}
                          >
                            <span className="font-medium text-slate-700">{item.label}:</span>
                            <motion.span
                              className={`px-3 py-1 bg-white border ${item.color} border-${item.color.split('-')[1]}-300 rounded-full text-sm font-semibold`}
                              whileHover={{ scale: 1.05 }}
                            >
                              {item.value}
                            </motion.span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, y: -2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">Optimization Suggestions</h3>
                    </div>
                    <p className="text-slate-700 text-md">{result.optimization}</p>
                  </motion.div>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ComplexityAnalyzer
