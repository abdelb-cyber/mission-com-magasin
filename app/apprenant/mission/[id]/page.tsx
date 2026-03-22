'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getLearner } from '@/lib/store'
import { MISSIONS } from '@/data/missions'
import Mission1DragSort from '@/components/missions/Mission1DragSort'
import Mission2MatchObjective from '@/components/missions/Mission2MatchObjective'
import Mission3SceneDiagnostic from '@/components/missions/Mission3SceneDiagnostic'
import Mission4BuildILV from '@/components/missions/Mission4BuildILV'
import Mission5BuildPLV from '@/components/missions/Mission5BuildPLV'
import Mission6Regulation from '@/components/missions/Mission6Regulation'
import Mission7DigitalTools from '@/components/missions/Mission7DigitalTools'

export default function MissionPage() {
  const params = useParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const missionId = Number(params.id)

  useEffect(() => {
    const l = getLearner()
    if (!l) { router.push('/'); return }
    setMounted(true)
  }, [router])

  if (!mounted) return null

  const mission = MISSIONS.find(m => m.id === missionId)
  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-4xl mb-4">🤷</p>
          <p className="text-gray-500">Mission introuvable</p>
          <button className="btn-primary mt-4" onClick={() => router.push('/apprenant/dashboard')}>
            Retour au dashboard
          </button>
        </div>
      </div>
    )
  }

  const onComplete = () => {
    router.push('/apprenant/dashboard')
  }

  const renderMission = () => {
    switch (mission.id) {
      case 1: return <Mission1DragSort mission={mission} onComplete={onComplete} />
      case 2: return <Mission2MatchObjective mission={mission} onComplete={onComplete} />
      case 3: return <Mission3SceneDiagnostic mission={mission} onComplete={onComplete} />
      case 4: return <Mission4BuildILV mission={mission} onComplete={onComplete} />
      case 5: return <Mission5BuildPLV mission={mission} onComplete={onComplete} />
      case 6: return <Mission6Regulation mission={mission} onComplete={onComplete} />
      case 7: return <Mission7DigitalTools mission={mission} onComplete={onComplete} />
      default: return <p>Mission non implémentée</p>
    }
  }

  // Couleurs de fond pour chaque mission — déclarées en dur pour que Tailwind les inclue
  const headerColors: Record<number, string> = {
    1: '#1e3a5f',  // bleu foncé
    2: '#14532d',  // vert foncé
    3: '#78350f',  // ambre foncé
    4: '#312e81',  // indigo foncé
    5: '#831843',  // rose foncé
    6: '#7f1d1d',  // rouge foncé
    7: '#581c87',  // violet foncé
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mission */}
      <div
        className="text-white px-5 pt-5 pb-6 rounded-b-3xl shadow-lg"
        style={{ backgroundColor: headerColors[mission.id] || '#1e3a5f' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => router.push('/apprenant/dashboard')} className="text-white text-sm font-medium">
            ← Retour
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl bg-white/20 rounded-xl p-2">{mission.icon}</span>
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-wide">Mission {mission.id}</p>
            <h1 className="text-xl font-extrabold">{mission.title}</h1>
          </div>
        </div>
        <p className="text-white text-sm mt-2 font-medium">{mission.description}</p>
      </div>

      {/* Contenu mission */}
      <div className="px-4 py-6">
        {renderMission()}
      </div>
    </div>
  )
}
