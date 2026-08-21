import { describe, it, expect } from 'vitest';
import type {
  AcademicYear,
  Term,
  Level,
  Section,
  Stream,
  Department,
  Subject,
  SchoolClass,
  Room,
  TeacherAssignment,
  TimetableSlot,
  ScheduleConflict,
  AcademicEvent,
  AcademicStatistics,
  AcademicDashboard,
} from '@educi/types';

describe('Academic Types', () => {
  describe('AcademicYear', () => {
    it('should have required fields', () => {
      const year: AcademicYear = {
        id: '1', schoolId: '1', name: '2024-2025', startDate: '2024-09-01', endDate: '2025-06-30',
        status: 'ACTIVE', isCurrent: true, termsCount: 3, createdAt: '', updatedAt: '',
      };
      expect(year.id).toBeDefined();
      expect(year.schoolId).toBeDefined();
      expect(year.name).toBeDefined();
      expect(year.status).toBeDefined();
    });
  });

  describe('Term', () => {
    it('should have required fields', () => {
      const term: Term = {
        id: '1', academicYearId: '1', name: 'Trimestre 1', order: 1,
        startDate: '2024-09-01', endDate: '2024-12-20', createdAt: '', updatedAt: '',
      };
      expect(term.id).toBeDefined();
      expect(term.academicYearId).toBeDefined();
      expect(term.order).toBeDefined();
    });
  });

  describe('Level', () => {
    it('should have required fields', () => {
      const level: Level = {
        id: '1', schoolId: '1', name: 'Sixième', code: '6EME', order: 1,
        educationCycle: 'COLLEGE', createdAt: '', updatedAt: '',
      };
      expect(level.id).toBeDefined();
      expect(level.educationCycle).toBeDefined();
    });
  });

  describe('Section', () => {
    it('should have required fields', () => {
      const section: Section = {
        id: '1', schoolId: '1', name: 'Section A', code: 'SEC-A',
        createdAt: '', updatedAt: '',
      };
      expect(section.id).toBeDefined();
      expect(section.name).toBeDefined();
    });
  });

  describe('Stream', () => {
    it('should have required fields', () => {
      const stream: Stream = {
        id: '1', schoolId: '1', name: 'Scientifique', code: 'SCI',
        createdAt: '', updatedAt: '',
      };
      expect(stream.id).toBeDefined();
      expect(stream.code).toBeDefined();
    });
  });

  describe('Department', () => {
    it('should have required fields', () => {
      const dept: Department = {
        id: '1', schoolId: '1', name: 'Mathématiques', code: 'MATH',
        createdAt: '', updatedAt: '',
      };
      expect(dept.id).toBeDefined();
      expect(dept.code).toBeDefined();
    });
  });

  describe('Subject', () => {
    it('should have required fields', () => {
      const subject: Subject = {
        id: '1', schoolId: '1', name: 'Mathématiques', code: 'MATH',
        coefficient: 3, maxHoursPerWeek: 5, archived: false,
        createdAt: '', updatedAt: '',
      };
      expect(subject.id).toBeDefined();
      expect(subject.coefficient).toBeDefined();
    });
  });

  describe('SchoolClass', () => {
    it('should have required fields', () => {
      const cls: SchoolClass = {
        id: '1', schoolId: '1', name: '6ème A', levelId: '1', academicYearId: '1',
        capacity: 40, status: 'ACTIVE', createdAt: '', updatedAt: '',
      };
      expect(cls.id).toBeDefined();
      expect(cls.capacity).toBeDefined();
    });
  });

  describe('Room', () => {
    it('should have required fields', () => {
      const room: Room = {
        id: '1', schoolId: '1', name: 'Salle 101', code: 'S101',
        capacity: 40, roomType: 'NORMAL', status: 'AVAILABLE',
        hasProjector: false, hasWhiteboard: true, hasComputer: false, hasInternet: false,
        createdAt: '', updatedAt: '',
      };
      expect(room.id).toBeDefined();
      expect(room.roomType).toBeDefined();
      expect(room.status).toBeDefined();
    });
  });

  describe('TeacherAssignment', () => {
    it('should have required fields', () => {
      const assignment: TeacherAssignment = {
        id: '1', schoolId: '1', teacherId: '1', classId: '1',
        subjectId: '1', academicYearId: '1', hoursPerWeek: 5,
        startDate: '2024-09-01', status: 'ACTIVE',
        createdAt: '', updatedAt: '',
      };
      expect(assignment.id).toBeDefined();
      expect(assignment.hoursPerWeek).toBeDefined();
    });
  });

  describe('TimetableSlot', () => {
    it('should have required fields', () => {
      const slot: TimetableSlot = {
        id: '1', schoolId: '1', classId: '1', subjectId: '1',
        teacherId: '1', academicYearId: '1', dayOfWeek: 1,
        startTime: '08:00', endTime: '09:00', isBreak: false,
        status: 'ACTIVE', createdAt: '', updatedAt: '',
      };
      expect(slot.id).toBeDefined();
      expect(slot.dayOfWeek).toBeDefined();
      expect(slot.startTime).toBeDefined();
    });
  });

  describe('ScheduleConflict', () => {
    it('should have required fields', () => {
      const conflict: ScheduleConflict = {
        id: '1', schoolId: '1', conflictType: 'TEACHER',
        description: 'Double booking', severity: 'HIGH', resolved: false,
        createdAt: '',
      };
      expect(conflict.id).toBeDefined();
      expect(conflict.conflictType).toBeDefined();
      expect(conflict.severity).toBeDefined();
    });
  });

  describe('AcademicEvent', () => {
    it('should have required fields', () => {
      const event: AcademicEvent = {
        id: '1', schoolId: '1', academicYearId: '1', title: 'Examen',
        eventType: 'EXAM', startDate: '2024-12-10', endDate: '2024-12-15',
        isRecurring: false, createdAt: '', updatedAt: '',
      };
      expect(event.id).toBeDefined();
      expect(event.eventType).toBeDefined();
    });
  });

  describe('AcademicStatistics', () => {
    it('should have required fields', () => {
      const stats: AcademicStatistics = {
        schoolId: '1', academicYearId: '1', totalClasses: 10,
        totalSubjects: 15, totalTeachers: 20, totalRooms: 5,
        roomOccupancyRate: 80, teacherWorkloadAvg: 5,
        classFillRate: 75, totalHoursPerWeek: 100,
        byLevel: [], byDepartment: [], roomUsage: [],
      };
      expect(stats.schoolId).toBeDefined();
      expect(stats.totalClasses).toBeDefined();
    });
  });

  describe('AcademicDashboard', () => {
    it('should have required fields', () => {
      const dashboard: AcademicDashboard = {
        schoolId: '1', totalClasses: 10, totalSubjects: 15,
        activeTeachers: 20, totalRooms: 5, availableRooms: 3,
        todayClasses: 8, pendingConflicts: 2, upcomingEvents: 5,
        classBreakdown: [], subjectBreakdown: [], roomBreakdown: [],
      };
      expect(dashboard.schoolId).toBeDefined();
      expect(dashboard.todayClasses).toBeDefined();
    });
  });
});
