CREATE OR REPLACE FUNCTION set_teacher_attendance_school_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.school_id IS NULL THEN
    SELECT school_id INTO NEW.school_id FROM teachers WHERE id = NEW.teacher_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_teacher_attendance_school_id ON teacher_attendance;
CREATE TRIGGER trg_set_teacher_attendance_school_id
  BEFORE INSERT OR UPDATE ON teacher_attendance
  FOR EACH ROW
  EXECUTE FUNCTION set_teacher_attendance_school_id();
