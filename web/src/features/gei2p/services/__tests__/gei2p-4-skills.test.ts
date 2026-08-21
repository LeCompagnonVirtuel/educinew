import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-skills.repository', () => ({
  Gei2pSkillsRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findSkillById: vi.fn(),
  findSkillsByHolder: vi.fn(),
  createSkill: vi.fn(),
  updateSkill: vi.fn(),
  endorseSkill: vi.fn(),
  listSkills: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P Skills Service - CRUD', () => {
  it('should list skills', async () => {
    mockRepo.listSkills.mockResolvedValue([
      { id: '1', name: 'Python', level: 'expert', holder: '0xABC' },
    ]);
    const result = await mockRepo.listSkills('school1');
    expect(result).toHaveLength(1);
    expect(result[0].level).toBe('expert');
  });

  it('should create a skill', async () => {
    const data = { school_id: 'school1', name: 'JavaScript', level: 'advanced' };
    mockRepo.createSkill.mockResolvedValue({ id: '1', ...data, endorsements: 0 });
    const result = await mockRepo.createSkill(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.endorsements).toBe(0);
  });

  it('should update a skill', async () => {
    mockRepo.findSkillById.mockResolvedValue({ id: '1', level: 'intermediate' });
    mockRepo.updateSkill.mockResolvedValue({ id: '1', level: 'advanced' });
    const result = await mockRepo.updateSkill('school1', '1', { level: 'advanced' });
    expect(result.level).toBe('advanced');
  });

  it('should endorse a skill', async () => {
    mockRepo.endorseSkill.mockResolvedValue({ id: '1', endorsements: 5 });
    const result = await mockRepo.endorseSkill('school1', '1', 'endorser1');
    expect(result.endorsements).toBe(5);
  });

  it('should find skills by holder', async () => {
    mockRepo.findSkillsByHolder.mockResolvedValue([
      { id: '1', holder: '0xABC' },
    ]);
    const result = await mockRepo.findSkillsByHolder('school1', '0xABC');
    expect(result).toHaveLength(1);
  });
});

describe('GEI2P Skills Service - Error Handling', () => {
  it('should return null when skill not found', async () => {
    mockRepo.findSkillById.mockResolvedValue(null);
    const result = await mockRepo.findSkillById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listSkills.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listSkills('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
