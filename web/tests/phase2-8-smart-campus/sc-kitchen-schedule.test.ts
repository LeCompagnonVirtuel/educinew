import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScKitchenScheduleService } from '@/features/smart-campus/services/sc-kitchen-schedule.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScKitchenScheduleService', () => {
  let service: ScKitchenScheduleService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScKitchenScheduleService(mockSupabase as never); });

  it('should get schedule by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ks-1', date: '2026-01-20', meal_type: 'lunch', prep_start: '10:00' }, error: null }); const r = await service.getSchedule('school-1', 'ks-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getSchedule('school-1', 'ks-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_kitchen_schedule table', async () => { await service.getSchedule('school-1', 'ks-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_kitchen_schedule'); });
  it('should filter by school_id', async () => { await service.getSchedule('school-1', 'ks-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getSchedule('school-1', 'ks-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'ks-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getSchedule('school-1', 'ks-1'); expect(r).toBeNull(); });
  it('should return schedule with prep_start', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ks-1', prep_start: '10:00' }, error: null }); const r = await service.getSchedule('school-1', 'ks-1'); expect(r).toHaveProperty('prep_start'); });
  it('should return schedule with meal_type', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ks-1', meal_type: 'lunch' }, error: null }); const r = await service.getSchedule('school-1', 'ks-1'); expect(r).toHaveProperty('meal_type'); });
  it('should get all schedules', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ks-1' }], error: null }); const r = await service.getAllSchedules('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no schedules', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllSchedules('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by date', async () => { await service.getAllSchedules('school-1', { date: '2026-01-20' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllSchedules('school-1'); expect(r).toEqual([]); });
  it('should create schedule', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ks-1' }, error: null }); const r = await service.createSchedule('school-1', { date: '2026-01-20', meal_type: 'lunch', prep_start: '10:00', prep_end: '12:00' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createSchedule('school-1', { date: '2026-01-20', meal_type: 'lunch' }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createSchedule('school-1', { date: '2026-01-20' }); expect(r).toBeNull(); });
  it('should accept assigned_to field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ks-1', assigned_to: ['staff-1', 'staff-2'] }, error: null }); const r = await service.createSchedule('school-1', { date: '2026-01-20', meal_type: 'lunch', assigned_to: ['staff-1', 'staff-2'] }); expect(r).toHaveProperty('assigned_to'); });
  it('should accept station_id field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ks-1', station_id: 'stn-1' }, error: null }); const r = await service.createSchedule('school-1', { date: '2026-01-20', meal_type: 'lunch', station_id: 'stn-1' }); expect(r).toHaveProperty('station_id'); });
  it('should update schedule', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ks-1', prep_start: '09:30' }, error: null }); const r = await service.updateSchedule('school-1', 'ks-1', { prep_start: '09:30' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateSchedule('school-1', 'ks-1', { prep_start: '09:30' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateSchedule('school-1', 'ks-1', { prep_start: '09:30' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateSchedule('school-1', 'ks-nonexistent', { prep_start: '09:30' }); expect(r).toBeNull(); });
  it('should delete schedule', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ks-1' }, error: null }); const r = await service.deleteSchedule('school-1', 'ks-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteSchedule('school-1', 'ks-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteSchedule('school-1', 'ks-1'); expect(r).toBeNull(); });
  it('should get daily schedule', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ks-1' }, { id: 'ks-2' }], error: null }); const r = await service.getDailySchedule('school-1', '2026-01-20'); expect(r).toBeDefined(); });
  it('should filter by date', async () => { await service.getDailySchedule('school-1', '2026-01-20'); expect(mockSupabase.eq).toHaveBeenCalledWith('date', '2026-01-20'); });
  it('should return empty for no schedule', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getDailySchedule('school-1', '2026-01-20'); expect(Array.isArray(r)).toBe(true); });
  it('should handle daily error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getDailySchedule('school-1', '2026-01-20'); expect(r).toEqual([]); });
  it('should get schedule stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 50, active: 5, completed: 45 }, error: null }); const r = await service.getScheduleStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no schedule stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, active: 0, completed: 0 }, error: null }); const r = await service.getScheduleStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getScheduleStats('school-1'); expect(r).toBeNull(); });
});
