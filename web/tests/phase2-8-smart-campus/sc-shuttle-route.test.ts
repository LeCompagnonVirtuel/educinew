import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScShuttleRouteService } from '@/features/smart-campus/services/sc-shuttle-route.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScShuttleRouteService', () => {
  let service: ScShuttleRouteService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScShuttleRouteService(mockSupabase as never); });

  it('should get route by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'sr-1', name: 'Morning Route' }, error: null }); const r = await service.getRoute('school-1', 'sr-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getRoute('school-1', 'sr-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_shuttle_routes table', async () => { await service.getRoute('school-1', 'sr-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_shuttle_routes'); });
  it('should filter by school_id', async () => { await service.getRoute('school-1', 'sr-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getRoute('school-1', 'sr-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'sr-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getRoute('school-1', 'sr-1'); expect(r).toBeNull(); });
  it('should return route with name', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'sr-1', name: 'Morning Route' }, error: null }); const r = await service.getRoute('school-1', 'sr-1'); expect(r).toHaveProperty('name'); });
  it('should return route with stops', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'sr-1', stops: ['Stop A', 'Stop B'] }, error: null }); const r = await service.getRoute('school-1', 'sr-1'); expect(r).toHaveProperty('stops'); });
  it('should get all routes', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'sr-1' }], error: null }); const r = await service.getAllRoutes('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no routes', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllRoutes('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by status', async () => { await service.getAllRoutes('school-1', { status: 'active' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllRoutes('school-1'); expect(r).toEqual([]); });
  it('should create route', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'sr-1' }, error: null }); const r = await service.createRoute('school-1', { name: 'Morning Route', stops: ['Stop A', 'Stop B'] }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createRoute('school-1', { name: 'Morning Route', stops: ['Stop A'] }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createRoute('school-1', { name: 'Morning Route' }); expect(r).toBeNull(); });
  it('should accept departure_time field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'sr-1', departure_time: '07:00' }, error: null }); const r = await service.createRoute('school-1', { name: 'Morning Route', departure_time: '07:00' }); expect(r).toHaveProperty('departure_time'); });
  it('should accept return_time field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'sr-1', return_time: '16:00' }, error: null }); const r = await service.createRoute('school-1', { name: 'Morning Route', return_time: '16:00' }); expect(r).toHaveProperty('return_time'); });
  it('should accept capacity field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'sr-1', capacity: 40 }, error: null }); const r = await service.createRoute('school-1', { name: 'Morning Route', capacity: 40 }); expect(r).toHaveProperty('capacity'); });
  it('should update route', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'sr-1', status: 'inactive' }, error: null }); const r = await service.updateRoute('school-1', 'sr-1', { status: 'inactive' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateRoute('school-1', 'sr-1', { status: 'inactive' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateRoute('school-1', 'sr-1', { status: 'inactive' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateRoute('school-1', 'sr-nonexistent', { status: 'inactive' }); expect(r).toBeNull(); });
  it('should delete route', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'sr-1' }, error: null }); const r = await service.deleteRoute('school-1', 'sr-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteRoute('school-1', 'sr-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteRoute('school-1', 'sr-1'); expect(r).toBeNull(); });
  it('should get route stops', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'stop-1' }], error: null }); const r = await service.getRouteStops('school-1', 'sr-1'); expect(r).toBeDefined(); });
  it('should filter by route_id', async () => { await service.getRouteStops('school-1', 'sr-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('route_id', 'sr-1'); });
  it('should return empty for no stops', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getRouteStops('school-1', 'sr-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle stops error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getRouteStops('school-1', 'sr-1'); expect(r).toEqual([]); });
  it('should get route stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 10, active: 8, total_passengers: 500 }, error: null }); const r = await service.getRouteStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no routes stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, active: 0, total_passengers: 0 }, error: null }); const r = await service.getRouteStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getRouteStats('school-1'); expect(r).toBeNull(); });
});
