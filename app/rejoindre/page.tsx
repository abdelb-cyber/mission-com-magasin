'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Button from '@/components/ui/Button'
import HeroIllustration from '@/components/svg/HeroIllustration'
import { joinSession, setLearner, setTrainingMode } from '@/lib/store'
import { Learner } from '@/types'

function RejoindreContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pseudo, setPseudo] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Pré-remplir le code depuis l'URL (?code=ABC123)
  useEffect(() => {
    const urlCode = searchParams.get('code')
    if (urlCode) {
      setCode(urlCode.toUpperCase())
    }
  }, [searchParams])

  const handleJoin = async () => {
    if (!pseudo.trim()) { setError('Entrez votre prénom ou pseudo.'); return }
    if (!code.trim()) { setError('Entrez le code de la classe.'); return }

    setLoading(true)
    setError('')

    const result = await joinSession(code.trim(), pseudo.trim())
    if (!result) {
      setError('Code de classe introuvable. Vérifiez le code auprès de votre formateur.')
      setLoading(false)
      return
    }
    setTrainingMode(false)
    router.push('/apprenant/dashboard')
  }

  const handleTraining = () => {
    if (!pseudo.trim()) { setError('Entrez votre prénom ou pseudo.'); return }
    const learner: Learner = {
      id: crypto.randomUUID(),
      pseudo: pseudo.trim(),
      session_id: 'training',
      created_at: new Date().toISOString(),
      total_score: 0,
    }
    setLearner(learner)
    setTrainingMode(true)
    router.push('/apprenant/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="text-center pt-8 px-4">
        <div className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          🎓 BTS MCO
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
          Mission <span className="text-primary-600">Com&apos;Magasin</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Rejoignez votre classe pour commencer les missions.
        </p>
      </header>

      {/* Illustration */}
      <div className="px-8 mt-4 mb-4">
        <HeroIllustration className="w-full max-w-[250px] mx-auto rounded-2xl" />
      </div>

      {/* Formulaire */}
      <div className="flex-1 px-6 pb-8 max-w-sm mx-auto w-full">
        <div className="card space-y-4">
          <h2 className="font-bold text-lg text-gray-900">Rejoindre la classe</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Votre prénom ou pseudo</label>
            <input
              type="text"
              className="input-field"
              placeholder="Ex : Marie"
              value={pseudo}
              onChange={e => { setPseudo(e.target.value); setError('') }}
              maxLength={30}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code de la classe</label>
            <input
              type="text"
              className="input-field uppercase tracking-widest text-center font-mono text-lg"
              placeholder="ABC123"
              value={code}
              onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
              maxLength={8}
              readOnly={!!searchParams.get('code')}
            />
            {searchParams.get('code') && (
              <p className="text-xs text-green-600 mt-1 font-medium">✓ Code pré-rempli par votre formateur</p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <Button fullWidth onClick={handleJoin} disabled={loading}>
            {loading ? 'Connexion...' : '🎯 Rejoindre la classe'}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-gray-400">ou</span></div>
          </div>

          <button
            onClick={handleTraining}
            className="w-full text-center text-sm text-primary-600 font-medium py-2 hover:text-primary-800"
          >
            🏋️ S&apos;entraîner sans classe
          </button>
        </div>
      </div>

      <footer className="text-center py-3 text-xs text-gray-400">
        Mission Com&apos;Magasin – BTS MCO
      </footer>
    </div>
  )
}

export default function RejoindrePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Chargement...</p>
      </div>
    }>
      <RejoindreContent />
    </Suspense>
  )
}
