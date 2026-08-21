import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovInternationalPartnershipService } from '../gov-international-partnership.service';
import { GovInternationalBenchmarkingService } from '../gov-international-benchmarking.service';
import { GovNetworkAnalyticsService } from '../gov-network-analytics.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findInternationalPartnershipById: vi.fn(),
  createInternationalPartnership: vi.fn(),
  updateInternationalPartnership: vi.fn(),
  deleteInternationalPartnership: vi.fn(),
  findInternationalBenchmarkingById: vi.fn(),
  findAllInternationalBenchmarkings: vi.fn(),
  createInternationalBenchmarking: vi.fn(),
  findNetworkAnalyticsById: vi.fn(),
  createNetworkAnalytics: vi.fn(),
  deleteNetworkAnalytics: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovInternationalPartnershipService', () => {
  const service = new GovInternationalPartnershipService(mockSupabase);

  it('should get a partnership', async () => {
    mockRepo.findInternationalPartnershipById.mockResolvedValue({ id: '1', country: 'France' });
    const result = await service.getInternationalPartnership('school1', '1');
    expect(result).toHaveProperty('country', 'France');
  });

  it('should throw when not found', async () => {
    mockRepo.findInternationalPartnershipById.mockResolvedValue(null);
    await expect(service.getInternationalPartnership('school1', '999')).rejects.toThrow();
  });

  it('should create a partnership', async () => {
    mockRepo.createInternationalPartnership.mockResolvedValue({ id: '1' });
    const result = await service.createInternationalPartnership('school1', { country: 'Senegal' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update a partnership', async () => {
    mockRepo.findInternationalPartnershipById.mockResolvedValue({ id: '1' });
    mockRepo.updateInternationalPartnership.mockResolvedValue({ id: '1', status: 'active' });
    const result = await service.updateInternationalPartnership('school1', '1', { status: 'active' });
    expect(result).toHaveProperty('status', 'active');
  });

  it('should delete a partnership', async () => {
    mockRepo.findInternationalPartnershipById.mockResolvedValue({ id: '1' });
    mockRepo.deleteInternationalPartnership.mockResolvedValue(undefined);
    await expect(service.deleteInternationalPartnership('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovInternationalBenchmarkingService', () => {
  const service = new GovInternationalBenchmarkingService(mockSupabase);

  it('should create a benchmarking', async () => {
    mockRepo.createInternationalBenchmarking.mockResolvedValue({ id: '1' });
    const result = await service.createInternationalBenchmarking('school1', { metric: 'PISA' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findInternationalBenchmarkingById.mockResolvedValue(null);
    await expect(service.getInternationalBenchmarking('school1', '999')).rejects.toThrow();
  });

  it('should list benchmarkings', async () => {
    mockRepo.findAllInternationalBenchmarkings.mockResolvedValue([]);
    const result = await service.listInternationalBenchmarkings('school1');
    expect(result).toEqual([]);
  });
});

describe('GovNetworkAnalyticsService', () => {
  const service = new GovNetworkAnalyticsService(mockSupabase);

  it('should create network analytics', async () => {
    mockRepo.createNetworkAnalytics.mockResolvedValue({ id: '1' });
    const result = await service.createNetworkAnalytics('school1', { nodes: 10 } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findNetworkAnalyticsById.mockResolvedValue(null);
    await expect(service.getNetworkAnalytics('school1', '999')).rejects.toThrow();
  });

  it('should delete network analytics', async () => {
    mockRepo.findNetworkAnalyticsById.mockResolvedValue({ id: '1' });
    mockRepo.deleteNetworkAnalytics.mockResolvedValue(undefined);
    await expect(service.deleteNetworkAnalytics('school1', '1')).resolves.toBeUndefined();
  });
});
