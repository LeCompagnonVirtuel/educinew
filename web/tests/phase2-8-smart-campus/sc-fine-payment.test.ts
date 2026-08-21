import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScFinePaymentService } from '@/features/smart-campus/services/sc-fine-payment.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScFinePaymentService', () => {
  let service: ScFinePaymentService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScFinePaymentService(mockSupabase as never); });

  it('should get payment by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fp-1', fine_id: 'fine-1', amount: 500, status: 'completed' }, error: null }); const r = await service.getPayment('school-1', 'fp-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getPayment('school-1', 'fp-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_fine_payments table', async () => { await service.getPayment('school-1', 'fp-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_fine_payments'); });
  it('should filter by school_id', async () => { await service.getPayment('school-1', 'fp-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getPayment('school-1', 'fp-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'fp-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getPayment('school-1', 'fp-1'); expect(r).toBeNull(); });
  it('should return payment with amount', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fp-1', amount: 500 }, error: null }); const r = await service.getPayment('school-1', 'fp-1'); expect(r).toHaveProperty('amount'); });
  it('should return payment with payment_method', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fp-1', payment_method: 'cash' }, error: null }); const r = await service.getPayment('school-1', 'fp-1'); expect(r).toHaveProperty('payment_method'); });
  it('should get all payments', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'fp-1' }], error: null }); const r = await service.getAllPayments('school-1'); expect(r).toBeDefined(); });
  it('should return empty when no payments', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllPayments('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by fine_id', async () => { await service.getAllPayments('school-1', { fineId: 'fine-1' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllPayments('school-1'); expect(r).toEqual([]); });
  it('should create payment', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fp-1', status: 'completed' }, error: null }); const r = await service.createPayment('school-1', { fine_id: 'fine-1', amount: 500, payment_method: 'cash' }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createPayment('school-1', { fine_id: 'fine-1', amount: 500 }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createPayment('school-1', { fine_id: 'fine-1', amount: 500 }); expect(r).toBeNull(); });
  it('should set default status to completed', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fp-1', status: 'completed' }, error: null }); const r = await service.createPayment('school-1', { fine_id: 'fine-1', amount: 500 }); expect(r).toHaveProperty('status', 'completed'); });
  it('should accept reference_number field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fp-1', reference_number: 'REF001' }, error: null }); const r = await service.createPayment('school-1', { fine_id: 'fine-1', amount: 500, reference_number: 'REF001' }); expect(r).toHaveProperty('reference_number'); });
  it('should accept notes field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fp-1', notes: 'Paid in cash' }, error: null }); const r = await service.createPayment('school-1', { fine_id: 'fine-1', amount: 500, notes: 'Paid in cash' }); expect(r).toHaveProperty('notes'); });
  it('should update payment', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fp-1', status: 'refunded' }, error: null }); const r = await service.updatePayment('school-1', 'fp-1', { status: 'refunded' }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updatePayment('school-1', 'fp-1', { status: 'refunded' }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updatePayment('school-1', 'fp-1', { status: 'refunded' }); expect(r).toBeNull(); });
  it('should return null for non-existent', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updatePayment('school-1', 'fp-nonexistent', { status: 'refunded' }); expect(r).toBeNull(); });
  it('should delete payment', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'fp-1' }, error: null }); const r = await service.deletePayment('school-1', 'fp-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deletePayment('school-1', 'fp-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deletePayment('school-1', 'fp-1'); expect(r).toBeNull(); });
  it('should get fine payments', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'fp-1' }], error: null }); const r = await service.getFinePayments('school-1', 'fine-1'); expect(r).toBeDefined(); });
  it('should filter by fine_id', async () => { await service.getFinePayments('school-1', 'fine-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('fine_id', 'fine-1'); });
  it('should return empty for no fine payments', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getFinePayments('school-1', 'fine-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle fine payments error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getFinePayments('school-1', 'fine-1'); expect(r).toEqual([]); });
  it('should get payment stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 200, total_amount: 100000, outstanding: 5000 }, error: null }); const r = await service.getPaymentStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no payments stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, total_amount: 0, outstanding: 0 }, error: null }); const r = await service.getPaymentStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getPaymentStats('school-1'); expect(r).toBeNull(); });
});
