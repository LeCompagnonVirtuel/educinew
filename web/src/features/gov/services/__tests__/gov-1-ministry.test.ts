import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovMinistryService } from '../gov-ministry.service';
import { GovMinistryDepartmentService } from '../gov-ministry-department.service';
import { GovMinistryUserService } from '../gov-ministry-user.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findMinistryById: vi.fn(),
  findAllMinistries: vi.fn(),
  createMinistry: vi.fn(),
  updateMinistry: vi.fn(),
  deleteMinistry: vi.fn(),
  findMinistryDepartmentById: vi.fn(),
  findAllMinistryDepartments: vi.fn(),
  createMinistryDepartment: vi.fn(),
  deleteMinistryDepartment: vi.fn(),
  findMinistryUserById: vi.fn(),
  createMinistryUser: vi.fn(),
  deleteMinistryUser: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovMinistryService', () => {
  const service = new GovMinistryService(mockSupabase);

  it('should get a ministry', async () => {
    mockRepo.findMinistryById.mockResolvedValue({ id: '1', name: 'Test' });
    const result = await service.getMinistry('school1', '1');
    expect(result).toHaveProperty('name', 'Test');
  });

  it('should throw when ministry not found', async () => {
    mockRepo.findMinistryById.mockResolvedValue(null);
    await expect(service.getMinistry('school1', '999')).rejects.toThrow();
  });

  it('should create a ministry', async () => {
    mockRepo.createMinistry.mockResolvedValue({ id: '1' });
    const result = await service.createMinistry('school1', { name: 'New' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update a ministry', async () => {
    mockRepo.findMinistryById.mockResolvedValue({ id: '1' });
    mockRepo.updateMinistry.mockResolvedValue({ id: '1', name: 'Updated' });
    const result = await service.updateMinistry('school1', '1', { name: 'Updated' });
    expect(result).toHaveProperty('name', 'Updated');
  });

  it('should delete a ministry', async () => {
    mockRepo.findMinistryById.mockResolvedValue({ id: '1' });
    mockRepo.deleteMinistry.mockResolvedValue(undefined);
    await expect(service.deleteMinistry('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovMinistryDepartmentService', () => {
  const service = new GovMinistryDepartmentService(mockSupabase);

  it('should create a department', async () => {
    mockRepo.createMinistryDepartment.mockResolvedValue({ id: '1' });
    const result = await service.createMinistryDepartment('school1', { name: 'Dept' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when department not found', async () => {
    mockRepo.findMinistryDepartmentById.mockResolvedValue(null);
    await expect(service.getMinistryDepartment('school1', '999')).rejects.toThrow();
  });

  it('should list departments', async () => {
    mockRepo.findAllMinistryDepartments.mockResolvedValue([]);
    const result = await service.listMinistryDepartments('school1');
    expect(result).toEqual([]);
  });
});

describe('GovMinistryUserService', () => {
  const service = new GovMinistryUserService(mockSupabase);

  it('should create a user', async () => {
    mockRepo.createMinistryUser.mockResolvedValue({ id: '1' });
    const result = await service.createMinistryUser('school1', { email: 'a@test.com' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when user not found', async () => {
    mockRepo.findMinistryUserById.mockResolvedValue(null);
    await expect(service.getMinistryUser('school1', '999')).rejects.toThrow();
  });

  it('should delete a user', async () => {
    mockRepo.findMinistryUserById.mockResolvedValue({ id: '1' });
    mockRepo.deleteMinistryUser.mockResolvedValue(undefined);
    await expect(service.deleteMinistryUser('school1', '1')).resolves.toBeUndefined();
  });
});
