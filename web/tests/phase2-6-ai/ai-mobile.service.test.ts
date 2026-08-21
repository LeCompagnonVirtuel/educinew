import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiMobileService } from '@/features/ai/services/ai-mobile.service';
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

describe('AiMobileService', () => {
  let service: AiMobileService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiMobileService(null as any);
  });

  describe('getMobileConfig', () => {
    it('should return a mobile config when found', async () => {
      const mockConfig = { id: '1', platform: 'ios', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      const result = await service.getMobileConfig('school-1', '1');
      expect(result).toEqual(mockConfig);
    });

    it('should throw error when mobile config not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getMobileConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listMobileConfigs', () => {
    it('should return a list of mobile configs', async () => {
      const mockConfigs = [{ id: '1', platform: 'ios' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockConfigs as any);
      const result = await service.listMobileConfigs('school-1', {});
      expect(result).toEqual(mockConfigs);
    });

    it('should return empty array when no mobile configs found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listMobileConfigs('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createMobileConfig', () => {
    it('should create a mobile config and return it', async () => {
      const mockConfig = { id: '1', platform: 'android' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockConfig as any);
      const result = await service.createMobileConfig('school-1', { platform: 'android' } as any);
      expect(result).toEqual(mockConfig);
    });
  });

  describe('updateMobileConfig', () => {
    it('should update an existing mobile config', async () => {
      const mockConfig = { id: '1', enabled: false };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockConfig, enabled: true } as any);
      const result = await service.updateMobileConfig('school-1', '1', { enabled: true } as any);
      expect(result.enabled).toBe(true);
    });

    it('should throw error when updating non-existent mobile config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateMobileConfig('school-1', 'nonexistent', { enabled: true } as any)).rejects.toThrow();
    });
  });

  describe('deleteMobileConfig', () => {
    it('should delete an existing mobile config', async () => {
      const mockConfig = { id: '1', platform: 'ios' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteMobileConfig('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent mobile config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteMobileConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getMobileChatSessions', () => {
    it('should return mobile chat sessions', async () => {
      const mockSessions = [{ id: '1', deviceId: 'device-1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockSessions as any);
      const result = await service.getMobileChatSessions('school-1', {});
      expect(result).toEqual(mockSessions);
    });

    it('should return empty array when no sessions found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.getMobileChatSessions('school-1', {});
      expect(result).toEqual([]);
    });
  });
});
