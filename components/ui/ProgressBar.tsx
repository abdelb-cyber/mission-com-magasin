'use client'

interface ProgressBarProps {
  value: number // 0-100
  color?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function ProgressBar({ value, color = 'bg-primary-500', showLabel = true, size = 'md' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const heights = { sm: 'h-2', md: 'h-3', lg: 'h-4' }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-600">Progression</span>
          <span className="text-sm font-bold text-gray-800">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className={`${heights[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`h-full ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
