import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SOARService } from '../soar-service';
import { GestcrpNotFoundError, GestcrpValidationError } from '@educi/errors';

const mockPlaybooksRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockExecutionsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockSOARRepo = {
  playbooks: mockPlaybooksRepo,
  executions: mockExecutionsRepo,
  findActivePlaybooks: vi.fn(),
  findRecentExecutions: vi.fn(),
  findFailedExecutions: vi.fn(),
};

const mockPlaybook = {
  id: 'pb-001',
  school_id: 'sch-001',
  name: 'Incident Response Playbook',
  description: 'Automated incident response workflow',
  enabled: true,
  trigger: 'INCIDENT_CREATED',
  conditions: [],
  steps: [
    { name: 'Step 1', type: 'ACTION', config: {} },
    { name: 'Step 2', type: 'NOTIFICATION', config: {} },
  ],
  on_success: [],
  on_failure: [],
  execution_count: 5,
  average_execution_time: 120,
  created_at: new Date().toISOString(),
};

const mockExecution = {
  id: 'exec-001',
  school_id: 'sch-001',
  playbook_id: 'pb-001',
  trigger: 'INCIDENT_CREATED',
  triggered_by: 'user-001',
  status: 'RUNNING' as const,
  steps: [],
  started_at: new Date().toISOString(),
  result: {},
  created_at: new Date().toISOString(),
};

let service: SOARService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new SOARService(mockSOARRepo as never);
});

