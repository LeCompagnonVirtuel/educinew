import { describe, it, expect } from 'vitest';
import {
  EXAM_STATUS,
  EXAM_TYPES,
  EXAM_MODES,
  MARKS,
  COEFFICIENTS,
  AVERAGES,
  ROUNDING_METHODS,
  RANKING_METHODS,
  DECISION_TYPES,
  DECISION_THRESHOLDS,
  BULLETINS,
  TRANSCRIPTS,
  COMPETENCIES,
  PUBLICATION,
  EXAM_PDF,
  EXAM_IMPORT,
  EXAM_EXPORT,
  EXAM_ANALYTICS,
  EXAM_NOTIFICATIONS,
  EXAM_PERMISSIONS,
} from '@educi/config';

describe('Exam Config', () => {
  describe('EXAM_STATUS', () => {
    it('should have all statuses', () => {
      expect(EXAM_STATUS.DRAFT).toBe('DRAFT');
      expect(EXAM_STATUS.PUBLISHED).toBe('PUBLISHED');
      expect(EXAM_STATUS.LOCKED).toBe('LOCKED');
      expect(EXAM_STATUS.ARCHIVED).toBe('ARCHIVED');
    });
  });

  describe('EXAM_TYPES', () => {
    it('should have all exam types', () => {
      expect(EXAM_TYPES.CONTINUOUS).toBe('CONTINUOUS');
      expect(EXAM_TYPES.END_OF_TERM).toBe('END_OF_TERM');
      expect(EXAM_TYPES.MID_TERM).toBe('MID_TERM');
      expect(EXAM_TYPES.FINAL).toBe('FINAL');
      expect(EXAM_TYPES.DIAGNOSTIC).toBe('DIAGNOSTIC');
      expect(EXAM_TYPES.HOMEWORK).toBe('HOMEWORK');
      expect(EXAM_TYPES.ORAL).toBe('ORAL');
      expect(EXAM_TYPES.PRACTICAL).toBe('PRACTICAL');
      expect(EXAM_TYPES.PROJECT).toBe('PROJECT');
    });
  });

  describe('EXAM_MODES', () => {
    it('should have all exam modes', () => {
      expect(EXAM_MODES.WRITTEN).toBe('WRITTEN');
      expect(EXAM_MODES.ORAL).toBe('ORAL');
      expect(EXAM_MODES.PRACTICAL).toBe('PRACTICAL');
      expect(EXAM_MODES.ONLINE).toBe('ONLINE');
      expect(EXAM_MODES.BLENDED).toBe('BLENDED');
    });
  });

  describe('MARKS', () => {
    it('should have correct default values', () => {
      expect(MARKS.DEFAULT_TOTAL).toBe(20);
      expect(MARKS.DEFAULT_PASSING).toBe(10);
      expect(MARKS.MIN_MARK).toBe(0);
      expect(MARKS.MAX_MARK).toBe(20);
      expect(MARKS.DECIMAL_PLACES).toBe(2);
      expect(MARKS.ALLOW_NEGATIVE).toBe(false);
    });
  });

  describe('COEFFICIENTS', () => {
    it('should have correct values', () => {
      expect(COEFFICIENTS.DEFAULT).toBe(1);
      expect(COEFFICIENTS.MIN).toBe(0.5);
      expect(COEFFICIENTS.MAX).toBe(10);
      expect(COEFFICIENTS.STEP).toBe(0.5);
    });
  });

  describe('AVERAGES', () => {
    it('should have correct values', () => {
      expect(AVERAGES.DECIMAL_PLACES).toBe(2);
      expect(AVERAGES.MIN).toBe(0);
      expect(AVERAGES.MAX).toBe(20);
      expect(AVERAGES.DEFAULT_METHOD).toBe('WEIGHTED');
      expect(AVERAGES.ROUNDING).toBe('HALF_UP');
    });
  });

  describe('ROUNDING_METHODS', () => {
    it('should have all methods', () => {
      expect(ROUNDING_METHODS.STANDARD).toBe('STANDARD');
      expect(ROUNDING_METHODS.CEIL).toBe('CEIL');
      expect(ROUNDING_METHODS.FLOOR).toBe('FLOOR');
      expect(ROUNDING_METHODS.HALF_UP).toBe('HALF_UP');
      expect(ROUNDING_METHODS.BANKER).toBe('BANKER');
    });
  });

  describe('RANKING_METHODS', () => {
    it('should have all methods', () => {
      expect(RANKING_METHODS.AVERAGE).toBe('AVERAGE');
      expect(RANKING_METHODS.WEIGHTED_AVERAGE).toBe('WEIGHTED_AVERAGE');
      expect(RANKING_METHODS.TOTAL).toBe('TOTAL');
      expect(RANKING_METHODS.MEDIAN).toBe('MEDIAN');
    });
  });

  describe('DECISION_TYPES', () => {
    it('should have all decision types', () => {
      expect(DECISION_TYPES.PASSAGE).toBe('PASSAGE');
      expect(DECISION_TYPES.REPETITION).toBe('REPETITION');
      expect(DECISION_TYPES.ORIENTATION).toBe('ORIENTATION');
      expect(DECISION_TYPES.EXCLUSION).toBe('EXCLUSION');
      expect(DECISION_TYPES.HONOR).toBe('HONOR');
      expect(DECISION_TYPES.ENCOURAGEMENT).toBe('ENCOURAGEMENT');
      expect(DECISION_TYPES.CONDITIONAL_PASSAGE).toBe('CONDITIONAL_PASSAGE');
      expect(DECISION_TYPES.BOARD_DECISION).toBe('BOARD_DECISION');
    });
  });

  describe('DECISION_THRESHOLDS', () => {
    it('should have correct thresholds', () => {
      expect(DECISION_THRESHOLDS.PASSAGE_MIN).toBe(10);
      expect(DECISION_THRESHOLDS.HONOR_MIN).toBe(16);
      expect(DECISION_THRESHOLDS.EXCELLENCE_MIN).toBe(18);
      expect(DECISION_THRESHOLDS.ENCOURAGEMENT_MIN).toBe(14);
      expect(DECISION_THRESHOLDS.REPETITION_MAX).toBe(10);
      expect(DECISION_THRESHOLDS.EXCLUSION_MAX).toBe(5);
    });
  });

  describe('BULLETINS', () => {
    it('should have correct values', () => {
      expect(BULLETINS.TERMS_PER_YEAR).toBe(3);
      expect(BULLETINS.SEMESTERS_PER_YEAR).toBe(2);
      expect(BULLETINS.INCLUDE_ABSENCES).toBe(true);
      expect(BULLETINS.INCLUDE_LATES).toBe(true);
      expect(BULLETINS.INCLUDE_GRAPHICS).toBe(true);
      expect(BULLETINS.INCLUDE_PHOTO).toBe(true);
      expect(BULLETINS.INCLUDE_QR).toBe(true);
      expect(BULLETINS.INCLUDE_SIGNATURE).toBe(true);
    });
  });

  describe('TRANSCRIPTS', () => {
    it('should have correct values', () => {
      expect(TRANSCRIPTS.INCLUDE_QR_VERIFICATION).toBe(true);
      expect(TRANSCRIPTS.INCLUDE_ELECTRONIC_SIGNATURE).toBe(true);
      expect(TRANSCRIPTS.INCLUDE_SCHOOL_STAMP).toBe(true);
      expect(TRANSCRIPTS.HASH_ALGORITHM).toBe('SHA-256');
      expect(TRANSCRIPTS.PDF_TEMPLATE).toBe('official');
    });
  });

  describe('COMPETENCIES', () => {
    it('should have correct levels', () => {
      expect(COMPETENCIES.LEVELS).toContain('BEGINNER');
      expect(COMPETENCIES.LEVELS).toContain('DEVELOPING');
      expect(COMPETENCIES.LEVELS).toContain('PROFICIENT');
      expect(COMPETENCIES.LEVELS).toContain('ADVANCED');
      expect(COMPETENCIES.LEVELS).toContain('EXCELLENT');
      expect(COMPETENCIES.LEVELS).toHaveLength(5);
    });

    it('should have correct score values', () => {
      expect(COMPETENCIES.MIN_SCORE).toBe(0);
      expect(COMPETENCIES.MAX_SCORE).toBe(100);
      expect(COMPETENCIES.PASS_THRESHOLD).toBe(60);
    });
  });

  describe('PUBLICATION', () => {
    it('should have correct values', () => {
      expect(PUBLICATION.REQUIRE_DOUBLE_VALIDATION).toBe(true);
      expect(PUBLICATION.NOTIFY_PARENTS).toBe(true);
      expect(PUBLICATION.NOTIFY_STUDENTS).toBe(true);
      expect(PUBLICATION.NOTIFY_TEACHERS).toBe(true);
      expect(PUBLICATION.PUBLICATION_DELAY_HOURS).toBe(24);
    });
  });

  describe('EXAM_PDF', () => {
    it('should have correct values', () => {
      expect(EXAM_PDF.PAGE_SIZE).toBe('A4');
      expect(EXAM_PDF.FONT).toBe('Helvetica');
      expect(EXAM_PDF.TITLE_SIZE).toBe(18);
      expect(EXAM_PDF.BODY_SIZE).toBe(10);
    });
  });

  describe('EXAM_IMPORT', () => {
    it('should have correct values', () => {
      expect(EXAM_IMPORT.MAX_ROWS).toBe(10000);
      expect(EXAM_IMPORT.ALLOWED_FORMATS).toContain('CSV');
      expect(EXAM_IMPORT.ALLOWED_FORMATS).toContain('EXCEL');
      expect(EXAM_IMPORT.ALLOWED_FORMATS).toContain('JSON');
    });

    it('should have required columns', () => {
      expect(EXAM_IMPORT.REQUIRED_COLUMNS_STUDENT).toContain('studentId');
      expect(EXAM_IMPORT.REQUIRED_COLUMNS_STUDENT).toContain('marksObtained');
      expect(EXAM_IMPORT.REQUIRED_COLUMNS_BULK).toContain('studentId');
      expect(EXAM_IMPORT.REQUIRED_COLUMNS_BULK).toContain('marksObtained');
      expect(EXAM_IMPORT.REQUIRED_COLUMNS_BULK).toContain('maxMarks');
    });
  });

  describe('EXAM_EXPORT', () => {
    it('should have correct values', () => {
      expect(EXAM_EXPORT.ALLOWED_FORMATS).toContain('PDF');
      expect(EXAM_EXPORT.ALLOWED_FORMATS).toContain('EXCEL');
      expect(EXAM_EXPORT.ALLOWED_FORMATS).toContain('CSV');
      expect(EXAM_EXPORT.ALLOWED_FORMATS).toContain('JSON');
      expect(EXAM_EXPORT.MAX_ROWS).toBe(50000);
    });
  });

  describe('EXAM_ANALYTICS', () => {
    it('should have correct values', () => {
      expect(EXAM_ANALYTICS.PERIODS).toContain('DAILY');
      expect(EXAM_ANALYTICS.PERIODS).toContain('WEEKLY');
      expect(EXAM_ANALYTICS.PERIODS).toContain('MONTHLY');
      expect(EXAM_ANALYTICS.PERIODS).toContain('TERM');
      expect(EXAM_ANALYTICS.PERIODS).toContain('YEARLY');
      expect(EXAM_ANALYTICS.PREDICTION_MIN_EXAMS).toBe(3);
      expect(EXAM_ANALYTICS.RISK_THRESHOLD).toBe(8);
      expect(EXAM_ANALYTICS.TOP_THRESHOLD).toBe(16);
    });
  });

  describe('EXAM_NOTIFICATIONS', () => {
    it('should have correct types', () => {
      expect(EXAM_NOTIFICATIONS.TYPES).toContain('EXAM_PUBLISHED');
      expect(EXAM_NOTIFICATIONS.TYPES).toContain('MARKS_PUBLISHED');
      expect(EXAM_NOTIFICATIONS.TYPES).toContain('REPORT_CARD_READY');
      expect(EXAM_NOTIFICATIONS.TYPES).toContain('TRANSCRIPT_READY');
      expect(EXAM_NOTIFICATIONS.TYPES).toContain('DECISION_MADE');
      expect(EXAM_NOTIFICATIONS.TYPES).toContain('CORRECTION_PENDING');
      expect(EXAM_NOTIFICATIONS.TYPES).toContain('DEADLINE_REMINDER');
    });

    it('should have correct channels', () => {
      expect(EXAM_NOTIFICATIONS.CHANNELS).toContain('SMS');
      expect(EXAM_NOTIFICATIONS.CHANNELS).toContain('EMAIL');
      expect(EXAM_NOTIFICATIONS.CHANNELS).toContain('PUSH');
      expect(EXAM_NOTIFICATIONS.CHANNELS).toContain('WHATSAPP');
      expect(EXAM_NOTIFICATIONS.CHANNELS).toContain('IN_APP');
    });

    it('should have correct batch size', () => {
      expect(EXAM_NOTIFICATIONS.BATCH_SIZE).toBe(100);
    });
  });

  describe('EXAM_PERMISSIONS', () => {
    it('should have CREATE_EXAM permissions', () => {
      expect(EXAM_PERMISSIONS.CREATE_EXAM).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.CREATE_EXAM).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.CREATE_EXAM).toContain('TEACHER');
      expect(EXAM_PERMISSIONS.CREATE_EXAM).toContain('ACADEMIC_DIRECTOR');
    });

    it('should have VIEW_EXAM permissions', () => {
      expect(EXAM_PERMISSIONS.VIEW_EXAM).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.VIEW_EXAM).toContain('STUDENT');
      expect(EXAM_PERMISSIONS.VIEW_EXAM).toContain('PARENT');
    });

    it('should have DELETE_EXAM restricted to admin', () => {
      expect(EXAM_PERMISSIONS.DELETE_EXAM).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.DELETE_EXAM).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.DELETE_EXAM).not.toContain('TEACHER');
    });

    it('should have ENTER_MARKS permissions', () => {
      expect(EXAM_PERMISSIONS.ENTER_MARKS).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.ENTER_MARKS).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.ENTER_MARKS).toContain('TEACHER');
    });

    it('should have MANAGE_DECISIONS permissions', () => {
      expect(EXAM_PERMISSIONS.MANAGE_DECISIONS).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.MANAGE_DECISIONS).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.MANAGE_DECISIONS).toContain('ACADEMIC_DIRECTOR');
      expect(EXAM_PERMISSIONS.MANAGE_DECISIONS).toContain('DIRECTOR');
    });

    it('should have MANAGE_SETTINGS restricted to admin', () => {
      expect(EXAM_PERMISSIONS.MANAGE_SETTINGS).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.MANAGE_SETTINGS).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.MANAGE_SETTINGS).not.toContain('TEACHER');
    });

    it('should have IMPORT_MARKS permissions', () => {
      expect(EXAM_PERMISSIONS.IMPORT_MARKS).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.IMPORT_MARKS).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.IMPORT_MARKS).toContain('TEACHER');
    });

    it('should have EXPORT_MARKS permissions', () => {
      expect(EXAM_PERMISSIONS.EXPORT_MARKS).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.EXPORT_MARKS).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.EXPORT_MARKS).toContain('TEACHER');
      expect(EXAM_PERMISSIONS.EXPORT_MARKS).toContain('SECRETARY');
    });

    it('should have VALIDATE_MARKS permissions', () => {
      expect(EXAM_PERMISSIONS.VALIDATE_MARKS).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.VALIDATE_MARKS).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.VALIDATE_MARKS).toContain('TEACHER');
      expect(EXAM_PERMISSIONS.VALIDATE_MARKS).toContain('ACADEMIC_DIRECTOR');
    });

    it('should have PUBLISH_MARKS permissions', () => {
      expect(EXAM_PERMISSIONS.PUBLISH_MARKS).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.PUBLISH_MARKS).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.PUBLISH_MARKS).toContain('ACADEMIC_DIRECTOR');
    });

    it('should have VIEW_STATISTICS permissions', () => {
      expect(EXAM_PERMISSIONS.VIEW_STATISTICS).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.VIEW_STATISTICS).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.VIEW_STATISTICS).toContain('TEACHER');
      expect(EXAM_PERMISSIONS.VIEW_STATISTICS).toContain('DIRECTOR');
    });

    it('should have GENERATE_BULLETINS permissions', () => {
      expect(EXAM_PERMISSIONS.GENERATE_BULLETINS).toContain('ADMIN');
      expect(EXAM_PERMISSIONS.GENERATE_BULLETINS).toContain('SUPER_ADMIN');
      expect(EXAM_PERMISSIONS.GENERATE_BULLETINS).toContain('ACADEMIC_DIRECTOR');
    });
  });
});
