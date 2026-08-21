import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiSessionService } from '@/features/ai/services/ai-session.service';
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

describe('AiSessionService', () => {
  let service: AiSessionService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiSessionService(null as any);
  });

  describe('getSession', () => {
    it('should return a session when found', async () => {
      const mockSession = { id: '1', title: 'Test Session', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSession as any);
      const result = await service.getSession('school-1', '1');
      expect(result).toEqual(mockSession);
    });

    it('should throw error when session not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getSession('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listSessions', () => {
    it('should return a list of sessions', async () => {
      const mockSessions = [{ id: '1', title: 'Session 1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockSessions as any);
      const result = await service.listSessions('school-1', {});
      expect(result).toEqual(mockSessions);
    });

    it('should return empty array when no sessions found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listSessions('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createSession', () => {
    it('should create a session and return it', async () => {
      const mockSession = { id: '1', title: 'New Session' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockSession as any);
      const result = await service.createSession('school-1', { title: 'New Session' } as any);
      expect(result).toEqual(mockSession);
    });
  });

  describe('updateSession', () => {
    it('should update an existing session', async () => {
      const mockSession = { id: '1', title: 'Old Title' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSession as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockSession, title: 'New Title' } as any);
      const result = await service.updateSession('school-1', '1', { title: 'New Title' } as any);
      expect(result.title).toBe('New Title');
    });

    it('should throw error when updating non-existent session', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateSession('school-1', 'nonexistent', { title: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteSession', () => {
    it('should delete an existing session', async () => {
      const mockSession = { id: '1', title: 'Session' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSession as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteSession('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent session', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteSession('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('endSession', () => {
    it('should end an active session', async () => {
      const mockSession = { id: '1', status: 'active' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSession as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockSession, status: 'ended' } as any);
      const result = await service.endSession('school-1', '1');
      expect(result.status).toBe('ended');
    });

    it('should throw error when ending non-existent session', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.endSession('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getSessionMessages', () => {
    it('should return messages for a session', async () => {
      const mockSession = { id: '1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSession as any);
      const mockMessages = [{ id: '1', content: 'Hello' }];
      vi.mocked(aiRepository.findMessagesBySessionId).mockResolvedValue(mockMessages as any);
      const result = await service.getSessionMessages('school-1', '1');
      expect(result).toEqual(mockMessages);
    });

    it('should throw error when session not found for messages', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getSessionMessages('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getSessionContext', () => {
    it('should return context for a session', async () => {
      const mockSession = { id: '1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSession as any);
      const mockContext = { id: '1', sessionId: '1' };
      vi.mocked(aiRepository.findContextBySessionId).mockResolvedValue(mockContext as any);
      const result = await service.getSessionContext('school-1', '1');
      expect(result).toEqual(mockContext);
    });

    it('should throw error when session not found for context', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getSessionContext('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
