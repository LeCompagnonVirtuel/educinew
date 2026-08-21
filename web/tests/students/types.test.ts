import { describe, it, expect } from 'vitest';
import type { Student, StudentFilters, StudentStatistics } from '@/features/students/types';

describe('Student Types', () => {
  it('should have correct Student interface shape', () => {
    const student: Student = {
      id: '123',
      userId: '456',
      schoolId: '789',
      matricule: 'STU25ABCDEF',
      firstName: 'Jean',
      lastName: 'Dupont',
      status: 'ACTIVE',
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    expect(student.id).toBe('123');
    expect(student.firstName).toBe('Jean');
    expect(student.lastName).toBe('Dupont');
    expect(student.status).toBe('ACTIVE');
  });

  it('should support all StudentStatus values', () => {
    const statuses: Array<Student['status']> = ['ACTIVE', 'INACTIVE', 'TRANSFERRED', 'GRADUATED', 'SUSPENDED', 'ARCHIVED', 'DELETED'];
    expect(statuses).toHaveLength(7);
  });

  it('should support StudentFilters', () => {
    const filters: StudentFilters = {
      search: 'test',
      status: 'ACTIVE',
      gender: 'M',
      page: 1,
      limit: 20,
      sortBy: 'firstName',
      sortOrder: 'asc',
    };
    expect(filters.search).toBe('test');
    expect(filters.page).toBe(1);
  });

  it('should support StudentStatistics', () => {
    const stats: StudentStatistics = {
      schoolId: '123',
      totalStudents: 100,
      activeStudents: 90,
      inactiveStudents: 10,
      newStudents: 5,
      boys: 50,
      girls: 50,
      byAge: {},
      byLevel: { 'CP': 20 },
      byClass: {},
      byStatus: { 'ACTIVE': 90 },
      transfers: 3,
      promotions: 10,
      repetitions: 2,
      archived: 5,
    };
    expect(stats.totalStudents).toBe(100);
    expect(stats.activeStudents).toBe(90);
  });

  it('should support CreateStudentRequest', () => {
    const request = {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean@test.com',
      gender: 'M' as const,
    };
    expect(request.firstName).toBe('Jean');
  });

  it('should support StudentDocument', () => {
    const doc = {
      id: '123',
      studentId: '456',
      name: 'Acte de naissance',
      type: 'BIRTH_CERTIFICATE' as const,
      url: 'https://example.com/doc.pdf',
      mimeType: 'application/pdf',
      size: 1024,
      uploadedAt: new Date().toISOString(),
    };
    expect(doc.type).toBe('BIRTH_CERTIFICATE');
  });

  it('should support StudentMedicalRecord', () => {
    const medical = {
      id: '123',
      studentId: '456',
      bloodGroup: 'A+' as const,
      allergies: ['Peanuts'],
      medications: [],
    };
    expect(medical.bloodGroup).toBe('A+');
    expect(medical.allergies).toContain('Peanuts');
  });

  it('should support StudentGuardian', () => {
    const guardian = {
      id: '123',
      studentId: '456',
      name: 'Marie Dupont',
      relationship: 'PARENT' as const,
      phone: '+22507070707',
      isEmergency: true,
    };
    expect(guardian.relationship).toBe('PARENT');
  });

  it('should support StudentTimeline', () => {
    const timeline = {
      id: '123',
      studentId: '456',
      type: 'PROMOTION' as const,
      description: 'Promotion en classe de CE2',
      date: new Date().toISOString(),
    };
    expect(timeline.type).toBe('PROMOTION');
  });

  it('should support StudentPromotion', () => {
    const promo = {
      id: '123',
      studentId: '456',
      fromClassId: 'class-1',
      toClassId: 'class-2',
      academicYearId: 'year-1',
      type: 'PROMOTION' as const,
      date: new Date().toISOString(),
    };
    expect(promo.type).toBe('PROMOTION');
  });

  it('should support StudentTransfer', () => {
    const transfer = {
      id: '123',
      studentId: '456',
      fromSchoolId: 'school-1',
      reason: 'Changement de ville',
      transferDate: new Date().toISOString(),
    };
    expect(transfer.reason).toBe('Changement de ville');
  });
});
