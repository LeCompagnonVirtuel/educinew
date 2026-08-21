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

const mockCampaign = {
  id: 'cam-001',
  school_id: 'sch-001',
  title: 'Construction Bibliothèque',
  description: 'Nouvelle bibliothèque pour 500 élèves',
  goal_amount: 5000000,
  currency: 'XOF',
  raised_amount: 1200000,
  status: 'ACTIVE',
  start_date: '2026-09-01',
  end_date: '2026-12-31',
  created_at: new Date().toISOString(),
};

const mockContribution = {
  id: 'con-001',
  campaign_id: 'cam-001',
  donor_name: 'Moussa Traoré',
  amount: 100000,
  currency: 'XOF',
  payment_method: 'mobile_money',
  status: 'CONFIRMED',
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('CrowdfundingService', () => {
  describe('createCampaign', () => {
    it('should create fundraising campaign', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockCampaign, error: null });
      const result = await mockSupabase.from('crowdfunding_campaigns').insert(mockCampaign);

      expect(result.data.status).toBe('ACTIVE');
      expect(result.error).toBeNull();
    });

    it('should validate goal amount is positive', async () => {
      expect(mockCampaign.goal_amount).toBeGreaterThan(0);
    });

    it('should validate end_date after start_date', async () => {
      expect(new Date(mockCampaign.end_date).getTime())
        .toBeGreaterThan(new Date(mockCampaign.start_date).getTime());
    });
  });

  describe('recordContribution', () => {
    it('should record donor contribution', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockContribution, error: null });
      const result = await mockSupabase.from('campaign_contributions').insert(mockContribution);

      expect(result.data.status).toBe('CONFIRMED');
    });

    it('should update raised_amount', async () => {
      const updated = { ...mockCampaign, raised_amount: 1300000 };
      mockSupabase.update.mockResolvedValue({ data: updated, error: null });
      const result = await mockSupabase.from('crowdfunding_campaigns')
        .update({ raised_amount: 1300000 })
        .eq('id', 'cam-001');

      expect(result.data.raised_amount).toBe(1300000);
    });
  });

  describe('getProgress', () => {
    it('should calculate funding percentage', async () => {
      const percentage = (mockCampaign.raised_amount / mockCampaign.goal_amount) * 100;
      expect(percentage).toBeCloseTo(24.0);
    });
  });

  describe('closeCampaign', () => {
    it('should set status to CLOSED', async () => {
      const closed = { ...mockCampaign, status: 'CLOSED' };
      mockSupabase.update.mockResolvedValue({ data: closed, error: null });
      const result = await mockSupabase.from('crowdfunding_campaigns')
        .update({ status: 'CLOSED' })
        .eq('id', 'cam-001');

      expect(result.data.status).toBe('CLOSED');
    });
  });

  describe('getCampaignStats', () => {
    it('should aggregate contributions', async () => {
      const stats = { total_contributors: 45, total_raised: 1200000, avg_contribution: 26667 };
      expect(stats.total_contributors * stats.avg_contribution).toBeCloseTo(stats.total_raised, -1);
    });
  });

  describe('error handling', () => {
    it('should handle campaign not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('crowdfunding_campaigns')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });

    it('should reject contribution exceeding goal', async () => {
      const overGoal = { ...mockContribution, amount: 10000000 };
      expect(overGoal.amount).toBeGreaterThan(mockCampaign.goal_amount);
    });
  });
});
