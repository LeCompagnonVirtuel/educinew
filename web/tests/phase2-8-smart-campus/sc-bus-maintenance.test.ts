import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusMaintenanceService } from '@/features/smart-campus/services/sc-bus-maintenance.service';

describe('ScBusMaintenanceService', () => {
  let service: ScBusMaintenanceService;
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
    service = new ScBusMaintenanceService(mockSupabase);
  });

  it('should get maintenance record by id', async () => {
    const result = await service.getMaintenanceRecord('school-1', 'maintenance-1');
    expect(result).toBeDefined();
  });

  it('should return maintenance record with correct data', async () => {
    const mockRecord = { id: 'maintenance-1', bus_id: 'bus-1', type: 'oil_change', status: 'completed' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRecord, error: null });
    const result = await service.getMaintenanceRecord('school-1', 'maintenance-1');
    expect(result).toEqual(mockRecord);
  });

  it('should handle error when getting maintenance record', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMaintenanceRecord('school-1', 'maintenance-1');
    expect(result).toBeNull();
  });

  it('should get all maintenance records for a school', async () => {
    const mockRecords = [{ id: 'maintenance-1' }, { id: 'maintenance-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getMaintenanceRecords('school-1');
    expect(result).toEqual(mockRecords);
  });

  it('should create a new maintenance record', async () => {
    const newRecord = { bus_id: 'bus-1', type: 'tire_change', scheduled_date: '2026-08-10' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'maintenance-3', ...newRecord }, error: null });
    const result = await service.createMaintenanceRecord('school-1', newRecord);
    expect(result).toBeDefined();
  });

  it('should update a maintenance record', async () => {
    const updates = { status: 'completed' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'maintenance-1', ...updates }, error: null });
    const result = await service.updateMaintenanceRecord('school-1', 'maintenance-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a maintenance record', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMaintenanceRecord('school-1', 'maintenance-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMaintenanceRecord('school-1', 'maintenance-1');
    expect(result).toBe(false);
  });

  it('should get maintenance records by bus', async () => {
    const mockRecords = [{ id: 'maintenance-1', bus_id: 'bus-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getMaintenanceRecordsByBus('school-1', 'bus-1');
    expect(result).toEqual(mockRecords);
  });

  it('should get scheduled maintenance', async () => {
    const mockRecords = [{ id: 'maintenance-1', status: 'scheduled' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getScheduledMaintenance('school-1');
    expect(result).toEqual(mockRecords);
  });

  it('should complete maintenance', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'maintenance-1', status: 'completed' }, error: null });
    const result = await service.completeMaintenance('school-1', 'maintenance-1');
    expect(result).toBeDefined();
  });

  it('should cancel maintenance', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'maintenance-1', status: 'cancelled' }, error: null });
    const result = await service.cancelMaintenance('school-1', 'maintenance-1');
    expect(result).toBeDefined();
  });

  it('should get maintenance history for a bus', async () => {
    const mockRecords = [{ id: 'maintenance-1', bus_id: 'bus-1', completed_date: '2026-08-01' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getMaintenanceHistory('school-1', 'bus-1');
    expect(result).toEqual(mockRecords);
  });

  it('should calculate maintenance cost', async () => {
    const mockRecords = [{ cost: 50000 }, { cost: 30000 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getTotalMaintenanceCost('school-1', 'bus-1');
    expect(result).toBe(80000);
  });

  it('should get upcoming maintenance', async () => {
    const mockRecords = [{ id: 'maintenance-1', scheduled_date: '2026-08-10' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getUpcomingMaintenance('school-1');
    expect(result).toEqual(mockRecords);
  });

  it('should validate maintenance type', () => {
    const result = service.validateMaintenanceType('oil_change');
    expect(result).toBe(true);
  });

  it('should reject invalid maintenance type', () => {
    const result = service.validateMaintenanceType('invalid_type');
    expect(result).toBe(false);
  });
});
