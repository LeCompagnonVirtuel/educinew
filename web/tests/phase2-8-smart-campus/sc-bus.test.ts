import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusService } from '@/features/smart-campus/services/sc-bus.service';

describe('ScBusService', () => {
  let service: ScBusService;
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
    service = new ScBusService(mockSupabase);
  });

  it('should get bus by id', async () => {
    const result = await service.getBus('school-1', 'bus-1');
    expect(result).toBeDefined();
  });

  it('should return bus with correct id', async () => {
    const mockBus = { id: 'bus-1', plate_number: 'AB-1234' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockBus, error: null });
    const result = await service.getBus('school-1', 'bus-1');
    expect(result).toEqual(mockBus);
  });

  it('should handle error when getting bus', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getBus('school-1', 'bus-1');
    expect(result).toBeNull();
  });

  it('should get all buses for a school', async () => {
    const mockBuses = [{ id: 'bus-1' }, { id: 'bus-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockBuses, error: null });
    const result = await service.getBuses('school-1');
    expect(result).toEqual(mockBuses);
  });

  it('should create a new bus', async () => {
    const newBus = { plate_number: 'CD-5678', capacity: 40 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'bus-3', ...newBus }, error: null });
    const result = await service.createBus('school-1', newBus);
    expect(result).toBeDefined();
  });

  it('should update a bus', async () => {
    const updates = { capacity: 45 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'bus-1', ...updates }, error: null });
    const result = await service.updateBus('school-1', 'bus-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a bus', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteBus('school-1', 'bus-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteBus('school-1', 'bus-1');
    expect(result).toBe(false);
  });

  it('should get bus by plate number', async () => {
    const mockBus = { id: 'bus-1', plate_number: 'AB-1234' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockBus, error: null });
    const result = await service.getBusByPlateNumber('school-1', 'AB-1234');
    expect(result).toEqual(mockBus);
  });

  it('should return null when plate number not found', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: null });
    const result = await service.getBusByPlateNumber('school-1', 'XX-0000');
    expect(result).toBeNull();
  });

  it('should get active buses only', async () => {
    const mockBuses = [{ id: 'bus-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockBuses, error: null });
    const result = await service.getActiveBuses('school-1');
    expect(result).toEqual(mockBuses);
  });

  it('should update bus status', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'bus-1', status: 'maintenance' }, error: null });
    const result = await service.updateBusStatus('school-1', 'bus-1', 'maintenance');
    expect(result).toBeDefined();
  });

  it('should get bus statistics', async () => {
    const mockStats = { total: 10, active: 8, maintenance: 2 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getBusStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should validate plate number format', () => {
    const result = service.validatePlateNumber('AB-1234');
    expect(result).toBe(true);
  });

  it('should reject invalid plate number', () => {
    const result = service.validatePlateNumber('INVALID');
    expect(result).toBe(false);
  });

  it('should get bus capacity', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: { id: 'bus-1', capacity: 40 }, error: null });
    const result = await service.getBusCapacity('school-1', 'bus-1');
    expect(result).toBe(40);
  });
});
