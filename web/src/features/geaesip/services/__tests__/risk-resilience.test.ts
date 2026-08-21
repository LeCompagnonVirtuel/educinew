import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipRiskResilienceService } from '../risk-resilience.service';

const mockRegistryRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockMatrixRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockWarningRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockMitigationRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const RISK_ID = '660e8400-e29b-41d4-a716-446655440001';
const MATRIX_ID = '770e8400-e29b-41d4-a716-446655440002';
const WARNING_ID = '880e8400-e29b-41d4-a716-446655440003';
const MITIGATION_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockRisk = {
  id: RISK_ID,
  school_id: SCHOOL_ID,
  name: 'Teacher turnover',
  category: 'HR',
  probability: 0.4,
  impact: 7.5,
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockMatrix = {
  id: MATRIX_ID,
  school_id: SCHOOL_ID,
  name: 'Risk Matrix Q1',
  risks: [RISK_ID],
  computedAt: new Date().toISOString(),
};

const mockWarning = {
  id: WARNING_ID,
  school_id: SCHOOL_ID,
  riskId: RISK_ID,
  title: 'High teacher turnover predicted',
  status: 'active',
  severity: 'HIGH',
  timestamp: new Date().toISOString(),
};

const mockMitigation = {
  id: MITIGATION_ID,
  school_id: SCHOOL_ID,
  riskId: RISK_ID,
  name: 'Retention program',
  actions: ['Salary review', 'Training'],
  status: 'in_progress',
  created_at: new Date().toISOString(),
};

let service: GeaesipRiskResilienceService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipRiskResilienceService(
    mockRegistryRepo as never,
    mockMatrixRepo as never,
    mockWarningRepo as never,
    mockMitigationRepo as never,
  );
});

describe('GeaesipRiskResilienceService', () => {
  describe('listRisks', () => {
    it('should list risks for a school', async () => {
      mockRegistryRepo.findAllBySchool.mockResolvedValue([mockRisk]);

      const result = await service.listRisks(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listRisks('')).rejects.toThrow();
    });
  });

  describe('getRisk', () => {
    it('should retrieve a risk by id', async () => {
      mockRegistryRepo.findById.mockResolvedValue(mockRisk);

      const result = await service.getRisk(SCHOOL_ID, RISK_ID);

      expect(result).toEqual(mockRisk);
    });

    it('should throw if risk not found', async () => {
      mockRegistryRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getRisk(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createRisk', () => {
    it('should create a risk successfully', async () => {
      mockRegistryRepo.create.mockResolvedValue(mockRisk);

      const result = await service.createRisk(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Teacher turnover',
        category: 'HR',
        probability: 0.4,
        impact: 7.5,
        status: 'active',
      } as never);

      expect(result).toEqual(mockRisk);
    });
  });

  describe('updateRisk', () => {
    it('should update a risk', async () => {
      mockRegistryRepo.findById.mockResolvedValue(mockRisk);
      mockRegistryRepo.update.mockResolvedValue({ ...mockRisk, name: 'Updated' });

      const result = await service.updateRisk(SCHOOL_ID, RISK_ID, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteRisk', () => {
    it('should delete a risk', async () => {
      mockRegistryRepo.findById.mockResolvedValue(mockRisk);
      mockRegistryRepo.delete.mockResolvedValue(undefined);

      await service.deleteRisk(SCHOOL_ID, RISK_ID);

      expect(mockRegistryRepo.delete).toHaveBeenCalledWith(RISK_ID);
    });
  });

  describe('listMatrices', () => {
    it('should list risk matrices', async () => {
      mockMatrixRepo.findAllBySchool.mockResolvedValue([mockMatrix]);

      const result = await service.listMatrices(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getMatrix', () => {
    it('should retrieve a matrix by id', async () => {
      mockMatrixRepo.findById.mockResolvedValue(mockMatrix);

      const result = await service.getMatrix(SCHOOL_ID, MATRIX_ID);

      expect(result).toEqual(mockMatrix);
    });
  });

  describe('listWarnings', () => {
    it('should list early warnings', async () => {
      mockWarningRepo.findAllBySchool.mockResolvedValue([mockWarning]);

      const result = await service.listWarnings(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getWarning', () => {
    it('should retrieve a warning by id', async () => {
      mockWarningRepo.findById.mockResolvedValue(mockWarning);

      const result = await service.getWarning(SCHOOL_ID, WARNING_ID);

      expect(result).toEqual(mockWarning);
    });
  });

  describe('listMitigationPlans', () => {
    it('should list mitigation plans', async () => {
      mockMitigationRepo.findAllBySchool.mockResolvedValue([mockMitigation]);

      const result = await service.listMitigationPlans(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createMitigationPlan', () => {
    it('should create a mitigation plan', async () => {
      mockMitigationRepo.create.mockResolvedValue(mockMitigation);

      const result = await service.createMitigationPlan(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        riskId: RISK_ID,
        name: 'Retention program',
        actions: ['Salary review', 'Training'],
        status: 'in_progress',
      } as never);

      expect(result.name).toBe('Retention program');
    });
  });

  describe('getRiskResilienceStats', () => {
    it('should return stats', async () => {
      mockRegistryRepo.findAllBySchool.mockResolvedValue([mockRisk]);
      mockMatrixRepo.findAllBySchool.mockResolvedValue([mockMatrix]);
      mockWarningRepo.findAllBySchool.mockResolvedValue([mockWarning]);
      mockMitigationRepo.findAllBySchool.mockResolvedValue([mockMitigation]);

      const result = await service.getRiskResilienceStats(SCHOOL_ID);

      expect(result.totalRisks).toBe(1);
      expect(result.totalMatrices).toBe(1);
      expect(result.totalWarnings).toBe(1);
      expect(result.activeWarnings).toBe(1);
      expect(result.totalMitigationPlans).toBe(1);
    });
  });
});
