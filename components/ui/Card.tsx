'use client'

interface CardProps {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  onClick?: () => void
}

export default function Card({ children, className = '', interactive = false, onClick }: CardProps) {
  const base = interactive ? 'card-interactive' : 'card'
  return (
    <div className={`${base} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
