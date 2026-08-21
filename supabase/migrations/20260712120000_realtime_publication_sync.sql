-- =====================================================
-- REALTIME SYNCHRONIZATION FIX
-- Ensure all critical tables are in the realtime publication
-- =====================================================

-- Add schools table to realtime (used by useSchool hook for live settings)
ALTER PUBLICATION supabase_realtime ADD TABLE schools;

-- Add school_branding table to realtime (used by branding service for live theme updates)
ALTER PUBLICATION supabase_realtime ADD TABLE school_branding;

-- Add announcements table to realtime (used by announcements screens)
ALTER PUBLICATION supabase_realtime ADD TABLE announcements;

-- Add timetable_slots to realtime (used by schedule screens)
ALTER PUBLICATION supabase_realtime ADD TABLE timetable_slots;

-- Add students table to realtime (used by admin student management)
ALTER PUBLICATION supabase_realtime ADD TABLE students;

-- Add teachers table to realtime (used by admin teacher management)
ALTER PUBLICATION supabase_realtime ADD TABLE teachers;

-- Add buses table to realtime (used by transport tracking)
ALTER PUBLICATION supabase_realtime ADD TABLE buses;
