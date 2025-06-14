import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"


const PushAllDialog = ({ isOpen, onClose, onConfirm }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div
        className={`
          modern-glass rounded-xl
          w-full max-w-md p-8
          transform transition-all duration-300 ease-out
          ${mounted ? "animate-fade-in" : "opacity-0"}
          shadow-xl
        `}
      >
        <div className="text-center space-y-6">
          <div className="p-4 bg-yellow-500/20 border border-yellow-500/40 w-fit mx-auto rounded-lg">
            <AlertCircle className="w-10 h-10 text-yellow-400" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">Push All Solutions</h3>
            <p className="text-gray-300">
              Are you sure you want to push all your LeetCode solutions to GitHub? This action will process all
              submissions automatically.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="modern-button-secondary flex-1 h-12 focus-ring rounded-lg"
            >
              Cancel
            </Button>
            <Button onClick={onConfirm} className="modern-button-primary flex-1 h-12 focus-ring rounded-lg">
              Confirm Push All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PushAllDialog