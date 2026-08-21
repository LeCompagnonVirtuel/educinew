import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BCPService } from '../bcp-service';
import { GestcrpNotFoundError, GestcrpValidationError, GestcrpBackupPolicyError, GestcrpBCPPlanError } from '@educi/errors';

const mockPlansRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockBackupPoliciesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockBackupJobsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockDRTestResultsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockBCPRepo = {
  plans: mockPlansRepo,
  backupPolicies: mockBackupPoliciesRepo,
  backupJobs: mockBackupJobsRepo,
  drTestResults: mockDRTestResultsRepo,
  findActivePlans: vi.fn(),
  findRecentBackupJobs: vi.fn(),
  findFailedBackupJobs: vi.fn(),
};

const mockPlan = {
  id: 'plan-001',
  school_id: 'sch-001',
  name: 'Main BCP Plan',
  description: 'Business continuity plan for critical operations',
  status: 'DRAFT' as const,
  scope: 'All critical systems',
  objectives: ['Maintain operations during outage'],
  critical_functions: ['Student enrollment', 'Payment processing'],
  recovery_procedures: [],
  roles: [],
  communication_plan: {},
  testing_schedule: {},
  created_at: new Date().toISOString(),
};

const mockBackupPolicy = {
  id: 'bp-001',
  school_id: 'sch-001',
  name: 'Daily Database Backup',
  description: 'Full backup of all databases',
  enabled: true,
  backup_type: 'FULL' as const,
  schedule: '0 2 * * *',
  retention_days: 30,
  encryption_enabled: true,
  compression_enabled: true,
  target_location: 'CLOUD' as const,
  sources: ['database'],
  verify_after_backup: true,
  last_backup_status: 'SUCCESS',
  created_at: new Date().toISOString(),
};

const mockBackupJob = {
  id: 'job-001',
  school_id: 'sch-001',
  policy_id: 'bp-001',
  status: 'RUNNING' as const,
  started_at: new Date().toISOString(),
  total_size: 0,
  compressed_size: 0,
  files_count: 0,
  encrypted: true,
  verified: false,
  created_at: new Date().toISOString(),
};

let service: BCPService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new BCPService(mockBCPRepo as never);
});

