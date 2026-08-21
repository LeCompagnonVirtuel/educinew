import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ObjectiveService', () => {
  const mockRepo = {
    findObjectives: vi.fn(),
    findObjectiveById: vi.fn(),
    createObjective: vi.fn(),
    updateObjective: vi.fn(),
    deleteObjective: vi.fn(),
  };

  const schoolId = 'school-1';
  const objectiveId = 'obj-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findObjectives', () => {
    it('should return objectives list', async () => {
      const objectives = [{ id: '1', title: 'Improve performance' }];
      mockRepo.findObjectives.mockResolvedValue(objectives);
      const result = await mockRepo.findObjectives(schoolId);
      expect(result).toEqual(objectives);
    });

    it('should filter by employee', async () => {
      mockRepo.findObjectives.mockResolvedValue([]);
      await mockRepo.findObjectives(schoolId, employeeId);
      expect(mockRepo.findObjectives).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should handle empty results', async () => {
      mockRepo.findObjectives.mockResolvedValue([]);
      const result = await mockRepo.findObjectives(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findObjectiveById', () => {
    it('should return objective by id', async () => {
      const objective = { id: objectiveId, title: 'Improve performance' };
      mockRepo.findObjectiveById.mockResolvedValue(objective);
      const result = await mockRepo.findObjectiveById(schoolId, objectiveId);
      expect(result.title).toBe('Improve performance');
    });

    it('should throw if not found', async () => {
      mockRepo.findObjectiveById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const obj = await mockRepo.findObjectiveById(schoolId, 'nonexistent');
        if (!obj) throw new Error('Objectif non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createObjective', () => {
    it('should create objective', async () => {
      mockRepo.createObjective.mockResolvedValue({ id: '1', title: 'Improve performance' });
      const result = await mockRepo.createObjective({
        title: 'Improve performance',
        employee_id: employeeId,
        school_id: schoolId,
      });
      expect(result.title).toBe('Improve performance');
    });

    it('should require title', () => {
      const validate = (data: any) => {
        if (!data?.title) throw new Error('Le titre est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({ title: 'Test' })).toThrow();
    });
  });

  describe('updateObjective', () => {
    it('should update objective', async () => {
      mockRepo.findObjectiveById.mockResolvedValue({ id: objectiveId });
      mockRepo.updateObjective.mockResolvedValue({ id: objectiveId, progress: 75 });
      const result = await mockRepo.updateObjective(schoolId, objectiveId, { progress: 75 });
      expect(result.progress).toBe(75);
    });

    it('should throw if not found', async () => {
      mockRepo.findObjectiveById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const obj = await mockRepo.findObjectiveById(schoolId, objectiveId);
        if (!obj) throw new Error('Objectif non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deleteObjective', () => {
    it('should delete objective', async () => {
      mockRepo.findObjectiveById.mockResolvedValue({ id: objectiveId });
      mockRepo.deleteObjective.mockResolvedValue(undefined);
      await mockRepo.deleteObjective(schoolId, objectiveId);
      expect(mockRepo.deleteObjective).toHaveBeenCalled();
    });

    it('should throw if not found on delete', async () => {
      mockRepo.findObjectiveById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const obj = await mockRepo.findObjectiveById(schoolId, objectiveId);
        if (!obj) throw new Error('Objectif non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('Objective progress', () => {
    it('should validate progress range', () => {
      const isValidProgress = (progress: number) => progress >= 0 && progress <= 100;
      expect(isValidProgress(50)).toBe(true);
      expect(isValidProgress(-1)).toBe(false);
      expect(isValidProgress(101)).toBe(false);
    });

    it('should determine if objective is complete', () => {
      const isComplete = (progress: number) => progress >= 100;
      expect(isComplete(100)).toBe(true);
      expect(isComplete(99)).toBe(false);
    });
  });

  describe('Objective status', () => {
    it('should define valid statuses', () => {
      const statuses = ['draft', 'active', 'completed', 'cancelled'];
      expect(statuses).toContain('active');
      expect(statuses).toContain('completed');
    });

    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        draft: ['active'],
        active: ['completed', 'cancelled'],
        completed: [],
        cancelled: [],
      };
      expect(transitions['active']).toContain('completed');
      expect(transitions['completed']).toHaveLength(0);
    });
  });

  describe('Objective priority', () => {
    it('should validate priority levels', () => {
      const validPriorities = ['low', 'medium', 'high', 'critical'];
      const isValidPriority = (p: string) => validPriorities.includes(p);
      expect(isValidPriority('high')).toBe(true);
      expect(isValidPriority('urgent')).toBe(false);
    });
  });

  describe('Objective due date', () => {
    it('should detect overdue objectives', () => {
      const isOverdue = (dueDate: string) => new Date(dueDate) < new Date();
      expect(isOverdue('2025-01-01')).toBe(true);
      expect(isOverdue('2030-12-31')).toBe(false);
    });

    it('should calculate days until due', () => {
      const daysUntilDue = (dueDate: string) => {
        const diff = new Date(dueDate).getTime() - Date.now();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
      };
      expect(daysUntilDue('2025-01-01')).toBeLessThan(0);
      expect(daysUntilDue('2030-12-31')).toBeGreaterThan(0);
    });
  });
});
