'use client'

interface FeedbackBannerProps {
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  visible: boolean
}

export default function FeedbackBanner({ type, title, message, visible }: FeedbackBannerProps) {
  if (!visible) return null

  const styles = {
    success: 'bg-success-50 border-success-400 text-success-600',
    error: 'bg-danger-50 border-danger-400 text-danger-600',
    info: 'bg-primary-50 border-primary-400 text-primary-600',
    warning: 'bg-amber-50 border-amber-400 text-amber-700',
  }

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  }

  return (
    <div className={`border-l-4 rounded-xl p-4 ${styles[type]} animate-slide-up`}>
      <div className="flex gap-3">
        <span className="text-xl flex-shrink-0">{icons[type]}</span>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm mt-1 opacity-90">{message}</p>
        </div>
      </div>
    </div>
  )
}
