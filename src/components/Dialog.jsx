import { useEffect, useMemo, useState } from "react"
import { createRoot } from "react-dom/client"
import getDifficultyClass from "@/utils/getDifficultyClass"
import SubmissionDialog from "./SubmissionDialog"
import PushAllDialog from "./PushAllDialog"
import "@/styles/dialog.css"


const DialogApp = () => {
  const [dialog, setDialog] = useState(null)
  const [pushAllOpen, setPushAllOpen] = useState(false)

  const openDialog = (id, title, content) => {
    if (dialog && dialog.id === id) {
      setDialog(null)
    } else {
      setDialog({ id, title, content })
    }
  }
  const closeDialog = () => setDialog(null)

  const openPushAllDialog = () => setPushAllOpen(true)
  const closePushAllDialog = () => setPushAllOpen(false)
  const handlePushAllConfirm = async () => {
    setPushAllOpen(false)
    const commitBtns = document.querySelectorAll(".lc-extra-btn")
    for (const commitBtn of commitBtns) {
      commitBtn.click()
      await new Promise((res) => setTimeout(res, 2000))
      const dialogBtn = Array.from(document.querySelectorAll("button")).find((b) =>
        b.textContent.includes("Push to GitHub"),
      )
      if (dialogBtn) dialogBtn.click()
      await new Promise((res) => setTimeout(res, 2500))
    }
  }

  

  useEffect(() => {
    window.openLeetCodeDialog = openDialog

    
    window.openLeetCodePushAllDialog = openPushAllDialog
    return () => {
      delete window.openLeetCodeDialog
      delete window.openLeetCodePushAllDialog
    }
  }, [dialog])


  return (
    <>
      {dialog && (
        <SubmissionDialog
          isOpen={true}
          title={dialog.title}
          content={dialog.content}
          onClose={closeDialog}
          id={dialog.id}
        />
      )}
      {/* <PushAllDialog isOpen={pushAllOpen} onClose={closePushAllDialog} onConfirm={handlePushAllConfirm} /> */}
    </>
  )
}

export function initializeReactDialog() {
  let container = document.getElementById("leetcode-extension-react-root")
  if (!container) {
    container = document.createElement("div")
    container.id = "leetcode-extension-react-root"
    document.body.appendChild(container)
  }

  const root = createRoot(container)
  root.render(<DialogApp />)
}

export default DialogApp
