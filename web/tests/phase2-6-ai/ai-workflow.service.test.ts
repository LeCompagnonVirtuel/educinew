import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiWorkflowService } from '@/features/ai/services/ai-workflow.service';
import { aiRepository } from '../repositories/ai.repository';

vi.mock('@/features/repositories/ai.repository', () => ({
  aiRepository: {
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AiWorkflowService', () => {
  let service: AiWorkflowService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiWorkflowService(null as any);
  });

  describe('getWorkflow', () => {
    it('should return a workflow when found', async () => {
      const mockWorkflow = { id: '1', name: 'Lesson Plan Generator', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockWorkflow as any);
      const result = await service.getWorkflow('school-1', '1');
      expect(result).toEqual(mockWorkflow);
    });

    it('should throw error when workflow not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getWorkflow('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listWorkflows', () => {
    it('should return a list of workflows', async () => {
      const mockWorkflows = [{ id: '1', name: 'Workflow 1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockWorkflows as any);
      const result = await service.listWorkflows('school-1', {});
      expect(result).toEqual(mockWorkflows);
    });

    it('should return empty array when no workflows found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listWorkflows('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createWorkflow', () => {
    it('should create a workflow and return it', async () => {
      const mockWorkflow = { id: '1', name: 'New Workflow' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockWorkflow as any);
      const result = await service.createWorkflow('school-1', { name: 'New Workflow' } as any);
      expect(result).toEqual(mockWorkflow);
    });
  });

  describe('updateWorkflow', () => {
    it('should update an existing workflow', async () => {
      const mockWorkflow = { id: '1', name: 'Old Name' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockWorkflow as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockWorkflow, name: 'Updated Name' } as any);
      const result = await service.updateWorkflow('school-1', '1', { name: 'Updated Name' } as any);
      expect(result.name).toBe('Updated Name');
    });

    it('should throw error when updating non-existent workflow', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateWorkflow('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteWorkflow', () => {
    it('should delete an existing workflow', async () => {
      const mockWorkflow = { id: '1', name: 'Workflow' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockWorkflow as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteWorkflow('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent workflow', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteWorkflow('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('executeWorkflow', () => {
    it('should execute a workflow successfully', async () => {
      const mockWorkflow = { id: '1', name: 'Auto-Grade', status: 'active' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockWorkflow as any);
      const mockResult = { executionId: 'exec-1', status: 'completed', output: 'Graded 25 papers' };
      vi.mocked(aiRepository.executeWorkflow).mockResolvedValue(mockResult as any);
      const result = await service.executeWorkflow('school-1', '1', { input: 'submissions' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should throw error when executing non-existent workflow', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.executeWorkflow('school-1', 'nonexistent', {} as any)).rejects.toThrow();
    });
  });

  describe('getWorkflowSteps', () => {
    it('should return steps for a workflow', async () => {
      const mockWorkflow = { id: '1', name: 'Workflow' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockWorkflow as any);
      const mockSteps = [{ id: '1', stepNumber: 1, name: 'Parse Input' }];
      vi.mocked(aiRepository.findStepsByWorkflowId).mockResolvedValue(mockSteps as any);
      const result = await service.getWorkflowSteps('school-1', '1');
      expect(result).toEqual(mockSteps);
    });

    it('should throw error when getting steps for non-existent workflow', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getWorkflowSteps('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getWorkflowExecutions', () => {
    it('should return executions for a workflow', async () => {
      const mockWorkflow = { id: '1', name: 'Workflow' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockWorkflow as any);
      const mockExecs = [{ id: 'exec-1', status: 'completed' }];
      vi.mocked(aiRepository.findExecutionsByWorkflowId).mockResolvedValue(mockExecs as any);
      const result = await service.getWorkflowExecutions('school-1', '1');
      expect(result).toEqual(mockExecs);
    });

    it('should throw error when getting executions for non-existent workflow', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getWorkflowExecutions('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
