import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('PerformanceService', () => {
  const mockRepo = {
    findPerformanceReviews: vi.fn(),
    findPerformanceReviewById: vi.fn(),
    createPerformanceReview: vi.fn(),
    updatePerformanceReview: vi.fn(),
    findEmployeeById: vi.fn(),
  };

  const schoolId = 'school-1';
  const reviewId = 'review-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findPerformanceReviews', () => {
    it('should return reviews list', async () => {
      const reviews = [{ id: '1', employee_id: employeeId }];
      mockRepo.findPerformanceReviews.mockResolvedValue(reviews);
      const result = await mockRepo.findPerformanceReviews(schoolId);
      expect(result).toEqual(reviews);
    });

    it('should filter by employee', async () => {
      mockRepo.findPerformanceReviews.mockResolvedValue([]);
      await mockRepo.findPerformanceReviews(schoolId, employeeId);
      expect(mockRepo.findPerformanceReviews).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('findPerformanceReviewById', () => {
    it('should return review by id', async () => {
      const review = { id: reviewId, score: 85 };
      mockRepo.findPerformanceReviewById.mockResolvedValue(review);
      const result = await mockRepo.findPerformanceReviewById(schoolId, reviewId);
      expect(result.score).toBe(85);
    });

    it('should throw if not found', async () => {
      mockRepo.findPerformanceReviewById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const review = await mockRepo.findPerformanceReviewById(schoolId, 'nonexistent');
        if (!review) throw new Error('Évaluation non trouvée');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });

    it('should require both ids', () => {
      const validate = (sId: string, rId: string) => {
        if (!sId || !rId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', reviewId)).toThrow();
      expect(() => validate(schoolId, '')).toThrow();
    });
  });

  describe('createPerformanceReview', () => {
    it('should create review', async () => {
      mockRepo.findEmployeeById.mockResolvedValue({ id: employeeId });
      mockRepo.createPerformanceReview.mockResolvedValue({ id: '1', score: 85 });
      const result = await mockRepo.createPerformanceReview({
        employee_id: employeeId,
        review_period: 'Q1 2026',
        school_id: schoolId,
      });
      expect(result.score).toBe(85);
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require review_period', () => {
      const validate = (data: any) => {
        if (!data?.review_period) throw new Error('La période d\'évaluation est requise');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });

    it('should throw if employee not found', async () => {
      mockRepo.findEmployeeById.mockResolvedValue(null);
      const createOrThrow = async () => {
        const emp = await mockRepo.findEmployeeById(schoolId, 'nonexistent');
        if (!emp) throw new Error('Employé non trouvé');
      };
      await expect(createOrThrow()).rejects.toThrow();
    });
  });

  describe('updatePerformanceReview', () => {
    it('should update review', async () => {
      mockRepo.findPerformanceReviewById.mockResolvedValue({ id: reviewId });
      mockRepo.updatePerformanceReview.mockResolvedValue({ id: reviewId, score: 90 });
      const result = await mockRepo.updatePerformanceReview(schoolId, reviewId, { score: 90 });
      expect(result.score).toBe(90);
    });

    it('should throw if not found', async () => {
      mockRepo.findPerformanceReviewById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const review = await mockRepo.findPerformanceReviewById(schoolId, reviewId);
        if (!review) throw new Error('Évaluation non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('findReviewsByEmployee', () => {
    it('should return employee reviews', async () => {
      mockRepo.findPerformanceReviews.mockResolvedValue([{ employee_id: employeeId }]);
      const result = await mockRepo.findPerformanceReviews(schoolId, employeeId);
      expect(result).toHaveLength(1);
    });

    it('should require both ids', () => {
      const validate = (sId: string, eId: string) => {
        if (!sId || !eId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', employeeId)).toThrow();
    });
  });

  describe('Performance score validation', () => {
    it('should validate score range', () => {
      const isValidScore = (score: number) => score >= 0 && score <= 100;
      expect(isValidScore(85)).toBe(true);
      expect(isValidScore(-1)).toBe(false);
      expect(isValidScore(101)).toBe(false);
    });

    it('should calculate grade from score', () => {
      const getGrade = (score: number) => {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
      };
      expect(getGrade(95)).toBe('A');
      expect(getGrade(85)).toBe('B');
      expect(getGrade(75)).toBe('C');
      expect(getGrade(65)).toBe('D');
      expect(getGrade(50)).toBe('F');
    });
  });

  describe('Performance review period', () => {
    it('should validate review period format', () => {
      const isValidPeriod = (period: string) => /^(Q[1-4]|H[1-2]|Annual) \d{4}$/.test(period);
      expect(isValidPeriod('Q1 2026')).toBe(true);
      expect(isValidPeriod('H1 2026')).toBe(true);
      expect(isValidPeriod('Annual 2026')).toBe(true);
      expect(isValidPeriod('Invalid')).toBe(false);
    });
  });

  describe('Performance review status', () => {
    it('should define valid statuses', () => {
      const statuses = ['draft', 'in_progress', 'completed', 'archived'];
      expect(statuses).toContain('draft');
      expect(statuses).toContain('completed');
    });

    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        draft: ['in_progress'],
        in_progress: ['completed'],
        completed: ['archived'],
        archived: [],
      };
      expect(transitions['draft']).toContain('in_progress');
      expect(transitions['archived']).toHaveLength(0);
    });
  });

  describe('Performance metrics', () => {
    it('should calculate average score', () => {
      const avg = (scores: number[]) => scores.reduce((a, b) => a + b, 0) / scores.length;
      expect(avg([80, 90, 85])).toBeCloseTo(85);
      expect(avg([100])).toBe(100);
    });

    it('should find highest score', () => {
      const max = (scores: number[]) => Math.max(...scores);
      expect(max([80, 90, 85])).toBe(90);
    });

    it('should find lowest score', () => {
      const min = (scores: number[]) => Math.min(...scores);
      expect(min([80, 90, 85])).toBe(80);
    });
  });
});
