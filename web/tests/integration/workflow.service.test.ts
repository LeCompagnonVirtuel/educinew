import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWorkflowService } from '../../src/features/integration/services/workflow.service';

describe('WorkflowService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getWorkflows: vi.fn(),
      getWorkflowById: vi.fn(),
      createWorkflow: vi.fn(),
      updateWorkflow: vi.fn(),
      deleteWorkflow: vi.fn(),
      publishWorkflow: vi.fn(),
      executeWorkflow: vi.fn(),
      getWorkflowRuns: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createWorkflowService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getWorkflows).toBeInstanceOf(Function);
    expect(service.getWorkflowById).toBeInstanceOf(Function);
    expect(service.createWorkflow).toBeInstanceOf(Function);
    expect(service.updateWorkflow).toBeInstanceOf(Function);
    expect(service.deleteWorkflow).toBeInstanceOf(Function);
    expect(service.publishWorkflow).toBeInstanceOf(Function);
    expect(service.executeWorkflow).toBeInstanceOf(Function);
    expect(service.getWorkflowRuns).toBeInstanceOf(Function);
  });

  describe('getWorkflows', () => {
    it('should return workflows list', async () => {
      const workflows = [{ id: 'wf-1', name: 'Document Review' }];
      mockRepository.getWorkflows.mockResolvedValue(workflows);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflows('school-1');
      expect(result).toEqual(workflows);
      expect(mockRepository.getWorkflows).toHaveBeenCalledWith('school-1', undefined);
    });

    it('should return workflows with filters', async () => {
      const filters = { status: 'published' };
      mockRepository.getWorkflows.mockResolvedValue([{ id: 'wf-1' }]);
      const service = createWorkflowService(mockRepository);
      await service.getWorkflows('school-1', filters);
      expect(mockRepository.getWorkflows).toHaveBeenCalledWith('school-1', filters);
    });

    it('should return empty list when no workflows exist', async () => {
      mockRepository.getWorkflows.mockResolvedValue([]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflows('school-1');
      expect(result).toEqual([]);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflows('')).rejects.toThrow('schoolId is required');
    });

    it('should return paginated workflows', async () => {
      const workflows = Array.from({ length: 5 }, (_, i) => ({ id: `wf-${i}` }));
      mockRepository.getWorkflows.mockResolvedValue({ data: workflows, total: 20, page: 1 });
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflows('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(5);
    });

    it('should filter by type', async () => {
      mockRepository.getWorkflows.mockResolvedValue([{ id: 'wf-1', type: 'approval' }]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflows('school-1', { type: 'approval' });
      expect(result).toHaveLength(1);
    });

    it('should return sorted workflows', async () => {
      mockRepository.getWorkflows.mockResolvedValue([{ id: 'wf-2', name: 'B' }, { id: 'wf-1', name: 'A' }]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflows('school-1', { sortBy: 'name', sortOrder: 'asc' });
      expect(result).toHaveLength(2);
    });

    it('should handle repository errors', async () => {
      mockRepository.getWorkflows.mockRejectedValue(new Error('DB error'));
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflows('school-1')).rejects.toThrow('DB error');
    });

    it('should return workflows with step count', async () => {
      mockRepository.getWorkflows.mockResolvedValue([{ id: 'wf-1', stepCount: 5 }]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflows('school-1');
      expect(result[0].stepCount).toBe(5);
    });

    it('should return workflows with last run', async () => {
      mockRepository.getWorkflows.mockResolvedValue([{ id: 'wf-1', lastRunAt: '2024-01-01', lastRunStatus: 'success' }]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflows('school-1');
      expect(result[0].lastRunStatus).toBe('success');
    });

    it('should filter by creator', async () => {
      mockRepository.getWorkflows.mockResolvedValue([{ id: 'wf-1', createdBy: 'user-1' }]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflows('school-1', { createdBy: 'user-1' });
      expect(result).toHaveLength(1);
    });
  });

  describe('getWorkflowById', () => {
    it('should return a single workflow', async () => {
      const workflow = { id: 'wf-1', name: 'Document Review', steps: ['review', 'approve'] };
      mockRepository.getWorkflowById.mockResolvedValue(workflow);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowById('wf-1');
      expect(result).toEqual(workflow);
      expect(mockRepository.getWorkflowById).toHaveBeenCalledWith('wf-1');
    });

    it('should throw if workflow not found', async () => {
      mockRepository.getWorkflowById.mockResolvedValue(null);
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflowById('nonexistent')).rejects.toThrow('Workflow not found');
    });

    it('should throw if id is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflowById('')).rejects.toThrow('Workflow ID is required');
    });

    it('should return workflow with full details', async () => {
      const workflow = { id: 'wf-1', name: 'Test', steps: [], config: {}, triggers: [] };
      mockRepository.getWorkflowById.mockResolvedValue(workflow);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowById('wf-1');
      expect(result.config).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepository.getWorkflowById.mockRejectedValue(new Error('Query timeout'));
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflowById('wf-1')).rejects.toThrow('Query timeout');
    });

    it('should return workflow with variables', async () => {
      const workflow = { id: 'wf-1', variables: [{ name: 'docId', type: 'string' }] };
      mockRepository.getWorkflowById.mockResolvedValue(workflow);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowById('wf-1');
      expect(result.variables).toHaveLength(1);
    });

    it('should return workflow with version', async () => {
      const workflow = { id: 'wf-1', version: 3, versionHistory: [1, 2, 3] };
      mockRepository.getWorkflowById.mockResolvedValue(workflow);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowById('wf-1');
      expect(result.version).toBe(3);
    });

    it('should return workflow with permissions', async () => {
      const workflow = { id: 'wf-1', permissions: { execute: ['admin', 'manager'] } };
      mockRepository.getWorkflowById.mockResolvedValue(workflow);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowById('wf-1');
      expect(result.permissions.execute).toHaveLength(2);
    });
  });

  describe('createWorkflow', () => {
    it('should create a workflow', async () => {
      const data = { name: 'Document Review', steps: ['review', 'approve'] };
      const created = { id: 'wf-1', ...data };
      mockRepository.createWorkflow.mockResolvedValue(created);
      const service = createWorkflowService(mockRepository);
      const result = await service.createWorkflow('school-1', 'user-1', data);
      expect(result).toEqual(created);
      expect(mockRepository.createWorkflow).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Document Review', createdBy: 'user-1' }),
        'school-1'
      );
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.createWorkflow('', 'user-1', { name: 'W' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.createWorkflow('school-1', '', { name: 'W' })).rejects.toThrow('userId is required');
    });

    it('should throw if data is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.createWorkflow('school-1', 'user-1', null)).rejects.toThrow('Workflow data is required');
    });

    it('should create workflow with config', async () => {
      const data = { name: 'Test', steps: ['step1'], config: { timeout: 3600 } };
      mockRepository.createWorkflow.mockResolvedValue({ id: 'wf-1', ...data });
      const service = createWorkflowService(mockRepository);
      const result = await service.createWorkflow('school-1', 'user-1', data);
      expect(result.config.timeout).toBe(3600);
    });

    it('should create workflow with triggers', async () => {
      const data = { name: 'Test', steps: ['step1'], triggers: [{ type: 'event', event: 'document.created' }] };
      mockRepository.createWorkflow.mockResolvedValue({ id: 'wf-1', ...data });
      const service = createWorkflowService(mockRepository);
      const result = await service.createWorkflow('school-1', 'user-1', data);
      expect(result.triggers).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createWorkflow.mockRejectedValue(new Error('Invalid steps'));
      const service = createWorkflowService(mockRepository);
      await expect(service.createWorkflow('school-1', 'user-1', { name: 'T', steps: [] })).rejects.toThrow('Invalid steps');
    });

    it('should create workflow with description', async () => {
      const data = { name: 'Test', steps: ['step1'], description: 'Test workflow' };
      mockRepository.createWorkflow.mockResolvedValue({ id: 'wf-1', ...data });
      const service = createWorkflowService(mockRepository);
      const result = await service.createWorkflow('school-1', 'user-1', data);
      expect(result.description).toBe('Test workflow');
    });

    it('should create workflow with variables', async () => {
      const data = { name: 'Test', steps: ['step1'], variables: [{ name: 'input', type: 'string' }] };
      mockRepository.createWorkflow.mockResolvedValue({ id: 'wf-1', ...data });
      const service = createWorkflowService(mockRepository);
      const result = await service.createWorkflow('school-1', 'user-1', data);
      expect(result.variables).toHaveLength(1);
    });
  });

  describe('updateWorkflow', () => {
    it('should update a workflow', async () => {
      mockRepository.getWorkflowById.mockResolvedValue({ id: 'wf-1', name: 'Old' });
      mockRepository.updateWorkflow.mockResolvedValue({ id: 'wf-1', name: 'Updated' });
      const service = createWorkflowService(mockRepository);
      const result = await service.updateWorkflow('wf-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
      expect(mockRepository.updateWorkflow).toHaveBeenCalledWith('wf-1', { name: 'Updated' });
    });

    it('should throw if workflow not found', async () => {
      mockRepository.getWorkflowById.mockResolvedValue(null);
      const service = createWorkflowService(mockRepository);
      await expect(service.updateWorkflow('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.updateWorkflow('', 'user-1', { name: 'New' })).rejects.toThrow('Workflow ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.updateWorkflow('wf-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update workflow steps', async () => {
      mockRepository.getWorkflowById.mockResolvedValue({ id: 'wf-1', steps: ['old'] });
      mockRepository.updateWorkflow.mockResolvedValue({ id: 'wf-1', steps: ['new'] });
      const service = createWorkflowService(mockRepository);
      const result = await service.updateWorkflow('wf-1', 'user-1', { steps: ['new'] });
      expect(result.steps).toHaveLength(1);
    });

    it('should update workflow config', async () => {
      mockRepository.getWorkflowById.mockResolvedValue({ id: 'wf-1', config: {} });
      mockRepository.updateWorkflow.mockResolvedValue({ id: 'wf-1', config: { timeout: 7200 } });
      const service = createWorkflowService(mockRepository);
      const result = await service.updateWorkflow('wf-1', 'user-1', { config: { timeout: 7200 } });
      expect(result.config.timeout).toBe(7200);
    });

    it('should handle update failure', async () => {
      mockRepository.getWorkflowById.mockResolvedValue({ id: 'wf-1' });
      mockRepository.updateWorkflow.mockRejectedValue(new Error('Cannot update published workflow'));
      const service = createWorkflowService(mockRepository);
      await expect(service.updateWorkflow('wf-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update published workflow');
    });
  });

  describe('deleteWorkflow', () => {
    it('should delete a workflow', async () => {
      mockRepository.getWorkflowById.mockResolvedValue({ id: 'wf-1' });
      mockRepository.deleteWorkflow.mockResolvedValue({ success: true });
      const service = createWorkflowService(mockRepository);
      await service.deleteWorkflow('wf-1', 'user-1');
      expect(mockRepository.deleteWorkflow).toHaveBeenCalledWith('wf-1');
    });

    it('should throw if workflow not found', async () => {
      mockRepository.getWorkflowById.mockResolvedValue(null);
      const service = createWorkflowService(mockRepository);
      await expect(service.deleteWorkflow('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.deleteWorkflow('', 'user-1')).rejects.toThrow('Workflow ID is required');
    });

    it('should handle deletion with active runs', async () => {
      mockRepository.getWorkflowById.mockResolvedValue({ id: 'wf-1' });
      mockRepository.deleteWorkflow.mockRejectedValue(new Error('Workflow has active runs'));
      const service = createWorkflowService(mockRepository);
      await expect(service.deleteWorkflow('wf-1', 'user-1')).rejects.toThrow('Workflow has active runs');
    });

    it('should force delete workflow', async () => {
      mockRepository.getWorkflowById.mockResolvedValue({ id: 'wf-1' });
      mockRepository.deleteWorkflow.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createWorkflowService(mockRepository);
      const result = await service.deleteWorkflow('wf-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('publishWorkflow', () => {
    it('should publish a workflow', async () => {
      mockRepository.publishWorkflow.mockResolvedValue({ id: 'wf-1', status: 'published', version: 1 });
      const service = createWorkflowService(mockRepository);
      const result = await service.publishWorkflow('wf-1', 'user-1');
      expect(result.status).toBe('published');
      expect(mockRepository.publishWorkflow).toHaveBeenCalledWith('wf-1', 'user-1');
    });

    it('should throw if workflowId is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.publishWorkflow('', 'user-1')).rejects.toThrow('Workflow ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.publishWorkflow('wf-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle publish failure', async () => {
      mockRepository.publishWorkflow.mockResolvedValue({ id: 'wf-1', status: 'failed', error: 'Invalid steps' });
      const service = createWorkflowService(mockRepository);
      const result = await service.publishWorkflow('wf-1', 'user-1');
      expect(result.status).toBe('failed');
    });

    it('should return published version', async () => {
      mockRepository.publishWorkflow.mockResolvedValue({ id: 'wf-1', status: 'published', version: 5 });
      const service = createWorkflowService(mockRepository);
      const result = await service.publishWorkflow('wf-1', 'user-1');
      expect(result.version).toBe(5);
    });

    it('should handle already published', async () => {
      mockRepository.publishWorkflow.mockResolvedValue({ id: 'wf-1', status: 'already_published' });
      const service = createWorkflowService(mockRepository);
      const result = await service.publishWorkflow('wf-1', 'user-1');
      expect(result.status).toBe('already_published');
    });
  });

  describe('executeWorkflow', () => {
    it('should execute a workflow', async () => {
      mockRepository.executeWorkflow.mockResolvedValue({ id: 'wf-1', status: 'running', executionId: 'exec-1' });
      const service = createWorkflowService(mockRepository);
      const result = await service.executeWorkflow('wf-1', 'user-1', { documentId: 'doc-1' });
      expect(result.status).toBe('running');
      expect(mockRepository.executeWorkflow).toHaveBeenCalledWith('wf-1', 'user-1', { documentId: 'doc-1' });
    });

    it('should throw if workflowId is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.executeWorkflow('', 'user-1', {})).rejects.toThrow('Workflow ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.executeWorkflow('wf-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should handle execution failure', async () => {
      mockRepository.executeWorkflow.mockResolvedValue({ id: 'wf-1', status: 'failed', error: 'Step 1 failed' });
      const service = createWorkflowService(mockRepository);
      const result = await service.executeWorkflow('wf-1', 'user-1', {});
      expect(result.status).toBe('failed');
    });

    it('should return execution ID', async () => {
      mockRepository.executeWorkflow.mockResolvedValue({ id: 'wf-1', executionId: 'exec-123' });
      const service = createWorkflowService(mockRepository);
      const result = await service.executeWorkflow('wf-1', 'user-1', {});
      expect(result.executionId).toBe('exec-123');
    });

    it('should handle workflow not found', async () => {
      mockRepository.executeWorkflow.mockRejectedValue(new Error('Workflow not found'));
      const service = createWorkflowService(mockRepository);
      await expect(service.executeWorkflow('nonexistent', 'user-1', {})).rejects.toThrow('Workflow not found');
    });
  });

  describe('getWorkflowRuns', () => {
    it('should return workflow runs', async () => {
      const runs = [{ id: 'run-1', status: 'completed', startedAt: '2024-01-01' }];
      mockRepository.getWorkflowRuns.mockResolvedValue(runs);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowRuns('wf-1');
      expect(result).toEqual(runs);
      expect(mockRepository.getWorkflowRuns).toHaveBeenCalledWith('wf-1', undefined);
    });

    it('should return runs with filters', async () => {
      mockRepository.getWorkflowRuns.mockResolvedValue([{ id: 'run-1', status: 'failed' }]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowRuns('wf-1', { status: 'failed' });
      expect(result).toHaveLength(1);
    });

    it('should throw if workflowId is missing', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflowRuns('')).rejects.toThrow('Workflow ID is required');
    });

    it('should return paginated runs', async () => {
      const runs = Array.from({ length: 10 }, (_, i) => ({ id: `run-${i}` }));
      mockRepository.getWorkflowRuns.mockResolvedValue({ data: runs, total: 50 });
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowRuns('wf-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(10);
    });

    it('should handle repository errors', async () => {
      mockRepository.getWorkflowRuns.mockRejectedValue(new Error('DB error'));
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflowRuns('wf-1')).rejects.toThrow('DB error');
    });

    it('should return empty runs', async () => {
      mockRepository.getWorkflowRuns.mockResolvedValue([]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowRuns('wf-1');
      expect(result).toEqual([]);
    });

    it('should return runs with duration', async () => {
      mockRepository.getWorkflowRuns.mockResolvedValue([{ id: 'run-1', duration: 120000 }]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowRuns('wf-1');
      expect(result[0].duration).toBe(120000);
    });

    it('should return runs with step progress', async () => {
      mockRepository.getWorkflowRuns.mockResolvedValue([{ id: 'run-1', currentStep: 2, totalSteps: 5 }]);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowRuns('wf-1');
      expect(result[0].currentStep).toBe(2);
    });
  });
});
