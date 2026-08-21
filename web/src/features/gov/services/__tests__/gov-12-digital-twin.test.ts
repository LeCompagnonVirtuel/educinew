import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovEducationSystemService } from '../gov-education-system.service';
import { GovCampusAnalyticsService } from '../gov-campus-analytics.service';
import { GovCampusSyncService } from '../gov-campus-sync.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findEducationSystemById: vi.fn(),
  createEducationSystem: vi.fn(),
  updateEducationSystem: vi.fn(),
  deleteEducationSystem: vi.fn(),
  findCampusAnalyticsById: vi.fn(),
  findAllCampusAnalytics: vi.fn(),
  createCampusAnalytics: vi.fn(),
  findCampusSyncById: vi.fn(),
  createCampusSync: vi.fn(),
  deleteCampusSync: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovEducationSystemService (DigitalTwin)', () => {
  const service = new GovEducationSystemService(mockSupabase);

  it('should get an education system', async () => {
    mockRepo.findEducationSystemById.mockResolvedValue({ id: '1', model: 'french' });
    const result = await service.getEducationSystem('school1', '1');
    expect(result).toHaveProperty('model', 'french');
  });

  it('should throw when not found', async () => {
    mockRepo.findEducationSystemById.mockResolvedValue(null);
    await expect(service.getEducationSystem('school1', '999')).rejects.toThrow();
  });

  it('should create an education system', async () => {
    mockRepo.createEducationSystem.mockResolvedValue({ id: '1' });
    const result = await service.createEducationSystem('school1', { model: 'british' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update an education system', async () => {
    mockRepo.findEducationSystemById.mockResolvedValue({ id: '1' });
    mockRepo.updateEducationSystem.mockResolvedValue({ id: '1', model: 'american' });
    const result = await service.updateEducationSystem('school1', '1', { model: 'american' });
    expect(result).toHaveProperty('model', 'american');
  });

  it('should delete an education system', async () => {
    mockRepo.findEducationSystemById.mockResolvedValue({ id: '1' });
    mockRepo.deleteEducationSystem.mockResolvedValue(undefined);
    await expect(service.deleteEducationSystem('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovCampusAnalyticsService', () => {
  const service = new GovCampusAnalyticsService(mockSupabase);

  it('should create campus analytics', async () => {
    mockRepo.createCampusAnalytics.mockResolvedValue({ id: '1' });
    const result = await service.createCampusAnalytics('school1', { occupancy: 85 } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findCampusAnalyticsById.mockResolvedValue(null);
    await expect(service.getCampusAnalytics('school1', '999')).rejects.toThrow();
  });

  it('should list campus analytics', async () => {
    mockRepo.findAllCampusAnalytics.mockResolvedValue([]);
    const result = await service.listCampusAnalytics('school1');
    expect(result).toEqual([]);
  });
});

describe('GovCampusSyncService', () => {
  const service = new GovCampusSyncService(mockSupabase);

  it('should create a sync', async () => {
    mockRepo.createCampusSync.mockResolvedValue({ id: '1' });
    const result = await service.createCampusSync('school1', { status: 'pending' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findCampusSyncById.mockResolvedValue(null);
    await expect(service.getCampusSync('school1', '999')).rejects.toThrow();
  });

  it('should delete a sync', async () => {
    mockRepo.findCampusSyncById.mockResolvedValue({ id: '1' });
    mockRepo.deleteCampusSync.mockResolvedValue(undefined);
    await expect(service.deleteCampusSync('school1', '1')).resolves.toBeUndefined();
  });
});
