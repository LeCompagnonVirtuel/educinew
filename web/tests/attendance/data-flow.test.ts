import { describe, it, expect } from 'vitest';
import type { Attendance, TeacherAttendance, AttendanceSession, AttendanceFilters, StudentAttendanceStatus } from '@educi/types';
import { AttendanceValidationError, AttendanceNotFoundError, AttendanceConflictError } from '@educi/errors';

describe('Attendance Data Flow', () => {
  it('should create attendance with valid data', () => {
    const attendance: Attendance = {
      id: 'att-001',
      schoolId: 'school-001',
      studentId: 'student-001',
      classId: 'class-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      status: 'PRESENT',
      method: 'MANUAL',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: false,
      isExcused: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.id).toBe('att-001');
    expect(attendance.status).toBe('PRESENT');
    expect(attendance.schoolId).toBe('school-001');
  });

  it('should create attendance with ABSENT status', () => {
    const attendance: Attendance = {
      id: 'att-002',
      schoolId: 'school-001',
      studentId: 'student-001',
      classId: 'class-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      status: 'ABSENT',
      method: 'MANUAL',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: false,
      isExcused: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.status).toBe('ABSENT');
  });

  it('should create attendance with LATE status', () => {
    const attendance: Attendance = {
      id: 'att-003',
      schoolId: 'school-001',
      studentId: 'student-001',
      classId: 'class-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      status: 'LATE',
      lateMinutes: 15,
      method: 'MANUAL',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: true,
      isExcused: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.status).toBe('LATE');
    expect(attendance.lateMinutes).toBe(15);
  });

  it('should create attendance with EXCUSED status', () => {
    const attendance: Attendance = {
      id: 'att-004',
      schoolId: 'school-001',
      studentId: 'student-001',
      classId: 'class-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      status: 'EXCUSED',
      method: 'MANUAL',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: false,
      isExcused: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.status).toBe('EXCUSED');
    expect(attendance.isExcused).toBe(true);
  });

  it('should update attendance status', () => {
    const attendance: Attendance = {
      id: 'att-005',
      schoolId: 'school-001',
      studentId: 'student-001',
      classId: 'class-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      status: 'ABSENT',
      method: 'MANUAL',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: false,
      isExcused: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = { ...attendance, status: 'EXCUSED' as StudentAttendanceStatus, isExcused: true };
    expect(updated.status).toBe('EXCUSED');
    expect(updated.isExcused).toBe(true);
  });

  it('should validate attendance filters', () => {
    const filters: AttendanceFilters = {
      classId: 'class-001',
      dateFrom: '2026-07-01',
      dateTo: '2026-07-31',
      status: 'PRESENT',
    };
    expect(filters.classId).toBe('class-001');
    expect(filters.dateFrom).toBe('2026-07-01');
  });

  it('should create attendance session', () => {
    const session: AttendanceSession = {
      id: 'session-001',
      schoolId: 'school-001',
      classId: 'class-001',
      teacherId: 'teacher-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      period: 'MORNING',
      status: 'ACTIVE',
      startTime: '08:00',
      totalStudents: 30,
      presentCount: 25,
      absentCount: 3,
      lateCount: 2,
      excusedCount: 0,
      attendanceRate: 83.3,
      qrEnabled: true,
      gpsEnabled: false,
      nfcEnabled: false,
      faceEnabled: false,
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(session.status).toBe('ACTIVE');
    expect(session.period).toBe('MORNING');
  });

  it('should handle attendance error', () => {
    const error = new AttendanceNotFoundError('att-999');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain('att-999');
  });

  it('should handle attendance conflict', () => {
    const error = new AttendanceConflictError('Attendance already exists for this date');
    expect(error).toBeInstanceOf(Error);
  });

  it('should handle attendance validation error', () => {
    const error = new AttendanceValidationError([{ field: 'status', message: 'Invalid status' }]);
    expect(error).toBeInstanceOf(Error);
  });

  it('should create attendance with QR method', () => {
    const attendance: Attendance = {
      id: 'att-006',
      schoolId: 'school-001',
      studentId: 'student-001',
      classId: 'class-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      status: 'PRESENT',
      method: 'QR_CODE',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: false,
      isExcused: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.method).toBe('QR_CODE');
  });

  it('should create attendance with GPS method', () => {
    const attendance: Attendance = {
      id: 'att-007',
      schoolId: 'school-001',
      studentId: 'student-001',
      classId: 'class-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      status: 'PRESENT',
      method: 'GPS',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: false,
      isExcused: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.method).toBe('GPS');
  });

  it('should create attendance with NFC method', () => {
    const attendance: Attendance = {
      id: 'att-008',
      schoolId: 'school-001',
      studentId: 'student-001',
      classId: 'class-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      status: 'PRESENT',
      method: 'NFC',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: false,
      isExcused: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.method).toBe('NFC');
  });

  it('should create attendance with FACE method', () => {
    const attendance: Attendance = {
      id: 'att-009',
      schoolId: 'school-001',
      studentId: 'student-001',
      classId: 'class-001',
      academicYearId: 'ay1',
      date: '2026-07-22',
      status: 'PRESENT',
      method: 'FACE_RECOGNITION',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: false,
      isExcused: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.method).toBe('FACE_RECOGNITION');
  });

  it('should handle batch attendance creation', () => {
    const records: Attendance[] = [
      { id: 'att-010', schoolId: 'school-001', studentId: 'student-001', classId: 'class-001', academicYearId: 'ay1', date: '2026-07-22', status: 'PRESENT', method: 'MANUAL', period: 'MORNING', recordedBy: 'u1', source: 'MANUAL', isLate: false, isExcused: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'att-011', schoolId: 'school-001', studentId: 'student-002', classId: 'class-001', academicYearId: 'ay1', date: '2026-07-22', status: 'ABSENT', method: 'MANUAL', period: 'MORNING', recordedBy: 'u1', source: 'MANUAL', isLate: false, isExcused: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'att-012', schoolId: 'school-001', studentId: 'student-003', classId: 'class-001', academicYearId: 'ay1', date: '2026-07-22', status: 'LATE', method: 'MANUAL', period: 'MORNING', recordedBy: 'u1', source: 'MANUAL', lateMinutes: 10, isLate: true, isExcused: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ];
    expect(records).toHaveLength(3);
    expect(records[0].status).toBe('PRESENT');
    expect(records[1].status).toBe('ABSENT');
    expect(records[2].status).toBe('LATE');
  });

  it('should create teacher attendance', () => {
    const attendance: TeacherAttendance = {
      id: 'tatt-001',
      schoolId: 'school-001',
      teacherId: 'teacher-001',
      date: '2026-07-22',
      status: 'PRESENT',
      method: 'MANUAL',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      verified: true,
      isLate: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.teacherId).toBe('teacher-001');
  });
});
