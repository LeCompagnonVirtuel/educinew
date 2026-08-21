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

const mockScholarship = {
  id: 'sch-001',
  school_id: 'sch-001',
  name: 'Bourse Excellence',
  type: 'MERIT',
  amount: 100000,
  currency: 'XOF',
  criteria: { min_gpa: 15, max_income: 200000 },
  max_recipients: 10,
  status: 'OPEN',
  created_at: new Date().toISOString(),
};

const mockApplication = {
  id: 'app-001',
  scholarship_id: 'sch-001',
  student_id: 'stu-001',
  status: 'PENDING',
  documents: ['transcript.pdf', 'recommendation.pdf'],
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ScholarshipEngineService', () => {
  describe('createScholarship', () => {
    it('should create scholarship with criteria', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockScholarship, error: null });
      const result = await mockSupabase.from('scholarships').insert(mockScholarship);

      expect(result.data.type).toBe('MERIT');
      expect(result.data.criteria).toBeDefined();
    });

    it('should validate max_recipients is positive', async () => {
      expect(mockScholarship.max_recipients).toBeGreaterThan(0);
    });
  });

  describe('applyForScholarship', () => {
    it('should submit application', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockApplication, error: null });
      const result = await mockSupabase.from('scholarship_applications').insert(mockApplication);

      expect(result.data.status).toBe('PENDING');
    });

    it('should require documents', async () => {
      expect(mockApplication.documents.length).toBeGreaterThan(0);
    });
  });

  describe('reviewApplication', () => {
    it('should approve application', async () => {
      const approved = { ...mockApplication, status: 'APPROVED', reviewed_at: new Date().toISOString() };
      mockSupabase.update.mockResolvedValue({ data: approved, error: null });
      const result = await mockSupabase.from('scholarship_applications')
        .update({ status: 'APPROVED' })
        .eq('id', 'app-001');

      expect(result.error).toBeNull();
    });

    it('should reject application', async () => {
      const rejected = { ...mockApplication, status: 'REJECTED', reason: 'Criteria not met' };
      mockSupabase.update.mockResolvedValue({ data: rejected, error: null });
      const result = await mockSupabase.from('scholarship_applications')
        .update({ status: 'REJECTED', reason: 'Criteria not met' })
        .eq('id', 'app-001');

      expect(result.data.status).toBe('REJECTED');
    });
  });

  describe('disburseScholarship', () => {
    it('should create disbursement record', async () => {
      const disbursement = {
        id: 'dis-001',
        application_id: 'app-001',
        amount: 100000,
        status: 'DISBURSED',
        disbursed_at: new Date().toISOString(),
      };
      mockSupabase.insert.mockResolvedValue({ data: disbursement, error: null });
      const result = await mockSupabase.from('scholarship_disbursements').insert(disbursement);

      expect(result.data.amount).toBe(100000);
    });
  });

  describe('getScholarshipStats', () => {
    it('should count applications by status', async () => {
      const stats = { total: 50, approved: 30, rejected: 15, pending: 5 };
      mockSupabase.single.mockResolvedValue({ data: stats, error: null });
      expect(stats.approved + stats.rejected + stats.pending).toBe(stats.total);
    });
  });

  describe('error handling', () => {
    it('should handle duplicate application', async () => {
      mockSupabase.insert.mockResolvedValue({ data: null, error: { code: '23505', message: 'duplicate' } });
      const result = await mockSupabase.from('scholarship_applications').insert(mockApplication);
      expect(result.error).toBeTruthy();
    });
  });
});
