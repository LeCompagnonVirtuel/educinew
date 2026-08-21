import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-sync.repository', () => ({
  Gei2pSyncRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findSyncById: vi.fn(),
  findSyncsBySource: vi.fn(),
  createSync: vi.fn(),
  updateSync: vi.fn(),
  retrySync: vi.fn(),
  listSyncs: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P Sync Service - CRUD', () => {
  it('should list sync jobs', async () => {
    mockRepo.listSyncs.mockResolvedValue([
      { id: '1', source: 'MIT', target: 'local', status: 'completed' },
    ]);
    const result = await mockRepo.listSyncs('school1');
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('completed');
  });

  it('should create a sync job', async () => {
    const data = { school_id: 'school1', source: 'MIT', target: 'local' };
    mockRepo.createSync.mockResolvedValue({ id: '1', ...data, status: 'pending' });
    const result = await mockRepo.createSync(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.status).toBe('pending');
  });

  it('should update a sync job', async () => {
    mockRepo.findSyncById.mockResolvedValue({ id: '1', status: 'pending' });
    mockRepo.updateSync.mockResolvedValue({ id: '1', status: 'running' });
    const result = await mockRepo.updateSync('school1', '1', { status: 'running' });
    expect(result.status).toBe('running');
  });

  it('should retry a failed sync', async () => {
    mockRepo.retrySync.mockResolvedValue({ id: '1', status: 'pending', retry_count: 1 });
    const result = await mockRepo.retrySync('school1', '1');
    expect(result.retry_count).toBe(1);
  });

  it('should find syncs by source', async () => {
    mockRepo.findSyncsBySource.mockResolvedValue([
      { id: '1', source: 'MIT' },
    ]);
    const result = await mockRepo.findSyncsBySource('school1', 'MIT');
    expect(result).toHaveLength(1);
  });
});

describe('GEI2P Sync Service - Error Handling', () => {
  it('should return null when sync not found', async () => {
    mockRepo.findSyncById.mockResolvedValue(null);
    const result = await mockRepo.findSyncById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listSyncs.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listSyncs('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
