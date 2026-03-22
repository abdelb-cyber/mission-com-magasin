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
    const selected = ILV_BUILD_OPTIONS.elements.filter(e => selectedElements.has(e.id))
    const correctSelected = selected.filter(e => e.isCorrect)
    const wrongSelected = selected.filter(e => !e.isCorrect)
    const newRatings: Record<string, number> = {}

    // Lisibilité
    const hasSignaletique = correctSelected.some(e => e.category === 'signalétique')
    const hasBandeau = correctSelected.some(e => e.category === 'information')
    newRatings['lisibilite'] = hasSignaletique && hasBandeau ? 20 : hasSignaletique || hasBandeau ? 10 : 0

    // Cohérence : bonus si bons éléments, malus si PLV mélangée
    const goodCount = correctSelected.length
    newRatings['coherence'] = Math.max(0, (goodCount >= 4 ? 20 : goodCount >= 2 ? 10 : 0) - wrongSelected.length * 7)

    // Utilité
    newRatings['utilite'] = Math.max(0, Math.min(20, correctSelected.length * 4) - wrongSelected.length * 5)

    // Conformité
    const hasEtiquette = selectedElements.has('etiquette')
    newRatings['conformite'] = hasEtiquette ? 20 : 0

    // Accessibilité
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

        {/* Alertes pièges */}
        {ILV_BUILD_OPTIONS.elements.filter(e => !e.isCorrect && selectedElements.has(e.id)).length > 0 && (
          <div className="card bg-red-50 border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">⚠️ Éléments PLV sélectionnés par erreur</h3>
            {ILV_BUILD_OPTIONS.elements.filter(e => !e.isCorrect && selectedElements.has(e.id)).map(e => (
              <p key={e.id} className="text-sm text-red-700">• <strong>{e.label}</strong> est un support de PLV (publicité), pas d&apos;ILV (information).</p>
            ))}
          </div>
        )}

        {/* Conseils */}
        <div className="card bg-primary-50 border border-primary-200">
          <h3 className="font-bold text-primary-800 mb-2">💡 Conseil</h3>
          <p className="text-sm text-primary-700">
            Une ILV efficace combine signalétique visible (panneaux, fléchage), information réglementaire (étiquettes prix conformes)
            et aide à la décision (fiches conseil). Attention à ne pas mélanger ILV et PLV : les supports promotionnels n&apos;ont pas leur place dans la signalétique d&apos;information.
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

      {/* Maquette du rayon – grande et lisible */}
      <div className="card">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">Votre rayon peinture — aperçu en direct</h3>
        <div className="bg-gray-50 rounded-xl p-2 relative">
          <svg width="100%" viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg">
            {/* Sol */}
            <rect x="0" y="230" width="320" height="50" fill="#E5E7EB"/>

            {/* Mur */}
            <rect x="0" y="0" width="320" height="230" fill="#F9FAFB"/>

            {/* Panneau suspendu */}
            {selectedElements.has('panneau-suspendu') ? (
              <g>
                <rect x="160" y="0" width="4" height="12" fill="#6B7280" x1="160"/>
                <rect x="85" y="12" width="150" height="30" rx="4" fill="#1E40AF"/>
                <text x="160" y="32" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PEINTURE</text>
              </g>
            ) : (
              <g>
                <rect x="85" y="12" width="150" height="30" rx="4" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="6,4"/>
                <text x="160" y="32" textAnchor="middle" fill="#D1D5DB" fontSize="9">Panneau suspendu</text>
              </g>
            )}

            {/* Gondole */}
            <rect x="20" y="50" width="280" height="170" fill="white" stroke="#D1D5DB" strokeWidth="1" rx="3"/>

            {/* Bandeau de gondole */}
            {selectedElements.has('bandeau') ? (
              <g>
                <rect x="20" y="50" width="280" height="14" rx="3" fill="#3B82F6"/>
                <rect x="20" y="60" width="280" height="4" fill="#3B82F6"/>
                <text x="160" y="61" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PEINTURES INTÉRIEURES</text>
              </g>
            ) : (
              <rect x="20" y="50" width="280" height="14" rx="3" fill="none" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4,3"/>
            )}

            {/* Étagères */}
            {[70, 110, 150, 190].map(y => (
              <rect key={y} x="20" y={y} width="280" height="3" fill="#9CA3AF"/>
            ))}

            {/* Séparateur */}
            {selectedElements.has('separateur') && (
              <g>
                <rect x="158" y="50" width="4" height="170" fill="#F97316" opacity="0.7" rx="1"/>
                <text x="140" y="138" textAnchor="end" fill="#F97316" fontSize="6" fontWeight="600">Mate</text>
                <text x="180" y="138" textAnchor="start" fill="#F97316" fontSize="6" fontWeight="600">Satin</text>
              </g>
            )}

            {/* Pots de peinture */}
            {[0,1,2,3,4,5,6,7].map(i => (
              <rect key={`p1-${i}`} x={28 + i*35} y={76} width={28} height={30} rx="3"
                fill={['#BFDBFE','#BBF7D0','#FDE68A','#FECACA','#E9D5FF','#BFDBFE','#FDE68A','#BBF7D0'][i]}
                stroke={['#93C5FD','#86EFAC','#FCD34D','#FCA5A5','#D8B4FE','#93C5FD','#FCD34D','#86EFAC'][i]}
                strokeWidth="1"/>
            ))}
            {[0,1,2,3,4,5,6,7].map(i => (
              <rect key={`p2-${i}`} x={28 + i*35} y={116} width={28} height={30} rx="3"
                fill={['#FDE68A','#BFDBFE','#BBF7D0','#E9D5FF','#FECACA','#FDE68A','#BFDBFE','#BBF7D0'][i]}
                stroke={['#FCD34D','#93C5FD','#86EFAC','#D8B4FE','#FCA5A5','#FCD34D','#93C5FD','#86EFAC'][i]}
                strokeWidth="1"/>
            ))}
            {[0,1,2,3,4,5,6,7].map(i => (
              <rect key={`p3-${i}`} x={28 + i*35} y={156} width={28} height={30} rx="3"
                fill={['#FECACA','#FDE68A','#BFDBFE','#BBF7D0','#BFDBFE','#E9D5FF','#FECACA','#FDE68A'][i]}
                stroke={['#FCA5A5','#FCD34D','#93C5FD','#86EFAC','#93C5FD','#D8B4FE','#FCA5A5','#FCD34D'][i]}
                strokeWidth="1"/>
            ))}

            {/* Étiquettes prix */}
            {selectedElements.has('etiquette') && (
              <g>
                {[0,1,2,3].map(i => (
                  <g key={`et-${i}`}>
                    <rect x={30 + i*72} y={193} width={55} height={18} rx="2" fill="white" stroke="#22C55E" strokeWidth="1.5"/>
                    <rect x={30 + i*72} y={193} width={55} height="6" rx="2" fill="#22C55E"/>
                    <text x={57 + i*72} y={207} textAnchor="middle" fill="#111827" fontSize="5" fontWeight="bold">34,90€</text>
                  </g>
                ))}
              </g>
            )}

            {/* Fiche information produit */}
            {selectedElements.has('fiche-info') && (
              <g>
                <rect x="265" y="70" width="30" height="42" rx="2" fill="white" stroke="#3B82F6" strokeWidth="1.5"/>
                <rect x="265" y="70" width="30" height="10" rx="2" fill="#3B82F6"/>
                <text x="280" y="78" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">INFO</text>
                <rect x="269" y="84" width="22" height="2" rx="1" fill="#E5E7EB"/>
                <rect x="269" y="89" width="18" height="2" rx="1" fill="#E5E7EB"/>
                <rect x="269" y="94" width="20" height="2" rx="1" fill="#E5E7EB"/>
                <rect x="269" y="99" width="15" height="2" rx="1" fill="#E5E7EB"/>
              </g>
            )}

            {/* Plan du rayon */}
            {selectedElements.has('plan') && (
              <g>
                <rect x="5" y="235" width="35" height="28" rx="3" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1"/>
                <text x="22" y="248" textAnchor="middle" fill="#1E40AF" fontSize="4" fontWeight="bold">PLAN</text>
                <rect x="10" y="252" width="10" height="6" rx="1" fill="#BFDBFE"/>
                <rect x="22" y="252" width="10" height="6" rx="1" fill="#BBF7D0"/>
              </g>
            )}

            {/* Fléchage directionnel */}
            {selectedElements.has('flechage') && (
              <g>
                <polygon points="160,238 172,255 166,255 166,270 154,270 154,255 148,255" fill="#3B82F6" opacity="0.7"/>
                <text x="160" y="278" textAnchor="middle" fill="#3B82F6" fontSize="6" fontWeight="600">Caisse →</text>
              </g>
            )}
          </svg>

          {/* Légende des éléments actifs */}
          {selectedElements.size > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {ILV_BUILD_OPTIONS.elements.filter(e => selectedElements.has(e.id)).map(e => (
                <span key={e.id} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  ✓ {e.label}
                </span>
              ))}
            </div>
          )}
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
