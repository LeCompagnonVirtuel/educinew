-- =====================================================
-- EduCI Storage Buckets
-- Run AFTER 001_initial_schema.sql and 002_rls_policies.sql
-- =====================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('logos', 'logos', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']),
  ('student-photos', 'student-photos', false, 2097152, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('teacher-photos', 'teacher-photos', false, 2097152, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('documents', 'documents', false, 10485760, ARRAY['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('bulletins', 'bulletins', false, 10485760, ARRAY['application/pdf']),
  ('qr-codes', 'qr-codes', true, 1048576, ARRAY['image/png', 'image/svg+xml']),
  ('attachments', 'attachments', false, 10485760, ARRAY['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies: logos (public read, school-scoped write)
CREATE POLICY "Logos public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'logos');

CREATE POLICY "Logos insert for authenticated" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.role() = 'authenticated');

CREATE POLICY "Logos update for owner" ON storage.objects
  FOR UPDATE USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Logos delete for owner" ON storage.objects
  FOR DELETE USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: student-photos (authenticated read/write)
CREATE POLICY "Student photos read" ON storage.objects
  FOR SELECT USING (bucket_id = 'student-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Student photos insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'student-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Student photos update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'student-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Student photos delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'student-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: teacher-photos
CREATE POLICY "Teacher photos read" ON storage.objects
  FOR SELECT USING (bucket_id = 'teacher-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Teacher photos insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'teacher-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Teacher photos update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'teacher-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Teacher photos delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'teacher-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: documents
CREATE POLICY "Documents read" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Documents insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Documents update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Documents delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: bulletins (authenticated read, teacher/admin write)
CREATE POLICY "Bulletins read" ON storage.objects
  FOR SELECT USING (bucket_id = 'bulletins' AND auth.role() = 'authenticated');

CREATE POLICY "Bulletins insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'bulletins' AND auth.role() = 'authenticated');

CREATE POLICY "Bulletins delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'bulletins' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: qr-codes (public read, authenticated write)
CREATE POLICY "QR codes public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'qr-codes');

CREATE POLICY "QR codes insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'qr-codes' AND auth.role() = 'authenticated');

CREATE POLICY "QR codes delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: attachments
CREATE POLICY "Attachments read" ON storage.objects
  FOR SELECT USING (bucket_id = 'attachments' AND auth.role() = 'authenticated');

CREATE POLICY "Attachments insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'attachments' AND auth.role() = 'authenticated');

CREATE POLICY "Attachments delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'attachments' AND auth.uid()::text = (storage.foldername(name))[1]);
