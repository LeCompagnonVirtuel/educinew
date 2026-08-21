import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScPortionControlService } from '@/features/smart-campus/services/sc-portion-control.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScPortionControlService', () => {
  let service: ScPortionControlService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScPortionControlService(mockSupabase as never); });

  it('should get portion by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pc-1', meal_type: 'lunch', age_group: '6-10', portion_size: 200 }, error: null }); const r = await service.getPortion('school-1', 'pc-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getPortion('school-1', 'pc-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_portion_control table', async () => { await service.getPortion('school-1', 'pc-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_portion_control'); });
  it('should filter by school_id', async () => { await service.getPortion('school-1', 'pc-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getPortion('school-1', 'pc-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'pc-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getPortion('school-1', 'pc-1'); expect(r).toBeNull(); });
  it('should return portion with portion_size', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pc-1', portion_size: 200 }, error: null }); const r = await service.getPortion('school-1', 'pc-1'); expect(r).toHaveProperty('portion_size'); });
  it('should return portion with age_group', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pc-1', age_group: '6-10' }, error: null }); const r = await service.getPortion('school-1', 'pc-1'); expect(r).toHaveProperty('age_group'); });
  it('should get all portions', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'pc-1' }], error: null }); const r = await service.getAllPortions('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no portions', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllPortions('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by meal_type', async () => { await service.getAllPortions('school-1', { mealType: 'lunch' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllPortions('school-1'); expect(r).toEqual([]); });
  it('should create portion', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pc-1' }, error: null }); const r = await service.createPortion('school-1', { meal_type: 'lunch', age_group: '6-10', portion_size: 200, unit: 'grams' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createPortion('school-1', { meal_type: 'lunch', age_group: '6-10', portion_size: 200 }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createPortion('school-1', { meal_type: 'lunch' }); expect(r).toBeNull(); });
  it('should accept calories field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pc-1', calories: 500 }, error: null }); const r = await service.createPortion('school-1', { meal_type: 'lunch', age_group: '6-10', portion_size: 200, calories: 500 }); expect(r).toHaveProperty('calories'); });
  it('should accept protein_grams field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pc-1', protein_grams: 20 }, error: null }); const r = await service.createPortion('school-1', { meal_type: 'lunch', age_group: '6-10', portion_size: 200, protein_grams: 20 }); expect(r).toHaveProperty('protein_grams'); });
  it('should update portion', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pc-1', portion_size: 250 }, error: null }); const r = await service.updatePortion('school-1', 'pc-1', { portion_size: 250 }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updatePortion('school-1', 'pc-1', { portion_size: 250 }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updatePortion('school-1', 'pc-1', { portion_size: 250 }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updatePortion('school-1', 'pc-nonexistent', { portion_size: 250 }); expect(r).toBeNull(); });
  it('should delete portion', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'pc-1' }, error: null }); const r = await service.deletePortion('school-1', 'pc-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deletePortion('school-1', 'pc-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deletePortion('school-1', 'pc-1'); expect(r).toBeNull(); });
  it('should get meal type portions', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'pc-1' }], error: null }); const r = await service.getMealTypePortions('school-1', 'lunch'); expect(r).toBeDefined(); });
  it('should filter by meal_type', async () => { await service.getMealTypePortions('school-1', 'lunch'); expect(mockSupabase.eq).toHaveBeenCalledWith('meal_type', 'lunch'); });
  it('should return empty for no portions', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getMealTypePortions('school-1', 'lunch'); expect(Array.isArray(r)).toBe(true); });
  it('should handle meal type error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getMealTypePortions('school-1', 'lunch'); expect(r).toEqual([]); });
  it('should get portion stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 30, avg_portion: 200, avg_calories: 500 }, error: null }); const r = await service.getPortionStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no portion stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, avg_portion: 0, avg_calories: 0 }, error: null }); const r = await service.getPortionStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getPortionStats('school-1'); expect(r).toBeNull(); });
});
