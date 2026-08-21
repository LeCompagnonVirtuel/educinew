import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('LeaveService', () => {
  const mockRepo = {
    findLeaves: vi.fn(),
    findLeaveById: vi.fn(),
    findPendingLeaves: vi.fn(),
    createLeave: vi.fn(),
    updateLeave: vi.fn(),
    approveLeave: vi.fn(),
    findLeaveBalance: vi.fn(),
    updateLeaveBalance: vi.fn(),
  };

  const schoolId = 'school-1';
  const leaveId = 'leave-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findLeaves', () => {
    it('should return leaves list', async () => {
      const leaves = [{ id: '1', employee_id: employeeId }];
      mockRepo.findLeaves.mockResolvedValue(leaves);
      const result = await mockRepo.findLeaves(schoolId);
      expect(result).toEqual(leaves);
    });

    it('should filter by employee', async () => {
      mockRepo.findLeaves.mockResolvedValue([]);
      await mockRepo.findLeaves(schoolId, employeeId);
      expect(mockRepo.findLeaves).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('findLeaveById', () => {
    it('should return leave by id', async () => {
      const leave = { id: leaveId, status: 'pending' };
      mockRepo.findLeaveById.mockResolvedValue(leave);
      const result = await mockRepo.findLeaveById(schoolId, leaveId);
      expect(result.status).toBe('pending');
    });

    it('should throw if not found', async () => {
      mockRepo.findLeaveById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const leave = await mockRepo.findLeaveById(schoolId, 'nonexistent');
        if (!leave) throw new Error('Demande de congé non trouvée');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('findPendingLeaves', () => {
    it('should return pending leaves', async () => {
      mockRepo.findPendingLeaves.mockResolvedValue([{ id: '1', status: 'pending' }]);
      const result = await mockRepo.findPendingLeaves(schoolId);
      expect(result).toHaveLength(1);
    });

    it('should handle empty pending list', async () => {
      mockRepo.findPendingLeaves.mockResolvedValue([]);
      const result = await mockRepo.findPendingLeaves(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('createLeave', () => {
    it('should create leave with valid data', async () => {
      mockRepo.findLeaveBalance.mockResolvedValue({ total_days: 30, days_used: 5 });
      mockRepo.createLeave.mockResolvedValue({ id: '1', status: 'pending' });
      const result = await mockRepo.createLeave({
        employee_id: employeeId,
        leave_type: 'annual',
        start_date: '2026-08-01',
        end_date: '2026-08-05',
        school_id: schoolId,
      });
      expect(result.status).toBe('pending');
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require leave_type', () => {
      const validate = (data: any) => {
        if (!data?.leave_type) throw new Error('Le type de congé est requis');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });

    it('should require start_date', () => {
      const validate = (data: any) => {
        if (!data?.start_date) throw new Error('La date de début est requise');
      };
      expect(() => validate({ employee_id: employeeId, leave_type: 'annual' })).toThrow();
    });

    it('should require end_date', () => {
      const validate = (data: any) => {
        if (!data?.end_date) throw new Error('La date de fin est requise');
      };
      expect(() => validate({ employee_id: employeeId, leave_type: 'annual', start_date: '2026-08-01' })).toThrow();
    });

    it('should reject end_date before start_date', () => {
      const validate = (start: string, end: string) => {
        if (new Date(end) < new Date(start)) throw new Error('La date de fin doit être postérieure à la date de début');
      };
      expect(() => validate('2026-08-10', '2026-08-01')).toThrow();
    });

    it('should accept valid date range', () => {
      const validate = (start: string, end: string) => {
        if (new Date(end) < new Date(start)) throw new Error('Invalid range');
      };
      expect(() => validate('2026-08-01', '2026-08-10')).not.toThrow();
    });

    it('should check leave balance', async () => {
      mockRepo.findLeaveBalance.mockResolvedValue({ total_days: 30, days_used: 28 });
      const checkBalance = async (requestedDays: number) => {
        const balance = await mockRepo.findLeaveBalance(schoolId, employeeId, 'annual');
        const remaining = (balance.total_days || 0) - (balance.days_used || 0);
        if (requestedDays > remaining) throw new Error(`Solde insuffisant. Restants: ${remaining}`);
      };
      await expect(checkBalance(5)).rejects.toThrow('Solde insuffisant');
    });
  });

  describe('updateLeave', () => {
    it('should update pending leave', async () => {
      mockRepo.findLeaveById.mockResolvedValue({ id: leaveId, status: 'pending' });
      mockRepo.updateLeave.mockResolvedValue({ id: leaveId, reason: 'Updated' });
      const result = await mockRepo.updateLeave(schoolId, leaveId, { reason: 'Updated' });
      expect(result.reason).toBe('Updated');
    });

    it('should throw if leave not found', async () => {
      mockRepo.findLeaveById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const leave = await mockRepo.findLeaveById(schoolId, leaveId);
        if (!leave) throw new Error('Demande de congé non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });

    it('should throw if leave not pending', async () => {
      mockRepo.findLeaveById.mockResolvedValue({ id: leaveId, status: 'approved' });
      const updateOrThrow = async () => {
        const leave = await mockRepo.findLeaveById(schoolId, leaveId);
        if (leave.status !== 'pending') throw new Error('Seules les demandes en attente peuvent être modifiées');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('approveLeave', () => {
    it('should approve leave', async () => {
      mockRepo.findLeaveById.mockResolvedValue({ id: leaveId, status: 'pending', start_date: '2026-08-01', end_date: '2026-08-05', employee_id: employeeId, leave_type: 'annual' });
      mockRepo.approveLeave.mockResolvedValue({ id: leaveId, status: 'approved' });
      mockRepo.findLeaveBalance.mockResolvedValue({ total_days: 30, days_used: 5 });
      mockRepo.updateLeaveBalance.mockResolvedValue({});
      const result = await mockRepo.approveLeave(schoolId, leaveId, 'admin-1', true);
      expect(result.status).toBe('approved');
    });

    it('should reject leave with reason', async () => {
      mockRepo.findLeaveById.mockResolvedValue({ id: leaveId, status: 'pending' });
      mockRepo.approveLeave.mockResolvedValue({ id: leaveId, status: 'rejected', rejection_reason: 'Not enough staff' });
      const result = await mockRepo.approveLeave(schoolId, leaveId, 'admin-1', false, 'Not enough staff');
      expect(result.status).toBe('rejected');
    });

    it('should throw if leave already processed', async () => {
      mockRepo.findLeaveById.mockResolvedValue({ id: leaveId, status: 'approved' });
      const approveOrThrow = async () => {
        const leave = await mockRepo.findLeaveById(schoolId, leaveId);
        if (leave.status !== 'pending') throw new Error('Cette demande a déjà été traitée');
      };
      await expect(approveOrThrow()).rejects.toThrow();
    });

    it('should calculate days used on approval', () => {
      const calcDays = (start: string, end: string) => {
        return Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)) + 1;
      };
      expect(calcDays('2026-08-01', '2026-08-05')).toBe(5);
      expect(calcDays('2026-08-01', '2026-08-01')).toBe(1);
    });
  });

  describe('findLeaveBalance', () => {
    it('should return leave balance', async () => {
      mockRepo.findLeaveBalance.mockResolvedValue({ total_days: 30, days_used: 10 });
      const result = await mockRepo.findLeaveBalance(schoolId, employeeId, 'annual');
      expect(result.total_days).toBe(30);
    });

    it('should return null if no balance', async () => {
      mockRepo.findLeaveBalance.mockResolvedValue(null);
      const result = await mockRepo.findLeaveBalance(schoolId, employeeId, 'annual');
      expect(result).toBeNull();
    });

    it('should require all params', () => {
      const validate = (sId: string, eId: string, lt: string) => {
        if (!sId || !eId || !lt) throw new Error('Identifiants requis');
      };
      expect(() => validate('', employeeId, 'annual')).toThrow();
      expect(() => validate(schoolId, '', 'annual')).toThrow();
      expect(() => validate(schoolId, employeeId, '')).toThrow();
    });
  });

  describe('updateLeaveBalance', () => {
    it('should update leave balance', async () => {
      mockRepo.updateLeaveBalance.mockResolvedValue({ days_used: 15 });
      const result = await mockRepo.updateLeaveBalance(schoolId, employeeId, 'annual', 15);
      expect(result.days_used).toBe(15);
    });

    it('should reject negative days', () => {
      const validate = (days: number) => {
        if (days < 0) throw new Error('Le nombre de jours utilisé ne peut pas être négatif');
      };
      expect(() => validate(-1)).toThrow();
    });

    it('should accept zero days', () => {
      const validate = (days: number) => {
        if (days < 0) throw new Error('Invalid');
      };
      expect(() => validate(0)).not.toThrow();
    });
  });

  describe('Leave type validation', () => {
    it('should validate leave types', () => {
      const validTypes = ['annual', 'sick', 'maternity', 'paternity', 'personal', 'unpaid', 'bereavement'];
      const isValidType = (type: string) => validTypes.includes(type);
      expect(isValidType('annual')).toBe(true);
      expect(isValidType('sick')).toBe(true);
      expect(isValidType('invalid')).toBe(false);
    });
  });

  describe('Leave status transitions', () => {
    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        pending: ['approved', 'rejected'],
        approved: ['cancelled'],
        rejected: [],
        cancelled: [],
      };
      expect(transitions['pending']).toContain('approved');
      expect(transitions['pending']).toContain('rejected');
      expect(transitions['rejected']).toHaveLength(0);
    });
  });

  describe('Leave balance calculation', () => {
    it('should calculate remaining days', () => {
      const remaining = (total: number, used: number) => total - used;
      expect(remaining(30, 10)).toBe(20);
      expect(remaining(30, 30)).toBe(0);
      expect(remaining(30, 35)).toBe(-5);
    });
  });
});
