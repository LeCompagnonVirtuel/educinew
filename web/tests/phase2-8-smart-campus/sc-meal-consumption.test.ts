import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMealConsumptionService } from '@/features/smart-campus/services/sc-meal-consumption.service';

describe('ScMealConsumptionService', () => {
  let service: ScMealConsumptionService;
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
    service = new ScMealConsumptionService(mockSupabase);
  });

  it('should get consumption record by id', async () => {
    const result = await service.getConsumptionRecord('school-1', 'consumption-1');
    expect(result).toBeDefined();
  });

  it('should return consumption record with correct data', async () => {
    const mockRecord = { id: 'consumption-1', student_id: 'student-1', meal_id: 'meal-1', date: '2026-08-03' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRecord, error: null });
    const result = await service.getConsumptionRecord('school-1', 'consumption-1');
    expect(result).toEqual(mockRecord);
  });

  it('should handle error when getting consumption record', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getConsumptionRecord('school-1', 'consumption-1');
    expect(result).toBeNull();
  });

  it('should get all consumption records for a school', async () => {
    const mockRecords = [{ id: 'consumption-1' }, { id: 'consumption-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getConsumptionRecords('school-1');
    expect(result).toEqual(mockRecords);
  });

  it('should create a new consumption record', async () => {
    const newRecord = { student_id: 'student-1', meal_id: 'meal-1', date: '2026-08-03', quantity: 1 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'consumption-3', ...newRecord }, error: null });
    const result = await service.createConsumptionRecord('school-1', newRecord);
    expect(result).toBeDefined();
  });

  it('should update a consumption record', async () => {
    const updates = { quantity: 2 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'consumption-1', ...updates }, error: null });
    const result = await service.updateConsumptionRecord('school-1', 'consumption-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a consumption record', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteConsumptionRecord('school-1', 'consumption-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteConsumptionRecord('school-1', 'consumption-1');
    expect(result).toBe(false);
  });

  it('should get consumption by student', async () => {
    const mockRecords = [{ id: 'consumption-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getConsumptionByStudent('school-1', 'student-1');
    expect(result).toEqual(mockRecords);
  });

  it('should get consumption by date', async () => {
    const mockRecords = [{ id: 'consumption-1', date: '2026-08-03' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getConsumptionByDate('school-1', '2026-08-03');
    expect(result).toEqual(mockRecords);
  });

  it('should get consumption by meal', async () => {
    const mockRecords = [{ id: 'consumption-1', meal_id: 'meal-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getConsumptionByMeal('school-1', 'meal-1');
    expect(result).toEqual(mockRecords);
  });

  it('should get daily consumption summary', async () => {
    const mockSummary = { total_meals: 50, unique_students: 45, total_calories: 22500 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSummary, error: null });
    const result = await service.getDailySummary('school-1', '2026-08-03');
    expect(result).toBeDefined();
  });

  it('should get student consumption history', async () => {
    const mockHistory = [{ id: 'consumption-1', student_id: 'student-1', date: '2026-08-03' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockHistory, error: null });
    const result = await service.getStudentConsumptionHistory('school-1', 'student-1');
    expect(result).toEqual(mockHistory);
  });

  it('should validate consumption data', () => {
    const result = service.validateConsumptionData({ student_id: 'student-1', meal_id: 'meal-1', date: '2026-08-03', quantity: 1 });
    expect(result).toBe(true);
  });

  it('should reject invalid consumption data', () => {
    const result = service.validateConsumptionData({ student_id: '', meal_id: '', date: '', quantity: -1 });
    expect(result).toBe(false);
  });

  it('should get consumption statistics', async () => {
    const mockStats = { total: 500, today: 50, this_week: 350 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getConsumptionStatistics('school-1');
    expect(result).toBeDefined();
  });
});
