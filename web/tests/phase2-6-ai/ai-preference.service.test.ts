import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiPreferenceService } from '@/features/ai/services/ai-preference.service';
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

describe('AiPreferenceService', () => {
  let service: AiPreferenceService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiPreferenceService(null as any);
  });

  describe('getPreference', () => {
    it('should return a preference when found', async () => {
      const mockPreference = { id: '1', userId: 'user-1', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPreference as any);
      const result = await service.getPreference('school-1', '1');
      expect(result).toEqual(mockPreference);
    });

    it('should throw error when preference not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getPreference('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listPreferences', () => {
    it('should return a list of preferences', async () => {
      const mockPreferences = [{ id: '1', userId: 'user-1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockPreferences as any);
      const result = await service.listPreferences('school-1', {});
      expect(result).toEqual(mockPreferences);
    });

    it('should return empty array when no preferences found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listPreferences('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createPreference', () => {
    it('should create a preference and return it', async () => {
      const mockPreference = { id: '1', userId: 'user-1' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockPreference as any);
      const result = await service.createPreference('school-1', { userId: 'user-1' } as any);
      expect(result).toEqual(mockPreference);
    });
  });

  describe('updatePreference', () => {
    it('should update an existing preference', async () => {
      const mockPreference = { id: '1', theme: 'dark' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPreference as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockPreference, theme: 'light' } as any);
      const result = await service.updatePreference('school-1', '1', { theme: 'light' } as any);
      expect(result.theme).toBe('light');
    });

    it('should throw error when updating non-existent preference', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updatePreference('school-1', 'nonexistent', { theme: 'dark' } as any)).rejects.toThrow();
    });
  });

  describe('deletePreference', () => {
    it('should delete an existing preference', async () => {
      const mockPreference = { id: '1', userId: 'user-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPreference as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deletePreference('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent preference', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deletePreference('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
