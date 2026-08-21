import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MultiCloudService } from '../multi-cloud-service';
import { GecirapNotFoundError } from '@educi/errors';

const mockPlacementRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findRecent: vi.fn(),
};

const mockMigrationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findRunning: vi.fn(),
  findFailed: vi.fn(),
};

const mockBalanceRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findLowBalance: vi.fn(),
};

const mockCapabilityRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findAvailable: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const WORKLOAD_ID = '660e8400-e29b-41d4-a716-446655440001';
const PROVIDER_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockPlacement = {
  id: 'pd-001',
  school_id: SCHOOL_ID,
  workload_id: WORKLOAD_ID,
  resource_type: 'VM',
  resource_name: 'api-server',
  target_provider: 'AWS',
  target_account_id: PROVIDER_ID,
  target_region: 'us-east-1',
  decision_reason: 'Lowest latency',
  estimated_monthly_cost: 500,
  status: 'pending',
  decided_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockMigration = {
  id: 'mig-001',
  school_id: SCHOOL_ID,
  migration_name: 'GCP to AWS',
  source_provider: 'GCP',
  source_account_id: PROVIDER_ID,
  source_resource_id: WORKLOAD_ID,
  target_provider: 'AWS',
  target_account_id: PROVIDER_ID,
  target_region: 'us-east-1',
  migration_type: 'LIFT_AND_SHIFT',
  status: 'IN_PROGRESS',
  started_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockBalance = {
  id: 'bal-001',
  school_id: SCHOOL_ID,
  provider: 'AWS',
  account_id: PROVIDER_ID,
  balance_amount: 5000,
  currency: 'USD',
  last_synced_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockCapability = {
  id: 'cap-001',
  school_id: SCHOOL_ID,
  provider: 'AWS',
  capability_name: 'GPU Instances',
  capability_type: 'COMPUTE',
  region_code: 'us-east-1',
  is_available: true,
  specifications: { gpu_count: 4 },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: MultiCloudService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new MultiCloudService(
    mockPlacementRepo as never,
    mockMigrationRepo as never,
    mockBalanceRepo as never,
    mockCapabilityRepo as never,
  );
});

describe('MultiCloudService', () => {
  describe('listPlacements', () => {
    it('should list placement decisions for a school', async () => {
      mockPlacementRepo.findAll.mockResolvedValue({ data: [mockPlacement], total: 1 });

      const result = await service.listPlacements(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listPlacements('')).rejects.toThrow();
    });
  });

  describe('getPlacement', () => {
    it('should retrieve a placement by id', async () => {
      mockPlacementRepo.exists.mockResolvedValue(true);
      mockPlacementRepo.findById.mockResolvedValue(mockPlacement);

      const result = await service.getPlacement(SCHOOL_ID, 'pd-001');

      expect(result).toEqual(mockPlacement);
    });

    it('should throw if placement not found', async () => {
      mockPlacementRepo.exists.mockResolvedValue(false);

      await expect(service.getPlacement(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createPlacement', () => {
    it('should create a placement decision', async () => {
      mockPlacementRepo.create.mockResolvedValue(mockPlacement);

      const result = await service.createPlacement(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        resource_type: 'VM',
        resource_name: 'api-server',
        target_provider: 'AWS',
        target_account_id: PROVIDER_ID,
        target_region: 'us-east-1',
        decision_reason: 'Lowest latency',
        workloadId: WORKLOAD_ID,
        selectedCloud: 'AWS',
        selectedRegion: 'us-east-1',
        score: 85,
      });

      expect(result).toEqual(mockPlacement);
    });
  });

  describe('createMigration', () => {
    it('should create a cloud migration', async () => {
      mockMigrationRepo.create.mockResolvedValue(mockMigration);

      const result = await service.createMigration(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        migration_name: 'GCP to AWS',
        source_provider: 'GCP',
        source_account_id: PROVIDER_ID,
        source_resource_id: WORKLOAD_ID,
        target_provider: 'AWS',
        target_account_id: PROVIDER_ID,
        target_region: 'us-east-1',
        migration_type: 'LIFT_AND_SHIFT',
        sourceCloud: 'GCP',
        targetCloud: 'AWS',
        resources: [WORKLOAD_ID],
      });

      expect(result).toEqual(mockMigration);
    });
  });

  describe('createBalance', () => {
    it('should create a cloud balance', async () => {
      mockBalanceRepo.create.mockResolvedValue(mockBalance);

      const result = await service.createBalance(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'cloud-cost-balance',
        strategy: 'cost-optimized',
        targets: [{ cloud: 'AWS', weight: 60, current: 3000 }, { cloud: 'GCP', weight: 40, current: 2000 }],
      });

      expect(result).toEqual(mockBalance);
    });
  });

  describe('getLowBalances', () => {
    it('should return low balance accounts', async () => {
      mockBalanceRepo.findLowBalance.mockResolvedValue([mockBalance]);

      const result = await service.getLowBalances(SCHOOL_ID, 1000);

      expect(result).toHaveLength(1);
    });
  });

  describe('createCapability', () => {
    it('should create a provider capability', async () => {
      mockCapabilityRepo.create.mockResolvedValue(mockCapability);

      const result = await service.createCapability(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        provider: 'AWS',
        capability_name: 'GPU Instances',
        capability_type: 'COMPUTE',
        region_code: 'us-east-1',
        providerId: PROVIDER_ID,
        service: 'GPU Instances',
        region: 'us-east-1',
        costPerHour: 2.5,
        latency: 15,
      });

      expect(result).toEqual(mockCapability);
    });
  });

  describe('getMultiCloudOverview', () => {
    it('should return multi-cloud overview stats', async () => {
      mockPlacementRepo.findAll.mockResolvedValue({ data: [mockPlacement], total: 1 });
      mockMigrationRepo.findRunning.mockResolvedValue([mockMigration]);
      mockMigrationRepo.findFailed.mockResolvedValue({ data: [], total: 0 });
      mockBalanceRepo.findAll.mockResolvedValue({ data: [mockBalance], total: 1 });
      mockBalanceRepo.findLowBalance.mockResolvedValue([]);
      mockCapabilityRepo.findAvailable.mockResolvedValue([mockCapability]);

      const result = await service.getMultiCloudOverview(SCHOOL_ID);

      expect(result.totalPlacements).toBe(1);
      expect(result.activeMigrations).toBe(1);
      expect(result.totalBalances).toBe(1);
      expect(result.availableCapabilities).toBe(1);
    });
  });
});
