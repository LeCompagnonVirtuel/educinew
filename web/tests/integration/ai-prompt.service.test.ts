import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAIPromptService } from '../../src/features/integration/services/ai-prompt.service';

describe('AIPromptService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getPrompts: vi.fn(),
      getPromptById: vi.fn(),
      createPrompt: vi.fn(),
      updatePrompt: vi.fn(),
      deletePrompt: vi.fn(),
      executePrompt: vi.fn(),
      getPromptVersions: vi.fn(),
      getPromptMetrics: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAIPromptService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getPrompts).toBeInstanceOf(Function);
    expect(service.getPromptById).toBeInstanceOf(Function);
    expect(service.createPrompt).toBeInstanceOf(Function);
    expect(service.updatePrompt).toBeInstanceOf(Function);
    expect(service.deletePrompt).toBeInstanceOf(Function);
    expect(service.executePrompt).toBeInstanceOf(Function);
    expect(service.getPromptVersions).toBeInstanceOf(Function);
    expect(service.getPromptMetrics).toBeInstanceOf(Function);
  });

  describe('getPrompts', () => {
    it('should return prompts list', async () => {
      mockRepository.getPrompts.mockResolvedValue([{ id: 'pr-1', name: 'Summarize Document', category: 'summarization' }]);
      const service = createAIPromptService(mockRepository);
      const result = await service.getPrompts('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return prompts with filters', async () => {
      mockRepository.getPrompts.mockResolvedValue([{ id: 'pr-1' }]);
      const service = createAIPromptService(mockRepository);
      await service.getPrompts('school-1', { category: 'summarization' });
      expect(mockRepository.getPrompts).toHaveBeenCalledWith('school-1', { category: 'summarization' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.getPrompts('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getPrompts.mockResolvedValue([]);
      const service = createAIPromptService(mockRepository);
      const result = await service.getPrompts('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated prompts', async () => {
      mockRepository.getPrompts.mockResolvedValue({ data: [{ id: 'pr-1' }], total: 10 });
      const service = createAIPromptService(mockRepository);
      const result = await service.getPrompts('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by visibility', async () => {
      mockRepository.getPrompts.mockResolvedValue([{ id: 'pr-1', visibility: 'public' }]);
      const service = createAIPromptService(mockRepository);
      const result = await service.getPrompts('school-1', { visibility: 'public' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getPrompts.mockRejectedValue(new Error('DB error'));
      const service = createAIPromptService(mockRepository);
      await expect(service.getPrompts('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getPromptById', () => {
    it('should return a single prompt', async () => {
      mockRepository.getPromptById.mockResolvedValue({ id: 'pr-1', name: 'Summarize Document', template: 'Summarize: {{content}}' });
      const service = createAIPromptService(mockRepository);
      const result = await service.getPromptById('pr-1');
      expect(result.id).toBe('pr-1');
    });

    it('should throw if prompt not found', async () => {
      mockRepository.getPromptById.mockResolvedValue(null);
      const service = createAIPromptService(mockRepository);
      await expect(service.getPromptById('nonexistent')).rejects.toThrow('Prompt not found');
    });

    it('should throw if id is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.getPromptById('')).rejects.toThrow('Prompt ID is required');
    });

    it('should return prompt with variables', async () => {
      mockRepository.getPromptById.mockResolvedValue({ id: 'pr-1', variables: [{ name: 'content', type: 'text', required: true }] });
      const service = createAIPromptService(mockRepository);
      const result = await service.getPromptById('pr-1');
      expect(result.variables).toHaveLength(1);
    });

    it('should return prompt with examples', async () => {
      mockRepository.getPromptById.mockResolvedValue({ id: 'pr-1', examples: [{ input: 'Long text', output: 'Short summary' }] });
      const service = createAIPromptService(mockRepository);
      const result = await service.getPromptById('pr-1');
      expect(result.examples).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getPromptById.mockRejectedValue(new Error('Query timeout'));
      const service = createAIPromptService(mockRepository);
      await expect(service.getPromptById('pr-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createPrompt', () => {
    it('should create a prompt', async () => {
      mockRepository.createPrompt.mockResolvedValue({ id: 'pr-1', name: 'Summarize Document', status: 'active' });
      const service = createAIPromptService(mockRepository);
      const result = await service.createPrompt('school-1', 'user-1', { name: 'Summarize Document', template: 'Summarize: {{content}}', category: 'summarization' });
      expect(result.id).toBe('pr-1');
      expect(mockRepository.createPrompt).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.createPrompt('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.createPrompt('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.createPrompt('school-1', 'user-1', { name: '' })).rejects.toThrow('Prompt name is required');
    });

    it('should throw if template is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.createPrompt('school-1', 'user-1', { name: 'T', template: '' })).rejects.toThrow('Prompt template is required');
    });

    it('should create prompt with variables', async () => {
      mockRepository.createPrompt.mockResolvedValue({ id: 'pr-1', variables: [{ name: 'content', type: 'text' }] });
      const service = createAIPromptService(mockRepository);
      const result = await service.createPrompt('school-1', 'user-1', { name: 'T', template: '{{content}}', variables: [{ name: 'content', type: 'text' }] });
      expect(result.variables).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createPrompt.mockRejectedValue(new Error('Invalid template'));
      const service = createAIPromptService(mockRepository);
      await expect(service.createPrompt('school-1', 'user-1', { name: 'T', template: '{{content}}' })).rejects.toThrow('Invalid template');
    });
  });

  describe('updatePrompt', () => {
    it('should update a prompt', async () => {
      mockRepository.getPromptById.mockResolvedValue({ id: 'pr-1', name: 'Old' });
      mockRepository.updatePrompt.mockResolvedValue({ id: 'pr-1', name: 'Updated' });
      const service = createAIPromptService(mockRepository);
      const result = await service.updatePrompt('pr-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if prompt not found', async () => {
      mockRepository.getPromptById.mockResolvedValue(null);
      const service = createAIPromptService(mockRepository);
      await expect(service.updatePrompt('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.updatePrompt('', 'user-1', { name: 'New' })).rejects.toThrow('Prompt ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.updatePrompt('pr-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update prompt template', async () => {
      mockRepository.getPromptById.mockResolvedValue({ id: 'pr-1' });
      mockRepository.updatePrompt.mockResolvedValue({ id: 'pr-1', template: 'New template: {{content}}' });
      const service = createAIPromptService(mockRepository);
      const result = await service.updatePrompt('pr-1', 'user-1', { template: 'New template: {{content}}' });
      expect(result.template).toBe('New template: {{content}}');
    });

    it('should handle update failure', async () => {
      mockRepository.getPromptById.mockResolvedValue({ id: 'pr-1' });
      mockRepository.updatePrompt.mockRejectedValue(new Error('Cannot update'));
      const service = createAIPromptService(mockRepository);
      await expect(service.updatePrompt('pr-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deletePrompt', () => {
    it('should delete a prompt', async () => {
      mockRepository.getPromptById.mockResolvedValue({ id: 'pr-1' });
      mockRepository.deletePrompt.mockResolvedValue({ success: true });
      const service = createAIPromptService(mockRepository);
      await service.deletePrompt('pr-1', 'user-1');
      expect(mockRepository.deletePrompt).toHaveBeenCalledWith('pr-1');
    });

    it('should throw if prompt not found', async () => {
      mockRepository.getPromptById.mockResolvedValue(null);
      const service = createAIPromptService(mockRepository);
      await expect(service.deletePrompt('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.deletePrompt('', 'user-1')).rejects.toThrow('Prompt ID is required');
    });

    it('should handle deletion with active usage', async () => {
      mockRepository.getPromptById.mockResolvedValue({ id: 'pr-1' });
      mockRepository.deletePrompt.mockRejectedValue(new Error('Prompt is in use'));
      const service = createAIPromptService(mockRepository);
      await expect(service.deletePrompt('pr-1', 'user-1')).rejects.toThrow('Prompt is in use');
    });

    it('should force delete prompt', async () => {
      mockRepository.getPromptById.mockResolvedValue({ id: 'pr-1' });
      mockRepository.deletePrompt.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createAIPromptService(mockRepository);
      const result = await service.deletePrompt('pr-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('executePrompt', () => {
    it('should execute a prompt', async () => {
      mockRepository.executePrompt.mockResolvedValue({ promptId: 'pr-1', runId: 'run-1', status: 'completed', output: 'Summary: ...' });
      const service = createAIPromptService(mockRepository);
      const result = await service.executePrompt('pr-1', 'user-1', { variables: { content: 'Long document...' } });
      expect(result.status).toBe('completed');
      expect(result.output).toBeDefined();
    });

    it('should throw if promptId is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.executePrompt('', 'user-1', { variables: {} })).rejects.toThrow('Prompt ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.executePrompt('pr-1', '', { variables: {} })).rejects.toThrow('userId is required');
    });

    it('should return completed output', async () => {
      mockRepository.executePrompt.mockResolvedValue({ promptId: 'pr-1', runId: 'run-1', status: 'completed', output: 'Result: ...', tokens: { prompt: 100, completion: 200 } });
      const service = createAIPromptService(mockRepository);
      const result = await service.executePrompt('pr-1', 'user-1', { variables: { content: 'text' } });
      expect(result.tokens.prompt).toBe(100);
    });

    it('should handle execution failure', async () => {
      mockRepository.executePrompt.mockResolvedValue({ promptId: 'pr-1', runId: 'run-1', status: 'failed', error: 'Token limit exceeded' });
      const service = createAIPromptService(mockRepository);
      const result = await service.executePrompt('pr-1', 'user-1', { variables: {} });
      expect(result.status).toBe('failed');
    });

    it('should handle prompt not found', async () => {
      mockRepository.executePrompt.mockRejectedValue(new Error('Prompt not found'));
      const service = createAIPromptService(mockRepository);
      await expect(service.executePrompt('nonexistent', 'user-1', { variables: {} })).rejects.toThrow('Prompt not found');
    });
  });

  describe('getPromptVersions', () => {
    it('should return prompt versions', async () => {
      mockRepository.getPromptVersions.mockResolvedValue([{ version: 1, template: 'v1 template', createdAt: '2024-01-01' }]);
      const service = createAIPromptService(mockRepository);
      const result = await service.getPromptVersions('pr-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if promptId is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.getPromptVersions('')).rejects.toThrow('Prompt ID is required');
    });

    it('should return empty versions', async () => {
      mockRepository.getPromptVersions.mockResolvedValue([]);
      const service = createAIPromptService(mockRepository);
      const result = await service.getPromptVersions('pr-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getPromptVersions.mockRejectedValue(new Error('DB error'));
      const service = createAIPromptService(mockRepository);
      await expect(service.getPromptVersions('pr-1')).rejects.toThrow('DB error');
    });
  });

  describe('getPromptMetrics', () => {
    it('should return prompt metrics', async () => {
      mockRepository.getPromptMetrics.mockResolvedValue({ promptId: 'pr-1', totalExecutions: 200, averageLatency: 3000, successRate: 95 });
      const service = createAIPromptService(mockRepository);
      const result = await service.getPromptMetrics('pr-1');
      expect(result.totalExecutions).toBe(200);
      expect(result.successRate).toBe(95);
    });

    it('should return metrics with filters', async () => {
      mockRepository.getPromptMetrics.mockResolvedValue({ promptId: 'pr-1', executions: [] });
      const service = createAIPromptService(mockRepository);
      await service.getPromptMetrics('pr-1', { since: '2024-01-01' });
      expect(mockRepository.getPromptMetrics).toHaveBeenCalledWith('pr-1', { since: '2024-01-01' });
    });

    it('should throw if promptId is missing', async () => {
      const service = createAIPromptService(mockRepository);
      await expect(service.getPromptMetrics('')).rejects.toThrow('Prompt ID is required');
    });

    it('should return zero metrics', async () => {
      mockRepository.getPromptMetrics.mockResolvedValue({ promptId: 'pr-1', totalExecutions: 0 });
      const service = createAIPromptService(mockRepository);
      const result = await service.getPromptMetrics('pr-1');
      expect(result.totalExecutions).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getPromptMetrics.mockRejectedValue(new Error('DB error'));
      const service = createAIPromptService(mockRepository);
      await expect(service.getPromptMetrics('pr-1')).rejects.toThrow('DB error');
    });
  });
});
