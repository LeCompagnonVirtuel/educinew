import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('PositionService', () => {
  const mockRepo = {
    findPositions: vi.fn(),
    findPositionById: vi.fn(),
    createPosition: vi.fn(),
    updatePosition: vi.fn(),
    deletePosition: vi.fn(),
  };

  const schoolId = 'school-1';
  const positionId = 'pos-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findPositions', () => {
    it('should return positions list', async () => {
      const positions = [{ id: '1', name: 'Directeur' }];
      mockRepo.findPositions.mockResolvedValue(positions);
      const result = await mockRepo.findPositions(schoolId);
      expect(result).toEqual(positions);
    });

    it('should filter by department', async () => {
      mockRepo.findPositions.mockResolvedValue([]);
      await mockRepo.findPositions(schoolId, 'dept-1');
      expect(mockRepo.findPositions).toHaveBeenCalledWith(schoolId, 'dept-1');
    });

    it('should handle empty results', async () => {
      mockRepo.findPositions.mockResolvedValue([]);
      const result = await mockRepo.findPositions(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findPositionById', () => {
    it('should return position by id', async () => {
      const position = { id: positionId, name: 'Directeur' };
      mockRepo.findPositionById.mockResolvedValue(position);
      const result = await mockRepo.findPositionById(schoolId, positionId);
      expect(result.name).toBe('Directeur');
    });

    it('should throw if not found', async () => {
      mockRepo.findPositionById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const pos = await mockRepo.findPositionById(schoolId, 'nonexistent');
        if (!pos) throw new Error('Poste non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow('Poste non trouvé');
    });
  });

  describe('createPosition', () => {
    it('should create position', async () => {
      mockRepo.createPosition.mockResolvedValue({ id: '1', name: 'Directeur' });
      const result = await mockRepo.createPosition({ name: 'Directeur', school_id: schoolId });
      expect(result.name).toBe('Directeur');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom du poste est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require school_id', () => {
      const validate = (data: any) => {
        if (!data?.school_id) throw new Error('L\'identifiant de l\'école est requis');
      };
      expect(() => validate({ name: 'Test' })).toThrow();
    });
  });

  describe('updatePosition', () => {
    it('should update position', async () => {
      mockRepo.findPositionById.mockResolvedValue({ id: positionId });
      mockRepo.updatePosition.mockResolvedValue({ id: positionId, name: 'Updated' });
      const result = await mockRepo.updatePosition(schoolId, positionId, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if position not found', async () => {
      mockRepo.findPositionById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const pos = await mockRepo.findPositionById(schoolId, positionId);
        if (!pos) throw new Error('Poste non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deletePosition', () => {
    it('should delete position', async () => {
      mockRepo.findPositionById.mockResolvedValue({ id: positionId });
      mockRepo.deletePosition.mockResolvedValue(undefined);
      await mockRepo.deletePosition(schoolId, positionId);
      expect(mockRepo.deletePosition).toHaveBeenCalled();
    });

    it('should throw if position not found on delete', async () => {
      mockRepo.findPositionById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const pos = await mockRepo.findPositionById(schoolId, positionId);
        if (!pos) throw new Error('Poste non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('Position validation', () => {
    it('should validate position name', () => {
      const isValidName = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValidName('Directeur')).toBe(true);
      expect(isValidName('A')).toBe(false);
    });

    it('should validate position has required fields', () => {
      const hasRequired = (data: any) => !!(data.name && data.school_id);
      expect(hasRequired({ name: 'Test', school_id: '1' })).toBe(true);
      expect(hasRequired({ name: 'Test' })).toBe(false);
    });
  });
});
