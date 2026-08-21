import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScNutritionPlanService } from '@/features/smart-campus/services/sc-nutrition-plan.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScNutritionPlanService', () => {
  let service: ScNutritionPlanService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScNutritionPlanService(mockSupabase as never); });

  it('should get plan by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'np-1', student_id: 's-1', plan_type: 'diabetic', start_date: '2026-01-01' }, error: null }); const r = await service.getPlan('school-1', 'np-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getPlan('school-1', 'np-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_nutrition_plan table', async () => { await service.getPlan('school-1', 'np-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_nutrition_plan'); });
  it('should filter by school_id', async () => { await service.getPlan('school-1', 'np-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getPlan('school-1', 'np-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'np-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getPlan('school-1', 'np-1'); expect(r).toBeNull(); });
  it('should return plan with plan_type', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'np-1', plan_type: 'diabetic' }, error: null }); const r = await service.getPlan('school-1', 'np-1'); expect(r).toHaveProperty('plan_type'); });
  it('should return plan with start_date', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'np-1', start_date: '2026-01-01' }, error: null }); const r = await service.getPlan('school-1', 'np-1'); expect(r).toHaveProperty('start_date'); });
  it('should get all plans', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'np-1' }], error: null }); const r = await service.getAllPlans('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no plans', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllPlans('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by student_id', async () => { await service.getAllPlans('school-1', { studentId: 's-1' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllPlans('school-1'); expect(r).toEqual([]); });
  it('should create plan', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'np-1' }, error: null }); const r = await service.createPlan('school-1', { student_id: 's-1', plan_type: 'diabetic', start_date: '2026-01-01' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createPlan('school-1', { student_id: 's-1', plan_type: 'diabetic' }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createPlan('school-1', { student_id: 's-1' }); expect(r).toBeNull(); });
  it('should accept end_date field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'np-1', end_date: '2026-06-01' }, error: null }); const r = await service.createPlan('school-1', { student_id: 's-1', plan_type: 'diabetic', end_date: '2026-06-01' }); expect(r).toHaveProperty('end_date'); });
  it('should accept approved_by field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'np-1', approved_by: 'doc-1' }, error: null }); const r = await service.createPlan('school-1', { student_id: 's-1', plan_type: 'diabetic', approved_by: 'doc-1' }); expect(r).toHaveProperty('approved_by'); });
  it('should update plan', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'np-1', status: 'active' }, error: null }); const r = await service.updatePlan('school-1', 'np-1', { status: 'active' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updatePlan('school-1', 'np-1', { status: 'active' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updatePlan('school-1', 'np-1', { status: 'active' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updatePlan('school-1', 'np-nonexistent', { status: 'active' }); expect(r).toBeNull(); });
  it('should delete plan', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'np-1' }, error: null }); const r = await service.deletePlan('school-1', 'np-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deletePlan('school-1', 'np-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deletePlan('school-1', 'np-1'); expect(r).toBeNull(); });
  it('should get student plans', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'np-1' }], error: null }); const r = await service.getStudentPlans('school-1', 's-1'); expect(r).toBeDefined(); });
  it('should filter by student_id', async () => { await service.getStudentPlans('school-1', 's-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('student_id', 's-1'); });
  it('should return empty for no plans', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getStudentPlans('school-1', 's-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle student plans error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getStudentPlans('school-1', 's-1'); expect(r).toEqual([]); });
  it('should get plan stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 25, active: 15, completed: 10 }, error: null }); const r = await service.getPlanStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no plan stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, active: 0, completed: 0 }, error: null }); const r = await service.getPlanStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getPlanStats('school-1'); expect(r).toBeNull(); });
});
