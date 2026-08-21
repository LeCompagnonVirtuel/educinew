import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWatermarkService } from '../../src/features/documents/services/watermark.service';

describe('WatermarkService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getWatermarks: vi.fn(),
      applyWatermark: vi.fn(),
      removeWatermark: vi.fn(),
      getWatermarkConfig: vi.fn(),
      updateWatermarkConfig: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createWatermarkService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getWatermarks).toBeInstanceOf(Function);
    expect(service.applyWatermark).toBeInstanceOf(Function);
    expect(service.removeWatermark).toBeInstanceOf(Function);
    expect(service.getWatermarkConfig).toBeInstanceOf(Function);
    expect(service.updateWatermarkConfig).toBeInstanceOf(Function);
  });

  describe('getWatermarks', () => {
    it('should return watermark list', async () => {
      const watermarks = [{ id: 'wm-1', text: 'CONFIDENTIAL' }];
      mockRepository.getWatermarks.mockResolvedValue(watermarks);
      const service = createWatermarkService(mockRepository);
      const result = await service.getWatermarks('doc-1', 'user-1');
      expect(result).toEqual(watermarks);
      expect(mockRepository.getWatermarks).toHaveBeenCalledWith('doc-1');
    });
  });

  describe('applyWatermark', () => {
    it('should apply watermark to document', async () => {
      mockRepository.applyWatermark.mockResolvedValue(undefined);
      const service = createWatermarkService(mockRepository);
      await service.applyWatermark('doc-1', 'wm-1', 'user-1');
      expect(mockRepository.applyWatermark).toHaveBeenCalledWith('doc-1', 'wm-1');
    });
  });

  describe('removeWatermark', () => {
    it('should remove watermark from document', async () => {
      mockRepository.removeWatermark.mockResolvedValue(undefined);
      const service = createWatermarkService(mockRepository);
      await service.removeWatermark('doc-1', 'wm-1', 'user-1');
      expect(mockRepository.removeWatermark).toHaveBeenCalledWith('doc-1', 'wm-1');
    });
  });

  describe('getWatermarkConfig', () => {
    it('should return watermark configuration', async () => {
      const config = { defaultPosition: 'bottom-right', defaultOpacity: 0.3 };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createWatermarkService(mockRepository);
      const result = await service.getWatermarkConfig('school-1', 'user-1');
      expect(result).toEqual(config);
      expect(mockRepository.getWatermarkConfig).toHaveBeenCalledWith('school-1');
    });
  });

  describe('updateWatermarkConfig', () => {
    it('should update watermark configuration', async () => {
      const config = { defaultOpacity: 0.7 };
      mockRepository.updateWatermarkConfig.mockResolvedValue(config);
      const service = createWatermarkService(mockRepository);
      const result = await service.updateWatermarkConfig('school-1', 'user-1', config);
      expect(result).toEqual(config);
      expect(mockRepository.updateWatermarkConfig).toHaveBeenCalledWith('school-1', config);
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing documentId for getWatermarks', async () => {
      const service = createWatermarkService(mockRepository);
      await expect(service.getWatermarks('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw on missing documentId for applyWatermark', async () => {
      const service = createWatermarkService(mockRepository);
      await expect(service.applyWatermark('', 'wm-1', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw on missing watermarkId for applyWatermark', async () => {
      const service = createWatermarkService(mockRepository);
      await expect(service.applyWatermark('doc-1', '', 'user-1')).rejects.toThrow('watermarkId is required');
    });

    it('should throw on missing documentId for removeWatermark', async () => {
      const service = createWatermarkService(mockRepository);
      await expect(service.removeWatermark('', 'wm-1', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw on missing schoolId for getWatermarkConfig', async () => {
      const service = createWatermarkService(mockRepository);
      await expect(service.getWatermarkConfig('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in getWatermarks', async () => {
      mockRepository.getWatermarks.mockRejectedValue(new Error('DB error'));
      const service = createWatermarkService(mockRepository);
      await expect(service.getWatermarks('doc-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should handle repository errors in applyWatermark', async () => {
      mockRepository.applyWatermark.mockRejectedValue(new Error('Apply failed'));
      const service = createWatermarkService(mockRepository);
      await expect(service.applyWatermark('doc-1', 'wm-1', 'user-1')).rejects.toThrow('Apply failed');
    });

    it('should handle repository errors in removeWatermark', async () => {
      mockRepository.removeWatermark.mockRejectedValue(new Error('Remove failed'));
      const service = createWatermarkService(mockRepository);
      await expect(service.removeWatermark('doc-1', 'wm-1', 'user-1')).rejects.toThrow('Remove failed');
    });

    it('should handle repository errors in getWatermarkConfig', async () => {
      mockRepository.getWatermarkConfig.mockRejectedValue(new Error('Query failed'));
      const service = createWatermarkService(mockRepository);
      await expect(service.getWatermarkConfig('school-1', 'user-1')).rejects.toThrow('Query failed');
    });

    it('should handle repository errors in updateWatermarkConfig', async () => {
      mockRepository.updateWatermarkConfig.mockRejectedValue(new Error('Update config failed'));
      const service = createWatermarkService(mockRepository);
      await expect(service.updateWatermarkConfig('school-1', 'user-1', { opacity: 0.5 })).rejects.toThrow('Update config failed');
    });
  });
});
