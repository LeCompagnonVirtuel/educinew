import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScDietaryRestrictionService } from '@/features/smart-campus/services/sc-dietary-restriction.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScDietaryRestrictionService', () => {
  let service: ScDietaryRestrictionService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScDietaryRestrictionService(mockSupabase as never); });

  it('should get restriction by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'dr-1', student_id: 's-1', restriction_type: 'vegetarian' }, error: null }); const r = await service.getRestriction('school-1', 'dr-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getRestriction('school-1', 'dr-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_dietary_restrictions table', async () => { await service.getRestriction('school-1', 'dr-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_dietary_restrictions'); });
  it('should filter by school_id', async () => { await service.getRestriction('school-1', 'dr-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getRestriction('school-1', 'dr-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'dr-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getRestriction('school-1', 'dr-1'); expect(r).toBeNull(); });
  it('should return restriction with type', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'dr-1', restriction_type: 'vegetarian' }, error: null }); const r = await service.getRestriction('school-1', 'dr-1'); expect(r).toHaveProperty('restriction_type'); });
  it('should get all restrictions', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'dr-1' }], error: null }); const r = await service.getAllRestrictions('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no restrictions', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllRestrictions('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by student_id', async () => { await service.getAllRestrictions('school-1', { studentId: 's-1' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllRestrictions('school-1'); expect(r).toEqual([]); });
  it('should create restriction', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'dr-1' }, error: null }); const r = await service.createRestriction('school-1', { student_id: 's-1', restriction_type: 'vegetarian', description: 'No meat' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createRestriction('school-1', { student_id: 's-1', restriction_type: 'vegetarian' }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createRestriction('school-1', { student_id: 's-1' }); expect(r).toBeNull(); });
  it('should accept severity field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'dr-1', severity: 'severe' }, error: null }); const r = await service.createRestriction('school-1', { student_id: 's-1', restriction_type: 'gluten', severity: 'severe' }); expect(r).toHaveProperty('severity'); });
  it('should update restriction', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'dr-1', status: 'resolved' }, error: null }); const r = await service.updateRestriction('school-1', 'dr-1', { status: 'resolved' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateRestriction('school-1', 'dr-1', { status: 'resolved' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateRestriction('school-1', 'dr-1', { status: 'resolved' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateRestriction('school-1', 'dr-nonexistent', { status: 'resolved' }); expect(r).toBeNull(); });
  it('should delete restriction', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'dr-1' }, error: null }); const r = await service.deleteRestriction('school-1', 'dr-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteRestriction('school-1', 'dr-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteRestriction('school-1', 'dr-1'); expect(r).toBeNull(); });
  it('should get student restrictions', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'dr-1' }], error: null }); const r = await service.getStudentRestrictions('school-1', 's-1'); expect(r).toBeDefined(); });
  it('should filter by student_id', async () => { await service.getStudentRestrictions('school-1', 's-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('student_id', 's-1'); });
  it('should return empty for no restrictions', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getStudentRestrictions('school-1', 's-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle student restrictions error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getStudentRestrictions('school-1', 's-1'); expect(r).toEqual([]); });
  it('should get restriction stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 100, vegetarian: 40, gluten_free: 30, dairy_free: 30 }, error: null }); const r = await service.getRestrictionStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no restriction stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, vegetarian: 0 }, error: null }); const r = await service.getRestrictionStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getRestrictionStats('school-1'); expect(r).toBeNull(); });
});
