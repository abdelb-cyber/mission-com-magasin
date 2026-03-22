'use client'

import { useState } from 'react'
import { MissionDefinition } from '@/types'
import { REGULATION_CASES } from '@/data/missions'
import { saveAttempt } from '@/lib/store'
import Button from '@/components/ui/Button'
import ScoreDisplay from '@/components/ui/ScoreDisplay'
import FeedbackBanner from '@/components/ui/FeedbackBanner'

interface Props {
  mission: MissionDefinition
  onComplete: () => void
}

export default function Mission6Regulation({ mission, onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [foundErrors, setFoundErrors] = useState<Set<string>>(new Set())
  const [showCaseResult, setShowCaseResult] = useState(false)
  const [showFinalResults, setShowFinalResults] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  const caseData = REGULATION_CASES[currentIdx]
  const pointsPerCase = Math.round(mission.maxScore / REGULATION_CASES.length)

  const toggleError = (error: string) => {
    if (showCaseResult) return
    setFoundErrors(prev => {
      const next = new Set(prev)
      if (next.has(error)) next.delete(error)
      else next.add(error)
      return next
    })
  }

  const handleValidateCase = () => {
    const correctErrors = new Set(caseData.errors)
    const found = [...foundErrors].filter(e => correctErrors.has(e))
    const caseScore = Math.round((found.length / caseData.errors.length) * pointsPerCase)
    setTotalScore(prev => prev + caseScore)
    setShowCaseResult(true)
  }

  const handleNextCase = () => {
    setFoundErrors(new Set())
    setShowCaseResult(false)

    if (currentIdx + 1 >= REGULATION_CASES.length) {
      setShowFinalResults(true)
      saveAttempt({
        id: crypto.randomUUID(),
        learner_id: '', session_id: '',
        mission_id: mission.id,
        score: Math.min(totalScore, mission.maxScore),
        max_score: mission.maxScore,
        completed_at: new Date().toISOString(),
        details: {},
        time_spent: 0,
      })
    } else {
      setCurrentIdx(prev => prev + 1)
    }
  }

  if (showFinalResults) {
    return (
      <div className="space-y-6 animate-slide-up">
        <div className="card text-center">
          <h2 className="text-xl font-bold mb-4">Réglementation maîtrisée !</h2>
          <ScoreDisplay score={Math.min(totalScore, mission.maxScore)} maxScore={mission.maxScore} size="lg" showAnimation />
        </div>
        <div className="card bg-red-50 border-red-200">
          <h3 className="font-bold text-red-800 mb-2">⚖️ Points clés réglementaires</h3>
          <ul className="text-sm text-red-700 space-y-2">
            <li>• Le prix au litre/kilo est obligatoire sur toute étiquette</li>
            <li>• Les promotions doivent indiquer dates, conditions et prix de référence</li>
            <li>• Les pictogrammes de sécurité sont obligatoires pour les produits chimiques</li>
            <li>• Toute communication périmée doit être retirée immédiatement</li>
          </ul>
        </div>
        <Button fullWidth onClick={onComplete}>Retour aux missions</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Cas {currentIdx + 1} / {REGULATION_CASES.length}</span>
        <span className="font-semibold text-primary-600">{totalScore} pts</span>
      </div>

      <div className="card animate-slide-up" key={caseData.id}>
        <h3 className="font-bold text-gray-900">{caseData.title}</h3>
        <p className="text-sm text-gray-600 mt-1 mb-4">{caseData.description}</p>

        {/* Comparaison côte à côte */}
        <div className="grid grid-cols-2 gap-3">
          {/* Version conforme */}
          <div className="bg-success-50 rounded-xl p-3 border border-success-200">
            <p className="text-xs font-semibold text-success-700 mb-2">✅ Version conforme</p>
            {Object.entries(caseData.correct).map(([key, value]) => (
              value && (
                <div key={key} className="mb-1">
                  <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-xs font-medium text-gray-800">{value}</p>
                </div>
              )
            ))}
          </div>

          {/* Version non conforme */}
          <div className="bg-danger-50 rounded-xl p-3 border border-danger-200">
            <p className="text-xs font-semibold text-danger-700 mb-2">❌ Version non conforme</p>
            {Object.entries(caseData.incorrect).map(([key, value]) => (
              <div key={key} className="mb-1">
                <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-xs font-medium text-gray-800">{value || <span className="italic text-danger-400">— manquant —</span>}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sélection des erreurs */}
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Quelles erreurs identifiez-vous ? ({foundErrors.size} sélectionnées)
          </p>
          <div className="space-y-2">
            {caseData.errors.map((error, i) => {
              const isSelected = foundErrors.has(error)
              return (
                <button
                  key={i}
                  onClick={() => toggleError(error)}
                  disabled={showCaseResult}
                  className={`w-full p-3 rounded-xl border-2 text-left text-sm transition-all ${
                    showCaseResult
                      ? isSelected ? 'border-success-400 bg-success-50' : 'border-danger-300 bg-danger-50'
                      : isSelected ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={`inline-block w-5 h-5 rounded border mr-2 text-center text-xs leading-5 ${
                    isSelected ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300'
                  }`}>
                    {isSelected && '✓'}
                  </span>
                  {error}
                  {showCaseResult && !isSelected && <span className="ml-2 text-danger-500">← manquée</span>}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {showCaseResult && (
        <FeedbackBanner
          type={foundErrors.size === caseData.errors.length ? 'success' : 'warning'}
          title={foundErrors.size === caseData.errors.length ? 'Toutes les erreurs trouvées !' : 'Résultat partiel'}
          message={`${[...foundErrors].filter(e => caseData.errors.includes(e)).length}/${caseData.errors.length} erreurs correctement identifiées.`}
          visible
        />
      )}

      {!showCaseResult ? (
        <Button fullWidth onClick={handleValidateCase} disabled={foundErrors.size === 0}>
          Valider mes réponses
        </Button>
      ) : (
        <Button fullWidth onClick={handleNextCase}>
          {currentIdx + 1 >= REGULATION_CASES.length ? 'Voir les résultats' : 'Cas suivant →'}
        </Button>
      )}
    </div>
  )
}
