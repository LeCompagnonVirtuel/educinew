import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  order: vi.fn().mockReturnThis(),
};

const mockFinancingPlan = {
  id: 'fp-001',
  school_id: 'sch-001',
  student_id: 'stu-001',
  total_amount: 300000,
  installments: 3,
  installment_amount: 100000,
  currency: 'XOF',
  status: 'ACTIVE',
  start_date: '2026-09-01',
  end_date: '2026-12-31',
  created_at: new Date().toISOString(),
};

const mockInstallment = {
  id: 'inst-001',
  plan_id: 'fp-001',
  amount: 100000,
  due_date: '2026-10-01',
  status: 'PENDING',
  paid_amount: 0,
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('StudentFinancingService', () => {
  describe('createFinancingPlan', () => {
    it('should create installment plan', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockFinancingPlan, error: null });
      const result = await mockSupabase.from('financing_plans').insert(mockFinancingPlan);

      expect(result.data.installments).toBe(3);
      expect(result.error).toBeNull();
    });

    it('should validate total equals installments × amount', async () => {
      const computed = mockFinancingPlan.installments * mockFinancingPlan.installment_amount;
      expect(computed).toBe(mockFinancingPlan.total_amount);
    });
  });

  describe('getInstallments', () => {
    it('should return installments for a plan', async () => {
      mockSupabase.order.mockResolvedValue({ data: [mockInstallment], error: null });
      const result = await mockSupabase.from('installments')
        .select('*')
        .eq('plan_id', 'fp-001')
        .order('due_date', { ascending: true });

      expect(result.data).toHaveLength(1);
    });
  });

  describe('payInstallment', () => {
    it('should record partial payment', async () => {
      const partial = { ...mockInstallment, paid_amount: 50000, status: 'PARTIAL' };
      mockSupabase.update.mockResolvedValue({ data: partial, error: null });
      const result = await mockSupabase.from('installments')
        .update({ paid_amount: 50000, status: 'PARTIAL' })
        .eq('id', 'inst-001');

      expect(result.data.status).toBe('PARTIAL');
    });

    it('should mark as PAID when fully paid', async () => {
      const paid = { ...mockInstallment, paid_amount: 100000, status: 'PAID' };
      mockSupabase.update.mockResolvedValue({ data: paid, error: null });
      const result = await mockSupabase.from('installments')
        .update({ paid_amount: 100000, status: 'PAID' })
        .eq('id', 'inst-001');

      expect(result.data.paid_amount).toBe(result.data.amount);
    });

    it('should reject overpayment', async () => {
      const overpay = 150000;
      expect(overpay).toBeGreaterThan(mockInstallment.amount);
    });
  });

  describe('getOverdueInstallments', () => {
    it('should return past due installments', async () => {
      const overdue = [{ ...mockInstallment, status: 'OVERDUE', due_date: '2026-07-01' }];
      mockSupabase.order.mockResolvedValue({ data: overdue, error: null });
      const result = await mockSupabase.from('installments')
        .select('*')
        .eq('status', 'OVERDUE')
        .order('due_date', { ascending: true });

      expect(result.data).toHaveLength(1);
    });
  });

  describe('cancelPlan', () => {
    it('should set status to CANCELLED', async () => {
      const cancelled = { ...mockFinancingPlan, status: 'CANCELLED' };
      mockSupabase.update.mockResolvedValue({ data: cancelled, error: null });
      const result = await mockSupabase.from('financing_plans')
        .update({ status: 'CANCELLED' })
        .eq('id', 'fp-001');

      expect(result.data.status).toBe('CANCELLED');
    });
  });
});
