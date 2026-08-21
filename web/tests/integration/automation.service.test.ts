import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAutomationService } from '../../src/features/integration/services/automation.service';

describe('AutomationService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getAutomations: vi.fn(),
      getAutomationById: vi.fn(),
      createAutomation: vi.fn(),
      updateAutomation: vi.fn(),
      deleteAutomation: vi.fn(),
      enableAutomation: vi.fn(),
      disableAutomation: vi.fn(),
      triggerAutomation: vi.fn(),
      getAutomationRuns: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAutomationService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getAutomations).toBeInstanceOf(Function);
    expect(service.getAutomationById).toBeInstanceOf(Function);
    expect(service.createAutomation).toBeInstanceOf(Function);
    expect(service.updateAutomation).toBeInstanceOf(Function);
    expect(service.deleteAutomation).toBeInstanceOf(Function);
    expect(service.enableAutomation).toBeInstanceOf(Function);
    expect(service.disableAutomation).toBeInstanceOf(Function);
    expect(service.triggerAutomation).toBeInstanceOf(Function);
    expect(service.getAutomationRuns).toBeInstanceOf(Function);
  });

  describe('getAutomations', () => {
    it('should return automations list', async () => {
      mockRepository.getAutomations.mockResolvedValue([{ id: 'au-1', name: 'Auto Approve' }]);
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomations('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return automations with filters', async () => {
      mockRepository.getAutomations.mockResolvedValue([{ id: 'au-1' }]);
      const service = createAutomationService(mockRepository);
      await service.getAutomations('school-1', { status: 'enabled' });
      expect(mockRepository.getAutomations).toHaveBeenCalledWith('school-1', { status: 'enabled' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.getAutomations('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getAutomations.mockResolvedValue([]);
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomations('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated automations', async () => {
      mockRepository.getAutomations.mockResolvedValue({ data: [{ id: 'au-1' }], total: 20 });
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomations('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by trigger type', async () => {
      mockRepository.getAutomations.mockResolvedValue([{ id: 'au-1', triggerType: 'event' }]);
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomations('school-1', { triggerType: 'event' });
      expect(result).toHaveLength(1);
    });

    it('should return automations with run count', async () => {
      mockRepository.getAutomations.mockResolvedValue([{ id: 'au-1', runCount: 25 }]);
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomations('school-1');
      expect(result[0].runCount).toBe(25);
    });

    it('should return automations with last run', async () => {
      mockRepository.getAutomations.mockResolvedValue([{ id: 'au-1', lastRunAt: '2024-01-01', lastRunStatus: 'success' }]);
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomations('school-1');
      expect(result[0].lastRunStatus).toBe('success');
    });

    it('should handle repository errors', async () => {
      mockRepository.getAutomations.mockRejectedValue(new Error('DB error'));
      const service = createAutomationService(mockRepository);
      await expect(service.getAutomations('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getAutomationById', () => {
    it('should return a single automation', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1', name: 'Auto Approve' });
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomationById('au-1');
      expect(result.id).toBe('au-1');
    });

    it('should throw if automation not found', async () => {
      mockRepository.getAutomationById.mockResolvedValue(null);
      const service = createAutomationService(mockRepository);
      await expect(service.getAutomationById('nonexistent')).rejects.toThrow('Automation not found');
    });

    it('should throw if id is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.getAutomationById('')).rejects.toThrow('Automation ID is required');
    });

    it('should return automation with trigger', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1', trigger: { type: 'event', event: 'document.created' } });
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomationById('au-1');
      expect(result.trigger.type).toBe('event');
    });

    it('should return automation with actions', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1', actions: [{ type: 'send_email' }, { type: 'update_status' }] });
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomationById('au-1');
      expect(result.actions).toHaveLength(2);
    });

    it('should return automation with conditions', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1', conditions: [{ field: 'status', operator: 'equals', value: 'draft' }] });
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomationById('au-1');
      expect(result.conditions).toHaveLength(1);
    });

    it('should return automation with config', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1', config: { retryOnFailure: true, maxRetries: 3 } });
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomationById('au-1');
      expect(result.config.maxRetries).toBe(3);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAutomationById.mockRejectedValue(new Error('Query timeout'));
      const service = createAutomationService(mockRepository);
      await expect(service.getAutomationById('au-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createAutomation', () => {
    it('should create an automation', async () => {
      mockRepository.createAutomation.mockResolvedValue({ id: 'au-1', name: 'Auto Approve' });
      const service = createAutomationService(mockRepository);
      const result = await service.createAutomation('school-1', 'user-1', { name: 'Auto Approve', trigger: { type: 'event' }, actions: [] });
      expect(result.id).toBe('au-1');
      expect(mockRepository.createAutomation).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.createAutomation('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.createAutomation('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.createAutomation('school-1', 'user-1', { name: '' })).rejects.toThrow('Automation name is required');
    });

    it('should create automation with trigger', async () => {
      mockRepository.createAutomation.mockResolvedValue({ id: 'au-1', trigger: { type: 'schedule', cron: '0 9 * * *' } });
      const service = createAutomationService(mockRepository);
      const result = await service.createAutomation('school-1', 'user-1', { name: 'T', trigger: { type: 'schedule', cron: '0 9 * * *' }, actions: [] });
      expect(result.trigger.cron).toBe('0 9 * * *');
    });

    it('should create automation with actions', async () => {
      mockRepository.createAutomation.mockResolvedValue({ id: 'au-1', actions: [{ type: 'send_email' }, { type: 'webhook' }] });
      const service = createAutomationService(mockRepository);
      const result = await service.createAutomation('school-1', 'user-1', { name: 'T', trigger: { type: 'event' }, actions: [{ type: 'send_email' }, { type: 'webhook' }] });
      expect(result.actions).toHaveLength(2);
    });

    it('should create automation with conditions', async () => {
      mockRepository.createAutomation.mockResolvedValue({ id: 'au-1', conditions: [{ field: 'priority', operator: 'equals', value: 'high' }] });
      const service = createAutomationService(mockRepository);
      const result = await service.createAutomation('school-1', 'user-1', { name: 'T', trigger: { type: 'event' }, actions: [], conditions: [{ field: 'priority', operator: 'equals', value: 'high' }] });
      expect(result.conditions).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createAutomation.mockRejectedValue(new Error('Invalid trigger'));
      const service = createAutomationService(mockRepository);
      await expect(service.createAutomation('school-1', 'user-1', { name: 'T', trigger: { type: 'event' }, actions: [] })).rejects.toThrow('Invalid trigger');
    });
  });

  describe('updateAutomation', () => {
    it('should update an automation', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1', name: 'Old' });
      mockRepository.updateAutomation.mockResolvedValue({ id: 'au-1', name: 'Updated' });
      const service = createAutomationService(mockRepository);
      const result = await service.updateAutomation('au-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if automation not found', async () => {
      mockRepository.getAutomationById.mockResolvedValue(null);
      const service = createAutomationService(mockRepository);
      await expect(service.updateAutomation('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.updateAutomation('', 'user-1', { name: 'New' })).rejects.toThrow('Automation ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.updateAutomation('au-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update automation trigger', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1' });
      mockRepository.updateAutomation.mockResolvedValue({ id: 'au-1', trigger: { type: 'schedule' } });
      const service = createAutomationService(mockRepository);
      const result = await service.updateAutomation('au-1', 'user-1', { trigger: { type: 'schedule' } });
      expect(result.trigger.type).toBe('schedule');
    });

    it('should update automation actions', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1' });
      mockRepository.updateAutomation.mockResolvedValue({ id: 'au-1', actions: [{ type: 'new_action' }] });
      const service = createAutomationService(mockRepository);
      const result = await service.updateAutomation('au-1', 'user-1', { actions: [{ type: 'new_action' }] });
      expect(result.actions).toHaveLength(1);
    });

    it('should handle update failure', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1' });
      mockRepository.updateAutomation.mockRejectedValue(new Error('Cannot update running automation'));
      const service = createAutomationService(mockRepository);
      await expect(service.updateAutomation('au-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update running automation');
    });
  });

  describe('deleteAutomation', () => {
    it('should delete an automation', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1' });
      mockRepository.deleteAutomation.mockResolvedValue({ success: true });
      const service = createAutomationService(mockRepository);
      await service.deleteAutomation('au-1', 'user-1');
      expect(mockRepository.deleteAutomation).toHaveBeenCalledWith('au-1');
    });

    it('should throw if automation not found', async () => {
      mockRepository.getAutomationById.mockResolvedValue(null);
      const service = createAutomationService(mockRepository);
      await expect(service.deleteAutomation('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.deleteAutomation('', 'user-1')).rejects.toThrow('Automation ID is required');
    });

    it('should handle deletion with active runs', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1' });
      mockRepository.deleteAutomation.mockRejectedValue(new Error('Automation has active runs'));
      const service = createAutomationService(mockRepository);
      await expect(service.deleteAutomation('au-1', 'user-1')).rejects.toThrow('Automation has active runs');
    });

    it('should force delete automation', async () => {
      mockRepository.getAutomationById.mockResolvedValue({ id: 'au-1' });
      mockRepository.deleteAutomation.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createAutomationService(mockRepository);
      const result = await service.deleteAutomation('au-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('enableAutomation', () => {
    it('should enable an automation', async () => {
      mockRepository.enableAutomation.mockResolvedValue({ id: 'au-1', status: 'enabled', enabledAt: '2024-01-01' });
      const service = createAutomationService(mockRepository);
      const result = await service.enableAutomation('au-1', 'user-1');
      expect(result.status).toBe('enabled');
    });

    it('should throw if automationId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.enableAutomation('', 'user-1')).rejects.toThrow('Automation ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.enableAutomation('au-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already enabled', async () => {
      mockRepository.enableAutomation.mockResolvedValue({ id: 'au-1', status: 'already_enabled' });
      const service = createAutomationService(mockRepository);
      const result = await service.enableAutomation('au-1', 'user-1');
      expect(result.status).toBe('already_enabled');
    });

    it('should handle enable failure', async () => {
      mockRepository.enableAutomation.mockRejectedValue(new Error('Invalid configuration'));
      const service = createAutomationService(mockRepository);
      await expect(service.enableAutomation('au-1', 'user-1')).rejects.toThrow('Invalid configuration');
    });
  });

  describe('disableAutomation', () => {
    it('should disable an automation', async () => {
      mockRepository.disableAutomation.mockResolvedValue({ id: 'au-1', status: 'disabled', disabledAt: '2024-01-01' });
      const service = createAutomationService(mockRepository);
      const result = await service.disableAutomation('au-1', 'user-1');
      expect(result.status).toBe('disabled');
    });

    it('should throw if automationId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.disableAutomation('', 'user-1')).rejects.toThrow('Automation ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.disableAutomation('au-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already disabled', async () => {
      mockRepository.disableAutomation.mockResolvedValue({ id: 'au-1', status: 'already_disabled' });
      const service = createAutomationService(mockRepository);
      const result = await service.disableAutomation('au-1', 'user-1');
      expect(result.status).toBe('already_disabled');
    });

    it('should handle disable failure', async () => {
      mockRepository.disableAutomation.mockRejectedValue(new Error('Cannot disable'));
      const service = createAutomationService(mockRepository);
      await expect(service.disableAutomation('au-1', 'user-1')).rejects.toThrow('Cannot disable');
    });
  });

  describe('triggerAutomation', () => {
    it('should trigger an automation', async () => {
      mockRepository.triggerAutomation.mockResolvedValue({ id: 'au-1', executionId: 'exec-1', status: 'running' });
      const service = createAutomationService(mockRepository);
      const result = await service.triggerAutomation('au-1', 'user-1', { documentId: 'doc-1' });
      expect(result.status).toBe('running');
    });

    it('should throw if automationId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.triggerAutomation('', 'user-1', {})).rejects.toThrow('Automation ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.triggerAutomation('au-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should handle trigger failure', async () => {
      mockRepository.triggerAutomation.mockRejectedValue(new Error('Automation not enabled'));
      const service = createAutomationService(mockRepository);
      await expect(service.triggerAutomation('au-1', 'user-1', {})).rejects.toThrow('Automation not enabled');
    });

    it('should return execution ID', async () => {
      mockRepository.triggerAutomation.mockResolvedValue({ executionId: 'exec-123' });
      const service = createAutomationService(mockRepository);
      const result = await service.triggerAutomation('au-1', 'user-1', {});
      expect(result.executionId).toBe('exec-123');
    });
  });

  describe('getAutomationRuns', () => {
    it('should return automation runs', async () => {
      mockRepository.getAutomationRuns.mockResolvedValue([{ executionId: 'exec-1', status: 'completed', startedAt: '2024-01-01' }]);
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomationRuns('au-1');
      expect(result).toHaveLength(1);
    });

    it('should return runs with filters', async () => {
      mockRepository.getAutomationRuns.mockResolvedValue([{ executionId: 'exec-1', status: 'failed' }]);
      const service = createAutomationService(mockRepository);
      await service.getAutomationRuns('au-1', { status: 'failed' });
      expect(mockRepository.getAutomationRuns).toHaveBeenCalledWith('au-1', { status: 'failed' });
    });

    it('should throw if automationId is missing', async () => {
      const service = createAutomationService(mockRepository);
      await expect(service.getAutomationRuns('')).rejects.toThrow('Automation ID is required');
    });

    it('should return paginated runs', async () => {
      mockRepository.getAutomationRuns.mockResolvedValue({ data: [{ executionId: 'exec-1' }], total: 50 });
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomationRuns('au-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty runs', async () => {
      mockRepository.getAutomationRuns.mockResolvedValue([]);
      const service = createAutomationService(mockRepository);
      const result = await service.getAutomationRuns('au-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAutomationRuns.mockRejectedValue(new Error('DB error'));
      const service = createAutomationService(mockRepository);
      await expect(service.getAutomationRuns('au-1')).rejects.toThrow('DB error');
    });
  });
});
