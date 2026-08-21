import { describe, it, expect } from 'vitest';
import {
  SchoolNotFoundError,
  SchoolSlugConflictError,
  SchoolLimitExceededError,
  SchoolPlanUpgradeRequiredError,
  SchoolLogoError,
  SchoolArchiveError,
  SchoolRestoreError,
  SchoolDeleteError,
} from '@educi/errors';

describe('School Errors', () => {
  describe('SchoolNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new SchoolNotFoundError();
      expect(error.message).toBe('Établissement introuvable');
      expect(error.code).toBe('SCHOOL_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });

    it('should include identifier in message', () => {
      const error = new SchoolNotFoundError('school-123');
      expect(error.message).toContain('school-123');
    });
  });

  describe('SchoolSlugConflictError', () => {
    it('should have correct properties', () => {
      const error = new SchoolSlugConflictError('ecole-test');
      expect(error.message).toContain('ecole-test');
      expect(error.code).toBe('SCHOOL_SLUG_CONFLICT');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('SchoolLimitExceededError', () => {
    it('should have correct properties', () => {
      const error = new SchoolLimitExceededError('students', 100, 100);
      expect(error.code).toBe('SCHOOL_LIMIT_EXCEEDED');
      expect(error.statusCode).toBe(400);
      expect(error.limit).toBe('students');
      expect(error.current).toBe(100);
      expect(error.max).toBe(100);
    });
  });

  describe('SchoolPlanUpgradeRequiredError', () => {
    it('should have correct properties', () => {
      const error = new SchoolPlanUpgradeRequiredError('FREE', 'PRO');
      expect(error.code).toBe('SCHOOL_PLAN_UPGRADE_REQUIRED');
      expect(error.statusCode).toBe(400);
      expect(error.currentPlan).toBe('FREE');
      expect(error.requiredPlan).toBe('PRO');
    });
  });

  describe('SchoolLogoError', () => {
    it('should have correct defaults', () => {
      const error = new SchoolLogoError();
      expect(error.message).toBe('Erreur lors du traitement du logo');
      expect(error.code).toBe('SCHOOL_LOGO_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('SchoolArchiveError', () => {
    it('should have correct defaults', () => {
      const error = new SchoolArchiveError();
      expect(error.code).toBe('SCHOOL_ARCHIVE_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('SchoolRestoreError', () => {
    it('should have correct defaults', () => {
      const error = new SchoolRestoreError();
      expect(error.code).toBe('SCHOOL_RESTORE_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('SchoolDeleteError', () => {
    it('should have correct defaults', () => {
      const error = new SchoolDeleteError();
      expect(error.code).toBe('SCHOOL_DELETE_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });
});
