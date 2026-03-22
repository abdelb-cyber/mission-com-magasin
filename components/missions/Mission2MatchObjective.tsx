'use client'

import { useState } from 'react'
import { MissionDefinition } from '@/types'
import { MATCH_SCENARIOS } from '@/data/missions'
import { saveAttempt } from '@/lib/store'
import SupportSVG from '@/components/svg/SupportSVG'
import Button from '@/components/ui/Button'
import ScoreDisplay from '@/components/ui/ScoreDisplay'
import FeedbackBanner from '@/components/ui/FeedbackBanner'

interface Props {
  mission: MissionDefinition
  onComplete: () => void
}

export default function Mission2MatchObjective({ mission, onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const scenario = MATCH_SCENARIOS[currentIdx]
  const isFinished = currentIdx >= MATCH_SCENARIOS.length
  const pointsPerQ = Math.round(mission.maxScore / MATCH_SCENARIOS.length)

  const objectifLabels: Record<string, string> = {
    'orienter': '🧭 Orienter le client',
    'informer': 'ℹ️ Informer le client',
    'promouvoir': '📢 Promouvoir un produit',
    'declencher-achat': '🛒 Déclencher l\'achat',
    'attirer-zone-froide': '🧲 Attirer vers une zone froide',
  }

  const handleSelect = (supportId: string) => {
    if (feedback) return
    setSelectedId(supportId)
    const isCorrect = supportId === scenario.correctSupportId

    if (isCorrect) {
      setScore(prev => prev + pointsPerQ)
      setCorrectAnswers(prev => prev + 1)
      setFeedback({ type: 'success', message: scenario.feedback })
    } else {
      setFeedback({ type: 'error', message: scenario.feedback })
    }
  }

  const handleNext = () => {
    setFeedback(null)
    setSelectedId(null)
    if (currentIdx + 1 >= MATCH_SCENARIOS.length) {
      setShowResults(true)
      saveAttempt({
        id: crypto.randomUUID(),
        learner_id: '', session_id: '',
        mission_id: mission.id,
        score: Math.min(score, mission.maxScore),
        max_score: mission.maxScore,
        completed_at: new Date().toISOString(),
        details: { correctAnswers },
        time_spent: 0,
      })
    } else {
      setCurrentIdx(prev => prev + 1)
    }
  }

  if (showResults) {
    const finalScore = Math.min(score, mission.maxScore)
    return (
      <div className="space-y-6 animate-slide-up">
        <div className="card text-center">
          <h2 className="text-xl font-bold mb-4">Mission terminée !</h2>
          <ScoreDisplay score={finalScore} maxScore={mission.maxScore} size="lg" showAnimation />
          <p className="mt-4 text-gray-600">
            {correctAnswers}/{MATCH_SCENARIOS.length} situations résolues correctement.
          </p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-2">📝 À retenir</h3>
          <p className="text-sm text-gray-600">
            Le choix du support dépend toujours de l&apos;objectif commercial : orienter, informer, promouvoir ou déclencher l&apos;achat.
            L&apos;ILV sert à guider et informer, la PLV sert à vendre et attirer.
          </p>
        </div>
        <Button fullWidth onClick={onComplete}>Retour aux missions</Button>
      </div>
    )
  }

  if (isFinished) return null

  return (
    <div className="space-y-4">
      {/* Progression */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Situation {currentIdx + 1} / {MATCH_SCENARIOS.length}</span>
        <span className="font-semibold text-primary-600">{score} pts</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${(currentIdx / MATCH_SCENARIOS.length) * 100}%` }} />
      </div>

      {/* Scénario */}
      <div className="card animate-slide-up" key={scenario.id}>
        <div className="inline-block bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          {objectifLabels[scenario.objectif]}
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">{scenario.situation}</p>

        <p className="font-semibold text-gray-900 mt-4 mb-3 text-sm">Quel support choisissez-vous ?</p>

        <div className="space-y-3">
          {scenario.supports.map(support => {
            const isSelected = selectedId === support.id
            const isCorrect = support.id === scenario.correctSupportId
            let borderColor = 'border-gray-200'
            if (feedback && isSelected && isCorrect) borderColor = 'border-success-400 bg-success-50'
            else if (feedback && isSelected && !isCorrect) borderColor = 'border-danger-400 bg-danger-50'
            else if (feedback && isCorrect) borderColor = 'border-success-400 bg-success-50/50'

            return (
              <button
                key={support.id}
                onClick={() => handleSelect(support.id)}
                disabled={!!feedback}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${borderColor} ${!feedback ? 'hover:border-primary-300 active:bg-primary-50' : ''}`}
              >
                <SupportSVG type={support.svgType} size={50} />
                <span className="font-medium text-sm text-gray-800 text-left">{support.label}</span>
                {feedback && isCorrect && <span className="ml-auto text-success-600">✓</span>}
                {feedback && isSelected && !isCorrect && <span className="ml-auto text-danger-500">✗</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <>
          <FeedbackBanner
            type={feedback.type}
            title={feedback.type === 'success' ? 'Bonne réponse !' : 'Pas tout à fait...'}
            message={feedback.message}
            visible
          />
          <Button fullWidth onClick={handleNext}>
            {currentIdx + 1 >= MATCH_SCENARIOS.length ? 'Voir les résultats' : 'Situation suivante →'}
          </Button>
        </>
      )}
    </div>
  )
}
