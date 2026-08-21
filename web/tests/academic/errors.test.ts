import { describe, it, expect } from 'vitest';
import {
  AcademicYearNotFoundError,
  AcademicYearConflictError,
  ClassNotFoundError,
  ClassCapacityError,
  ClassValidationError,
  ClassDuplicateError,
  ClassDeletionError,
  SubjectNotFoundError,
  SubjectDuplicateError,
  DepartmentNotFoundError,
  LevelNotFoundError,
  SectionNotFoundError,
  StreamNotFoundError,
  RoomNotFoundError,
  RoomOccupiedError,
  AssignmentNotFoundError,
  AssignmentConflictError,
  ScheduleConflictError,
  ScheduleValidationError,
  ScheduleGenerationError,
  CalendarEventNotFoundError,
  AcademicImportError,
  AcademicExportError,
  AcademicValidationError,
} from '@educi/errors';

describe('Academic Errors', () => {
  describe('AcademicYearNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new AcademicYearNotFoundError();
      expect(error.code).toBe('ACADEMIC_YEAR_NOT_FOUND');
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Année scolaire introuvable');
    });

    it('should include identifier in message', () => {
      const error = new AcademicYearNotFoundError('2024-2025');
      expect(error.message).toBe('Année scolaire (2024-2025) introuvable');
    });
  });

  describe('AcademicYearConflictError', () => {
    it('should have correct code and status', () => {
      const error = new AcademicYearConflictError();
      expect(error.code).toBe('ACADEMIC_YEAR_CONFLICT');
      expect(error.statusCode).toBe(409);
    });

    it('should accept custom message', () => {
      const error = new AcademicYearConflictError('Custom message');
      expect(error.message).toBe('Custom message');
    });
  });

  describe('ClassNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new ClassNotFoundError();
      expect(error.code).toBe('CLASS_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });

    it('should include identifier', () => {
      const error = new ClassNotFoundError('6ème A');
      expect(error.message).toBe('Classe (6ème A) introuvable');
    });
  });

  describe('ClassCapacityError', () => {
    it('should have correct code and status', () => {
      const error = new ClassCapacityError(40, 45);
      expect(error.code).toBe('CLASS_CAPACITY_EXCEEDED');
      expect(error.statusCode).toBe(400);
      expect(error.capacity).toBe(40);
      expect(error.current).toBe(45);
    });
  });

  describe('ClassValidationError', () => {
    it('should have correct code and status', () => {
      const errors = [{ field: 'name', message: 'Requis' }];
      const error = new ClassValidationError(errors);
      expect(error.code).toBe('CLASS_VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.errors).toEqual(errors);
    });
  });

  describe('ClassDuplicateError', () => {
    it('should have correct code and status', () => {
      const error = new ClassDuplicateError('6ème A', 'level-1');
      expect(error.code).toBe('CLASS_DUPLICATE');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('ClassDeletionError', () => {
    it('should have correct code and status', () => {
      const error = new ClassDeletionError();
      expect(error.code).toBe('CLASS_DELETION_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('SubjectNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new SubjectNotFoundError();
      expect(error.code).toBe('SUBJECT_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });

    it('should include identifier', () => {
      const error = new SubjectNotFoundError('MATH');
      expect(error.message).toBe('Matière (MATH) introuvable');
    });
  });

  describe('SubjectDuplicateError', () => {
    it('should have correct code and status', () => {
      const error = new SubjectDuplicateError('MATH');
      expect(error.code).toBe('SUBJECT_DUPLICATE');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('DepartmentNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new DepartmentNotFoundError();
      expect(error.code).toBe('DEPARTMENT_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('LevelNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new LevelNotFoundError();
      expect(error.code).toBe('LEVEL_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('SectionNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new SectionNotFoundError();
      expect(error.code).toBe('SECTION_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('StreamNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new StreamNotFoundError();
      expect(error.code).toBe('STREAM_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('RoomNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new RoomNotFoundError();
      expect(error.code).toBe('ROOM_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('RoomOccupiedError', () => {
    it('should have correct code and status', () => {
      const error = new RoomOccupiedError('Salle 101', '08:00-09:00');
      expect(error.code).toBe('ROOM_OCCUPIED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('AssignmentNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new AssignmentNotFoundError();
      expect(error.code).toBe('ASSIGNMENT_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('AssignmentConflictError', () => {
    it('should have correct code and status', () => {
      const error = new AssignmentConflictError();
      expect(error.code).toBe('ASSIGNMENT_CONFLICT');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('ScheduleConflictError', () => {
    it('should have correct code and status', () => {
      const conflicts = [{ type: 'TEACHER', description: 'Double booking' }];
      const error = new ScheduleConflictError(conflicts);
      expect(error.code).toBe('SCHEDULE_CONFLICT');
      expect(error.statusCode).toBe(409);
      expect(error.conflicts).toEqual(conflicts);
    });
  });

  describe('ScheduleValidationError', () => {
    it('should have correct code and status', () => {
      const error = new ScheduleValidationError();
      expect(error.code).toBe('SCHEDULE_VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('ScheduleGenerationError', () => {
    it('should have correct code and status', () => {
      const error = new ScheduleGenerationError();
      expect(error.code).toBe('SCHEDULE_GENERATION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('CalendarEventNotFoundError', () => {
    it('should have correct code and status', () => {
      const error = new CalendarEventNotFoundError();
      expect(error.code).toBe('CALENDAR_EVENT_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('AcademicImportError', () => {
    it('should have correct code and status', () => {
      const error = new AcademicImportError();
      expect(error.code).toBe('ACADEMIC_IMPORT_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('AcademicExportError', () => {
    it('should have correct code and status', () => {
      const error = new AcademicExportError();
      expect(error.code).toBe('ACADEMIC_EXPORT_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('AcademicValidationError', () => {
    it('should have correct code and status', () => {
      const errors = [{ field: 'name', message: 'Requis' }];
      const error = new AcademicValidationError(errors);
      expect(error.code).toBe('ACADEMIC_VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.errors).toEqual(errors);
    });
  });

  describe('Error hierarchy', () => {
    it('all errors should extend AppError', () => {
      const errors = [
        new AcademicYearNotFoundError(),
        new AcademicYearConflictError(),
        new ClassNotFoundError(),
        new SubjectNotFoundError(),
        new DepartmentNotFoundError(),
        new LevelNotFoundError(),
        new SectionNotFoundError(),
        new StreamNotFoundError(),
        new RoomNotFoundError(),
        new AssignmentNotFoundError(),
        new CalendarEventNotFoundError(),
      ];
      for (const error of errors) {
        expect(error).toHaveProperty('code');
        expect(error).toHaveProperty('statusCode');
        expect(error).toHaveProperty('isOperational', true);
        expect(error.toJSON()).toHaveProperty('error');
        expect(error.toJSON()).toHaveProperty('message');
        expect(error.toJSON()).toHaveProperty('statusCode');
      }
    });
  });
});
