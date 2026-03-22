'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getLearner, getAttempts, getTotalScore, isTrainingMode as checkTraining, loadProgressFromSupabase } from '@/lib/store'
import { MISSIONS } from '@/data/missions'
import MissionCard from '@/components/ui/MissionCard'
import ProgressBar from '@/components/ui/ProgressBar'
import { Learner, MissionAttempt } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [learner, setLearner] = useState<Learner | null>(null)
  const [attempts, setAttempts] = useState<MissionAttempt[]>([])
  const [totalScore, setTotalScore] = useState(0)
  const [isTraining, setIsTraining] = useState(false)

  useEffect(() => {
    const l = getLearner()
    if (!l) { router.push('/'); return }
    setLearner(l)
    setAttempts(getAttempts())
    setTotalScore(getTotalScore())
    setIsTraining(checkTraining())

    // Charger la progression depuis Supabase (si l'apprenant revient)
    loadProgressFromSupabase().then(() => {
      // Rafraîchir après synchronisation
      const updated = getLearner()
      if (updated) setLearner({ ...updated })
      setAttempts(getAttempts())
      setTotalScore(getTotalScore())
    })
  }, [router])

  if (!learner) return null

  const maxPossibleScore = MISSIONS.reduce((sum, m) => sum + m.maxScore, 0)
  const completedCount = attempts.length
  const progress = (completedCount / MISSIONS.length) * 100

  const getAttemptForMission = (missionId: number) =>
    attempts.find(a => a.mission_id === missionId)

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.push('/')} className="text-white/80 text-sm">
            ← Accueil
          </button>
          {isTraining && (
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
              🏋️ Entraînement
            </span>
          )}
        </div>

        <h1 className="text-xl font-bold">Bonjour, {learner.pseudo} 👋</h1>
        <p className="text-white/70 text-sm mt-1">Relevez les missions pour devenir expert en communication magasin.</p>

        {/* Score global */}
        <div className="mt-5 bg-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/70 text-xs">Score total</p>
              <p className="text-2xl font-extrabold">{totalScore}<span className="text-base font-normal text-white/60">/{maxPossibleScore}</span></p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Missions</p>
              <p className="text-2xl font-extrabold">{completedCount}<span className="text-base font-normal text-white/60">/{MISSIONS.length}</span></p>
            </div>
          </div>
          <ProgressBar value={progress} color="bg-white" showLabel={false} size="sm" />
        </div>
      </div>

      {/* Liste des missions */}
      <div className="px-4 -mt-4 space-y-3">
        <h2 className="font-bold text-lg text-gray-800 mb-2 mt-6">Vos missions</h2>
        {MISSIONS.map((mission) => {
          const attempt = getAttemptForMission(mission.id)
          return (
            <MissionCard
              key={mission.id}
              mission={mission}
              completed={!!attempt}
              score={attempt?.score}
              onClick={() => router.push(`/apprenant/mission/${mission.id}`)}
            />
          )
        })}
      </div>

      {/* Bouton résultats */}
      {completedCount > 0 && (
        <div className="px-4 mt-6">
          <button
            className="w-full btn-secondary"
            onClick={() => router.push('/apprenant/resultats')}
          >
            📊 Voir mes résultats détaillés
          </button>
        </div>
      )}
    </div>
  )
}
