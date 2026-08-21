import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovNationalDashboardService } from '../gov-national-dashboard.service';
import { GovEducationKpiService } from '../gov-education-kpi.service';
import { GovRegionalKpiService } from '../gov-regional-kpi.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findNationalDashboardById: vi.fn(),
  createNationalDashboard: vi.fn(),
  updateNationalDashboard: vi.fn(),
  deleteNationalDashboard: vi.fn(),
  findEducationKpiById: vi.fn(),
  findAllEducationKpis: vi.fn(),
  createEducationKpi: vi.fn(),
  findRegionalKpiById: vi.fn(),
  findAllRegionalKpis: vi.fn(),
  createRegionalKpi: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovNationalDashboardService', () => {
  const service = new GovNationalDashboardService(mockSupabase);

  it('should get a dashboard', async () => {
    mockRepo.findNationalDashboardById.mockResolvedValue({ id: '1', title: 'National View' });
    const result = await service.getNationalDashboard('school1', '1');
    expect(result).toHaveProperty('title', 'National View');
  });

  it('should throw when not found', async () => {
    mockRepo.findNationalDashboardById.mockResolvedValue(null);
    await expect(service.getNationalDashboard('school1', '999')).rejects.toThrow();
  });

  it('should create a dashboard', async () => {
    mockRepo.createNationalDashboard.mockResolvedValue({ id: '1' });
    const result = await service.createNationalDashboard('school1', { title: 'Dashboard' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update a dashboard', async () => {
    mockRepo.findNationalDashboardById.mockResolvedValue({ id: '1' });
    mockRepo.updateNationalDashboard.mockResolvedValue({ id: '1', title: 'Updated' });
    const result = await service.updateNationalDashboard('school1', '1', { title: 'Updated' });
    expect(result).toHaveProperty('title', 'Updated');
  });

  it('should delete a dashboard', async () => {
    mockRepo.findNationalDashboardById.mockResolvedValue({ id: '1' });
    mockRepo.deleteNationalDashboard.mockResolvedValue(undefined);
    await expect(service.deleteNationalDashboard('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovEducationKpiService', () => {
  const service = new GovEducationKpiService(mockSupabase);

  it('should create a kpi', async () => {
    mockRepo.createEducationKpi.mockResolvedValue({ id: '1', name: 'Pass Rate' });
    const result = await service.createEducationKpi('school1', { name: 'Pass Rate' } as any);
    expect(result).toHaveProperty('name', 'Pass Rate');
  });

  it('should throw when not found', async () => {
    mockRepo.findEducationKpiById.mockResolvedValue(null);
    await expect(service.getEducationKpi('school1', '999')).rejects.toThrow();
  });

  it('should list kpis', async () => {
    mockRepo.findAllEducationKpis.mockResolvedValue([]);
    const result = await service.listEducationKpis('school1');
    expect(result).toEqual([]);
  });
});

describe('GovRegionalKpiService', () => {
  const service = new GovRegionalKpiService(mockSupabase);

  it('should create a regional kpi', async () => {
    mockRepo.createRegionalKpi.mockResolvedValue({ id: '1' });
    const result = await service.createRegionalKpi('school1', { region: 'West' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findRegionalKpiById.mockResolvedValue(null);
    await expect(service.getRegionalKpi('school1', '999')).rejects.toThrow();
  });

  it('should list regional kpis', async () => {
    mockRepo.findAllRegionalKpis.mockResolvedValue([]);
    const result = await service.listRegionalKpis('school1');
    expect(result).toEqual([]);
  });
});
