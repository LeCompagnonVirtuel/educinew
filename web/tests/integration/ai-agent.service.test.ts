import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAIAgentService } from '../../src/features/integration/services/ai-agent.service';

describe('AIAgentService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getAgents: vi.fn(),
      getAgentById: vi.fn(),
      createAgent: vi.fn(),
      updateAgent: vi.fn(),
      deleteAgent: vi.fn(),
      executeAgent: vi.fn(),
      getAgentRuns: vi.fn(),
      getAgentMetrics: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAIAgentService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getAgents).toBeInstanceOf(Function);
    expect(service.getAgentById).toBeInstanceOf(Function);
    expect(service.createAgent).toBeInstanceOf(Function);
    expect(service.updateAgent).toBeInstanceOf(Function);
    expect(service.deleteAgent).toBeInstanceOf(Function);
    expect(service.executeAgent).toBeInstanceOf(Function);
    expect(service.getAgentRuns).toBeInstanceOf(Function);
    expect(service.getAgentMetrics).toBeInstanceOf(Function);
  });

  describe('getAgents', () => {
    it('should return agents list', async () => {
      mockRepository.getAgents.mockResolvedValue([{ id: 'ag-1', name: 'Document Summarizer', type: 'summarizer' }]);
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgents('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return agents with filters', async () => {
      mockRepository.getAgents.mockResolvedValue([{ id: 'ag-1' }]);
      const service = createAIAgentService(mockRepository);
      await service.getAgents('school-1', { status: 'active' });
      expect(mockRepository.getAgents).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.getAgents('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getAgents.mockResolvedValue([]);
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgents('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated agents', async () => {
      mockRepository.getAgents.mockResolvedValue({ data: [{ id: 'ag-1' }], total: 10 });
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgents('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getAgents.mockResolvedValue([{ id: 'ag-1', type: 'summarizer' }]);
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgents('school-1', { type: 'summarizer' });
      expect(result).toHaveLength(1);
    });

    it('should return agents with run count', async () => {
      mockRepository.getAgents.mockResolvedValue([{ id: 'ag-1', runCount: 25 }]);
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgents('school-1');
      expect(result[0].runCount).toBe(25);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAgents.mockRejectedValue(new Error('DB error'));
      const service = createAIAgentService(mockRepository);
      await expect(service.getAgents('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getAgentById', () => {
    it('should return a single agent', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1', name: 'Document Summarizer', type: 'summarizer' });
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgentById('ag-1');
      expect(result.id).toBe('ag-1');
    });

    it('should throw if agent not found', async () => {
      mockRepository.getAgentById.mockResolvedValue(null);
      const service = createAIAgentService(mockRepository);
      await expect(service.getAgentById('nonexistent')).rejects.toThrow('AI agent not found');
    });

    it('should throw if id is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.getAgentById('')).rejects.toThrow('Agent ID is required');
    });

    it('should return agent with config', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1', config: { model: 'gpt-4', temperature: 0.7 } });
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgentById('ag-1');
      expect(result.config.model).toBe('gpt-4');
    });

    it('should return agent with tools', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1', tools: ['web_search', 'calculator'] });
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgentById('ag-1');
      expect(result.tools).toHaveLength(2);
    });

    it('should return agent with instructions', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1', instructions: 'Summarize documents in 3 paragraphs' });
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgentById('ag-1');
      expect(result.instructions).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepository.getAgentById.mockRejectedValue(new Error('Query timeout'));
      const service = createAIAgentService(mockRepository);
      await expect(service.getAgentById('ag-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createAgent', () => {
    it('should create an agent', async () => {
      mockRepository.createAgent.mockResolvedValue({ id: 'ag-1', name: 'Document Summarizer', type: 'summarizer' });
      const service = createAIAgentService(mockRepository);
      const result = await service.createAgent('school-1', 'user-1', { name: 'Document Summarizer', type: 'summarizer', config: { model: 'gpt-4' } });
      expect(result.id).toBe('ag-1');
      expect(mockRepository.createAgent).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.createAgent('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.createAgent('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.createAgent('school-1', 'user-1', { name: '' })).rejects.toThrow('Agent name is required');
    });

    it('should create agent with instructions', async () => {
      mockRepository.createAgent.mockResolvedValue({ id: 'ag-1', instructions: 'Summarize docs' });
      const service = createAIAgentService(mockRepository);
      const result = await service.createAgent('school-1', 'user-1', { name: 'T', type: 'summarizer', instructions: 'Summarize docs' });
      expect(result.instructions).toBe('Summarize docs');
    });

    it('should create agent with tools', async () => {
      mockRepository.createAgent.mockResolvedValue({ id: 'ag-1', tools: ['web_search'] });
      const service = createAIAgentService(mockRepository);
      const result = await service.createAgent('school-1', 'user-1', { name: 'T', type: 'summarizer', tools: ['web_search'] });
      expect(result.tools).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createAgent.mockRejectedValue(new Error('Invalid config'));
      const service = createAIAgentService(mockRepository);
      await expect(service.createAgent('school-1', 'user-1', { name: 'T', type: 'summarizer' })).rejects.toThrow('Invalid config');
    });
  });

  describe('updateAgent', () => {
    it('should update an agent', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1', name: 'Old' });
      mockRepository.updateAgent.mockResolvedValue({ id: 'ag-1', name: 'Updated' });
      const service = createAIAgentService(mockRepository);
      const result = await service.updateAgent('ag-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if agent not found', async () => {
      mockRepository.getAgentById.mockResolvedValue(null);
      const service = createAIAgentService(mockRepository);
      await expect(service.updateAgent('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.updateAgent('', 'user-1', { name: 'New' })).rejects.toThrow('Agent ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.updateAgent('ag-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update agent config', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1' });
      mockRepository.updateAgent.mockResolvedValue({ id: 'ag-1', config: { model: 'gpt-4-turbo' } });
      const service = createAIAgentService(mockRepository);
      const result = await service.updateAgent('ag-1', 'user-1', { config: { model: 'gpt-4-turbo' } });
      expect(result.config.model).toBe('gpt-4-turbo');
    });

    it('should handle update failure', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1' });
      mockRepository.updateAgent.mockRejectedValue(new Error('Cannot update'));
      const service = createAIAgentService(mockRepository);
      await expect(service.updateAgent('ag-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteAgent', () => {
    it('should delete an agent', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1' });
      mockRepository.deleteAgent.mockResolvedValue({ success: true });
      const service = createAIAgentService(mockRepository);
      await service.deleteAgent('ag-1', 'user-1');
      expect(mockRepository.deleteAgent).toHaveBeenCalledWith('ag-1');
    });

    it('should throw if agent not found', async () => {
      mockRepository.getAgentById.mockResolvedValue(null);
      const service = createAIAgentService(mockRepository);
      await expect(service.deleteAgent('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.deleteAgent('', 'user-1')).rejects.toThrow('Agent ID is required');
    });

    it('should handle deletion with active runs', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1' });
      mockRepository.deleteAgent.mockRejectedValue(new Error('Agent has active runs'));
      const service = createAIAgentService(mockRepository);
      await expect(service.deleteAgent('ag-1', 'user-1')).rejects.toThrow('Agent has active runs');
    });

    it('should force delete agent', async () => {
      mockRepository.getAgentById.mockResolvedValue({ id: 'ag-1' });
      mockRepository.deleteAgent.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createAIAgentService(mockRepository);
      const result = await service.deleteAgent('ag-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('executeAgent', () => {
    it('should execute an agent', async () => {
      mockRepository.executeAgent.mockResolvedValue({ agentId: 'ag-1', runId: 'run-1', status: 'running', output: '' });
      const service = createAIAgentService(mockRepository);
      const result = await service.executeAgent('ag-1', 'user-1', { input: 'Summarize this document', documentId: 'doc-1' });
      expect(result.status).toBe('running');
      expect(result.runId).toBeDefined();
    });

    it('should throw if agentId is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.executeAgent('', 'user-1', {})).rejects.toThrow('Agent ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.executeAgent('ag-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should return completed output', async () => {
      mockRepository.executeAgent.mockResolvedValue({ agentId: 'ag-1', runId: 'run-1', status: 'completed', output: 'Document summary: ...' });
      const service = createAIAgentService(mockRepository);
      const result = await service.executeAgent('ag-1', 'user-1', { input: 'Summarize' });
      expect(result.status).toBe('completed');
      expect(result.output).toBeDefined();
    });

    it('should handle execution failure', async () => {
      mockRepository.executeAgent.mockResolvedValue({ agentId: 'ag-1', runId: 'run-1', status: 'failed', error: 'Token limit exceeded' });
      const service = createAIAgentService(mockRepository);
      const result = await service.executeAgent('ag-1', 'user-1', { input: 'Long document...' });
      expect(result.status).toBe('failed');
    });

    it('should handle agent not found', async () => {
      mockRepository.executeAgent.mockRejectedValue(new Error('Agent not found'));
      const service = createAIAgentService(mockRepository);
      await expect(service.executeAgent('nonexistent', 'user-1', {})).rejects.toThrow('Agent not found');
    });
  });

  describe('getAgentRuns', () => {
    it('should return agent runs', async () => {
      mockRepository.getAgentRuns.mockResolvedValue([{ runId: 'run-1', status: 'completed', startedAt: '2024-01-01' }]);
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgentRuns('ag-1');
      expect(result).toHaveLength(1);
    });

    it('should return runs with filters', async () => {
      mockRepository.getAgentRuns.mockResolvedValue([{ runId: 'run-1', status: 'failed' }]);
      const service = createAIAgentService(mockRepository);
      await service.getAgentRuns('ag-1', { status: 'failed' });
      expect(mockRepository.getAgentRuns).toHaveBeenCalledWith('ag-1', { status: 'failed' });
    });

    it('should throw if agentId is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.getAgentRuns('')).rejects.toThrow('Agent ID is required');
    });

    it('should return paginated runs', async () => {
      mockRepository.getAgentRuns.mockResolvedValue({ data: [{ runId: 'run-1' }], total: 50 });
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgentRuns('ag-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty runs', async () => {
      mockRepository.getAgentRuns.mockResolvedValue([]);
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgentRuns('ag-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAgentRuns.mockRejectedValue(new Error('DB error'));
      const service = createAIAgentService(mockRepository);
      await expect(service.getAgentRuns('ag-1')).rejects.toThrow('DB error');
    });
  });

  describe('getAgentMetrics', () => {
    it('should return agent metrics', async () => {
      mockRepository.getAgentMetrics.mockResolvedValue({ agentId: 'ag-1', totalRuns: 100, successRate: 95, averageDuration: 5000 });
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgentMetrics('ag-1');
      expect(result.totalRuns).toBe(100);
      expect(result.successRate).toBe(95);
    });

    it('should return metrics with filters', async () => {
      mockRepository.getAgentMetrics.mockResolvedValue({ agentId: 'ag-1', runs: [] });
      const service = createAIAgentService(mockRepository);
      await service.getAgentMetrics('ag-1', { since: '2024-01-01' });
      expect(mockRepository.getAgentMetrics).toHaveBeenCalledWith('ag-1', { since: '2024-01-01' });
    });

    it('should throw if agentId is missing', async () => {
      const service = createAIAgentService(mockRepository);
      await expect(service.getAgentMetrics('')).rejects.toThrow('Agent ID is required');
    });

    it('should return zero metrics', async () => {
      mockRepository.getAgentMetrics.mockResolvedValue({ agentId: 'ag-1', totalRuns: 0, successRate: 0 });
      const service = createAIAgentService(mockRepository);
      const result = await service.getAgentMetrics('ag-1');
      expect(result.totalRuns).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAgentMetrics.mockRejectedValue(new Error('DB error'));
      const service = createAIAgentService(mockRepository);
      await expect(service.getAgentMetrics('ag-1')).rejects.toThrow('DB error');
    });
  });
});
