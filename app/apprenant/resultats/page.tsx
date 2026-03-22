'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getLearner, getAttempts, getTotalScore } from '@/lib/store'
import { MISSIONS } from '@/data/missions'
import { Learner, MissionAttempt } from '@/types'
import ScoreDisplay from '@/components/ui/ScoreDisplay'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function ResultatsPage() {
  const router = useRouter()
  const [learner, setLearnerState] = useState<Learner | null>(null)
  const [attempts, setAttempts] = useState<MissionAttempt[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const l = getLearner()
    if (!l) { router.push('/'); return }
    setLearnerState(l)
    setAttempts(getAttempts())
    setTotal(getTotalScore())
  }, [router])

  if (!learner) return null

  const maxScore = MISSIONS.reduce((s, m) => s + m.maxScore, 0)

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 pt-5 pb-8 rounded-b-3xl">
        <button onClick={() => router.push('/apprenant/dashboard')} className="text-white/80 text-sm mb-3 block">
          ← Dashboard
        </button>
        <h1 className="text-xl font-bold">📊 Mes résultats</h1>
        <p className="text-white/70 text-sm mt-1">{learner.pseudo}</p>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Score global */}
        <Card className="text-center">
          <ScoreDisplay score={total} maxScore={maxScore} size="lg" showAnimation />
          <p className="mt-3 text-gray-500 text-sm">
            {attempts.length}/{MISSIONS.length} missions terminées
          </p>
        </Card>

        {/* Résultats par mission */}
        <h2 className="font-bold text-lg text-gray-800">Détail par mission</h2>
        {MISSIONS.map(mission => {
          const attempt = attempts.find(a => a.mission_id === mission.id)
          const pct = attempt ? (attempt.score / attempt.max_score) * 100 : 0

          return (
            <Card key={mission.id} className={`${!attempt ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{mission.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">M{mission.id} – {mission.title}</p>
                  {attempt ? (
                    <div className="mt-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className={`font-bold ${pct >= 80 ? 'text-success-600' : pct >= 50 ? 'text-amber-500' : 'text-danger-500'}`}>
                          {attempt.score}/{attempt.max_score} pts
                        </span>
                        <span className="text-xs text-gray-400">
                          {pct >= 80 ? '⭐ Excellent' : pct >= 50 ? '📚 À revoir' : '💪 À retravailler'}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct >= 80 ? 'bg-success-500' : pct >= 50 ? 'bg-amber-400' : 'bg-danger-400'}`}
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1">Non terminée</p>
                  )}
                </div>
              </div>
            </Card>
          )
        })}

        <Button fullWidth variant="secondary" onClick={() => router.push('/apprenant/dashboard')}>
          ← Retour au dashboard
        </Button>
      </div>
    </div>
  )
}
