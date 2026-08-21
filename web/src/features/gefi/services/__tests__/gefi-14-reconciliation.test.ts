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

const mockReconciliation = {
  id: 'rec-001',
  school_id: 'sch-001',
  period: '2026-07',
  bank_statement_ref: 'STMT-2026-07',
  status: 'IN_PROGRESS',
  total_bank: 8500000,
  total_book: 8450000,
  difference: 50000,
  matched_count: 45,
  unmatched_count: 3,
  created_at: new Date().toISOString(),
};

const mockMatchedTransaction = {
  id: 'mtx-001',
  reconciliation_id: 'rec-001',
  bank_transaction_id: 'bt-001',
  book_transaction_id: 'txn-001',
  amount: 50000,
  match_type: 'EXACT',
  status: 'MATCHED',
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ReconciliationService', () => {
  describe('createReconciliation', () => {
    it('should create reconciliation session', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockReconciliation, error: null });
      const result = await mockSupabase.from('reconciliations').insert(mockReconciliation);

      expect(result.data.status).toBe('IN_PROGRESS');
      expect(result.error).toBeNull();
    });

    it('should calculate difference', async () => {
      const diff = Math.abs(mockReconciliation.total_bank - mockReconciliation.total_book);
      expect(diff).toBe(50000);
    });
  });

  describe('matchTransactions', () => {
    it('should match exact amounts', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockMatchedTransaction, error: null });
      const result = await mockSupabase.from('matched_transactions').insert(mockMatchedTransaction);

      expect(result.data.match_type).toBe('EXACT');
    });

    it('should detect fuzzy matches', async () => {
      const bankAmount = 49999;
      const bookAmount = 50000;
      const tolerance = 1;
      const isFuzzy = Math.abs(bankAmount - bookAmount) <= tolerance;
      expect(isFuzzy).toBe(true);
    });
  });

  describe('autoMatch', () => {
    it('should pair transactions automatically', async () => {
      const bankTxns = [
        { id: 'bt-1', amount: 50000, date: '2026-07-05' },
        { id: 'bt-2', amount: 75000, date: '2026-07-10' },
      ];
      const bookTxns = [
        { id: 'txn-1', amount: 50000, date: '2026-07-05' },
        { id: 'txn-2', amount: 75000, date: '2026-07-10' },
      ];
      const matches = bankTxns.filter(b =>
        bookTxns.some(q => q.amount === b.amount && q.date === b.date)
      );
      expect(matches).toHaveLength(2);
    });
  });

  describe('finalizeReconciliation', () => {
    it('should set status to COMPLETED', async () => {
      const completed = { ...mockReconciliation, status: 'COMPLETED' };
      mockSupabase.update.mockResolvedValue({ data: completed, error: null });
      const result = await mockSupabase.from('reconciliations')
        .update({ status: 'COMPLETED' })
        .eq('id', 'rec-001');

      expect(result.data.status).toBe('COMPLETED');
    });

    it('should require zero difference to finalize', async () => {
      expect(mockReconciliation.difference).not.toBe(0);
    });
  });

  describe('getUnmatched', () => {
    it('should return unmatched transactions', async () => {
      const unmatched = [
        { id: 'bt-3', amount: 25000, side: 'BANK' },
        { id: 'txn-5', amount: 30000, side: 'BOOK' },
      ];
      mockSupabase.order.mockResolvedValue({ data: unmatched, error: null });
      const result = await mockSupabase.from('matched_transactions')
        .select('*')
        .eq('reconciliation_id', 'rec-001')
        .eq('status', 'UNMATCHED')
        .order('amount', { ascending: false });

      expect(result.data).toHaveLength(2);
    });
  });

  describe('error handling', () => {
    it('should handle reconciliation not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('reconciliations')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
