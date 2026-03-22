'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getLocalSessions, getLocalLearners } from '@/lib/store'
import { Session, Learner } from '@/types'
import { QRCodeSVG } from 'qrcode.react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function SessionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [learners, setLearners] = useState<Learner[]>([])
  const [showQR, setShowQR] = useState(false)
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    const sessions = getLocalSessions()
    const found = sessions.find(s => s.id === params.id)
    if (found) {
      setSession(found)
      setLearners(getLocalLearners(found.id))
    }
    setBaseUrl(window.location.origin)
  }, [params.id])

  const sessionUrl = session ? `${baseUrl}?code=${session.code}` : ''

  const exportCSV = useCallback(() => {
    if (!session || learners.length === 0) return

    const headers = ['Pseudo', 'Score Total', 'Date inscription']
    const rows = learners.map(l => [
      l.pseudo,
      l.total_score.toString(),
      new Date(l.created_at).toLocaleDateString('fr-FR'),
    ])

    const csv = [headers, ...rows].map(row => row.join(';')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${session.name.replace(/\s+/g, '_')}_resultats.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [session, learners])

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Session introuvable.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-5 pt-5 pb-6 rounded-b-3xl">
        <button onClick={() => router.push('/formateur')} className="text-white/70 text-sm mb-3 block">
          ← Retour aux sessions
        </button>
        <h1 className="text-xl font-bold">{session.name}</h1>
        <div className="flex items-center gap-4 mt-2">
          <div className="bg-white/10 px-3 py-1 rounded-full">
            <span className="text-sm">Code : </span>
            <span className="font-mono font-bold text-lg">{session.code}</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${session.is_active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {session.is_active ? '● Active' : '● Fermée'}
          </span>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-4">
        {/* QR Code */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">QR Code de la session</h3>
            <Button size="sm" onClick={() => setShowQR(!showQR)}>
              {showQR ? 'Masquer' : 'Afficher'}
            </Button>
          </div>

          {showQR && (
            <div className="animate-slide-up">
              <div className="flex justify-center py-6 bg-white rounded-xl border-2 border-gray-100">
                <div className="text-center">
                  <QRCodeSVG
                    value={sessionUrl}
                    size={220}
                    level="H"
                    includeMargin
                    bgColor="white"
                    fgColor="#1E40AF"
                  />
                  <p className="text-xs text-gray-500 mt-3 max-w-[220px] break-all">{sessionUrl}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center mt-3">
                Projetez ce QR code pour que les apprenants rejoignent la session.
              </p>
              <div className="mt-3">
                <Button
                  fullWidth
                  variant="secondary"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(sessionUrl)}
                >
                  📋 Copier le lien
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center">
            <p className="text-3xl font-extrabold text-primary-600">{learners.length}</p>
            <p className="text-sm text-gray-500">Participants</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-extrabold text-success-600">
              {learners.length > 0 ? Math.round(learners.reduce((s, l) => s + l.total_score, 0) / learners.length) : 0}
            </p>
            <p className="text-sm text-gray-500">Score moyen</p>
          </Card>
        </div>

        {/* Liste des participants */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">Participants ({learners.length})</h3>
            {learners.length > 0 && (
              <Button size="sm" variant="secondary" onClick={exportCSV}>
                📥 Export CSV
              </Button>
            )}
          </div>

          {learners.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">👥</p>
              <p className="text-sm">En attente de participants...</p>
              <p className="text-xs mt-1">Partagez le code <strong>{session.code}</strong> ou le QR code.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* En-tête */}
              <div className="flex items-center gap-3 px-3 py-2 text-xs text-gray-500 font-semibold uppercase">
                <span className="w-8">#</span>
                <span className="flex-1">Pseudo</span>
                <span className="w-20 text-right">Score</span>
              </div>
              {/* Classement */}
              {[...learners]
                .sort((a, b) => b.total_score - a.total_score)
                .map((learner, index) => (
                  <div key={learner.id}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl ${index < 3 ? 'bg-primary-50' : 'bg-gray-50'}`}
                  >
                    <span className={`w-8 text-center font-bold ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-700' : 'text-gray-500'}`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                    </span>
                    <span className="flex-1 font-medium text-gray-800">{learner.pseudo}</span>
                    <span className="w-20 text-right font-bold text-primary-600">{learner.total_score} pts</span>
                  </div>
                ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
