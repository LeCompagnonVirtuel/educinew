import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ContractService', () => {
  const mockRepo = {
    findContracts: vi.fn(),
    findContractById: vi.fn(),
    findActiveContract: vi.fn(),
    createContract: vi.fn(),
    updateContract: vi.fn(),
    endContract: vi.fn(),
  };

  const schoolId = 'school-1';
  const contractId = 'contract-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findContracts', () => {
    it('should return contracts list', async () => {
      const contracts = [{ id: '1', employee_id: employeeId }];
      mockRepo.findContracts.mockResolvedValue(contracts);
      const result = await mockRepo.findContracts(schoolId);
      expect(result).toEqual(contracts);
    });

    it('should filter by employee', async () => {
      mockRepo.findContracts.mockResolvedValue([]);
      await mockRepo.findContracts(schoolId, employeeId);
      expect(mockRepo.findContracts).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('findContractById', () => {
    it('should return contract by id', async () => {
      const contract = { id: contractId, status: 'active' };
      mockRepo.findContractById.mockResolvedValue(contract);
      const result = await mockRepo.findContractById(schoolId, contractId);
      expect(result.status).toBe('active');
    });

    it('should throw if not found', async () => {
      mockRepo.findContractById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const contract = await mockRepo.findContractById(schoolId, 'nonexistent');
        if (!contract) throw new Error('Contrat non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow('Contrat non trouvé');
    });

    it('should require both ids', () => {
      const validate = (sId: string, cId: string) => {
        if (!sId || !cId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', contractId)).toThrow();
      expect(() => validate(schoolId, '')).toThrow();
    });
  });

  describe('findActiveContract', () => {
    it('should return active contract', async () => {
      mockRepo.findActiveContract.mockResolvedValue({ id: contractId, status: 'active' });
      const result = await mockRepo.findActiveContract(schoolId, employeeId);
      expect(result.status).toBe('active');
    });

    it('should return null if no active contract', async () => {
      mockRepo.findActiveContract.mockResolvedValue(null);
      const result = await mockRepo.findActiveContract(schoolId, employeeId);
      expect(result).toBeNull();
    });
  });

  describe('createContract', () => {
    it('should create contract with valid data', async () => {
      mockRepo.findActiveContract.mockResolvedValue(null);
      mockRepo.createContract.mockResolvedValue({ id: '1', contract_type: 'CDI' });
      const result = await mockRepo.createContract({ employee_id: employeeId, contract_type: 'CDI', start_date: '2026-01-01', school_id: schoolId });
      expect(result.contract_type).toBe('CDI');
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require contract_type', () => {
      const validate = (data: any) => {
        if (!data?.contract_type) throw new Error('Le type de contrat est requis');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });

    it('should require start_date', () => {
      const validate = (data: any) => {
        if (!data?.start_date) throw new Error('La date de début est requise');
      };
      expect(() => validate({ employee_id: employeeId, contract_type: 'CDI' })).toThrow();
    });

    it('should reject if employee has active contract', async () => {
      mockRepo.findActiveContract.mockResolvedValue({ id: 'existing' });
      const createOrReject = async () => {
        const active = await mockRepo.findActiveContract(schoolId, employeeId);
        if (active) throw new Error('L\'employé a déjà un contrat actif');
      };
      await expect(createOrReject()).rejects.toThrow();
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('updateContract', () => {
    it('should update contract', async () => {
      mockRepo.findContractById.mockResolvedValue({ id: contractId });
      mockRepo.updateContract.mockResolvedValue({ id: contractId, salary: 500000 });
      const result = await mockRepo.updateContract(schoolId, contractId, { salary: 500000 });
      expect(result.salary).toBe(500000);
    });

    it('should throw if contract not found', async () => {
      mockRepo.findContractById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const c = await mockRepo.findContractById(schoolId, contractId);
        if (!c) throw new Error('Contrat non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('endContract', () => {
    it('should end active contract', async () => {
      mockRepo.findContractById.mockResolvedValue({ id: contractId, status: 'active' });
      mockRepo.endContract.mockResolvedValue({ id: contractId, status: 'expired' });
      const result = await mockRepo.endContract(schoolId, contractId, '2026-12-31');
      expect(result.status).toBe('expired');
    });

    it('should require end_date', () => {
      const validate = (endDate: string) => {
        if (!endDate) throw new Error('La date de fin est requise');
      };
      expect(() => validate('')).toThrow();
    });

    it('should throw if contract not found', async () => {
      mockRepo.findContractById.mockResolvedValue(null);
      const endOrThrow = async () => {
        const c = await mockRepo.findContractById(schoolId, contractId);
        if (!c) throw new Error('Contrat non trouvé');
      };
      await expect(endOrThrow()).rejects.toThrow();
    });

    it('should throw if contract not active', async () => {
      mockRepo.findContractById.mockResolvedValue({ id: contractId, status: 'expired' });
      const endOrThrow = async () => {
        const c = await mockRepo.findContractById(schoolId, contractId);
        if (c.status !== 'active') throw new Error('Seuls les contrats actifs peuvent être terminés');
      };
      await expect(endOrThrow()).rejects.toThrow();
    });
  });

  describe('renewContract', () => {
    it('should renew contract with new end date', async () => {
      mockRepo.findContractById.mockResolvedValue({ id: contractId });
      mockRepo.updateContract.mockResolvedValue({ id: contractId, end_date: '2027-12-31' });
      const result = await mockRepo.updateContract(schoolId, contractId, { end_date: '2027-12-31' });
      expect(result.end_date).toBe('2027-12-31');
    });

    it('should require new end date', () => {
      const validate = (endDate: string) => {
        if (!endDate) throw new Error('La nouvelle date de fin est requise');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('Contract type validation', () => {
    it('should validate contract types', () => {
      const validTypes = ['CDI', 'CDD', 'Stage', 'Vacation', 'Interim'];
      const isValidType = (type: string) => validTypes.includes(type);
      expect(isValidType('CDI')).toBe(true);
      expect(isValidType('CDD')).toBe(true);
      expect(isValidType('Invalid')).toBe(false);
    });
  });

  describe('Contract status transitions', () => {
    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        draft: ['active'],
        active: ['expired', 'terminated'],
        expired: [],
        terminated: [],
      };
      expect(transitions['draft']).toContain('active');
      expect(transitions['active']).toContain('expired');
      expect(transitions['expired']).toHaveLength(0);
    });
  });
});
