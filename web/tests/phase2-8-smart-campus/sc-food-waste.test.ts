import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScFoodWasteService } from '@/features/smart-campus/services/sc-food-waste.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScFoodWasteService', () => {
  let service: ScFoodWasteService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScFoodWasteService(mockSupabase as never); });

  it('should get waste record by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fw-1', date: '2026-01-20', waste_kg: 5.2, waste_type: 'plate_waste' }, error: null }); const r = await service.getWasteRecord('school-1', 'fw-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getWasteRecord('school-1', 'fw-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_food_waste table', async () => { await service.getWasteRecord('school-1', 'fw-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_food_waste'); });
  it('should filter by school_id', async () => { await service.getWasteRecord('school-1', 'fw-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getWasteRecord('school-1', 'fw-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'fw-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getWasteRecord('school-1', 'fw-1'); expect(r).toBeNull(); });
  it('should return record with waste_kg', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fw-1', waste_kg: 5.2 }, error: null }); const r = await service.getWasteRecord('school-1', 'fw-1'); expect(r).toHaveProperty('waste_kg'); });
  it('should return record with waste_type', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fw-1', waste_type: 'plate_waste' }, error: null }); const r = await service.getWasteRecord('school-1', 'fw-1'); expect(r).toHaveProperty('waste_type'); });
  it('should get all waste records', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'fw-1' }], error: null }); const r = await service.getAllWasteRecords('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no records', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllWasteRecords('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by date', async () => { await service.getAllWasteRecords('school-1', { date: '2026-01-20' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllWasteRecords('school-1'); expect(r).toEqual([]); });
  it('should create waste record', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fw-1' }, error: null }); const r = await service.createWasteRecord('school-1', { date: '2026-01-20', waste_kg: 5.2, waste_type: 'plate_waste' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createWasteRecord('school-1', { date: '2026-01-20', waste_kg: 5.2 }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createWasteRecord('school-1', { date: '2026-01-20' }); expect(r).toBeNull(); });
  it('should accept meal_id field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fw-1', meal_id: 'meal-1' }, error: null }); const r = await service.createWasteRecord('school-1', { date: '2026-01-20', waste_kg: 5.2, meal_id: 'meal-1' }); expect(r).toHaveProperty('meal_id'); });
  it('should accept reason field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fw-1', reason: 'Overcooked' }, error: null }); const r = await service.createWasteRecord('school-1', { date: '2026-01-20', waste_kg: 5.2, reason: 'Overcooked' }); expect(r).toHaveProperty('reason'); });
  it('should update waste record', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fw-1', waste_kg: 7.0 }, error: null }); const r = await service.updateWasteRecord('school-1', 'fw-1', { waste_kg: 7.0 }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateWasteRecord('school-1', 'fw-1', { waste_kg: 7.0 }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateWasteRecord('school-1', 'fw-1', { waste_kg: 7.0 }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateWasteRecord('school-1', 'fw-nonexistent', { waste_kg: 7.0 }); expect(r).toBeNull(); });
  it('should delete waste record', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fw-1' }, error: null }); const r = await service.deleteWasteRecord('school-1', 'fw-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteWasteRecord('school-1', 'fw-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteWasteRecord('school-1', 'fw-1'); expect(r).toBeNull(); });
  it('should get waste by date range', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'fw-1' }], error: null }); const r = await service.getWasteByDateRange('school-1', '2026-01-01', '2026-01-31'); expect(r).toBeDefined(); });
  it('should return empty for no waste in range', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getWasteByDateRange('school-1', '2026-01-01', '2026-01-31'); expect(Array.isArray(r)).toBe(true); });
  it('should handle date range error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getWasteByDateRange('school-1', '2026-01-01', '2026-01-31'); expect(r).toEqual([]); });
  it('should get waste stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total_kg: 100, avg_daily: 3.3, trend: 'decreasing' }, error: null }); const r = await service.getWasteStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no waste stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total_kg: 0, avg_daily: 0, trend: 'stable' }, error: null }); const r = await service.getWasteStats('school-1'); expect(r).toHaveProperty('total_kg', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getWasteStats('school-1'); expect(r).toBeNull(); });
});
