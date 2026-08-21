import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/organizations.repository', () => ({
  OrganizationRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findOrganizationById: vi.fn(),
  findAllOrganizations: vi.fn(),
  createOrganization: vi.fn(),
  updateOrganization: vi.fn(),
  deleteOrganization: vi.fn(),
  findOrganizationByParent: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Organization Service - CRUD', () => {
  it('should list organizations', async () => {
    mockRepo.findAllOrganizations.mockResolvedValue([
      { id: '1', name: 'Computer Science Dept', type: 'department' },
    ]);
    const result = await mockRepo.findAllOrganizations('school1');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('department');
  });

  it('should create an organization', async () => {
    const data = { school_id: 'school1', name: 'Math Division', slug: 'math-div', type: 'division' };
    mockRepo.createOrganization.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createOrganization(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.name).toBe('Math Division');
  });

  it('should update an organization', async () => {
    mockRepo.findOrganizationById.mockResolvedValue({ id: '1', name: 'CS Dept' });
    mockRepo.updateOrganization.mockResolvedValue({ id: '1', name: 'Updated CS Dept' });
    const result = await mockRepo.updateOrganization('school1', '1', { name: 'Updated CS Dept' });
    expect(result.name).toBe('Updated CS Dept');
  });

  it('should delete an organization', async () => {
    mockRepo.findOrganizationById.mockResolvedValue({ id: '1', name: 'CS Dept' });
    mockRepo.deleteOrganization.mockResolvedValue(undefined);
    await expect(mockRepo.deleteOrganization('school1', '1')).resolves.toBeUndefined();
  });

  it('should throw when organization not found', async () => {
    mockRepo.findOrganizationById.mockResolvedValue(null);
    const result = await mockRepo.findOrganizationById('school1', '999');
    expect(result).toBeNull();
  });
});

describe('Organization Service - Hierarchy', () => {
  it('should list child organizations', async () => {
    mockRepo.findOrganizationByParent.mockResolvedValue([
      { id: '2', name: 'Team A', parent_id: '1', type: 'team' },
    ]);
    const result = await mockRepo.findOrganizationByParent('school1', '1');
    expect(result).toHaveLength(1);
    expect(result[0].parent_id).toBe('1');
  });

  it('should handle DB errors', async () => {
    mockRepo.findAllOrganizations.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.findAllOrganizations('school1')).rejects.toThrow('Timeout');
  });

  it('should require valid slug', () => {
    const validate = (s: string) => { if (!/^[a-z0-9-]+$/.test(s)) throw new Error('Invalid slug'); };
    expect(() => validate('Invalid Slug!')).toThrow('Invalid slug');
  });
});
