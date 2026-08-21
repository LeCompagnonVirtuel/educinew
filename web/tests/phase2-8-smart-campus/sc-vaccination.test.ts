import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScVaccinationService } from '@/features/smart-campus/services/sc-vaccination.service';

describe('ScVaccinationService', () => {
  let service: ScVaccinationService;
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
    service = new ScVaccinationService(mockSupabase);
  });

  it('should get vaccination by id', async () => {
    const result = await service.getVaccination('school-1', 'vaccination-1');
    expect(result).toBeDefined();
  });

  it('should return vaccination with correct data', async () => {
    const mockVaccination = { id: 'vaccination-1', student_id: 'student-1', vaccine_name: 'COVID-19', dose: 1, date: '2026-08-03' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockVaccination, error: null });
    const result = await service.getVaccination('school-1', 'vaccination-1');
    expect(result).toEqual(mockVaccination);
  });

  it('should handle error when getting vaccination', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getVaccination('school-1', 'vaccination-1');
    expect(result).toBeNull();
  });

  it('should get all vaccinations for a school', async () => {
    const mockVaccinations = [{ id: 'vaccination-1' }, { id: 'vaccination-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockVaccinations, error: null });
    const result = await service.getVaccinations('school-1');
    expect(result).toEqual(mockVaccinations);
  });

  it('should create a new vaccination', async () => {
    const newVaccination = { student_id: 'student-1', vaccine_name: 'Polio', dose: 1, date: '2026-08-03' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'vaccination-3', ...newVaccination }, error: null });
    const result = await service.createVaccination('school-1', newVaccination);
    expect(result).toBeDefined();
  });

  it('should update a vaccination', async () => {
    const updates = { status: 'completed' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'vaccination-1', ...updates }, error: null });
    const result = await service.updateVaccination('school-1', 'vaccination-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a vaccination', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteVaccination('school-1', 'vaccination-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteVaccination('school-1', 'vaccination-1');
    expect(result).toBe(false);
  });

  it('should get vaccinations by student', async () => {
    const mockVaccinations = [{ id: 'vaccination-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockVaccinations, error: null });
    const result = await service.getVaccinationsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockVaccinations);
  });

  it('should get vaccinations by vaccine', async () => {
    const mockVaccinations = [{ id: 'vaccination-1', vaccine_name: 'COVID-19' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockVaccinations, error: null });
    const result = await service.getVaccinationsByVaccine('school-1', 'COVID-19');
    expect(result).toEqual(mockVaccinations);
  });

  it('should get completed vaccinations', async () => {
    const mockVaccinations = [{ id: 'vaccination-1', status: 'completed' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockVaccinations, error: null });
    const result = await service.getCompletedVaccinations('school-1');
    expect(result).toEqual(mockVaccinations);
  });

  it('should get pending vaccinations', async () => {
    const mockVaccinations = [{ id: 'vaccination-1', status: 'pending' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockVaccinations, error: null });
    const result = await service.getPendingVaccinations('school-1');
    expect(result).toEqual(mockVaccinations);
  });

  it('should complete vaccination', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'vaccination-1', status: 'completed' }, error: null });
    const result = await service.completeVaccination('school-1', 'vaccination-1');
    expect(result).toBeDefined();
  });

  it('should validate vaccination data', () => {
    const result = service.validateVaccinationData({ student_id: 'student-1', vaccine_name: 'COVID-19', dose: 1, date: '2026-08-03' });
    expect(result).toBe(true);
  });

  it('should reject invalid vaccination data', () => {
    const result = service.validateVaccinationData({ student_id: '', vaccine_name: '', dose: -1, date: '' });
    expect(result).toBe(false);
  });

  it('should get vaccination statistics', async () => {
    const mockStats = { total: 200, completed: 180, pending: 20 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getVaccinationStatistics('school-1');
    expect(result).toBeDefined();
  });
});
