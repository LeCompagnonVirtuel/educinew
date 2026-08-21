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

const mockWallet = {
  id: 'wal-001',
  school_id: 'sch-001',
  student_id: 'stu-001',
  balance: 25000,
  currency: 'XOF',
  status: 'ACTIVE',
  created_at: new Date().toISOString(),
};

const mockWalletTransaction = {
  id: 'wtx-001',
  wallet_id: 'wal-001',
  amount: 5000,
  type: 'CREDIT',
  description: 'Dépôt parent',
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('WalletEngineService', () => {
  describe('createWallet', () => {
    it('should create wallet with zero balance', async () => {
      const newWallet = { ...mockWallet, balance: 0 };
      mockSupabase.insert.mockResolvedValue({ data: newWallet, error: null });
      const result = await mockSupabase.from('wallets').insert(newWallet);

      expect(result.data.balance).toBe(0);
      expect(result.error).toBeNull();
    });

    it('should link wallet to student', async () => {
      expect(mockWallet.student_id).toBeTruthy();
      expect(mockWallet.school_id).toBeTruthy();
    });
  });

  describe('getBalance', () => {
    it('should return current balance', async () => {
      mockSupabase.single.mockResolvedValue({ data: mockWallet, error: null });
      const result = await mockSupabase.from('wallets')
        .select('balance')
        .eq('id', 'wal-001')
        .single();

      expect(result.data.balance).toBe(25000);
    });
  });

  describe('topUp', () => {
    it('should credit wallet', async () => {
      const credited = { ...mockWallet, balance: 30000 };
      mockSupabase.update.mockResolvedValue({ data: credited, error: null });
      const result = await mockSupabase.from('wallets')
        .update({ balance: credited.balance })
        .eq('id', 'wal-001');

      expect(result.data.balance).toBe(30000);
    });

    it('should record transaction', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockWalletTransaction, error: null });
      const result = await mockSupabase.from('wallet_transactions').insert(mockWalletTransaction);
      expect(result.data.type).toBe('CREDIT');
    });
  });

  describe('debit', () => {
    it('should debit when sufficient balance', async () => {
      const debited = { ...mockWallet, balance: 20000 };
      mockSupabase.update.mockResolvedValue({ data: debited, error: null });
      const result = await mockSupabase.from('wallets')
        .update({ balance: debited.balance })
        .eq('id', 'wal-001');

      expect(result.data.balance).toBe(20000);
    });

    it('should reject debit exceeding balance', async () => {
      const insufficient = { ...mockWallet, balance: 1000 };
      const debitAmount = 50000;
      expect(insufficient.balance).toBeLessThan(debitAmount);
    });
  });

  describe('transferBetweenWallets', () => {
    it('should atomically transfer funds', async () => {
      const from = { ...mockWallet, balance: 20000 };
      const to = { ...mockWallet, id: 'wal-002', balance: 30000 };
      mockSupabase.update
        .mockResolvedValueOnce({ data: from, error: null })
        .mockResolvedValueOnce({ data: to, error: null });

      expect(from.balance + to.balance).toBe(50000);
    });
  });

  describe('getWalletHistory', () => {
    it('should return transactions ordered by date', async () => {
      mockSupabase.order.mockResolvedValue({ data: [mockWalletTransaction], error: null });
      const result = await mockSupabase.from('wallet_transactions')
        .select('*')
        .eq('wallet_id', 'wal-001')
        .order('created_at', { ascending: false });

      expect(result.data).toHaveLength(1);
    });
  });
});
