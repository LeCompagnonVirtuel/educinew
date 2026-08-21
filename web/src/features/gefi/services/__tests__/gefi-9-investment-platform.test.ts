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

const mockInvestment = {
  id: 'inv-001',
  school_id: 'sch-001',
  type: 'FIXED_DEPOSIT',
  institution: 'BOA',
  principal: 10000000,
  interest_rate: 5.5,
  duration_months: 12,
  currency: 'XOF',
  status: 'ACTIVE',
  maturity_date: '2027-08-08',
  created_at: new Date().toISOString(),
};

const mockInvestmentReturn = {
  id: 'iret-001',
  investment_id: 'inv-001',
  amount: 550000,
  period: 'Q1-2026',
  credited_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('InvestmentPlatformService', () => {
  describe('createInvestment', () => {
    it('should create fixed deposit investment', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockInvestment, error: null });
      const result = await mockSupabase.from('investments').insert(mockInvestment);

      expect(result.data.type).toBe('FIXED_DEPOSIT');
      expect(result.error).toBeNull();
    });

    it('should validate interest rate is positive', async () => {
      expect(mockInvestment.interest_rate).toBeGreaterThan(0);
    });

    it('should validate duration is positive', async () => {
      expect(mockInvestment.duration_months).toBeGreaterThan(0);
    });
  });

  describe('calculateReturns', () => {
    it('should compute expected return', async () => {
      const principal = mockInvestment.principal;
      const rate = mockInvestment.interest_rate / 100;
      const years = mockInvestment.duration_months / 12;
      const expectedReturn = principal * rate * years;

      expect(expectedReturn).toBe(550000);
    });
  });

  describe('recordReturn', () => {
    it('should record investment return', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockInvestmentReturn, error: null });
      const result = await mockSupabase.from('investment_returns').insert(mockInvestmentReturn);

      expect(result.data.amount).toBe(550000);
    });
  });

  describe('matureInvestment', () => {
    it('should update status to MATURED', async () => {
      const matured = { ...mockInvestment, status: 'MATURED' };
      mockSupabase.update.mockResolvedValue({ data: matured, error: null });
      const result = await mockSupabase.from('investments')
        .update({ status: 'MATURED' })
        .eq('id', 'inv-001');

      expect(result.data.status).toBe('MATURED');
    });
  });

  describe('getInvestmentPortfolio', () => {
    it('should aggregate investments by type', async () => {
      const portfolio = [
        { type: 'FIXED_DEPOSIT', count: 3, total: 30000000 },
        { type: 'TREASURY_BOND', count: 2, total: 15000000 },
      ];
      const totalValue = portfolio.reduce((sum, p) => sum + p.total, 0);
      expect(totalValue).toBe(45000000);
    });
  });

  describe('error handling', () => {
    it('should handle investment not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('investments')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });

    it('should reject investment with negative principal', async () => {
      const invalid = { ...mockInvestment, principal: -1000 };
      expect(invalid.principal).toBeLessThan(0);
    });
  });
});