describe('BCPService', () => {
  describe('listPlans', () => {
    it('should list BCP plans', async () => {
      mockPlansRepo.findAll.mockResolvedValue({ data: [mockPlan], total: 1 });

      const result = await service.listPlans('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listPlans('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getPlan', () => {
    it('should retrieve a plan by id', async () => {
      mockPlansRepo.exists.mockResolvedValue(true);
      mockPlansRepo.findById.mockResolvedValue(mockPlan);

      const result = await service.getPlan('sch-001', 'plan-001');

      expect(result).toEqual(mockPlan);
    });

    it('should throw if plan not found', async () => {
      mockPlansRepo.exists.mockResolvedValue(false);

      await expect(service.getPlan('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('createPlan', () => {
    it('should create a plan successfully', async () => {
      mockPlansRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockPlansRepo.create.mockResolvedValue(mockPlan);

      const result = await service.createPlan('sch-001', {
        name: 'Main BCP Plan',
        description: 'Business continuity plan',
        scope: 'All critical systems',
        objectives: ['Maintain operations'],
        critical_functions: ['Student enrollment'],
        criticalFunctions: [{
          name: 'Student enrollment',
          description: 'Student enrollment system',
          importance: 'CRITICAL',
          maxTolerableDowntime: 60,
          recoveryTimeObjective: 30,
          recoveryPointObjective: 15,
          owner: '550e8400-e29b-41d4-a716-446655440000',
        }],
      });

      expect(result).toEqual(mockPlan);
    });

    it('should reject duplicate plan name', async () => {
      mockPlansRepo.findAll.mockResolvedValue({ data: [mockPlan], total: 1 });

      await expect(service.createPlan('sch-001', {
        name: 'Main BCP Plan',
        description: 'Test',
        scope: 'Test',
        objectives: [],
        critical_functions: [],
      })).rejects.toThrow();
    });
  });

  describe('activatePlan', () => {
    it('should activate a draft plan', async () => {
      mockPlansRepo.exists.mockResolvedValue(true);
      mockPlansRepo.findById.mockResolvedValue(mockPlan);
      mockPlansRepo.update.mockResolvedValue({ ...mockPlan, status: 'ACTIVE' });

      const result = await service.activatePlan('sch-001', 'plan-001');

      expect(result.status).toBe('ACTIVE');
    });

    it('should reject activating from invalid status', async () => {
      mockPlansRepo.exists.mockResolvedValue(true);
      mockPlansRepo.findById.mockResolvedValue({ ...mockPlan, status: 'ACTIVE' });

      await expect(service.activatePlan('sch-001', 'plan-001')).rejects.toThrow();
    });
  });

  describe('archivePlan', () => {
    it('should archive a plan', async () => {
      mockPlansRepo.exists.mockResolvedValue(true);
      mockPlansRepo.findById.mockResolvedValue({ ...mockPlan, status: 'ACTIVE' });
      mockPlansRepo.update.mockResolvedValue({ ...mockPlan, status: 'ARCHIVED' });

      const result = await service.archivePlan('sch-001', 'plan-001');

      expect(result.status).toBe('ARCHIVED');
    });
  });

  describe('deletePlan', () => {
    it('should soft delete a plan', async () => {
      mockPlansRepo.exists.mockResolvedValue(true);
      mockPlansRepo.findById.mockResolvedValue(mockPlan);
      mockPlansRepo.softDelete.mockResolvedValue(undefined);

      await service.deletePlan('sch-001', 'plan-001');

      expect(mockPlansRepo.softDelete).toHaveBeenCalledWith('plan-001', 'sch-001');
    });
  });

  describe('createBackupPolicy', () => {
    it('should create a backup policy', async () => {
      mockBackupPoliciesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockBackupPoliciesRepo.create.mockResolvedValue(mockBackupPolicy);

      const result = await service.createBackupPolicy('sch-001', {
        name: 'Daily Database Backup',
        description: 'Full backup of all databases',
        backup_type: 'FULL',
        schedule: '0 2 * * *',
        retention_days: 30,
        target_location: 'CLOUD',
        sources: ['database'],
      });

      expect(result).toEqual(mockBackupPolicy);
    });

    it('should reject duplicate policy name', async () => {
      mockBackupPoliciesRepo.findAll.mockResolvedValue({ data: [mockBackupPolicy], total: 1 });

      await expect(service.createBackupPolicy('sch-001', {
        name: 'Daily Database Backup',
        description: 'Test',
        backup_type: 'FULL',
        schedule: '0 2 * * *',
        retention_days: 30,
        target_location: 'CLOUD',
        sources: [],
      })).rejects.toThrow();
    });

    it('should reject invalid backup_type', async () => {
      await expect(service.createBackupPolicy('sch-001', {
        name: 'Test',
        description: 'Test',
        backup_type: 'INVALID',
        schedule: '0 2 * * *',
        retention_days: 30,
        target_location: 'CLOUD',
        sources: [],
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('startBackupJob', () => {
    it('should start a backup job', async () => {
      mockBackupPoliciesRepo.exists.mockResolvedValue(true);
      mockBackupJobsRepo.create.mockResolvedValue(mockBackupJob);

      const result = await service.startBackupJob('sch-001', 'bp-001');

      expect(result).toEqual(mockBackupJob);
    });

    it('should reject non-existent policy', async () => {
      mockBackupPoliciesRepo.exists.mockResolvedValue(false);

      await expect(service.startBackupJob('sch-001', 'nonexistent')).rejects.toThrow(GestcrpBackupPolicyError);
    });
  });

  describe('completeBackupJob', () => {
    it('should complete a backup job', async () => {
      mockBackupJobsRepo.exists.mockResolvedValue(true);
      mockBackupJobsRepo.findById.mockResolvedValue(mockBackupJob);
      mockBackupJobsRepo.update.mockResolvedValue({ ...mockBackupJob, status: 'COMPLETED' });

      const result = await service.completeBackupJob('sch-001', 'job-001', {
        total_size: 1024000,
        compressed_size: 512000,
        files_count: 100,
        verified: true,
      });

      expect(result.status).toBe('COMPLETED');
    });
  });

  describe('failBackupJob', () => {
    it('should fail a backup job', async () => {
      mockBackupJobsRepo.exists.mockResolvedValue(true);
      mockBackupJobsRepo.findById.mockResolvedValue(mockBackupJob);
      mockBackupJobsRepo.update.mockResolvedValue({ ...mockBackupJob, status: 'FAILED' });

      const result = await service.failBackupJob('sch-001', 'job-001', 'Disk full');

      expect(result.status).toBe('FAILED');
    });
  });

  describe('createDRTestResult', () => {
    it('should create a DR test result', async () => {
      const mockDRTest = {
        id: 'dr-001',
        school_id: 'sch-001',
        plan_id: 'plan-001',
        procedure_id: 'proc-001',
        duration: 300,
        success: true,
      };
      mockPlansRepo.exists.mockResolvedValue(true);
      mockDRTestResultsRepo.create.mockResolvedValue(mockDRTest);
      mockPlansRepo.update.mockResolvedValue(mockPlan);

      const result = await service.createDRTestResult('sch-001', {
        plan_id: 'plan-001',
        procedure_id: 'proc-001',
        duration: 300,
        success: true,
      });

      expect(result).toEqual(mockDRTest);
    });

    it('should reject non-existent plan', async () => {
      mockPlansRepo.exists.mockResolvedValue(false);

      await expect(service.createDRTestResult('sch-001', {
        plan_id: 'nonexistent',
        procedure_id: 'proc-001',
        duration: 300,
        success: true,
      })).rejects.toThrow(GestcrpBCPPlanError);
    });
  });

  describe('getBCPStats', () => {
    it('should return BCP statistics', async () => {
      mockPlansRepo.findAll.mockResolvedValue({ data: [mockPlan], total: 1 });
      mockBackupPoliciesRepo.findAll.mockResolvedValue({ data: [mockBackupPolicy], total: 1 });
      mockBackupJobsRepo.findAll.mockResolvedValue({ data: [mockBackupJob], total: 1 });
      mockDRTestResultsRepo.findAll.mockResolvedValue({ data: [], total: 0 });

      const result = await service.getBCPStats('sch-001');

      expect(result.totalPlans).toBe(1);
      expect(result.activePlans).toBeDefined();
      expect(result.totalBackupPolicies).toBe(1);
      expect(result.totalBackupJobs).toBe(1);
    });
  });
});
