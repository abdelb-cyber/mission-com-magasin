'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getLocalSessions, getLocalLearners } from '@/lib/store'
import { syncGetLearners, syncGetSessionAttempts } from '@/lib/supabase-sync'
import { MISSIONS } from '@/data/missions'
import { Session, Learner, MissionAttempt } from '@/types'
import { QRCodeSVG } from 'qrcode.react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

// Composant pour afficher les détails d'une tentative de façon typée
function DetailView({ details }: { details: Record<string, unknown> }) {
  const d = details
  const arr = (key: string): string[] => {
    const v = d[key]
    return Array.isArray(v) ? v.map(String) : []
  }
  const answers = Array.isArray(d.answers) ? d.answers : []

  // Détecter le type de réponses
  const hasAnswersWithOk = answers.length > 0 && answers[0]?.ok !== undefined && answers[0]?.bonnes === undefined
  const hasAnswersWithBonnes = answers.length > 0 && answers[0]?.bonnes !== undefined

  return (
    <>
      {/* M1/M2 : réponses avec ok/label/choix/correct */}
      {hasAnswersWithOk && (
        <div>
          <p className="font-semibold text-gray-700 mb-1">Réponses détaillées :</p>
          {answers.map((a: Record<string, unknown>, i: number) => {
            const ok = Boolean(a.ok)
            const label = String(a.label || a.situation || '')
            const choix = a.choix ? String(a.choix) : ''
            const correct = a.correct ? String(a.correct) : ''
            return (
              <p key={i} className={ok ? 'text-green-700' : 'text-red-600'}>
                {ok ? '✅' : '❌'} {label}
                {!ok && choix ? ` → choisi : ${choix}` : ''}
                {!ok && correct ? ` (correct : ${correct})` : ''}
              </p>
            )
          })}
        </div>
      )}

      {/* M3 : diagnostic détaillé */}
      {arr('erreursTrouvees').length > 0 && (
        <div>
          <p className="font-semibold text-green-700">✅ Erreurs trouvées :</p>
          {arr('erreursTrouvees').map((e, i) => <p key={i} className="text-green-600 pl-3">• {e}</p>)}
        </div>
      )}
      {arr('erreursManquees').length > 0 && (
        <div>
          <p className="font-semibold text-red-600">❌ Erreurs manquées :</p>
          {arr('erreursManquees').map((e, i) => <p key={i} className="text-red-500 pl-3">• {e}</p>)}
        </div>
      )}
      {arr('fauxClicsDetails').length > 0 && (
        <div>
          <p className="font-semibold text-amber-600">⚠️ Faux clics :</p>
          {arr('fauxClicsDetails').map((e, i) => <p key={i} className="text-amber-500 pl-3">• {e}</p>)}
        </div>
      )}

      {/* M6 : détail par cas réglementaire */}
      {hasAnswersWithBonnes && (
        <div>
          <p className="font-semibold text-gray-700 mb-1">Détail par cas :</p>
          {answers.map((cas: Record<string, unknown>, i: number) => {
            const bonnes = Array.isArray(cas.bonnes) ? cas.bonnes.map(String) : []
            const manquees = Array.isArray(cas.manquees) ? cas.manquees.map(String) : []
            const pieges = Array.isArray(cas.pieges) ? cas.pieges.map(String) : []
            return (
              <div key={i} className="border-l-2 border-gray-300 pl-2 mb-2">
                <p className="font-medium text-gray-800">{String(cas.cas || '')}</p>
                {bonnes.map((b, j) => <p key={`b${j}`} className="text-green-600">✅ {b}</p>)}
                {manquees.map((m, j) => <p key={`m${j}`} className="text-red-500">❌ {m}</p>)}
                {pieges.map((p, j) => <p key={`p${j}`} className="text-amber-500">⚠️ Piège : {p}</p>)}
              </div>
            )
          })}
        </div>
      )}

      {/* Fallbacks simples */}
      {d.wrongClicks !== undefined && arr('fauxClicsDetails').length === 0 && (
        <p>Faux clics : {String(d.wrongClicks)}</p>
      )}
      {d.correctAnswers !== undefined && !d.answers && (
        <p>Réponses correctes : {String(d.correctAnswers)}</p>
      )}
      {arr('errors').length > 0 && !d.answers && (
        <div>
          <p className="font-semibold text-red-600">Erreurs :</p>
          {arr('errors').map((e, i) => <p key={i} className="text-red-500 pl-3">• {e}</p>)}
        </div>
      )}
      {arr('selected').length > 0 && (
        <p>Éléments sélectionnés : {arr('selected').join(', ')}</p>
      )}
    </>
  )
}

