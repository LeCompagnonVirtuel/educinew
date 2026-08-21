import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiLogService } from '@/features/ai/services/ai-log.service';
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

describe('AiLogService', () => {
  let service: AiLogService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiLogService(null as any);
  });

  describe('getLog', () => {
    it('should return a log when found', async () => {
      const mockLog = { id: '1', level: 'info', message: 'Request processed', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockLog as any);
      const result = await service.getLog('school-1', '1');
      expect(result).toEqual(mockLog);
    });

    it('should throw error when log not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getLog('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listLogs', () => {
    it('should return a list of logs', async () => {
      const mockLogs = [{ id: '1', level: 'info' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockLogs as any);
      const result = await service.listLogs('school-1', {});
      expect(result).toEqual(mockLogs);
    });

    it('should return empty array when no logs found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listLogs('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createLog', () => {
    it('should create a log entry and return it', async () => {
      const mockLog = { id: '1', level: 'warn' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockLog as any);
      const result = await service.createLog('school-1', { level: 'warn', message: 'Rate limit approaching' } as any);
      expect(result).toEqual(mockLog);
    });
  });

  describe('deleteLog', () => {
    it('should delete an existing log', async () => {
      const mockLog = { id: '1', level: 'info' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockLog as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteLog('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent log', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteLog('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
