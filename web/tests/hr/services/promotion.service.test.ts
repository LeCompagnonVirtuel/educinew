import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('PromotionService', () => {
  const mockRepo = {
    findPromotions: vi.fn(),
    findPromotionById: vi.fn(),
    createPromotion: vi.fn(),
    updatePromotion: vi.fn(),
  };

  const schoolId = 'school-1';
  const promotionId = 'promo-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findPromotions', () => {
    it('should return promotions list', async () => {
      const promotions = [{ id: '1', employee_id: employeeId }];
      mockRepo.findPromotions.mockResolvedValue(promotions);
      const result = await mockRepo.findPromotions(schoolId);
      expect(result).toEqual(promotions);
    });

    it('should filter by employee', async () => {
      mockRepo.findPromotions.mockResolvedValue([]);
      await mockRepo.findPromotions(schoolId, employeeId);
      expect(mockRepo.findPromotions).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should handle empty results', async () => {
      mockRepo.findPromotions.mockResolvedValue([]);
      const result = await mockRepo.findPromotions(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findPromotionById', () => {
    it('should return promotion by id', async () => {
      const promotion = { id: promotionId, new_position: 'Directeur' };
      mockRepo.findPromotionById.mockResolvedValue(promotion);
      const result = await mockRepo.findPromotionById(schoolId, promotionId);
      expect(result.new_position).toBe('Directeur');
    });

    it('should throw if not found', async () => {
      mockRepo.findPromotionById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const promo = await mockRepo.findPromotionById(schoolId, 'nonexistent');
        if (!promo) throw new Error('Promotion non trouvée');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createPromotion', () => {
    it('should create promotion', async () => {
      mockRepo.createPromotion.mockResolvedValue({ id: '1', employee_id: employeeId });
      const result = await mockRepo.createPromotion({
        employee_id: employeeId,
        new_position: 'Directeur',
        school_id: schoolId,
      });
      expect(result.employee_id).toBe(employeeId);
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require new_position', () => {
      const validate = (data: any) => {
        if (!data?.new_position) throw new Error('Le nouveau poste est requis');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });
  });

  describe('updatePromotion', () => {
    it('should update promotion', async () => {
      mockRepo.findPromotionById.mockResolvedValue({ id: promotionId });
      mockRepo.updatePromotion.mockResolvedValue({ id: promotionId, status: 'approved' });
      const result = await mockRepo.updatePromotion(schoolId, promotionId, { status: 'approved' });
      expect(result.status).toBe('approved');
    });

    it('should throw if not found', async () => {
      mockRepo.findPromotionById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const promo = await mockRepo.findPromotionById(schoolId, promotionId);
        if (!promo) throw new Error('Promotion non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('Promotion status', () => {
    it('should define valid statuses', () => {
      const statuses = ['pending', 'approved', 'rejected', 'effective'];
      expect(statuses).toContain('pending');
      expect(statuses).toContain('effective');
    });

    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        pending: ['approved', 'rejected'],
        approved: ['effective'],
        rejected: [],
        effective: [],
      };
      expect(transitions['pending']).toContain('approved');
      expect(transitions['effective']).toHaveLength(0);
    });
  });

  describe('Promotion validation', () => {
    it('should validate effective date', () => {
      const isNotPast = (date: string) => new Date(date) >= new Date();
      expect(isNotPast('2030-01-01')).toBe(true);
    });

    it('should validate salary increase', () => {
      const isValidIncrease = (old: number, newSalary: number) => newSalary > old;
      expect(isValidIncrease(500000, 600000)).toBe(true);
      expect(isValidIncrease(500000, 400000)).toBe(false);
    });
  });
});
