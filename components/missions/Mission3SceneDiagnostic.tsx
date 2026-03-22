'use client'

import { useState } from 'react'
import { MissionDefinition } from '@/types'
import { SCENE_ELEMENTS } from '@/data/missions'
import { saveAttempt } from '@/lib/store'
import StoreScene from '@/components/svg/StoreScene'
import Button from '@/components/ui/Button'
import ScoreDisplay from '@/components/ui/ScoreDisplay'
import FeedbackBanner from '@/components/ui/FeedbackBanner'

interface Props {
  mission: MissionDefinition
  onComplete: () => void
}

export default function Mission3SceneDiagnostic({ mission, onComplete }: Props) {
  const [foundElements, setFoundElements] = useState<Set<string>>(new Set())
  const [clickedElement, setClickedElement] = useState<typeof SCENE_ELEMENTS[0] | null>(null)
  const [wrongClicks, setWrongClicks] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const errorElements = SCENE_ELEMENTS.filter(e => e.isError)
  const totalErrors = errorElements.length
  const foundErrors = errorElements.filter(e => foundElements.has(e.id)).length
  const pointsPerError = Math.round(mission.maxScore / totalErrors)

  const handleElementClick = (element: typeof SCENE_ELEMENTS[0]) => {
    if (foundElements.has(element.id)) return

    setClickedElement(element)
    setFoundElements(prev => new Set([...prev, element.id]))

    if (!element.isError) {
      setWrongClicks(prev => prev + 1)
    }
  }

  const handleFinish = () => {
    const score = Math.max(0, foundErrors * pointsPerError - wrongClicks * 5)
    setShowResults(true)
    saveAttempt({
      id: crypto.randomUUID(),
      learner_id: '', session_id: '',
      mission_id: mission.id,
      score: Math.min(score, mission.maxScore),
      max_score: mission.maxScore,
      completed_at: new Date().toISOString(),
      details: { foundErrors, wrongClicks, totalErrors },
      time_spent: 0,
    })
  }

  const finalScore = Math.max(0, Math.min(foundErrors * pointsPerError - wrongClicks * 5, mission.maxScore))

  if (showResults) {
    return (
      <div className="space-y-6 animate-slide-up">
        <div className="card text-center">
          <h2 className="text-xl font-bold mb-4">Diagnostic terminé !</h2>
          <ScoreDisplay score={finalScore} maxScore={mission.maxScore} size="lg" showAnimation />
          <p className="mt-3 text-gray-600 text-sm">
            {foundErrors}/{totalErrors} erreurs identifiées • {wrongClicks} faux clics
          </p>
        </div>

        {/* Corrections détaillées */}
        <div className="card">
          <h3 className="font-bold mb-3">🔍 Corrections</h3>
          <div className="space-y-3">
            {errorElements.map(el => (
              <div key={el.id} className={`p-3 rounded-xl text-sm ${foundElements.has(el.id) ? 'bg-success-50 border border-success-200' : 'bg-danger-50 border border-danger-200'}`}>
                <p className="font-semibold text-gray-900">{el.label}</p>
                <p className="text-gray-600 mt-1">{el.errorDescription}</p>
                <p className="text-primary-600 mt-1 font-medium">💡 {el.correctionHint}</p>
              </div>
            ))}
          </div>
        </div>

        <Button fullWidth onClick={onComplete}>Retour aux missions</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Consigne */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
        <p className="text-sm text-amber-800 font-medium">
          🔍 Observez cette scène du rayon peinture et cliquez sur les erreurs de communication que vous repérez.
        </p>
        <p className="text-xs text-amber-600 mt-1">
          Erreurs trouvées : {foundErrors}/{totalErrors} • Faux clics : {wrongClicks}
        </p>
      </div>

      {/* Scène interactive */}
      <div className="card p-2 relative">
        <div className="relative">
          <StoreScene showErrors={false} />

          {/* Zones cliquables superposées */}
          {SCENE_ELEMENTS.map(el => {
            const isFound = foundElements.has(el.id)
            return (
              <button
                key={el.id}
                onClick={() => handleElementClick(el)}
                disabled={isFound}
                className={`hotspot ${isFound ? (el.isError ? 'found-error' : 'found-correct') : ''}`}
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  width: `${el.width}%`,
                  height: `${el.height}%`,
                }}
                title={isFound ? el.label : 'Cliquez pour inspecter'}
              >
                {isFound && (
                  <span className="absolute top-1 right-1 text-xs">
                    {el.isError ? '❌' : '✅'}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Feedback du dernier clic */}
      {clickedElement && (
        <FeedbackBanner
          type={clickedElement.isError ? 'success' : 'warning'}
          title={clickedElement.isError ? 'Erreur identifiée !' : 'Cet élément est correct'}
          message={clickedElement.isError ? (clickedElement.errorDescription || '') : `"${clickedElement.label}" est correctement placé.`}
          visible
        />
      )}

      {/* Bouton terminer */}
      <Button fullWidth variant={foundErrors >= totalErrors ? 'success' : 'secondary'} onClick={handleFinish}>
        {foundErrors >= totalErrors ? '✅ Terminer le diagnostic' : `Terminer (${foundErrors}/${totalErrors} erreurs trouvées)`}
      </Button>
    </div>
  )
}
