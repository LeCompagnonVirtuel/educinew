import { describe, it, expect } from 'vitest';
import type {
  Teacher,
  TeacherAssignment,
  TeacherContract,
  TeacherDepartment,
  TeacherSubject,
  TeacherSchedule,
  TeacherAvailability,
  TeacherLeave,
  TeacherQualification,
  TeacherCertification,
  TeacherExperience,
  TeacherEmergencyContact,
  TeacherMedicalRecord,
  TeacherEvaluation,
  TeacherPerformance,
  TeacherStatistics,
  TeacherTimeline,
  TeacherDashboard,
  TeacherPayrollSummary,
  TeacherImport,
  TeacherExport,
  TeacherFilters,
  TeacherSearch,
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
  TimelineEventType,
} from '@educi/types';

describe('Teacher Types Extended', () => {
  it('should define TeacherDepartment correctly', () => {
    const dept: TeacherDepartment = {
      id: '1',
      schoolId: 's1',
      name: 'Département Sciences',
      teacherCount: 10,
      createdAt: new Date().toISOString(),
    };
    expect(dept.name).toBe('Département Sciences');
  });

  it('should define TeacherSubject correctly', () => {
    const subject: TeacherSubject = {
      id: '1',
      schoolId: 's1',
      name: 'Mathématiques',
      code: 'MATH',
      coefficient: 3,
      maxHoursPerWeek: 10,
      levels: ['6ème', '5ème', '4ème'],
    };
    expect(subject.coefficient).toBe(3);
  });

  it('should define TeacherSchedule correctly', () => {
    const schedule: TeacherSchedule = {
      id: '1',
      teacherId: 't1',
      schoolId: 's1',
      classId: 'c1',
      subjectId: 's1',
      dayOfWeek: 1,
      startTime: '08:00',
      endTime: '10:00',
      isRecurring: true,
      startDate: '2025-09-01',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    expect(schedule.dayOfWeek).toBe(1);
  });

  it('should define TeacherAvailability correctly', () => {
    const avail: TeacherAvailability = {
      id: '1',
      teacherId: 't1',
      schoolId: 's1',
      dayOfWeek: 2,
      startTime: '14:00',
      endTime: '18:00',
      isAvailable: true,
      recurring: true,
      createdAt: new Date().toISOString(),
    };
    expect(avail.isAvailable).toBe(true);
  });

  it('should define TeacherQualification correctly', () => {
    const qual: TeacherQualification = {
      id: '1',
      teacherId: 't1',
      institution: 'Université',
      degree: 'Master',
      field: 'Informatique',
      graduationYear: 2022,
      verified: true,
      createdAt: new Date().toISOString(),
    };
    expect(qual.verified).toBe(true);
  });

  it('should define TeacherCertification correctly', () => {
    const cert: TeacherCertification = {
      id: '1',
      teacherId: 't1',
      name: 'CAPES',
      issuingOrganization: 'Ministère',
      issueDate: '2021-06-15',
      verified: true,
      createdAt: new Date().toISOString(),
    };
    expect(cert.name).toBe('CAPES');
  });

  it('should define TeacherExperience correctly', () => {
    const exp: TeacherExperience = {
      id: '1',
      teacherId: 't1',
      organization: 'École Primaire A',
      position: 'Enseignant',
      startDate: '2018-09-01',
      endDate: '2022-06-30',
      isCurrent: false,
    };
    expect(exp.isCurrent).toBe(false);
  });

  it('should define TeacherEmergencyContact correctly', () => {
    const contact: TeacherEmergencyContact = {
      id: '1',
      teacherId: 't1',
      name: 'Marie Dupont',
      phone: '+22507070707',
      relationship: 'Épouse',
      isPrimary: true,
    };
    expect(contact.isPrimary).toBe(true);
  });

  it('should define TeacherMedicalRecord correctly', () => {
    const medical: TeacherMedicalRecord = {
      id: '1',
      teacherId: 't1',
      bloodGroup: 'A+',
      allergies: ['Pollen'],
      medications: [],
      conditions: [],
      createdAt: new Date().toISOString(),
    };
    expect(medical.bloodGroup).toBe('A+');
  });

  it('should define TeacherPerformance correctly', () => {
    const perf: TeacherPerformance = {
      teacherId: 't1',
      averageScore: 16.5,
      totalEvaluations: 5,
      trend: 'IMPROVING',
      strengths: ['Ponctualité'],
      areasForImprovement: ['Méthodes'],
    };
    expect(perf.trend).toBe('IMPROVING');
  });

  it('should define TeacherDashboard correctly', () => {
    const dash: TeacherDashboard = {
      schoolId: 's1',
      totalActive: 50,
      onLeave: 3,
      pendingLeaves: 5,
      expiringContracts: 2,
      recentEvaluations: 10,
      averageScore: 15.5,
      departmentBreakdown: [{ department: 'Sciences', count: 15 }],
      contractBreakdown: [{ type: 'CDI', count: 40 }],
      leaveBreakdown: [{ type: 'ANNUEL', count: 3 }],
      upcomingReviews: [{ teacherId: 't1', teacherName: 'Jean Dupont', date: '2025-06-01', type: 'ANNUELLE' }],
    };
    expect(dash.totalActive).toBe(50);
  });

  it('should define TeacherPayrollSummary correctly', () => {
    const payroll: TeacherPayrollSummary = {
      teacherId: 't1',
      teacherName: 'Jean Dupont',
      matricule: 'TCH001',
      baseSalary: 500000,
      overtimePay: 50000,
      bonuses: 25000,
      deductions: 30000,
      netPay: 545000,
      contractType: 'CDI',
      hoursWorked: 160,
      overtimeHours: 10,
    };
    expect(payroll.netPay).toBe(545000);
  });

  it('should define all TimelineEventType values', () => {
    const types: TimelineEventType[] = ['CREATION', 'ASSIGNMENT', 'SCHEDULE_CHANGE', 'CONTRACT_UPDATE', 'LEAVE', 'EVALUATION', 'PROMOTION', 'TRANSFER', 'MEDICAL', 'DOCUMENT', 'PHOTO', 'OTHER'];
    expect(types).toHaveLength(12);
  });

  it('should define all TeacherLeaveType values', () => {
    const types: TeacherLeaveType[] = ['MALADIE', 'MATERNITE', 'PATERNITE', 'ANNUEL', 'EXCEPTIONNEL', 'SANS_SOLDE', 'FORMATION'];
    expect(types).toHaveLength(7);
  });

  it('should define all TeacherLeaveStatus values', () => {
    const statuses: TeacherLeaveStatus[] = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'];
    expect(statuses).toHaveLength(4);
  });

  it('should define all TeacherEvaluationType values', () => {
    const types: TeacherEvaluationType[] = ['PEDAGOGIQUE', 'ADMINISTRATIVE', 'ANNUELLE', 'PROBATION'];
    expect(types).toHaveLength(4);
  });

  it('should define all TeacherEmploymentType values', () => {
    const types: TeacherEmploymentType[] = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'VOLUNTEER', 'INTERN'];
    expect(types).toHaveLength(5);
  });

  it('should define all TeacherContractType values', () => {
    const types: TeacherContractType[] = ['CDI', 'CDD', 'VACATAIRE', 'CONSULTANT', 'STAGE'];
    expect(types).toHaveLength(5);
  });

  it('should define all TeacherGender values', () => {
    const genders: TeacherGender[] = ['M', 'F', 'OTHER', 'UNKNOWN'];
    expect(genders).toHaveLength(4);
  });
});
