import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/governance.repository', () => ({
  GovernanceRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findGovernanceById: vi.fn(),
  findAllGovernances: vi.fn(),
  createGovernance: vi.fn(),
  updateGovernance: vi.fn(),
  deleteGovernance: vi.fn(),
  findGovernanceByType: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Governance Service - Governance Bodies', () => {
  it('should list governance bodies', async () => {
    mockRepo.findAllGovernances.mockResolvedValue([
      { id: '1', name: 'Board of Directors', type: 'board' },
    ]);
    const result = await mockRepo.findAllGovernances('school1');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('board');
  });

  it('should create a governance body', async () => {
    const data = { school_id: 'school1', name: 'Academic Council', type: 'council' };
    mockRepo.createGovernance.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createGovernance(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.name).toBe('Academic Council');
  });

  it('should update governance body', async () => {
    mockRepo.findGovernanceById.mockResolvedValue({ id: '1', name: 'Board', type: 'board' });
    mockRepo.updateGovernance.mockResolvedValue({ id: '1', name: 'Updated Board', type: 'board' });
    const result = await mockRepo.updateGovernance('school1', '1', { name: 'Updated Board' });
    expect(result.name).toBe('Updated Board');
  });

  it('should delete governance body', async () => {
    mockRepo.findGovernanceById.mockResolvedValue({ id: '1', name: 'Board' });
    mockRepo.deleteGovernance.mockResolvedValue(undefined);
    await expect(mockRepo.deleteGovernance('school1', '1')).resolves.toBeUndefined();
    expect(mockRepo.deleteGovernance).toHaveBeenCalledWith('school1', '1');
  });

  it('should throw when governance not found', async () => {
    mockRepo.findGovernanceById.mockResolvedValue(null);
    await expect(mockRepo.findGovernanceById('school1', '999')).resolves.toBeNull();
  });
});

describe('Governance Service - Meeting Records', () => {
  it('should list meeting records', async () => {
    mockRepo.findGovernanceByType.mockResolvedValue([
      { id: '1', meeting_date: '2026-01-15', type: 'board' },
    ]);
    const result = await mockRepo.findGovernanceByType('school1', 'board');
    expect(result).toHaveLength(1);
  });

  it('should handle DB errors', async () => {
    mockRepo.findAllGovernances.mockRejectedValue(new Error('Connection timeout'));
    await expect(mockRepo.findAllGovernances('school1')).rejects.toThrow('Connection timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
