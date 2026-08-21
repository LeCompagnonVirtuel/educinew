import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAIModelService } from '../../src/features/integration/services/ai-model.service';

describe('AIModelService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getModels: vi.fn(),
      getModelById: vi.fn(),
      createModel: vi.fn(),
      updateModel: vi.fn(),
      deleteModel: vi.fn(),
      testModel: vi.fn(),
      getModelMetrics: vi.fn(),
      getModelVersions: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAIModelService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getModels).toBeInstanceOf(Function);
    expect(service.getModelById).toBeInstanceOf(Function);
    expect(service.createModel).toBeInstanceOf(Function);
    expect(service.updateModel).toBeInstanceOf(Function);
    expect(service.deleteModel).toBeInstanceOf(Function);
    expect(service.testModel).toBeInstanceOf(Function);
    expect(service.getModelMetrics).toBeInstanceOf(Function);
    expect(service.getModelVersions).toBeInstanceOf(Function);
  });

  describe('getModels', () => {
    it('should return models list', async () => {
      mockRepository.getModels.mockResolvedValue([{ id: 'ml-1', name: 'GPT-4', provider: 'openai' }]);
      const service = createAIModelService(mockRepository);
      const result = await service.getModels('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return models with filters', async () => {
      mockRepository.getModels.mockResolvedValue([{ id: 'ml-1' }]);
      const service = createAIModelService(mockRepository);
      await service.getModels('school-1', { provider: 'openai' });
      expect(mockRepository.getModels).toHaveBeenCalledWith('school-1', { provider: 'openai' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.getModels('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getModels.mockResolvedValue([]);
      const service = createAIModelService(mockRepository);
      const result = await service.getModels('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated models', async () => {
      mockRepository.getModels.mockResolvedValue({ data: [{ id: 'ml-1' }], total: 10 });
      const service = createAIModelService(mockRepository);
      const result = await service.getModels('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by capability', async () => {
      mockRepository.getModels.mockResolvedValue([{ id: 'ml-1', capabilities: ['text', 'code'] }]);
      const service = createAIModelService(mockRepository);
      const result = await service.getModels('school-1', { capability: 'code' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getModels.mockRejectedValue(new Error('DB error'));
      const service = createAIModelService(mockRepository);
      await expect(service.getModels('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getModelById', () => {
    it('should return a single model', async () => {
      mockRepository.getModelById.mockResolvedValue({ id: 'ml-1', name: 'GPT-4', provider: 'openai' });
      const service = createAIModelService(mockRepository);
      const result = await service.getModelById('ml-1');
      expect(result.id).toBe('ml-1');
    });

    it('should throw if model not found', async () => {
      mockRepository.getModelById.mockResolvedValue(null);
      const service = createAIModelService(mockRepository);
      await expect(service.getModelById('nonexistent')).rejects.toThrow('AI model not found');
    });

    it('should throw if id is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.getModelById('')).rejects.toThrow('Model ID is required');
    });

    it('should return model with config', async () => {
      mockRepository.getModelById.mockResolvedValue({ id: 'ml-1', config: { maxTokens: 4096, temperature: 0.7 } });
      const service = createAIModelService(mockRepository);
      const result = await service.getModelById('ml-1');
      expect(result.config.maxTokens).toBe(4096);
    });

    it('should return model with pricing', async () => {
      mockRepository.getModelById.mockResolvedValue({ id: 'ml-1', pricing: { input: 0.03, output: 0.06 } });
      const service = createAIModelService(mockRepository);
      const result = await service.getModelById('ml-1');
      expect(result.pricing.input).toBe(0.03);
    });

    it('should handle repository errors', async () => {
      mockRepository.getModelById.mockRejectedValue(new Error('Query timeout'));
      const service = createAIModelService(mockRepository);
      await expect(service.getModelById('ml-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createModel', () => {
    it('should create a model', async () => {
      mockRepository.createModel.mockResolvedValue({ id: 'ml-1', name: 'Custom Model', status: 'active' });
      const service = createAIModelService(mockRepository);
      const result = await service.createModel('school-1', 'user-1', { name: 'Custom Model', provider: 'custom', endpoint: 'https://api.example.com' });
      expect(result.id).toBe('ml-1');
      expect(mockRepository.createModel).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.createModel('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.createModel('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.createModel('school-1', 'user-1', { name: '' })).rejects.toThrow('Model name is required');
    });

    it('should create model with endpoint', async () => {
      mockRepository.createModel.mockResolvedValue({ id: 'ml-1', endpoint: 'https://api.example.com/v1' });
      const service = createAIModelService(mockRepository);
      const result = await service.createModel('school-1', 'user-1', { name: 'T', provider: 'custom', endpoint: 'https://api.example.com/v1' });
      expect(result.endpoint).toBe('https://api.example.com/v1');
    });

    it('should create model with capabilities', async () => {
      mockRepository.createModel.mockResolvedValue({ id: 'ml-1', capabilities: ['text', 'code', 'image'] });
      const service = createAIModelService(mockRepository);
      const result = await service.createModel('school-1', 'user-1', { name: 'T', provider: 'custom', capabilities: ['text', 'code', 'image'] });
      expect(result.capabilities).toHaveLength(3);
    });

    it('should handle creation failure', async () => {
      mockRepository.createModel.mockRejectedValue(new Error('Invalid model'));
      const service = createAIModelService(mockRepository);
      await expect(service.createModel('school-1', 'user-1', { name: 'T', provider: 'custom' })).rejects.toThrow('Invalid model');
    });
  });

  describe('updateModel', () => {
    it('should update a model', async () => {
      mockRepository.getModelById.mockResolvedValue({ id: 'ml-1', name: 'Old' });
      mockRepository.updateModel.mockResolvedValue({ id: 'ml-1', name: 'Updated' });
      const service = createAIModelService(mockRepository);
      const result = await service.updateModel('ml-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if model not found', async () => {
      mockRepository.getModelById.mockResolvedValue(null);
      const service = createAIModelService(mockRepository);
      await expect(service.updateModel('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.updateModel('', 'user-1', { name: 'New' })).rejects.toThrow('Model ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.updateModel('ml-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update model config', async () => {
      mockRepository.getModelById.mockResolvedValue({ id: 'ml-1' });
      mockRepository.updateModel.mockResolvedValue({ id: 'ml-1', config: { maxTokens: 8192 } });
      const service = createAIModelService(mockRepository);
      const result = await service.updateModel('ml-1', 'user-1', { config: { maxTokens: 8192 } });
      expect(result.config.maxTokens).toBe(8192);
    });

    it('should handle update failure', async () => {
      mockRepository.getModelById.mockResolvedValue({ id: 'ml-1' });
      mockRepository.updateModel.mockRejectedValue(new Error('Cannot update'));
      const service = createAIModelService(mockRepository);
      await expect(service.updateModel('ml-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteModel', () => {
    it('should delete a model', async () => {
      mockRepository.getModelById.mockResolvedValue({ id: 'ml-1' });
      mockRepository.deleteModel.mockResolvedValue({ success: true });
      const service = createAIModelService(mockRepository);
      await service.deleteModel('ml-1', 'user-1');
      expect(mockRepository.deleteModel).toHaveBeenCalledWith('ml-1');
    });

    it('should throw if model not found', async () => {
      mockRepository.getModelById.mockResolvedValue(null);
      const service = createAIModelService(mockRepository);
      await expect(service.deleteModel('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.deleteModel('', 'user-1')).rejects.toThrow('Model ID is required');
    });

    it('should handle deletion with active usage', async () => {
      mockRepository.getModelById.mockResolvedValue({ id: 'ml-1' });
      mockRepository.deleteModel.mockRejectedValue(new Error('Model is in use'));
      const service = createAIModelService(mockRepository);
      await expect(service.deleteModel('ml-1', 'user-1')).rejects.toThrow('Model is in use');
    });

    it('should force delete model', async () => {
      mockRepository.getModelById.mockResolvedValue({ id: 'ml-1' });
      mockRepository.deleteModel.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createAIModelService(mockRepository);
      const result = await service.deleteModel('ml-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('testModel', () => {
    it('should test a model', async () => {
      mockRepository.testModel.mockResolvedValue({ modelId: 'ml-1', status: 'success', latency: 1500, tokens: { prompt: 10, completion: 20 } });
      const service = createAIModelService(mockRepository);
      const result = await service.testModel('ml-1', 'user-1', { prompt: 'Hello' });
      expect(result.status).toBe('success');
      expect(result.latency).toBe(1500);
    });

    it('should throw if modelId is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.testModel('', 'user-1', { prompt: 'test' })).rejects.toThrow('Model ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.testModel('ml-1', '', { prompt: 'test' })).rejects.toThrow('userId is required');
    });

    it('should throw if prompt is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.testModel('ml-1', 'user-1', { prompt: '' })).rejects.toThrow('Test prompt is required');
    });

    it('should handle test failure', async () => {
      mockRepository.testModel.mockResolvedValue({ modelId: 'ml-1', status: 'failed', error: 'Rate limit exceeded' });
      const service = createAIModelService(mockRepository);
      const result = await service.testModel('ml-1', 'user-1', { prompt: 'Hello' });
      expect(result.status).toBe('failed');
    });

    it('should return test details', async () => {
      mockRepository.testModel.mockResolvedValue({ modelId: 'ml-1', status: 'success', latency: 1500, tokens: { prompt: 10, completion: 20 }, cost: 0.001 });
      const service = createAIModelService(mockRepository);
      const result = await service.testModel('ml-1', 'user-1', { prompt: 'Hello' });
      expect(result.cost).toBe(0.001);
    });
  });

  describe('getModelMetrics', () => {
    it('should return model metrics', async () => {
      mockRepository.getModelMetrics.mockResolvedValue({ modelId: 'ml-1', totalRequests: 1000, averageLatency: 2000, successRate: 98 });
      const service = createAIModelService(mockRepository);
      const result = await service.getModelMetrics('ml-1');
      expect(result.totalRequests).toBe(1000);
      expect(result.successRate).toBe(98);
    });

    it('should return metrics with filters', async () => {
      mockRepository.getModelMetrics.mockResolvedValue({ modelId: 'ml-1', requests: [] });
      const service = createAIModelService(mockRepository);
      await service.getModelMetrics('ml-1', { since: '2024-01-01' });
      expect(mockRepository.getModelMetrics).toHaveBeenCalledWith('ml-1', { since: '2024-01-01' });
    });

    it('should throw if modelId is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.getModelMetrics('')).rejects.toThrow('Model ID is required');
    });

    it('should return zero metrics', async () => {
      mockRepository.getModelMetrics.mockResolvedValue({ modelId: 'ml-1', totalRequests: 0 });
      const service = createAIModelService(mockRepository);
      const result = await service.getModelMetrics('ml-1');
      expect(result.totalRequests).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getModelMetrics.mockRejectedValue(new Error('DB error'));
      const service = createAIModelService(mockRepository);
      await expect(service.getModelMetrics('ml-1')).rejects.toThrow('DB error');
    });
  });

  describe('getModelVersions', () => {
    it('should return model versions', async () => {
      mockRepository.getModelVersions.mockResolvedValue([{ version: '1.0', releasedAt: '2024-01-01', status: 'active' }]);
      const service = createAIModelService(mockRepository);
      const result = await service.getModelVersions('ml-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if modelId is missing', async () => {
      const service = createAIModelService(mockRepository);
      await expect(service.getModelVersions('')).rejects.toThrow('Model ID is required');
    });

    it('should return empty versions', async () => {
      mockRepository.getModelVersions.mockResolvedValue([]);
      const service = createAIModelService(mockRepository);
      const result = await service.getModelVersions('ml-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getModelVersions.mockRejectedValue(new Error('DB error'));
      const service = createAIModelService(mockRepository);
      await expect(service.getModelVersions('ml-1')).rejects.toThrow('DB error');
    });
  });
});
