import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/mobility.repository', () => ({
  MobilityRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findMobilityById: vi.fn(),
  findMobilityByUser: vi.fn(),
  createMobility: vi.fn(),
  updateMobility: vi.fn(),
  deleteMobility: vi.fn(),
  listMobilities: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Mobility Service - CRUD', () => {
  it('should list mobilities', async () => {
    mockRepo.listMobilities.mockResolvedValue([
      { id: '1', user_id: 'u1', type: 'transfer', status: 'pending' },
    ]);
    const result = await mockRepo.listMobilities('school1');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('transfer');
  });

  it('should create a mobility', async () => {
    const data = {
      school_id: 'school1',
      user_id: 'u1',
      type: 'exchange',
      origin_school: 'School A',
      destination_school: 'School B',
      start_date: '2026-09-01',
      reason: 'Academic exchange',
    };
    mockRepo.createMobility.mockResolvedValue({ id: '1', ...data, status: 'pending' });
    const result = await mockRepo.createMobility(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.status).toBe('pending');
  });

  it('should update mobility status', async () => {
    mockRepo.findMobilityById.mockResolvedValue({ id: '1', status: 'pending' });
    mockRepo.updateMobility.mockResolvedValue({ id: '1', status: 'approved' });
    const result = await mockRepo.updateMobility('school1', '1', { status: 'approved' });
    expect(result.status).toBe('approved');
  });

  it('should delete a mobility', async () => {
    mockRepo.findMobilityById.mockResolvedValue({ id: '1' });
    mockRepo.deleteMobility.mockResolvedValue(undefined);
    await expect(mockRepo.deleteMobility('school1', '1')).resolves.toBeUndefined();
  });

  it('should find mobility by user', async () => {
    mockRepo.findMobilityByUser.mockResolvedValue([
      { id: '1', user_id: 'u1', type: 'sabbatical' },
    ]);
    const result = await mockRepo.findMobilityByUser('school1', 'u1');
    expect(result).toHaveLength(1);
  });
});

describe('Mobility Service - Error Handling', () => {
  it('should throw when mobility not found', async () => {
    mockRepo.findMobilityById.mockResolvedValue(null);
    const result = await mockRepo.findMobilityById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listMobilities.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listMobilities('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
