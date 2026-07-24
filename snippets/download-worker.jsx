import { useState } from "react"

export const DownloadWorker = () => {
  const [downloading, setDownloading] = useState(false)
  const workerUrl =
    "https://raw.githubusercontent.com/jenilmoradiyatwinnet/docs/main/images/twinalyze-fcm-sw.js"

  const handleDownload = async () => {
    try {
      setDownloading(true)

      const response = await fetch(workerUrl, {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Worker file could not be downloaded.")
      }

      const blob = await response.blob()
      const fileUrl = URL.createObjectURL(blob)

      const link = document.createElement("a")

      link.href = fileUrl
      link.download = "twinalyze-fcm-sw.js"

      document.body.appendChild(link)
      link.click()
      link.remove()

      URL.revokeObjectURL(fileUrl)
    } catch (error) {
      console.error("[Twinalyze] Download failed:", error)
      window.open(workerUrl, "_blank", "noopener,noreferrer")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex w-fit items-center justify-center rounded-lg border-0 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {downloading
        ? "Downloading..."
        : "Download Worker File ↓"}
    </button>
  )
}
