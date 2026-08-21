import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DisasterRecoveryService } from '../disaster-recovery-service';
import { GecirapNotFoundError } from '@educi/errors';

const mockPlanRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
  findExpired: vi.fn(),
};

const mockStrategyRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByPlanId: vi.fn(),
};

const mockExecutionRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findRunning: vi.fn(),
  findFailed: vi.fn(),
};

const mockTestRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findFailed: vi.fn(),
  findScheduled: vi.fn(),
};

const mockDependencyRepo = {
  findAll: vi.fn(),
  create: vi.fn(),
  findByPlanId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const PLAN_ID = '660e8400-e29b-41d4-a716-446655440001';
const STRATEGY_ID = '770e8400-e29b-41d4-a716-446655440002';
const EXEC_ID = '880e8400-e29b-41d4-a716-446655440003';
const TEST_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockPlan = {
  id: PLAN_ID,
  school_id: SCHOOL_ID,
  name: 'Full DR Plan',
  description: 'Complete disaster recovery plan',
  plan_type: 'FULL',
  priority: 1,
  rto_hours: 4,
  rpo_hours: 1,
  status: 'active',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockStrategy = {
  id: STRATEGY_ID,
  school_id: SCHOOL_ID,
  plan_id: PLAN_ID,
  strategy_name: 'Failover to DR Region',
  strategy_type: 'FAILOVER',
  priority: 1,
  estimated_recovery_time_minutes: 60,
  steps: [{ order: 1, action: 'stop_primary' }],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockExecution = {
  id: EXEC_ID,
  school_id: SCHOOL_ID,
  plan_id: PLAN_ID,
  strategy_id: STRATEGY_ID,
  trigger_type: 'MANUAL',
  status: 'running',
  started_at: new Date().toISOString(),
  success: false,
  logs: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockTest = {
  id: TEST_ID,
  school_id: SCHOOL_ID,
  plan_id: PLAN_ID,
  test_type: 'TABLETOP',
  status: 'scheduled',
  scheduled_at: new Date().toISOString(),
  passed: false,
  findings: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: DisasterRecoveryService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new DisasterRecoveryService(
    mockPlanRepo as never,
    mockStrategyRepo as never,
    mockExecutionRepo as never,
    mockTestRepo as never,
    mockDependencyRepo as never,
  );
});

describe('DisasterRecoveryService', () => {
  describe('listPlans', () => {
    it('should list DR plans for a school', async () => {
      mockPlanRepo.findAll.mockResolvedValue({ data: [mockPlan], total: 1 });

      const result = await service.listPlans(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listPlans('')).rejects.toThrow();
    });
  });

  describe('getPlan', () => {
    it('should retrieve a DR plan by id', async () => {
      mockPlanRepo.exists.mockResolvedValue(true);
      mockPlanRepo.findById.mockResolvedValue(mockPlan);

      const result = await service.getPlan(SCHOOL_ID, PLAN_ID);

      expect(result).toEqual(mockPlan);
    });

    it('should throw if plan not found', async () => {
      mockPlanRepo.exists.mockResolvedValue(false);

      await expect(service.getPlan(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createPlan', () => {
    it('should create a DR plan successfully', async () => {
      mockPlanRepo.create.mockResolvedValue(mockPlan);

      const result = await service.createPlan(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Full DR Plan',
        description: 'Complete disaster recovery plan',
        plan_type: 'FULL',
        priority: 1,
        rto_hours: 4,
        rpo_hours: 1,
        rtoObjective: 4,
        rpoObjective: 1,
      });

      expect(result).toEqual(mockPlan);
    });
  });

  describe('createStrategy', () => {
    it('should create a recovery strategy', async () => {
      mockPlanRepo.exists.mockResolvedValue(true);
      mockStrategyRepo.create.mockResolvedValue(mockStrategy);

      const result = await service.createStrategy(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        plan_id: PLAN_ID,
        planId: PLAN_ID,
        strategy_name: 'Failover to DR Region',
        name: 'Failover to DR Region',
        strategy_type: 'BACKUP_RESTORE',
        type: 'BACKUP_RESTORE',
        priority: 1,
        estimated_recovery_time_minutes: 60,
        steps: [{ order: 1, action: 'stop_primary', params: {} }],
      });

      expect(result).toEqual(mockStrategy);
    });
  });

  describe('createExecution', () => {
    it('should create a recovery execution', async () => {
      mockPlanRepo.exists.mockResolvedValue(true);
      mockStrategyRepo.exists.mockResolvedValue(true);
      mockExecutionRepo.create.mockResolvedValue(mockExecution);

      const result = await service.createExecution(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        plan_id: PLAN_ID,
        planId: PLAN_ID,
        strategy_id: STRATEGY_ID,
        strategyId: STRATEGY_ID,
        trigger_type: 'MANUAL',
      });

      expect(result).toEqual(mockExecution);
    });
  });

  describe('createTest', () => {
    it('should create a recovery test', async () => {
      mockPlanRepo.exists.mockResolvedValue(true);
      mockTestRepo.create.mockResolvedValue(mockTest);

      const result = await service.createTest(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        plan_id: PLAN_ID,
        planId: PLAN_ID,
        test_type: 'TABLETOP',
        scheduled_at: new Date().toISOString(),
      });

      expect(result).toEqual(mockTest);
    });
  });

  describe('getDROverview', () => {
    it('should return DR overview stats', async () => {
      mockPlanRepo.findAll.mockResolvedValue({ data: [mockPlan], total: 1 });
      mockStrategyRepo.findAll.mockResolvedValue({ data: [mockStrategy], total: 1 });
      mockExecutionRepo.findAll.mockResolvedValue({ data: [mockExecution], total: 1 });
      mockTestRepo.findScheduled.mockResolvedValue([mockTest]);
      mockPlanRepo.findExpired.mockResolvedValue([]);

      const result = await service.getDROverview(SCHOOL_ID);

      expect(result.totalPlans).toBe(1);
      expect(result.activePlans).toBe(1);
      expect(result.totalStrategies).toBe(1);
      expect(result.scheduledTests).toBe(1);
    });
  });
});
