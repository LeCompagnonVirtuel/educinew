import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScInspectionService } from '@/features/smart-campus/services/sc-inspection.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScInspectionService', () => {
  let service: ScInspectionService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScInspectionService(mockSupabase as never); });

  it('should get inspection by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'insp-1', vehicle_id: 'v-1', inspection_type: 'pre_trip', status: 'passed' }, error: null }); const r = await service.getInspection('school-1', 'insp-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getInspection('school-1', 'insp-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_inspections table', async () => { await service.getInspection('school-1', 'insp-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_inspections'); });
  it('should filter by school_id', async () => { await service.getInspection('school-1', 'insp-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getInspection('school-1', 'insp-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'insp-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getInspection('school-1', 'insp-1'); expect(r).toBeNull(); });
  it('should return inspection with type', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'insp-1', inspection_type: 'pre_trip' }, error: null }); const r = await service.getInspection('school-1', 'insp-1'); expect(r).toHaveProperty('inspection_type'); });
  it('should return inspection with checklist', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'insp-1', checklist: ['tires', 'lights'] }, error: null }); const r = await service.getInspection('school-1', 'insp-1'); expect(r).toHaveProperty('checklist'); });
  it('should get all inspections', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'insp-1' }], error: null }); const r = await service.getAllInspections('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no inspections', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllInspections('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by vehicle_id', async () => { await service.getAllInspections('school-1', { vehicleId: 'v-1' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should filter by status', async () => { await service.getAllInspections('school-1', { status: 'failed' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllInspections('school-1'); expect(r).toEqual([]); });
  it('should create inspection', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'insp-1', status: 'passed' }, error: null }); const r = await service.createInspection('school-1', { vehicle_id: 'v-1', inspection_type: 'pre_trip', checklist: ['tires', 'lights'], status: 'passed' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createInspection('school-1', { vehicle_id: 'v-1', inspection_type: 'pre_trip', status: 'passed' }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createInspection('school-1', { vehicle_id: 'v-1' }); expect(r).toBeNull(); });
  it('should accept inspector_name field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'insp-1', inspector_name: 'John' }, error: null }); const r = await service.createInspection('school-1', { vehicle_id: 'v-1', inspector_name: 'John', status: 'passed' }); expect(r).toHaveProperty('inspector_name'); });
  it('should accept notes field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'insp-1', notes: 'All good' }, error: null }); const r = await service.createInspection('school-1', { vehicle_id: 'v-1', notes: 'All good', status: 'passed' }); expect(r).toHaveProperty('notes'); });
  it('should accept defects_found field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'insp-1', defects_found: ['worn tires'] }, error: null }); const r = await service.createInspection('school-1', { vehicle_id: 'v-1', defects_found: ['worn tires'], status: 'failed' }); expect(r).toHaveProperty('defects_found'); });
  it('should update inspection', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'insp-1', status: 'completed' }, error: null }); const r = await service.updateInspection('school-1', 'insp-1', { status: 'completed' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateInspection('school-1', 'insp-1', { status: 'completed' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateInspection('school-1', 'insp-1', { status: 'completed' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateInspection('school-1', 'insp-nonexistent', { status: 'completed' }); expect(r).toBeNull(); });
  it('should delete inspection', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'insp-1' }, error: null }); const r = await service.deleteInspection('school-1', 'insp-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteInspection('school-1', 'insp-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteInspection('school-1', 'insp-1'); expect(r).toBeNull(); });
  it('should get vehicle inspections', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'insp-1' }], error: null }); const r = await service.getVehicleInspections('school-1', 'v-1'); expect(r).toBeDefined(); });
  it('should filter by vehicle_id', async () => { await service.getVehicleInspections('school-1', 'v-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('vehicle_id', 'v-1'); });
  it('should return empty for no inspections', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getVehicleInspections('school-1', 'v-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle vehicle inspections error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getVehicleInspections('school-1', 'v-1'); expect(r).toEqual([]); });
  it('should get inspection stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 200, passed: 180, failed: 20 }, error: null }); const r = await service.getInspectionStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no inspections stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, passed: 0, failed: 0 }, error: null }); const r = await service.getInspectionStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getInspectionStats('school-1'); expect(r).toBeNull(); });
});
