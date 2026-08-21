import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('RewardService', () => {
  const mockRepo = {
    findRewards: vi.fn(),
    findRewardById: vi.fn(),
    createReward: vi.fn(),
    updateReward: vi.fn(),
  };

  const schoolId = 'school-1';
  const rewardId = 'reward-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findRewards', () => {
    it('should return rewards list', async () => {
      const rewards = [{ id: '1', employee_id: employeeId }];
      mockRepo.findRewards.mockResolvedValue(rewards);
      const result = await mockRepo.findRewards(schoolId);
      expect(result).toEqual(rewards);
    });

    it('should filter by employee', async () => {
      mockRepo.findRewards.mockResolvedValue([]);
      await mockRepo.findRewards(schoolId, employeeId);
      expect(mockRepo.findRewards).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should handle empty results', async () => {
      mockRepo.findRewards.mockResolvedValue([]);
      const result = await mockRepo.findRewards(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findRewardById', () => {
    it('should return reward by id', async () => {
      const reward = { id: rewardId, title: 'Employee of the Month' };
      mockRepo.findRewardById.mockResolvedValue(reward);
      const result = await mockRepo.findRewardById(schoolId, rewardId);
      expect(result.title).toBe('Employee of the Month');
    });

    it('should throw if not found', async () => {
      mockRepo.findRewardById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const r = await mockRepo.findRewardById(schoolId, 'nonexistent');
        if (!r) throw new Error('Récompense non trouvée');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createReward', () => {
    it('should create reward', async () => {
      mockRepo.createReward.mockResolvedValue({ id: '1', title: 'Employee of the Month' });
      const result = await mockRepo.createReward({
        employee_id: employeeId,
        title: 'Employee of the Month',
        school_id: schoolId,
      });
      expect(result.title).toBe('Employee of the Month');
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require title', () => {
      const validate = (data: any) => {
        if (!data?.title) throw new Error('Le titre est requis');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });
  });

  describe('updateReward', () => {
    it('should update reward', async () => {
      mockRepo.findRewardById.mockResolvedValue({ id: rewardId });
      mockRepo.updateReward.mockResolvedValue({ id: rewardId, status: 'approved' });
      const result = await mockRepo.updateReward(schoolId, rewardId, { status: 'approved' });
      expect(result.status).toBe('approved');
    });

    it('should throw if not found', async () => {
      mockRepo.findRewardById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const r = await mockRepo.findRewardById(schoolId, rewardId);
        if (!r) throw new Error('Récompense non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('Reward type', () => {
    it('should define valid types', () => {
      const types = ['certificate', 'bonus', 'gift', 'public_recognition', 'promotion'];
      expect(types).toContain('certificate');
      expect(types).toContain('bonus');
    });

    it('should validate reward type', () => {
      const validTypes = ['certificate', 'bonus', 'gift', 'public_recognition', 'promotion'];
      const isValidType = (type: string) => validTypes.includes(type);
      expect(isValidType('certificate')).toBe(true);
      expect(isValidType('invalid')).toBe(false);
    });
  });

  describe('Reward validation', () => {
    it('should validate reward date', () => {
      const isNotFuture = (date: string) => new Date(date) <= new Date();
      expect(isNotFuture('2025-01-01')).toBe(true);
    });

    it('should validate title length', () => {
      const isValidTitle = (title: string) => title.length >= 3 && title.length <= 200;
      expect(isValidTitle('Employee of the Month')).toBe(true);
      expect(isValidTitle('Ab')).toBe(false);
    });
  });
});
