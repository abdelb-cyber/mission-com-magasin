'use client'

import { useState } from 'react'
import { MissionDefinition } from '@/types'
import { ILV_BUILD_OPTIONS } from '@/data/missions'
import { saveAttempt } from '@/lib/store'
import Button from '@/components/ui/Button'
import ScoreDisplay from '@/components/ui/ScoreDisplay'

interface Props {
  mission: MissionDefinition
  onComplete: () => void
}

export default function Mission4BuildILV({ mission, onComplete }: Props) {
  const [selectedElements, setSelectedElements] = useState<Set<string>>(new Set())
  const [showResults, setShowResults] = useState(false)
  const [ratings, setRatings] = useState<Record<string, number>>({})

  const toggleElement = (id: string) => {
    setSelectedElements(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleValidate = () => {
    // Évaluation automatique
    const selected = ILV_BUILD_OPTIONS.elements.filter(e => selectedElements.has(e.id))
    const newRatings: Record<string, number> = {}

    // Lisibilité : bonus si panneau + bandeau sélectionnés
    const hasSignaletique = selected.some(e => e.category === 'signalétique')
    const hasBandeau = selected.some(e => e.category === 'information')
    newRatings['lisibilite'] = hasSignaletique && hasBandeau ? 20 : hasSignaletique || hasBandeau ? 10 : 0

    // Cohérence : bonus si au moins 4 éléments complémentaires
    newRatings['coherence'] = selected.length >= 4 ? 20 : selected.length >= 2 ? 10 : 0

    // Utilité : chaque élément sert un objectif
    newRatings['utilite'] = Math.min(20, selected.length * 4)

    // Conformité : étiquette prix obligatoire
    const hasEtiquette = selectedElements.has('etiquette')
    newRatings['conformite'] = hasEtiquette ? 20 : 0

    // Accessibilité : fléchage + plan
    const hasFlechage = selectedElements.has('flechage')
    const hasPlan = selectedElements.has('plan')
    newRatings['accessibilite'] = hasFlechage && hasPlan ? 20 : hasFlechage || hasPlan ? 10 : 0

    setRatings(newRatings)
    const totalScore = Object.values(newRatings).reduce((sum, v) => sum + v, 0)

    saveAttempt({
      id: crypto.randomUUID(),
      learner_id: '', session_id: '',
      mission_id: mission.id,
      score: Math.min(totalScore, mission.maxScore),
      max_score: mission.maxScore,
      completed_at: new Date().toISOString(),
      details: { selected: [...selectedElements], ratings: newRatings },
      time_spent: 0,
    })

    setShowResults(true)
  }

  const totalScore = Object.values(ratings).reduce((sum, v) => sum + v, 0)

  if (showResults) {
    return (
      <div className="space-y-6 animate-slide-up">
        <div className="card text-center">
          <h2 className="text-xl font-bold mb-4">ILV évaluée !</h2>
          <ScoreDisplay score={Math.min(totalScore, mission.maxScore)} maxScore={mission.maxScore} size="lg" showAnimation />
        </div>

        {/* Évaluation détaillée */}
        <div className="card">
          <h3 className="font-bold mb-3">📊 Évaluation par critère</h3>
          <div className="space-y-3">
            {ILV_BUILD_OPTIONS.criteria.map(criterion => {
              const note = ratings[criterion.id] || 0
              const pct = (note / criterion.maxPoints) * 100
              return (
                <div key={criterion.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{criterion.label}</span>
                    <span className={`font-bold ${pct >= 80 ? 'text-success-600' : pct >= 50 ? 'text-amber-500' : 'text-danger-500'}`}>
                      {note}/{criterion.maxPoints}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${pct >= 80 ? 'bg-success-500' : pct >= 50 ? 'bg-amber-400' : 'bg-danger-400'}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{criterion.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Conseils */}
        <div className="card bg-primary-50 border-primary-200">
          <h3 className="font-bold text-primary-800 mb-2">💡 Conseil</h3>
          <p className="text-sm text-primary-700">
            Une ILV efficace combine signalétique visible (panneaux, fléchage), information réglementaire (étiquettes prix conformes)
            et aide à la décision (fiches conseil). Chaque élément doit servir un objectif d&apos;information clair.
          </p>
        </div>

        <Button fullWidth onClick={onComplete}>Retour aux missions</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
        <p className="text-sm text-indigo-800 font-medium">
          🏗️ Vous aménagez le rayon peinture du magasin. Sélectionnez les éléments d&apos;ILV nécessaires pour une signalétique complète et efficace.
        </p>
      </div>

      {/* Maquette du rayon */}
      <div className="card">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">Votre rayon peinture</h3>
        <div className="bg-gray-100 rounded-xl p-4 relative min-h-[200px]">
          {/* Représentation simplifiée du rayon */}
          <svg width="100%" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            {/* Gondole */}
            <rect x="20" y="30" width="260" height="140" fill="white" stroke="#D1D5DB" strokeWidth="1" rx="4"/>
            {[40, 75, 110, 145].map(y => (
              <rect key={y} x="20" y={y} width="260" height="3" fill="#9CA3AF"/>
            ))}
            {/* Produits */}
            {[0,1,2,3,4,5,6,7].map(i => (
              <rect key={`p-${i}`} x={30 + i * 32} y={45} width={25} height={28} rx="2"
                fill={['#BFDBFE','#BBF7D0','#FDE68A','#FECACA','#E9D5FF','#BFDBFE','#FDE68A','#BBF7D0'][i]}/>
            ))}
            {/* Éléments sélectionnés */}
            {selectedElements.has('panneau-suspendu') && (
              <g>
                <rect x="80" y="5" width="140" height="22" rx="3" fill="#1E40AF"/>
                <text x="150" y="19" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PEINTURE</text>
              </g>
            )}
            {selectedElements.has('bandeau') && (
              <rect x="20" y="27" width="260" height="8" rx="1" fill="#3B82F6" opacity="0.9"/>
            )}
            {selectedElements.has('etiquette') && (
              <g>
                {[0,1,2].map(i => (
                  <rect key={`et-${i}`} x={35 + i * 90} y={78} width={35} height={12} rx="2" fill="#22C55E" opacity="0.8"/>
                ))}
              </g>
            )}
            {selectedElements.has('flechage') && (
              <polygon points="150,175 160,190 156,190 156,198 144,198 144,190 140,190" fill="#3B82F6" opacity="0.6"/>
            )}
            {selectedElements.has('separateur') && (
              <rect x="148" y="30" width="4" height="140" fill="#F97316" opacity="0.6"/>
            )}
            {selectedElements.has('fiche-info') && (
              <rect x="240" y="50" width="30" height="40" rx="2" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1"/>
            )}
          </svg>
        </div>
      </div>

      {/* Sélection des éléments */}
      <div className="card">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">
          Sélectionnez les éléments ({selectedElements.size} choisis)
        </h3>
        <div className="space-y-2">
          {ILV_BUILD_OPTIONS.elements.map(el => {
            const isSelected = selectedElements.has(el.id)
            return (
              <button
                key={el.id}
                onClick={() => toggleElement(el.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs flex-shrink-0 ${
                  isSelected ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-300'
                }`}>
                  {isSelected && '✓'}
                </span>
                <div>
                  <p className="font-medium text-sm text-gray-800">{el.label}</p>
                  <p className="text-xs text-gray-500">{el.category}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <Button fullWidth onClick={handleValidate} disabled={selectedElements.size === 0}>
        Valider ma composition ({selectedElements.size} éléments)
      </Button>
    </div>
  )
}
