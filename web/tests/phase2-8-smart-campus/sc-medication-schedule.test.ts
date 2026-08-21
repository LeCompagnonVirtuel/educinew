import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMedicationScheduleService } from '@/features/smart-campus/services/sc-medication-schedule.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScMedicationScheduleService', () => {
  let service: ScMedicationScheduleService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScMedicationScheduleService(mockSupabase as never); });

  it('should get schedule by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', student_id: 's-1', medication_id: 'med-1', time: '08:00', dosage: '500mg' }, error: null }); const r = await service.getSchedule('school-1', 'ms-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getSchedule('school-1', 'ms-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_medication_schedule table', async () => { await service.getSchedule('school-1', 'ms-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_medication_schedule'); });
  it('should filter by school_id', async () => { await service.getSchedule('school-1', 'ms-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getSchedule('school-1', 'ms-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'ms-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getSchedule('school-1', 'ms-1'); expect(r).toBeNull(); });
  it('should return schedule with dosage', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', dosage: '500mg' }, error: null }); const r = await service.getSchedule('school-1', 'ms-1'); expect(r).toHaveProperty('dosage'); });
  it('should return schedule with time', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', time: '08:00' }, error: null }); const r = await service.getSchedule('school-1', 'ms-1'); expect(r).toHaveProperty('time'); });
  it('should get all schedules', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ms-1' }], error: null }); const r = await service.getAllSchedules('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no schedules', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllSchedules('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by student_id', async () => { await service.getAllSchedules('school-1', { studentId: 's-1' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllSchedules('school-1'); expect(r).toEqual([]); });
  it('should create schedule', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1' }, error: null }); const r = await service.createSchedule('school-1', { student_id: 's-1', medication_id: 'med-1', time: '08:00', dosage: '500mg', frequency: 'daily' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createSchedule('school-1', { student_id: 's-1', medication_id: 'med-1', time: '08:00', dosage: '500mg' }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createSchedule('school-1', { student_id: 's-1' }); expect(r).toBeNull(); });
  it('should accept instructions field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', instructions: 'Take with food' }, error: null }); const r = await service.createSchedule('school-1', { student_id: 's-1', medication_id: 'med-1', time: '08:00', dosage: '500mg', instructions: 'Take with food' }); expect(r).toHaveProperty('instructions'); });
  it('should accept administered_by field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', administered_by: 'nurse-1' }, error: null }); const r = await service.createSchedule('school-1', { student_id: 's-1', medication_id: 'med-1', time: '08:00', dosage: '500mg', administered_by: 'nurse-1' }); expect(r).toHaveProperty('administered_by'); });
  it('should update schedule', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1', dosage: '250mg' }, error: null }); const r = await service.updateSchedule('school-1', 'ms-1', { dosage: '250mg' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateSchedule('school-1', 'ms-1', { dosage: '250mg' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateSchedule('school-1', 'ms-1', { dosage: '250mg' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateSchedule('school-1', 'ms-nonexistent', { dosage: '250mg' }); expect(r).toBeNull(); });
  it('should delete schedule', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ms-1' }, error: null }); const r = await service.deleteSchedule('school-1', 'ms-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteSchedule('school-1', 'ms-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteSchedule('school-1', 'ms-1'); expect(r).toBeNull(); });
  it('should get student medication schedule', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ms-1' }, { id: 'ms-2' }], error: null }); const r = await service.getStudentMedicationSchedule('school-1', 's-1'); expect(r).toBeDefined(); });
  it('should filter by student_id', async () => { await service.getStudentMedicationSchedule('school-1', 's-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('student_id', 's-1'); });
  it('should return empty for no schedule', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getStudentMedicationSchedule('school-1', 's-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle student schedule error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getStudentMedicationSchedule('school-1', 's-1'); expect(r).toEqual([]); });
  it('should get schedule stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 40, active: 35, completed: 5 }, error: null }); const r = await service.getScheduleStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no schedule stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, active: 0, completed: 0 }, error: null }); const r = await service.getScheduleStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getScheduleStats('school-1'); expect(r).toBeNull(); });
});
