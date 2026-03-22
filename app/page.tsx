'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import HeroIllustration from '@/components/svg/HeroIllustration'
import { setLearner, setTrainingMode, joinSession } from '@/lib/store'
import { Learner } from '@/types'

export default function HomePage() {
  const router = useRouter()
  const [showJoin, setShowJoin] = useState(false)
  const [pseudo, setPseudo] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleTraining = () => {
    const name = pseudo.trim() || 'Apprenant'
    const learner: Learner = {
      id: crypto.randomUUID(),
      pseudo: name,
      session_id: 'training',
      created_at: new Date().toISOString(),
      total_score: 0,
    }
    setLearner(learner)
    setTrainingMode(true)
    router.push('/apprenant/dashboard')
  }

  const handleJoinSession = async () => {
    if (!pseudo.trim()) { setError('Entrez votre prénom ou pseudo.'); return }
    if (!code.trim()) { setError('Entrez le code de la classe.'); return }

    const result = await joinSession(code.trim(), pseudo.trim())
    if (!result) {
      setError('Code de classe introuvable. Vérifiez le code.')
      return
    }
    setTrainingMode(false)
    router.push('/apprenant/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="text-center pt-8 px-4">
        <div className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          🎓 BTS MCO
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Mission<br/>
          <span className="text-primary-600">Com&apos;Magasin</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">
          Maîtrisez la communication sur le lieu de vente en relevant des missions interactives.
        </p>
      </header>

      {/* Illustration */}
      <div className="px-6 mt-6 mb-6">
        <HeroIllustration className="w-full max-w-sm mx-auto rounded-2xl shadow-sm" />
      </div>

      {/* Actions */}
      <div className="flex-1 px-6 pb-8 space-y-4 max-w-sm mx-auto w-full">
        {!showJoin ? (
          <>
            <Button fullWidth size="lg" onClick={() => setShowJoin(true)}>
              🎯 Rejoindre une classe
            </Button>
            <Button fullWidth variant="secondary" size="lg" onClick={handleTraining}>
              🏋️ Mode entraînement
            </Button>
            <Button fullWidth variant="secondary" size="md" onClick={() => router.push('/formateur')}>
              👩‍🏫 Espace formateur
            </Button>
          </>
        ) : (
          <div className="card space-y-4 animate-slide-up">
            <h2 className="font-bold text-lg text-gray-900">Rejoindre une classe</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom ou pseudo</label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex : Marie"
                value={pseudo}
                onChange={e => { setPseudo(e.target.value); setError('') }}
                maxLength={30}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code de la classe</label>
              <input
                type="text"
                className="input-field uppercase tracking-widest text-center font-mono text-lg"
                placeholder="EX: ABC123"
                value={code}
                onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
                maxLength={8}
              />
            </div>

            {error && <p className="text-danger-500 text-sm font-medium">{error}</p>}

            <Button fullWidth onClick={handleJoinSession}>
              Rejoindre →
            </Button>
            <button
              className="w-full text-center text-sm text-gray-500 py-2"
              onClick={() => { setShowJoin(false); setError('') }}
            >
              ← Retour
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-400">
        Mission Com&apos;Magasin – BTS MCO – Communication sur le lieu de vente
      </footer>
    </div>
  )
}
