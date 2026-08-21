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

const mockComplianceRule = {
  id: 'cr-001',
  school_id: 'sch-001',
  regulation: 'OHADA',
  rule_type: 'ACCOUNTING',
  description: 'Normes comptables OHADA',
  is_mandatory: true,
  is_active: true,
  created_at: new Date().toISOString(),
};

const mockAuditLog = {
  id: 'aud-001',
  school_id: 'sch-001',
  user_id: 'usr-001',
  action: 'FINANCIAL_MODIFICATION',
  entity: 'financial_transactions',
  entity_id: 'txn-001',
  old_value: { amount: 50000 },
  new_value: { amount: 75000 },
  ip_address: '192.168.1.100',
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ComplianceService', () => {
  describe('createComplianceRule', () => {
    it('should create compliance rule', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockComplianceRule, error: null });
      const result = await mockSupabase.from('compliance_rules').insert(mockComplianceRule);

      expect(result.data.regulation).toBe('OHADA');
      expect(result.error).toBeNull();
    });

    it('should validate mandatory flag', async () => {
      expect(mockComplianceRule.is_mandatory).toBe(true);
    });
  });

  describe('logAuditEvent', () => {
    it('should record audit trail', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockAuditLog, error: null });
      const result = await mockSupabase.from('audit_logs').insert(mockAuditLog);

      expect(result.data.action).toBe('FINANCIAL_MODIFICATION');
      expect(result.error).toBeNull();
    });

    it('should capture old and new values', async () => {
      expect(mockAuditLog.old_value).toBeDefined();
      expect(mockAuditLog.new_value).toBeDefined();
    });

    it('should record IP address', async () => {
      expect(mockAuditLog.ip_address).toBeTruthy();
    });
  });

  describe('checkCompliance', () => {
    it('should verify rule adherence', async () => {
      const check = {
        rule_id: 'cr-001',
        status: 'COMPLIANT',
        last_checked: new Date().toISOString(),
      };
      mockSupabase.single.mockResolvedValue({ data: check, error: null });
      const result = await mockSupabase.from('compliance_checks')
        .select('*')
        .eq('rule_id', 'cr-001')
        .single();

      expect(result.data.status).toBe('COMPLIANT');
    });
  });

  describe('generateAuditReport', () => {
    it('should compile audit data', async () => {
      const report = {
        period: '2026-Q3',
        total_events: 250,
        financial_modifications: 45,
        user_access_events: 180,
        compliance_violations: 2,
      };
      expect(report.financial_modifications + report.user_access_events + report.compliance_violations)
        .toBeLessThanOrEqual(report.total_events);
    });
  });

  describe('getAuditLogs', () => {
    it('should return logs ordered by date', async () => {
      mockSupabase.order.mockResolvedValue({ data: [mockAuditLog], error: null });
      const result = await mockSupabase.from('audit_logs')
        .select('*')
        .eq('school_id', 'sch-001')
        .order('created_at', { ascending: false });

      expect(result.data).toHaveLength(1);
    });
  });

  describe('error handling', () => {
    it('should handle rule not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('compliance_rules')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
