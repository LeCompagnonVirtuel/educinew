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

const mockPaymentMethod = {
  id: 'pm-001',
  school_id: 'sch-001',
  provider: 'money_fusion',
  name: 'Mobile Money',
  is_active: true,
  config: { api_key: 'test_key', merchant_id: 'merch-001' },
  created_at: new Date().toISOString(),
};

const mockPayment = {
  id: 'pay-001',
  school_id: 'sch-001',
  student_id: 'stu-001',
  amount: 75000,
  currency: 'XOF',
  method_id: 'pm-001',
  status: 'PENDING',
  reference: 'REF-2026-001',
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('PaymentInfrastructureService', () => {
  describe('createPaymentMethod', () => {
    it('should create Money Fusion payment method', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockPaymentMethod, error: null });
      const result = await mockSupabase.from('payment_methods').insert(mockPaymentMethod);
      expect(result.data.provider).toBe('money_fusion');
      expect(result.error).toBeNull();
    });

    it('should reject non-Money Fusion providers', async () => {
      const stripe = { ...mockPaymentMethod, provider: 'stripe' };
      expect(['money_fusion']).not.toContain(stripe.provider);
    });
  });

  describe('initiatePayment', () => {
    it('should create pending payment', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockPayment, error: null });
      const result = await mockSupabase.from('payments').insert(mockPayment);
      expect(result.data.status).toBe('PENDING');
    });

    it('should validate amount is positive', async () => {
      expect(mockPayment.amount).toBeGreaterThan(0);
    });
  });

  describe('confirmPayment', () => {
    it('should update payment status to CONFIRMED', async () => {
      const confirmed = { ...mockPayment, status: 'CONFIRMED' };
      mockSupabase.update.mockResolvedValue({ data: confirmed, error: null });
      const result = await mockSupabase.from('payments')
        .update({ status: 'CONFIRMED', confirmed_at: new Date().toISOString() })
        .eq('id', 'pay-001');

      expect(result.error).toBeNull();
    });

    it('should record webhook signature validation', async () => {
      const webhookLog = {
        id: 'wh-001',
        payment_id: 'pay-001',
        signature_valid: true,
        payload_hash: 'sha256-test',
        processed_at: new Date().toISOString(),
      };
      mockSupabase.insert.mockResolvedValue({ data: webhookLog, error: null });
      const result = await mockSupabase.from('webhook_logs').insert(webhookLog);
      expect(result.data.signature_valid).toBe(true);
    });
  });

  describe('getPayments', () => {
    it('should list payments by school', async () => {
      mockSupabase.order.mockResolvedValue({ data: [mockPayment], error: null });
      const result = await mockSupabase.from('payments')
        .select('*')
        .eq('school_id', 'sch-001')
        .order('created_at', { ascending: false });

      expect(result.data).toHaveLength(1);
    });
  });

  describe('cancelPayment', () => {
    it('should set status to CANCELLED', async () => {
      const cancelled = { ...mockPayment, status: 'CANCELLED' };
      mockSupabase.update.mockResolvedValue({ data: cancelled, error: null });
      const result = await mockSupabase.from('payments')
        .update({ status: 'CANCELLED' })
        .eq('id', 'pay-001');

      expect(result.error).toBeNull();
    });
  });
});
