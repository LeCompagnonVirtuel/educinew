import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovAnalyticsDashboardGenerationService } from '../gov-analytics-dashboard-generation.service';
import { GovAnalyticsDataAggregationService } from '../gov-analytics-data-aggregation.service';
import { GovAnalyticsReportGenerationService } from '../gov-analytics-report-generation.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findAnalyticsDashboardGenerationById: vi.fn(),
  createAnalyticsDashboardGeneration: vi.fn(),
  updateAnalyticsDashboardGeneration: vi.fn(),
  deleteAnalyticsDashboardGeneration: vi.fn(),
  findAnalyticsDataAggregationById: vi.fn(),
  findAllAnalyticsDataAggregations: vi.fn(),
  createAnalyticsDataAggregation: vi.fn(),
  findAnalyticsReportGenerationById: vi.fn(),
  createAnalyticsReportGeneration: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovAnalyticsDashboardGenerationService', () => {
  const service = new GovAnalyticsDashboardGenerationService(mockSupabase);

  it('should get a dashboard generation', async () => {
    mockRepo.findAnalyticsDashboardGenerationById.mockResolvedValue({ id: '1', type: 'national' });
    const result = await service.getAnalyticsDashboardGeneration('school1', '1');
    expect(result).toHaveProperty('type', 'national');
  });

  it('should throw when not found', async () => {
    mockRepo.findAnalyticsDashboardGenerationById.mockResolvedValue(null);
    await expect(service.getAnalyticsDashboardGeneration('school1', '999')).rejects.toThrow();
  });

  it('should create a dashboard generation', async () => {
    mockRepo.createAnalyticsDashboardGeneration.mockResolvedValue({ id: '1' });
    const result = await service.createAnalyticsDashboardGeneration('school1', { type: 'regional' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update a dashboard generation', async () => {
    mockRepo.findAnalyticsDashboardGenerationById.mockResolvedValue({ id: '1' });
    mockRepo.updateAnalyticsDashboardGeneration.mockResolvedValue({ id: '1', type: 'updated' });
    const result = await service.updateAnalyticsDashboardGeneration('school1', '1', { type: 'updated' });
    expect(result).toHaveProperty('type', 'updated');
  });

  it('should delete a dashboard generation', async () => {
    mockRepo.findAnalyticsDashboardGenerationById.mockResolvedValue({ id: '1' });
    mockRepo.deleteAnalyticsDashboardGeneration.mockResolvedValue(undefined);
    await expect(service.deleteAnalyticsDashboardGeneration('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovAnalyticsDataAggregationService', () => {
  const service = new GovAnalyticsDataAggregationService(mockSupabase);

  it('should create an aggregation', async () => {
    mockRepo.createAnalyticsDataAggregation.mockResolvedValue({ id: '1' });
    const result = await service.createAnalyticsDataAggregation('school1', { source: 'db' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findAnalyticsDataAggregationById.mockResolvedValue(null);
    await expect(service.getAnalyticsDataAggregation('school1', '999')).rejects.toThrow();
  });

  it('should list aggregations', async () => {
    mockRepo.findAllAnalyticsDataAggregations.mockResolvedValue([]);
    const result = await service.listAnalyticsDataAggregations('school1');
    expect(result).toEqual([]);
  });
});

describe('GovAnalyticsReportGenerationService', () => {
  const service = new GovAnalyticsReportGenerationService(mockSupabase);

  it('should create a report', async () => {
    mockRepo.createAnalyticsReportGeneration.mockResolvedValue({ id: '1' });
    const result = await service.createAnalyticsReportGeneration('school1', { format: 'pdf' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findAnalyticsReportGenerationById.mockResolvedValue(null);
    await expect(service.getAnalyticsReportGeneration('school1', '999')).rejects.toThrow();
  });
});
