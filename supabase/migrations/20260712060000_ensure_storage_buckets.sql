-- =====================================================
-- Ensure ALL required storage buckets exist
-- Fixes "Bucket not found" errors for logo/avatar uploads
-- =====================================================

-- Create missing buckets (idempotent)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('school-logos', 'school-logos', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']),
  ('avatars', 'avatars', true, 2097152, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('logos', 'logos', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']),
  ('student-photos', 'student-photos', false, 2097152, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('teacher-photos', 'teacher-photos', false, 2097152, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('documents', 'documents', false, 10485760, ARRAY['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('bulletins', 'bulletins', false, 10485760, ARRAY['application/pdf']),
  ('qr-codes', 'qr-codes', true, 1048576, ARRAY['image/png', 'image/svg+xml']),
  ('attachments', 'attachments', false, 10485760, ARRAY['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Policies for 'avatars' bucket (new)
-- =====================================================
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Avatars public read') THEN
    CREATE POLICY "Avatars public read" ON storage.objects
      FOR SELECT USING (bucket_id = 'avatars');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Avatars insert own') THEN
    CREATE POLICY "Avatars insert own" ON storage.objects
      FOR INSERT WITH CHECK (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
      );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Avatars update own') THEN
    CREATE POLICY "Avatars update own" ON storage.objects
      FOR UPDATE USING (
        bucket_id = 'avatars'
        AND auth.uid()::text = (storage.foldername(name))[1]
      );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Avatars delete own') THEN
    CREATE POLICY "Avatars delete own" ON storage.objects
      FOR DELETE USING (
        bucket_id = 'avatars'
        AND auth.uid()::text = (storage.foldername(name))[1]
      );
  END IF;
END $$;

-- =====================================================
-- Ensure 'school-logos' policies exist (idempotent)
-- =====================================================
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'School logos public read') THEN
    CREATE POLICY "School logos public read" ON storage.objects
      FOR SELECT USING (bucket_id = 'school-logos');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'School logos insert auth') THEN
    CREATE POLICY "School logos insert auth" ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'school-logos' AND auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'School logos update auth') THEN
    CREATE POLICY "School logos update auth" ON storage.objects
      FOR UPDATE USING (bucket_id = 'school-logos' AND auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'School logos delete auth') THEN
    CREATE POLICY "School logos delete auth" ON storage.objects
      FOR DELETE USING (bucket_id = 'school-logos' AND auth.role() = 'authenticated');
  END IF;
END $$;
