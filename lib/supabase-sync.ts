'use client'

// Synchronisation Supabase – envoie les données vers la base distante
// Fonctionne en complément du store local (localStorage)

import { supabase, isSupabaseConfigured } from './supabase'
import { Session, Learner, MissionAttempt } from '@/types'

// Créer une session dans Supabase
export async function syncCreateSession(session: Session): Promise<void> {
  if (!isSupabaseConfigured()) return
  try {
    await supabase.from('sessions').upsert({
      id: session.id,
      name: session.name,
      code: session.code,
      is_active: session.is_active,
      created_by: session.created_by,
      created_at: session.created_at,
    })
  } catch (e) {
    console.warn('Sync session failed:', e)
  }
}

// Chercher une session par code dans Supabase
export async function syncFindSessionByCode(code: string): Promise<Session | null> {
  if (!isSupabaseConfigured()) return null
  try {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('code', code.toUpperCase())
      .single()
    return data as Session | null
  } catch {
    return null
  }
}

// Créer un apprenant dans Supabase
export async function syncCreateLearner(learner: Learner): Promise<void> {
  if (!isSupabaseConfigured()) return
  try {
    await supabase.from('learners').upsert({
      id: learner.id,
      pseudo: learner.pseudo,
      session_id: learner.session_id,
      total_score: learner.total_score,
      created_at: learner.created_at,
    })
  } catch (e) {
    console.warn('Sync learner failed:', e)
  }
}

// Sauvegarder une tentative dans Supabase
export async function syncSaveAttempt(attempt: MissionAttempt): Promise<void> {
  if (!isSupabaseConfigured()) return
  try {
    await supabase.from('attempts').upsert({
      id: attempt.id,
      learner_id: attempt.learner_id,
      session_id: attempt.session_id,
      mission_id: attempt.mission_id,
      score: attempt.score,
      max_score: attempt.max_score,
      time_spent: attempt.time_spent,
      details: attempt.details,
      completed_at: attempt.completed_at,
    })
  } catch (e) {
    console.warn('Sync attempt failed:', e)
  }
}

// Mettre à jour le score total d'un apprenant
export async function syncUpdateLearnerScore(learnerId: string, totalScore: number): Promise<void> {
  if (!isSupabaseConfigured()) return
  try {
    await supabase
      .from('learners')
      .update({ total_score: totalScore })
      .eq('id', learnerId)
  } catch (e) {
    console.warn('Sync score failed:', e)
  }
}

// Récupérer les apprenants d'une session depuis Supabase
export async function syncGetLearners(sessionId: string): Promise<Learner[]> {
  if (!isSupabaseConfigured()) return []
  try {
    const { data } = await supabase
      .from('learners')
      .select('*')
      .eq('session_id', sessionId)
      .order('total_score', { ascending: false })
    return (data as Learner[]) || []
  } catch {
    return []
  }
}

// Récupérer les sessions depuis Supabase
export async function syncGetSessions(): Promise<Session[]> {
  if (!isSupabaseConfigured()) return []
  try {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .order('created_at', { ascending: false })
    return (data as Session[]) || []
  } catch {
    return []
  }
}
