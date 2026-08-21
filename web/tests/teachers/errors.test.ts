import { describe, it, expect } from 'vitest';
import {
  TeacherNotFoundError,
  TeacherAlreadyExistsError,
  TeacherInactiveError,
  TeacherAssignmentError,
  TeacherContractError,
  TeacherLeaveError,
  TeacherScheduleConflictError,
  TeacherPayrollError,
  TeacherEvaluationError,
  TeacherPhotoError,
  TeacherImportError,
  TeacherExportError,
  TeacherArchiveError,
  TeacherRestoreError,
  TeacherDeleteError,
  TeacherValidationError,
  TeacherLimitExceededError,
} from '@educi/errors';

describe('Teacher Errors', () => {
  it('TeacherNotFoundError should have correct message', () => {
    const err = new TeacherNotFoundError();
    expect(err.message).toBe('Enseignant introuvable');
    expect(err.code).toBe('TEACHER_NOT_FOUND');
    expect(err.statusCode).toBe(404);
  });

  it('TeacherNotFoundError should accept identifier', () => {
    const err = new TeacherNotFoundError('TCH001');
    expect(err.message).toContain('TCH001');
  });

  it('TeacherAlreadyExistsError should have correct message', () => {
    const err = new TeacherAlreadyExistsError();
    expect(err.code).toBe('TEACHER_ALREADY_EXISTS');
    expect(err.statusCode).toBe(409);
  });

  it('TeacherAlreadyExistsError should accept email', () => {
    const err = new TeacherAlreadyExistsError('test@test.com');
    expect(err.message).toContain('test@test.com');
  });

  it('TeacherInactiveError should have correct code', () => {
    const err = new TeacherInactiveError();
    expect(err.code).toBe('TEACHER_INACTIVE');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherAssignmentError should have correct code', () => {
    const err = new TeacherAssignmentError();
    expect(err.code).toBe('TEACHER_ASSIGNMENT_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherContractError should have correct code', () => {
    const err = new TeacherContractError();
    expect(err.code).toBe('TEACHER_CONTRACT_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherLeaveError should have correct code', () => {
    const err = new TeacherLeaveError();
    expect(err.code).toBe('TEACHER_LEAVE_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherScheduleConflictError should have correct code', () => {
    const err = new TeacherScheduleConflictError();
    expect(err.code).toBe('TEACHER_SCHEDULE_CONFLICT');
    expect(err.statusCode).toBe(409);
  });

  it('TeacherPayrollError should have correct code', () => {
    const err = new TeacherPayrollError();
    expect(err.code).toBe('TEACHER_PAYROLL_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherEvaluationError should have correct code', () => {
    const err = new TeacherEvaluationError();
    expect(err.code).toBe('TEACHER_EVALUATION_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherPhotoError should have correct code', () => {
    const err = new TeacherPhotoError();
    expect(err.code).toBe('TEACHER_PHOTO_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherImportError should have correct code', () => {
    const err = new TeacherImportError();
    expect(err.code).toBe('TEACHER_IMPORT_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherExportError should have correct code', () => {
    const err = new TeacherExportError();
    expect(err.code).toBe('TEACHER_EXPORT_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherArchiveError should have correct code', () => {
    const err = new TeacherArchiveError();
    expect(err.code).toBe('TEACHER_ARCHIVE_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherRestoreError should have correct code', () => {
    const err = new TeacherRestoreError();
    expect(err.code).toBe('TEACHER_RESTORE_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherDeleteError should have correct code', () => {
    const err = new TeacherDeleteError();
    expect(err.code).toBe('TEACHER_DELETE_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherValidationError should store errors', () => {
    const errors = [{ field: 'firstName', message: 'Requis' }];
    const err = new TeacherValidationError(errors);
    expect(err.errors).toEqual(errors);
    expect(err.code).toBe('TEACHER_VALIDATION_ERROR');
    expect(err.statusCode).toBe(400);
  });

  it('TeacherLimitExceededError should store limit info', () => {
    const err = new TeacherLimitExceededError('teachers', 100, 50);
    expect(err.limit).toBe('teachers');
    expect(err.current).toBe(100);
    expect(err.max).toBe(50);
    expect(err.code).toBe('TEACHER_LIMIT_EXCEEDED');
  });
});