describe('SOARService', () => {
  describe('listPlaybooks', () => {
    it('should list playbooks for a school', async () => {
      mockPlaybooksRepo.findAll.mockResolvedValue({ data: [mockPlaybook], total: 1 });

      const result = await service.listPlaybooks('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listPlaybooks('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getPlaybook', () => {
    it('should retrieve a playbook by id', async () => {
      mockPlaybooksRepo.exists.mockResolvedValue(true);
      mockPlaybooksRepo.findById.mockResolvedValue(mockPlaybook);

      const result = await service.getPlaybook('sch-001', 'pb-001');

      expect(result).toEqual(mockPlaybook);
    });

    it('should throw if playbook not found', async () => {
      mockPlaybooksRepo.exists.mockResolvedValue(false);

      await expect(service.getPlaybook('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('createPlaybook', () => {
    it('should create a playbook successfully', async () => {
      mockPlaybooksRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockPlaybooksRepo.create.mockResolvedValue(mockPlaybook);

      const result = await service.createPlaybook('sch-001', {
        name: 'Incident Response Playbook',
        description: 'Automated incident response workflow',
        trigger: 'INCIDENT_CREATED',
        conditions: [],
        steps: [{
          id: 'step-1',
          name: 'Step 1',
          type: 'ACTION',
          parameters: {},
          timeout: 300,
          retryCount: 0,
        }],
      });

      expect(result).toEqual(mockPlaybook);
    });

    it('should reject duplicate playbook name', async () => {
      mockPlaybooksRepo.findAll.mockResolvedValue({ data: [mockPlaybook], total: 1 });

      await expect(service.createPlaybook('sch-001', {
        name: 'Incident Response Playbook',
        description: 'Test',
        trigger: 'INCIDENT_CREATED',
        conditions: [],
        steps: [],
      })).rejects.toThrow();
    });

    it('should reject missing required fields', async () => {
      await expect(service.createPlaybook('sch-001', {
        name: 'Test',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('updatePlaybook', () => {
    it('should update a playbook', async () => {
      mockPlaybooksRepo.exists.mockResolvedValue(true);
      mockPlaybooksRepo.findById.mockResolvedValue(mockPlaybook);
      mockPlaybooksRepo.update.mockResolvedValue({ ...mockPlaybook, name: 'Updated' });

      const result = await service.updatePlaybook('sch-001', 'pb-001', { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deletePlaybook', () => {
    it('should soft delete a playbook', async () => {
      mockPlaybooksRepo.exists.mockResolvedValue(true);
      mockPlaybooksRepo.findById.mockResolvedValue(mockPlaybook);
      mockPlaybooksRepo.softDelete.mockResolvedValue(undefined);

      await service.deletePlaybook('sch-001', 'pb-001');

      expect(mockPlaybooksRepo.softDelete).toHaveBeenCalledWith('pb-001', 'sch-001');
    });
  });

  describe('togglePlaybook', () => {
    it('should toggle playbook enabled state', async () => {
      mockPlaybooksRepo.exists.mockResolvedValue(true);
      mockPlaybooksRepo.findById.mockResolvedValue(mockPlaybook);
      mockPlaybooksRepo.update.mockResolvedValue({ ...mockPlaybook, enabled: false });

      const result = await service.togglePlaybook('sch-001', 'pb-001', false);

      expect(result.enabled).toBe(false);
    });
  });

  describe('executePlaybook', () => {
    it('should execute a playbook', async () => {
      mockPlaybooksRepo.exists.mockResolvedValue(true);
      mockPlaybooksRepo.findById.mockResolvedValue(mockPlaybook);
      mockExecutionsRepo.create.mockResolvedValue(mockExecution);
      mockPlaybooksRepo.update.mockResolvedValue(mockPlaybook);

      const result = await service.executePlaybook('sch-001', 'pb-001', 'INCIDENT_CREATED', 'user-001');

      expect(result).toEqual(mockExecution);
    });

    it('should reject executing disabled playbook', async () => {
      mockPlaybooksRepo.exists.mockResolvedValue(true);
      mockPlaybooksRepo.findById.mockResolvedValue({ ...mockPlaybook, enabled: false });

      await expect(service.executePlaybook('sch-001', 'pb-001', 'TEST', 'user-001')).rejects.toThrow();
    });
  });

  describe('completeExecution', () => {
    it('should complete a running execution', async () => {
      mockExecutionsRepo.exists.mockResolvedValue(true);
      mockExecutionsRepo.findById.mockResolvedValue(mockExecution);
      mockExecutionsRepo.update.mockResolvedValue({ ...mockExecution, status: 'COMPLETED' });
      mockPlaybooksRepo.findById.mockResolvedValue(mockPlaybook);
      mockPlaybooksRepo.update.mockResolvedValue(mockPlaybook);

      const result = await service.completeExecution('sch-001', 'exec-001', { success: true });

      expect(result.status).toBe('COMPLETED');
    });

    it('should reject completing non-running execution', async () => {
      mockExecutionsRepo.exists.mockResolvedValue(true);
      mockExecutionsRepo.findById.mockResolvedValue({ ...mockExecution, status: 'COMPLETED' });

      await expect(service.completeExecution('sch-001', 'exec-001', {})).rejects.toThrow();
    });
  });

  describe('failExecution', () => {
    it('should fail a running execution', async () => {
      mockExecutionsRepo.exists.mockResolvedValue(true);
      mockExecutionsRepo.findById.mockResolvedValue(mockExecution);
      mockExecutionsRepo.update.mockResolvedValue({ ...mockExecution, status: 'FAILED' });

      const result = await service.failExecution('sch-001', 'exec-001', 'Step 2 failed');

      expect(result.status).toBe('FAILED');
    });
  });

  describe('cancelExecution', () => {
    it('should cancel a running execution', async () => {
      mockExecutionsRepo.exists.mockResolvedValue(true);
      mockExecutionsRepo.findById.mockResolvedValue(mockExecution);
      mockExecutionsRepo.update.mockResolvedValue({ ...mockExecution, status: 'CANCELLED' });

      const result = await service.cancelExecution('sch-001', 'exec-001');

      expect(result.status).toBe('CANCELLED');
    });
  });

  describe('pauseExecution', () => {
    it('should pause a running execution', async () => {
      mockExecutionsRepo.exists.mockResolvedValue(true);
      mockExecutionsRepo.findById.mockResolvedValue(mockExecution);
      mockExecutionsRepo.update.mockResolvedValue({ ...mockExecution, status: 'PAUSED' });

      const result = await service.pauseExecution('sch-001', 'exec-001');

      expect(result.status).toBe('PAUSED');
    });

    it('should reject pausing non-running execution', async () => {
      mockExecutionsRepo.exists.mockResolvedValue(true);
      mockExecutionsRepo.findById.mockResolvedValue({ ...mockExecution, status: 'COMPLETED' });

      await expect(service.pauseExecution('sch-001', 'exec-001')).rejects.toThrow();
    });
  });

  describe('resumeExecution', () => {
    it('should resume a paused execution', async () => {
      mockExecutionsRepo.exists.mockResolvedValue(true);
      mockExecutionsRepo.findById.mockResolvedValue({ ...mockExecution, status: 'PAUSED' });
      mockExecutionsRepo.update.mockResolvedValue({ ...mockExecution, status: 'RUNNING' });

      const result = await service.resumeExecution('sch-001', 'exec-001');

      expect(result.status).toBe('RUNNING');
    });

    it('should reject resuming non-paused execution', async () => {
      mockExecutionsRepo.exists.mockResolvedValue(true);
      mockExecutionsRepo.findById.mockResolvedValue(mockExecution);

      await expect(service.resumeExecution('sch-001', 'exec-001')).rejects.toThrow();
    });
  });

  describe('getPlaybookStats', () => {
    it('should return playbook statistics', async () => {
      mockPlaybooksRepo.findAll.mockResolvedValue({
        data: [mockPlaybook],
        total: 1,
      });

      const result = await service.getPlaybookStats('sch-001');

      expect(result.total).toBe(1);
      expect(result.active).toBeDefined();
      expect(result.totalExecutions).toBeDefined();
      expect(result.topPlaybooks).toBeDefined();
    });
  });

  describe('getExecutionStats', () => {
    it('should return execution statistics', async () => {
      mockExecutionsRepo.findAll.mockResolvedValue({
        data: [mockExecution, { ...mockExecution, id: 'exec-002', status: 'COMPLETED', duration: 120 }],
        total: 2,
      });

      const result = await service.getExecutionStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.running).toBeDefined();
      expect(result.completed).toBeDefined();
      expect(result.averageDuration).toBeDefined();
    });
  });
});
