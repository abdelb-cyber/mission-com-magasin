'use client'

import { useState } from 'react'
import { MissionDefinition } from '@/types'
import { PLV_BUILD_OPTIONS } from '@/data/missions'
import { saveAttempt } from '@/lib/store'
import Button from '@/components/ui/Button'
import ScoreDisplay from '@/components/ui/ScoreDisplay'

interface Props {
  mission: MissionDefinition
  onComplete: () => void
}

export default function Mission5BuildPLV({ mission, onComplete }: Props) {
  const [step, setStep] = useState(0) // 0-3 = choix, 4 = résultat
  const [choices, setChoices] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const steps = [
    { key: 'visuel', label: '🖼️ Quel visuel ?', options: PLV_BUILD_OPTIONS.visuels },
    { key: 'promesse', label: '💬 Quelle promesse ?', options: PLV_BUILD_OPTIONS.promesses },
    { key: 'emplacement', label: '📍 Quel emplacement ?', options: PLV_BUILD_OPTIONS.emplacements },
    { key: 'format', label: '📐 Quel format ?', options: PLV_BUILD_OPTIONS.formats },
  ]

  const handleSelect = (key: string, id: string) => {
    setChoices(prev => ({ ...prev, [key]: id }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else evaluateAndFinish()
  }

  const evaluateAndFinish = () => {
    let score = 0

    // Visuel : avant/après ou photo en situation = meilleur
    if (choices.visuel === 'avant-apres') score += 25
    else if (choices.visuel === 'photo-produit') score += 20
    else if (choices.visuel === 'illustration') score += 15
    else score += 5

    // Promesse : facilité ou promo = fort impact
    if (choices.promesse === 'facilite' || choices.promesse === 'promo-prix') score += 25
    else score += 15

    // Emplacement
    const empl = PLV_BUILD_OPTIONS.emplacements.find(e => e.id === choices.emplacement)
    score += empl?.points || 5

    // Format adapté à l'emplacement
    if (choices.emplacement === 'tete-gondole' && choices.format === 'totem') score += 25
    else if (choices.emplacement === 'allee-centrale' && choices.format === 'kakemono') score += 25
    else if (choices.emplacement === 'entree' && choices.format === 'stop-rayon') score += 10
    else score += 15

    score = Math.min(score, mission.maxScore)

    saveAttempt({
      id: crypto.randomUUID(),
      learner_id: '', session_id: '',
      mission_id: mission.id,
      score,
      max_score: mission.maxScore,
      completed_at: new Date().toISOString(),
      details: choices,
      time_spent: 0,
    })
    setShowResults(true)
  }

  if (showResults) {
    const score = Math.min(
      (() => {
        let s = 0
        if (choices.visuel === 'avant-apres') s += 25; else if (choices.visuel === 'photo-produit') s += 20; else if (choices.visuel === 'illustration') s += 15; else s += 5
        if (choices.promesse === 'facilite' || choices.promesse === 'promo-prix') s += 25; else s += 15
        const empl = PLV_BUILD_OPTIONS.emplacements.find(e => e.id === choices.emplacement); s += empl?.points || 5
        if (choices.emplacement === 'tete-gondole' && choices.format === 'totem') s += 25
        else if (choices.emplacement === 'allee-centrale' && choices.format === 'kakemono') s += 25
        else s += 15
        return s
      })(),
      mission.maxScore
    )

    const visuelLabel = PLV_BUILD_OPTIONS.visuels.find(v => v.id === choices.visuel)?.label
    const promesseLabel = PLV_BUILD_OPTIONS.promesses.find(p => p.id === choices.promesse)?.label
    const emplacementLabel = PLV_BUILD_OPTIONS.emplacements.find(e => e.id === choices.emplacement)?.label
    const formatLabel = PLV_BUILD_OPTIONS.formats.find(f => f.id === choices.format)?.label

    return (
      <div className="space-y-6 animate-slide-up">
        <div className="card text-center">
          <h2 className="text-xl font-bold mb-4">PLV créée !</h2>
          <ScoreDisplay score={score} maxScore={mission.maxScore} size="lg" showAnimation />
        </div>

        {/* Mockup de la PLV créée */}
        <div className="card">
          <h3 className="font-bold mb-3">Votre PLV</h3>
          <div className="bg-gradient-to-b from-pink-50 to-white rounded-xl p-4 border-2 border-pink-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Format : {formatLabel}</p>
              <div className="bg-pink-500 text-white rounded-xl p-4 mb-3">
                <p className="text-sm font-bold">{promesseLabel}</p>
              </div>
              <p className="text-xs text-gray-600">Visuel : {visuelLabel}</p>
              <p className="text-xs text-gray-600 mt-1">Emplacement : {emplacementLabel}</p>
            </div>
          </div>
        </div>

        {/* Les 4 règles d'or */}
        <div className="card">
          <h3 className="font-bold mb-3">✨ Les 4 règles d&apos;or de la PLV</h3>
          <div className="grid grid-cols-2 gap-2">
            {PLV_BUILD_OPTIONS.reglesOr.map(r => (
              <div key={r.id} className="bg-pink-50 rounded-xl p-3 text-center">
                <p className="font-bold text-pink-800 text-sm">{r.label}</p>
                <p className="text-xs text-pink-600 mt-1">{r.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Button fullWidth onClick={onComplete}>Retour aux missions</Button>
      </div>
    )
  }

  const currentStep = steps[step]

  return (
    <div className="space-y-4">
      {/* Progression étapes */}
      <div className="flex gap-1">
        {steps.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= step ? 'bg-pink-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      <div className="card animate-slide-up" key={step}>
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">
          Étape {step + 1}/4
        </p>
        <h3 className="font-bold text-lg text-gray-900 mb-4">{currentStep.label}</h3>
        <p className="text-sm text-gray-500 mb-4">
          Contexte : vous créez une PLV pour le rayon peinture lors d&apos;une opération promotionnelle.
        </p>

        <div className="space-y-2">
          {currentStep.options.map((option: { id: string; label: string }) => {
            const isSelected = choices[currentStep.key] === option.id
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(currentStep.key, option.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium text-sm">{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <Button
        fullWidth
        onClick={handleNext}
        disabled={!choices[currentStep.key]}
      >
        {step < 3 ? 'Étape suivante →' : 'Voir le résultat'}
      </Button>

      {step > 0 && (
        <button className="w-full text-center text-sm text-gray-500 py-2" onClick={() => setStep(step - 1)}>
          ← Étape précédente
        </button>
      )}
    </div>
  )
}
