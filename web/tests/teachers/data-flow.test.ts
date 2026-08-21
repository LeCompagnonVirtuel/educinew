import { describe, it, expect } from 'vitest';
import {
  CreateTeacherSchema,
  TeacherFiltersSchema,
  AssignmentSchema,
  ScheduleSchema,
  LeaveSchema,
  EvaluationSchema,
  ContractSchema,
  PayrollSchema,
  TeacherImportSchema,
  TeacherExportSchema,
  TeacherSearchSchema,
  TeacherStatisticsSchema,
  TeacherTimelineSchema,
} from '@/features/teachers/validators';
import { TEACHER_STATUS, TEACHER_PERMISSIONS, TEACHER_DEFAULTS, TEACHER_LIMITS, TEACHER_CONTRACT, TEACHER_LEAVE, TEACHER_EVALUATION, TEACHER_TIMELINE } from '@educi/config';
import {
  TeacherNotFoundError,
  TeacherAlreadyExistsError,
  TeacherAssignmentError,
  TeacherContractError,
  TeacherLeaveError,
  TeacherScheduleConflictError,
  TeacherValidationError,
  TeacherLimitExceededError,
} from '@educi/errors';

describe('Teacher Data Flow', () => {
  describe('Create flow', () => {
    it('should validate create data through schema', () => {
      const data = {
        firstName: 'Marie',
        lastName: 'Koné',
        email: 'marie.kone@school.ci',
        phone: '+22507070707',
        employmentType: 'FULL_TIME' as const,
        contractType: 'CDI' as const,
        grade: 'A1' as const,
        speciality: 'MATHEMATIQUES' as const,
        salary: 500000,
        maxWeeklyHours: 24,
      };

      const result = CreateTeacherSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should create teacher with required fields only', () => {
      const data = {
        firstName: 'Paul',
        lastName: 'Bamba',
        employmentType: 'PART_TIME' as const,
        contractType: 'CDD' as const,
      };

      const result = CreateTeacherSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject create with missing required fields', () => {
      const result = CreateTeacherSchema.safeParse({ firstName: 'Paul' });
      expect(result.success).toBe(false);
    });
  });

  describe('Filter flow', () => {
    it('should apply default filters', () => {
      const result = TeacherFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('ALL');
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it('should validate complex filters', () => {
      const result = TeacherFiltersSchema.safeParse({
        search: 'Dupont',
        status: 'ACTIVE',
        gender: 'M',
        employmentType: 'FULL_TIME',
        contractType: 'CDI',
        grade: 'A1',
        speciality: 'MATHEMATIQUES',
        page: 2,
        limit: 50,
        sortBy: 'firstName',
        sortOrder: 'asc',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Assignment flow', () => {
    it('should validate assignment with all fields', () => {
      const result = AssignmentSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        subjectId: '123e4567-e89b-12d3-a456-426614174002',
        academicYearId: '123e4567-e89b-12d3-a456-426614174003',
        hoursPerWeek: 12,
        startDate: '2025-09-01',
        endDate: '2026-06-30',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Leave flow', () => {
    it('should validate leave within limits', () => {
      const result = LeaveSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        leaveType: 'ANNUEL',
        startDate: '2025-12-20',
        endDate: '2025-12-31',
        reason: 'Vacances de fin d\'année',
      });
      expect(result.success).toBe(true);
    });

    it('should respect leave type constraints', () => {
      expect(TEACHER_LEAVE.MALADIE_MAX_CONSECUTIVE_DAYS).toBe(15);
      expect(TEACHER_LEAVE.MAX_DAYS_PER_YEAR).toBe(30);
      expect(TEACHER_LEAVE.MATERNITE_MAX_DAYS).toBe(98);
    });
  });

  describe('Evaluation flow', () => {
    it('should validate evaluation with criteria', () => {
      const result = EvaluationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        evaluationType: 'PEDAGOGIQUE',
        period: 'T1 2025',
        score: 16,
        maxScore: 20,
        criteria: [
          { name: 'Ponctualité', score: 18, maxScore: 20 },
          { name: 'Méthodes pédagogiques', score: 15, maxScore: 20 },
        ],
        strengths: ['Excellente ponctualité'],
        improvements: ['Diversifier les méthodes'],
        overallComment: 'Bon enseignant',
      });
      expect(result.success).toBe(true);
    });

    it('should have default criteria', () => {
      expect(TEACHER_EVALUATION.DEFAULT_CRITERIA).toContain('Ponctualité');
      expect(TEACHER_EVALUATION.DEFAULT_CRITERIA).toContain('Préparation des cours');
      expect(TEACHER_EVALUATION.DEFAULT_CRITERIA).toContain('Méthodes pédagogiques');
    });
  });

  describe('Import/Export flow', () => {
    it('should validate import with dry run', () => {
      const file = new File(['test'], 'teachers.csv', { type: 'text/csv' });
      const result = TeacherImportSchema.safeParse({ file, dryRun: true, skipDuplicates: true });
      expect(result.success).toBe(true);
    });

    it('should validate export to CSV', () => {
      const result = TeacherExportSchema.safeParse({ format: 'CSV', includePhoto: false });
      expect(result.success).toBe(true);
    });

    it('should validate export to JSON', () => {
      const result = TeacherExportSchema.safeParse({ format: 'JSON' });
      expect(result.success).toBe(true);
    });
  });

  describe('Search flow', () => {
    it('should validate search with minimum length', () => {
      const result = TeacherSearchSchema.safeParse({ query: 'Dup' });
      expect(result.success).toBe(true);
    });

    it('should reject search with short query', () => {
      const result = TeacherSearchSchema.safeParse({ query: 'D' });
      expect(result.success).toBe(false);
    });
  });

  describe('Error handling flow', () => {
    it('should chain validation errors correctly', () => {
      const errors = [
        { field: 'firstName', message: 'Prénom requis' },
        { field: 'lastName', message: 'Nom requis' },
      ];
      const err = new TeacherValidationError(errors);
      expect(err.errors).toHaveLength(2);
      expect(err.toJSON()).toHaveProperty('error', 'TEACHER_VALIDATION_ERROR');
    });

    it('should handle limit exceeded errors', () => {
      const err = new TeacherLimitExceededError('teachers', 50, 50);
      expect(err.current).toBe(50);
      expect(err.max).toBe(50);
    });
  });

  describe('Config integration flow', () => {
    it('should respect all teacher statuses', () => {
      const allStatuses = Object.values(TEACHER_STATUS);
      expect(allStatuses).toContain('ACTIVE');
      expect(allStatuses).toContain('INACTIVE');
      expect(allStatuses).toContain('SUSPENDED');
      expect(allStatuses).toContain('ARCHIVED');
      expect(allStatuses).toContain('ON_LEAVE');
      expect(allStatuses).toContain('CONTRACT_ENDED');
    });

    it('should respect permission boundaries', () => {
      expect(TEACHER_PERMISSIONS.DELETE).toEqual(['SUPER_ADMIN']);
      expect(TEACHER_PERMISSIONS.PAYROLL).toContain('ADMIN');
      expect(TEACHER_PERMISSIONS.EVALUATION).toContain('DIRECTEUR');
    });

    it('should respect contract configuration', () => {
      expect(TEACHER_CONTRACT.TYPES).toContain('CDI');
      expect(TEACHER_CONTRACT.TYPES).toContain('CDD');
      expect(TEACHER_CONTRACT.PROBATION_PERIOD_DAYS).toBe(90);
    });

    it('should respect timeline configuration', () => {
      const eventTypes = Object.keys(TEACHER_TIMELINE.EVENT_TYPES);
      expect(eventTypes).toContain('CREATION');
      expect(eventTypes).toContain('ASSIGNMENT');
      expect(eventTypes).toContain('EVALUATION');
      expect(eventTypes).toContain('LEAVE');
    });
  });
});
