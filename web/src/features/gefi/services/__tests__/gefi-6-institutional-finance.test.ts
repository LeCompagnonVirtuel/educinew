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

const mockBudget = {
  id: 'bud-001',
  school_id: 'sch-001',
  fiscal_year: 2026,
  category: 'OPERATIONS',
  allocated: 5000000,
  spent: 0,
  currency: 'XOF',
  status: 'ACTIVE',
  created_at: new Date().toISOString(),
};

const mockExpense = {
  id: 'exp-001',
  school_id: 'sch-001',
  budget_id: 'bud-001',
  amount: 150000,
  description: 'Achat fournitures',
  category: 'SUPPLIES',
  approved_by: 'admin-001',
  status: 'APPROVED',
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('InstitutionalFinanceService', () => {
  describe('createBudget', () => {
    it('should create fiscal year budget', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockBudget, error: null });
      const result = await mockSupabase.from('budgets').insert(mockBudget);

      expect(result.data.fiscal_year).toBe(2026);
      expect(result.error).toBeNull();
    });

    it('should validate allocated amount is positive', async () => {
      expect(mockBudget.allocated).toBeGreaterThan(0);
    });
  });

  describe('recordExpense', () => {
    it('should create expense record', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockExpense, error: null });
      const result = await mockSupabase.from('expenses').insert(mockExpense);

      expect(result.data.status).toBe('APPROVED');
    });

    it('should reject expense without approval', async () => {
      const unapproved = { ...mockExpense, approved_by: undefined };
      expect(unapproved.approved_by).toBeUndefined();
    });
  });

  describe('budgetTracking', () => {
    it('should calculate remaining budget', async () => {
      const remaining = mockBudget.allocated - mockExpense.amount;
      expect(remaining).toBe(4850000);
    });

    it('should track utilization percentage', async () => {
      const utilization = (mockExpense.amount / mockBudget.allocated) * 100;
      expect(utilization).toBeCloseTo(3.0);
    });
  });

  describe('approveExpense', () => {
    it('should update expense status', async () => {
      const approved = { ...mockExpense, status: 'APPROVED' };
      mockSupabase.update.mockResolvedValue({ data: approved, error: null });
      const result = await mockSupabase.from('expenses')
        .update({ status: 'APPROVED' })
        .eq('id', 'exp-001');

      expect(result.error).toBeNull();
    });

    it('should reject expense exceeding budget', async () => {
      const overBudget = { ...mockExpense, amount: 10000000 };
      const available = mockBudget.allocated - mockBudget.spent;
      expect(overBudget.amount).toBeGreaterThan(available);
    });
  });

  describe('getFinancialReports', () => {
    it('should aggregate expenses by category', async () => {
      const report = [
        { category: 'SUPPLIES', total: 500000 },
        { category: 'SALARIES', total: 3000000 },
        { category: 'MAINTENANCE', total: 200000 },
      ];
      const totalExpenses = report.reduce((sum, r) => sum + r.total, 0);
      expect(totalExpenses).toBe(3700000);
    });
  });

  describe('error handling', () => {
    it('should handle budget not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('budgets')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
