import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScNutritionService } from '@/features/smart-campus/services/sc-nutrition.service';

describe('ScNutritionService', () => {
  let service: ScNutritionService;
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
    service = new ScNutritionService(mockSupabase);
  });

  it('should get nutrition info by id', async () => {
    const result = await service.getNutritionInfo('school-1', 'nutrition-1');
    expect(result).toBeDefined();
  });

  it('should return nutrition info with correct data', async () => {
    const mockNutrition = { id: 'nutrition-1', meal_id: 'meal-1', calories: 450, protein: 25 };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockNutrition, error: null });
    const result = await service.getNutritionInfo('school-1', 'nutrition-1');
    expect(result).toEqual(mockNutrition);
  });

  it('should handle error when getting nutrition info', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getNutritionInfo('school-1', 'nutrition-1');
    expect(result).toBeNull();
  });

  it('should get all nutrition info for a school', async () => {
    const mockNutritions = [{ id: 'nutrition-1' }, { id: 'nutrition-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockNutritions, error: null });
    const result = await service.getNutritionInfos('school-1');
    expect(result).toEqual(mockNutritions);
  });

  it('should create new nutrition info', async () => {
    const newNutrition = { meal_id: 'meal-1', calories: 450, protein: 25, carbs: 60 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'nutrition-3', ...newNutrition }, error: null });
    const result = await service.createNutritionInfo('school-1', newNutrition);
    expect(result).toBeDefined();
  });

  it('should update nutrition info', async () => {
    const updates = { calories: 500 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'nutrition-1', ...updates }, error: null });
    const result = await service.updateNutritionInfo('school-1', 'nutrition-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete nutrition info', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteNutritionInfo('school-1', 'nutrition-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteNutritionInfo('school-1', 'nutrition-1');
    expect(result).toBe(false);
  });

  it('should get nutrition by meal', async () => {
    const mockNutritions = [{ id: 'nutrition-1', meal_id: 'meal-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockNutritions, error: null });
    const result = await service.getNutritionByMeal('school-1', 'meal-1');
    expect(result).toEqual(mockNutritions);
  });

  it('should calculate daily intake', async () => {
    const mockMeals = [{ calories: 450 }, { calories: 600 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMeals, error: null });
    const result = await service.calculateDailyIntake('school-1', 'student-1');
    expect(result).toBe(1050);
  });

  it('should get nutrition summary', async () => {
    const mockSummary = { avg_calories: 500, avg_protein: 25, avg_carbs: 60 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSummary, error: null });
    const result = await service.getNutritionSummary('school-1', 'meal-1');
    expect(result).toBeDefined();
  });

  it('should validate nutrition data', () => {
    const result = service.validateNutritionData({ meal_id: 'meal-1', calories: 450, protein: 25 });
    expect(result).toBe(true);
  });

  it('should reject invalid nutrition data', () => {
    const result = service.validateNutritionData({ meal_id: '', calories: -1, protein: -1 });
    expect(result).toBe(false);
  });

  it('should get nutrition by meal type', async () => {
    const mockNutritions = [{ id: 'nutrition-1', meal_type: 'lunch' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockNutritions, error: null });
    const result = await service.getNutritionByMealType('school-1', 'lunch');
    expect(result).toEqual(mockNutritions);
  });

  it('should get nutrition statistics', async () => {
    const mockStats = { total_meals: 30, avg_calories: 500, avg_protein: 25 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getNutritionStatistics('school-1');
    expect(result).toBeDefined();
  });
});
