-- ============================================
-- SCHÉMA SQL SUPABASE – Mission Com'Magasin
-- ============================================

-- Table des sessions créées par les formateurs
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_by TEXT DEFAULT 'formateur',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour recherche rapide par code
CREATE INDEX idx_sessions_code ON sessions(code);

-- Table des apprenants
CREATE TABLE learners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pseudo TEXT NOT NULL,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  total_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_learners_session ON learners(session_id);

-- Table des tentatives de mission
CREATE TABLE attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id UUID REFERENCES learners(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  mission_id INTEGER NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  max_score INTEGER NOT NULL DEFAULT 100,
  time_spent INTEGER DEFAULT 0, -- en secondes
  details JSONB DEFAULT '{}',
  completed_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_attempts_learner ON attempts(learner_id);
CREATE INDEX idx_attempts_session_mission ON attempts(session_id, mission_id);

-- Vue du classement par session
CREATE OR REPLACE VIEW leaderboard AS
SELECT
  l.pseudo,
  l.total_score,
  l.session_id,
  COUNT(DISTINCT a.mission_id) AS missions_completed,
  RANK() OVER (PARTITION BY l.session_id ORDER BY l.total_score DESC) AS rank
FROM learners l
LEFT JOIN attempts a ON a.learner_id = l.id
GROUP BY l.id, l.pseudo, l.total_score, l.session_id;

-- Politique RLS (Row Level Security)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learners ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;

-- Politique : lecture publique (pour que les apprenants rejoignent)
CREATE POLICY "Sessions lisibles par tous" ON sessions FOR SELECT USING (true);
CREATE POLICY "Apprenants lisibles par tous" ON learners FOR SELECT USING (true);
CREATE POLICY "Tentatives lisibles par tous" ON attempts FOR SELECT USING (true);

-- Politique : insertion publique (les apprenants créent leur profil)
CREATE POLICY "Création session" ON sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Création apprenant" ON learners FOR INSERT WITH CHECK (true);
CREATE POLICY "Création tentative" ON attempts FOR INSERT WITH CHECK (true);

-- Politique : mise à jour par le propriétaire
CREATE POLICY "MAJ apprenant" ON learners FOR UPDATE USING (true);
CREATE POLICY "MAJ tentative" ON attempts FOR UPDATE USING (true);
