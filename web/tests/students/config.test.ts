import { describe, it, expect } from 'vitest';
import { STUDENT_STATUS, STUDENT_PERMISSIONS, STUDENT_DEFAULTS, STUDENT_LIMITS, STUDENT_IMPORT, STUDENT_EXPORT, STUDENT_CARD, STUDENT_QRCODE, STUDENT_PHOTO, STUDENT_TIMELINE, STUDENT_SEARCH } from '@educi/config';

describe('Student Config', () => {
  describe('STUDENT_STATUS', () => {
    it('should have all statuses', () => {
      expect(STUDENT_STATUS.ACTIVE).toBe('ACTIVE');
      expect(STUDENT_STATUS.INACTIVE).toBe('INACTIVE');
      expect(STUDENT_STATUS.TRANSFERRED).toBe('TRANSFERRED');
      expect(STUDENT_STATUS.GRADUATED).toBe('GRADUATED');
      expect(STUDENT_STATUS.SUSPENDED).toBe('SUSPENDED');
      expect(STUDENT_STATUS.ARCHIVED).toBe('ARCHIVED');
      expect(STUDENT_STATUS.DELETED).toBe('DELETED');
    });
  });

  describe('STUDENT_PERMISSIONS', () => {
    it('should have CREATE permissions', () => {
      expect(STUDENT_PERMISSIONS.CREATE).toContain('SUPER_ADMIN');
      expect(STUDENT_PERMISSIONS.CREATE).toContain('ADMIN');
    });

    it('should have READ permissions', () => {
      expect(STUDENT_PERMISSIONS.READ).toContain('ELEVE');
      expect(STUDENT_PERMISSIONS.READ).toContain('PARENT');
    });

    it('should have DELETE permissions only for admin', () => {
      expect(STUDENT_PERMISSIONS.DELETE).toContain('SUPER_ADMIN');
      expect(STUDENT_PERMISSIONS.DELETE).not.toContain('ENSEIGNANT');
    });
  });

  describe('STUDENT_DEFAULTS', () => {
    it('should have correct defaults', () => {
      expect(STUDENT_DEFAULTS.NATIONALITY).toBe('Ivoirienne');
      expect(STUDENT_DEFAULTS.STATUS).toBe('ACTIVE');
      expect(STUDENT_DEFAULTS.CURRENCY).toBe('XOF');
      expect(STUDENT_DEFAULTS.MATRICULE_PREFIX).toBe('STU');
      expect(STUDENT_DEFAULTS.DEFAULT_PAGE_SIZE).toBe(20);
    });
  });

  describe('STUDENT_LIMITS', () => {
    it('should have limits per plan', () => {
      expect(STUDENT_LIMITS.MAX_STUDENTS_PER_SCHOOL.FREE).toBe(100);
      expect(STUDENT_LIMITS.MAX_STUDENTS_PER_SCHOOL.PRO).toBe(2000);
      expect(STUDENT_LIMITS.MAX_STUDENTS_PER_SCHOOL.ENTERPRISE).toBe(100000);
    });

    it('should have per-class limit', () => {
      expect(STUDENT_LIMITS.MAX_STUDENTS_PER_CLASS).toBe(60);
    });
  });

  describe('STUDENT_IMPORT', () => {
    it('should support CSV and Excel', () => {
      expect(STUDENT_IMPORT.SUPPORTED_FORMATS).toContain('CSV');
      expect(STUDENT_IMPORT.SUPPORTED_FORMATS).toContain('EXCEL');
    });

    it('should have required fields', () => {
      expect(STUDENT_IMPORT.REQUIRED_FIELDS).toContain('firstName');
      expect(STUDENT_IMPORT.REQUIRED_FIELDS).toContain('lastName');
    });
  });

  describe('STUDENT_EXPORT', () => {
    it('should support all formats', () => {
      expect(STUDENT_EXPORT.FORMATS).toContain('PDF');
      expect(STUDENT_EXPORT.FORMATS).toContain('EXCEL');
      expect(STUDENT_EXPORT.FORMATS).toContain('CSV');
      expect(STUDENT_EXPORT.FORMATS).toContain('JSON');
    });
  });

  describe('STUDENT_CARD', () => {
    it('should have dimensions', () => {
      expect(STUDENT_CARD.WIDTH).toBe(85.6);
      expect(STUDENT_CARD.HEIGHT).toBe(54);
      expect(STUDENT_CARD.UNIT).toBe('mm');
    });
  });

  describe('STUDENT_QRCODE', () => {
    it('should have size', () => {
      expect(STUDENT_QRCODE.SIZE).toBe(200);
    });

    it('should have expiry hours per type', () => {
      expect(STUDENT_QRCODE.EXPIRY_HOURS.ATTENDANCE).toBe(24);
      expect(STUDENT_QRCODE.EXPIRY_HOURS.IDENTITY).toBe(8760);
    });
  });

  describe('STUDENT_PHOTO', () => {
    it('should have size limits', () => {
      expect(STUDENT_PHOTO.MAX_SIZE_MB).toBe(5);
      expect(STUDENT_PHOTO.THUMBNAIL_SIZE).toBe(100);
      expect(STUDENT_PHOTO.PROFILE_SIZE).toBe(400);
    });
  });

  describe('STUDENT_TIMELINE', () => {
    it('should have event types', () => {
      expect(STUDENT_TIMELINE.EVENT_TYPES).toContain('CREATION');
      expect(STUDENT_TIMELINE.EVENT_TYPES).toContain('PROMOTION');
      expect(STUDENT_TIMELINE.EVENT_TYPES).toContain('TRANSFER');
    });

    it('should have event labels', () => {
      expect(STUDENT_TIMELINE.EVENT_LABELS.CREATION).toBe('Création');
      expect(STUDENT_TIMELINE.EVENT_LABELS.PROMOTION).toBe('Promotion');
    });
  });

  describe('STUDENT_SEARCH', () => {
    it('should have search config', () => {
      expect(STUDENT_SEARCH.MIN_QUERY_LENGTH).toBe(2);
      expect(STUDENT_SEARCH.MAX_RESULTS).toBe(50);
      expect(STUDENT_SEARCH.DEBOUNCE_MS).toBe(300);
    });
  });
});
