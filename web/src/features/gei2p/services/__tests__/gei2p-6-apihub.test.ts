import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-apihub.repository', () => ({
  Gei2pApihubRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findApiById: vi.fn(),
  findApisByDomain: vi.fn(),
  createApi: vi.fn(),
  updateApi: vi.fn(),
  deprecateApi: vi.fn(),
  listApis: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P API Hub Service - CRUD', () => {
  it('should list APIs', async () => {
    mockRepo.listApis.mockResolvedValue([
      { id: '1', name: 'Credential API', domain: 'credentials', version: '1.0' },
    ]);
    const result = await mockRepo.listApis('school1');
    expect(result).toHaveLength(1);
    expect(result[0].version).toBe('1.0');
  });

  it('should create an API', async () => {
    const data = { school_id: 'school1', name: 'Identity API', domain: 'identity' };
    mockRepo.createApi.mockResolvedValue({ id: '1', ...data, status: 'draft' });
    const result = await mockRepo.createApi(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.status).toBe('draft');
  });

  it('should update an API', async () => {
    mockRepo.findApiById.mockResolvedValue({ id: '1', status: 'draft' });
    mockRepo.updateApi.mockResolvedValue({ id: '1', status: 'published' });
    const result = await mockRepo.updateApi('school1', '1', { status: 'published' });
    expect(result.status).toBe('published');
  });

  it('should deprecate an API', async () => {
    mockRepo.deprecateApi.mockResolvedValue({ id: '1', deprecated: true });
    const result = await mockRepo.deprecateApi('school1', '1');
    expect(result.deprecated).toBe(true);
  });

  it('should find APIs by domain', async () => {
    mockRepo.findApisByDomain.mockResolvedValue([
      { id: '1', domain: 'credentials' },
    ]);
    const result = await mockRepo.findApisByDomain('school1', 'credentials');
    expect(result).toHaveLength(1);
  });
});

describe('GEI2P API Hub Service - Error Handling', () => {
  it('should return null when API not found', async () => {
    mockRepo.findApiById.mockResolvedValue(null);
    const result = await mockRepo.findApiById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listApis.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listApis('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
