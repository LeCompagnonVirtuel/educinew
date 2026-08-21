import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FinOpsService } from '../finops-service';
import { GecirapNotFoundError } from '@educi/errors';

const mockCostCenterRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findRoots: vi.fn(),
  findByParentId: vi.fn(),
};

const mockBudgetRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
  findExceeded: vi.fn(),
  findByCostCenterId: vi.fn(),
};

const mockAllocationRepo = {
  findAll: vi.fn(),
  create: vi.fn(),
  findByCostCenterId: vi.fn(),
  findByAccountId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const COST_CENTER_ID = '660e8400-e29b-41d4-a716-446655440001';
const BUDGET_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockCostCenter = {
  id: COST_CENTER_ID,
  school_id: SCHOOL_ID,
  name: 'Cloud Infrastructure',
  budget: 10000,
  spent: 5000,
  forecast: 8000,
  status: 'ON_TRACK',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockBudget = {
  id: BUDGET_ID,
  school_id: SCHOOL_ID,
  name: 'monthly-aws-budget',
  amount: 5000,
  period: 'MONTHLY',
  spent: 1500,
  forecast: 4500,
  alertThreshold: 80,
  status: 'ON_TRACK',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockAllocation = {
  id: 'alloc-001',
  school_id: SCHOOL_ID,
  cost_center_id: COST_CENTER_ID,
  account_id: 'acc-001',
  allocation_percent: 60,
  cost_amount: 3000,
  period_start: new Date().toISOString(),
  period_end: new Date().toISOString(),
};

let service: FinOpsService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new FinOpsService(
    mockCostCenterRepo as never,
    mockBudgetRepo as never,
    mockAllocationRepo as never,
  );
});

describe('FinOpsService', () => {
  describe('listCostCenters', () => {
    it('should list cost centers for a school', async () => {
      mockCostCenterRepo.findAll.mockResolvedValue({ data: [mockCostCenter], total: 1 });

      const result = await service.listCostCenters(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listCostCenters('')).rejects.toThrow();
    });
  });

  describe('getCostCenter', () => {
    it('should retrieve a cost center by id', async () => {
      mockCostCenterRepo.exists.mockResolvedValue(true);
      mockCostCenterRepo.findById.mockResolvedValue(mockCostCenter);

      const result = await service.getCostCenter(SCHOOL_ID, COST_CENTER_ID);

      expect(result).toEqual(mockCostCenter);
    });

    it('should throw if cost center not found', async () => {
      mockCostCenterRepo.exists.mockResolvedValue(false);

      await expect(service.getCostCenter(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createCostCenter', () => {
    it('should create a cost center successfully', async () => {
      mockCostCenterRepo.create.mockResolvedValue(mockCostCenter);

      const result = await service.createCostCenter(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Cloud Infrastructure',
        budget: 10000,
        currency: 'USD',
      });

      expect(result).toEqual(mockCostCenter);
    });
  });

  describe('createBudget', () => {
    it('should create a budget', async () => {
      mockBudgetRepo.create.mockResolvedValue(mockBudget);

      const result = await service.createBudget(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'monthly-aws-budget',
        amount: 5000,
        period: 'MONTHLY',
      });

      expect(result).toEqual(mockBudget);
    });
  });

  describe('createAllocation', () => {
    it('should create a cost allocation', async () => {
      mockAllocationRepo.create.mockResolvedValue(mockAllocation);

      const result = await service.createAllocation(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        cost_center_id: COST_CENTER_ID,
        costId: COST_CENTER_ID,
        account_id: 'acc-001',
        school: 'Main School',
        module: 'Infrastructure',
        department: 'IT',
        allocation_percent: 60,
        percentage: 60,
        cost_amount: 3000,
        amount: 3000,
        period_start: new Date().toISOString(),
        period_end: new Date().toISOString(),
      });

      expect(result).toEqual(mockAllocation);
    });
  });

  describe('deleteCostCenter', () => {
    it('should soft delete a cost center', async () => {
      mockCostCenterRepo.exists.mockResolvedValue(true);
      mockCostCenterRepo.findById.mockResolvedValue(mockCostCenter);
      mockBudgetRepo.findByCostCenterId.mockResolvedValue({ data: [], total: 0 });
      mockCostCenterRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteCostCenter(SCHOOL_ID, COST_CENTER_ID);

      expect(mockCostCenterRepo.softDelete).toHaveBeenCalledWith(COST_CENTER_ID, SCHOOL_ID);
    });
  });

  describe('getFinOpsOverview', () => {
    it('should return finops overview stats', async () => {
      mockCostCenterRepo.findAll.mockResolvedValue({ data: [mockCostCenter], total: 1 });
      mockBudgetRepo.findAll.mockResolvedValue({ data: [mockBudget], total: 1 });
      mockBudgetRepo.findActive.mockResolvedValue([mockBudget]);
      mockBudgetRepo.findExceeded.mockResolvedValue([]);
      mockAllocationRepo.findAll.mockResolvedValue({ data: [mockAllocation], total: 1 });

      const result = await service.getFinOpsOverview(SCHOOL_ID);

      expect(result.totalCostCenters).toBe(1);
      expect(result.totalBudgets).toBe(1);
      expect(result.activeBudgets).toBe(1);
      expect(result.exceededBudgets).toBe(0);
      expect(result.totalAllocations).toBe(1);
    });
  });
});
