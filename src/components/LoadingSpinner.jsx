import { motion, AnimatePresence } from "framer-motion"


export default function LoadingSpinner() {
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

