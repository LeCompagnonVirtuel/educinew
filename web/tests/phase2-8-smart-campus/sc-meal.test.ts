import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMealService } from '@/features/smart-campus/services/sc-meal.service';

describe('ScMealService', () => {
  let service: ScMealService;
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
    service = new ScMealService(mockSupabase);
  });

  it('should get meal by id', async () => {
    const result = await service.getMeal('school-1', 'meal-1');
    expect(result).toBeDefined();
  });

  it('should return meal with correct data', async () => {
    const mockMeal = { id: 'meal-1', name: 'Jollof Rice', price: 500, calories: 450 };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockMeal, error: null });
    const result = await service.getMeal('school-1', 'meal-1');
    expect(result).toEqual(mockMeal);
  });

  it('should handle error when getting meal', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMeal('school-1', 'meal-1');
    expect(result).toBeNull();
  });

  it('should get all meals for a school', async () => {
    const mockMeals = [{ id: 'meal-1' }, { id: 'meal-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMeals, error: null });
    const result = await service.getMeals('school-1');
    expect(result).toEqual(mockMeals);
  });

  it('should create a new meal', async () => {
    const newMeal = { name: 'Fried Rice', price: 600, calories: 500 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'meal-3', ...newMeal }, error: null });
    const result = await service.createMeal('school-1', newMeal);
    expect(result).toBeDefined();
  });

  it('should update a meal', async () => {
    const updates = { price: 550 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'meal-1', ...updates }, error: null });
    const result = await service.updateMeal('school-1', 'meal-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a meal', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMeal('school-1', 'meal-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMeal('school-1', 'meal-1');
    expect(result).toBe(false);
  });

  it('should get meals by category', async () => {
    const mockMeals = [{ id: 'meal-1', category: 'main' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMeals, error: null });
    const result = await service.getMealsByCategory('school-1', 'main');
    expect(result).toEqual(mockMeals);
  });

  it('should search meals', async () => {
    const mockMeals = [{ id: 'meal-1', name: 'Jollof Rice' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMeals, error: null });
    const result = await service.searchMeals('school-1', 'Jollof');
    expect(result).toEqual(mockMeals);
  });

  it('should get available meals', async () => {
    const mockMeals = [{ id: 'meal-1', is_available: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMeals, error: null });
    const result = await service.getAvailableMeals('school-1');
    expect(result).toEqual(mockMeals);
  });

  it('should get meal price', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: { id: 'meal-1', price: 500 }, error: null });
    const result = await service.getMealPrice('school-1', 'meal-1');
    expect(result).toBe(500);
  });

  it('should get meal calories', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: { id: 'meal-1', calories: 450 }, error: null });
    const result = await service.getMealCalories('school-1', 'meal-1');
    expect(result).toBe(450);
  });

  it('should validate meal data', () => {
    const result = service.validateMealData({ name: 'Jollof Rice', price: 500, calories: 450 });
    expect(result).toBe(true);
  });

  it('should reject invalid meal data', () => {
    const result = service.validateMealData({ name: '', price: -1, calories: -1 });
    expect(result).toBe(false);
  });

  it('should get meal statistics', async () => {
    const mockStats = { total: 30, available: 25, unavailable: 5 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getMealStatistics('school-1');
    expect(result).toBeDefined();
  });
});
