import { describe, it, expect } from 'vitest';
import type {
  Teacher,
  TeacherProfile,
  TeacherAssignment,
  TeacherContract,
  TeacherDepartment,
  TeacherSubject,
  TeacherSchedule,
  TeacherAvailability,
  TeacherLeave,
  TeacherQualification,
  TeacherCertification,
  TeacherEvaluation,
  TeacherStatistics,
  TeacherTimeline,
  TeacherDashboard,
  TeacherPayrollSummary,
  TeacherFilters,
  TeacherSearch,
  TeacherImport,
  TeacherExport,
  CreateTeacherRequest,
  UpdateTeacherRequest,
  TeacherListResult,
  TeacherStatus,
  TeacherGender,
  TeacherEmploymentType,
  TeacherContractType,
  TeacherGrade,
  TeacherSpeciality,
  TeacherLeaveType,
  TeacherLeaveStatus,
  TeacherEvaluationType,
} from '@educi/types';

describe('Teacher Types', () => {
  it('should define Teacher interface correctly', () => {
    const teacher: Teacher = {
      id: '1',
      userId: 'u1',
      schoolId: 's1',
      matricule: 'TCH001',
      firstName: 'Jean',
      lastName: 'Dupont',
      employmentType: 'FULL_TIME',
      contractType: 'CDI',
      status: 'ACTIVE',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    expect(teacher.id).toBe('1');
    expect(teacher.employmentType).toBe('FULL_TIME');
  });

  it('should define TeacherAssignment correctly', () => {
    const assignment: TeacherAssignment = {
      id: '1',
      teacherId: 't1',
      schoolId: 's1',
      classId: 'c1',
      subjectId: 'sub1',
      academicYearId: 'ay1',
      hoursPerWeek: 6,
      startDate: '2025-09-01',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    expect(assignment.hoursPerWeek).toBe(6);
  });

  it('should define TeacherContract correctly', () => {
    const contract: TeacherContract = {
      id: '1',
      teacherId: 't1',
      schoolId: 's1',
      contractType: 'CDI',
      startDate: '2025-09-01',
      terms: 'Contrat',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };
    expect(contract.contractType).toBe('CDI');
  });

  it('should define TeacherLeave correctly', () => {
    const leave: TeacherLeave = {
      id: '1',
      teacherId: 't1',
      schoolId: 's1',
      leaveType: 'ANNUEL',
      startDate: '2025-12-20',
      endDate: '2026-01-05',
      reason: 'Vacances',
      status: 'PENDING',
      daysCount: 16,
      createdAt: new Date().toISOString(),
    };
    expect(leave.leaveType).toBe('ANNUEL');
    expect(leave.daysCount).toBe(16);
  });

  it('should define TeacherEvaluation correctly', () => {
    const evaluation: TeacherEvaluation = {
      id: '1',
      teacherId: 't1',
      schoolId: 's1',
      evaluatorId: 'e1',
      evaluationType: 'PEDAGOGIQUE',
      period: 'T1 2025',
      maxScore: 20,
      criteria: [{ name: 'Ponctualité', score: 16, maxScore: 20 }],
      createdAt: new Date().toISOString(),
    };
    expect(evaluation.criteria).toHaveLength(1);
  });

  it('should define TeacherStatistics correctly', () => {
    const stats: TeacherStatistics = {
      schoolId: 's1',
      totalTeachers: 50,
      activeTeachers: 45,
      inactiveTeachers: 5,
      onLeave: 3,
      byGender: { M: 30, F: 20 },
      byContractType: { CDI: 40, CDD: 10 },
      bySpeciality: {},
      byDepartment: {},
      byGrade: {},
      averageSeniority: 5.2,
      averageSalary: 500000,
      totalHoursPerWeek: 1000,
      leaveApprovalRate: 0.85,
      averageEvaluationScore: 15.5,
    };
    expect(stats.totalTeachers).toBe(50);
  });

  it('should define CreateTeacherRequest correctly', () => {
    const request: CreateTeacherRequest = {
      firstName: 'Jean',
      lastName: 'Dupont',
      employmentType: 'FULL_TIME',
      contractType: 'CDI',
    };
    expect(request.firstName).toBe('Jean');
  });

  it('should define UpdateTeacherRequest correctly', () => {
    const request: UpdateTeacherRequest = {
      firstName: 'Nouveau',
      status: 'INACTIVE',
    };
    expect(request.firstName).toBe('Nouveau');
  });

  it('should define TeacherListResult correctly', () => {
    const result: TeacherListResult = {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    };
    expect(result.total).toBe(0);
  });

  it('should define TeacherFilters correctly', () => {
    const filters: TeacherFilters = {
      search: 'test',
      status: 'ACTIVE',
      gender: 'M',
      employmentType: 'FULL_TIME',
      page: 1,
      limit: 20,
    };
    expect(filters.search).toBe('test');
  });

  it('should define all TeacherStatus values', () => {
    const statuses: TeacherStatus[] = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED', 'ON_LEAVE', 'CONTRACT_ENDED'];
    expect(statuses).toHaveLength(6);
  });

  it('should define all TeacherGrade values', () => {
    const grades: TeacherGrade[] = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3'];
    expect(grades).toHaveLength(12);
  });

  it('should define all TeacherSpeciality values', () => {
    const specialities: TeacherSpeciality[] = ['MATHEMATIQUES', 'PHYSIQUE', 'CHIMIE', 'BIOLOGIE', 'FRANCAIS', 'ANGLAIS', 'HISTOIRE', 'GEOGRAPHIE', 'PHILOSOPHIE', 'INFORMATIQUE', 'EDUCATION_PHYSIQUE', 'ARTS', 'MUSIQUE', 'TECHNOLOGIE', 'ECONOMIE', 'DROIT', 'AUTRE'];
    expect(specialities).toHaveLength(17);
  });
});
