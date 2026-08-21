import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusAttendanceService } from '@/features/smart-campus/services/sc-bus-attendance.service';

describe('ScBusAttendanceService', () => {
  let service: ScBusAttendanceService;
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          then: vi.fn()
        })),
        then: vi.fn()
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn()
      }))
    }))
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ScBusAttendanceService(mockSupabase);
  });

  it('should get attendance by id', async () => {
    const result = await service.getAttendance('school-1', 'attendance-1');
    expect(result).toBeDefined();
  });

  it('should return attendance with correct data', async () => {
    const mockAttendance = { id: 'attendance-1', student_id: 'student-1', trip_id: 'trip-1' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAttendance, error: null });
    const result = await service.getAttendance('school-1', 'attendance-1');
    expect(result).toEqual(mockAttendance);
  });

  it('should handle error when getting attendance', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getAttendance('school-1', 'attendance-1');
    expect(result).toBeNull();
  });

  it('should get all attendance records for a school', async () => {
    const mockAttendances = [{ id: 'attendance-1' }, { id: 'attendance-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAttendances, error: null });
    const result = await service.getAttendances('school-1');
    expect(result).toEqual(mockAttendances);
  });

  it('should record new attendance', async () => {
    const newAttendance = { student_id: 'student-1', trip_id: 'trip-1', status: 'present' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'attendance-3', ...newAttendance }, error: null });
    const result = await service.recordAttendance('school-1', newAttendance);
    expect(result).toBeDefined();
  });

  it('should update attendance', async () => {
    const updates = { status: 'absent' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'attendance-1', ...updates }, error: null });
    const result = await service.updateAttendance('school-1', 'attendance-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete attendance', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteAttendance('school-1', 'attendance-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteAttendance('school-1', 'attendance-1');
    expect(result).toBe(false);
  });

  it('should get attendance by trip', async () => {
    const mockAttendances = [{ id: 'attendance-1', trip_id: 'trip-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAttendances, error: null });
    const result = await service.getAttendanceByTrip('school-1', 'trip-1');
    expect(result).toEqual(mockAttendances);
  });

  it('should get attendance by student', async () => {
    const mockAttendances = [{ id: 'attendance-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAttendances, error: null });
    const result = await service.getAttendanceByStudent('school-1', 'student-1');
    expect(result).toEqual(mockAttendances);
  });

  it('should mark student as present', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'attendance-1', status: 'present' }, error: null });
    const result = await service.markPresent('school-1', 'attendance-1');
    expect(result).toBeDefined();
  });

  it('should mark student as absent', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'attendance-1', status: 'absent' }, error: null });
    const result = await service.markAbsent('school-1', 'attendance-1');
    expect(result).toBeDefined();
  });

  it('should mark student as late', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'attendance-1', status: 'late' }, error: null });
    const result = await service.markLate('school-1', 'attendance-1');
    expect(result).toBeDefined();
  });

  it('should get attendance summary for a trip', async () => {
    const mockSummary = { total: 30, present: 28, absent: 2 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSummary, error: null });
    const result = await service.getTripSummary('school-1', 'trip-1');
    expect(result).toBeDefined();
  });

  it('should get attendance statistics for a student', async () => {
    const mockStats = { total_trips: 20, present: 18, absent: 2 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getStudentStats('school-1', 'student-1');
    expect(result).toBeDefined();
  });
});
