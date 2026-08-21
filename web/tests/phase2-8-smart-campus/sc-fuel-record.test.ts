import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScFuelRecordService } from '@/features/smart-campus/services/sc-fuel-record.service';

describe('ScFuelRecordService', () => {
  let service: ScFuelRecordService;
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
    service = new ScFuelRecordService(mockSupabase);
  });

  it('should get fuel record by id', async () => {
    const result = await service.getFuelRecord('school-1', 'fuel-1');
    expect(result).toBeDefined();
  });

  it('should return fuel record with correct data', async () => {
    const mockRecord = { id: 'fuel-1', bus_id: 'bus-1', liters: 50, cost: 25000 };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRecord, error: null });
    const result = await service.getFuelRecord('school-1', 'fuel-1');
    expect(result).toEqual(mockRecord);
  });

  it('should handle error when getting fuel record', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getFuelRecord('school-1', 'fuel-1');
    expect(result).toBeNull();
  });

  it('should get all fuel records for a school', async () => {
    const mockRecords = [{ id: 'fuel-1' }, { id: 'fuel-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getFuelRecords('school-1');
    expect(result).toEqual(mockRecords);
  });

  it('should create a new fuel record', async () => {
    const newRecord = { bus_id: 'bus-1', liters: 50, cost: 25000, fuel_type: 'diesel' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'fuel-3', ...newRecord }, error: null });
    const result = await service.createFuelRecord('school-1', newRecord);
    expect(result).toBeDefined();
  });

  it('should update a fuel record', async () => {
    const updates = { cost: 26000 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'fuel-1', ...updates }, error: null });
    const result = await service.updateFuelRecord('school-1', 'fuel-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a fuel record', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteFuelRecord('school-1', 'fuel-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteFuelRecord('school-1', 'fuel-1');
    expect(result).toBe(false);
  });

  it('should get fuel records by bus', async () => {
    const mockRecords = [{ id: 'fuel-1', bus_id: 'bus-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getFuelRecordsByBus('school-1', 'bus-1');
    expect(result).toEqual(mockRecords);
  });

  it('should get fuel records by date range', async () => {
    const mockRecords = [{ id: 'fuel-1', date: '2026-08-01' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getFuelRecordsByDateRange('school-1', '2026-08-01', '2026-08-03');
    expect(result).toEqual(mockRecords);
  });

  it('should calculate total fuel cost', async () => {
    const mockRecords = [{ cost: 25000 }, { cost: 30000 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getTotalFuelCost('school-1', 'bus-1');
    expect(result).toBe(55000);
  });

  it('should calculate average fuel consumption', async () => {
    const result = service.calculateAverageConsumption(500, 100);
    expect(result).toBe(5);
  });

  it('should validate fuel record data', () => {
    const result = service.validateFuelRecord({ liters: 50, cost: 25000 });
    expect(result).toBe(true);
  });

  it('should reject invalid fuel record data', () => {
    const result = service.validateFuelRecord({ liters: -1, cost: 25000 });
    expect(result).toBe(false);
  });

  it('should get fuel statistics for a bus', async () => {
    const mockStats = { total_liters: 500, total_cost: 250000, avg_consumption: 5 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getFuelStatistics('school-1', 'bus-1');
    expect(result).toBeDefined();
  });
});
