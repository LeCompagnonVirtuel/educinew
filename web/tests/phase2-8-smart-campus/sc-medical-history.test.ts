import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMedicalHistoryService } from '@/features/smart-campus/services/sc-medical-history.service';

describe('ScMedicalHistoryService', () => {
  let service: ScMedicalHistoryService;
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
    service = new ScMedicalHistoryService(mockSupabase);
  });

  it('should get medical history by id', async () => {
    const result = await service.getMedicalHistory('school-1', 'history-1');
    expect(result).toBeDefined();
  });

  it('should return medical history with correct data', async () => {
    const mockHistory = { id: 'history-1', student_id: 'student-1', condition: 'Asthma', diagnosed_date: '2020-01-01' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockHistory, error: null });
    const result = await service.getMedicalHistory('school-1', 'history-1');
    expect(result).toEqual(mockHistory);
  });

  it('should handle error when getting medical history', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMedicalHistory('school-1', 'history-1');
    expect(result).toBeNull();
  });

  it('should get all medical history for a school', async () => {
    const mockHistoryList = [{ id: 'history-1' }, { id: 'history-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockHistoryList, error: null });
    const result = await service.getMedicalHistoryList('school-1');
    expect(result).toEqual(mockHistoryList);
  });

  it('should create new medical history', async () => {
    const newHistory = { student_id: 'student-1', condition: 'Diabetes', diagnosed_date: '2019-05-15' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'history-3', ...newHistory }, error: null });
    const result = await service.createMedicalHistory('school-1', newHistory);
    expect(result).toBeDefined();
  });

  it('should update medical history', async () => {
    const updates = { status: 'resolved' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'history-1', ...updates }, error: null });
    const result = await service.updateMedicalHistory('school-1', 'history-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete medical history', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMedicalHistory('school-1', 'history-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMedicalHistory('school-1', 'history-1');
    expect(result).toBe(false);
  });

  it('should get history by student', async () => {
    const mockHistoryList = [{ id: 'history-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockHistoryList, error: null });
    const result = await service.getHistoryByStudent('school-1', 'student-1');
    expect(result).toEqual(mockHistoryList);
  });

  it('should get active conditions', async () => {
    const mockHistoryList = [{ id: 'history-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockHistoryList, error: null });
    const result = await service.getActiveConditions('school-1');
    expect(result).toEqual(mockHistoryList);
  });

  it('should get resolved conditions', async () => {
    const mockHistoryList = [{ id: 'history-1', status: 'resolved' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockHistoryList, error: null });
    const result = await service.getResolvedConditions('school-1');
    expect(result).toEqual(mockHistoryList);
  });

  it('should add surgery history', async () => {
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'history-1', type: 'surgery' }, error: null });
    const result = await service.addSurgeryHistory('school-1', 'student-1', 'Appendectomy', '2020-06-01');
    expect(result).toBeDefined();
  });

  it('should validate history data', () => {
    const result = service.validateHistoryData({ student_id: 'student-1', condition: 'Asthma', diagnosed_date: '2020-01-01' });
    expect(result).toBe(true);
  });

  it('should reject invalid history data', () => {
    const result = service.validateHistoryData({ student_id: '', condition: '', diagnosed_date: '' });
    expect(result).toBe(false);
  });

  it('should get medical history statistics', async () => {
    const mockStats = { total: 50, active: 30, resolved: 20 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getMedicalHistoryStatistics('school-1');
    expect(result).toBeDefined();
  });
});
