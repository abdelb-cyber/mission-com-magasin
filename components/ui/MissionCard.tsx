'use client'

import { MissionDefinition } from '@/types'
import Card from './Card'

interface MissionCardProps {
  mission: MissionDefinition
  completed?: boolean
  score?: number
  locked?: boolean
  onClick: () => void
}

export default function MissionCard({ mission, completed = false, score, locked = false, onClick }: MissionCardProps) {
  return (
    <Card
      interactive={!locked}
      onClick={locked ? undefined : onClick}
      className={`relative overflow-hidden ${locked ? 'opacity-50' : ''}`}
    >
      {/* Barre de couleur en haut */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${mission.color}`} />

      <div className="flex items-start gap-4 pt-2">
        {/* Icône mission */}
        <div className={`w-14 h-14 rounded-xl ${mission.color} bg-opacity-10 flex items-center justify-center text-2xl flex-shrink-0`}>
          {mission.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              Mission {mission.id}
            </h3>
            {completed && (
              <span className="badge bg-success-50 text-success-600 text-xs">
                ✓ Terminé
              </span>
            )}
          </div>
          <p className="font-semibold text-gray-700 text-sm mt-0.5">{mission.title}</p>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{mission.description}</p>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">⏱ {mission.estimatedTime}</span>
            {score !== undefined && (
              <span className="text-sm font-bold text-primary-600">{score}/{mission.maxScore} pts</span>
            )}
            {!completed && !locked && (
              <span className="text-xs font-semibold text-primary-600">Commencer →</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
