import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAgentTaskService } from '@/features/ai/services/ai-agent-task.service';
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

describe('AiAgentTaskService', () => {
  let service: AiAgentTaskService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiAgentTaskService(null as any);
  });

  describe('getTask', () => {
    it('should return a task when found', async () => {
      const mockTask = { id: '1', agentId: 'agent-1', status: 'pending', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockTask as any);
      const result = await service.getTask('school-1', '1');
      expect(result).toEqual(mockTask);
    });

    it('should throw error when task not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getTask('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listTasks', () => {
    it('should return a list of tasks', async () => {
      const mockTasks = [{ id: '1', agentId: 'agent-1' }, { id: '2', agentId: 'agent-1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockTasks as any);
      const result = await service.listTasks('school-1', {});
      expect(result).toEqual(mockTasks);
    });

    it('should return empty array when no tasks found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listTasks('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createTask', () => {
    it('should create a task and return it', async () => {
      const mockTask = { id: '1', agentId: 'agent-1' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockTask as any);
      const result = await service.createTask('school-1', { agentId: 'agent-1' } as any);
      expect(result).toEqual(mockTask);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const mockTask = { id: '1', status: 'pending' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockTask as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockTask, status: 'running' } as any);
      const result = await service.updateTask('school-1', '1', { status: 'running' } as any);
      expect(result.status).toBe('running');
    });

    it('should throw error when updating non-existent task', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateTask('school-1', 'nonexistent', { status: 'running' } as any)).rejects.toThrow();
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', async () => {
      const mockTask = { id: '1', status: 'completed' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockTask as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteTask('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent task', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteTask('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getTasksByAgent', () => {
    it('should return tasks for an agent', async () => {
      const mockTasks = [{ id: '1', agentId: 'agent-1' }];
      vi.mocked(aiRepository.findTasksByAgentId).mockResolvedValue(mockTasks as any);
      const result = await service.getTasksByAgent('school-1', 'agent-1');
      expect(result).toEqual(mockTasks);
    });

    it('should return empty array when no tasks for agent', async () => {
      vi.mocked(aiRepository.findTasksByAgentId).mockResolvedValue([]);
      const result = await service.getTasksByAgent('school-1', 'agent-1');
      expect(result).toEqual([]);
    });
  });
});
