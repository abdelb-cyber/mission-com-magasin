'use client'

import { useState } from 'react'
import { MissionDefinition } from '@/types'
import { DIGITAL_JOURNEY } from '@/data/missions'
import { saveAttempt } from '@/lib/store'
import StorePlan from '@/components/svg/StorePlan'
import Button from '@/components/ui/Button'
import ScoreDisplay from '@/components/ui/ScoreDisplay'
import FeedbackBanner from '@/components/ui/FeedbackBanner'

interface Props {
  mission: MissionDefinition
  onComplete: () => void
}

export default function Mission7DigitalTools({ mission, onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  const step = DIGITAL_JOURNEY[currentIdx]
  const pointsPerStep = Math.round(mission.maxScore / DIGITAL_JOURNEY.length)

  const handleSelect = (toolId: string) => {
    if (feedback) return
    setSelectedTool(toolId)
    const isCorrect = toolId === step.correctTool

    if (isCorrect) {
      setScore(prev => prev + pointsPerStep)
      setFeedback({ type: 'success', message: step.justification })
    } else {
      setFeedback({ type: 'error', message: step.justification })
    }
  }

  const handleNext = () => {
    setFeedback(null)
    setSelectedTool(null)
    if (currentIdx + 1 >= DIGITAL_JOURNEY.length) {
      setShowResults(true)
      saveAttempt({
        id: crypto.randomUUID(),
        learner_id: '', session_id: '',
        mission_id: mission.id,
        score: Math.min(score, mission.maxScore),
        max_score: mission.maxScore,
        completed_at: new Date().toISOString(),
        details: {},
        time_spent: 0,
      })
    } else {
      setCurrentIdx(prev => prev + 1)
    }
  }

  if (showResults) {
    return (
      <div className="space-y-6 animate-slide-up">
        <div className="card text-center">
          <h2 className="text-xl font-bold mb-4">Parcours digital complété !</h2>
          <ScoreDisplay score={Math.min(score, mission.maxScore)} maxScore={mission.maxScore} size="lg" showAnimation />
        </div>

        <div className="card bg-purple-50 border-purple-200">
          <h3 className="font-bold text-purple-800 mb-2">📱 Les outils digitaux en magasin</h3>
          <div className="space-y-2 text-sm text-purple-700">
            <p>• <strong>Vitrine digitale</strong> : communique même magasin fermé</p>
            <p>• <strong>Borne interactive</strong> : oriente et conseille le client</p>
            <p>• <strong>Écran d&apos;affichage</strong> : diffuse des messages dynamiques</p>
            <p>• <strong>Étiquette électronique</strong> : prix dynamique et info produit</p>
            <p>• <strong>Borne conseil</strong> : accompagne le choix du client</p>
          </div>
        </div>

        <Button fullWidth onClick={onComplete}>Retour aux missions</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Plan du magasin */}
      <div className="card p-2">
        <StorePlan activeStep={currentIdx} />
      </div>

      {/* Progression */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Étape {currentIdx + 1}/{DIGITAL_JOURNEY.length}</span>
        <span className="font-semibold text-primary-600">{score} pts</span>
      </div>

      {/* Étape courante */}
      <div className="card animate-slide-up" key={step.id}>
        <div className="bg-purple-50 rounded-xl p-3 mb-3">
          <p className="font-bold text-purple-800 text-sm">{step.etape}</p>
          <p className="text-sm text-purple-700 mt-1">{step.description}</p>
        </div>

        <p className="font-semibold text-sm text-gray-700 mb-3">Quel outil digital choisissez-vous ?</p>

        <div className="space-y-2">
          {step.tools.map(tool => {
            const isSelected = selectedTool === tool.id
            const isCorrect = tool.id === step.correctTool
            let classes = 'border-gray-200 hover:border-gray-300'
            if (feedback && isSelected && isCorrect) classes = 'border-success-400 bg-success-50'
            else if (feedback && isSelected && !isCorrect) classes = 'border-danger-400 bg-danger-50'
            else if (feedback && isCorrect) classes = 'border-success-400 bg-success-50/50'

            return (
              <button
                key={tool.id}
                onClick={() => handleSelect(tool.id)}
                disabled={!!feedback}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${classes}`}
              >
                <span className="text-2xl">{tool.icon}</span>
                <span className="font-medium text-sm text-gray-800">{tool.name}</span>
                {feedback && isCorrect && <span className="ml-auto text-success-600 font-bold">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {feedback && (
        <>
          <FeedbackBanner
            type={feedback.type}
            title={feedback.type === 'success' ? 'Bon choix !' : 'Pas tout à fait...'}
            message={feedback.message}
            visible
          />
          <Button fullWidth onClick={handleNext}>
            {currentIdx + 1 >= DIGITAL_JOURNEY.length ? 'Voir les résultats' : 'Étape suivante →'}
          </Button>
        </>
      )}
    </div>
  )
}
