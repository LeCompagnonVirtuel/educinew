import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBookAcquisitionService } from '@/features/smart-campus/services/sc-book-acquisition.service';

describe('ScBookAcquisitionService', () => {
  let service: ScBookAcquisitionService;
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
    service = new ScBookAcquisitionService(mockSupabase);
  });

  it('should get acquisition by id', async () => {
    const result = await service.getAcquisition('school-1', 'acquisition-1');
    expect(result).toBeDefined();
  });

  it('should return acquisition with correct data', async () => {
    const mockAcquisition = { id: 'acquisition-1', title: 'New Books', quantity: 50, status: 'pending' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAcquisition, error: null });
    const result = await service.getAcquisition('school-1', 'acquisition-1');
    expect(result).toEqual(mockAcquisition);
  });

  it('should handle error when getting acquisition', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getAcquisition('school-1', 'acquisition-1');
    expect(result).toBeNull();
  });

  it('should get all acquisitions for a school', async () => {
    const mockAcquisitions = [{ id: 'acquisition-1' }, { id: 'acquisition-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAcquisitions, error: null });
    const result = await service.getAcquisitions('school-1');
    expect(result).toEqual(mockAcquisitions);
  });

  it('should create a new acquisition', async () => {
    const newAcquisition = { title: 'New Science Books', quantity: 30, publisher_id: 'publisher-1' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'acquisition-3', ...newAcquisition }, error: null });
    const result = await service.createAcquisition('school-1', newAcquisition);
    expect(result).toBeDefined();
  });

  it('should update an acquisition', async () => {
    const updates = { status: 'approved' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'acquisition-1', ...updates }, error: null });
    const result = await service.updateAcquisition('school-1', 'acquisition-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an acquisition', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteAcquisition('school-1', 'acquisition-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteAcquisition('school-1', 'acquisition-1');
    expect(result).toBe(false);
  });

  it('should get pending acquisitions', async () => {
    const mockAcquisitions = [{ id: 'acquisition-1', status: 'pending' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAcquisitions, error: null });
    const result = await service.getPendingAcquisitions('school-1');
    expect(result).toEqual(mockAcquisitions);
  });

  it('should approve acquisition', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'acquisition-1', status: 'approved' }, error: null });
    const result = await service.approveAcquisition('school-1', 'acquisition-1');
    expect(result).toBeDefined();
  });

  it('should reject acquisition', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'acquisition-1', status: 'rejected' }, error: null });
    const result = await service.rejectAcquisition('school-1', 'acquisition-1', 'Budget constraints');
    expect(result).toBeDefined();
  });

  it('should complete acquisition', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'acquisition-1', status: 'completed' }, error: null });
    const result = await service.completeAcquisition('school-1', 'acquisition-1');
    expect(result).toBeDefined();
  });

  it('should validate acquisition data', () => {
    const result = service.validateAcquisitionData({ title: 'New Books', quantity: 50, publisher_id: 'publisher-1' });
    expect(result).toBe(true);
  });

  it('should reject invalid acquisition data', () => {
    const result = service.validateAcquisitionData({ title: '', quantity: -1, publisher_id: '' });
    expect(result).toBe(false);
  });

  it('should get acquisition statistics', async () => {
    const mockStats = { total: 20, pending: 5, approved: 10, completed: 5 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getAcquisitionStatistics('school-1');
    expect(result).toBeDefined();
  });
});
