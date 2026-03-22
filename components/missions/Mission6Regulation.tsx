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
  const [selectedChoices, setSelectedChoices] = useState<Set<string>>(new Set())
  const [showCaseResult, setShowCaseResult] = useState(false)
  const [showFinalResults, setShowFinalResults] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [caseScores, setCaseScores] = useState<number[]>([])

  const caseData = REGULATION_CASES[currentIdx]
  const pointsPerCase = Math.round(mission.maxScore / REGULATION_CASES.length)

  const toggleChoice = (id: string) => {
    if (showCaseResult) return
    setSelectedChoices(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleValidateCase = () => {
    const correctErrors = caseData.choices.filter(c => c.isError)
    const wrongChoices = caseData.choices.filter(c => !c.isError)

    // Points pour les bonnes erreurs trouvées
    const foundCorrect = correctErrors.filter(c => selectedChoices.has(c.id)).length
    // Pénalité pour les faux choix sélectionnés
    const falsePositives = wrongChoices.filter(c => selectedChoices.has(c.id)).length

    const caseScore = Math.max(0, Math.round(
      (foundCorrect / correctErrors.length) * pointsPerCase - falsePositives * 5
    ))

    setTotalScore(prev => prev + caseScore)
    setCaseScores(prev => [...prev, caseScore])
    setShowCaseResult(true)
  }

  const handleNextCase = () => {
    setSelectedChoices(new Set())
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
        details: { caseScores },
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
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-bold text-red-800 mb-2">⚖️ Points clés réglementaires</h3>
          <ul className="text-sm text-red-700 space-y-2">
            <li>• Le prix au litre/kilo est <strong>obligatoire</strong> sur toute étiquette</li>
            <li>• Les promotions doivent indiquer dates, conditions et prix de référence</li>
            <li>• Les pictogrammes de sécurité sont <strong>obligatoires</strong> pour les produits chimiques</li>
            <li>• La dénomination complète du produit est exigée</li>
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

        {/* Visuel de l'étiquette/affiche problématique */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
          {caseData.id === 'reg-1' && (
            <div className="bg-white rounded-lg p-3 border border-gray-300 max-w-[200px] mx-auto">
              <div className="bg-green-500 rounded-t-lg px-2 py-1 -mx-3 -mt-3 mb-2">
                <span className="text-white text-xs font-bold">PRIX</span>
              </div>
              <p className="text-xs text-gray-500">Peinture Acrylique</p>
              <p className="text-2xl font-extrabold text-gray-900 text-center my-1">34,90 € <span className="text-xs font-normal text-gray-500">TTC</span></p>
              <p className="text-xs text-gray-400">2,5 L</p>
            </div>
          )}
          {caseData.id === 'reg-2' && (
            <div className="bg-gradient-to-b from-orange-400 to-orange-500 rounded-lg p-4 text-center text-white max-w-[220px] mx-auto">
              <p className="text-lg font-extrabold">MÉGA PROMO</p>
              <p className="text-sm font-bold">PEINTURE</p>
              <p className="text-3xl font-black mt-1">-20%</p>
            </div>
          )}
          {caseData.id === 'reg-3' && (
            <div className="bg-white rounded-lg p-3 border border-gray-300 max-w-[200px] mx-auto">
              <p className="font-bold text-sm text-gray-900">Peinture Glycéro Blanche</p>
              <p className="text-xs text-gray-500 mt-1">Volume : 2,5 L</p>
              <p className="text-lg font-bold text-gray-900 mt-1">42,90 €</p>
              <p className="text-xs text-gray-400 mt-1 italic">Aucune autre information affichée</p>
            </div>
          )}
        </div>

        {/* Choix (vrais erreurs + pièges) */}
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Cochez les erreurs réglementaires ({selectedChoices.size} sélectionnées)
        </p>
        <p className="text-xs text-gray-400 mb-3">
          ⚠️ Attention : certaines propositions ne sont pas de vraies erreurs.
        </p>

        <div className="space-y-2">
          {caseData.choices.map(choice => {
            const isSelected = selectedChoices.has(choice.id)
            let classes = 'border-gray-200 hover:border-gray-300'

            if (showCaseResult) {
              if (choice.isError && isSelected) classes = 'border-green-400 bg-green-50'       // trouvé
              else if (choice.isError && !isSelected) classes = 'border-amber-400 bg-amber-50'  // raté
              else if (!choice.isError && isSelected) classes = 'border-red-400 bg-red-50'      // piège
              else classes = 'border-gray-200 bg-gray-50'                                        // correct non-erreur
            } else if (isSelected) {
              classes = 'border-red-500 bg-red-50'
            }

            return (
              <button
                key={choice.id}
                onClick={() => toggleChoice(choice.id)}
                disabled={showCaseResult}
                className={`w-full p-3 rounded-xl border-2 text-left text-sm transition-all flex items-start gap-2 ${classes}`}
              >
                <span className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                  isSelected ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300'
                } ${showCaseResult && choice.isError && isSelected ? 'bg-green-500 border-green-500' : ''}
                  ${showCaseResult && !choice.isError && isSelected ? 'bg-red-500 border-red-500' : ''}`}>
                  {isSelected && '✓'}
                </span>
                <span>{choice.text}</span>
                {showCaseResult && (
                  <span className="ml-auto flex-shrink-0">
                    {choice.isError && isSelected && '✅'}
                    {choice.isError && !isSelected && '⚠️'}
                    {!choice.isError && isSelected && '❌'}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {showCaseResult && (
        <FeedbackBanner
          type={caseScores[caseScores.length - 1] >= pointsPerCase * 0.7 ? 'success' : 'warning'}
          title={caseScores[caseScores.length - 1] >= pointsPerCase * 0.7 ? 'Bien joué !' : 'Résultat partiel'}
          message={`${caseScores[caseScores.length - 1]}/${pointsPerCase} points sur ce cas.`}
          visible
        />
      )}

      {!showCaseResult ? (
        <Button fullWidth onClick={handleValidateCase} disabled={selectedChoices.size === 0}>
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
