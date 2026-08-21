import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAuthorizationService } from '@/features/ai/services/ai-authorization.service';
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

describe('AiAuthorizationService', () => {
  let service: AiAuthorizationService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiAuthorizationService(null as any);
  });

  describe('getAuthorization', () => {
    it('should return an authorization when found', async () => {
      const mockAuth = { id: '1', userId: 'user-1', role: 'admin', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAuth as any);
      const result = await service.getAuthorization('school-1', '1');
      expect(result).toEqual(mockAuth);
    });

    it('should throw error when authorization not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAuthorization('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listAuthorizations', () => {
    it('should return a list of authorizations', async () => {
      const mockAuths = [{ id: '1', role: 'admin' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockAuths as any);
      const result = await service.listAuthorizations('school-1', {});
      expect(result).toEqual(mockAuths);
    });

    it('should return empty array when no authorizations found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listAuthorizations('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createAuthorization', () => {
    it('should create an authorization and return it', async () => {
      const mockAuth = { id: '1', role: 'teacher' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAuth as any);
      const result = await service.createAuthorization('school-1', { role: 'teacher' } as any);
      expect(result).toEqual(mockAuth);
    });
  });

  describe('updateAuthorization', () => {
    it('should update an existing authorization', async () => {
      const mockAuth = { id: '1', role: 'teacher' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAuth as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAuth, role: 'admin' } as any);
      const result = await service.updateAuthorization('school-1', '1', { role: 'admin' } as any);
      expect(result.role).toBe('admin');
    });

    it('should throw error when updating non-existent authorization', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateAuthorization('school-1', 'nonexistent', { role: 'admin' } as any)).rejects.toThrow();
    });
  });

  describe('deleteAuthorization', () => {
    it('should delete an existing authorization', async () => {
      const mockAuth = { id: '1', role: 'admin' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAuth as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteAuthorization('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent authorization', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteAuthorization('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('checkPermission', () => {
    it('should return true when user has permission', async () => {
      vi.mocked(aiRepository.checkPermission).mockResolvedValue(true);
      const result = await service.checkPermission('school-1', 'user-1', 'read');
      expect(result).toBe(true);
    });

    it('should return false when user lacks permission', async () => {
      vi.mocked(aiRepository.checkPermission).mockResolvedValue(false);
      const result = await service.checkPermission('school-1', 'user-1', 'delete');
      expect(result).toBe(false);
    });
  });
});
