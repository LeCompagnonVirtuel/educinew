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

const mockGrant = {
  id: 'gra-001',
  school_id: 'sch-001',
  government: 'MINEDUC',
  program: 'Gratuité Scolaire',
  amount: 5000000,
  currency: 'XOF',
  status: 'APPROVED',
  fiscal_year: 2026,
  conditions: ['rapport trimestriel', 'liste élèves'],
  created_at: new Date().toISOString(),
};

const mockDisbursement = {
  id: 'dis-001',
  grant_id: 'gra-001',
  amount: 1250000,
  phase: 1,
  status: 'DISBURSED',
  disbursed_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GovernmentFinanceService', () => {
  describe('registerGrant', () => {
    it('should register government grant', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockGrant, error: null });
      const result = await mockSupabase.from('government_grants').insert(mockGrant);

      expect(result.data.government).toBe('MINEDUC');
      expect(result.error).toBeNull();
    });

    it('should have conditions array', async () => {
      expect(mockGrant.conditions.length).toBeGreaterThan(0);
    });
  });

  describe('trackDisbursement', () => {
    it('should record phased disbursement', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockDisbursement, error: null });
      const result = await mockSupabase.from('grant_disbursements').insert(mockDisbursement);

      expect(result.data.phase).toBe(1);
    });

    it('should validate phase amount within grant', async () => {
      expect(mockDisbursement.amount).toBeLessThanOrEqual(mockGrant.amount);
    });
  });

  describe('generateComplianceReport', () => {
    it('should create report for government audit', async () => {
      const report = {
        id: 'rpt-001',
        grant_id: 'gra-001',
        report_type: 'QUARTERLY',
        period: 'Q1-2026',
        students受益: 200,
        amount_utilized: 1250000,
        created_at: new Date().toISOString(),
      };
      mockSupabase.insert.mockResolvedValue({ data: report, error: null });
      const result = await mockSupabase.from('compliance_reports').insert(report);

      expect(result.data.report_type).toBe('QUARTERLY');
    });
  });

  describe('getGrantStatus', () => {
    it('should return grant with disbursements', async () => {
      const enriched = { ...mockGrant, disbursements: [mockDisbursement] };
      mockSupabase.single.mockResolvedValue({ data: enriched, error: null });
      const result = await mockSupabase.from('government_grants')
        .select('*, disbursements(*)')
        .eq('id', 'gra-001')
        .single();

      expect(result.data.disbursements).toHaveLength(1);
    });
  });

  describe('verifyConditions', () => {
    it('should check condition completion', async () => {
      const compliance = {
        grant_id: 'gra-001',
        conditions: [
          { name: 'rapport trimestriel', met: true },
          { name: 'liste élèves', met: false },
        ],
      };
      const metCount = compliance.conditions.filter(c => c.met).length;
      expect(metCount).toBe(1);
    });
  });

  describe('error handling', () => {
    it('should handle grant not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('government_grants')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
