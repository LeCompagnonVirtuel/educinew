import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiMessageService } from '@/features/ai/services/ai-message.service';
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

describe('AiMessageService', () => {
  let service: AiMessageService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiMessageService(null as any);
  });

  describe('getMessage', () => {
    it('should return a message when found', async () => {
      const mockMessage = { id: '1', content: 'Hello', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockMessage as any);
      const result = await service.getMessage('school-1', '1');
      expect(result).toEqual(mockMessage);
    });

    it('should throw error when message not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getMessage('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listMessages', () => {
    it('should return a list of messages', async () => {
      const mockMessages = [{ id: '1', content: 'Hi' }, { id: '2', content: 'Hello' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockMessages as any);
      const result = await service.listMessages('school-1', {});
      expect(result).toEqual(mockMessages);
    });

    it('should return empty array when no messages found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listMessages('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createMessage', () => {
    it('should create a message and return it', async () => {
      const mockMessage = { id: '1', content: 'Hello' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockMessage as any);
      const result = await service.createMessage('school-1', { content: 'Hello' } as any);
      expect(result).toEqual(mockMessage);
    });
  });

  describe('updateMessage', () => {
    it('should update an existing message', async () => {
      const mockMessage = { id: '1', content: 'Old' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockMessage as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockMessage, content: 'Updated' } as any);
      const result = await service.updateMessage('school-1', '1', { content: 'Updated' } as any);
      expect(result.content).toBe('Updated');
    });

    it('should throw error when updating non-existent message', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateMessage('school-1', 'nonexistent', { content: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteMessage', () => {
    it('should delete an existing message', async () => {
      const mockMessage = { id: '1', content: 'Message' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockMessage as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteMessage('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent message', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteMessage('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getMessagesBySession', () => {
    it('should return messages for a session', async () => {
      const mockMessages = [{ id: '1', content: 'Hello', sessionId: 'sess-1' }];
      vi.mocked(aiRepository.findMessagesBySessionId).mockResolvedValue(mockMessages as any);
      const result = await service.getMessagesBySession('school-1', 'sess-1');
      expect(result).toEqual(mockMessages);
    });

    it('should return empty array when no messages for session', async () => {
      vi.mocked(aiRepository.findMessagesBySessionId).mockResolvedValue([]);
      const result = await service.getMessagesBySession('school-1', 'sess-1');
      expect(result).toEqual([]);
    });
  });
});
