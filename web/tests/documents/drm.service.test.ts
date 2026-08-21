import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDRMService } from '../../src/features/documents/services/drm.service';

describe('DRMService', () => {
  let mockRepository: {
    getDRMConfig: ReturnType<typeof vi.fn>;
    applyDRM: ReturnType<typeof vi.fn>;
    removeDRM: ReturnType<typeof vi.fn>;
    validateDRM: ReturnType<typeof vi.fn>;
    getDRMStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getDRMConfig: vi.fn(),
      applyDRM: vi.fn(),
      removeDRM: vi.fn(),
      validateDRM: vi.fn(),
      getDRMStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createDRMService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getDRMConfig).toBeInstanceOf(Function);
    expect(service.applyDRM).toBeInstanceOf(Function);
    expect(service.removeDRM).toBeInstanceOf(Function);
    expect(service.validateDRM).toBeInstanceOf(Function);
    expect(service.getDRMStats).toBeInstanceOf(Function);
  });

  describe('getDRMConfig', () => {
    it('should return DRM config', async () => {
      const config = { encryption: 'AES-256', watermark: true };
      mockRepository.getDRMConfig.mockResolvedValue(config);
      const service = createDRMService(mockRepository);
      const result = await service.getDRMConfig('doc-1', 'user-1');
      expect(result).toEqual(config);
      expect(mockRepository.getDRMConfig).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.getDRMConfig('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.getDRMConfig('doc-1', '')).rejects.toThrow();
    });

    it('should pass correct documentId to repository', async () => {
      mockRepository.getDRMConfig.mockResolvedValue({ encryption: 'none' });
      const service = createDRMService(mockRepository);
      await service.getDRMConfig('doc-42', 'user-1');
      expect(mockRepository.getDRMConfig).toHaveBeenCalledWith('doc-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDRMConfig.mockRejectedValue(new Error('Config fetch failed'));
      const service = createDRMService(mockRepository);
      await expect(service.getDRMConfig('doc-1', 'user-1')).rejects.toThrow('Config fetch failed');
    });
  });

  describe('applyDRM', () => {
    it('should apply DRM successfully', async () => {
      const data = { encryption: 'AES-256', watermark: true };
      const result = { success: true, documentId: 'doc-1' };
      mockRepository.applyDRM.mockResolvedValue(result);
      const service = createDRMService(mockRepository);
      const response = await service.applyDRM('doc-1', 'user-1', data);
      expect(response).toEqual(result);
      expect(mockRepository.applyDRM).toHaveBeenCalledWith('doc-1', 'user-1', data);
    });

    it('should throw when documentId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.applyDRM('', 'user-1', { encryption: 'AES-256' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.applyDRM('doc-1', '', { encryption: 'AES-256' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.applyDRM('doc-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should pass all parameters to repository', async () => {
      const data = { encryption: 'RSA-2048' };
      mockRepository.applyDRM.mockResolvedValue({ success: true });
      const service = createDRMService(mockRepository);
      await service.applyDRM('doc-99', 'user-42', data);
      expect(mockRepository.applyDRM).toHaveBeenCalledWith('doc-99', 'user-42', data);
    });

    it('should propagate repository errors', async () => {
      mockRepository.applyDRM.mockRejectedValue(new Error('Apply failed'));
      const service = createDRMService(mockRepository);
      await expect(service.applyDRM('doc-1', 'user-1', { encryption: 'AES-256' })).rejects.toThrow('Apply failed');
    });
  });

  describe('removeDRM', () => {
    it('should remove DRM successfully', async () => {
      mockRepository.removeDRM.mockResolvedValue(undefined);
      const service = createDRMService(mockRepository);
      await service.removeDRM('doc-1', 'user-1');
      expect(mockRepository.removeDRM).toHaveBeenCalledWith('doc-1', 'user-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.removeDRM('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.removeDRM('doc-1', '')).rejects.toThrow();
    });

    it('should not return a value on success', async () => {
      mockRepository.removeDRM.mockResolvedValue(undefined);
      const service = createDRMService(mockRepository);
      const result = await service.removeDRM('doc-1', 'user-1');
      expect(result).toBeUndefined();
    });

    it('should pass correct parameters to repository', async () => {
      mockRepository.removeDRM.mockResolvedValue(undefined);
      const service = createDRMService(mockRepository);
      await service.removeDRM('doc-99', 'user-42');
      expect(mockRepository.removeDRM).toHaveBeenCalledWith('doc-99', 'user-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.removeDRM.mockRejectedValue(new Error('Remove failed'));
      const service = createDRMService(mockRepository);
      await expect(service.removeDRM('doc-1', 'user-1')).rejects.toThrow('Remove failed');
    });
  });

  describe('validateDRM', () => {
    it('should validate DRM as valid', async () => {
      const config = { encryption: 'AES-256' };
      mockRepository.getDRMConfig.mockResolvedValue(config);
      mockRepository.validateDRM.mockResolvedValue(true);
      const service = createDRMService(mockRepository);
      const result = await service.validateDRM('doc-1', 'user-1');
      expect(result).toEqual({ valid: true });
      expect(mockRepository.getDRMConfig).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.validateDRM).toHaveBeenCalledWith('doc-1');
    });

    it('should validate DRM as invalid', async () => {
      const config = { encryption: 'AES-256' };
      mockRepository.getDRMConfig.mockResolvedValue(config);
      mockRepository.validateDRM.mockResolvedValue(false);
      const service = createDRMService(mockRepository);
      const result = await service.validateDRM('doc-1', 'user-1');
      expect(result).toEqual({ valid: false });
    });

    it('should throw when documentId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.validateDRM('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.validateDRM('doc-1', '')).rejects.toThrow();
    });

    it('should throw when DRM config is not found', async () => {
      mockRepository.getDRMConfig.mockResolvedValue(null);
      const service = createDRMService(mockRepository);
      await expect(service.validateDRM('doc-1', 'user-1')).rejects.toThrow();
    });

    it('should call validateDRM after fetching config', async () => {
      mockRepository.getDRMConfig.mockResolvedValue({ encryption: 'AES-256' });
      mockRepository.validateDRM.mockResolvedValue(true);
      const service = createDRMService(mockRepository);
      await service.validateDRM('doc-1', 'user-1');
      expect(mockRepository.getDRMConfig).toHaveBeenCalledBefore(mockRepository.validateDRM);
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDRMConfig.mockRejectedValue(new Error('Validation error'));
      const service = createDRMService(mockRepository);
      await expect(service.validateDRM('doc-1', 'user-1')).rejects.toThrow('Validation error');
    });
  });

  describe('getDRMStats', () => {
    it('should fetch DRM stats', async () => {
      const stats = { protectedDocuments: 50, activeDRM: 30 };
      mockRepository.getDRMStats.mockResolvedValue(stats);
      const service = createDRMService(mockRepository);
      const result = await service.getDRMStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getDRMStats).toHaveBeenCalledWith('school-1');
    });

    it('should throw when schoolId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.getDRMStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.getDRMStats('school-1', '')).rejects.toThrow();
    });

    it('should pass correct schoolId to repository', async () => {
      mockRepository.getDRMStats.mockResolvedValue({ protectedDocuments: 0 });
      const service = createDRMService(mockRepository);
      await service.getDRMStats('school-42', 'user-1');
      expect(mockRepository.getDRMStats).toHaveBeenCalledWith('school-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDRMStats.mockRejectedValue(new Error('Stats failed'));
      const service = createDRMService(mockRepository);
      await expect(service.getDRMStats('school-1', 'user-1')).rejects.toThrow('Stats failed');
    });
  });

  describe('missing required parameters', () => {
    it('should throw when getDRMConfig receives all empty strings', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.getDRMConfig('', '')).rejects.toThrow();
    });

    it('should throw when applyDRM receives undefined documentId', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.applyDRM(undefined as any, 'user-1', { encryption: 'AES' })).rejects.toThrow();
    });

    it('should throw when removeDRM receives all empty strings', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.removeDRM('', '')).rejects.toThrow();
    });

    it('should throw when validateDRM receives undefined userId', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.validateDRM('doc-1', undefined as any)).rejects.toThrow();
    });

    it('should throw when getDRMStats receives null schoolId', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.getDRMStats(null as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when applyDRM receives null data', async () => {
      const service = createDRMService(mockRepository);
      await expect(service.applyDRM('doc-1', 'user-1', null as any)).rejects.toThrow();
    });
  });

  describe('repository error handling', () => {
    it('should handle getDRMConfig failure in validateDRM', async () => {
      mockRepository.getDRMConfig.mockRejectedValue(new Error('Config unavailable'));
      const service = createDRMService(mockRepository);
      await expect(service.validateDRM('doc-1', 'user-1')).rejects.toThrow('Config unavailable');
    });

    it('should handle validateDRM failure after config fetch', async () => {
      mockRepository.getDRMConfig.mockResolvedValue({ encryption: 'AES-256' });
      mockRepository.validateDRM.mockRejectedValue(new Error('Validation error'));
      const service = createDRMService(mockRepository);
      await expect(service.validateDRM('doc-1', 'user-1')).rejects.toThrow('Validation error');
    });

    it('should handle applyDRM network error', async () => {
      mockRepository.applyDRM.mockRejectedValue(new Error('Network timeout'));
      const service = createDRMService(mockRepository);
      await expect(service.applyDRM('doc-1', 'user-1', { encryption: 'AES-256' })).rejects.toThrow('Network timeout');
    });

    it('should handle removeDRM permission error', async () => {
      mockRepository.removeDRM.mockRejectedValue(new Error('Insufficient permissions'));
      const service = createDRMService(mockRepository);
      await expect(service.removeDRM('doc-1', 'user-1')).rejects.toThrow('Insufficient permissions');
    });

    it('should handle getDRMStats database error', async () => {
      mockRepository.getDRMStats.mockRejectedValue(new Error('Database connection lost'));
      const service = createDRMService(mockRepository);
      await expect(service.getDRMStats('school-1', 'user-1')).rejects.toThrow('Database connection lost');
    });
  });

  describe('DRM configuration details', () => {
    it('should pass correct DRM config to applyDRM', async () => {
      const data = { encryption: 'RSA-2048', watermark: true, copyProtection: false };
      mockRepository.applyDRM.mockResolvedValue({ success: true });
      const service = createDRMService(mockRepository);
      await service.applyDRM('doc-1', 'user-1', data);
      expect(mockRepository.applyDRM).toHaveBeenCalledWith('doc-1', 'user-1', data);
    });

    it('should validate DRM with different config types', async () => {
      mockRepository.getDRMConfig.mockResolvedValue({ encryption: 'DES' });
      mockRepository.validateDRM.mockResolvedValue(true);
      const service = createDRMService(mockRepository);
      const result = await service.validateDRM('doc-1', 'user-1');
      expect(result.valid).toBe(true);
    });
  });

  describe('DRM removal scenarios', () => {
    it('should remove DRM and verify repository was called', async () => {
      mockRepository.removeDRM.mockResolvedValue(undefined);
      const service = createDRMService(mockRepository);
      await service.removeDRM('doc-1', 'user-1');
      expect(mockRepository.removeDRM).toHaveBeenCalledOnce();
      expect(mockRepository.removeDRM).toHaveBeenCalledWith('doc-1', 'user-1');
    });
  });

  describe('DRM stats validation', () => {
    it('should return stats from correct school', async () => {
      const stats = { protectedDocuments: 10, activeDRM: 8, expiredDRM: 2 };
      mockRepository.getDRMStats.mockResolvedValue(stats);
      const service = createDRMService(mockRepository);
      const result = await service.getDRMStats('school-42', 'user-1');
      expect(result.protectedDocuments).toBe(10);
      expect(result.expiredDRM).toBe(2);
    });
  });
});
