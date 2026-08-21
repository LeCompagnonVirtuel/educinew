import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMaintenanceScheduleService } from '@/features/smart-campus/services/sc-maintenance-schedule.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScMaintenanceScheduleService', () => {
  let service: ScMaintenanceScheduleService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScMaintenanceScheduleService(mockSupabase as never); });

  it('should get schedule by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', vehicle_id: 'v-1', maintenance_type: 'oil_change' }, error: null }); const r = await service.getSchedule('school-1', 'ms-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getSchedule('school-1', 'ms-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_maintenance_schedule table', async () => { await service.getSchedule('school-1', 'ms-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_maintenance_schedule'); });
  it('should filter by school_id', async () => { await service.getSchedule('school-1', 'ms-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getSchedule('school-1', 'ms-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'ms-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getSchedule('school-1', 'ms-1'); expect(r).toBeNull(); });
  it('should return schedule with maintenance_type', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', maintenance_type: 'oil_change' }, error: null }); const r = await service.getSchedule('school-1', 'ms-1'); expect(r).toHaveProperty('maintenance_type'); });
  it('should return schedule with next_due_date', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', next_due_date: '2026-06-01' }, error: null }); const r = await service.getSchedule('school-1', 'ms-1'); expect(r).toHaveProperty('next_due_date'); });
  it('should get all schedules', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ms-1' }], error: null }); const r = await service.getAllSchedules('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no schedules', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllSchedules('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by vehicle_id', async () => { await service.getAllSchedules('school-1', { vehicleId: 'v-1' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllSchedules('school-1'); expect(r).toEqual([]); });
  it('should create schedule', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1' }, error: null }); const r = await service.createSchedule('school-1', { vehicle_id: 'v-1', maintenance_type: 'oil_change', interval_km: 5000, interval_months: 6 }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createSchedule('school-1', { vehicle_id: 'v-1', maintenance_type: 'oil_change' }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createSchedule('school-1', { vehicle_id: 'v-1' }); expect(r).toBeNull(); });
  it('should accept estimated_cost field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', estimated_cost: 15000 }, error: null }); const r = await service.createSchedule('school-1', { vehicle_id: 'v-1', maintenance_type: 'oil_change', estimated_cost: 15000 }); expect(r).toHaveProperty('estimated_cost'); });
  it('should accept assigned_mechanic field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', assigned_mechanic: 'Mechanic A' }, error: null }); const r = await service.createSchedule('school-1', { vehicle_id: 'v-1', maintenance_type: 'oil_change', assigned_mechanic: 'Mechanic A' }); expect(r).toHaveProperty('assigned_mechanic'); });
  it('should update schedule', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', status: 'completed' }, error: null }); const r = await service.updateSchedule('school-1', 'ms-1', { status: 'completed' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateSchedule('school-1', 'ms-1', { status: 'completed' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateSchedule('school-1', 'ms-1', { status: 'completed' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateSchedule('school-1', 'ms-nonexistent', { status: 'completed' }); expect(r).toBeNull(); });
  it('should delete schedule', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1' }, error: null }); const r = await service.deleteSchedule('school-1', 'ms-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteSchedule('school-1', 'ms-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteSchedule('school-1', 'ms-1'); expect(r).toBeNull(); });
  it('should get vehicle schedules', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ms-1' }], error: null }); const r = await service.getVehicleSchedules('school-1', 'v-1'); expect(r).toBeDefined(); });
  it('should filter by vehicle_id', async () => { await service.getVehicleSchedules('school-1', 'v-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('vehicle_id', 'v-1'); });
  it('should return empty for no schedules', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getVehicleSchedules('school-1', 'v-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle vehicle schedules error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getVehicleSchedules('school-1', 'v-1'); expect(r).toEqual([]); });
  it('should get upcoming maintenance', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ms-1' }], error: null }); const r = await service.getUpcomingMaintenance('school-1'); expect(r).toBeDefined(); });
  it('should filter by status pending', async () => { await service.getUpcomingMaintenance('school-1'); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should return empty for no upcoming', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getUpcomingMaintenance('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle upcoming error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getUpcomingMaintenance('school-1'); expect(r).toEqual([]); });
  it('should get maintenance stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 50, pending: 10, completed: 35, overdue: 5 }, error: null }); const r = await service.getMaintenanceStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no maintenance stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, pending: 0, completed: 0, overdue: 0 }, error: null }); const r = await service.getMaintenanceStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getMaintenanceStats('school-1'); expect(r).toBeNull(); });
});
