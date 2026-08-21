-- ============================================================
-- Migration: onboarding_drafts
-- Table de sauvegarde automatique des brouillons d'onboarding
-- Permet la reprise intelligente sur n'importe quel appareil
-- ============================================================

CREATE TABLE IF NOT EXISTS onboarding_drafts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID,
  email TEXT,
  school_name TEXT,
  step INTEGER NOT NULL DEFAULT 0,
  data JSONB NOT NULL DEFAULT '{}',
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour recherche rapide par user
CREATE INDEX IF NOT EXISTS idx_onboarding_drafts_user_id ON onboarding_drafts(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_drafts_school_id ON onboarding_drafts(school_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_drafts_email ON onboarding_drafts(email);

-- RLS: seul le propriétaire peut voir/modifier son brouillon
ALTER TABLE onboarding_drafts ENABLE ROW LEVEL SECURITY;

-- Policy: lecture pour l'utilisateur propriétaire (via service role)
CREATE POLICY "onboarding_drafts_service_all" ON onboarding_drafts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: lecture/écriture pour l'utilisateur authentifié sur ses propres drafts
CREATE POLICY "onboarding_drafts_user_select" ON onboarding_drafts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "onboarding_drafts_user_insert" ON onboarding_drafts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "onboarding_drafts_user_update" ON onboarding_drafts
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "onboarding_drafts_user_delete" ON onboarding_drafts
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Trigger: mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_onboarding_draft_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS onboarding_drafts_updated_at ON onboarding_drafts;
CREATE TRIGGER onboarding_drafts_updated_at
  BEFORE UPDATE ON onboarding_drafts
  FOR EACH ROW
  EXECUTE FUNCTION update_onboarding_draft_updated_at();

-- ============================================================
-- Ajouter la colonne onboarding_completed à la table schools
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'schools' AND column_name = 'onboarding_completed'
  ) THEN
    ALTER TABLE schools ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE;
  END IF;
END $$;

-- Index pour filtrage rapide
CREATE INDEX IF NOT EXISTS idx_schools_onboarding_completed ON schools(onboarding_completed);

COMMENT ON TABLE onboarding_drafts IS 'Brouillons d''onboarding des établissements - sauvegarde automatique pour reprise intelligente';
COMMENT ON COLUMN onboarding_drafts.step IS 'Étape actuelle de l''onboarding (0-14)';
COMMENT ON COLUMN onboarding_drafts.data IS 'Données complètes de l''onboarding au format JSONB';
COMMENT ON COLUMN onboarding_drafts.completed IS 'Indique si l''onboarding est terminé';
