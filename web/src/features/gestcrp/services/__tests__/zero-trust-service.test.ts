import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ZeroTrustService } from '../zero-trust-service';
import { GestcrpNotFoundError, GestcrpValidationError } from '@educi/errors';

const mockPoliciesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockAssessmentsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockEvaluationsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockZonesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockContextsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockZeroTrustRepo = {
  policies: mockPoliciesRepo,
  assessments: mockAssessmentsRepo,
  evaluations: mockEvaluationsRepo,
  zones: mockZonesRepo,
  contexts: mockContextsRepo,
  findActivePolicies: vi.fn(),
  findBySubjectId: vi.fn(),
};

const mockPolicy = {
  id: 'pol-001',
  school_id: 'sch-001',
  name: 'Test Policy',
  description: 'Test description',
  enabled: true,
  enforcement_mode: 'STRICT',
  priority: 1,
  zones: [],
  conditions: [],
  actions: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockAssessment = {
  id: 'assess-001',
  school_id: 'sch-001',
  subject_type: 'USER' as const,
  subject_id: 'user-001',
  decision: 'ALLOW',
  confidence: 95,
  risk_score: 20,
  risk_factors: [],
  policies_evaluated: [],
  enforcement_actions: [],
  created_at: new Date().toISOString(),
};

const mockZone = {
  id: 'zone-001',
  school_id: 'sch-001',
  name: 'Internal Zone',
  description: 'Internal network zone',
  level: 5,
  policies: [],
  enabled: true,
  created_at: new Date().toISOString(),
};

let service: ZeroTrustService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new ZeroTrustService(mockZeroTrustRepo as never);
});

