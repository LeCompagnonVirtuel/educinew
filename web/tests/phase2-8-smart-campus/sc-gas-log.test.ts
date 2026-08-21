import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScGasLogService } from '@/features/smart-campus/services/sc-gas-log.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScGasLogService', () => {
  let service: ScGasLogService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScGasLogService(mockSupabase as never); });

  it('should get gas log by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'gl-1', vehicle_id: 'v-1', liters: 50, cost: 25000 }, error: null }); const r = await service.getGasLog('school-1', 'gl-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getGasLog('school-1', 'gl-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_gas_logs table', async () => { await service.getGasLog('school-1', 'gl-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_gas_logs'); });
  it('should filter by school_id', async () => { await service.getGasLog('school-1', 'gl-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getGasLog('school-1', 'gl-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'gl-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getGasLog('school-1', 'gl-1'); expect(r).toBeNull(); });
  it('should return log with liters', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'gl-1', liters: 50 }, error: null }); const r = await service.getGasLog('school-1', 'gl-1'); expect(r).toHaveProperty('liters'); });
  it('should return log with cost', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'gl-1', cost: 25000 }, error: null }); const r = await service.getGasLog('school-1', 'gl-1'); expect(r).toHaveProperty('cost'); });
  it('should get all logs', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'gl-1' }], error: null }); const r = await service.getAllGasLogs('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no logs', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllGasLogs('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by vehicle_id', async () => { await service.getAllGasLogs('school-1', { vehicleId: 'v-1' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllGasLogs('school-1'); expect(r).toEqual([]); });
  it('should create gas log', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'gl-1' }, error: null }); const r = await service.createGasLog('school-1', { vehicle_id: 'v-1', liters: 50, cost: 25000, fuel_type: 'diesel' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createGasLog('school-1', { vehicle_id: 'v-1', liters: 50, cost: 25000 }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createGasLog('school-1', { vehicle_id: 'v-1', liters: 50 }); expect(r).toBeNull(); });
  it('should accept odometer_reading field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'gl-1', odometer_reading: 50000 }, error: null }); const r = await service.createGasLog('school-1', { vehicle_id: 'v-1', liters: 50, odometer_reading: 50000 }); expect(r).toHaveProperty('odometer_reading'); });
  it('should accept gas_station field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'gl-1', gas_station: 'Total' }, error: null }); const r = await service.createGasLog('school-1', { vehicle_id: 'v-1', liters: 50, gas_station: 'Total' }); expect(r).toHaveProperty('gas_station'); });
  it('should accept notes field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'gl-1', notes: 'Full tank' }, error: null }); const r = await service.createGasLog('school-1', { vehicle_id: 'v-1', liters: 50, notes: 'Full tank' }); expect(r).toHaveProperty('notes'); });
  it('should update gas log', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'gl-1', cost: 30000 }, error: null }); const r = await service.updateGasLog('school-1', 'gl-1', { cost: 30000 }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateGasLog('school-1', 'gl-1', { cost: 30000 }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateGasLog('school-1', 'gl-1', { cost: 30000 }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateGasLog('school-1', 'gl-nonexistent', { cost: 30000 }); expect(r).toBeNull(); });
  it('should delete gas log', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'gl-1' }, error: null }); const r = await service.deleteGasLog('school-1', 'gl-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteGasLog('school-1', 'gl-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteGasLog('school-1', 'gl-1'); expect(r).toBeNull(); });
  it('should get vehicle logs', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'gl-1' }], error: null }); const r = await service.getVehicleGasLogs('school-1', 'v-1'); expect(r).toBeDefined(); });
  it('should filter by vehicle_id', async () => { await service.getVehicleGasLogs('school-1', 'v-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('vehicle_id', 'v-1'); });
  it('should return empty for no vehicle logs', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getVehicleGasLogs('school-1', 'v-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle vehicle logs error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getVehicleGasLogs('school-1', 'v-1'); expect(r).toEqual([]); });
  it('should get fuel stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total_liters: 5000, total_cost: 2500000, avg_cost_perLiter: 500 }, error: null }); const r = await service.getFuelStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no fuel stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total_liters: 0, total_cost: 0, avg_cost_perLiter: 0 }, error: null }); const r = await service.getFuelStats('school-1'); expect(r).toHaveProperty('total_liters', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getFuelStats('school-1'); expect(r).toBeNull(); });
});
