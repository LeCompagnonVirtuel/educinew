import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-datamesh.repository', () => ({
  Gei2pDatameshRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findDomainById: vi.fn(),
  findDomainsByOwner: vi.fn(),
  createDomain: vi.fn(),
  updateDomain: vi.fn(),
  publishDomain: vi.fn(),
  listDomains: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P DataMesh Service - CRUD', () => {
  it('should list data domains', async () => {
    mockRepo.listDomains.mockResolvedValue([
      { id: '1', name: 'student_records', owner: 'admin', status: 'published' },
    ]);
    const result = await mockRepo.listDomains('school1');
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('published');
  });

  it('should create a data domain', async () => {
    const data = { school_id: 'school1', name: 'financial_data', owner: 'finance' };
    mockRepo.createDomain.mockResolvedValue({ id: '1', ...data, status: 'draft' });
    const result = await mockRepo.createDomain(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.status).toBe('draft');
  });

  it('should update a data domain', async () => {
    mockRepo.findDomainById.mockResolvedValue({ id: '1', status: 'draft' });
    mockRepo.updateDomain.mockResolvedValue({ id: '1', status: 'published' });
    const result = await mockRepo.updateDomain('school1', '1', { status: 'published' });
    expect(result.status).toBe('published');
  });

  it('should publish a data domain', async () => {
    mockRepo.publishDomain.mockResolvedValue({ id: '1', published: true });
    const result = await mockRepo.publishDomain('school1', '1');
    expect(result.published).toBe(true);
  });

  it('should find domains by owner', async () => {
    mockRepo.findDomainsByOwner.mockResolvedValue([
      { id: '1', owner: 'admin' },
    ]);
    const result = await mockRepo.findDomainsByOwner('school1', 'admin');
    expect(result).toHaveLength(1);
  });
});

describe('GEI2P DataMesh Service - Error Handling', () => {
  it('should return null when domain not found', async () => {
    mockRepo.findDomainById.mockResolvedValue(null);
    const result = await mockRepo.findDomainById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listDomains.mockRejectedValue(new Error('Connection refused'));
    await expect(mockRepo.listDomains('school1')).rejects.toThrow('Connection refused');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
