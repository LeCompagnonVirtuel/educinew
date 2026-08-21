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

describe('Teacher Validators Extended', () => {
  describe('SubjectSchema', () => {
    it('should validate with coefficient', () => {
      const result = SubjectSchema.safeParse({ name: 'Physique', code: 'PHY', coefficient: 2.5, levels: ['6ème'] });
      expect(result.success).toBe(true);
    });

    it('should reject coefficient < 0.5', () => {
      const result = SubjectSchema.safeParse({ name: 'Physique', code: 'PHY', coefficient: 0.3, levels: ['6ème'] });
      expect(result.success).toBe(false);
    });

    it('should accept max hours per week', () => {
      const result = SubjectSchema.safeParse({ name: 'Physique', code: 'PHY', maxHoursPerWeek: 20, levels: ['6ème'] });
      expect(result.success).toBe(true);
    });
  });

  describe('ScheduleSchema', () => {
    it('should validate recurring schedule', () => {
      const result = ScheduleSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        subjectId: '123e4567-e89b-12d3-a456-426614174002',
        dayOfWeek: 3,
        startTime: '14:00',
        endTime: '16:00',
        room: 'Salle A101',
        isRecurring: true,
        startDate: '2025-09-01',
        endDate: '2026-06-30',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid dayOfWeek', () => {
      const result = ScheduleSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        subjectId: '123e4567-e89b-12d3-a456-426614174002',
        dayOfWeek: 8,
        startTime: '08:00',
        endTime: '10:00',
        startDate: '2025-09-01',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('AvailabilitySchema', () => {
    it('should validate unavailable slot', () => {
      const result = AvailabilitySchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        dayOfWeek: 5,
        startTime: '12:00',
        endTime: '14:00',
        isAvailable: false,
        reason: 'Réunion',
        recurring: false,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('ContractSchema', () => {
    it('should validate CDD with end date', () => {
      const result = ContractSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        contractType: 'CDD',
        startDate: '2025-09-01',
        endDate: '2026-06-30',
        salary: 400000,
        maxHoursPerWeek: 20,
        terms: 'Contrat à durée déterminée pour l\'année scolaire',
      });
      expect(result.success).toBe(true);
    });

    it('should validate vacataire contract', () => {
      const result = ContractSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        contractType: 'VACATAIRE',
        startDate: '2025-09-01',
        hourlyRate: 5000,
        terms: 'Cours vacataire',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('LeaveSchema', () => {
    it('should validate maladie leave', () => {
      const result = LeaveSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        leaveType: 'MALADIE',
        startDate: '2025-10-01',
        endDate: '2025-10-05',
        reason: 'Grippe',
      });
      expect(result.success).toBe(true);
    });

    it('should validate formation leave', () => {
      const result = LeaveSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        leaveType: 'FORMATION',
        startDate: '2025-11-10',
        endDate: '2025-11-15',
        reason: 'Formation pédagogique',
        attachments: ['https://example.com/cert.pdf'],
      });
      expect(result.success).toBe(true);
    });

    it('should validate exceptionnel leave', () => {
      const result = LeaveSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        leaveType: 'EXCEPTIONNEL',
        startDate: '2025-12-01',
        endDate: '2025-12-03',
        reason: 'Décès d\'un proche',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('QualificationSchema', () => {
    it('should validate with grade', () => {
      const result = QualificationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        institution: 'Université Félix Houphouët-Boigny',
        degree: 'Master',
        field: 'Informatique',
        graduationYear: 2022,
        grade: 'Bien',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid graduation year', () => {
      const result = QualificationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        institution: 'Université',
        degree: 'Licence',
        field: 'Math',
        graduationYear: 2040,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CertificationSchema', () => {
    it('should validate with expiry date', () => {
      const result = CertificationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Certification TICE',
        issuingOrganization: 'Ministère',
        issueDate: '2023-06-15',
        expiryDate: '2026-06-15',
        certificateNumber: 'CERT-2023-001',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('EvaluationSchema', () => {
    it('should validate with all fields', () => {
      const result = EvaluationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        evaluationType: 'ANNUELLE',
        period: 'Année 2024-2025',
        score: 17,
        maxScore: 20,
        criteria: [
          { name: 'Ponctualité', score: 19, maxScore: 20, comment: 'Excellent' },
          { name: 'Préparation', score: 16, maxScore: 20 },
          { name: 'Méthodes', score: 17, maxScore: 20 },
        ],
        strengths: ['Très ponctuel', 'Bonne préparation'],
        improvements: ['Diversifier les méthodes'],
        overallComment: 'Enseignant performant',
        nextReviewDate: '2026-06-01',
      });
      expect(result.success).toBe(true);
    });

    it('should validate probation evaluation', () => {
      const result = EvaluationSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        evaluationType: 'PROBATION',
        period: 'Mois 1',
        criteria: [{ name: 'Adaptation', score: 14, maxScore: 20 }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherMedicalSchema', () => {
    it('should validate complete medical record', () => {
      const result = TeacherMedicalSchema.safeParse({
        bloodGroup: 'O+',
        height: 180,
        weight: 75,
        allergies: ['Pollique', 'Poussière'],
        medications: ['Antihistaminique'],
        conditions: ['Asthme léger'],
        doctorName: 'Dr. Touré',
        doctorPhone: '+22507070707',
        insuranceProvider: 'CNAM',
        insuranceNumber: 'CNAM-12345',
        notes: 'Asthme léger sous contrôle',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('EmergencyContactSchema', () => {
    it('should validate non-primary contact', () => {
      const result = EmergencyContactSchema.safeParse({
        name: 'Paul Bamba',
        phone: '+22508080808',
        relationship: 'Frère',
        address: 'Abidjan, Cocody',
        isPrimary: false,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherImportSchema', () => {
    it('should validate with mapping', () => {
      const file = new File(['test'], 'teachers.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const result = TeacherImportSchema.safeParse({
        file,
        mapping: { 'Prénom': 'firstName', 'Nom': 'lastName' },
        skipDuplicates: false,
        dryRun: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherExportSchema', () => {
    it('should validate with selected IDs', () => {
      const result = TeacherExportSchema.safeParse({
        format: 'PDF',
        selectedIds: ['123e4567-e89b-12d3-a456-426614174000'],
        includePhoto: true,
      });
      expect(result.success).toBe(true);
    });

    it('should validate with filters', () => {
      const result = TeacherExportSchema.safeParse({
        format: 'EXCEL',
        filters: { status: 'ACTIVE', departmentId: '123e4567-e89b-12d3-a456-426614174000' },
      });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherFiltersSchema', () => {
    it('should validate with all filter options', () => {
      const result = TeacherFiltersSchema.safeParse({
        search: 'Dupont',
        status: 'ACTIVE',
        gender: 'M',
        employmentType: 'FULL_TIME',
        contractType: 'CDI',
        departmentId: '123e4567-e89b-12d3-a456-426614174000',
        grade: 'A1',
        speciality: 'MATHEMATIQUES',
        hireDateFrom: '2020-01-01',
        hireDateTo: '2025-12-31',
        hasContract: true,
        page: 3,
        limit: 10,
        sortBy: 'hireDate',
        sortOrder: 'asc',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherSearchSchema', () => {
    it('should validate with custom limit', () => {
      const result = TeacherSearchSchema.safeParse({ query: 'Mathématiques', limit: 10 });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherStatisticsSchema', () => {
    it('should validate with academic year', () => {
      const result = TeacherStatisticsSchema.safeParse({
        schoolId: '123e4567-e89b-12d3-a456-426614174000',
        academicYearId: '123e4567-e89b-12d3-a456-426614174001',
        departmentId: '123e4567-e89b-12d3-a456-426614174002',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('TeacherTimelineSchema', () => {
    it('should validate with details', () => {
      const result = TeacherTimelineSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        type: 'ASSIGNMENT',
        description: 'Affectation en Mathématiques',
        details: { classId: 'c1', subjectId: 's1', hoursPerWeek: 6 },
      });
      expect(result.success).toBe(true);
    });
  });
});
