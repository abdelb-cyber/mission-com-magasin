'use client'

import { useState, useCallback } from 'react'
import { MissionDefinition } from '@/types'
import { DRAG_ITEMS, SYNTHESES } from '@/data/missions'
import { saveAttempt } from '@/lib/store'
import SupportSVG from '@/components/svg/SupportSVG'
import Button from '@/components/ui/Button'
import ScoreDisplay from '@/components/ui/ScoreDisplay'
import FeedbackBanner from '@/components/ui/FeedbackBanner'

interface Props {
  mission: MissionDefinition
  onComplete: () => void
}

type Category = 'ilv' | 'plv'

export default function Mission1DragSort({ mission, onComplete }: Props) {
  // Mélanger les items
  const [items] = useState(() => [...DRAG_ITEMS].sort(() => Math.random() - 0.5))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ilvItems, setIlvItems] = useState<string[]>([])
  const [plvItems, setPlvItems] = useState<string[]>([])
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [answers, setAnswers] = useState<Array<{ label: string; choix: string; correct: string; ok: boolean }>>([])

  const currentItem = items[currentIndex]
  const isFinished = currentIndex >= items.length

  const handleChoice = useCallback((choice: Category) => {
    if (isFinished) return

    const item = items[currentIndex]
    const isCorrect = item.category === choice

    // Scoring : chaque bonne réponse vaut des points, total = 100
    const pointsPerCard = currentIndex === items.length - 1
      ? mission.maxScore - Math.floor(mission.maxScore / items.length) * (items.length - 1)
      : Math.floor(mission.maxScore / items.length)

    // Enregistrer la réponse détaillée
    setAnswers(prev => [...prev, { label: item.label, choix: choice, correct: item.category, ok: isCorrect }])

    if (isCorrect) {
      setScore(prev => prev + pointsPerCard)
      setFeedback({ type: 'success', message: `Correct ! "${item.label}" est bien un support d'${item.category === 'ilv' ? 'ILV' : 'PLV'}.` })
    } else {
      setErrors(prev => [...prev, item.label])
      setFeedback({ type: 'error', message: `"${item.label}" est un support d'${item.category === 'ilv' ? 'ILV (information)' : 'PLV (publicité)'}, pas d'${choice === 'ilv' ? 'ILV' : 'PLV'}.` })
    }

    if (choice === 'ilv') setIlvItems(prev => [...prev, item.id])
    else setPlvItems(prev => [...prev, item.id])

    setTimeout(() => {
      setFeedback(null)
      if (currentIndex + 1 >= items.length) {
        setShowResults(true)
        const finalScore = isCorrect ? score + pointsPerCard : score
        saveAttempt({
          id: crypto.randomUUID(),
          learner_id: '',
          session_id: '',
          mission_id: mission.id,
          score: Math.min(finalScore, mission.maxScore),
          max_score: mission.maxScore,
          completed_at: new Date().toISOString(),
          details: { errors, answers: [...answers, { label: item.label, choix: choice, correct: item.category, ok: isCorrect }] },
          time_spent: 0,
        })
      }
      setCurrentIndex(prev => prev + 1)
    }, 1500)
  }, [currentIndex, items, isFinished, mission, score, errors])

  if (showResults) {
    const finalScore = Math.min(score, mission.maxScore)
    return (
      <div className="space-y-6 animate-slide-up">
        <div className="card text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Mission terminée !</h2>
          <ScoreDisplay score={finalScore} maxScore={mission.maxScore} size="lg" showAnimation />

          {finalScore >= 80 ? (
            <p className="mt-4 text-success-600 font-semibold">Excellent ! Vous maîtrisez la distinction ILV / PLV. 🎉</p>
          ) : finalScore >= 50 ? (
            <p className="mt-4 text-amber-600 font-semibold">Bien ! Quelques confusions à revoir. 📚</p>
          ) : (
            <p className="mt-4 text-danger-500 font-semibold">Courage ! Revoyez les définitions ILV et PLV. 💪</p>
          )}

          {errors.length > 0 && (
            <div className="mt-4 text-left bg-danger-50 rounded-xl p-4">
              <p className="font-semibold text-danger-600 text-sm mb-2">Erreurs sur :</p>
              <ul className="text-sm text-danger-500 space-y-1">
                {errors.map((e, i) => <li key={i}>• {e}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Synthèse pédagogique */}
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-3">📝 À retenir</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="font-bold text-blue-800 text-sm mb-2">ILV – Informer</p>
              <ul className="text-xs text-blue-700 space-y-1">
                {SYNTHESES.ilvVsPlv.ilv.objectifs.map((o, i) => <li key={i}>• {o}</li>)}
              </ul>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <p className="font-bold text-orange-800 text-sm mb-2">PLV – Promouvoir</p>
              <ul className="text-xs text-orange-700 space-y-1">
                {SYNTHESES.ilvVsPlv.plv.objectifs.map((o, i) => <li key={i}>• {o}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <Button fullWidth onClick={onComplete}>
          Retour aux missions
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Progression */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Carte {currentIndex + 1} / {items.length}</span>
        <span className="font-semibold text-primary-600">{score} pts</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${(currentIndex / items.length) * 100}%` }} />
      </div>

      {/* Carte courante */}
      {currentItem && (
        <div className="card text-center animate-slide-up" key={currentItem.id}>
          <div className="flex justify-center mb-4">
            <SupportSVG type={currentItem.svgType} size={100} />
          </div>
          <h3 className="font-bold text-lg text-gray-900">{currentItem.label}</h3>
          <p className="text-gray-500 text-sm mt-2">{currentItem.description}</p>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <FeedbackBanner
          type={feedback.type}
          title={feedback.type === 'success' ? 'Bonne réponse !' : 'Pas tout à fait...'}
          message={feedback.message}
          visible
        />
      )}

      {/* Zones de dépôt */}
      {!feedback && currentItem && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleChoice('ilv')}
            className="p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl text-center hover:bg-blue-100 active:bg-blue-200 transition-all"
          >
            <p className="text-3xl mb-2">ℹ️</p>
            <p className="font-bold text-blue-800">ILV</p>
            <p className="text-xs text-blue-600 mt-1">Information</p>
          </button>
          <button
            onClick={() => handleChoice('plv')}
            className="p-6 bg-orange-50 border-2 border-orange-200 rounded-2xl text-center hover:bg-orange-100 active:bg-orange-200 transition-all"
          >
            <p className="text-3xl mb-2">📢</p>
            <p className="font-bold text-orange-800">PLV</p>
            <p className="text-xs text-orange-600 mt-1">Publicité</p>
          </button>
        </div>
      )}

      {/* Compteurs */}
      <div className="flex justify-between text-xs text-gray-400 px-2">
        <span>ILV : {ilvItems.length} cartes</span>
        <span>PLV : {plvItems.length} cartes</span>
      </div>
    </div>
  )
}
