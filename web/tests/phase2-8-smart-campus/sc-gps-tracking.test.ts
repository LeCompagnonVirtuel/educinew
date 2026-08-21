import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScGpsTrackingService } from '@/features/smart-campus/services/sc-gps-tracking.service';

describe('ScGpsTrackingService', () => {
  let service: ScGpsTrackingService;
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
    service = new ScGpsTrackingService(mockSupabase);
  });

  it('should get GPS location by id', async () => {
    const result = await service.getLocation('school-1', 'gps-1');
    expect(result).toBeDefined();
  });

  it('should return location with correct data', async () => {
    const mockLocation = { id: 'gps-1', latitude: 6.5244, longitude: 3.3792, timestamp: new Date() };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockLocation, error: null });
    const result = await service.getLocation('school-1', 'gps-1');
    expect(result).toEqual(mockLocation);
  });

  it('should handle error when getting location', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getLocation('school-1', 'gps-1');
    expect(result).toBeNull();
  });

  it('should get all GPS locations for a school', async () => {
    const mockLocations = [{ id: 'gps-1' }, { id: 'gps-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockLocations, error: null });
    const result = await service.getLocations('school-1');
    expect(result).toEqual(mockLocations);
  });

  it('should record new GPS location', async () => {
    const newLocation = { latitude: 6.5244, longitude: 3.3792, bus_id: 'bus-1' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'gps-3', ...newLocation }, error: null });
    const result = await service.recordLocation('school-1', newLocation);
    expect(result).toBeDefined();
  });

  it('should update GPS location', async () => {
    const updates = { latitude: 6.5245, longitude: 3.3793 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'gps-1', ...updates }, error: null });
    const result = await service.updateLocation('school-1', 'gps-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete GPS location', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteLocation('school-1', 'gps-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteLocation('school-1', 'gps-1');
    expect(result).toBe(false);
  });

  it('should get latest location for a bus', async () => {
    const mockLocation = { id: 'gps-1', bus_id: 'bus-1', latitude: 6.5244 };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockLocation, error: null });
    const result = await service.getLatestBusLocation('school-1', 'bus-1');
    expect(result).toEqual(mockLocation);
  });

  it('should get location history for a bus', async () => {
    const mockLocations = [{ id: 'gps-1', bus_id: 'bus-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockLocations, error: null });
    const result = await service.getBusLocationHistory('school-1', 'bus-1');
    expect(result).toEqual(mockLocations);
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

  it('should calculate distance between points', () => {
    const distance = service.calculateDistance(6.5244, 3.3792, 6.5245, 3.3793);
    expect(distance).toBeGreaterThan(0);
  });

  it('should check if point is within radius', () => {
    const result = service.isWithinRadius(6.5244, 3.3792, 6.5245, 3.3793, 1000);
    expect(result).toBe(true);
  });

  it('should get all active bus locations', async () => {
    const mockLocations = [{ id: 'gps-1', bus_id: 'bus-1', is_active: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockLocations, error: null });
    const result = await service.getActiveBusLocations('school-1');
    expect(result).toEqual(mockLocations);
  });

  it('should track bus speed', async () => {
    const mockSpeed = { bus_id: 'bus-1', speed: 45.5 };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockSpeed, error: null });
    const result = await service.getBusSpeed('school-1', 'bus-1');
    expect(result).toBeDefined();
  });
});
