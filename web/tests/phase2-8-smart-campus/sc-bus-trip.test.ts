import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusTripService } from '@/features/smart-campus/services/sc-bus-trip.service';

describe('ScBusTripService', () => {
  let service: ScBusTripService;
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
    service = new ScBusTripService(mockSupabase);
  });

  it('should get trip by id', async () => {
    const result = await service.getTrip('school-1', 'trip-1');
    expect(result).toBeDefined();
  });

  it('should return trip with correct data', async () => {
    const mockTrip = { id: 'trip-1', route_id: 'route-1', status: 'scheduled' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockTrip, error: null });
    const result = await service.getTrip('school-1', 'trip-1');
    expect(result).toEqual(mockTrip);
  });

  it('should handle error when getting trip', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getTrip('school-1', 'trip-1');
    expect(result).toBeNull();
  });

  it('should get all trips for a school', async () => {
    const mockTrips = [{ id: 'trip-1' }, { id: 'trip-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTrips, error: null });
    const result = await service.getTrips('school-1');
    expect(result).toEqual(mockTrips);
  });

  it('should create a new trip', async () => {
    const newTrip = { route_id: 'route-1', bus_id: 'bus-1', departure_time: '08:00' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'trip-3', ...newTrip }, error: null });
    const result = await service.createTrip('school-1', newTrip);
    expect(result).toBeDefined();
  });

  it('should update a trip', async () => {
    const updates = { status: 'in_progress' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'trip-1', ...updates }, error: null });
    const result = await service.updateTrip('school-1', 'trip-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a trip', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteTrip('school-1', 'trip-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteTrip('school-1', 'trip-1');
    expect(result).toBe(false);
  });

  it('should start a trip', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'trip-1', status: 'in_progress' }, error: null });
    const result = await service.startTrip('school-1', 'trip-1');
    expect(result).toBeDefined();
  });

  it('should complete a trip', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'trip-1', status: 'completed' }, error: null });
    const result = await service.completeTrip('school-1', 'trip-1');
    expect(result).toBeDefined();
  });

  it('should cancel a trip', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'trip-1', status: 'cancelled' }, error: null });
    const result = await service.cancelTrip('school-1', 'trip-1');
    expect(result).toBeDefined();
  });

  it('should get scheduled trips', async () => {
    const mockTrips = [{ id: 'trip-1', status: 'scheduled' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTrips, error: null });
    const result = await service.getScheduledTrips('school-1');
    expect(result).toEqual(mockTrips);
  });

  it('should get trips by date', async () => {
    const mockTrips = [{ id: 'trip-1', date: '2026-08-03' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTrips, error: null });
    const result = await service.getTripsByDate('school-1', '2026-08-03');
    expect(result).toEqual(mockTrips);
  });

  it('should get trips by bus', async () => {
    const mockTrips = [{ id: 'trip-1', bus_id: 'bus-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTrips, error: null });
    const result = await service.getTripsByBus('school-1', 'bus-1');
    expect(result).toEqual(mockTrips);
  });

  it('should validate trip schedule', () => {
    const result = service.validateTripSchedule('08:00', '15:00');
    expect(result).toBe(true);
  });

  it('should reject invalid schedule', () => {
    const result = service.validateTripSchedule('15:00', '08:00');
    expect(result).toBe(false);
  });
});
