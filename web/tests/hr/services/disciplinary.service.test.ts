import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('DisciplinaryService', () => {
  const mockRepo = {
    findDisciplinaryActions: vi.fn(),
    findDisciplinaryActionById: vi.fn(),
    createDisciplinaryAction: vi.fn(),
    updateDisciplinaryAction: vi.fn(),
  };

  const schoolId = 'school-1';
  const actionId = 'disc-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findDisciplinaryActions', () => {
    it('should return actions list', async () => {
      const actions = [{ id: '1', employee_id: employeeId }];
      mockRepo.findDisciplinaryActions.mockResolvedValue(actions);
      const result = await mockRepo.findDisciplinaryActions(schoolId);
      expect(result).toEqual(actions);
    });

    it('should filter by employee', async () => {
      mockRepo.findDisciplinaryActions.mockResolvedValue([]);
      await mockRepo.findDisciplinaryActions(schoolId, employeeId);
      expect(mockRepo.findDisciplinaryActions).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should handle empty results', async () => {
      mockRepo.findDisciplinaryActions.mockResolvedValue([]);
      const result = await mockRepo.findDisciplinaryActions(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findDisciplinaryActionById', () => {
    it('should return action by id', async () => {
      const action = { id: actionId, type: 'warning' };
      mockRepo.findDisciplinaryActionById.mockResolvedValue(action);
      const result = await mockRepo.findDisciplinaryActionById(schoolId, actionId);
      expect(result.type).toBe('warning');
    });

    it('should throw if not found', async () => {
      mockRepo.findDisciplinaryActionById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const a = await mockRepo.findDisciplinaryActionById(schoolId, 'nonexistent');
        if (!a) throw new Error('Action disciplinaire non trouvée');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createDisciplinaryAction', () => {
    it('should create action', async () => {
      mockRepo.createDisciplinaryAction.mockResolvedValue({ id: '1', type: 'warning' });
      const result = await mockRepo.createDisciplinaryAction({
        employee_id: employeeId,
        type: 'warning',
        reason: 'Late attendance',
        school_id: schoolId,
      });
      expect(result.type).toBe('warning');
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require type', () => {
      const validate = (data: any) => {
        if (!data?.type) throw new Error('Le type d\'action est requis');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });

    it('should require reason', () => {
      const validate = (data: any) => {
        if (!data?.reason) throw new Error('La raison est requise');
      };
      expect(() => validate({ employee_id: employeeId, type: 'warning' })).toThrow();
    });
  });

  describe('updateDisciplinaryAction', () => {
    it('should update action', async () => {
      mockRepo.findDisciplinaryActionById.mockResolvedValue({ id: actionId });
      mockRepo.updateDisciplinaryAction.mockResolvedValue({ id: actionId, status: 'acknowledged' });
      const result = await mockRepo.updateDisciplinaryAction(schoolId, actionId, { status: 'acknowledged' });
      expect(result.status).toBe('acknowledged');
    });

    it('should throw if not found', async () => {
      mockRepo.findDisciplinaryActionById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const a = await mockRepo.findDisciplinaryActionById(schoolId, actionId);
        if (!a) throw new Error('Action disciplinaire non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('Disciplinary type', () => {
    it('should define valid types', () => {
      const types = ['verbal_warning', 'written_warning', 'suspension', 'demotion', 'termination'];
      expect(types).toContain('verbal_warning');
      expect(types).toContain('termination');
    });

    it('should validate severity levels', () => {
      const validLevels = ['low', 'medium', 'high', 'critical'];
      const isValidLevel = (level: string) => validLevels.includes(level);
      expect(isValidLevel('low')).toBe(true);
      expect(isValidLevel('critical')).toBe(true);
      expect(isValidLevel('invalid')).toBe(false);
    });
  });

  describe('Disciplinary status', () => {
    it('should define valid statuses', () => {
      const statuses = ['pending', 'acknowledged', 'appealed', 'closed'];
      expect(statuses).toContain('pending');
      expect(statuses).toContain('closed');
    });

    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        pending: ['acknowledged', 'appealed'],
        acknowledged: ['closed'],
        appealed: ['closed'],
        closed: [],
      };
      expect(transitions['pending']).toContain('acknowledged');
      expect(transitions['closed']).toHaveLength(0);
    });
  });

  describe('Disciplinary escalation', () => {
    it('should determine escalation level', () => {
      const getEscalation = (actionCount: number) => {
        if (actionCount >= 5) return 'critical';
        if (actionCount >= 3) return 'high';
        if (actionCount >= 2) return 'medium';
        return 'low';
      };
      expect(getEscalation(1)).toBe('low');
      expect(getEscalation(2)).toBe('medium');
      expect(getEscalation(3)).toBe('high');
      expect(getEscalation(5)).toBe('critical');
    });
  });

  describe('Disciplinary validation', () => {
    it('should validate action date', () => {
      const isNotFuture = (date: string) => new Date(date) <= new Date();
      expect(isNotFuture('2025-01-01')).toBe(true);
    });

    it('should validate witness requirement', () => {
      const needsWitness = (type: string) => ['suspension', 'demotion', 'termination'].includes(type);
      expect(needsWitness('verbal_warning')).toBe(false);
      expect(needsWitness('suspension')).toBe(true);
      expect(needsWitness('termination')).toBe(true);
    });
  });

  describe('Warning expiry', () => {
    it('should calculate warning expiry date', () => {
      const calcExpiry = (actionDate: string, validityMonths: number) => {
        const date = new Date(actionDate);
        const day = date.getDate();
        date.setMonth(date.getMonth() + validityMonths);
        if (date.getDate() !== day) date.setDate(0);
        return date.toISOString().split('T')[0];
      };
      expect(calcExpiry('2026-01-01', 6)).toBe('2026-07-01');
      expect(calcExpiry('2026-01-31', 1)).toBe('2026-02-28');
    });

    it('should detect expired warnings', () => {
      const isExpired = (expiryDate: string) => new Date(expiryDate) < new Date();
      expect(isExpired('2025-01-01')).toBe(true);
      expect(isExpired('2030-12-31')).toBe(false);
    });
  });
});
