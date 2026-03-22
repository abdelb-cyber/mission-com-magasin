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
      details: {
        foundErrors, wrongClicks, totalErrors,
        erreursTrouvees: errorElements.filter(e => foundElements.has(e.id)).map(e => e.label),
        erreursManquees: errorElements.filter(e => !foundElements.has(e.id)).map(e => e.label),
        fauxClicsDetails: SCENE_ELEMENTS.filter(e => !e.isError && foundElements.has(e.id)).map(e => e.label),
      },
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

        <div className="card">
          <h3 className="font-bold mb-3">🔍 Corrections détaillées</h3>
          <div className="space-y-3">
            {errorElements.map(el => (
              <div key={el.id} className={`p-3 rounded-xl text-sm ${foundElements.has(el.id) ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-start gap-2">
                  <span>{foundElements.has(el.id) ? '✅' : '❌'}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{el.label}</p>
                    <p className="text-gray-600 mt-1">{el.errorDescription}</p>
                    <p className="text-blue-600 mt-1 font-medium text-xs">💡 {el.correctionHint}</p>
                  </div>
                </div>
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
      <div className="bg-white border-2 border-amber-300 rounded-xl p-3">
        <p className="text-sm text-gray-800 font-medium">
          🔍 Observez cette scène du rayon peinture et <strong>cliquez sur les erreurs</strong> de communication.
        </p>
        <div className="flex items-center gap-4 mt-2 text-xs">
          <span className="text-green-600 font-bold">✅ Trouvées : {foundErrors}/{totalErrors}</span>
          <span className="text-red-500 font-medium">❌ Faux clics : {wrongClicks}</span>
        </div>
      </div>

      {/* Scène interactive */}
      <div className="card p-2">
        <div className="relative bg-gray-50 rounded-xl overflow-hidden">
          <StoreScene />

          {/* Zones cliquables superposées sur la scène */}
          {SCENE_ELEMENTS.map(el => {
            const isFound = foundElements.has(el.id)
            return (
              <button
                key={el.id}
                onClick={() => handleElementClick(el)}
                disabled={isFound}
                className="absolute transition-all duration-200"
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  width: `${el.width}%`,
                  height: `${el.height}%`,
                  border: isFound
                    ? el.isError ? '3px solid #EF4444' : '3px solid #22C55E'
                    : '2px solid transparent',
                  borderRadius: '6px',
                  backgroundColor: isFound
                    ? el.isError ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)'
                    : 'transparent',
                  cursor: isFound ? 'default' : 'pointer',
                }}
              >
                {isFound && (
                  <span className="absolute -top-2 -right-2 text-base drop-shadow-md">
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
          message={clickedElement.isError
            ? (clickedElement.errorDescription || '')
            : `"${clickedElement.label}" est bien positionné.`}
          visible
        />
      )}

      {/* Bouton terminer */}
      <Button
        fullWidth
        variant={foundErrors >= totalErrors ? 'success' : 'secondary'}
        onClick={handleFinish}
      >
        {foundErrors >= totalErrors
          ? '✅ Terminer le diagnostic'
          : `Terminer (${foundErrors}/${totalErrors} erreurs trouvées)`}
      </Button>
    </div>
  )
}
