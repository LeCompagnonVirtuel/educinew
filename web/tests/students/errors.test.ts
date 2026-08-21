import { describe, it, expect } from 'vitest';
import {
  StudentNotFoundError,
  StudentAlreadyExistsError,
  StudentInactiveError,
  StudentTransferError,
  StudentPromotionError,
  StudentArchiveError,
  StudentRestoreError,
  StudentDeleteError,
  StudentPhotoError,
  StudentQRCodeError,
  StudentCardError,
  StudentMedicalError,
  StudentGuardianError,
  StudentImportError,
  StudentExportError,
  StudentValidationError,
  StudentLimitExceededError,
} from '@educi/errors';

describe('Student Errors', () => {
  describe('StudentNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new StudentNotFoundError();
      expect(error.message).toBe('Élève introuvable');
      expect(error.code).toBe('STUDENT_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });

    it('should include identifier', () => {
      const error = new StudentNotFoundError('stu-123');
      expect(error.message).toContain('stu-123');
    });
  });

  describe('StudentAlreadyExistsError', () => {
    it('should have correct properties', () => {
      const error = new StudentAlreadyExistsError('email', 'test@test.com');
      expect(error.code).toBe('STUDENT_ALREADY_EXISTS');
      expect(error.statusCode).toBe(409);
      expect(error.message).toContain('email');
      expect(error.message).toContain('test@test.com');
    });
  });

  describe('StudentInactiveError', () => {
    it('should have correct properties', () => {
      const error = new StudentInactiveError();
      expect(error.code).toBe('STUDENT_INACTIVE');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentTransferError', () => {
    it('should have correct defaults', () => {
      const error = new StudentTransferError();
      expect(error.code).toBe('STUDENT_TRANSFER_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentPromotionError', () => {
    it('should have correct defaults', () => {
      const error = new StudentPromotionError();
      expect(error.code).toBe('STUDENT_PROMOTION_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentArchiveError', () => {
    it('should have correct defaults', () => {
      const error = new StudentArchiveError();
      expect(error.code).toBe('STUDENT_ARCHIVE_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentRestoreError', () => {
    it('should have correct defaults', () => {
      const error = new StudentRestoreError();
      expect(error.code).toBe('STUDENT_RESTORE_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentDeleteError', () => {
    it('should have correct defaults', () => {
      const error = new StudentDeleteError();
      expect(error.code).toBe('STUDENT_DELETE_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentPhotoError', () => {
    it('should have correct defaults', () => {
      const error = new StudentPhotoError();
      expect(error.code).toBe('STUDENT_PHOTO_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentQRCodeError', () => {
    it('should have correct defaults', () => {
      const error = new StudentQRCodeError();
      expect(error.code).toBe('STUDENT_QRCODE_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentCardError', () => {
    it('should have correct defaults', () => {
      const error = new StudentCardError();
      expect(error.code).toBe('STUDENT_CARD_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentMedicalError', () => {
    it('should have correct defaults', () => {
      const error = new StudentMedicalError();
      expect(error.code).toBe('STUDENT_MEDICAL_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentGuardianError', () => {
    it('should have correct defaults', () => {
      const error = new StudentGuardianError();
      expect(error.code).toBe('STUDENT_GUARDIAN_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentImportError', () => {
    it('should have correct properties', () => {
      const errors = [{ row: 1, field: 'name', message: 'Requis' }];
      const error = new StudentImportError(errors);
      expect(error.code).toBe('STUDENT_IMPORT_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.errors).toHaveLength(1);
    });
  });

  describe('StudentExportError', () => {
    it('should have correct defaults', () => {
      const error = new StudentExportError();
      expect(error.code).toBe('STUDENT_EXPORT_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('StudentValidationError', () => {
    it('should have correct properties', () => {
      const errors = [{ field: 'name', message: 'Requis' }];
      const error = new StudentValidationError(errors);
      expect(error.code).toBe('STUDENT_VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.errors).toHaveLength(1);
    });
  });

  describe('StudentLimitExceededError', () => {
    it('should have correct properties', () => {
      const error = new StudentLimitExceededError('students', 100, 100);
      expect(error.code).toBe('STUDENT_LIMIT_EXCEEDED');
      expect(error.statusCode).toBe(400);
      expect(error.limit).toBe('students');
      expect(error.current).toBe(100);
      expect(error.max).toBe(100);
    });
  });
});
