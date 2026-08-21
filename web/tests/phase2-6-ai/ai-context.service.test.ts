import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiContextService } from '@/features/ai/services/ai-context.service';
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

describe('AiContextService', () => {
  let service: AiContextService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiContextService(null as any);
  });

  describe('getContext', () => {
    it('should return a context when found', async () => {
      const mockContext = { id: '1', sessionId: 'sess-1', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockContext as any);
      const result = await service.getContext('school-1', '1');
      expect(result).toEqual(mockContext);
    });

    it('should throw error when context not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getContext('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listContexts', () => {
    it('should return a list of contexts', async () => {
      const mockContexts = [{ id: '1', sessionId: 'sess-1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockContexts as any);
      const result = await service.listContexts('school-1', {});
      expect(result).toEqual(mockContexts);
    });

    it('should return empty array when no contexts found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listContexts('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createContext', () => {
    it('should create a context and return it', async () => {
      const mockContext = { id: '1', sessionId: 'sess-1' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockContext as any);
      const result = await service.createContext('school-1', { sessionId: 'sess-1' } as any);
      expect(result).toEqual(mockContext);
    });
  });

  describe('updateContext', () => {
    it('should update an existing context', async () => {
      const mockContext = { id: '1', sessionId: 'sess-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockContext as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockContext, sessionId: 'sess-2' } as any);
      const result = await service.updateContext('school-1', '1', { sessionId: 'sess-2' } as any);
      expect(result.sessionId).toBe('sess-2');
    });

    it('should throw error when updating non-existent context', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateContext('school-1', 'nonexistent', { sessionId: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteContext', () => {
    it('should delete an existing context', async () => {
      const mockContext = { id: '1', sessionId: 'sess-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockContext as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteContext('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent context', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteContext('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getContextBySession', () => {
    it('should return context for a session', async () => {
      const mockContext = { id: '1', sessionId: 'sess-1' };
      vi.mocked(aiRepository.findContextBySessionId).mockResolvedValue(mockContext as any);
      const result = await service.getContextBySession('school-1', 'sess-1');
      expect(result).toEqual(mockContext);
    });

    it('should return null when no context for session', async () => {
      vi.mocked(aiRepository.findContextBySessionId).mockResolvedValue(null as any);
      const result = await service.getContextBySession('school-1', 'sess-1');
      expect(result).toBeNull();
    });
  });
});
