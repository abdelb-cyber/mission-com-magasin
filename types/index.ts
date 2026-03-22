// Types principaux de l'application Mission Com'Magasin

export interface Learner {
  id: string
  pseudo: string
  session_id: string
  created_at: string
  total_score: number
}

export interface Session {
  id: string
  name: string
  code: string
  created_at: string
  is_active: boolean
  created_by: string
}

export interface MissionAttempt {
  id: string
  learner_id: string
  session_id: string
  mission_id: number
  score: number
  max_score: number
  completed_at: string
  details: Record<string, unknown>
  time_spent: number // en secondes
}

export interface MissionDefinition {
  id: number
  title: string
  description: string
  icon: string
  color: string
  type: MissionType
  maxScore: number
  estimatedTime: string // ex: "5-8 min"
}

export type MissionType =
  | 'drag-sort'        // Mission 1 - tri ILV/PLV
  | 'match-objective'  // Mission 2 - associer support/objectif
  | 'scene-diagnostic' // Mission 3 - diagnostiquer une scène
  | 'build-ilv'        // Mission 4 - construire une ILV
  | 'build-plv'        // Mission 5 - construire une PLV
  | 'regulation'       // Mission 6 - réglementation
  | 'digital-tools'    // Mission 7 - outils digitaux

export interface DragItem {
  id: string
  label: string
  description: string
  category: 'ilv' | 'plv'
  svgType: SupportSVGType
}

export type SupportSVGType =
  | 'plan-magasin'
  | 'panneau-rayon'
  | 'marquage-sol'
  | 'separateur'
  | 'bandeau-gondole'
  | 'etiquette-prix'
  | 'fiche-produit'
  | 'fiche-conseil'
  | 'vitrophanie'
  | 'stop-trottoir'
  | 'totem'
  | 'drapeau'
  | 'display'
  | 'kakemono'
  | 'stop-rayon'
  | 'borne-interactive'
  | 'affichage-digital'
  | 'etiquette-connectee'
  | 'vitrine-digitale'
  | 'robot-accueil'

export interface SceneElement {
  id: string
  x: number // % position
  y: number // % position
  width: number
  height: number
  label: string
  isError: boolean
  errorDescription?: string
  correctionHint?: string
}

export interface MatchScenario {
  id: string
  situation: string
  objectif: 'orienter' | 'informer' | 'promouvoir' | 'declencher-achat' | 'attirer-zone-froide'
  correctSupportId: string
  supports: { id: string; label: string; svgType: SupportSVGType }[]
  feedback: string
}

export interface RegulationCase {
  id: string
  title: string
  imageDescription: string
  correctVersion: Record<string, string>
  incorrectVersion: Record<string, string>
  errors: string[]
}

export interface DigitalToolChoice {
  id: string
  etape: string
  description: string
  correctTool: string
  tools: { id: string; name: string; icon: string }[]
  justification: string
}

export interface LeaderboardEntry {
  pseudo: string
  total_score: number
  missions_completed: number
  rank: number
}

export interface GameState {
  learner: Learner | null
  session: Session | null
  currentMission: number | null
  attempts: MissionAttempt[]
  isTrainingMode: boolean
}
