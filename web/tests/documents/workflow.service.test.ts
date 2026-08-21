import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWorkflowService } from '../../src/features/documents/services/workflow.service';

describe('WorkflowService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getWorkflows: vi.fn(),
      getWorkflow: vi.fn(),
      createWorkflow: vi.fn(),
      updateWorkflow: vi.fn(),
      deleteWorkflow: vi.fn(),
      triggerWorkflow: vi.fn(),
      getWorkflowStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createWorkflowService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getWorkflows).toBeInstanceOf(Function);
    expect(service.getWorkflow).toBeInstanceOf(Function);
    expect(service.createWorkflow).toBeInstanceOf(Function);
    expect(service.updateWorkflow).toBeInstanceOf(Function);
    expect(service.deleteWorkflow).toBeInstanceOf(Function);
    expect(service.triggerWorkflow).toBeInstanceOf(Function);
    expect(service.getWorkflowStats).toBeInstanceOf(Function);
  });

  describe('getWorkflows', () => {
    it('should return workflows list', async () => {
      const workflows = [{ id: 'wf-1', name: 'Document Review' }];
      mockRepository.getWorkflows.mockResolvedValue(workflows);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflows('school-1', 'user-1');
      expect(result).toEqual(workflows);
      expect(mockRepository.getWorkflows).toHaveBeenCalledWith('school-1');
    });
  });

  describe('getWorkflow', () => {
    it('should return a single workflow', async () => {
      const workflow = { id: 'wf-1', name: 'Document Review' };
      mockRepository.getWorkflow.mockResolvedValue(workflow);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflow('wf-1', 'user-1');
      expect(result).toEqual(workflow);
      expect(mockRepository.getWorkflow).toHaveBeenCalledWith('wf-1');
    });
  });

  describe('createWorkflow', () => {
    it('should create a workflow', async () => {
      const data = { name: 'New Workflow', triggers: ['onUpload'] };
      mockRepository.createWorkflow.mockResolvedValue({ id: 'wf-1', ...data });
      const service = createWorkflowService(mockRepository);
      const result = await service.createWorkflow('school-1', 'user-1', data);
      expect(result).toEqual({ id: 'wf-1', ...data });
      expect(mockRepository.createWorkflow).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'New Workflow', createdBy: 'user-1' }),
        'school-1'
      );
    });
  });

  describe('updateWorkflow', () => {
    it('should update a workflow', async () => {
      mockRepository.getWorkflow.mockResolvedValue({ id: 'wf-1' });
      mockRepository.updateWorkflow.mockResolvedValue({ id: 'wf-1', name: 'Updated Workflow' });
      const service = createWorkflowService(mockRepository);
      const result = await service.updateWorkflow('wf-1', 'user-1', { name: 'Updated Workflow' });
      expect(result).toEqual({ id: 'wf-1', name: 'Updated Workflow' });
      expect(mockRepository.updateWorkflow).toHaveBeenCalledWith('wf-1', { name: 'Updated Workflow' });
    });
  });

  describe('deleteWorkflow', () => {
    it('should delete a workflow', async () => {
      mockRepository.getWorkflow.mockResolvedValue({ id: 'wf-1' });
      mockRepository.deleteWorkflow.mockResolvedValue({ success: true });
      const service = createWorkflowService(mockRepository);
      await service.deleteWorkflow('wf-1', 'user-1');
      expect(mockRepository.deleteWorkflow).toHaveBeenCalledWith('wf-1');
    });
  });

  describe('triggerWorkflow', () => {
    it('should trigger a workflow', async () => {
      mockRepository.getWorkflow.mockResolvedValue({ id: 'wf-1' });
      mockRepository.triggerWorkflow.mockResolvedValue({ executionId: 'exec-1', status: 'running' });
      const service = createWorkflowService(mockRepository);
      const result = await service.triggerWorkflow('wf-1', 'doc-1', 'user-1');
      expect(result).toEqual({ executionId: 'exec-1', status: 'running' });
      expect(mockRepository.triggerWorkflow).toHaveBeenCalledWith('wf-1', 'doc-1', 'user-1');
    });
  });

  describe('getWorkflowStats', () => {
    it('should return workflow statistics', async () => {
      const stats = { total: 20, active: 15, triggered: 200 };
      mockRepository.getWorkflowStats.mockResolvedValue(stats);
      const service = createWorkflowService(mockRepository);
      const result = await service.getWorkflowStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getWorkflowStats).toHaveBeenCalledWith('school-1', undefined, undefined);
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing workflowId for getWorkflow', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflow('', 'user-1')).rejects.toThrow('workflowId is required');
    });

    it('should throw on missing schoolId for createWorkflow', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.createWorkflow('', 'user-1', { name: 'WF' })).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing name for createWorkflow', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.createWorkflow('school-1', 'user-1', {})).rejects.toThrow('workflow name is required');
    });

    it('should throw on missing workflowId for updateWorkflow', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.updateWorkflow('', 'user-1', { name: 'WF' })).rejects.toThrow('workflowId is required');
    });

    it('should throw on missing workflowId for deleteWorkflow', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.deleteWorkflow('', 'user-1')).rejects.toThrow('workflowId is required');
    });

    it('should throw on missing workflowId for triggerWorkflow', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.triggerWorkflow('', 'doc-1', 'user-1')).rejects.toThrow('workflowId is required');
    });

    it('should throw on missing documentId for triggerWorkflow', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.triggerWorkflow('wf-1', '', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw on missing schoolId for getWorkflowStats', async () => {
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflowStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in getWorkflows', async () => {
      mockRepository.getWorkflows.mockRejectedValue(new Error('DB error'));
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflows('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should handle repository errors in getWorkflow', async () => {
      mockRepository.getWorkflow.mockRejectedValue(new Error('Not found'));
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflow('wf-1', 'user-1')).rejects.toThrow('Not found');
    });

    it('should handle repository errors in createWorkflow', async () => {
      mockRepository.createWorkflow.mockRejectedValue(new Error('Create failed'));
      const service = createWorkflowService(mockRepository);
      await expect(service.createWorkflow('school-1', 'user-1', { name: 'WF' })).rejects.toThrow('Create failed');
    });

    it('should handle repository errors in updateWorkflow', async () => {
      mockRepository.getWorkflow.mockResolvedValue({ id: 'wf-1' });
      mockRepository.updateWorkflow.mockRejectedValue(new Error('Update failed'));
      const service = createWorkflowService(mockRepository);
      await expect(service.updateWorkflow('wf-1', 'user-1', { name: 'Updated' })).rejects.toThrow('Update failed');
    });

    it('should handle repository errors in deleteWorkflow', async () => {
      mockRepository.getWorkflow.mockResolvedValue({ id: 'wf-1' });
      mockRepository.deleteWorkflow.mockRejectedValue(new Error('Delete failed'));
      const service = createWorkflowService(mockRepository);
      await expect(service.deleteWorkflow('wf-1', 'user-1')).rejects.toThrow('Delete failed');
    });

    it('should handle repository errors in triggerWorkflow', async () => {
      mockRepository.getWorkflow.mockResolvedValue({ id: 'wf-1' });
      mockRepository.triggerWorkflow.mockRejectedValue(new Error('Trigger failed'));
      const service = createWorkflowService(mockRepository);
      await expect(service.triggerWorkflow('wf-1', 'doc-1', 'user-1')).rejects.toThrow('Trigger failed');
    });

    it('should handle repository errors in getWorkflowStats', async () => {
      mockRepository.getWorkflowStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createWorkflowService(mockRepository);
      await expect(service.getWorkflowStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });
});