describe('ZeroTrustService', () => {
  describe('listPolicies', () => {
    it('should list policies for a school', async () => {
      mockPoliciesRepo.findAll.mockResolvedValue({ data: [mockPolicy], total: 1 });

      const result = await service.listPolicies('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(mockPoliciesRepo.findAll).toHaveBeenCalledWith('sch-001', expect.objectContaining({ limit: 50 }));
    });

    it('should reject empty school_id', async () => {
      await expect(service.listPolicies('')).rejects.toThrow(GestcrpValidationError);
    });

    it('should apply pagination params', async () => {
      mockPoliciesRepo.findAll.mockResolvedValue({ data: [], total: 0 });

      await service.listPolicies('sch-001', { offset: 10, limit: 25 });

      expect(mockPoliciesRepo.findAll).toHaveBeenCalledWith('sch-001', expect.objectContaining({ offset: 10, limit: 25 }));
    });
  });

  describe('getPolicy', () => {
    it('should retrieve a policy by id', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(true);
      mockPoliciesRepo.findById.mockResolvedValue(mockPolicy);

      const result = await service.getPolicy('sch-001', 'pol-001');

      expect(result).toEqual(mockPolicy);
    });

    it('should throw if policy not found', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(false);

      await expect(service.getPolicy('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('createPolicy', () => {
    it('should create a policy successfully', async () => {
      mockPoliciesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockPoliciesRepo.create.mockResolvedValue(mockPolicy);

      const result = await service.createPolicy('sch-001', {
        name: 'Test Policy',
        description: 'Test description',
        enforcement_mode: 'STRICT',
        enforcementMode: 'STRICT',
        zones: ['ENFORCE'],
        conditions: [{ field: 'ip', operator: 'IN_RANGE', value: '10.0.0.0/8', negate: false }],
        actions: [{ type: 'ALLOW', parameters: {}, fallback: 'DENY' }],
      });

      expect(result).toEqual(mockPolicy);
      expect(mockPoliciesRepo.create).toHaveBeenCalled();
    });

    it('should reject duplicate policy name', async () => {
      mockPoliciesRepo.findAll.mockResolvedValue({ data: [mockPolicy], total: 1 });

      await expect(service.createPolicy('sch-001', {
        name: 'Test Policy',
        description: 'Test description',
        enforcement_mode: 'STRICT',
        enforcementMode: 'STRICT',
        zones: ['ENFORCE'],
        conditions: [{ field: 'ip', operator: 'IN_RANGE', value: '10.0.0.0/8', negate: false }],
        actions: [{ type: 'ALLOW', parameters: {}, fallback: 'DENY' }],
      })).rejects.toThrow();
    });

    it('should reject missing required fields', async () => {
      await expect(service.createPolicy('sch-001', {
        name: 'Test Policy',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('updatePolicy', () => {
    it('should update a policy', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(true);
      mockPoliciesRepo.findById.mockResolvedValue(mockPolicy);
      mockPoliciesRepo.update.mockResolvedValue({ ...mockPolicy, name: 'Updated' });

      const result = await service.updatePolicy('sch-001', 'pol-001', { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });

    it('should throw if policy not found', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(false);

      await expect(service.updatePolicy('sch-001', 'nonexistent', { name: 'Updated' })).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('deletePolicy', () => {
    it('should soft delete a policy', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(true);
      mockPoliciesRepo.findById.mockResolvedValue(mockPolicy);
      mockPoliciesRepo.softDelete.mockResolvedValue(undefined);

      await service.deletePolicy('sch-001', 'pol-001');

      expect(mockPoliciesRepo.softDelete).toHaveBeenCalledWith('pol-001', 'sch-001');
    });

    it('should throw if policy not found', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(false);

      await expect(service.deletePolicy('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('togglePolicy', () => {
    it('should toggle policy enabled state', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(true);
      mockPoliciesRepo.findById.mockResolvedValue(mockPolicy);
      mockPoliciesRepo.update.mockResolvedValue({ ...mockPolicy, enabled: false });

      const result = await service.togglePolicy('sch-001', 'pol-001', false);

      expect(result.enabled).toBe(false);
    });
  });

  describe('createAssessment', () => {
    it('should create an assessment', async () => {
      mockAssessmentsRepo.create.mockResolvedValue(mockAssessment);

      const result = await service.createAssessment('sch-001', {
        subject_type: 'USER',
        subject_id: 'user-001',
        decision: 'ALLOW',
        confidence: 95,
        risk_score: 20,
      });

      expect(result).toEqual(mockAssessment);
    });

    it('should reject invalid subject_type', async () => {
      await expect(service.createAssessment('sch-001', {
        subject_type: 'INVALID',
        subject_id: 'user-001',
        decision: 'ALLOW',
        confidence: 95,
        risk_score: 20,
      })).rejects.toThrow(GestcrpValidationError);
    });

    it('should reject out of range confidence', async () => {
      await expect(service.createAssessment('sch-001', {
        subject_type: 'USER',
        subject_id: 'user-001',
        decision: 'ALLOW',
        confidence: 150,
        risk_score: 20,
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('createZone', () => {
    it('should create a zone', async () => {
      mockZonesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockZonesRepo.create.mockResolvedValue(mockZone);

      const result = await service.createZone('sch-001', {
        name: 'Internal Zone',
        description: 'Internal network zone',
        level: 5,
      });

      expect(result).toEqual(mockZone);
    });

    it('should reject duplicate zone name', async () => {
      mockZonesRepo.findAll.mockResolvedValue({ data: [mockZone], total: 1 });

      await expect(service.createZone('sch-001', {
        name: 'Internal Zone',
        description: 'Internal network zone',
        level: 5,
      })).rejects.toThrow();
    });

    it('should reject invalid level range', async () => {
      await expect(service.createZone('sch-001', {
        name: 'Test Zone',
        description: 'Test',
        level: 15,
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('createContext', () => {
    it('should create a context', async () => {
      const mockContext = {
        id: 'ctx-001',
        school_id: 'sch-001',
        user_id: 'user-001',
        device_id: 'dev-001',
        session_id: 'sess-001',
        ip_address: '192.168.1.1',
      };
      mockContextsRepo.create.mockResolvedValue(mockContext);

      const result = await service.createContext('sch-001', {
        user_id: 'user-001',
        device_id: 'dev-001',
        session_id: 'sess-001',
        ip_address: '192.168.1.1',
      });

      expect(result).toEqual(mockContext);
    });

    it('should reject missing required fields', async () => {
      await expect(service.createContext('sch-001', {
        user_id: 'user-001',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getPolicyStats', () => {
    it('should return policy statistics', async () => {
      mockPoliciesRepo.findAll.mockResolvedValue({
        data: [mockPolicy, { ...mockPolicy, id: 'pol-002', enabled: false, enforcement_mode: 'PERMISSIVE' }],
        total: 2,
      });

      const result = await service.getPolicyStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.active).toBe(1);
      expect(result.inactive).toBe(1);
      expect(result.byEnforcementMode['STRICT']).toBe(1);
      expect(result.byEnforcementMode['PERMISSIVE']).toBe(1);
    });
  });
});
