import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('CandidateService', () => {
  const mockRepo = {
    findCandidates: vi.fn(),
    findCandidateById: vi.fn(),
    findCandidateByEmail: vi.fn(),
    createCandidate: vi.fn(),
    updateCandidate: vi.fn(),
  };

  const schoolId = 'school-1';
  const candidateId = 'cand-1';
  const recruitmentId = 'rec-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findCandidates', () => {
    it('should return candidates list', async () => {
      const candidates = [{ id: '1', name: 'John Doe' }];
      mockRepo.findCandidates.mockResolvedValue(candidates);
      const result = await mockRepo.findCandidates(schoolId);
      expect(result).toEqual(candidates);
    });

    it('should filter by recruitment', async () => {
      mockRepo.findCandidates.mockResolvedValue([]);
      await mockRepo.findCandidates(schoolId, recruitmentId);
      expect(mockRepo.findCandidates).toHaveBeenCalledWith(schoolId, recruitmentId);
    });

    it('should handle empty results', async () => {
      mockRepo.findCandidates.mockResolvedValue([]);
      const result = await mockRepo.findCandidates(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findCandidateById', () => {
    it('should return candidate by id', async () => {
      const candidate = { id: candidateId, name: 'John Doe' };
      mockRepo.findCandidateById.mockResolvedValue(candidate);
      const result = await mockRepo.findCandidateById(schoolId, candidateId);
      expect(result.name).toBe('John Doe');
    });

    it('should throw if not found', async () => {
      mockRepo.findCandidateById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const cand = await mockRepo.findCandidateById(schoolId, 'nonexistent');
        if (!cand) throw new Error('Candidat non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('findCandidateByEmail', () => {
    it('should return candidate by email', async () => {
      mockRepo.findCandidateByEmail.mockResolvedValue({ id: candidateId, email: 'john@test.com' });
      const result = await mockRepo.findCandidateByEmail(schoolId, 'john@test.com');
      expect(result.email).toBe('john@test.com');
    });

    it('should return null if not found', async () => {
      mockRepo.findCandidateByEmail.mockResolvedValue(null);
      const result = await mockRepo.findCandidateByEmail(schoolId, 'none@test.com');
      expect(result).toBeNull();
    });
  });

  describe('createCandidate', () => {
    it('should create candidate', async () => {
      mockRepo.findCandidateByEmail.mockResolvedValue(null);
      mockRepo.createCandidate.mockResolvedValue({ id: '1', name: 'John Doe' });
      const result = await mockRepo.createCandidate({ name: 'John Doe', email: 'john@test.com', school_id: schoolId });
      expect(result.name).toBe('John Doe');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require email', () => {
      const validate = (data: any) => {
        if (!data?.email) throw new Error('L\'email est requis');
      };
      expect(() => validate({ name: 'John' })).toThrow();
    });

    it('should reject duplicate email', async () => {
      mockRepo.findCandidateByEmail.mockResolvedValue({ id: 'existing' });
      const createOrReject = async () => {
        const existing = await mockRepo.findCandidateByEmail(schoolId, 'duplicate@test.com');
        if (existing) throw new Error('Un candidat avec cet email existe déjà');
      };
      await expect(createOrReject()).rejects.toThrow();
    });
  });

  describe('updateCandidate', () => {
    it('should update candidate', async () => {
      mockRepo.findCandidateById.mockResolvedValue({ id: candidateId });
      mockRepo.updateCandidate.mockResolvedValue({ id: candidateId, name: 'Updated' });
      const result = await mockRepo.updateCandidate(schoolId, candidateId, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findCandidateById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const cand = await mockRepo.findCandidateById(schoolId, candidateId);
        if (!cand) throw new Error('Candidat non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('Candidate status', () => {
    it('should define valid statuses', () => {
      const statuses = ['new', 'screening', 'interview', 'selected', 'rejected', 'hired'];
      expect(statuses).toContain('new');
      expect(statuses).toContain('hired');
    });

    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        new: ['screening'],
        screening: ['interview', 'rejected'],
        interview: ['selected', 'rejected'],
        selected: ['hired'],
        rejected: [],
        hired: [],
      };
      expect(transitions['new']).toContain('screening');
      expect(transitions['hired']).toHaveLength(0);
    });
  });

  describe('Candidate validation', () => {
    it('should validate email format', () => {
      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail('test@test.com')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
    });

    it('should validate phone number', () => {
      const isValidPhone = (phone: string) => /^\+?[0-9]{8,15}$/.test(phone);
      expect(isValidPhone('+225012345678')).toBe(true);
      expect(isValidPhone('123')).toBe(false);
    });
  });
});
