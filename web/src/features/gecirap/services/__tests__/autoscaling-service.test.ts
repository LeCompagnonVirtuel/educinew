import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AutoscalingService } from '../autoscaling-service';
import { GecirapScalingPolicyError, GecirapNotFoundError } from '@educi/errors';

const mockPolicyRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
  findByResource: vi.fn(),
};

const mockEventRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findRecent: vi.fn(),
  findByPolicyId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const RESOURCE_ID = '660e8400-e29b-41d4-a716-446655440001';
const POLICY_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockScalingPolicy = {
  id: POLICY_ID,
  school_id: SCHOOL_ID,
  name: 'cpu-based-scaling',
  resource_type: 'VM',
  resource_id: RESOURCE_ID,
  policy_type: 'TARGET_TRACKING',
  min_replicas: 2,
  max_replicas: 10,
  scale_up_threshold: 80,
  scale_down_threshold: 20,
  cooldown_seconds: 300,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockScalingEvent = {
  id: 'evt-001',
  school_id: SCHOOL_ID,
  policy_id: POLICY_ID,
  event_type: 'SCALE_UP',
  previous_replicas: 2,
  desired_replicas: 4,
  triggered_at: new Date().toISOString(),
  status: 'completed',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: AutoscalingService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new AutoscalingService(
    mockPolicyRepo as never,
    mockEventRepo as never,
  );
});

describe('AutoscalingService', () => {
  describe('listPolicies', () => {
    it('should list scaling policies for a school', async () => {
      mockPolicyRepo.findAll.mockResolvedValue({ data: [mockScalingPolicy], total: 1 });

      const result = await service.listPolicies(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listPolicies('')).rejects.toThrow();
    });
  });

  describe('getPolicy', () => {
    it('should retrieve a scaling policy by id', async () => {
      mockPolicyRepo.exists.mockResolvedValue(true);
      mockPolicyRepo.findById.mockResolvedValue(mockScalingPolicy);

      const result = await service.getPolicy(SCHOOL_ID, POLICY_ID);

      expect(result).toEqual(mockScalingPolicy);
    });

    it('should throw if policy not found', async () => {
      mockPolicyRepo.exists.mockResolvedValue(false);

      await expect(service.getPolicy(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createPolicy', () => {
    it('should create a scaling policy successfully', async () => {
      mockPolicyRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockPolicyRepo.create.mockResolvedValue(mockScalingPolicy);

      const result = await service.createPolicy(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'cpu-based-scaling',
        resource_type: 'VM',
        resourceType: 'VM',
        resource_id: RESOURCE_ID,
        resourceId: RESOURCE_ID,
        policy_type: 'TARGET_TRACKING',
        trigger: 'CPU',
        min_replicas: 2,
        minSize: 2,
        max_replicas: 10,
        maxSize: 10,
        cooldown: 300,
        cooldown_seconds: 300,
        scale_up_threshold: 80,
        scale_down_threshold: 20,
        conditions: [{ metric: 'cpu', operator: '>', threshold: 80 }],
      });

      expect(result).toEqual(mockScalingPolicy);
    });

    it('should reject duplicate policy name', async () => {
      mockPolicyRepo.findAll.mockResolvedValue({ data: [mockScalingPolicy], total: 1 });

      await expect(service.createPolicy(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'cpu-based-scaling',
        resource_type: 'VM',
        resourceType: 'VM',
        resource_id: RESOURCE_ID,
        resourceId: RESOURCE_ID,
        policy_type: 'TARGET_TRACKING',
        trigger: 'CPU',
        min_replicas: 2,
        minSize: 2,
        max_replicas: 10,
        maxSize: 10,
        cooldown: 300,
        cooldown_seconds: 300,
        scale_up_threshold: 80,
        scale_down_threshold: 20,
        conditions: [{ metric: 'cpu', operator: '>', threshold: 80 }],
      })).rejects.toThrow(GecirapScalingPolicyError);
    });
  });

  describe('togglePolicy', () => {
    it('should toggle policy active state', async () => {
      mockPolicyRepo.exists.mockResolvedValue(true);
      mockPolicyRepo.findById.mockResolvedValue(mockScalingPolicy);
      mockPolicyRepo.update.mockResolvedValue({ ...mockScalingPolicy, is_active: false });

      const result = await service.togglePolicy(SCHOOL_ID, POLICY_ID, false);

      expect(result.is_active).toBe(false);
    });
  });

  describe('createEvent', () => {
    it('should create a scaling event', async () => {
      mockPolicyRepo.exists.mockResolvedValue(true);
      mockEventRepo.create.mockResolvedValue(mockScalingEvent);

      const result = await service.createEvent(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        policy_id: POLICY_ID,
        policyId: POLICY_ID,
        event_type: 'SCALE_UP',
        direction: 'UP',
        previous_replicas: 2,
        from: 2,
        desired_replicas: 4,
        to: 4,
        reason: 'High CPU',
        duration: 30,
      });

      expect(result).toEqual(mockScalingEvent);
    });
  });

  describe('getScalingOverview', () => {
    it('should return scaling overview stats', async () => {
      mockPolicyRepo.findAll.mockResolvedValue({
        data: [mockScalingPolicy, { ...mockScalingPolicy, id: 'sp-002', is_active: false }],
        total: 2,
      });
      mockEventRepo.findRecent.mockResolvedValue([mockScalingEvent]);

      const result = await service.getScalingOverview(SCHOOL_ID);

      expect(result.totalPolicies).toBe(2);
      expect(result.activePolicies).toBe(1);
      expect(result.totalEvents).toBe(1);
    });
  });
});
