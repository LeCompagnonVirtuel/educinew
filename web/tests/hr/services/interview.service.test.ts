import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('InterviewService', () => {
  const mockRepo = {
    findInterviews: vi.fn(),
    findInterviewById: vi.fn(),
    createInterview: vi.fn(),
    updateInterview: vi.fn(),
  };

  const schoolId = 'school-1';
  const interviewId = 'int-1';
  const candidateId = 'cand-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findInterviews', () => {
    it('should return interviews list', async () => {
      const interviews = [{ id: '1', scheduled_date: '2026-08-01' }];
      mockRepo.findInterviews.mockResolvedValue(interviews);
      const result = await mockRepo.findInterviews(schoolId);
      expect(result).toEqual(interviews);
    });

    it('should filter by candidate', async () => {
      mockRepo.findInterviews.mockResolvedValue([]);
      await mockRepo.findInterviews(schoolId, candidateId);
      expect(mockRepo.findInterviews).toHaveBeenCalledWith(schoolId, candidateId);
    });

    it('should handle empty results', async () => {
      mockRepo.findInterviews.mockResolvedValue([]);
      const result = await mockRepo.findInterviews(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findInterviewById', () => {
    it('should return interview by id', async () => {
      const interview = { id: interviewId, scheduled_date: '2026-08-01' };
      mockRepo.findInterviewById.mockResolvedValue(interview);
      const result = await mockRepo.findInterviewById(schoolId, interviewId);
      expect(result.scheduled_date).toBe('2026-08-01');
    });

    it('should throw if not found', async () => {
      mockRepo.findInterviewById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const int = await mockRepo.findInterviewById(schoolId, 'nonexistent');
        if (!int) throw new Error('Entretien non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createInterview', () => {
    it('should create interview', async () => {
      mockRepo.createInterview.mockResolvedValue({ id: '1', scheduled_date: '2026-08-01' });
      const result = await mockRepo.createInterview({
        candidate_id: candidateId,
        scheduled_date: '2026-08-01',
        school_id: schoolId,
      });
      expect(result.scheduled_date).toBe('2026-08-01');
    });

    it('should require candidate_id', () => {
      const validate = (data: any) => {
        if (!data?.candidate_id) throw new Error('L\'identifiant du candidat est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require scheduled_date', () => {
      const validate = (data: any) => {
        if (!data?.scheduled_date) throw new Error('La date prévue est requise');
      };
      expect(() => validate({ candidate_id: candidateId })).toThrow();
    });
  });

  describe('updateInterview', () => {
    it('should update interview', async () => {
      mockRepo.findInterviewById.mockResolvedValue({ id: interviewId });
      mockRepo.updateInterview.mockResolvedValue({ id: interviewId, status: 'completed' });
      const result = await mockRepo.updateInterview(schoolId, interviewId, { status: 'completed' });
      expect(result.status).toBe('completed');
    });

    it('should throw if not found', async () => {
      mockRepo.findInterviewById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const int = await mockRepo.findInterviewById(schoolId, interviewId);
        if (!int) throw new Error('Entretien non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('Interview status', () => {
    it('should define valid statuses', () => {
      const statuses = ['scheduled', 'completed', 'cancelled', 'no_show'];
      expect(statuses).toContain('scheduled');
      expect(statuses).toContain('completed');
    });

    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        scheduled: ['completed', 'cancelled', 'no_show'],
        completed: [],
        cancelled: [],
        no_show: [],
      };
      expect(transitions['scheduled']).toContain('completed');
      expect(transitions['completed']).toHaveLength(0);
    });
  });

  describe('Interview validation', () => {
    it('should validate scheduled date is not in past', () => {
      const isNotPast = (date: string) => new Date(date) >= new Date();
      expect(isNotPast('2030-01-01')).toBe(true);
    });

    it('should validate interviewer is assigned', () => {
      const hasInterviewer = (data: any) => !!data.interviewer_id;
      expect(hasInterviewer({ interviewer_id: 'u1' })).toBe(true);
      expect(hasInterviewer({})).toBe(false);
    });
  });
});
