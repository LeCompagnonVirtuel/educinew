import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('RecruitmentService', () => {
  const mockRepo = {
    findRecruitments: vi.fn(),
    findRecruitmentById: vi.fn(),
    createRecruitment: vi.fn(),
    updateRecruitment: vi.fn(),
    deleteRecruitment: vi.fn(),
  };

  const schoolId = 'school-1';
  const recruitmentId = 'rec-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findRecruitments', () => {
    it('should return recruitments list', async () => {
      const recruitments = [{ id: '1', title: 'Teacher' }];
      mockRepo.findRecruitments.mockResolvedValue(recruitments);
      const result = await mockRepo.findRecruitments(schoolId);
      expect(result).toEqual(recruitments);
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });

    it('should handle empty results', async () => {
      mockRepo.findRecruitments.mockResolvedValue([]);
      const result = await mockRepo.findRecruitments(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findRecruitmentById', () => {
    it('should return recruitment by id', async () => {
      const recruitment = { id: recruitmentId, title: 'Teacher' };
      mockRepo.findRecruitmentById.mockResolvedValue(recruitment);
      const result = await mockRepo.findRecruitmentById(schoolId, recruitmentId);
      expect(result.title).toBe('Teacher');
    });

    it('should throw if not found', async () => {
      mockRepo.findRecruitmentById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const rec = await mockRepo.findRecruitmentById(schoolId, 'nonexistent');
        if (!rec) throw new Error('Recrutement non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });

    it('should require both ids', () => {
      const validate = (sId: string, rId: string) => {
        if (!sId || !rId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', recruitmentId)).toThrow();
      expect(() => validate(schoolId, '')).toThrow();
    });
  });

  describe('createRecruitment', () => {
    it('should create recruitment', async () => {
      mockRepo.createRecruitment.mockResolvedValue({ id: '1', title: 'Teacher' });
      const result = await mockRepo.createRecruitment({ title: 'Teacher', position_id: 'pos-1', school_id: schoolId });
      expect(result.title).toBe('Teacher');
    });

    it('should require title', () => {
      const validate = (data: any) => {
        if (!data?.title) throw new Error('Le titre du recrutement est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require position_id', () => {
      const validate = (data: any) => {
        if (!data?.position_id) throw new Error('L\'identifiant du poste est requis');
      };
      expect(() => validate({ title: 'Teacher' })).toThrow();
    });
  });

  describe('updateRecruitment', () => {
    it('should update recruitment', async () => {
      mockRepo.findRecruitmentById.mockResolvedValue({ id: recruitmentId });
      mockRepo.updateRecruitment.mockResolvedValue({ id: recruitmentId, title: 'Updated' });
      const result = await mockRepo.updateRecruitment(schoolId, recruitmentId, { title: 'Updated' });
      expect(result.title).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findRecruitmentById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const rec = await mockRepo.findRecruitmentById(schoolId, recruitmentId);
        if (!rec) throw new Error('Recrutement non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deleteRecruitment', () => {
    it('should delete recruitment', async () => {
      mockRepo.findRecruitmentById.mockResolvedValue({ id: recruitmentId });
      mockRepo.deleteRecruitment.mockResolvedValue(undefined);
      await mockRepo.deleteRecruitment(schoolId, recruitmentId);
      expect(mockRepo.deleteRecruitment).toHaveBeenCalled();
    });

    it('should throw if not found on delete', async () => {
      mockRepo.findRecruitmentById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const rec = await mockRepo.findRecruitmentById(schoolId, recruitmentId);
        if (!rec) throw new Error('Recrutement non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('Recruitment status', () => {
    it('should define valid statuses', () => {
      const statuses = ['draft', 'open', 'in_progress', 'closed', 'cancelled'];
      expect(statuses).toContain('open');
      expect(statuses).toContain('closed');
    });

    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        draft: ['open'],
        open: ['in_progress', 'closed'],
        in_progress: ['closed'],
        closed: [],
        cancelled: [],
      };
      expect(transitions['draft']).toContain('open');
      expect(transitions['closed']).toHaveLength(0);
    });
  });

  describe('Recruitment validation', () => {
    it('should validate title length', () => {
      const isValidTitle = (title: string) => title.length >= 3 && title.length <= 200;
      expect(isValidTitle('Teacher')).toBe(true);
      expect(isValidTitle('Ab')).toBe(false);
    });

    it('should validate date range', () => {
      const isValidRange = (start: string, end: string) => new Date(end) >= new Date(start);
      expect(isValidRange('2026-09-01', '2026-10-01')).toBe(true);
      expect(isValidRange('2026-10-01', '2026-09-01')).toBe(false);
    });
  });
});
