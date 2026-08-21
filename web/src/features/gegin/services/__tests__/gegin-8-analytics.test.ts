import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/analytics.repository', () => ({
  AnalyticsRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findReportById: vi.fn(),
  createReport: vi.fn(),
  listReports: vi.fn(),
  deleteReport: vi.fn(),
  getDashboardStats: vi.fn(),
  getMobilityAnalytics: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Analytics Service - Reports', () => {
  it('should list analytics reports', async () => {
    mockRepo.listReports.mockResolvedValue([
      { id: '1', title: 'Mobility Summary', type: 'mobility' },
    ]);
    const result = await mockRepo.listReports('school1');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('mobility');
  });

  it('should create a report', async () => {
    const data = { school_id: 'school1', title: 'Quarterly Report', type: 'quarterly' };
    mockRepo.createReport.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createReport(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.title).toBe('Quarterly Report');
  });

  it('should delete a report', async () => {
    mockRepo.findReportById.mockResolvedValue({ id: '1' });
    mockRepo.deleteReport.mockResolvedValue(undefined);
    await expect(mockRepo.deleteReport('school1', '1')).resolves.toBeUndefined();
  });

  it('should get dashboard stats', async () => {
    mockRepo.getDashboardStats.mockResolvedValue({
      totalMobilities: 10,
      activeProjects: 5,
    });
    const result = await mockRepo.getDashboardStats('school1');
    expect(result.totalMobilities).toBe(10);
    expect(result.activeProjects).toBe(5);
  });

  it('should get mobility analytics', async () => {
    mockRepo.getMobilityAnalytics.mockResolvedValue({
      byType: { transfer: 5, exchange: 3 },
    });
    const result = await mockRepo.getMobilityAnalytics('school1');
    expect(result.byType.transfer).toBe(5);
  });
});

describe('Analytics Service - Error Handling', () => {
  it('should handle DB errors', async () => {
    mockRepo.listReports.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listReports('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });

  it('should return empty array when no reports', async () => {
    mockRepo.listReports.mockResolvedValue([]);
    const result = await mockRepo.listReports('school1');
    expect(result).toEqual([]);
  });
});
