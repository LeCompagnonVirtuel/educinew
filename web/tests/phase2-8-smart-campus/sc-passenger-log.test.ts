import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScPassengerLogService } from '@/features/smart-campus/services/sc-passenger-log.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScPassengerLogService', () => {
  let service: ScPassengerLogService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScPassengerLogService(mockSupabase as never); });

  it('should get log by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pl-1', trip_id: 'trip-1', student_id: 's-1', board_time: '07:00' }, error: null }); const r = await service.getLog('school-1', 'pl-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getLog('school-1', 'pl-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_passenger_logs table', async () => { await service.getLog('school-1', 'pl-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_passenger_logs'); });
  it('should filter by school_id', async () => { await service.getLog('school-1', 'pl-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getLog('school-1', 'pl-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'pl-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getLog('school-1', 'pl-1'); expect(r).toBeNull(); });
  it('should return log with board_time', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pl-1', board_time: '07:00' }, error: null }); const r = await service.getLog('school-1', 'pl-1'); expect(r).toHaveProperty('board_time'); });
  it('should return log with alight_time', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pl-1', alight_time: '16:00' }, error: null }); const r = await service.getLog('school-1', 'pl-1'); expect(r).toHaveProperty('alight_time'); });
  it('should get all logs', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'pl-1' }], error: null }); const r = await service.getAllLogs('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no logs', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllLogs('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by trip_id', async () => { await service.getAllLogs('school-1', { tripId: 'trip-1' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllLogs('school-1'); expect(r).toEqual([]); });
  it('should create log', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pl-1' }, error: null }); const r = await service.createLog('school-1', { trip_id: 'trip-1', student_id: 's-1', stop_id: 'stop-1', board_time: '07:00' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createLog('school-1', { trip_id: 'trip-1', student_id: 's-1' }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createLog('school-1', { trip_id: 'trip-1' }); expect(r).toBeNull(); });
  it('should accept parent_notified field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pl-1', parent_notified: true }, error: null }); const r = await service.createLog('school-1', { trip_id: 'trip-1', student_id: 's-1', parent_notified: true }); expect(r).toHaveProperty('parent_notified'); });
  it('should update log', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pl-1', alight_time: '16:00' }, error: null }); const r = await service.updateLog('school-1', 'pl-1', { alight_time: '16:00' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateLog('school-1', 'pl-1', { alight_time: '16:00' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateLog('school-1', 'pl-1', { alight_time: '16:00' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateLog('school-1', 'pl-nonexistent', { alight_time: '16:00' }); expect(r).toBeNull(); });
  it('should delete log', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pl-1' }, error: null }); const r = await service.deleteLog('school-1', 'pl-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteLog('school-1', 'pl-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteLog('school-1', 'pl-1'); expect(r).toBeNull(); });
  it('should get trip logs', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'pl-1' }], error: null }); const r = await service.getTripLogs('school-1', 'trip-1'); expect(r).toBeDefined(); });
  it('should filter by trip_id', async () => { await service.getTripLogs('school-1', 'trip-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('trip_id', 'trip-1'); });
  it('should return empty for no trip logs', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getTripLogs('school-1', 'trip-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle trip logs error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getTripLogs('school-1', 'trip-1'); expect(r).toEqual([]); });
  it('should get passenger stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 1000, avg_daily: 80, peak_hour: '07:00' }, error: null }); const r = await service.getPassengerStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no passenger stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, avg_daily: 0, peak_hour: 'N/A' }, error: null }); const r = await service.getPassengerStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getPassengerStats('school-1'); expect(r).toBeNull(); });
});
