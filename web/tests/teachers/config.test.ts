import { describe, it, expect } from 'vitest';
import {
  TEACHER_STATUS,
  TEACHER_PERMISSIONS,
  TEACHER_DEFAULTS,
  TEACHER_LIMITS,
  TEACHER_IMPORT,
  TEACHER_EXPORT,
  TEACHER_TIMELINE,
  TEACHER_SEARCH,
  TEACHER_CONTRACT,
  TEACHER_LEAVE,
  TEACHER_EVALUATION,
} from '@educi/config';

describe('Teacher Config', () => {
  describe('TEACHER_STATUS', () => {
    it('should have all statuses', () => {
      expect(TEACHER_STATUS.ACTIVE).toBe('ACTIVE');
      expect(TEACHER_STATUS.INACTIVE).toBe('INACTIVE');
      expect(TEACHER_STATUS.SUSPENDED).toBe('SUSPENDED');
      expect(TEACHER_STATUS.ARCHIVED).toBe('ARCHIVED');
      expect(TEACHER_STATUS.ON_LEAVE).toBe('ON_LEAVE');
      expect(TEACHER_STATUS.CONTRACT_ENDED).toBe('CONTRACT_ENDED');
    });
  });

  describe('TEACHER_PERMISSIONS', () => {
    it('should define CREATE permissions', () => {
      expect(TEACHER_PERMISSIONS.CREATE).toContain('ADMIN');
      expect(TEACHER_PERMISSIONS.CREATE).toContain('SUPER_ADMIN');
    });

    it('should define READ permissions', () => {
      expect(TEACHER_PERMISSIONS.READ).toContain('ADMIN');
      expect(TEACHER_PERMISSIONS.READ).toContain('ENSEIGNANT');
    });

    it('should define DELETE permissions as SUPER_ADMIN only', () => {
      expect(TEACHER_PERMISSIONS.DELETE).toEqual(['SUPER_ADMIN']);
    });

    it('should define PAYROLL permissions', () => {
      expect(TEACHER_PERMISSIONS.PAYROLL).toContain('ADMIN');
      expect(TEACHER_PERMISSIONS.PAYROLL).toContain('SUPER_ADMIN');
    });
  });

  describe('TEACHER_DEFAULTS', () => {
    it('should have matricule prefix TCH', () => {
      expect(TEACHER_DEFAULTS.MATRICULE_PREFIX).toBe('TCH');
    });

    it('should have default page size 20', () => {
      expect(TEACHER_DEFAULTS.DEFAULT_PAGE_SIZE).toBe(20);
    });

    it('should have max weekly hours 40', () => {
      expect(TEACHER_DEFAULTS.MAX_WEEKLY_HOURS).toBe(40);
    });

    it('should have currency XOF', () => {
      expect(TEACHER_DEFAULTS.CURRENCY).toBe('XOF');
    });
  });

  describe('TEACHER_LIMITS', () => {
    it('should have enterprise limit 5000', () => {
      expect(TEACHER_LIMITS.MAX_TEACHERS_PER_SCHOOL.ENTERPRISE).toBe(5000);
    });

    it('should have free limit 10', () => {
      expect(TEACHER_LIMITS.MAX_TEACHERS_PER_SCHOOL.FREE).toBe(10);
    });

    it('should have max assignments per teacher 10', () => {
      expect(TEACHER_LIMITS.MAX_ASSIGNMENTS_PER_TEACHER).toBe(10);
    });

    it('should have max leave days 30', () => {
      expect(TEACHER_LIMITS.MAX_LEAVE_DAYS_PER_YEAR).toBe(30);
    });
  });

  describe('TEACHER_IMPORT', () => {
    it('should support CSV and EXCEL', () => {
      expect(TEACHER_IMPORT.SUPPORTED_FORMATS).toContain('CSV');
      expect(TEACHER_IMPORT.SUPPORTED_FORMATS).toContain('EXCEL');
    });

    it('should have required fields', () => {
      expect(TEACHER_IMPORT.REQUIRED_FIELDS).toContain('firstName');
      expect(TEACHER_IMPORT.REQUIRED_FIELDS).toContain('lastName');
    });

    it('should have French field mapping', () => {
      expect(TEACHER_IMPORT.FIELD_MAPPING['Prénom']).toBe('firstName');
      expect(TEACHER_IMPORT.FIELD_MAPPING['Nom']).toBe('lastName');
    });
  });

  describe('TEACHER_EXPORT', () => {
    it('should support all formats', () => {
      expect(TEACHER_EXPORT.FORMATS).toContain('PDF');
      expect(TEACHER_EXPORT.FORMATS).toContain('EXCEL');
      expect(TEACHER_EXPORT.FORMATS).toContain('CSV');
      expect(TEACHER_EXPORT.FORMATS).toContain('JSON');
    });
  });

  describe('TEACHER_TIMELINE', () => {
    it('should have event types', () => {
      expect(TEACHER_TIMELINE.EVENT_TYPES.CREATION).toBeDefined();
      expect(TEACHER_TIMELINE.EVENT_TYPES.ASSIGNMENT).toBeDefined();
      expect(TEACHER_TIMELINE.EVENT_TYPES.EVALUATION).toBeDefined();
    });

    it('should have max events 500', () => {
      expect(TEACHER_TIMELINE.MAX_EVENTS).toBe(500);
    });
  });

  describe('TEACHER_SEARCH', () => {
    it('should have min query length 2', () => {
      expect(TEACHER_SEARCH.MIN_QUERY_LENGTH).toBe(2);
    });

    it('should have max results 50', () => {
      expect(TEACHER_SEARCH.MAX_RESULTS).toBe(50);
    });
  });

  describe('TEACHER_CONTRACT', () => {
    it('should have all contract types', () => {
      expect(TEACHER_CONTRACT.TYPES).toContain('CDI');
      expect(TEACHER_CONTRACT.TYPES).toContain('CDD');
      expect(TEACHER_CONTRACT.TYPES).toContain('VACATAIRE');
    });

    it('should have renewal reminder 30 days', () => {
      expect(TEACHER_CONTRACT.RENEWAL_REMINDER_DAYS).toBe(30);
    });
  });

  describe('TEACHER_LEAVE', () => {
    it('should have all leave types', () => {
      expect(TEACHER_LEAVE.TYPES).toContain('MALADIE');
      expect(TEACHER_LEAVE.TYPES).toContain('ANNUEL');
      expect(TEACHER_LEAVE.TYPES).toContain('MATERNITE');
    });

    it('should have max days 30', () => {
      expect(TEACHER_LEAVE.MAX_DAYS_PER_YEAR).toBe(30);
    });

    it('should have maladie max 15 days', () => {
      expect(TEACHER_LEAVE.MALADIE_MAX_CONSECUTIVE_DAYS).toBe(15);
    });

    it('should have all statuses', () => {
      expect(TEACHER_LEAVE.STATUSES).toContain('PENDING');
      expect(TEACHER_LEAVE.STATUSES).toContain('APPROVED');
      expect(TEACHER_LEAVE.STATUSES).toContain('REJECTED');
    });
  });

  describe('TEACHER_EVALUATION', () => {
    it('should have all evaluation types', () => {
      expect(TEACHER_EVALUATION.TYPES).toContain('PEDAGOGIQUE');
      expect(TEACHER_EVALUATION.TYPES).toContain('ADMINISTRATIVE');
      expect(TEACHER_EVALUATION.TYPES).toContain('ANNUELLE');
    });

    it('should have max score 20', () => {
      expect(TEACHER_EVALUATION.MAX_SCORE).toBe(20);
    });

    it('should have passing score 10', () => {
      expect(TEACHER_EVALUATION.PASSING_SCORE).toBe(10);
    });

    it('should have default criteria', () => {
      expect(TEACHER_EVALUATION.DEFAULT_CRITERIA.length).toBeGreaterThan(0);
      expect(TEACHER_EVALUATION.DEFAULT_CRITERIA).toContain('Ponctualité');
    });
  });
});
