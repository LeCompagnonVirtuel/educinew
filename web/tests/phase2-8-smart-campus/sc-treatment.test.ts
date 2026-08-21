import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScTreatmentService } from '@/features/smart-campus/services/sc-treatment.service';

describe('ScTreatmentService', () => {
  let service: ScTreatmentService;
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
    service = new ScTreatmentService(mockSupabase);
  });

  it('should get treatment by id', async () => {
    const result = await service.getTreatment('school-1', 'treatment-1');
    expect(result).toBeDefined();
  });

  it('should return treatment with correct data', async () => {
    const mockTreatment = { id: 'treatment-1', visit_id: 'visit-1', treatment_type: 'medication', description: 'Ibuprofen' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockTreatment, error: null });
    const result = await service.getTreatment('school-1', 'treatment-1');
    expect(result).toEqual(mockTreatment);
  });

  it('should handle error when getting treatment', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getTreatment('school-1', 'treatment-1');
    expect(result).toBeNull();
  });

  it('should get all treatments for a school', async () => {
    const mockTreatments = [{ id: 'treatment-1' }, { id: 'treatment-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTreatments, error: null });
    const result = await service.getTreatments('school-1');
    expect(result).toEqual(mockTreatments);
  });

  it('should create a new treatment', async () => {
    const newTreatment = { visit_id: 'visit-1', treatment_type: 'medication', description: 'Paracetamol' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'treatment-3', ...newTreatment }, error: null });
    const result = await service.createTreatment('school-1', newTreatment);
    expect(result).toBeDefined();
  });

  it('should update a treatment', async () => {
    const updates = { status: 'completed' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'treatment-1', ...updates }, error: null });
    const result = await service.updateTreatment('school-1', 'treatment-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a treatment', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteTreatment('school-1', 'treatment-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteTreatment('school-1', 'treatment-1');
    expect(result).toBe(false);
  });

  it('should get treatments by visit', async () => {
    const mockTreatments = [{ id: 'treatment-1', visit_id: 'visit-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTreatments, error: null });
    const result = await service.getTreatmentsByVisit('school-1', 'visit-1');
    expect(result).toEqual(mockTreatments);
  });

  it('should get treatments by type', async () => {
    const mockTreatments = [{ id: 'treatment-1', treatment_type: 'medication' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTreatments, error: null });
    const result = await service.getTreatmentsByType('school-1', 'medication');
    expect(result).toEqual(mockTreatments);
  });

  it('should get treatments by student', async () => {
    const mockTreatments = [{ id: 'treatment-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTreatments, error: null });
    const result = await service.getTreatmentsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockTreatments);
  });

  it('should complete treatment', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'treatment-1', status: 'completed' }, error: null });
    const result = await service.completeTreatment('school-1', 'treatment-1');
    expect(result).toBeDefined();
  });

  it('should validate treatment data', () => {
    const result = service.validateTreatmentData({ visit_id: 'visit-1', treatment_type: 'medication', description: 'Paracetamol' });
    expect(result).toBe(true);
  });

  it('should reject invalid treatment data', () => {
    const result = service.validateTreatmentData({ visit_id: '', treatment_type: '', description: '' });
    expect(result).toBe(false);
  });

  it('should get treatment statistics', async () => {
    const mockStats = { total: 50, medication: 30, procedure: 20 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getTreatmentStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should get active treatments', async () => {
    const mockTreatments = [{ id: 'treatment-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTreatments, error: null });
    const result = await service.getActiveTreatments('school-1');
    expect(result).toEqual(mockTreatments);
  });
});
