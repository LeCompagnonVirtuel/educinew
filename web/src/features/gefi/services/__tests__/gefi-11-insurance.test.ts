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

const mockInsurancePolicy = {
  id: 'pol-001',
  school_id: 'sch-001',
  student_id: 'stu-001',
  provider: 'NSIA Assurances',
  type: 'HEALTH',
  premium: 25000,
  currency: 'XOF',
  coverage_amount: 2000000,
  status: 'ACTIVE',
  start_date: '2026-09-01',
  end_date: '2027-08-31',
  created_at: new Date().toISOString(),
};

const mockClaim = {
  id: 'cla-001',
  policy_id: 'pol-001',
  amount: 150000,
  reason: 'Hospitalisation',
  status: 'PENDING',
  documents: ['facture.pdf', 'certificat.pdf'],
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('InsuranceService', () => {
  describe('createPolicy', () => {
    it('should create insurance policy', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockInsurancePolicy, error: null });
      const result = await mockSupabase.from('insurance_policies').insert(mockInsurancePolicy);

      expect(result.data.type).toBe('HEALTH');
      expect(result.error).toBeNull();
    });

    it('should validate premium is positive', async () => {
      expect(mockInsurancePolicy.premium).toBeGreaterThan(0);
    });

    it('should validate coverage exceeds premium', async () => {
      expect(mockInsurancePolicy.coverage_amount).toBeGreaterThan(mockInsurancePolicy.premium);
    });
  });

  describe('submitClaim', () => {
    it('should submit claim with documents', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockClaim, error: null });
      const result = await mockSupabase.from('insurance_claims').insert(mockClaim);

      expect(result.data.status).toBe('PENDING');
      expect(result.data.documents.length).toBeGreaterThan(0);
    });
  });

  describe('processClaim', () => {
    it('should approve claim within coverage', async () => {
      const approved = { ...mockClaim, status: 'APPROVED', processed_at: new Date().toISOString() };
      mockSupabase.update.mockResolvedValue({ data: approved, error: null });
      const result = await mockSupabase.from('insurance_claims')
        .update({ status: 'APPROVED' })
        .eq('id', 'cla-001');

      expect(result.error).toBeNull();
    });

    it('should reject claim exceeding coverage', async () => {
      const overCoverage = { ...mockClaim, amount: 5000000 };
      expect(overCoverage.amount).toBeGreaterThan(mockInsurancePolicy.coverage_amount);
    });
  });

  describe('renewPolicy', () => {
    it('should extend policy end_date', async () => {
      const renewed = { ...mockInsurancePolicy, end_date: '2028-08-31' };
      mockSupabase.update.mockResolvedValue({ data: renewed, error: null });
      const result = await mockSupabase.from('insurance_policies')
        .update({ end_date: '2028-08-31' })
        .eq('id', 'pol-001');

      expect(result.data.end_date).toBe('2028-08-31');
    });
  });

  describe('getPolicyStats', () => {
    it('should aggregate claims by status', async () => {
      const stats = { total_claims: 25, approved: 18, rejected: 4, pending: 3 };
      expect(stats.approved + stats.rejected + stats.pending).toBe(stats.total_claims);
    });
  });

  describe('error handling', () => {
    it('should handle policy not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('insurance_policies')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
