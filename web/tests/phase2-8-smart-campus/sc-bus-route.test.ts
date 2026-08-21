import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusRouteService } from '@/features/smart-campus/services/sc-bus-route.service';

describe('ScBusRouteService', () => {
  let service: ScBusRouteService;
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
    service = new ScBusRouteService(mockSupabase);
  });

  it('should get bus route by id', async () => {
    const result = await service.getBusRoute('school-1', 'route-1');
    expect(result).toBeDefined();
  });

  it('should return route with correct data', async () => {
    const mockRoute = { id: 'route-1', name: 'Route A', distance_km: 15.5 };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRoute, error: null });
    const result = await service.getBusRoute('school-1', 'route-1');
    expect(result).toEqual(mockRoute);
  });

  it('should handle error when getting route', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getBusRoute('school-1', 'route-1');
    expect(result).toBeNull();
  });

  it('should get all routes for a school', async () => {
    const mockRoutes = [{ id: 'route-1' }, { id: 'route-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRoutes, error: null });
    const result = await service.getBusRoutes('school-1');
    expect(result).toEqual(mockRoutes);
  });

  it('should create a new route', async () => {
    const newRoute = { name: 'Route B', distance_km: 20.0 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'route-3', ...newRoute }, error: null });
    const result = await service.createBusRoute('school-1', newRoute);
    expect(result).toBeDefined();
  });

  it('should update a route', async () => {
    const updates = { name: 'Updated Route' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'route-1', ...updates }, error: null });
    const result = await service.updateBusRoute('school-1', 'route-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a route', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteBusRoute('school-1', 'route-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteBusRoute('school-1', 'route-1');
    expect(result).toBe(false);
  });

  it('should get route by name', async () => {
    const mockRoute = { id: 'route-1', name: 'Route A' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRoute, error: null });
    const result = await service.getRouteByName('school-1', 'Route A');
    expect(result).toEqual(mockRoute);
  });

  it('should get active routes', async () => {
    const mockRoutes = [{ id: 'route-1', is_active: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRoutes, error: null });
    const result = await service.getActiveRoutes('school-1');
    expect(result).toEqual(mockRoutes);
  });

  it('should get route stops', async () => {
    const mockStops = [{ id: 'stop-1', order: 1 }, { id: 'stop-2', order: 2 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStops, error: null });
    const result = await service.getRouteStops('school-1', 'route-1');
    expect(result).toEqual(mockStops);
  });

  it('should add stop to route', async () => {
    const newStop = { stop_id: 'stop-3', order: 3 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: newStop, error: null });
    const result = await service.addStopToRoute('school-1', 'route-1', newStop);
    expect(result).toBeDefined();
  });

  it('should remove stop from route', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.removeStopFromRoute('school-1', 'route-1', 'stop-2');
    expect(result).toBe(true);
  });

  it('should calculate route distance', () => {
    const distance = service.calculateRouteDistance([
      { latitude: 6.5244, longitude: 3.3792 },
      { latitude: 6.5245, longitude: 3.3793 }
    ]);
    expect(distance).toBeGreaterThan(0);
  });

  it('should estimate travel time', () => {
    const time = service.estimateTravelTime(15.5, 30);
    expect(time).toBeGreaterThan(0);
  });
});
