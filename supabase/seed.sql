-- =====================================================
-- EduCI Seed Data - Données de démonstration
-- =====================================================
-- Exécution en 2 phases:
--   Phase 1: supabase db query --linked --file supabase/seed_phase1.sql
--   Phase 2: Créer les auth users via l'API Auth ou le Dashboard
--            puis supabase db query --linked --file supabase/seed_phase2.sql
--
-- Mot de passe de tous les users démo: Demo1234!
-- =====================================================

-- Phase 1: Données indépendantes des users
-- (École, année académique, périodes, matières, classes)

INSERT INTO schools (id, name, code, address, city, phone, email, type, status, subscription_plan, subscription_end)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Lycée Moderne d''Abidjan',
  'LMA-2025',
  'Boulevard de la République, Plateau',
  'Abidjan',
  '+22527200001',
  'contact@lma.educi.ci',
  'LYCEE',
  'ACTIVE',
  'PREMIUM',
  '2027-12-31'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO academic_years (id, school_id, name, start_date, end_date, is_active)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  '2025-2026',
  '2025-09-01',
  '2026-06-30',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO periods (id, school_id, academic_year_id, name, period_type, start_date, end_date, is_active)
VALUES
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', '1er Trimestre', 'TRIMESTRE', '2025-09-01', '2025-12-15', false),
('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', '2ème Trimestre', 'TRIMESTRE', '2026-01-05', '2026-03-20', true),
('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', '3ème Trimestre', 'TRIMESTRE', '2026-04-01', '2026-06-30', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO subjects (id, school_id, name, coefficient)
VALUES
('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Mathématiques', 5),
('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Français', 5),
('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Anglais', 3),
('d0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Physique-Chimie', 4),
('d0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'SVT', 3),
('d0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'Histoire-Géographie', 3),
('d0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 'Philosophie', 4),
('d0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000001', 'EPS', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO classes (id, school_id, name, level, capacity)
VALUES
('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Terminale A1', 'TERMINALE', 45),
('e0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Terminale D', 'TERMINALE', 40),
('e0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Première C', 'PREMIERE', 38),
('e0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Seconde A', 'SECONDE', 50),
('e0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', '3ème A', 'TROISIEME', 55)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Phase 2: Créer les users via Supabase Auth puis exécuter seed_phase2.sql
-- =====================================================
