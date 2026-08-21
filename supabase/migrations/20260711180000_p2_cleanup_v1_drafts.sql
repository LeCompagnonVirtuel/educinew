-- P2-26: Drop registration_drafts V1 (replaced by V2)
-- P2-25: Clean up old enterprise_activate_school versions (keep only latest)

-- =====================================================
-- Drop registration_drafts V1 if V2 exists
-- =====================================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'registration_drafts_v2')
     AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'registration_drafts') THEN
    -- Drop V1 table and related objects
    EXECUTE 'DROP TABLE IF EXISTS registration_drafts CASCADE';
    RAISE NOTICE 'Dropped registration_drafts V1 (replaced by V2)';
  ELSE
    RAISE NOTICE 'registration_drafts V1 not found or V2 not ready';
  END IF;
END $$;
