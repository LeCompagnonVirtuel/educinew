import { describe, it, expect } from 'vitest';
import type { Student, StudentStatistics, StudentTimeline, StudentDashboard } from '@/features/students/types';

describe('Student Data Flow', () => {
  const mockStudent: Student = {
    id: 'stu-001',
    userId: 'user-001',
    schoolId: 'school-001',
    classId: 'class-001',
    parentId: 'parent-001',
    matricule: 'STU25ABCDEF',
    firstName: 'Jean',
    lastName: 'Dupont',
    dateOfBirth: '2010-05-15',
    placeOfBirth: 'Abidjan',
    gender: 'M',
    address: '123 Rue de la Paix',
    phone: '+22501234567',
    email: 'jean.dupont@test.com',
    nationality: 'Ivoirienne',
    bloodGroup: 'A+',
    allergies: 'Pollen',
    series: 'A',
    level: 'CE2',
    status: 'ACTIVE',
    enrollmentDate: '2024-09-01',
    isActive: true,
    createdAt: '2024-09-01T00:00:00Z',
    user: { id: 'user-001', name: 'Jean Dupont', email: 'jean@test.com' },
    class: { id: 'class-001', name: 'CE2-A', level: 'CE2' },
    parent: { id: 'parent-001', name: 'Marie Dupont' },
  };

  it('should have all required student fields', () => {
    expect(mockStudent.id).toBeDefined();
    expect(mockStudent.matricule).toBeDefined();
    expect(mockStudent.firstName).toBeDefined();
    expect(mockStudent.lastName).toBeDefined();
    expect(mockStudent.status).toBeDefined();
  });

  it('should support nested user data', () => {
    expect(mockStudent.user?.name).toBe('Jean Dupont');
    expect(mockStudent.user?.email).toBe('jean@test.com');
  });

  it('should support nested class data', () => {
    expect(mockStudent.class?.name).toBe('CE2-A');
    expect(mockStudent.class?.level).toBe('CE2');
  });

  it('should support nested parent data', () => {
    expect(mockStudent.parent?.name).toBe('Marie Dupont');
  });

  it('should serialize to JSON', () => {
    const json = JSON.stringify(mockStudent);
    const parsed = JSON.parse(json);
    expect(parsed.firstName).toBe('Jean');
    expect(parsed.matricule).toBe('STU25ABCDEF');
  });

  it('should support statistics', () => {
    const stats: StudentStatistics = {
      schoolId: 'school-001',
      totalStudents: 500,
      activeStudents: 480,
      inactiveStudents: 20,
      newStudents: 25,
      boys: 260,
      girls: 240,
      byAge: { '10': 50, '11': 60 },
      byLevel: { 'CP': 100, 'CE1': 90, 'CE2': 80 },
      byClass: { 'CP-A': 30, 'CP-B': 35 },
      byStatus: { 'ACTIVE': 480, 'INACTIVE': 20 },
      transfers: 5,
      promotions: 45,
      repetitions: 10,
      archived: 15,
    };
    expect(stats.totalStudents).toBe(500);
    expect(stats.boys + stats.girls).toBe(500);
  });

  it('should support timeline', () => {
    const events: StudentTimeline[] = [
      { id: '1', studentId: 'stu-001', type: 'CREATION', description: 'Création', date: '2024-09-01' },
      { id: '2', studentId: 'stu-001', type: 'CLASS_CHANGE', description: 'Changement de classe', date: '2025-01-15' },
      { id: '3', studentId: 'stu-001', type: 'PROMOTION', description: 'Promotion', date: '2025-06-30' },
    ];
    expect(events).toHaveLength(3);
    expect(events[2].type).toBe('PROMOTION');
  });

  it('should support dashboard', () => {
    const dashboard: StudentDashboard = {
      totalStudents: 500,
      newThisMonth: 25,
      activeToday: 450,
      pendingPayments: 30,
      attendanceRate: 92.5,
      recentActivity: [],
      topPerformers: [],
      lowAttendance: [],
    };
    expect(dashboard.totalStudents).toBe(500);
    expect(dashboard.attendanceRate).toBe(92.5);
  });

  it('should handle student with all optional fields', () => {
    const fullStudent: Student = {
      ...mockStudent,
      emergencyContactName: 'Papa Dupont',
      emergencyContactPhone: '+22509876543',
      emergencyContactRelation: 'Père',
      documents: [],
    };
    expect(fullStudent.emergencyContactName).toBe('Papa Dupont');
    expect(fullStudent.documents).toHaveLength(0);
  });

  it('should handle student without optional fields', () => {
    const minimalStudent: Student = {
      id: 'stu-002',
      userId: 'user-002',
      schoolId: 'school-001',
      matricule: 'STU25XYZABC',
      firstName: 'Marie',
      lastName: 'Kouassi',
      status: 'ACTIVE',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    expect(minimalStudent.classId).toBeUndefined();
    expect(minimalStudent.gender).toBeUndefined();
  });
});
