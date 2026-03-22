'use client'

// Store local + synchronisation Supabase automatique
// Le localStorage reste la source principale (fonctionne hors-ligne)
// Supabase synchronise en arrière-plan quand disponible

import { GameState, Learner, MissionAttempt, Session } from '@/types'
import { syncCreateSession, syncCreateLearner, syncSaveAttempt, syncUpdateLearnerScore, syncFindSessionByCode, syncGetAttempts } from './supabase-sync'

const STORAGE_KEY = 'mission-com-magasin'

function getStore(): GameState {
  if (typeof window === 'undefined') {
    return { learner: null, session: null, currentMission: null, attempts: [], isTrainingMode: false }
  }
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return { learner: null, session: null, currentMission: null, attempts: [], isTrainingMode: false }
  }
  return JSON.parse(raw)
}

function saveStore(state: GameState) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function setLearner(learner: Learner) {
  const state = getStore()
  state.learner = learner
  saveStore(state)
}

export function getLearner(): Learner | null {
  return getStore().learner
}

export function setSession(session: Session) {
  const state = getStore()
  state.session = session
  saveStore(state)
}

export function getSession(): Session | null {
  return getStore().session
}

export function setTrainingMode(isTraining: boolean) {
  const state = getStore()
  state.isTrainingMode = isTraining
  saveStore(state)
}

export function isTrainingMode(): boolean {
  return getStore().isTrainingMode
}

export function saveAttempt(attempt: MissionAttempt) {
  const state = getStore()
  // Ajouter les IDs du learner et de la session
  if (state.learner) {
    attempt.learner_id = state.learner.id
    attempt.session_id = state.learner.session_id
  }

  const idx = state.attempts.findIndex(a => a.mission_id === attempt.mission_id)
  if (idx >= 0) {
    if (attempt.score > state.attempts[idx].score) {
      state.attempts[idx] = attempt
    }
  } else {
    state.attempts.push(attempt)
  }

  if (state.learner) {
    state.learner.total_score = state.attempts.reduce((sum, a) => sum + a.score, 0)
    // Sync Supabase en arrière-plan
    syncUpdateLearnerScore(state.learner.id, state.learner.total_score)
  }
  saveStore(state)

  // Sync tentative vers Supabase
  syncSaveAttempt(attempt)
}

export function getAttempts(): MissionAttempt[] {
  return getStore().attempts
}

export function getAttemptForMission(missionId: number): MissionAttempt | undefined {
  return getStore().attempts.find(a => a.mission_id === missionId)
}

export function getTotalScore(): number {
  return getStore().attempts.reduce((sum, a) => sum + a.score, 0)
}

export function getMissionsCompleted(): number {
  return getStore().attempts.length
}

export function resetStore() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

// Charger la progression depuis Supabase pour un apprenant existant
export async function loadProgressFromSupabase(): Promise<void> {
  const state = getStore()
  if (!state.learner || state.learner.session_id === 'training') return

  const remoteAttempts = await syncGetAttempts(state.learner.id)
  if (remoteAttempts.length === 0) return

  // Fusionner : garder le meilleur score par mission
  for (const remote of remoteAttempts) {
    const localIdx = state.attempts.findIndex(a => a.mission_id === remote.mission_id)
    if (localIdx >= 0) {
      if (remote.score > state.attempts[localIdx].score) {
        state.attempts[localIdx] = remote
      }
    } else {
      state.attempts.push(remote)
    }
  }

  // Recalculer le score total
  state.learner.total_score = state.attempts.reduce((sum, a) => sum + a.score, 0)
  saveStore(state)
}

// Sessions
const SESSIONS_KEY = 'mcm-sessions'
const LEARNERS_KEY = 'mcm-learners'

export function createLocalSession(name: string): Session {
  const sessions = getLocalSessions()
  const code = Math.random().toString(36).substring(2, 8).toUpperCase()
  const session: Session = {
    id: crypto.randomUUID(),
    name,
    code,
    created_at: new Date().toISOString(),
    is_active: true,
    created_by: 'formateur',
  }
  sessions.push(session)
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  }
  // Sync Supabase
  syncCreateSession(session)
  return session
}

export function getLocalSessions(): Session[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(SESSIONS_KEY)
  return raw ? JSON.parse(raw) : []
}

export function getLocalSessionByCode(code: string): Session | null {
  const sessions = getLocalSessions()
  return sessions.find(s => s.code === code.toUpperCase()) || null
}

export async function joinSession(code: string, pseudo: string): Promise<{ learner: Learner; session: Session } | null> {
  // Chercher d'abord en local, puis dans Supabase
  let session = getLocalSessionByCode(code)

  if (!session) {
    session = await syncFindSessionByCode(code)
    if (!session) return null
    // Sauvegarder en local aussi
    const sessions = getLocalSessions()
    sessions.push(session)
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
    }
  }

  const learner: Learner = {
    id: crypto.randomUUID(),
    pseudo,
    session_id: session.id,
    created_at: new Date().toISOString(),
    total_score: 0,
  }

  const learners = getLocalLearners(session.id)
  learners.push(learner)
  if (typeof window !== 'undefined') {
    localStorage.setItem(`${LEARNERS_KEY}-${session.id}`, JSON.stringify(learners))
  }

  setLearner(learner)
  setSession(session)

  // Sync Supabase
  syncCreateLearner(learner)

  return { learner, session }
}

export function getLocalLearners(sessionId: string): Learner[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(`${LEARNERS_KEY}-${sessionId}`)
  return raw ? JSON.parse(raw) : []
}
