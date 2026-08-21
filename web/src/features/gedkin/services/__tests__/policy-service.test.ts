import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PolicyService } from '../policy-service';

const mockPolicyRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByStatus: vi.fn(),
  findByCategory: vi.fn(),
};

const mockSimulationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByPolicyId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const POLICY_ID = '660e8400-e29b-41d4-a716-446655440001';
const SIMULATION_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockPolicy = {
  id: POLICY_ID,
  school_id: SCHOOL_ID,
  name: 'Data Privacy Policy',
  description: 'Policy for data privacy',
  status: 'ACTIVE',
  category: 'COMPLIANCE',
  effectiveDate: '2024-01-01T00:00:00Z',
  expiryDate: '2025-12-31T00:00:00Z',
  content: 'All data must be encrypted...',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockSimulation = {
  id: SIMULATION_ID,
  school_id: SCHOOL_ID,
  policyId: POLICY_ID,
  parameters: { scenario: 'baseline' },
  results: { impact: 0.5 },
  confidence: 0.85,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: PolicyService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new PolicyService(
    mockPolicyRepo as never,
    mockSimulationRepo as never,
  );
});

describe('PolicyService', () => {
  describe('listPolicies', () => {
    it('should list policies for a school', async () => {
      mockPolicyRepo.findAll.mockResolvedValue({ data: [mockPolicy], total: 1, offset: 0, limit: 50 });

      const result = await service.listPolicies(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listPolicies('')).rejects.toThrow();
    });
  });

  describe('getPolicy', () => {
    it('should retrieve a policy by id', async () => {
      mockPolicyRepo.exists.mockResolvedValue(true);
      mockPolicyRepo.findById.mockResolvedValue(mockPolicy);

      const result = await service.getPolicy(SCHOOL_ID, POLICY_ID);

      expect(result).toEqual(mockPolicy);
    });

    it('should throw if policy not found', async () => {
      mockPolicyRepo.exists.mockResolvedValue(false);

      await expect(service.getPolicy(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createPolicy', () => {
    it('should create a policy successfully', async () => {
      mockPolicyRepo.create.mockResolvedValue(mockPolicy);

      const result = await service.createPolicy(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Data Privacy Policy',
        description: 'Policy for data privacy',
        status: 'ACTIVE',
        category: 'COMPLIANCE',
        effectiveDate: '2024-01-01T00:00:00Z',
        expiryDate: '2025-12-31T00:00:00Z',
        content: 'All data must be encrypted...',
      });

      expect(result).toEqual(mockPolicy);
    });
  });

  describe('updatePolicy', () => {
    it('should update a policy successfully', async () => {
      mockPolicyRepo.exists.mockResolvedValue(true);
      mockPolicyRepo.findById.mockResolvedValue(mockPolicy);
      mockPolicyRepo.update.mockResolvedValue({ ...mockPolicy, status: 'EXPIRED' });

      const result = await service.updatePolicy(SCHOOL_ID, POLICY_ID, {
        status: 'EXPIRED',
      });

      expect(result.status).toBe('EXPIRED');
    });

    it('should throw if policy not found on update', async () => {
      mockPolicyRepo.exists.mockResolvedValue(false);

      await expect(service.updatePolicy(SCHOOL_ID, 'nonexistent', { status: 'X' })).rejects.toThrow();
    });
  });

  describe('deletePolicy', () => {
    it('should soft delete a policy', async () => {
      mockPolicyRepo.exists.mockResolvedValue(true);
      mockPolicyRepo.findById.mockResolvedValue(mockPolicy);
      mockPolicyRepo.softDelete.mockResolvedValue(undefined);

      await service.deletePolicy(SCHOOL_ID, POLICY_ID);

      expect(mockPolicyRepo.softDelete).toHaveBeenCalledWith(POLICY_ID, SCHOOL_ID);
    });
  });

  describe('listByStatus', () => {
    it('should list policies by status', async () => {
      mockPolicyRepo.findByStatus.mockResolvedValue({ data: [mockPolicy], total: 1, offset: 0, limit: 50 });

      const result = await service.listByStatus(SCHOOL_ID, 'ACTIVE');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('listByCategory', () => {
    it('should list policies by category', async () => {
      mockPolicyRepo.findByCategory.mockResolvedValue({ data: [mockPolicy], total: 1, offset: 0, limit: 50 });

      const result = await service.listByCategory(SCHOOL_ID, 'COMPLIANCE');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createSimulation', () => {
    it('should create a simulation successfully', async () => {
      mockSimulationRepo.create.mockResolvedValue(mockSimulation);

      const result = await service.createSimulation(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        policyId: POLICY_ID,
        parameters: { scenario: 'baseline' },
        results: { impact: 0.5 },
        confidence: 0.85,
      });

      expect(result).toEqual(mockSimulation);
    });
  });

  describe('listByPolicy', () => {
    it('should list simulations by policy', async () => {
      mockSimulationRepo.findByPolicyId.mockResolvedValue({ data: [mockSimulation], total: 1, offset: 0, limit: 50 });

      const result = await service.listByPolicy(SCHOOL_ID, POLICY_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('getPolicyStats', () => {
    it('should return policy statistics', async () => {
      mockPolicyRepo.findAll.mockResolvedValue({ data: [mockPolicy], total: 1, offset: 0, limit: 1000 });
      mockSimulationRepo.findAll.mockResolvedValue({ data: [mockSimulation], total: 1, offset: 0, limit: 1000 });

      const result = await service.getPolicyStats(SCHOOL_ID);

      expect(result.totalPolicies).toBe(1);
      expect(result.totalSimulations).toBe(1);
      expect(result.byStatus['ACTIVE']).toBe(1);
      expect(result.byCategory['COMPLIANCE']).toBe(1);
    });
  });
});
