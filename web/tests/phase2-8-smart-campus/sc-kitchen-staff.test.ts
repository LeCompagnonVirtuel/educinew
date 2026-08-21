import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScKitchenStaffService } from '@/features/smart-campus/services/sc-kitchen-staff.service';

describe('ScKitchenStaffService', () => {
  let service: ScKitchenStaffService;
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
    service = new ScKitchenStaffService(mockSupabase);
  });

  it('should get kitchen staff by id', async () => {
    const result = await service.getKitchenStaff('school-1', 'staff-1');
    expect(result).toBeDefined();
  });

  it('should return kitchen staff with correct data', async () => {
    const mockStaff = { id: 'staff-1', name: 'Chef John', position: 'Head Chef', phone: '+2348012345678' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockStaff, error: null });
    const result = await service.getKitchenStaff('school-1', 'staff-1');
    expect(result).toEqual(mockStaff);
  });

  it('should handle error when getting kitchen staff', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getKitchenStaff('school-1', 'staff-1');
    expect(result).toBeNull();
  });

  it('should get all kitchen staff for a school', async () => {
    const mockStaffList = [{ id: 'staff-1' }, { id: 'staff-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStaffList, error: null });
    const result = await service.getKitchenStaffList('school-1');
    expect(result).toEqual(mockStaffList);
  });

  it('should create a new kitchen staff', async () => {
    const newStaff = { name: 'Chef Jane', position: 'Sous Chef', phone: '+2348098765432' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'staff-3', ...newStaff }, error: null });
    const result = await service.createKitchenStaff('school-1', newStaff);
    expect(result).toBeDefined();
  });

  it('should update kitchen staff', async () => {
    const updates = { position: 'Executive Chef' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'staff-1', ...updates }, error: null });
    const result = await service.updateKitchenStaff('school-1', 'staff-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete kitchen staff', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteKitchenStaff('school-1', 'staff-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteKitchenStaff('school-1', 'staff-1');
    expect(result).toBe(false);
  });

  it('should get active kitchen staff', async () => {
    const mockStaffList = [{ id: 'staff-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStaffList, error: null });
    const result = await service.getActiveKitchenStaff('school-1');
    expect(result).toEqual(mockStaffList);
  });

  it('should search kitchen staff', async () => {
    const mockStaffList = [{ id: 'staff-1', name: 'Chef John' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStaffList, error: null });
    const result = await service.searchKitchenStaff('school-1', 'John');
    expect(result).toEqual(mockStaffList);
  });

  it('should get staff by position', async () => {
    const mockStaffList = [{ id: 'staff-1', position: 'Head Chef' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStaffList, error: null });
    const result = await service.getStaffByPosition('school-1', 'Head Chef');
    expect(result).toEqual(mockStaffList);
  });

  it('should validate kitchen staff data', () => {
    const result = service.validateKitchenStaffData({ name: 'Chef John', position: 'Head Chef', phone: '+2348012345678' });
    expect(result).toBe(true);
  });

  it('should reject invalid kitchen staff data', () => {
    const result = service.validateKitchenStaffData({ name: '', position: '', phone: '' });
    expect(result).toBe(false);
  });

  it('should get staff schedule', async () => {
    const mockSchedule = [{ staff_id: 'staff-1', shift: 'morning', date: '2026-08-03' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSchedule, error: null });
    const result = await service.getStaffSchedule('school-1', 'staff-1');
    expect(result).toEqual(mockSchedule);
  });

  it('should assign staff to shift', async () => {
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { staff_id: 'staff-1', shift: 'morning' }, error: null });
    const result = await service.assignToShift('school-1', 'staff-1', 'morning', '2026-08-03');
    expect(result).toBeDefined();
  });

  it('should get kitchen staff statistics', async () => {
    const mockStats = { total: 10, active: 8, on_leave: 2 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getKitchenStaffStatistics('school-1');
    expect(result).toBeDefined();
  });
});
