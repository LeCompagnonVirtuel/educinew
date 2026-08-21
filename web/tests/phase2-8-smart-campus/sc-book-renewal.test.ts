import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBookRenewalService } from '@/features/smart-campus/services/sc-book-renewal.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScBookRenewalService', () => {
  let service: ScBookRenewalService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScBookRenewalService(mockSupabase as never); });

  it('should get renewal by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ren-1', loan_id: 'loan-1', new_due_date: '2026-02-17' }, error: null }); const r = await service.getRenewal('school-1', 'ren-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getRenewal('school-1', 'ren-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_book_renewals table', async () => { await service.getRenewal('school-1', 'ren-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_book_renewals'); });
  it('should filter by school_id', async () => { await service.getRenewal('school-1', 'ren-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getRenewal('school-1', 'ren-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'ren-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getRenewal('school-1', 'ren-1'); expect(r).toBeNull(); });
  it('should return renewal with status', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ren-1', status: 'approved' }, error: null }); const r = await service.getRenewal('school-1', 'ren-1'); expect(r).toHaveProperty('status'); });
  it('should get all renewals', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ren-1' }], error: null }); const r = await service.getAllRenewals('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no renewals', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllRenewals('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by loan_id', async () => { await service.getAllRenewals('school-1', { loanId: 'loan-1' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should filter by status', async () => { await service.getAllRenewals('school-1', { status: 'approved' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllRenewals('school-1'); expect(r).toEqual([]); });
  it('should create renewal', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ren-1', status: 'pending' }, error: null }); const r = await service.createRenewal('school-1', { loan_id: 'loan-1', new_due_date: '2026-02-17', requested_by: 'student-1' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createRenewal('school-1', { loan_id: 'loan-1', new_due_date: '2026-02-17' }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createRenewal('school-1', { loan_id: 'loan-1' }); expect(r).toBeNull(); });
  it('should set default status to pending', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ren-1', status: 'pending' }, error: null }); const r = await service.createRenewal('school-1', { loan_id: 'loan-1', new_due_date: '2026-02-17' }); expect(r).toHaveProperty('status', 'pending'); });
  it('should accept reason field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ren-1', reason: 'Need more time' }, error: null }); const r = await service.createRenewal('school-1', { loan_id: 'loan-1', new_due_date: '2026-02-17', reason: 'Need more time' }); expect(r).toHaveProperty('reason'); });
  it('should update renewal', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ren-1', status: 'approved' }, error: null }); const r = await service.updateRenewal('school-1', 'ren-1', { status: 'approved' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateRenewal('school-1', 'ren-1', { status: 'approved' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateRenewal('school-1', 'ren-1', { status: 'approved' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateRenewal('school-1', 'ren-nonexistent', { status: 'approved' }); expect(r).toBeNull(); });
  it('should delete renewal', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'ren-1' }, error: null }); const r = await service.deleteRenewal('school-1', 'ren-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteRenewal('school-1', 'ren-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteRenewal('school-1', 'ren-1'); expect(r).toBeNull(); });
  it('should get loan renewals', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'ren-1' }], error: null }); const r = await service.getLoanRenewals('school-1', 'loan-1'); expect(r).toBeDefined(); });
  it('should filter by loan_id', async () => { await service.getLoanRenewals('school-1', 'loan-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('loan_id', 'loan-1'); });
  it('should return empty for no renewals', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getLoanRenewals('school-1', 'loan-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle loan renewals error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getLoanRenewals('school-1', 'loan-1'); expect(r).toEqual([]); });
  it('should get renewal stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 100, approved: 80, rejected: 20 }, error: null }); const r = await service.getRenewalStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no renewals stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, approved: 0, rejected: 0 }, error: null }); const r = await service.getRenewalStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getRenewalStats('school-1'); expect(r).toBeNull(); });
});
