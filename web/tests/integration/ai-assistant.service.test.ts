import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAIAssistantService } from '../../src/features/integration/services/ai-assistant.service';

describe('AIAssistantService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getAssistants: vi.fn(),
      getAssistantById: vi.fn(),
      createAssistant: vi.fn(),
      updateAssistant: vi.fn(),
      deleteAssistant: vi.fn(),
      chat: vi.fn(),
      getChatHistory: vi.fn(),
      getAssistantMetrics: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAIAssistantService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getAssistants).toBeInstanceOf(Function);
    expect(service.getAssistantById).toBeInstanceOf(Function);
    expect(service.createAssistant).toBeInstanceOf(Function);
    expect(service.updateAssistant).toBeInstanceOf(Function);
    expect(service.deleteAssistant).toBeInstanceOf(Function);
    expect(service.chat).toBeInstanceOf(Function);
    expect(service.getChatHistory).toBeInstanceOf(Function);
    expect(service.getAssistantMetrics).toBeInstanceOf(Function);
  });

  describe('getAssistants', () => {
    it('should return assistants list', async () => {
      mockRepository.getAssistants.mockResolvedValue([{ id: 'as-1', name: 'Study Helper', status: 'active' }]);
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistants('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return assistants with filters', async () => {
      mockRepository.getAssistants.mockResolvedValue([{ id: 'as-1' }]);
      const service = createAIAssistantService(mockRepository);
      await service.getAssistants('school-1', { status: 'active' });
      expect(mockRepository.getAssistants).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.getAssistants('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getAssistants.mockResolvedValue([]);
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistants('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated assistants', async () => {
      mockRepository.getAssistants.mockResolvedValue({ data: [{ id: 'as-1' }], total: 10 });
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistants('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getAssistants.mockResolvedValue([{ id: 'as-1', type: 'chatbot' }]);
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistants('school-1', { type: 'chatbot' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAssistants.mockRejectedValue(new Error('DB error'));
      const service = createAIAssistantService(mockRepository);
      await expect(service.getAssistants('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getAssistantById', () => {
    it('should return a single assistant', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1', name: 'Study Helper' });
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistantById('as-1');
      expect(result.id).toBe('as-1');
    });

    it('should throw if assistant not found', async () => {
      mockRepository.getAssistantById.mockResolvedValue(null);
      const service = createAIAssistantService(mockRepository);
      await expect(service.getAssistantById('nonexistent')).rejects.toThrow('AI assistant not found');
    });

    it('should throw if id is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.getAssistantById('')).rejects.toThrow('Assistant ID is required');
    });

    it('should return assistant with config', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1', config: { model: 'gpt-4', temperature: 0.7 } });
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistantById('as-1');
      expect(result.config.model).toBe('gpt-4');
    });

    it('should return assistant with system prompt', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1', systemPrompt: 'You are a helpful study assistant.' });
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistantById('as-1');
      expect(result.systemPrompt).toBeDefined();
    });

    it('should return assistant with knowledge bases', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1', knowledgeBaseIds: ['kb-1', 'kb-2'] });
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistantById('as-1');
      expect(result.knowledgeBaseIds).toHaveLength(2);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAssistantById.mockRejectedValue(new Error('Query timeout'));
      const service = createAIAssistantService(mockRepository);
      await expect(service.getAssistantById('as-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createAssistant', () => {
    it('should create an assistant', async () => {
      mockRepository.createAssistant.mockResolvedValue({ id: 'as-1', name: 'Study Helper', status: 'active' });
      const service = createAIAssistantService(mockRepository);
      const result = await service.createAssistant('school-1', 'user-1', { name: 'Study Helper', type: 'chatbot', config: { model: 'gpt-4' } });
      expect(result.id).toBe('as-1');
      expect(mockRepository.createAssistant).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.createAssistant('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.createAssistant('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.createAssistant('school-1', 'user-1', { name: '' })).rejects.toThrow('Assistant name is required');
    });

    it('should create assistant with system prompt', async () => {
      mockRepository.createAssistant.mockResolvedValue({ id: 'as-1', systemPrompt: 'You are helpful.' });
      const service = createAIAssistantService(mockRepository);
      const result = await service.createAssistant('school-1', 'user-1', { name: 'T', type: 'chatbot', systemPrompt: 'You are helpful.' });
      expect(result.systemPrompt).toBe('You are helpful.');
    });

    it('should create assistant with knowledge bases', async () => {
      mockRepository.createAssistant.mockResolvedValue({ id: 'as-1', knowledgeBaseIds: ['kb-1'] });
      const service = createAIAssistantService(mockRepository);
      const result = await service.createAssistant('school-1', 'user-1', { name: 'T', type: 'chatbot', knowledgeBaseIds: ['kb-1'] });
      expect(result.knowledgeBaseIds).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createAssistant.mockRejectedValue(new Error('Invalid config'));
      const service = createAIAssistantService(mockRepository);
      await expect(service.createAssistant('school-1', 'user-1', { name: 'T', type: 'chatbot' })).rejects.toThrow('Invalid config');
    });
  });

  describe('updateAssistant', () => {
    it('should update an assistant', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1', name: 'Old' });
      mockRepository.updateAssistant.mockResolvedValue({ id: 'as-1', name: 'Updated' });
      const service = createAIAssistantService(mockRepository);
      const result = await service.updateAssistant('as-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if assistant not found', async () => {
      mockRepository.getAssistantById.mockResolvedValue(null);
      const service = createAIAssistantService(mockRepository);
      await expect(service.updateAssistant('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.updateAssistant('', 'user-1', { name: 'New' })).rejects.toThrow('Assistant ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.updateAssistant('as-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update assistant config', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1' });
      mockRepository.updateAssistant.mockResolvedValue({ id: 'as-1', config: { model: 'gpt-4-turbo' } });
      const service = createAIAssistantService(mockRepository);
      const result = await service.updateAssistant('as-1', 'user-1', { config: { model: 'gpt-4-turbo' } });
      expect(result.config.model).toBe('gpt-4-turbo');
    });

    it('should handle update failure', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1' });
      mockRepository.updateAssistant.mockRejectedValue(new Error('Cannot update'));
      const service = createAIAssistantService(mockRepository);
      await expect(service.updateAssistant('as-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteAssistant', () => {
    it('should delete an assistant', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1' });
      mockRepository.deleteAssistant.mockResolvedValue({ success: true });
      const service = createAIAssistantService(mockRepository);
      await service.deleteAssistant('as-1', 'user-1');
      expect(mockRepository.deleteAssistant).toHaveBeenCalledWith('as-1');
    });

    it('should throw if assistant not found', async () => {
      mockRepository.getAssistantById.mockResolvedValue(null);
      const service = createAIAssistantService(mockRepository);
      await expect(service.deleteAssistant('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.deleteAssistant('', 'user-1')).rejects.toThrow('Assistant ID is required');
    });

    it('should handle deletion with active sessions', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1' });
      mockRepository.deleteAssistant.mockRejectedValue(new Error('Assistant has active sessions'));
      const service = createAIAssistantService(mockRepository);
      await expect(service.deleteAssistant('as-1', 'user-1')).rejects.toThrow('Assistant has active sessions');
    });

    it('should force delete assistant', async () => {
      mockRepository.getAssistantById.mockResolvedValue({ id: 'as-1' });
      mockRepository.deleteAssistant.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createAIAssistantService(mockRepository);
      const result = await service.deleteAssistant('as-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('chat', () => {
    it('should chat with assistant', async () => {
      mockRepository.chat.mockResolvedValue({ assistantId: 'as-1', messageId: 'msg-1', response: 'Hello! How can I help?', status: 'completed' });
      const service = createAIAssistantService(mockRepository);
      const result = await service.chat('as-1', 'user-1', { message: 'Hello' });
      expect(result.response).toBeDefined();
      expect(result.status).toBe('completed');
    });

    it('should throw if assistantId is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.chat('', 'user-1', { message: 'Hi' })).rejects.toThrow('Assistant ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.chat('as-1', '', { message: 'Hi' })).rejects.toThrow('userId is required');
    });

    it('should throw if message is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.chat('as-1', 'user-1', { message: '' })).rejects.toThrow('Message is required');
    });

    it('should return streaming response', async () => {
      mockRepository.chat.mockResolvedValue({ assistantId: 'as-1', messageId: 'msg-1', response: 'Streaming response...', streaming: true });
      const service = createAIAssistantService(mockRepository);
      const result = await service.chat('as-1', 'user-1', { message: 'Tell me more', stream: true });
      expect(result.streaming).toBe(true);
    });

    it('should handle chat failure', async () => {
      mockRepository.chat.mockRejectedValue(new Error('Model overloaded'));
      const service = createAIAssistantService(mockRepository);
      await expect(service.chat('as-1', 'user-1', { message: 'Hello' })).rejects.toThrow('Model overloaded');
    });
  });

  describe('getChatHistory', () => {
    it('should return chat history', async () => {
      mockRepository.getChatHistory.mockResolvedValue([{ messageId: 'msg-1', role: 'user', content: 'Hello', timestamp: '2024-01-01' }]);
      const service = createAIAssistantService(mockRepository);
      const result = await service.getChatHistory('as-1', 'user-1');
      expect(result).toHaveLength(1);
    });

    it('should return history with filters', async () => {
      mockRepository.getChatHistory.mockResolvedValue([{ messageId: 'msg-1' }]);
      const service = createAIAssistantService(mockRepository);
      await service.getChatHistory('as-1', 'user-1', { sessionId: 'sess-1' });
      expect(mockRepository.getChatHistory).toHaveBeenCalledWith('as-1', 'user-1', { sessionId: 'sess-1' });
    });

    it('should throw if assistantId is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.getChatHistory('', 'user-1')).rejects.toThrow('Assistant ID is required');
    });

    it('should return paginated history', async () => {
      mockRepository.getChatHistory.mockResolvedValue({ data: [{ messageId: 'msg-1' }], total: 100 });
      const service = createAIAssistantService(mockRepository);
      const result = await service.getChatHistory('as-1', 'user-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty history', async () => {
      mockRepository.getChatHistory.mockResolvedValue([]);
      const service = createAIAssistantService(mockRepository);
      const result = await service.getChatHistory('as-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getChatHistory.mockRejectedValue(new Error('DB error'));
      const service = createAIAssistantService(mockRepository);
      await expect(service.getChatHistory('as-1', 'user-1')).rejects.toThrow('DB error');
    });
  });

  describe('getAssistantMetrics', () => {
    it('should return assistant metrics', async () => {
      mockRepository.getAssistantMetrics.mockResolvedValue({ assistantId: 'as-1', totalChats: 500, averageResponseTime: 2000, satisfactionRate: 92 });
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistantMetrics('as-1');
      expect(result.totalChats).toBe(500);
      expect(result.satisfactionRate).toBe(92);
    });

    it('should return metrics with filters', async () => {
      mockRepository.getAssistantMetrics.mockResolvedValue({ assistantId: 'as-1', chats: [] });
      const service = createAIAssistantService(mockRepository);
      await service.getAssistantMetrics('as-1', { since: '2024-01-01' });
      expect(mockRepository.getAssistantMetrics).toHaveBeenCalledWith('as-1', { since: '2024-01-01' });
    });

    it('should throw if assistantId is missing', async () => {
      const service = createAIAssistantService(mockRepository);
      await expect(service.getAssistantMetrics('')).rejects.toThrow('Assistant ID is required');
    });

    it('should return zero metrics', async () => {
      mockRepository.getAssistantMetrics.mockResolvedValue({ assistantId: 'as-1', totalChats: 0 });
      const service = createAIAssistantService(mockRepository);
      const result = await service.getAssistantMetrics('as-1');
      expect(result.totalChats).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAssistantMetrics.mockRejectedValue(new Error('DB error'));
      const service = createAIAssistantService(mockRepository);
      await expect(service.getAssistantMetrics('as-1')).rejects.toThrow('DB error');
    });
  });
});
