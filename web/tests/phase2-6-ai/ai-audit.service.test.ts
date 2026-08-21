import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAuditService } from '@/features/ai/services/ai-audit.service';
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

describe('AiAuditService', () => {
  let service: AiAuditService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiAuditService(null as any);
  });

  describe('getAuditEntry', () => {
    it('should return an audit entry when found', async () => {
      const mockEntry = { id: '1', action: 'model.create', userId: 'user-1', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockEntry as any);
      const result = await service.getAuditEntry('school-1', '1');
      expect(result).toEqual(mockEntry);
    });

    it('should throw error when audit entry not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAuditEntry('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listAuditEntries', () => {
    it('should return a list of audit entries', async () => {
      const mockEntries = [{ id: '1', action: 'login' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockEntries as any);
      const result = await service.listAuditEntries('school-1', {});
      expect(result).toEqual(mockEntries);
    });

    it('should return empty array when no audit entries found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listAuditEntries('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createAuditEntry', () => {
    it('should create an audit entry and return it', async () => {
      const mockEntry = { id: '1', action: 'config.update' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockEntry as any);
      const result = await service.createAuditEntry('school-1', { action: 'config.update' } as any);
      expect(result).toEqual(mockEntry);
    });
  });

  describe('updateAuditEntry', () => {
    it('should update an existing audit entry', async () => {
      const mockEntry = { id: '1', status: 'pending' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockEntry as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockEntry, status: 'completed' } as any);
      const result = await service.updateAuditEntry('school-1', '1', { status: 'completed' } as any);
      expect(result.status).toBe('completed');
    });

    it('should throw error when updating non-existent audit entry', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateAuditEntry('school-1', 'nonexistent', { status: 'completed' } as any)).rejects.toThrow();
    });
  });

  describe('deleteAuditEntry', () => {
    it('should delete an existing audit entry', async () => {
      const mockEntry = { id: '1', action: 'test' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockEntry as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteAuditEntry('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent audit entry', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteAuditEntry('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
