import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScAllergenManagementService } from '@/features/smart-campus/services/sc-allergen-management.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScAllergenManagementService', () => {
  let service: ScAllergenManagementService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScAllergenManagementService(mockSupabase as never); });

  it('should get allergen by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'am-1', name: 'Peanuts', severity: 'severe', category: 'nut' }, error: null }); const r = await service.getAllergen('school-1', 'am-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getAllergen('school-1', 'am-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_allergen_management table', async () => { await service.getAllergen('school-1', 'am-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_allergen_management'); });
  it('should filter by school_id', async () => { await service.getAllergen('school-1', 'am-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getAllergen('school-1', 'am-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'am-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getAllergen('school-1', 'am-1'); expect(r).toBeNull(); });
  it('should return allergen with severity', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'am-1', severity: 'severe' }, error: null }); const r = await service.getAllergen('school-1', 'am-1'); expect(r).toHaveProperty('severity'); });
  it('should return allergen with category', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'am-1', category: 'nut' }, error: null }); const r = await service.getAllergen('school-1', 'am-1'); expect(r).toHaveProperty('category'); });
  it('should get all allergens', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'am-1' }], error: null }); const r = await service.getAllAllergens('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no allergens', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllAllergens('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by category', async () => { await service.getAllAllergens('school-1', { category: 'nut' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllAllergens('school-1'); expect(r).toEqual([]); });
  it('should create allergen', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'am-1' }, error: null }); const r = await service.createAllergen('school-1', { name: 'Peanuts', severity: 'severe', category: 'nut' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createAllergen('school-1', { name: 'Peanuts', severity: 'severe' }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createAllergen('school-1', { name: 'Peanuts' }); expect(r).toBeNull(); });
  it('should accept symptoms field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'am-1', symptoms: 'Hives, swelling' }, error: null }); const r = await service.createAllergen('school-1', { name: 'Peanuts', severity: 'severe', symptoms: 'Hives, swelling' }); expect(r).toHaveProperty('symptoms'); });
  it('should accept treatment field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'am-1', treatment: 'Epinephrine' }, error: null }); const r = await service.createAllergen('school-1', { name: 'Peanuts', severity: 'severe', treatment: 'Epinephrine' }); expect(r).toHaveProperty('treatment'); });
  it('should update allergen', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'am-1', severity: 'moderate' }, error: null }); const r = await service.updateAllergen('school-1', 'am-1', { severity: 'moderate' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateAllergen('school-1', 'am-1', { severity: 'moderate' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateAllergen('school-1', 'am-1', { severity: 'moderate' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateAllergen('school-1', 'am-nonexistent', { severity: 'moderate' }); expect(r).toBeNull(); });
  it('should delete allergen', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'am-1' }, error: null }); const r = await service.deleteAllergen('school-1', 'am-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteAllergen('school-1', 'am-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteAllergen('school-1', 'am-1'); expect(r).toBeNull(); });
  it('should get allergen stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 50, severe: 10, moderate: 25, mild: 15 }, error: null }); const r = await service.getAllergenStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no allergen stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, severe: 0, moderate: 0, mild: 0 }, error: null }); const r = await service.getAllergenStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllergenStats('school-1'); expect(r).toBeNull(); });
});
