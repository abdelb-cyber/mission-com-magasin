'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createLocalSession, getLocalSessions } from '@/lib/store'
import { Session } from '@/types'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function FormateurPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<Session[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [sessionName, setSessionName] = useState('')

  useEffect(() => {
    setSessions(getLocalSessions())
  }, [])

  const handleCreate = () => {
    if (!sessionName.trim()) return
    const session = createLocalSession(sessionName.trim())
    setSessions(prev => [...prev, session])
    setSessionName('')
    setShowCreate(false)
    router.push(`/formateur/session/${session.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-5 pt-6 pb-8 rounded-b-3xl">
        <button onClick={() => router.push('/')} className="text-white/70 text-sm mb-4 block">
          ← Accueil
        </button>
        <h1 className="text-2xl font-bold">👩‍🏫 Espace formateur</h1>
        <p className="text-white/60 text-sm mt-1">Créez et gérez vos sessions de formation.</p>
      </div>

      <div className="px-4 mt-6 space-y-4">
        {/* Bouton créer */}
        {!showCreate ? (
          <Button fullWidth size="lg" onClick={() => setShowCreate(true)}>
            + Créer une session
          </Button>
        ) : (
          <Card className="animate-slide-up">
            <h3 className="font-bold text-gray-900 mb-3">Nouvelle session</h3>
            <input
              type="text"
              className="input-field mb-3"
              placeholder="Nom de la session (ex: BTS MCO Groupe A)"
              value={sessionName}
              onChange={e => setSessionName(e.target.value)}
              maxLength={50}
              autoFocus
            />
            <div className="flex gap-3">
              <Button onClick={handleCreate} disabled={!sessionName.trim()}>
                Créer
              </Button>
              <Button variant="secondary" onClick={() => setShowCreate(false)}>
                Annuler
              </Button>
            </div>
          </Card>
        )}

        {/* Liste des sessions */}
        <h2 className="font-bold text-lg text-gray-800 mt-6">Vos sessions</h2>
        {sessions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm">Aucune session créée pour l&apos;instant.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map(session => (
              <Card
                key={session.id}
                interactive
                onClick={() => router.push(`/formateur/session/${session.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{session.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Code : <span className="font-mono font-bold text-primary-600">{session.code}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Créée le {new Date(session.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
