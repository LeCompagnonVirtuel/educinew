import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBrandingService } from '../../src/features/documents/services/branding.service';

describe('BrandingService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getBrandingConfig: vi.fn(),
      updateBrandingConfig: vi.fn(),
      getBrandingPresets: vi.fn(),
      applyBrandingPreset: vi.fn(),
    };
  });

  describe('creation', () => {
    it('should create a branding service', () => {
      const service = createBrandingService(mockRepository);
      expect(service).toBeDefined();
    });
  });

  describe('getBrandingConfig', () => {
    it('should call repository getBrandingConfig', async () => {
      mockRepository.getBrandingConfig.mockResolvedValue({ id: '1', theme: 'dark' });
      const service = createBrandingService(mockRepository);
      const result = await service.getBrandingConfig('school-1', 'user-1');
      expect(mockRepository.getBrandingConfig).toHaveBeenCalledWith('school-1');
      expect(result).toEqual({ id: '1', theme: 'dark' });
    });
  });

  describe('updateBrandingConfig', () => {
    it('should call repository updateBrandingConfig', async () => {
      mockRepository.updateBrandingConfig.mockResolvedValue({ id: '1', theme: 'light' });
      const service = createBrandingService(mockRepository);
      const result = await service.updateBrandingConfig('school-1', 'user-1', { theme: 'light' });
      expect(mockRepository.updateBrandingConfig).toHaveBeenCalledWith('school-1', 'user-1', { theme: 'light' });
      expect(result).toEqual({ id: '1', theme: 'light' });
    });
  });

  describe('getBrandingPresets', () => {
    it('should call repository getBrandingPresets', async () => {
      mockRepository.getBrandingPresets.mockResolvedValue([{ id: 'p1', name: 'Default' }]);
      const service = createBrandingService(mockRepository);
      const result = await service.getBrandingPresets('school-1', 'user-1');
      expect(mockRepository.getBrandingPresets).toHaveBeenCalledWith('school-1');
      expect(result).toEqual([{ id: 'p1', name: 'Default' }]);
    });
  });

  describe('applyBrandingPreset', () => {
    it('should call repository applyBrandingPreset', async () => {
      mockRepository.getBrandingPresets.mockResolvedValue([{ id: 'p1' }]);
      mockRepository.applyBrandingPreset.mockResolvedValue({ success: true });
      const service = createBrandingService(mockRepository);
      const result = await service.applyBrandingPreset('school-1', 'p1', 'user-1');
      expect(mockRepository.applyBrandingPreset).toHaveBeenCalledWith('school-1', 'p1');
      expect(result).toEqual({ success: true });
    });
  });

  describe('getBrandingPreview', () => {
    it('should call repository getBrandingConfig for preview', async () => {
      mockRepository.getBrandingConfig.mockResolvedValue({ id: '1', theme: 'dark' });
      const service = createBrandingService(mockRepository);
      const result = await service.getBrandingPreview('school-1', 'user-1');
      expect(mockRepository.getBrandingConfig).toHaveBeenCalledWith('school-1');
      expect(result).toBeDefined();
    });
  });

  describe('getBrandingStats', () => {
    it('should aggregate config and presets', async () => {
      mockRepository.getBrandingConfig.mockResolvedValue({ id: '1', theme: 'dark' });
      mockRepository.getBrandingPresets.mockResolvedValue([{ id: 'p1' }, { id: 'p2' }]);
      const service = createBrandingService(mockRepository);
      const result = await service.getBrandingStats('school-1', 'user-1');
      expect(mockRepository.getBrandingConfig).toHaveBeenCalledWith('school-1');
      expect(mockRepository.getBrandingPresets).toHaveBeenCalledWith('school-1');
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should throw when repository fails on getBrandingConfig', async () => {
      mockRepository.getBrandingConfig.mockRejectedValue(new Error('DB error'));
      const service = createBrandingService(mockRepository);
      await expect(service.getBrandingConfig('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should throw when repository fails on updateBrandingConfig', async () => {
      mockRepository.updateBrandingConfig.mockRejectedValue(new Error('Update failed'));
      const service = createBrandingService(mockRepository);
      await expect(service.updateBrandingConfig('school-1', 'user-1', { theme: 'light' })).rejects.toThrow('Update failed');
    });
  });

  describe('missing params', () => {
    it('should throw if schoolId missing for getBrandingConfig', async () => {
      const service = createBrandingService(mockRepository);
      await expect(service.getBrandingConfig('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing for getBrandingConfig', async () => {
      const service = createBrandingService(mockRepository);
      await expect(service.getBrandingConfig('school-1', '')).rejects.toThrow('userId is required');
    });
  });
});
