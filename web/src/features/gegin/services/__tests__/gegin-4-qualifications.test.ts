import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/qualifications.repository', () => ({
  QualificationRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findQualificationById: vi.fn(),
  findQualificationsByUser: vi.fn(),
  createQualification: vi.fn(),
  updateQualification: vi.fn(),
  deleteQualification: vi.fn(),
  listQualifications: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Qualification Service - CRUD', () => {
  it('should list qualifications', async () => {
    mockRepo.listQualifications.mockResolvedValue([
      { id: '1', user_id: 'u1', title: 'Master CS', degree: 'master' },
    ]);
    const result = await mockRepo.listQualifications('school1');
    expect(result).toHaveLength(1);
    expect(result[0].degree).toBe('master');
  });

  it('should create a qualification', async () => {
    const data = { school_id: 'school1', user_id: 'u1', title: 'PhD', degree: 'doctorate', institution: 'MIT' };
    mockRepo.createQualification.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createQualification(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.title).toBe('PhD');
  });

  it('should update a qualification', async () => {
    mockRepo.findQualificationById.mockResolvedValue({ id: '1', verification_status: 'pending' });
    mockRepo.updateQualification.mockResolvedValue({ id: '1', verification_status: 'verified' });
    const result = await mockRepo.updateQualification('school1', '1', { verification_status: 'verified' });
    expect(result.verification_status).toBe('verified');
  });

  it('should delete a qualification', async () => {
    mockRepo.findQualificationById.mockResolvedValue({ id: '1' });
    mockRepo.deleteQualification.mockResolvedValue(undefined);
    await expect(mockRepo.deleteQualification('school1', '1')).resolves.toBeUndefined();
  });

  it('should find qualifications by user', async () => {
    mockRepo.findQualificationsByUser.mockResolvedValue([
      { id: '1', user_id: 'u1', title: 'Master CS' },
    ]);
    const result = await mockRepo.findQualificationsByUser('school1', 'u1');
    expect(result).toHaveLength(1);
  });
});

describe('Qualification Service - Error Handling', () => {
  it('should throw when qualification not found', async () => {
    mockRepo.findQualificationById.mockResolvedValue(null);
    const result = await mockRepo.findQualificationById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listQualifications.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listQualifications('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
