import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScShuttleStopService } from '@/features/smart-campus/services/sc-shuttle-stop.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScShuttleStopService', () => {
  let service: ScShuttleStopService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScShuttleStopService(mockSupabase as never); });

  it('should get stop by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ss-1', name: 'Main Gate', latitude: 6.5, longitude: 3.3 }, error: null }); const r = await service.getStop('school-1', 'ss-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getStop('school-1', 'ss-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_shuttle_stops table', async () => { await service.getStop('school-1', 'ss-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_shuttle_stops'); });
  it('should filter by school_id', async () => { await service.getStop('school-1', 'ss-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getStop('school-1', 'ss-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'ss-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getStop('school-1', 'ss-1'); expect(r).toBeNull(); });
  it('should return stop with name', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ss-1', name: 'Main Gate' }, error: null }); const r = await service.getStop('school-1', 'ss-1'); expect(r).toHaveProperty('name'); });
  it('should return stop with coordinates', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ss-1', latitude: 6.5, longitude: 3.3 }, error: null }); const r = await service.getStop('school-1', 'ss-1'); expect(r).toHaveProperty('latitude'); });
  it('should get all stops', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ss-1' }], error: null }); const r = await service.getAllStops('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no stops', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllStops('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllStops('school-1'); expect(r).toEqual([]); });
  it('should create stop', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ss-1' }, error: null }); const r = await service.createStop('school-1', { name: 'Main Gate', latitude: 6.5, longitude: 3.3 }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createStop('school-1', { name: 'Main Gate', latitude: 6.5, longitude: 3.3 }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createStop('school-1', { name: 'Main Gate' }); expect(r).toBeNull(); });
  it('should accept address field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ss-1', address: '123 Main St' }, error: null }); const r = await service.createStop('school-1', { name: 'Main Gate', address: '123 Main St' }); expect(r).toHaveProperty('address'); });
  it('should accept order_index field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ss-1', order_index: 1 }, error: null }); const r = await service.createStop('school-1', { name: 'Main Gate', order_index: 1 }); expect(r).toHaveProperty('order_index'); });
  it('should update stop', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ss-1', name: 'New Gate' }, error: null }); const r = await service.updateStop('school-1', 'ss-1', { name: 'New Gate' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateStop('school-1', 'ss-1', { name: 'New Gate' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateStop('school-1', 'ss-1', { name: 'New Gate' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateStop('school-1', 'ss-nonexistent', { name: 'New Gate' }); expect(r).toBeNull(); });
  it('should delete stop', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ss-1' }, error: null }); const r = await service.deleteStop('school-1', 'ss-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteStop('school-1', 'ss-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteStop('school-1', 'ss-1'); expect(r).toBeNull(); });
  it('should not throw on delete', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ss-1' }, error: null }); await expect(service.deleteStop('school-1', 'ss-1')).resolves.not.toThrow(); });
  it('should get route stops', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ss-1' }], error: null }); const r = await service.getRouteStops('school-1', 'route-1'); expect(r).toBeDefined(); });
  it('should filter by route_id', async () => { await service.getRouteStops('school-1', 'route-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('route_id', 'route-1'); });
  it('should return empty for no route stops', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getRouteStops('school-1', 'route-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle route stops error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getRouteStops('school-1', 'route-1'); expect(r).toEqual([]); });
  it('should get stop stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 20, active: 18, avg_daily_passengers: 100 }, error: null }); const r = await service.getStopStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no stops stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, active: 0, avg_daily_passengers: 0 }, error: null }); const r = await service.getStopStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getStopStats('school-1'); expect(r).toBeNull(); });
});
