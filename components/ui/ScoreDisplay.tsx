'use client'

interface ScoreDisplayProps {
  score: number
  maxScore: number
  size?: 'sm' | 'md' | 'lg'
  showAnimation?: boolean
}

export default function ScoreDisplay({ score, maxScore, size = 'md', showAnimation = false }: ScoreDisplayProps) {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0
  const color = percentage >= 80 ? 'text-success-600' : percentage >= 50 ? 'text-amber-500' : 'text-danger-500'
  const bgColor = percentage >= 80 ? 'from-success-400 to-green-500' : percentage >= 50 ? 'from-amber-400 to-orange-500' : 'from-danger-400 to-red-500'

  const sizes = {
    sm: { ring: 60, stroke: 4, text: 'text-sm', font: 'text-lg' },
    md: { ring: 80, stroke: 5, text: 'text-base', font: 'text-2xl' },
    lg: { ring: 120, stroke: 6, text: 'text-lg', font: 'text-4xl' },
  }
  const s = sizes[size]
  const radius = (s.ring - s.stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: s.ring, height: s.ring }}>
        <svg width={s.ring} height={s.ring} className="-rotate-90">
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={s.stroke}
          />
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={s.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * percentage) / 100}
            className={showAnimation ? 'transition-all duration-1000 ease-out' : ''}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`${bgColor.split(' ')[0].replace('from-', 'stop-color: ')}`} style={{ stopColor: percentage >= 80 ? '#4ade80' : percentage >= 50 ? '#fbbf24' : '#f87171' }} />
              <stop offset="100%" style={{ stopColor: percentage >= 80 ? '#22c55e' : percentage >= 50 ? '#f97316' : '#ef4444' }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${s.font} font-bold ${color}`}>{score}</span>
        </div>
      </div>
      <span className={`${s.text} text-gray-500 font-medium`}>/ {maxScore} pts</span>
    </div>
  )
}
