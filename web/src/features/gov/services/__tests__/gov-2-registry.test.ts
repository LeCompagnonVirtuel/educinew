import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovSchoolRegistryService } from '../gov-school-registry.service';
import { GovEducationSystemService } from '../gov-education-system.service';
import { GovEducationPolicyService } from '../gov-education-policy.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findSchoolRegistryById: vi.fn(),
  findAllSchoolRegistries: vi.fn(),
  createSchoolRegistry: vi.fn(),
  updateSchoolRegistry: vi.fn(),
  deleteSchoolRegistry: vi.fn(),
  findEducationSystemById: vi.fn(),
  findAllEducationSystems: vi.fn(),
  createEducationSystem: vi.fn(),
  findEducationPolicyById: vi.fn(),
  createEducationPolicy: vi.fn(),
  deleteEducationPolicy: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovSchoolRegistryService', () => {
  const service = new GovSchoolRegistryService(mockSupabase);

  it('should get a registry entry', async () => {
    mockRepo.findSchoolRegistryById.mockResolvedValue({ id: '1', name: 'School A' });
    const result = await service.getSchoolRegistry('school1', '1');
    expect(result).toHaveProperty('name', 'School A');
  });

  it('should throw when registry not found', async () => {
    mockRepo.findSchoolRegistryById.mockResolvedValue(null);
    await expect(service.getSchoolRegistry('school1', '999')).rejects.toThrow();
  });

  it('should create a registry entry', async () => {
    mockRepo.createSchoolRegistry.mockResolvedValue({ id: '1' });
    const result = await service.createSchoolRegistry('school1', { name: 'New' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update a registry entry', async () => {
    mockRepo.findSchoolRegistryById.mockResolvedValue({ id: '1' });
    mockRepo.updateSchoolRegistry.mockResolvedValue({ id: '1', name: 'Updated' });
    const result = await service.updateSchoolRegistry('school1', '1', { name: 'Updated' });
    expect(result).toHaveProperty('name', 'Updated');
  });

  it('should delete a registry entry', async () => {
    mockRepo.findSchoolRegistryById.mockResolvedValue({ id: '1' });
    mockRepo.deleteSchoolRegistry.mockResolvedValue(undefined);
    await expect(service.deleteSchoolRegistry('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovEducationSystemService', () => {
  const service = new GovEducationSystemService(mockSupabase);

  it('should get an education system', async () => {
    mockRepo.findEducationSystemById.mockResolvedValue({ id: '1', name: 'System' });
    const result = await service.getEducationSystem('school1', '1');
    expect(result).toHaveProperty('name');
  });

  it('should throw when not found', async () => {
    mockRepo.findEducationSystemById.mockResolvedValue(null);
    await expect(service.getEducationSystem('school1', '999')).rejects.toThrow();
  });

  it('should create an education system', async () => {
    mockRepo.createEducationSystem.mockResolvedValue({ id: '1' });
    const result = await service.createEducationSystem('school1', { name: 'New' } as any);
    expect(result).toHaveProperty('id');
  });
});

describe('GovEducationPolicyService', () => {
  const service = new GovEducationPolicyService(mockSupabase);

  it('should create a policy', async () => {
    mockRepo.createEducationPolicy.mockResolvedValue({ id: '1' });
    const result = await service.createEducationPolicy('school1', { title: 'Policy' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when policy not found', async () => {
    mockRepo.findEducationPolicyById.mockResolvedValue(null);
    await expect(service.getEducationPolicy('school1', '999')).rejects.toThrow();
  });

  it('should delete a policy', async () => {
    mockRepo.findEducationPolicyById.mockResolvedValue({ id: '1' });
    mockRepo.deleteEducationPolicy.mockResolvedValue(undefined);
    await expect(service.deleteEducationPolicy('school1', '1')).resolves.toBeUndefined();
  });
});
