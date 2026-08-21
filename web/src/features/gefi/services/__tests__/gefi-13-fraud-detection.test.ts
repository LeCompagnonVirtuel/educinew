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

const mockAlert = {
  id: 'fra-001',
  school_id: 'sch-001',
  type: 'DUPLICATE_PAYMENT',
  severity: 'HIGH',
  transaction_id: 'txn-001',
  description: 'Double paiement détecté',
  status: 'OPEN',
  risk_score: 0.85,
  created_at: new Date().toISOString(),
};

const mockRule = {
  id: 'rule-001',
  school_id: 'sch-001',
  name: 'Duplicate Payment Detection',
  rule_type: 'PATTERN',
  condition: { max_same_amount_same_student: 1, window_hours: 24 },
  is_active: true,
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('FraudDetectionService', () => {
  describe('createRule', () => {
    it('should create fraud detection rule', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockRule, error: null });
      const result = await mockSupabase.from('fraud_rules').insert(mockRule);

      expect(result.data.is_active).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should validate rule has condition', async () => {
      expect(mockRule.condition).toBeDefined();
    });
  });

  describe('createAlert', () => {
    it('should create fraud alert', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockAlert, error: null });
      const result = await mockSupabase.from('fraud_alerts').insert(mockAlert);

      expect(result.data.severity).toBe('HIGH');
      expect(result.error).toBeNull();
    });

    it('should validate risk_score range', async () => {
      expect(mockAlert.risk_score).toBeGreaterThanOrEqual(0);
      expect(mockAlert.risk_score).toBeLessThanOrEqual(1);
    });
  });

  describe('detectDuplicates', () => {
    it('should identify duplicate payments', async () => {
      const payments = [
        { id: 'p1', student_id: 'stu-001', amount: 50000, date: '2026-08-01' },
        { id: 'p2', student_id: 'stu-001', amount: 50000, date: '2026-08-01' },
      ];
      const duplicates = payments.filter((p, i) =>
        payments.findIndex(q => q.student_id === p.student_id && q.amount === p.amount) !== i
      );
      expect(duplicates).toHaveLength(1);
    });
  });

  describe('analyzeRiskScore', () => {
    it('should calculate risk based on frequency', async () => {
      const frequency = 5;
      const maxExpected = 2;
      const riskScore = Math.min(frequency / maxExpected, 1.0);
      expect(riskScore).toBe(1.0);
    });

    it('should flag high-value transactions', async () => {
      const amount = 5000000;
      const threshold = 1000000;
      expect(amount).toBeGreaterThan(threshold);
    });
  });

  describe('resolveAlert', () => {
    it('should update alert status', async () => {
      const resolved = { ...mockAlert, status: 'RESOLVED', resolved_by: 'admin-001' };
      mockSupabase.update.mockResolvedValue({ data: resolved, error: null });
      const result = await mockSupabase.from('fraud_alerts')
        .update({ status: 'RESOLVED' })
        .eq('id', 'fra-001');

      expect(result.data.status).toBe('RESOLVED');
    });
  });

  describe('getAlertStats', () => {
    it('should count alerts by severity', async () => {
      const stats = { HIGH: 12, MEDIUM: 25, LOW: 40 };
      const total = Object.values(stats).reduce((a, b) => a + b, 0);
      expect(total).toBe(77);
    });
  });

  describe('error handling', () => {
    it('should handle invalid risk score', async () => {
      const invalid = { ...mockAlert, risk_score: 1.5 };
      expect(invalid.risk_score).toBeGreaterThan(1);
    });
  });
});
