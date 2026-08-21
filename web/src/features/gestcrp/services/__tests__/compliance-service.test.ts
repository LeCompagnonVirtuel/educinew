import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComplianceService } from '../compliance-service';
import { GestcrpNotFoundError, GestcrpValidationError } from '@educi/errors';

const mockAssessmentsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockGovernancePoliciesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockRiskRegistersRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockAuditLogsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockComplianceRepo = {
  assessments: mockAssessmentsRepo,
  governancePolicies: mockGovernancePoliciesRepo,
  riskRegisters: mockRiskRegistersRepo,
  auditLogs: mockAuditLogsRepo,
  findActiveGovernancePolicies: vi.fn(),
  findOpenRisks: vi.fn(),
  findRecentAuditLogs: vi.fn(),
};

const mockAssessment = {
  id: 'assess-001',
  school_id: 'sch-001',
  standard: 'ISO 27001',
  name: 'Annual Security Assessment',
  description: 'Annual information security assessment',
  status: 'NOT_STARTED' as const,
  scope: 'All IT systems',
  requirements: [],
  assessment_date: new Date().toISOString(),
  assessor: 'Security Team',
  valid_until: new Date(Date.now() + 365 * 86400000).toISOString(),
  score: 0,
  max_score: 100,
  findings: [],
  recommendations: [],
  documents: [],
  created_at: new Date().toISOString(),
};

const mockGovernancePolicy = {
  id: 'gp-001',
  school_id: 'sch-001',
  name: 'Password Policy',
  description: 'Password complexity and rotation requirements',
  category: 'ACCESS_CONTROL',
  version: '1.0',
  status: 'DRAFT' as const,
  owner: 'CISO',
  effective_date: new Date().toISOString(),
  review_date: new Date(Date.now() + 365 * 86400000).toISOString(),
  created_at: new Date().toISOString(),
};

const mockRisk = {
  id: 'risk-001',
  school_id: 'sch-001',
  name: 'Data Breach Risk',
  description: 'Risk of unauthorized data access',
  category: 'DATA_SECURITY',
  likelihood: 3,
  impact: 4,
  risk_score: 12,
  risk_level: 'HIGH' as const,
  status: 'IDENTIFIED' as const,
  owner: 'CISO',
  controls: [],
  treatment_plan: 'Implement DLP and encryption',
  last_assessed_at: new Date().toISOString(),
  next_assessment_date: new Date().toISOString(),
  created_at: new Date().toISOString(),
};

let service: ComplianceService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new ComplianceService(mockComplianceRepo as never);
});

