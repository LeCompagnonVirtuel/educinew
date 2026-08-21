import { describe, it, expect } from 'vitest';
import {
  CreateTeacherSchema,
  UpdateTeacherSchema,
  ArchiveTeacherSchema,
  DeleteTeacherSchema,
  AssignmentSchema,
  SubjectSchema,
  ScheduleSchema,
  AvailabilitySchema,
  ContractSchema,
  LeaveSchema,
  PayrollSchema,
  QualificationSchema,
  CertificationSchema,
  EvaluationSchema,
  TeacherMedicalSchema,
  EmergencyContactSchema,
  TeacherImportSchema,
  TeacherExportSchema,
  TeacherFiltersSchema,
  TeacherSearchSchema,
  TeacherStatisticsSchema,
  TeacherTimelineSchema,
} from '@/features/teachers/validators';

describe('Teacher Validators', () => {
  describe('CreateTeacherSchema', () => {
    it('should validate correct teacher data', () => {
      const result = CreateTeacherSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
        employmentType: 'FULL_TIME',
        contractType: 'CDI',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty firstName', () => {
      const result = CreateTeacherSchema.safeParse({ firstName: '', lastName: 'Dupont', employmentType: 'FULL_TIME', contractType: 'CDI' });
      expect(result.success).toBe(false);
    });

    it('should reject empty lastName', () => {
      const result = CreateTeacherSchema.safeParse({ firstName: 'Jean', lastName: '', employmentType: 'FULL_TIME', contractType: 'CDI' });
      expect(result.success).toBe(false);
    });

    it('should require employmentType', () => {
      const result = CreateTeacherSchema.safeParse({ firstName: 'Jean', lastName: 'Dupont', contractType: 'CDI' });
      expect(result.success).toBe(false);
    });

    it('should require contractType', () => {
      const result = CreateTeacherSchema.safeParse({ firstName: 'Jean', lastName: 'Dupont', employmentType: 'FULL_TIME' });
      expect(result.success).toBe(false);
    });

    it('should accept all employment types', () => {
      for (const type of ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'VOLUNTEER', 'INTERN']) {
        const result = CreateTeacherSchema.safeParse({ firstName: 'A', lastName: 'B', employmentType: type, contractType: 'CDI' });
        expect(result.success).toBe(true);
      }
    });

    it('should accept all contract types', () => {
      for (const type of ['CDI', 'CDD', 'VACATAIRE', 'CONSULTANT', 'STAGE']) {
        const result = CreateTeacherSchema.safeParse({ firstName: 'A', lastName: 'B', employmentType: 'FULL_TIME', contractType: type });
        expect(result.success).toBe(true);
      }
    });

    it('should accept all grades', () => {
      for (const grade of ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3']) {
        const result = CreateTeacherSchema.safeParse({ firstName: 'A', lastName: 'B', employmentType: 'FULL_TIME', contractType: 'CDI', grade });
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid email', () => {
      const result = CreateTeacherSchema.safeParse({ firstName: 'A', lastName: 'B', employmentType: 'FULL_TIME', contractType: 'CDI', email: 'invalid' });
      expect(result.success).toBe(false);
    });

    it('should reject invalid phone', () => {
      const result = CreateTeacherSchema.safeParse({ firstName: 'A', lastName: 'B', employmentType: 'FULL_TIME', contractType: 'CDI', phone: '123' });
      expect(result.success).toBe(false);
    });

    it('should accept optional fields', () => {
      const result = CreateTeacherSchema.safeParse({
        firstName: 'Jean',
        lastName: 'Dupont',
        employmentType: 'FULL_TIME',
        contractType: 'CDI',
        email: 'jean@test.com',
        phone: '+22501234567',
        gender: 'M',
        grade: 'A1',
        speciality: 'MATHEMATIQUES',
        salary: 500000,
        maxWeeklyHours: 24,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('UpdateTeacherSchema', () => {
    it('should validate partial update', () => {
      const result = UpdateTeacherSchema.safeParse({ firstName: 'Nouveau' });
      expect(result.success).toBe(true);
    });

    it('should validate status update', () => {
      const result = UpdateTeacherSchema.safeParse({ status: 'INACTIVE' });
      expect(result.success).toBe(true);
    });

    it('should accept all statuses', () => {
      for (const status of ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED', 'ON_LEAVE', 'CONTRACT_ENDED']) {
        const result = UpdateTeacherSchema.safeParse({ status });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('ArchiveTeacherSchema', () => {
    it('should validate with reason', () => {
      const result = ArchiveTeacherSchema.safeParse({ teacherId: '123e4567-e89b-12d3-a456-426614174000', reason: 'Départ' });
      expect(result.success).toBe(true);
    });

    it('should validate without reason', () => {
      const result = ArchiveTeacherSchema.safeParse({ teacherId: '123e4567-e89b-12d3-a456-426614174000' });
      expect(result.success).toBe(true);
    });
  });

  describe('DeleteTeacherSchema', () => {
    it('should require SUPPRIMER', () => {
      const result = DeleteTeacherSchema.safeParse({ teacherId: '123e4567-e89b-12d3-a456-426614174000', confirmation: 'SUPPRIMER' });
      expect(result.success).toBe(true);
    });

    it('should reject wrong confirmation', () => {
      const result = DeleteTeacherSchema.safeParse({ teacherId: '123e4567-e89b-12d3-a456-426614174000', confirmation: 'DELETE' });
      expect(result.success).toBe(false);
    });
  });

  describe('AssignmentSchema', () => {
    it('should validate correct assignment', () => {
      const result = AssignmentSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        subjectId: '123e4567-e89b-12d3-a456-426614174002',
        academicYearId: '123e4567-e89b-12d3-a456-426614174003',
        hoursPerWeek: 6,
        startDate: '2025-09-01',
      });
      expect(result.success).toBe(true);
    });

    it('should require hoursPerWeek', () => {
      const result = AssignmentSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        subjectId: '123e4567-e89b-12d3-a456-426614174002',
        academicYearId: '123e4567-e89b-12d3-a456-426614174003',
        startDate: '2025-09-01',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('SubjectSchema', () => {
    it('should validate correct subject', () => {
      const result = SubjectSchema.safeParse({ name: 'Mathématiques', code: 'MATH', levels: ['6ème', '5ème'] });
      expect(result.success).toBe(true);
    });

    it('should require at least one level', () => {
      const result = SubjectSchema.safeParse({ name: 'Mathématiques', code: 'MATH', levels: [] });
      expect(result.success).toBe(false);
    });
  });

  describe('ScheduleSchema', () => {
    it('should validate correct schedule', () => {
      const result = ScheduleSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        subjectId: '123e4567-e89b-12d3-a456-426614174002',
        dayOfWeek: 1,
        startTime: '08:00',
        endTime: '10:00',
        startDate: '2025-09-01',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid time format', () => {
      const result = ScheduleSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        subjectId: '123e4567-e89b-12d3-a456-426614174002',
        dayOfWeek: 1,
        startTime: '8am',
        endTime: '10am',
        startDate: '2025-09-01',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('AvailabilitySchema', () => {
    it('should validate correct availability', () => {
      const result = AvailabilitySchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        dayOfWeek: 1,
        startTime: '08:00',
        endTime: '17:00',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('ContractSchema', () => {
    it('should validate correct contract', () => {
      const result = ContractSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        contractType: 'CDI',
        startDate: '2025-09-01',
        terms: 'Contrat à durée indéterminée',
      });
      expect(result.success).toBe(true);
    });

    it('should require terms', () => {
      const result = ContractSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        contractType: 'CDI',
        startDate: '2025-09-01',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('LeaveSchema', () => {
    it('should validate correct leave', () => {
      const result = LeaveSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        leaveType: 'ANNUEL',
        startDate: '2025-12-20',
        endDate: '2026-01-05',
        reason: 'Vacances',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all leave types', () => {
      for (const type of ['MALADIE', 'MATERNITE', 'PATERNITE', 'ANNUEL', 'EXCEPTIONNEL', 'SANS_SOLDE', 'FORMATION']) {
        const result = LeaveSchema.safeParse({
          teacherId: '123e4567-e89b-12d3-a456-426614174000',
          leaveType: type,
          startDate: '2025-12-20',
          endDate: '2026-01-05',
          reason: 'Test',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('PayrollSchema', () => {
    it('should validate correct payroll params', () => {
      const result = PayrollSchema.safeParse({ schoolId: '123e4567-e89b-12d3-a456-426614174000', month: 1, year: 2025 });
      expect(result.success).toBe(true);
    });

    it('should reject invalid month', () => {
      const result = PayrollSchema.safeParse({ schoolId: '123e4567-e89b-12d3-a456-426614174000', month: 13, year: 2025 });
      expect(result.success).toBe(false);
    });
  });

  describe('QualificationSchema', () => {
    it('should validate correct qualification', () => {
      const result = QualificationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        institution: 'Université de Cocody',
        degree: 'Licence',
        field: 'Mathématiques',
        graduationYear: 2020,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('CertificationSchema', () => {
    it('should validate correct certification', () => {
      const result = CertificationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'CAPES',
        issuingOrganization: 'Ministère de l\'Éducation',
        issueDate: '2021-06-15',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('EvaluationSchema', () => {
    it('should validate correct evaluation', () => {
      const result = EvaluationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        evaluationType: 'PEDAGOGIQUE',
        period: 'T1 2025',
        maxScore: 20,
        criteria: [{ name: 'Ponctualité', score: 16, maxScore: 20 }],
      });
      expect(result.success).toBe(true);
    });

    it('should require at least one criterion', () => {
      const result = EvaluationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        evaluationType: 'PEDAGOGIQUE',
        period: 'T1 2025',
        criteria: [],
      });
      expect(result.success).toBe(false);
    });

    it('should accept all evaluation types', () => {
      for (const type of ['PEDAGOGIQUE', 'ADMINISTRATIVE', 'ANNUELLE', 'PROBATION']) {
        const result = EvaluationSchema.safeParse({
          teacherId: '123e4567-e89b-12d3-a456-426614174000',
          evaluationType: type,
          period: 'T1 2025',
          criteria: [{ name: 'Test', score: 15, maxScore: 20 }],
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('TeacherMedicalSchema', () => {
    it('should validate correct medical data', () => {
      const result = TeacherMedicalSchema.safeParse({
        bloodGroup: 'A+',
        height: 175,
        weight: 70,
        allergies: ['Pollen'],
      });
      expect(result.success).toBe(true);
    });

    it('should accept empty medical data', () => {
      const result = TeacherMedicalSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });

  describe('EmergencyContactSchema', () => {
    it('should validate correct contact', () => {
      const result = EmergencyContactSchema.safeParse({
        name: 'Marie Dupont',
        phone: '+22507070707',
        relationship: 'Épouse',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = EmergencyContactSchema.safeParse({ name: '', phone: '+22507070707', relationship: 'Épouse' });
      expect(result.success).toBe(false);
    });
  });

  describe('TeacherImportSchema', () => {
    it('should validate with CSV file', () => {
      const file = new File(['test'], 'teachers.csv', { type: 'text/csv' });
      const result = TeacherImportSchema.safeParse({ file });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherExportSchema', () => {
    it('should validate CSV export', () => {
      const result = TeacherExportSchema.safeParse({ format: 'CSV' });
      expect(result.success).toBe(true);
    });

    it('should accept all formats', () => {
      for (const format of ['PDF', 'EXCEL', 'CSV', 'JSON']) {
        const result = TeacherExportSchema.safeParse({ format });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('TeacherFiltersSchema', () => {
    it('should validate with defaults', () => {
      const result = TeacherFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it('should validate custom filters', () => {
      const result = TeacherFiltersSchema.safeParse({
        search: 'test',
        status: 'ACTIVE',
        gender: 'M',
        employmentType: 'FULL_TIME',
        page: 2,
        limit: 50,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherSearchSchema', () => {
    it('should validate correct search', () => {
      const result = TeacherSearchSchema.safeParse({ query: 'Jean' });
      expect(result.success).toBe(true);
    });

    it('should reject short query', () => {
      const result = TeacherSearchSchema.safeParse({ query: 'J' });
      expect(result.success).toBe(false);
    });
  });

  describe('TeacherStatisticsSchema', () => {
    it('should validate with schoolId', () => {
      const result = TeacherStatisticsSchema.safeParse({ schoolId: '123e4567-e89b-12d3-a456-426614174000' });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherTimelineSchema', () => {
    it('should validate correct timeline event', () => {
      const result = TeacherTimelineSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        type: 'CREATION',
        description: 'Création de l\'enseignant',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all event types', () => {
      const types = ['CREATION', 'ASSIGNMENT', 'SCHEDULE_CHANGE', 'CONTRACT_UPDATE', 'LEAVE', 'EVALUATION', 'PROMOTION', 'TRANSFER', 'MEDICAL', 'DOCUMENT', 'PHOTO', 'OTHER'];
      for (const type of types) {
        const result = TeacherTimelineSchema.safeParse({
          teacherId: '123e4567-e89b-12d3-a456-426614174000',
          type,
          description: 'Test',
        });
        expect(result.success).toBe(true);
      }
    });
  });
});
