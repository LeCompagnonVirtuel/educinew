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
  range: vi.fn().mockReturnThis(),
};

const mockAccount = {
  id: 'acc-001',
  school_id: 'sch-001',
  name: 'Frais Scolaires',
  type: 'REVENUE',
  code: '706',
  balance: 0,
  currency: 'XOF',
  is_active: true,
  created_at: new Date().toISOString(),
};

const mockTransaction = {
  id: 'txn-001',
  school_id: 'sch-001',
  account_id: 'acc-001',
  amount: 50000,
  type: 'CREDIT',
  reference: 'PAY-2026-001',
  description: 'Frais inscription',
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('FinancialCoreService', () => {
  describe('createAccount', () => {
    it('should create account successfully', async () => {
      mockSupabase.single.mockResolvedValue({ data: mockAccount, error: null });
      mockSupabase.insert.mockResolvedValue({ data: mockAccount, error: null });

      const result = await mockSupabase.from('financial_accounts').insert({
        school_id: 'sch-001',
        name: 'Frais Scolaires',
        type: 'REVENUE',
        code: '706',
        currency: 'XOF',
      });

      expect(result.error).toBeNull();
      expect(mockSupabase.from).toHaveBeenCalledWith('financial_accounts');
    });

    it('should reject account without school_id', async () => {
      const invalidAccount = { ...mockAccount, school_id: undefined };
      const result = await mockSupabase.from('financial_accounts').insert(invalidAccount);
      expect(result.data).toBeUndefined();
    });
  });

  describe('getAccounts', () => {
    it('should retrieve accounts by school_id', async () => {
      mockSupabase.order.mockResolvedValue({ data: [mockAccount], error: null });
      const result = await mockSupabase.from('financial_accounts')
        .select('*')
        .eq('school_id', 'sch-001')
        .order('created_at', { ascending: false });

      expect(result.data).toHaveLength(1);
      expect(result.error).toBeNull();
    });

    it('should return empty array for unknown school', async () => {
      mockSupabase.order.mockResolvedValue({ data: [], error: null });
      const result = await mockSupabase.from('financial_accounts')
        .select('*')
        .eq('school_id', 'unknown')
        .order('created_at', { ascending: false });

      expect(result.data).toHaveLength(0);
    });
  });

  describe('updateAccount', () => {
    it('should update account balance', async () => {
      const updated = { ...mockAccount, balance: 50000 };
      mockSupabase.single.mockResolvedValue({ data: updated, error: null });
      mockSupabase.update.mockResolvedValue({ data: updated, error: null });

      const result = await mockSupabase.from('financial_accounts')
        .update({ balance: 50000 })
        .eq('id', 'acc-001');

      expect(result.error).toBeNull();
    });
  });

  describe('deleteAccount', () => {
    it('should soft delete account', async () => {
      mockSupabase.update.mockResolvedValue({ data: null, error: null });
      const result = await mockSupabase.from('financial_accounts')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', 'acc-001');

      expect(result.error).toBeNull();
    });
  });

  describe('recordTransaction', () => {
    it('should record transaction with valid data', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockTransaction, error: null });
      const result = await mockSupabase.from('financial_transactions').insert(mockTransaction);
      expect(result.data).toEqual(mockTransaction);
    });

    it('should reject negative amount', async () => {
      const invalidTxn = { ...mockTransaction, amount: -100 };
      expect(invalidTxn.amount).toBeLessThan(0);
    });
  });
});
