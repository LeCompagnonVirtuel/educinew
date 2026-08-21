import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovNationalStatisticService } from '../gov-national-statistic.service';
import { GovNationalProgramService } from '../gov-national-program.service';
import { GovDataCollectionService } from '../gov-data-collection.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findNationalStatisticById: vi.fn(),
  createNationalStatistic: vi.fn(),
  updateNationalStatistic: vi.fn(),
  deleteNationalStatistic: vi.fn(),
  findNationalProgramById: vi.fn(),
  findAllNationalPrograms: vi.fn(),
  createNationalProgram: vi.fn(),
  findDataCollectionById: vi.fn(),
  findAllDataCollections: vi.fn(),
  createDataCollection: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovNationalStatisticService', () => {
  const service = new GovNationalStatisticService(mockSupabase);

  it('should get a statistic', async () => {
    mockRepo.findNationalStatisticById.mockResolvedValue({ id: '1', metric: 'enrollment' });
    const result = await service.getNationalStatistic('school1', '1');
    expect(result).toHaveProperty('metric', 'enrollment');
  });

  it('should throw when not found', async () => {
    mockRepo.findNationalStatisticById.mockResolvedValue(null);
    await expect(service.getNationalStatistic('school1', '999')).rejects.toThrow();
  });

  it('should create a statistic', async () => {
    mockRepo.createNationalStatistic.mockResolvedValue({ id: '1' });
    const result = await service.createNationalStatistic('school1', { metric: 'graduation' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update a statistic', async () => {
    mockRepo.findNationalStatisticById.mockResolvedValue({ id: '1' });
    mockRepo.updateNationalStatistic.mockResolvedValue({ id: '1', metric: 'updated' });
    const result = await service.updateNationalStatistic('school1', '1', { metric: 'updated' });
    expect(result).toHaveProperty('metric', 'updated');
  });

  it('should delete a statistic', async () => {
    mockRepo.findNationalStatisticById.mockResolvedValue({ id: '1' });
    mockRepo.deleteNationalStatistic.mockResolvedValue(undefined);
    await expect(service.deleteNationalStatistic('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovNationalProgramService', () => {
  const service = new GovNationalProgramService(mockSupabase);

  it('should create a program', async () => {
    mockRepo.createNationalProgram.mockResolvedValue({ id: '1' });
    const result = await service.createNationalProgram('school1', { name: 'Program A' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findNationalProgramById.mockResolvedValue(null);
    await expect(service.getNationalProgram('school1', '999')).rejects.toThrow();
  });

  it('should list programs', async () => {
    mockRepo.findAllNationalPrograms.mockResolvedValue([]);
    const result = await service.listNationalPrograms('school1');
    expect(result).toEqual([]);
  });
});

describe('GovDataCollectionService', () => {
  const service = new GovDataCollectionService(mockSupabase);

  it('should create a collection', async () => {
    mockRepo.createDataCollection.mockResolvedValue({ id: '1' });
    const result = await service.createDataCollection('school1', { type: 'survey' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findDataCollectionById.mockResolvedValue(null);
    await expect(service.getDataCollection('school1', '999')).rejects.toThrow();
  });

  it('should list collections', async () => {
    mockRepo.findAllDataCollections.mockResolvedValue([]);
    const result = await service.listDataCollections('school1');
    expect(result).toEqual([]);
  });
});
