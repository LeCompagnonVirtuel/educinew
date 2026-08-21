import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMedicalAllergyService } from '@/features/smart-campus/services/sc-medical-allergy.service';

describe('ScMedicalAllergyService', () => {
  let service: ScMedicalAllergyService;
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
    service = new ScMedicalAllergyService(mockSupabase);
  });

  it('should get medical allergy by id', async () => {
    const result = await service.getMedicalAllergy('school-1', 'allergy-1');
    expect(result).toBeDefined();
  });

  it('should return medical allergy with correct data', async () => {
    const mockAllergy = { id: 'allergy-1', student_id: 'student-1', allergen: 'Peanuts', severity: 'severe' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAllergy, error: null });
    const result = await service.getMedicalAllergy('school-1', 'allergy-1');
    expect(result).toEqual(mockAllergy);
  });

  it('should handle error when getting medical allergy', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMedicalAllergy('school-1', 'allergy-1');
    expect(result).toBeNull();
  });

  it('should get all medical allergies for a school', async () => {
    const mockAllergies = [{ id: 'allergy-1' }, { id: 'allergy-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergies, error: null });
    const result = await service.getMedicalAllergies('school-1');
    expect(result).toEqual(mockAllergies);
  });

  it('should create a new medical allergy', async () => {
    const newAllergy = { student_id: 'student-1', allergen: 'Milk', severity: 'moderate' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'allergy-3', ...newAllergy }, error: null });
    const result = await service.createMedicalAllergy('school-1', newAllergy);
    expect(result).toBeDefined();
  });

  it('should update a medical allergy', async () => {
    const updates = { severity: 'mild' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'allergy-1', ...updates }, error: null });
    const result = await service.updateMedicalAllergy('school-1', 'allergy-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a medical allergy', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMedicalAllergy('school-1', 'allergy-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMedicalAllergy('school-1', 'allergy-1');
    expect(result).toBe(false);
  });

  it('should get allergies by student', async () => {
    const mockAllergies = [{ id: 'allergy-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergies, error: null });
    const result = await service.getAllergiesByStudent('school-1', 'student-1');
    expect(result).toEqual(mockAllergies);
  });

  it('should get allergies by severity', async () => {
    const mockAllergies = [{ id: 'allergy-1', severity: 'severe' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergies, error: null });
    const result = await service.getAllergiesBySeverity('school-1', 'severe');
    expect(result).toEqual(mockAllergies);
  });

  it('should get severe allergies', async () => {
    const mockAllergies = [{ id: 'allergy-1', severity: 'severe' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergies, error: null });
    const result = await service.getSevereAllergies('school-1');
    expect(result).toEqual(mockAllergies);
  });

  it('should validate allergy data', () => {
    const result = service.validateAllergyData({ student_id: 'student-1', allergen: 'Peanuts', severity: 'severe' });
    expect(result).toBe(true);
  });

  it('should reject invalid allergy data', () => {
    const result = service.validateAllergyData({ student_id: '', allergen: '', severity: '' });
    expect(result).toBe(false);
  });

  it('should get allergy statistics', async () => {
    const mockStats = { total: 30, severe: 5, moderate: 15, mild: 10 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getAllergyStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should get common allergens', async () => {
    const mockAllergies = [{ allergen: 'Peanuts', count: 10 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAllergies, error: null });
    const result = await service.getCommonAllergens('school-1');
    expect(result).toEqual(mockAllergies);
  });
});
