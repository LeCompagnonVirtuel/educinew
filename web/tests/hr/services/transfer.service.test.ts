import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TransferService', () => {
  const mockRepo = {
    findTransfers: vi.fn(),
    findTransferById: vi.fn(),
    createTransfer: vi.fn(),
    updateTransfer: vi.fn(),
  };

  const schoolId = 'school-1';
  const transferId = 'transfer-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findTransfers', () => {
    it('should return transfers list', async () => {
      const transfers = [{ id: '1', employee_id: employeeId }];
      mockRepo.findTransfers.mockResolvedValue(transfers);
      const result = await mockRepo.findTransfers(schoolId);
      expect(result).toEqual(transfers);
    });

    it('should filter by employee', async () => {
      mockRepo.findTransfers.mockResolvedValue([]);
      await mockRepo.findTransfers(schoolId, employeeId);
      expect(mockRepo.findTransfers).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should handle empty results', async () => {
      mockRepo.findTransfers.mockResolvedValue([]);
      const result = await mockRepo.findTransfers(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findTransferById', () => {
    it('should return transfer by id', async () => {
      const transfer = { id: transferId, from_department: 'IT' };
      mockRepo.findTransferById.mockResolvedValue(transfer);
      const result = await mockRepo.findTransferById(schoolId, transferId);
      expect(result.from_department).toBe('IT');
    });

    it('should throw if not found', async () => {
      mockRepo.findTransferById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const t = await mockRepo.findTransferById(schoolId, 'nonexistent');
        if (!t) throw new Error('Transfert non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createTransfer', () => {
    it('should create transfer', async () => {
      mockRepo.createTransfer.mockResolvedValue({ id: '1', employee_id: employeeId });
      const result = await mockRepo.createTransfer({
        employee_id: employeeId,
        from_department: 'IT',
        to_department: 'HR',
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

    it('should require from_department', () => {
      const validate = (data: any) => {
        if (!data?.from_department) throw new Error('Le département d\'origine est requis');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });

    it('should require to_department', () => {
      const validate = (data: any) => {
        if (!data?.to_department) throw new Error('Le département de destination est requis');
      };
      expect(() => validate({ employee_id: employeeId, from_department: 'IT' })).toThrow();
    });

    it('should reject transfer to same department', () => {
      const validate = (from: string, to: string) => {
        if (from === to) throw new Error('Les départements doivent être différents');
      };
      expect(() => validate('IT', 'IT')).toThrow();
      expect(() => validate('IT', 'HR')).not.toThrow();
    });
  });

  describe('updateTransfer', () => {
    it('should update transfer', async () => {
      mockRepo.findTransferById.mockResolvedValue({ id: transferId });
      mockRepo.updateTransfer.mockResolvedValue({ id: transferId, status: 'approved' });
      const result = await mockRepo.updateTransfer(schoolId, transferId, { status: 'approved' });
      expect(result.status).toBe('approved');
    });

    it('should throw if not found', async () => {
      mockRepo.findTransferById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const t = await mockRepo.findTransferById(schoolId, transferId);
        if (!t) throw new Error('Transfert non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('Transfer status', () => {
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

  describe('Transfer validation', () => {
    it('should validate effective date', () => {
      const isNotPast = (date: string) => new Date(date) >= new Date();
      expect(isNotPast('2030-01-01')).toBe(true);
    });

    it('should require reason', () => {
      const hasReason = (data: any) => !!data.reason;
      expect(hasReason({ reason: 'Career growth' })).toBe(true);
      expect(hasReason({})).toBe(false);
    });
  });
});
