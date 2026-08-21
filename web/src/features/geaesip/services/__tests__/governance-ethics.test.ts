import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipGovernanceEthicsService } from '../governance-ethics.service';

const mockPolicyRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockAuditRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const mockEthicsRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockBiasRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const POLICY_ID = '660e8400-e29b-41d4-a716-446655440001';
const AUDIT_ID = '770e8400-e29b-41d4-a716-446655440002';
const ETHICS_ID = '880e8400-e29b-41d4-a716-446655440003';
const BIAS_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockPolicy = {
  id: POLICY_ID,
  school_id: SCHOOL_ID,
  name: 'Data Privacy Policy',
  version: '2.0',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockAudit = {
  id: AUDIT_ID,
  school_id: SCHOOL_ID,
  policyId: POLICY_ID,
  result: 'COMPLIANT',
  findings: [],
  timestamp: new Date().toISOString(),
};

const mockEthics = {
  id: ETHICS_ID,
  school_id: SCHOOL_ID,
  title: 'AI Ethics Review Q1',
  status: 'completed',
  score: 85,
  recommendations: ['Reduce bias', 'Increase transparency'],
  timestamp: new Date().toISOString(),
};

const mockBias = {
  id: BIAS_ID,
  school_id: SCHOOL_ID,
  modelId: 'model-1',
  modelName: 'Grading Model',
  biasType: 'GENDER',
  severity: 'LOW',
  mitigationActions: ['Retrain with balanced data'],
  timestamp: new Date().toISOString(),
};

let service: GeaesipGovernanceEthicsService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipGovernanceEthicsService(
    mockPolicyRepo as never,
    mockAuditRepo as never,
    mockEthicsRepo as never,
    mockBiasRepo as never,
  );
});

describe('GeaesipGovernanceEthicsService', () => {
  describe('listPolicies', () => {
    it('should list governance policies for a school', async () => {
      mockPolicyRepo.findAllBySchool.mockResolvedValue([mockPolicy]);
      const result = await service.listPolicies(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listPolicies('')).rejects.toThrow();
    });
  });

  describe('getPolicy', () => {
    it('should retrieve a policy by id', async () => {
      mockPolicyRepo.findById.mockResolvedValue(mockPolicy);
      const result = await service.getPolicy(SCHOOL_ID, POLICY_ID);
      expect(result).toEqual(mockPolicy);
    });

    it('should throw if policy not found', async () => {
      mockPolicyRepo.findById.mockImplementation(() => { throw new Error('Not found'); });
      await expect(service.getPolicy(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createPolicy', () => {
    it('should create a policy successfully', async () => {
      mockPolicyRepo.create.mockResolvedValue(mockPolicy);
      const result = await service.createPolicy(SCHOOL_ID, {
        school_id: SCHOOL_ID, name: 'Data Privacy Policy', version: '2.0', status: 'active',
      } as never);
      expect(result).toEqual(mockPolicy);
    });
  });

  describe('updatePolicy', () => {
    it('should update a policy', async () => {
      mockPolicyRepo.findById.mockResolvedValue(mockPolicy);
      mockPolicyRepo.update.mockResolvedValue({ ...mockPolicy, version: '3.0' });
      const result = await service.updatePolicy(SCHOOL_ID, POLICY_ID, { version: '3.0' });
      expect(result.version).toBe('3.0');
    });
  });

  describe('deletePolicy', () => {
    it('should delete a policy', async () => {
      mockPolicyRepo.findById.mockResolvedValue(mockPolicy);
      mockPolicyRepo.delete.mockResolvedValue(undefined);
      await service.deletePolicy(SCHOOL_ID, POLICY_ID);
      expect(mockPolicyRepo.delete).toHaveBeenCalledWith(POLICY_ID);
    });
  });

  describe('listAudits', () => {
    it('should list governance audits', async () => {
      mockAuditRepo.findAllBySchool.mockResolvedValue([mockAudit]);
      const result = await service.listAudits(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('getAudit', () => {
    it('should retrieve an audit by id', async () => {
      mockAuditRepo.findById.mockResolvedValue(mockAudit);
      const result = await service.getAudit(SCHOOL_ID, AUDIT_ID);
      expect(result).toEqual(mockAudit);
    });
  });

  describe('listEthicsReviews', () => {
    it('should list ethics reviews', async () => {
      mockEthicsRepo.findAllBySchool.mockResolvedValue([mockEthics]);
      const result = await service.listEthicsReviews(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('createEthicsReview', () => {
    it('should create an ethics review', async () => {
      mockEthicsRepo.create.mockResolvedValue(mockEthics);
      const result = await service.createEthicsReview(SCHOOL_ID, {
        school_id: SCHOOL_ID, title: 'AI Ethics Review Q1', status: 'completed',
        score: 85, recommendations: ['Reduce bias'],
      } as never);
      expect(result.title).toBe('AI Ethics Review Q1');
    });
  });

  describe('listBiasReviews', () => {
    it('should list bias reviews', async () => {
      mockBiasRepo.findAllBySchool.mockResolvedValue([mockBias]);
      const result = await service.listBiasReviews(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('createBiasReview', () => {
    it('should create a bias review', async () => {
      mockBiasRepo.create.mockResolvedValue(mockBias);
      const result = await service.createBiasReview(SCHOOL_ID, {
        school_id: SCHOOL_ID, modelId: 'model-1', modelName: 'Grading Model',
        biasType: 'GENDER', severity: 'LOW', mitigationActions: ['Retrain'],
      } as never);
      expect(result.biasType).toBe('GENDER');
    });
  });

  describe('getGovernanceEthicsStats', () => {
    it('should return stats', async () => {
      mockPolicyRepo.findAllBySchool.mockResolvedValue([mockPolicy]);
      mockAuditRepo.findAllBySchool.mockResolvedValue([mockAudit]);
      mockEthicsRepo.findAllBySchool.mockResolvedValue([mockEthics]);
      mockBiasRepo.findAllBySchool.mockResolvedValue([mockBias]);
      const result = await service.getGovernanceEthicsStats(SCHOOL_ID);
      expect(result.totalPolicies).toBe(1);
      expect(result.totalAudits).toBe(1);
      expect(result.totalEthicsReviews).toBe(1);
      expect(result.totalBiasReviews).toBe(1);
    });
  });
});
