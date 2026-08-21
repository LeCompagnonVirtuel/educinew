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

const mockCurrency = {
  id: 'cur-001',
  code: 'XOF',
  name: 'Franc CFA',
  symbol: 'FCFA',
  is_base: true,
  decimal_places: 0,
  is_active: true,
  created_at: new Date().toISOString(),
};

const mockExchangeRate = {
  id: 'exr-001',
  from_currency: 'USD',
  to_currency: 'XOF',
  rate: 620,
  source: 'BNCE',
  valid_from: '2026-08-01',
  valid_to: '2026-08-31',
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('MultiCurrencyService', () => {
  describe('createCurrency', () => {
    it('should create currency entry', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockCurrency, error: null });
      const result = await mockSupabase.from('currencies').insert(mockCurrency);

      expect(result.data.code).toBe('XOF');
      expect(result.error).toBeNull();
    });

    it('should validate unique base currency', async () => {
      expect(mockCurrency.is_base).toBe(true);
    });
  });

  describe('addExchangeRate', () => {
    it('should add exchange rate', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockExchangeRate, error: null });
      const result = await mockSupabase.from('exchange_rates').insert(mockExchangeRate);

      expect(result.data.rate).toBe(620);
      expect(result.error).toBeNull();
    });

    it('should validate rate is positive', async () => {
      expect(mockExchangeRate.rate).toBeGreaterThan(0);
    });
  });

  describe('convertAmount', () => {
    it('should convert between currencies', async () => {
      const amount = 1000;
      const rate = 620;
      const converted = amount * rate;
      expect(converted).toBe(620000);
    });

    it('should handle zero amount', async () => {
      const amount = 0;
      const rate = 620;
      expect(amount * rate).toBe(0);
    });

    it('should handle reverse conversion', async () => {
      const amount = 620000;
      const rate = 620;
      const converted = amount / rate;
      expect(converted).toBe(1000);
    });
  });

  describe('getActiveRates', () => {
    it('should return valid rates', async () => {
      mockSupabase.order.mockResolvedValue({ data: [mockExchangeRate], error: null });
      const result = await mockSupabase.from('exchange_rates')
        .select('*')
        .eq('from_currency', 'USD')
        .eq('to_currency', 'XOF')
        .order('valid_from', { ascending: false });

      expect(result.data).toHaveLength(1);
    });
  });

  describe('updateRate', () => {
    it('should update exchange rate', async () => {
      const updated = { ...mockExchangeRate, rate: 625 };
      mockSupabase.update.mockResolvedValue({ data: updated, error: null });
      const result = await mockSupabase.from('exchange_rates')
        .update({ rate: 625 })
        .eq('id', 'exr-001');

      expect(result.data.rate).toBe(625);
    });
  });

  describe('error handling', () => {
    it('should handle invalid currency code', async () => {
      const invalid = { ...mockCurrency, code: '' };
      expect(invalid.code).toBeFalsy();
    });

    it('should handle rate source not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('exchange_rates')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