describe('ComplianceService', () => {
  describe('listAssessments', () => {
    it('should list assessments', async () => {
      mockAssessmentsRepo.findAll.mockResolvedValue({ data: [mockAssessment], total: 1 });

      const result = await service.listAssessments('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listAssessments('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getAssessment', () => {
    it('should retrieve an assessment by id', async () => {
      mockAssessmentsRepo.exists.mockResolvedValue(true);
      mockAssessmentsRepo.findById.mockResolvedValue(mockAssessment);

      const result = await service.getAssessment('sch-001', 'assess-001');

      expect(result).toEqual(mockAssessment);
    });

    it('should throw if assessment not found', async () => {
      mockAssessmentsRepo.exists.mockResolvedValue(false);

      await expect(service.getAssessment('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('createAssessment', () => {
    it('should create an assessment', async () => {
      mockAssessmentsRepo.create.mockResolvedValue(mockAssessment);

      const result = await service.createAssessment('sch-001', {
        standard: 'ISO_27001',
        name: 'Annual Security Assessment',
        description: 'Annual information security assessment',
        scope: 'All IT systems',
        assessor: '550e8400-e29b-41d4-a716-446655440000',
        valid_until: new Date(Date.now() + 365 * 86400000).toISOString(),
        requirements: [{
          section: 'A.5',
          description: 'Information security policies',
          riskLevel: 'MEDIUM',
        }],
      });

      expect(result).toEqual(mockAssessment);
    });

    it('should reject missing required fields', async () => {
      await expect(service.createAssessment('sch-001', {
        standard: 'ISO 27001',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('updateAssessment', () => {
    it('should update an assessment', async () => {
      mockAssessmentsRepo.exists.mockResolvedValue(true);
      mockAssessmentsRepo.findById.mockResolvedValue(mockAssessment);
      mockAssessmentsRepo.update.mockResolvedValue({ ...mockAssessment, status: 'IN_PROGRESS' });

      const result = await service.updateAssessment('sch-001', 'assess-001', { status: 'IN_PROGRESS' });

      expect(result.status).toBe('IN_PROGRESS');
    });
  });

  describe('completeAssessment', () => {
    it('should complete an assessment with COMPLIANT status', async () => {
      mockAssessmentsRepo.exists.mockResolvedValue(true);
      mockAssessmentsRepo.findById.mockResolvedValue(mockAssessment);
      mockAssessmentsRepo.update.mockResolvedValue({ ...mockAssessment, status: 'COMPLIANT', score: 95 });

      const result = await service.completeAssessment('sch-001', 'assess-001', 95, [], []);

      expect(result.status).toBe('COMPLIANT');
      expect(result.score).toBe(95);
    });

    it('should set PARTIALLY_COMPLIANT for score 70-89', async () => {
      mockAssessmentsRepo.exists.mockResolvedValue(true);
      mockAssessmentsRepo.findById.mockResolvedValue(mockAssessment);
      mockAssessmentsRepo.update.mockResolvedValue({ ...mockAssessment, status: 'PARTIALLY_COMPLIANT', score: 75 });

      const result = await service.completeAssessment('sch-001', 'assess-001', 75, [], []);

      expect(result.status).toBe('PARTIALLY_COMPLIANT');
    });

    it('should set NON_COMPLIANT for score below 70', async () => {
      mockAssessmentsRepo.exists.mockResolvedValue(true);
      mockAssessmentsRepo.findById.mockResolvedValue(mockAssessment);
      mockAssessmentsRepo.update.mockResolvedValue({ ...mockAssessment, status: 'NON_COMPLIANT', score: 50 });

      const result = await service.completeAssessment('sch-001', 'assess-001', 50, [], []);

      expect(result.status).toBe('NON_COMPLIANT');
    });
  });

  describe('deleteAssessment', () => {
    it('should soft delete an assessment', async () => {
      mockAssessmentsRepo.exists.mockResolvedValue(true);
      mockAssessmentsRepo.findById.mockResolvedValue(mockAssessment);
      mockAssessmentsRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteAssessment('sch-001', 'assess-001');

      expect(mockAssessmentsRepo.softDelete).toHaveBeenCalledWith('assess-001', 'sch-001');
    });
  });

  describe('createGovernancePolicy', () => {
    it('should create a governance policy', async () => {
      mockGovernancePoliciesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockGovernancePoliciesRepo.create.mockResolvedValue(mockGovernancePolicy);

      const result = await service.createGovernancePolicy('sch-001', {
        name: 'Password Policy',
        description: 'Password complexity requirements',
        category: 'ACCESS_CONTROL',
        version: '1.0',
        owner: '550e8400-e29b-41d4-a716-446655440000',
        approver: '550e8400-e29b-41d4-a716-446655440001',
        effective_date: new Date().toISOString(),
        effectiveDate: new Date().toISOString(),
        review_date: new Date(Date.now() + 365 * 86400000).toISOString(),
        reviewDate: new Date(Date.now() + 365 * 86400000).toISOString(),
      });

      expect(result).toEqual(mockGovernancePolicy);
    });

    it('should reject duplicate policy name', async () => {
      mockGovernancePoliciesRepo.findAll.mockResolvedValue({ data: [mockGovernancePolicy], total: 1 });

      await expect(service.createGovernancePolicy('sch-001', {
        name: 'Password Policy',
        description: 'Test',
        category: 'ACCESS_CONTROL',
        version: '1.0',
        owner: '550e8400-e29b-41d4-a716-446655440000',
        approver: '550e8400-e29b-41d4-a716-446655440001',
        effective_date: new Date().toISOString(),
        effectiveDate: new Date().toISOString(),
        review_date: new Date().toISOString(),
        reviewDate: new Date().toISOString(),
      })).rejects.toThrow();
    });
  });

  describe('approveGovernancePolicy', () => {
    it('should approve a policy in REVIEW status', async () => {
      mockGovernancePoliciesRepo.exists.mockResolvedValue(true);
      mockGovernancePoliciesRepo.findById.mockResolvedValue({ ...mockGovernancePolicy, status: 'REVIEW' });
      mockGovernancePoliciesRepo.update.mockResolvedValue({ ...mockGovernancePolicy, status: 'APPROVED' });

      const result = await service.approveGovernancePolicy('sch-001', 'gp-001', 'approver-001');

      expect(result.status).toBe('APPROVED');
    });

    it('should reject approving from invalid status', async () => {
      mockGovernancePoliciesRepo.exists.mockResolvedValue(true);
      mockGovernancePoliciesRepo.findById.mockResolvedValue(mockGovernancePolicy);

      await expect(service.approveGovernancePolicy('sch-001', 'gp-001', 'approver-001')).rejects.toThrow();
    });
  });

  describe('activateGovernancePolicy', () => {
    it('should activate an approved policy', async () => {
      mockGovernancePoliciesRepo.exists.mockResolvedValue(true);
      mockGovernancePoliciesRepo.findById.mockResolvedValue({ ...mockGovernancePolicy, status: 'APPROVED' });
      mockGovernancePoliciesRepo.update.mockResolvedValue({ ...mockGovernancePolicy, status: 'ACTIVE' });

      const result = await service.activateGovernancePolicy('sch-001', 'gp-001');

      expect(result.status).toBe('ACTIVE');
    });
  });

  describe('createRisk', () => {
    it('should create a risk', async () => {
      mockRiskRegistersRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockRiskRegistersRepo.create.mockResolvedValue(mockRisk);

      const result = await service.createRisk('sch-001', {
        name: 'Data Breach Risk',
        description: 'Risk of unauthorized data access',
        category: 'DATA_SECURITY',
        likelihood: 3,
        impact: 4,
        owner: 'CISO',
        treatment_plan: 'Implement DLP and encryption',
      });

      expect(result).toEqual(mockRisk);
      expect(result.risk_score).toBe(12);
      expect(result.risk_level).toBe('HIGH');
    });

    it('should reject duplicate risk name', async () => {
      mockRiskRegistersRepo.findAll.mockResolvedValue({ data: [mockRisk], total: 1 });

      await expect(service.createRisk('sch-001', {
        name: 'Data Breach Risk',
        description: 'Test',
        category: 'TEST',
        likelihood: 1,
        impact: 1,
        owner: 'test',
        treatment_plan: 'test',
      })).rejects.toThrow();
    });

    it('should reject invalid likelihood range', async () => {
      await expect(service.createRisk('sch-001', {
        name: 'Test Risk',
        description: 'Test',
        category: 'TEST',
        likelihood: 10,
        impact: 3,
        owner: 'test',
        treatment_plan: 'test',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('updateRisk', () => {
    it('should update a risk with recalculated score', async () => {
      mockRiskRegistersRepo.exists.mockResolvedValue(true);
      mockRiskRegistersRepo.findById.mockResolvedValue(mockRisk);
      mockRiskRegistersRepo.update.mockResolvedValue({ ...mockRisk, likelihood: 5, impact: 5, risk_score: 25, risk_level: 'CRITICAL' });

      const result = await service.updateRisk('sch-001', 'risk-001', { likelihood: 5, impact: 5 });

      expect(result.risk_score).toBe(25);
      expect(result.risk_level).toBe('CRITICAL');
    });
  });

  describe('deleteRisk', () => {
    it('should soft delete a risk', async () => {
      mockRiskRegistersRepo.exists.mockResolvedValue(true);
      mockRiskRegistersRepo.findById.mockResolvedValue(mockRisk);
      mockRiskRegistersRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteRisk('sch-001', 'risk-001');

      expect(mockRiskRegistersRepo.softDelete).toHaveBeenCalledWith('risk-001', 'sch-001');
    });
  });

  describe('createAuditLog', () => {
    it('should create an audit log', async () => {
      const mockAuditLog = {
        id: 'audit-001',
        action: 'LOGIN',
        actor: 'user-001',
        actor_type: 'USER',
        resource: 'session',
        resource_id: 'sess-001',
        result: 'SUCCESS',
      };
      mockAuditLogsRepo.create.mockResolvedValue(mockAuditLog);

      const result = await service.createAuditLog('sch-001', {
        action: 'LOGIN',
        actor: 'user-001',
        actor_type: 'USER',
        resource: 'session',
        resource_id: 'sess-001',
        result: 'SUCCESS',
      });

      expect(result).toEqual(mockAuditLog);
    });

    it('should reject invalid actor_type', async () => {
      await expect(service.createAuditLog('sch-001', {
        action: 'TEST',
        actor: 'test',
        actor_type: 'INVALID',
        resource: 'test',
        resource_id: 'test',
        result: 'SUCCESS',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getComplianceStats', () => {
    it('should return compliance statistics', async () => {
      mockAssessmentsRepo.findAll.mockResolvedValue({
        data: [
          { ...mockAssessment, status: 'COMPLIANT', score: 95, max_score: 100 },
          { ...mockAssessment, id: 'assess-002', status: 'NON_COMPLIANT', score: 50, max_score: 100 },
        ],
        total: 2,
      });

      const result = await service.getComplianceStats('sch-001');

      expect(result.totalAssessments).toBe(2);
      expect(result.compliant).toBe(1);
      expect(result.nonCompliant).toBe(1);
      expect(result.overallScore).toBeDefined();
    });
  });

  describe('getRiskStats', () => {
    it('should return risk statistics', async () => {
      mockRiskRegistersRepo.findAll.mockResolvedValue({
        data: [mockRisk, { ...mockRisk, id: 'risk-002', risk_level: 'LOW', status: 'CLOSED' }],
        total: 2,
      });

      const result = await service.getRiskStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.open).toBeDefined();
      expect(result.closed).toBeDefined();
      expect(result.byLevel).toBeDefined();
    });
  });

  describe('getGovernanceStats', () => {
    it('should return governance statistics', async () => {
      mockGovernancePoliciesRepo.findAll.mockResolvedValue({
        data: [mockGovernancePolicy, { ...mockGovernancePolicy, id: 'gp-002', status: 'ACTIVE', category: 'DATA_PRIVACY' }],
        total: 2,
      });

      const result = await service.getGovernanceStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.active).toBeDefined();
      expect(result.draft).toBeDefined();
      expect(result.byCategory).toBeDefined();
    });
  });
});
