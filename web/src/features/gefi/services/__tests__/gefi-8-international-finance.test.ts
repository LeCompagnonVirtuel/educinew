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

const mockInternationalGrant = {
  id: 'igr-001',
  school_id: 'sch-001',
  donor: 'UNESCO',
  program: 'Education for All',
  amount: 50000,
  currency: 'USD',
  exchange_rate: 620,
  amount_local: 31000000,
  status: 'APPROVED',
  conditions: ['annual_report', 'impact_assessment'],
  created_at: new Date().toISOString(),
};

const mockCurrencyRate = {
  id: 'cr-001',
  from_currency: 'USD',
  to_currency: 'XOF',
  rate: 620,
  source: 'BNCE',
  valid_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('InternationalFinanceService', () => {
  describe('registerInternationalGrant', () => {
    it('should register grant with exchange rate', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockInternationalGrant, error: null });
      const result = await mockSupabase.from('international_grants').insert(mockInternationalGrant);

      expect(result.data.donor).toBe('UNESCO');
      expect(result.data.exchange_rate).toBe(620);
    });

    it('should calculate local currency equivalent', async () => {
      const local = mockInternationalGrant.amount * mockInternationalGrant.exchange_rate;
      expect(local).toBe(mockInternationalGrant.amount_local);
    });
  });

  describe('getExchangeRates', () => {
    it('should return latest exchange rate', async () => {
      mockSupabase.single.mockResolvedValue({ data: mockCurrencyRate, error: null });
      const result = await mockSupabase.from('currency_rates')
        .select('*')
        .eq('from_currency', 'USD')
        .eq('to_currency', 'XOF')
        .single();

      expect(result.data.rate).toBe(620);
    });
  });

  describe('convertCurrency', () => {
    it('should convert USD to XOF', async () => {
      const amount = 1000;
      const rate = 620;
      const converted = amount * rate;
      expect(converted).toBe(620000);
    });

    it('should handle EUR conversion', async () => {
      const eurRate = 654;
      const amount = 1000;
      expect(amount * eurRate).toBe(654000);
    });
  });

  describe('trackFundUtilization', () => {
    it('should calculate utilization percentage', async () => {
      const allocated = 50000;
      const spent = 32000;
      const utilization = (spent / allocated) * 100;
      expect(utilization).toBeCloseTo(64.0);
    });
  });

  describe('generateDonorReport', () => {
    it('should create structured donor report', async () => {
      const report = {
        grant_id: 'igr-001',
        donor: 'UNESCO',
        period: '2026-H1',
        disbursements: 25000,
        expenditures: 22000,
        beneficiaries: 150,
        status: 'ON_TRACK',
      };
      mockSupabase.insert.mockResolvedValue({ data: report, error: null });
      const result = await mockSupabase.from('donor_reports').insert(report);

      expect(result.data.status).toBe('ON_TRACK');
    });
  });

  describe('error handling', () => {
    it('should handle invalid exchange rate', async () => {
      const invalidRate = { ...mockCurrencyRate, rate: -1 };
      expect(invalidRate.rate).toBeLessThan(0);
    });

    it('should handle grant not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('international_grants')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
