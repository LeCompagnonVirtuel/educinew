import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAgentService } from '@/features/ai/services/ai-agent.service';
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

describe('AiAgentService', () => {
  let service: AiAgentService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiAgentService(null as any);
  });

  describe('getAgent', () => {
    it('should return an agent when found', async () => {
      const mockAgent = { id: '1', name: 'Tutor Agent', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAgent as any);
      const result = await service.getAgent('school-1', '1');
      expect(result).toEqual(mockAgent);
    });

    it('should throw error when agent not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAgent('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listAgents', () => {
    it('should return a list of agents', async () => {
      const mockAgents = [{ id: '1', name: 'Agent 1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockAgents as any);
      const result = await service.listAgents('school-1', {});
      expect(result).toEqual(mockAgents);
    });

    it('should return empty array when no agents found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listAgents('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createAgent', () => {
    it('should create an agent and return it', async () => {
      const mockAgent = { id: '1', name: 'New Agent' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAgent as any);
      const result = await service.createAgent('school-1', { name: 'New Agent' } as any);
      expect(result).toEqual(mockAgent);
    });
  });

  describe('updateAgent', () => {
    it('should update an existing agent', async () => {
      const mockAgent = { id: '1', name: 'Old Agent' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAgent as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAgent, name: 'Updated Agent' } as any);
      const result = await service.updateAgent('school-1', '1', { name: 'Updated Agent' } as any);
      expect(result.name).toBe('Updated Agent');
    });

    it('should throw error when updating non-existent agent', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateAgent('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteAgent', () => {
    it('should delete an existing agent', async () => {
      const mockAgent = { id: '1', name: 'Agent' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAgent as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteAgent('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent agent', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteAgent('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('activateAgent', () => {
    it('should activate an inactive agent', async () => {
      const mockAgent = { id: '1', name: 'Agent', status: 'inactive' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAgent as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAgent, status: 'active' } as any);
      const result = await service.activateAgent('school-1', '1');
      expect(result.status).toBe('active');
    });

    it('should throw error when activating non-existent agent', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.activateAgent('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('deactivateAgent', () => {
    it('should deactivate an active agent', async () => {
      const mockAgent = { id: '1', name: 'Agent', status: 'active' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAgent as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAgent, status: 'inactive' } as any);
      const result = await service.deactivateAgent('school-1', '1');
      expect(result.status).toBe('inactive');
    });

    it('should throw error when deactivating non-existent agent', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deactivateAgent('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getAgentTasks', () => {
    it('should return tasks for an agent', async () => {
      const mockAgent = { id: '1', name: 'Agent' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAgent as any);
      const mockTasks = [{ id: '1', agentId: '1' }];
      vi.mocked(aiRepository.findTasksByAgentId).mockResolvedValue(mockTasks as any);
      const result = await service.getAgentTasks('school-1', '1');
      expect(result).toEqual(mockTasks);
    });

    it('should throw error when getting tasks for non-existent agent', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAgentTasks('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
