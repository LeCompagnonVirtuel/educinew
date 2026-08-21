-- =====================================================
-- Migration: Fix auth users - delete broken bcrypt rows
-- GoTrue uses scrypt, NOT bcrypt. Direct SQL INSERT with
-- bcrypt hashes creates unusable auth users.
-- =====================================================

-- Disable the trigger temporarily so we can clean up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Delete all broken auth users (bcrypt hashes)
DELETE FROM auth.users WHERE id IN (
  'f0000000-0000-0000-0000-000000000001',
  'f0000000-0000-0000-0000-000000000010',
  'f0000000-0000-0000-0000-000000000020',
  'f0000000-0000-0000-0000-000000000021'
);

-- Re-create the trigger (will be used for new signups)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
