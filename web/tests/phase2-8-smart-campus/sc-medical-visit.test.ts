import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMedicalVisitService } from '@/features/smart-campus/services/sc-medical-visit.service';

describe('ScMedicalVisitService', () => {
  let service: ScMedicalVisitService;
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
    service = new ScMedicalVisitService(mockSupabase);
  });

  it('should get medical visit by id', async () => {
    const result = await service.getMedicalVisit('school-1', 'visit-1');
    expect(result).toBeDefined();
  });

  it('should return medical visit with correct data', async () => {
    const mockVisit = { id: 'visit-1', student_id: 'student-1', visit_date: '2026-08-03', reason: 'Routine checkup' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockVisit, error: null });
    const result = await service.getMedicalVisit('school-1', 'visit-1');
    expect(result).toEqual(mockVisit);
  });

  it('should handle error when getting medical visit', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMedicalVisit('school-1', 'visit-1');
    expect(result).toBeNull();
  });

  it('should get all medical visits for a school', async () => {
    const mockVisits = [{ id: 'visit-1' }, { id: 'visit-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockVisits, error: null });
    const result = await service.getMedicalVisits('school-1');
    expect(result).toEqual(mockVisits);
  });

  it('should create a new medical visit', async () => {
    const newVisit = { student_id: 'student-1', visit_date: '2026-08-03', reason: 'Fever' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'visit-3', ...newVisit }, error: null });
    const result = await service.createMedicalVisit('school-1', newVisit);
    expect(result).toBeDefined();
  });

  it('should update a medical visit', async () => {
    const updates = { diagnosis: 'Common cold' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'visit-1', ...updates }, error: null });
    const result = await service.updateMedicalVisit('school-1', 'visit-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a medical visit', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMedicalVisit('school-1', 'visit-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMedicalVisit('school-1', 'visit-1');
    expect(result).toBe(false);
  });

  it('should get visits by student', async () => {
    const mockVisits = [{ id: 'visit-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockVisits, error: null });
    const result = await service.getVisitsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockVisits);
  });

  it('should get visits by date', async () => {
    const mockVisits = [{ id: 'visit-1', visit_date: '2026-08-03' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockVisits, error: null });
    const result = await service.getVisitsByDate('school-1', '2026-08-03');
    expect(result).toEqual(mockVisits);
  });

  it('should get recent visits', async () => {
    const mockVisits = [{ id: 'visit-1', visit_date: '2026-08-03' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockVisits, error: null });
    const result = await service.getRecentVisits('school-1', 7);
    expect(result).toEqual(mockVisits);
  });

  it('should complete visit', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'visit-1', status: 'completed' }, error: null });
    const result = await service.completeVisit('school-1', 'visit-1', 'Common cold', 'Rest and fluids');
    expect(result).toBeDefined();
  });

  it('should cancel visit', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'visit-1', status: 'cancelled' }, error: null });
    const result = await service.cancelVisit('school-1', 'visit-1');
    expect(result).toBeDefined();
  });

  it('should validate visit data', () => {
    const result = service.validateVisitData({ student_id: 'student-1', visit_date: '2026-08-03', reason: 'Fever' });
    expect(result).toBe(true);
  });

  it('should reject invalid visit data', () => {
    const result = service.validateVisitData({ student_id: '', visit_date: '', reason: '' });
    expect(result).toBe(false);
  });

  it('should get visit statistics', async () => {
    const mockStats = { total: 100, completed: 90, cancelled: 10 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getVisitStatistics('school-1');
    expect(result).toBeDefined();
  });
});
