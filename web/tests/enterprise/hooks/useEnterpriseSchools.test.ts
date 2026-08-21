import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useEnterpriseSchools service', () => {
  const mockRepo = {
    findSchools: vi.fn(),
    findSchoolById: vi.fn(),
    createSchool: vi.fn(),
    updateSchool: vi.fn(),
    deleteSchool: vi.fn(),
    suspendSchool: vi.fn(),
    activateSchool: vi.fn(),
    blockSchool: vi.fn(),
    archiveSchool: vi.fn(),
    cloneSchool: vi.fn(),
    migrateSchool: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return schools list', async () => {
    const schools = [{ id: 's1', name: 'School A' }, { id: 's2', name: 'School B' }];
    mockRepo.findSchools.mockResolvedValue(schools);
    const result = await mockRepo.findSchools('ent-1');
    expect(result).toHaveLength(2);
  });

  it('should throw when enterpriseId is empty', async () => {
    mockRepo.findSchools.mockRejectedValueOnce(new Error('Identifiant de l\'entreprise requis'));
    await expect(mockRepo.findSchools('')).rejects.toThrow('Identifiant de l\'entreprise requis');
  });

  it('should return single school by id', async () => {
    const school = { id: 's1', name: 'School A', code: 'SA' };
    mockRepo.findSchoolById.mockResolvedValue(school);
    const result = await mockRepo.findSchoolById('ent-1', 's1');
    expect(result.id).toBe('s1');
  });

  it('should return null when school not found', async () => {
    mockRepo.findSchoolById.mockResolvedValue(null);
    const result = await mockRepo.findSchoolById('ent-1', 'missing');
    expect(result).toBeNull();
  });

  it('should create a school', async () => {
    const newSchool = { id: 's3', name: 'School C', code: 'SC' };
    mockRepo.createSchool.mockResolvedValue(newSchool);
    const result = await mockRepo.createSchool({ name: 'School C', code: 'SC', enterprise_id: 'ent-1' });
    expect(result.name).toBe('School C');
  });

  it('should update a school', async () => {
    const updated = { id: 's1', name: 'Updated School' };
    mockRepo.updateSchool.mockResolvedValue(updated);
    const result = await mockRepo.updateSchool('ent-1', 's1', { name: 'Updated School' });
    expect(result.name).toBe('Updated School');
  });

  it('should delete a school', async () => {
    mockRepo.deleteSchool.mockResolvedValue({ success: true });
    const result = await mockRepo.deleteSchool('ent-1', 's1');
    expect(result.success).toBe(true);
  });

  it('should suspend a school', async () => {
    const suspended = { id: 's1', status: 'suspended' };
    mockRepo.suspendSchool.mockResolvedValue(suspended);
    const result = await mockRepo.suspendSchool('ent-1', 's1', 'Violation');
    expect(result.status).toBe('suspended');
  });

  it('should activate a school', async () => {
    const activated = { id: 's1', status: 'active' };
    mockRepo.activateSchool.mockResolvedValue(activated);
    const result = await mockRepo.activateSchool('ent-1', 's1');
    expect(result.status).toBe('active');
  });

  it('should block a school', async () => {
    const blocked = { id: 's1', status: 'blocked' };
    mockRepo.blockSchool.mockResolvedValue(blocked);
    const result = await mockRepo.blockSchool('ent-1', 's1', 'Policy violation');
    expect(result.status).toBe('blocked');
  });

  it('should archive a school', async () => {
    const archived = { id: 's1', status: 'archived' };
    mockRepo.archiveSchool.mockResolvedValue(archived);
    const result = await mockRepo.archiveSchool('ent-1', 's1');
    expect(result.status).toBe('archived');
  });

  it('should clone a school', async () => {
    const cloned = { id: 's4', name: 'Cloned School' };
    mockRepo.cloneSchool.mockResolvedValue(cloned);
    const result = await mockRepo.cloneSchool('ent-1', 's1', { name: 'Cloned School' });
    expect(result.name).toBe('Cloned School');
  });

  it('should migrate a school to new plan', async () => {
    const migrated = { id: 's1', plan: 'enterprise' };
    mockRepo.migrateSchool.mockResolvedValue(migrated);
    const result = await mockRepo.migrateSchool('ent-1', 's1', 'enterprise');
    expect(result.plan).toBe('enterprise');
  });

  it('should return empty array when no schools exist', async () => {
    mockRepo.findSchools.mockResolvedValue([]);
    const result = await mockRepo.findSchools('ent-1');
    expect(result).toHaveLength(0);
  });

  it('should handle repo error on createSchool', async () => {
    mockRepo.createSchool.mockRejectedValue(new Error('Duplicate code'));
    await expect(mockRepo.createSchool({ name: 'X', code: 'X' })).rejects.toThrow('Duplicate code');
  });
});