export default function SessionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [learners, setLearners] = useState<Learner[]>([])
  const [attempts, setAttempts] = useState<MissionAttempt[]>([])
  const [showQR, setShowQR] = useState(false)
  const [baseUrl, setBaseUrl] = useState('')
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const loadData = useCallback(async (sessionFound: Session) => {
    // Local
    const local = getLocalLearners(sessionFound.id)
    setLearners(local)

    // Supabase
    const [remote, remoteAttempts] = await Promise.all([
      syncGetLearners(sessionFound.id),
      syncGetSessionAttempts(sessionFound.id),
    ])

    if (remote.length > 0) {
      const localIds = new Set(local.map(l => l.id))
      const merged = [...local, ...remote.filter(r => !localIds.has(r.id))]
      setLearners(merged)
    }
    setAttempts(remoteAttempts)
  }, [])

  useEffect(() => {
    const sessions = getLocalSessions()
    const found = sessions.find(s => s.id === params.id)
    if (found) {
      setSession(found)
      loadData(found)
    }
    setBaseUrl(window.location.origin)
  }, [params.id, loadData])

  const handleRefresh = async () => {
    if (!session) return
    setRefreshing(true)
    await loadData(session)
    setRefreshing(false)
  }

  const sessionUrl = session ? `${baseUrl}/rejoindre?code=${session.code}` : ''

  const getAttemptsForLearner = (learnerId: string) =>
    attempts.filter(a => a.learner_id === learnerId)

  const exportCSV = useCallback(() => {
    if (!session || learners.length === 0) return

    const headers = ['Pseudo', 'Score Total', ...MISSIONS.map(m => `M${m.id} - ${m.title}`), 'Date inscription']
    const rows = learners.map(l => {
      const la = getAttemptsForLearner(l.id)
      return [
        l.pseudo,
        l.total_score.toString(),
        ...MISSIONS.map(m => {
          const a = la.find(att => att.mission_id === m.id)
          return a ? `${a.score}/${a.max_score}` : 'Non fait'
        }),
        new Date(l.created_at).toLocaleDateString('fr-FR'),
      ]
    })

    const csv = [headers, ...rows].map(row => row.join(';')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${session.name.replace(/\s+/g, '_')}_resultats.csv`
    a.click()
    URL.revokeObjectURL(url)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, learners, attempts])

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Session introuvable.</p>
      </div>
    )
  }

  // Vue détail d'un apprenant
  if (selectedLearner) {
    const learnerAttempts = getAttemptsForLearner(selectedLearner.id)
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-5 pt-5 pb-6 rounded-b-3xl">
          <button onClick={() => setSelectedLearner(null)} className="text-white/70 text-sm mb-3 block">
            ← Retour au classement
          </button>
          <h1 className="text-xl font-bold">📋 Détail : {selectedLearner.pseudo}</h1>
          <p className="text-white/60 text-sm mt-1">
            Score total : {selectedLearner.total_score} pts • {learnerAttempts.length}/{MISSIONS.length} missions
          </p>
        </div>

        <div className="px-4 mt-6 space-y-3">
          {MISSIONS.map(mission => {
            const attempt = learnerAttempts.find(a => a.mission_id === mission.id)
            const pct = attempt ? (attempt.score / attempt.max_score) * 100 : 0

            return (
              <Card key={mission.id}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{mission.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm text-gray-900">M{mission.id} – {mission.title}</p>
                      {attempt ? (
                        <span className={`text-sm font-bold ${pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                          {attempt.score}/{attempt.max_score}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Non fait</span>
                      )}
                    </div>

                    {attempt && (
                      <>
                        {/* Barre de progression */}
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                          <div
                            className={`h-full rounded-full ${pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        {/* Détails de la tentative */}
                        <div className="mt-2 text-xs text-gray-500 space-y-1">
                          <p>
                            <span className={`font-semibold ${pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                              {pct >= 80 ? '⭐ Excellent' : pct >= 50 ? '📚 Moyen' : '💪 À retravailler'}
                            </span>
                            {' • '}
                            {new Date(attempt.completed_at).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                          </p>

                          {/* Détails spécifiques selon la mission */}
                          {attempt.details && typeof attempt.details === 'object' && (
                            <div className="bg-gray-50 rounded-lg p-2 mt-1 space-y-1">
                              <DetailView details={attempt.details} />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}

          <Button fullWidth variant="secondary" onClick={() => setSelectedLearner(null)}>
            ← Retour au classement
          </Button>
        </div>
      </div>
    )
  }

  // Vue principale de la session
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
            <h3 className="font-bold text-gray-900">📱 QR Code de la session</h3>
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
                  <p className="text-xs text-gray-400 mt-3">Les apprenants scannent ce code</p>
                  <p className="text-xs text-primary-600 font-mono mt-1 break-all max-w-[220px]">{sessionUrl}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
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
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <p className="text-2xl font-extrabold text-primary-600">{learners.length}</p>
            <p className="text-xs text-gray-500">Participants</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-extrabold text-green-600">
              {learners.length > 0 ? Math.round(learners.reduce((s, l) => s + l.total_score, 0) / learners.length) : 0}
            </p>
            <p className="text-xs text-gray-500">Score moyen</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-extrabold text-amber-600">
              {attempts.length}
            </p>
            <p className="text-xs text-gray-500">Tentatives</p>
          </Card>
        </div>

        {/* Bouton rafraîchir */}
        <Button fullWidth variant="secondary" size="sm" onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? '⏳ Actualisation...' : '🔄 Actualiser les données'}
        </Button>

        {/* Liste des participants */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">🏆 Classement ({learners.length})</h3>
            {learners.length > 0 && (
              <Button size="sm" variant="secondary" onClick={exportCSV}>
                📥 CSV
              </Button>
            )}
          </div>

          {learners.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">👥</p>
              <p className="text-sm">En attente de participants...</p>
              <p className="text-xs mt-1">Partagez le QR code ou le code <strong>{session.code}</strong></p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* En-tête */}
              <div className="flex items-center gap-3 px-3 py-2 text-xs text-gray-500 font-semibold uppercase">
                <span className="w-8">#</span>
                <span className="flex-1">Pseudo</span>
                <span className="w-12 text-center">Missions</span>
                <span className="w-16 text-right">Score</span>
              </div>
              {/* Classement */}
              {[...learners]
                .sort((a, b) => b.total_score - a.total_score)
                .map((learner, index) => {
                  const la = getAttemptsForLearner(learner.id)
                  return (
                    <button
                      key={learner.id}
                      onClick={() => setSelectedLearner(learner)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:shadow-sm active:bg-gray-100 text-left ${index < 3 ? 'bg-primary-50' : 'bg-gray-50'}`}
                    >
                      <span className={`w-8 text-center font-bold ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-700' : 'text-gray-500'}`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">{learner.pseudo}</p>
                      </div>
                      <span className="w-12 text-center text-xs text-gray-500">
                        {la.length}/{MISSIONS.length}
                      </span>
                      <span className="w-16 text-right font-bold text-primary-600 text-sm">
                        {learner.total_score} pts
                      </span>
                      <span className="text-gray-300 text-sm">→</span>
                    </button>
                  )
                })}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
