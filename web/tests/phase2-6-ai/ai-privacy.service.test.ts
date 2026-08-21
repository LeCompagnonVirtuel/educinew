import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiPrivacyService } from '@/features/ai/services/ai-privacy.service';
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

describe('AiPrivacyService', () => {
  let service: AiPrivacyService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiPrivacyService(null as any);
  });

  describe('getPrivacyConfig', () => {
    it('should return a privacy config when found', async () => {
      const mockConfig = { id: '1', retentionDays: 90, schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      const result = await service.getPrivacyConfig('school-1', '1');
      expect(result).toEqual(mockConfig);
    });

    it('should throw error when privacy config not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getPrivacyConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listPrivacyConfigs', () => {
    it('should return a list of privacy configs', async () => {
      const mockConfigs = [{ id: '1', retentionDays: 90 }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockConfigs as any);
      const result = await service.listPrivacyConfigs('school-1', {});
      expect(result).toEqual(mockConfigs);
    });

    it('should return empty array when no privacy configs found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listPrivacyConfigs('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createPrivacyConfig', () => {
    it('should create a privacy config and return it', async () => {
      const mockConfig = { id: '1', retentionDays: 30 };
      vi.mocked(aiRepository.create).mockResolvedValue(mockConfig as any);
      const result = await service.createPrivacyConfig('school-1', { retentionDays: 30 } as any);
      expect(result).toEqual(mockConfig);
    });
  });

  describe('updatePrivacyConfig', () => {
    it('should update an existing privacy config', async () => {
      const mockConfig = { id: '1', retentionDays: 90 };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockConfig, retentionDays: 180 } as any);
      const result = await service.updatePrivacyConfig('school-1', '1', { retentionDays: 180 } as any);
      expect(result.retentionDays).toBe(180);
    });

    it('should throw error when updating non-existent privacy config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updatePrivacyConfig('school-1', 'nonexistent', { retentionDays: 30 } as any)).rejects.toThrow();
    });
  });

  describe('deletePrivacyConfig', () => {
    it('should delete an existing privacy config', async () => {
      const mockConfig = { id: '1', retentionDays: 90 };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deletePrivacyConfig('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent privacy config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deletePrivacyConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('detectPII', () => {
    it('should detect PII in content', async () => {
      const mockResult = { detected: true, entities: [{ type: 'EMAIL', value: 'test@example.com' }] };
      vi.mocked(aiRepository.detectPII).mockResolvedValue(mockResult as any);
      const result = await service.detectPII('school-1', { content: 'Contact test@example.com' } as any);
      expect(result.detected).toBe(true);
    });

    it('should return no PII when content is clean', async () => {
      const mockResult = { detected: false, entities: [] };
      vi.mocked(aiRepository.detectPII).mockResolvedValue(mockResult as any);
      const result = await service.detectPII('school-1', { content: 'Hello world' } as any);
      expect(result.detected).toBe(false);
    });
  });
});
