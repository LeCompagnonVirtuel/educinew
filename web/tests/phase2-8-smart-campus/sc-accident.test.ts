import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScAccidentService } from '@/features/smart-campus/services/sc-accident.service';

describe('ScAccidentService', () => {
  let service: ScAccidentService;
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
    service = new ScAccidentService(mockSupabase);
  });

  it('should get accident by id', async () => {
    const result = await service.getAccident('school-1', 'accident-1');
    expect(result).toBeDefined();
  });

  it('should return accident with correct data', async () => {
    const mockAccident = { id: 'accident-1', student_id: 'student-1', date: '2026-08-03', location: 'Playground', severity: 'minor' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAccident, error: null });
    const result = await service.getAccident('school-1', 'accident-1');
    expect(result).toEqual(mockAccident);
  });

  it('should handle error when getting accident', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getAccident('school-1', 'accident-1');
    expect(result).toBeNull();
  });

  it('should get all accidents for a school', async () => {
    const mockAccidents = [{ id: 'accident-1' }, { id: 'accident-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAccidents, error: null });
    const result = await service.getAccidents('school-1');
    expect(result).toEqual(mockAccidents);
  });

  it('should create a new accident', async () => {
    const newAccident = { student_id: 'student-1', date: '2026-08-03', location: 'Classroom', severity: 'moderate' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'accident-3', ...newAccident }, error: null });
    const result = await service.createAccident('school-1', newAccident);
    expect(result).toBeDefined();
  });

  it('should update an accident', async () => {
    const updates = { status: 'resolved' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'accident-1', ...updates }, error: null });
    const result = await service.updateAccident('school-1', 'accident-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an accident', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteAccident('school-1', 'accident-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteAccident('school-1', 'accident-1');
    expect(result).toBe(false);
  });

  it('should get accidents by student', async () => {
    const mockAccidents = [{ id: 'accident-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAccidents, error: null });
    const result = await service.getAccidentsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockAccidents);
  });

  it('should get accidents by severity', async () => {
    const mockAccidents = [{ id: 'accident-1', severity: 'minor' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAccidents, error: null });
    const result = await service.getAccidentsBySeverity('school-1', 'minor');
    expect(result).toEqual(mockAccidents);
  });

  it('should get recent accidents', async () => {
    const mockAccidents = [{ id: 'accident-1', date: '2026-08-03' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAccidents, error: null });
    const result = await service.getRecentAccidents('school-1', 30);
    expect(result).toEqual(mockAccidents);
  });

  it('should resolve accident', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'accident-1', status: 'resolved' }, error: null });
    const result = await service.resolveAccident('school-1', 'accident-1', 'Minor scrape treated');
    expect(result).toBeDefined();
  });

  it('should validate accident data', () => {
    const result = service.validateAccidentData({ student_id: 'student-1', date: '2026-08-03', location: 'Playground', severity: 'minor' });
    expect(result).toBe(true);
  });

  it('should reject invalid accident data', () => {
    const result = service.validateAccidentData({ student_id: '', date: '', location: '', severity: '' });
    expect(result).toBe(false);
  });

  it('should get accident statistics', async () => {
    const mockStats = { total: 15, minor: 10, moderate: 4, severe: 1 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getAccidentStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should get accidents by location', async () => {
    const mockAccidents = [{ id: 'accident-1', location: 'Playground' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAccidents, error: null });
    const result = await service.getAccidentsByLocation('school-1', 'Playground');
    expect(result).toEqual(mockAccidents);
  });
});
