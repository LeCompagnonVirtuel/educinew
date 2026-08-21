import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMedicationService } from '@/features/smart-campus/services/sc-medication.service';

describe('ScMedicationService', () => {
  let service: ScMedicationService;
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
    service = new ScMedicationService(mockSupabase);
  });

  it('should get medication by id', async () => {
    const result = await service.getMedication('school-1', 'medication-1');
    expect(result).toBeDefined();
  });

  it('should return medication with correct data', async () => {
    const mockMedication = { id: 'medication-1', name: 'Ibuprofen', dosage: '200mg', frequency: 'Twice daily' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockMedication, error: null });
    const result = await service.getMedication('school-1', 'medication-1');
    expect(result).toEqual(mockMedication);
  });

  it('should handle error when getting medication', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMedication('school-1', 'medication-1');
    expect(result).toBeNull();
  });

  it('should get all medications for a school', async () => {
    const mockMedications = [{ id: 'medication-1' }, { id: 'medication-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMedications, error: null });
    const result = await service.getMedications('school-1');
    expect(result).toEqual(mockMedications);
  });

  it('should create a new medication', async () => {
    const newMedication = { name: 'Paracetamol', dosage: '500mg', frequency: 'Three times daily' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'medication-3', ...newMedication }, error: null });
    const result = await service.createMedication('school-1', newMedication);
    expect(result).toBeDefined();
  });

  it('should update a medication', async () => {
    const updates = { dosage: '400mg' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'medication-1', ...updates }, error: null });
    const result = await service.updateMedication('school-1', 'medication-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a medication', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMedication('school-1', 'medication-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMedication('school-1', 'medication-1');
    expect(result).toBe(false);
  });

  it('should get medications by student', async () => {
    const mockMedications = [{ id: 'medication-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMedications, error: null });
    const result = await service.getMedicationsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockMedications);
  });

  it('should get active medications', async () => {
    const mockMedications = [{ id: 'medication-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMedications, error: null });
    const result = await service.getActiveMedications('school-1');
    expect(result).toEqual(mockMedications);
  });

  it('should search medications', async () => {
    const mockMedications = [{ id: 'medication-1', name: 'Ibuprofen' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMedications, error: null });
    const result = await service.searchMedications('school-1', 'Ibuprofen');
    expect(result).toEqual(mockMedications);
  });

  it('should validate medication data', () => {
    const result = service.validateMedicationData({ name: 'Ibuprofen', dosage: '200mg', frequency: 'Twice daily' });
    expect(result).toBe(true);
  });

  it('should reject invalid medication data', () => {
    const result = service.validateMedicationData({ name: '', dosage: '', frequency: '' });
    expect(result).toBe(false);
  });

  it('should get medication statistics', async () => {
    const mockStats = { total: 30, active: 25, discontinued: 5 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getMedicationStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should discontinue medication', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'medication-1', status: 'discontinued' }, error: null });
    const result = await service.discontinueMedication('school-1', 'medication-1');
    expect(result).toBeDefined();
  });
});
