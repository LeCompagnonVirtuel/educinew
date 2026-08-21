import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScAllergenService } from '@/features/smart-campus/services/sc-allergen.service';

describe('ScAllergenService', () => {
  let service: ScAllergenService;
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
    service = new ScAllergenService(mockSupabase);
  });

  it('should get allergen by id', async () => {
    const result = await service.getAllergen('school-1', 'allergen-1');
    expect(result).toBeDefined();
  });

  it('should return allergen with correct data', async () => {
    const mockAllergen = { id: 'allergen-1', name: 'Peanuts', description: 'Peanut allergy', severity: 'high' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAllergen, error: null });
    const result = await service.getAllergen('school-1', 'allergen-1');
    expect(result).toEqual(mockAllergen);
  });

  it('should handle error when getting allergen', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getAllergen('school-1', 'allergen-1');
    expect(result).toBeNull();
  });

  it('should get all allergens for a school', async () => {
    const mockAllergens = [{ id: 'allergen-1' }, { id: 'allergen-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergens, error: null });
    const result = await service.getAllergens('school-1');
    expect(result).toEqual(mockAllergens);
  });

  it('should create a new allergen', async () => {
    const newAllergen = { name: 'Milk', description: 'Milk allergy', severity: 'medium' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'allergen-3', ...newAllergen }, error: null });
    const result = await service.createAllergen('school-1', newAllergen);
    expect(result).toBeDefined();
  });

  it('should update an allergen', async () => {
    const updates = { severity: 'low' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'allergen-1', ...updates }, error: null });
    const result = await service.updateAllergen('school-1', 'allergen-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an allergen', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteAllergen('school-1', 'allergen-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteAllergen('school-1', 'allergen-1');
    expect(result).toBe(false);
  });

  it('should get allergens by severity', async () => {
    const mockAllergens = [{ id: 'allergen-1', severity: 'high' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergens, error: null });
    const result = await service.getAllergensBySeverity('school-1', 'high');
    expect(result).toEqual(mockAllergens);
  });

  it('should get allergens by meal', async () => {
    const mockAllergens = [{ id: 'allergen-1', meal_id: 'meal-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergens, error: null });
    const result = await service.getAllergensByMeal('school-1', 'meal-1');
    expect(result).toEqual(mockAllergens);
  });

  it('should get allergens by student', async () => {
    const mockAllergens = [{ id: 'allergen-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergens, error: null });
    const result = await service.getAllergensByStudent('school-1', 'student-1');
    expect(result).toEqual(mockAllergens);
  });

  it('should check if meal contains allergen', async () => {
    const mockAllergens = [{ id: 'allergen-1', meal_id: 'meal-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergens, error: null });
    const result = await service.mealContainsAllergen('school-1', 'meal-1', 'allergen-1');
    expect(result).toBe(true);
  });

  it('should validate allergen data', () => {
    const result = service.validateAllergenData({ name: 'Peanuts', description: 'Peanut allergy', severity: 'high' });
    expect(result).toBe(true);
  });

  it('should reject invalid allergen data', () => {
    const result = service.validateAllergenData({ name: '', description: '', severity: '' });
    expect(result).toBe(false);
  });

  it('should get common allergens', async () => {
    const mockAllergens = [{ id: 'allergen-1', name: 'Peanuts', is_common: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergens, error: null });
    const result = await service.getCommonAllergens('school-1');
    expect(result).toEqual(mockAllergens);
  });

  it('should get allergen statistics', async () => {
    const mockStats = { total: 10, high: 3, medium: 4, low: 3 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getAllergenStatistics('school-1');
    expect(result).toBeDefined();
  });
});
