import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusStopService } from '@/features/smart-campus/services/sc-bus-stop.service';

describe('ScBusStopService', () => {
  let service: ScBusStopService;
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
    service = new ScBusStopService(mockSupabase);
  });

  it('should get bus stop by id', async () => {
    const result = await service.getBusStop('school-1', 'stop-1');
    expect(result).toBeDefined();
  });

  it('should return bus stop with correct data', async () => {
    const mockStop = { id: 'stop-1', name: 'Main Gate', latitude: 6.5244, longitude: 3.3792 };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockStop, error: null });
    const result = await service.getBusStop('school-1', 'stop-1');
    expect(result).toEqual(mockStop);
  });

  it('should handle error when getting bus stop', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getBusStop('school-1', 'stop-1');
    expect(result).toBeNull();
  });

  it('should get all bus stops for a school', async () => {
    const mockStops = [{ id: 'stop-1' }, { id: 'stop-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStops, error: null });
    const result = await service.getBusStops('school-1');
    expect(result).toEqual(mockStops);
  });

  it('should create a new bus stop', async () => {
    const newStop = { name: 'Library Junction', latitude: 6.5245, longitude: 3.3793 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'stop-3', ...newStop }, error: null });
    const result = await service.createBusStop('school-1', newStop);
    expect(result).toBeDefined();
  });

  it('should update a bus stop', async () => {
    const updates = { name: 'Updated Gate' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'stop-1', ...updates }, error: null });
    const result = await service.updateBusStop('school-1', 'stop-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a bus stop', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteBusStop('school-1', 'stop-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteBusStop('school-1', 'stop-1');
    expect(result).toBe(false);
  });

  it('should get bus stop by name', async () => {
    const mockStop = { id: 'stop-1', name: 'Main Gate' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockStop, error: null });
    const result = await service.getBusStopByName('school-1', 'Main Gate');
    expect(result).toEqual(mockStop);
  });

  it('should get active bus stops', async () => {
    const mockStops = [{ id: 'stop-1', is_active: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStops, error: null });
    const result = await service.getActiveBusStops('school-1');
    expect(result).toEqual(mockStops);
  });

  it('should validate coordinates', () => {
    const result = service.validateCoordinates(6.5244, 3.3792);
    expect(result).toBe(true);
  });

  it('should reject invalid latitude', () => {
    const result = service.validateCoordinates(100, 3.3792);
    expect(result).toBe(false);
  });

  it('should reject invalid longitude', () => {
    const result = service.validateCoordinates(6.5244, 200);
    expect(result).toBe(false);
  });

  it('should calculate distance between stops', () => {
    const distance = service.calculateDistance(6.5244, 3.3792, 6.5245, 3.3793);
    expect(distance).toBeGreaterThan(0);
  });

  it('should get nearby stops', async () => {
    const mockStops = [{ id: 'stop-1', latitude: 6.5244, longitude: 3.3792 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStops, error: null });
    const result = await service.getNearbyStops('school-1', 6.5244, 3.3792, 1000);
    expect(result).toEqual(mockStops);
  });
});
