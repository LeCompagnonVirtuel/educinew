import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createStorageService } from '../../src/features/documents/services/storage.service';

describe('StorageService', () => {
  let mockRepository: {
    getStorageUsage: ReturnType<typeof vi.fn>;
    getStorageQuota: ReturnType<typeof vi.fn>;
    updateStorageQuota: ReturnType<typeof vi.fn>;
    getFileMetadata: ReturnType<typeof vi.fn>;
    getFileChecksum: ReturnType<typeof vi.fn>;
    getStorageBreakdown: ReturnType<typeof vi.fn>;
    getStorageStats: ReturnType<typeof vi.fn>;
    getExternalStorageConfigs: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getStorageUsage: vi.fn(),
      getStorageQuota: vi.fn(),
      updateStorageQuota: vi.fn(),
      getFileMetadata: vi.fn(),
      getFileChecksum: vi.fn(),
      getStorageBreakdown: vi.fn(),
      getStorageStats: vi.fn(),
      getExternalStorageConfigs: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createStorageService(mockRepository as any);
    expect(service).toBeDefined();
    expect(service.getStorageUsage).toBeInstanceOf(Function);
    expect(service.getStorageQuota).toBeInstanceOf(Function);
    expect(service.updateStorageQuota).toBeInstanceOf(Function);
    expect(service.getFileMetadata).toBeInstanceOf(Function);
    expect(service.getFileChecksum).toBeInstanceOf(Function);
    expect(service.getStorageBreakdown).toBeInstanceOf(Function);
    expect(service.getStorageStats).toBeInstanceOf(Function);
    expect(service.getExternalStorageConfigs).toBeInstanceOf(Function);
  });

  describe('getStorageUsage', () => {
    it('should return storage usage', async () => {
      const usage = { used: 1024000, total: 5120000 };
      mockRepository.getStorageUsage.mockResolvedValue(usage);
      const service = createStorageService(mockRepository as any);
      const result = await service.getStorageUsage('school-1', 'user-1');
      expect(result).toEqual(usage);
      expect(mockRepository.getStorageUsage).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageUsage('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageUsage('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageUsage('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getStorageUsage.mockRejectedValue(new Error('DB error'));
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageUsage('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should not swallow errors', async () => {
      mockRepository.getStorageUsage.mockRejectedValue(new Error('Connection timeout'));
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageUsage('school-1', 'user-1')).rejects.toThrow('Connection timeout');
    });
  });

  describe('getStorageQuota', () => {
    it('should return storage quota', async () => {
      const quota = { maxStorage: 5120000, warningThreshold: 0.8 };
      mockRepository.getStorageQuota.mockResolvedValue(quota);
      const service = createStorageService(mockRepository as any);
      const result = await service.getStorageQuota('school-1', 'user-1');
      expect(result).toEqual(quota);
      expect(mockRepository.getStorageQuota).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageQuota('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageQuota('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageQuota('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getStorageQuota.mockRejectedValue(new Error('Quota query failed'));
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageQuota('school-1', 'user-1')).rejects.toThrow('Quota query failed');
    });
  });

  describe('updateStorageQuota', () => {
    it('should update storage quota', async () => {
      const data = { maxStorage: 10240000 };
      const updated = { id: 'q-1', ...data };
      mockRepository.updateStorageQuota.mockResolvedValue(updated);
      const service = createStorageService(mockRepository as any);
      const result = await service.updateStorageQuota('school-1', 'user-1', data);
      expect(result).toEqual(updated);
      expect(mockRepository.updateStorageQuota).toHaveBeenCalledWith('school-1', data);
    });

    it('should throw if schoolId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.updateStorageQuota('', 'user-1', { maxStorage: 1000 })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.updateStorageQuota('school-1', '', { maxStorage: 1000 })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.updateStorageQuota('school-1', 'user-1', null as any)).rejects.toThrow('maxStorage is required');
    });

    it('should throw if maxStorage missing from data', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.updateStorageQuota('school-1', 'user-1', {})).rejects.toThrow('maxStorage is required');
    });

    it('should throw if both schoolId and userId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.updateStorageQuota('', '', { maxStorage: 1000 })).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.updateStorageQuota.mockRejectedValue(new Error('Update failed'));
      const service = createStorageService(mockRepository as any);
      await expect(service.updateStorageQuota('school-1', 'user-1', { maxStorage: 1000 })).rejects.toThrow('Update failed');
    });
  });

  describe('getFileMetadata', () => {
    it('should return file metadata', async () => {
      const metadata = { id: 'file-1', size: 2048, mimeType: 'application/pdf' };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createStorageService(mockRepository as any);
      const result = await service.getFileMetadata('file-1', 'user-1');
      expect(result).toEqual(metadata);
      expect(mockRepository.getFileMetadata).toHaveBeenCalledWith('file-1');
    });

    it('should throw if fileId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getFileMetadata('', 'user-1')).rejects.toThrow('fileId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getFileMetadata('file-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getFileMetadata('', '')).rejects.toThrow('fileId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getFileMetadata.mockRejectedValue(new Error('File not found'));
      const service = createStorageService(mockRepository as any);
      await expect(service.getFileMetadata('file-1', 'user-1')).rejects.toThrow('File not found');
    });
  });

  describe('getFileChecksum', () => {
    it('should return file checksum', async () => {
      const checksum = { algorithm: 'sha256', hash: 'abc123def456' };
      mockRepository.getFileChecksum.mockResolvedValue(checksum);
      const service = createStorageService(mockRepository as any);
      const result = await service.getFileChecksum('file-1', 'user-1');
      expect(result).toEqual(checksum);
      expect(mockRepository.getFileChecksum).toHaveBeenCalledWith('file-1');
    });

    it('should throw if fileId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getFileChecksum('', 'user-1')).rejects.toThrow('fileId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getFileChecksum('file-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getFileChecksum('', '')).rejects.toThrow('fileId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getFileChecksum.mockRejectedValue(new Error('Checksum failed'));
      const service = createStorageService(mockRepository as any);
      await expect(service.getFileChecksum('file-1', 'user-1')).rejects.toThrow('Checksum failed');
    });
  });

  describe('getStorageBreakdown', () => {
    it('should return storage breakdown', async () => {
      const breakdown = { documents: 500000, images: 300000, other: 224000 };
      mockRepository.getStorageBreakdown.mockResolvedValue(breakdown);
      const service = createStorageService(mockRepository as any);
      const result = await service.getStorageBreakdown('school-1', 'user-1');
      expect(result).toEqual(breakdown);
      expect(mockRepository.getStorageBreakdown).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageBreakdown('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageBreakdown('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageBreakdown('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getStorageBreakdown.mockRejectedValue(new Error('Breakdown query failed'));
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageBreakdown('school-1', 'user-1')).rejects.toThrow('Breakdown query failed');
    });
  });

  describe('getStorageStats', () => {
    it('should return storage stats', async () => {
      const stats = { totalFiles: 150, totalSize: 1024000 };
      mockRepository.getStorageStats.mockResolvedValue(stats);
      const service = createStorageService(mockRepository as any);
      const result = await service.getStorageStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getStorageStats).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageStats('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageStats('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getStorageStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createStorageService(mockRepository as any);
      await expect(service.getStorageStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });

  describe('getExternalStorageConfigs', () => {
    it('should return external storage configs', async () => {
      const configs = [{ id: 'es-1', provider: 's3', bucket: 'my-bucket' }];
      mockRepository.getExternalStorageConfigs.mockResolvedValue(configs);
      const service = createStorageService(mockRepository as any);
      const result = await service.getExternalStorageConfigs('school-1', 'user-1');
      expect(result).toEqual(configs);
      expect(mockRepository.getExternalStorageConfigs).toHaveBeenCalledWith('school-1');
    });

    it('should return empty list when no configs', async () => {
      mockRepository.getExternalStorageConfigs.mockResolvedValue([]);
      const service = createStorageService(mockRepository as any);
      const result = await service.getExternalStorageConfigs('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should return multiple configs', async () => {
      mockRepository.getExternalStorageConfigs.mockResolvedValue([{ id: 'es-1' }, { id: 'es-2' }]);
      const service = createStorageService(mockRepository as any);
      const result = await service.getExternalStorageConfigs('school-1', 'user-1');
      expect(result).toHaveLength(2);
    });

    it('should throw if schoolId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getExternalStorageConfigs('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getExternalStorageConfigs('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createStorageService(mockRepository as any);
      await expect(service.getExternalStorageConfigs('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getExternalStorageConfigs.mockRejectedValue(new Error('Query failed'));
      const service = createStorageService(mockRepository as any);
      await expect(service.getExternalStorageConfigs('school-1', 'user-1')).rejects.toThrow('Query failed');
    });

    it('should not swallow errors', async () => {
      mockRepository.getExternalStorageConfigs.mockRejectedValue(new Error('Connection refused'));
      const service = createStorageService(mockRepository as any);
      await expect(service.getExternalStorageConfigs('school-1', 'user-1')).rejects.toThrow('Connection refused');
    });
  });

  describe('method existence', () => {
    it('should have all 8 methods defined', () => {
      const service = createStorageService(mockRepository as any);
      const methods = ['getStorageUsage', 'getStorageQuota', 'updateStorageQuota', 'getFileMetadata', 'getFileChecksum', 'getStorageBreakdown', 'getStorageStats', 'getExternalStorageConfigs'];
      methods.forEach((method) => {
        expect(service[method as keyof typeof service]).toBeDefined();
      });
    });

    it('should return object with correct shape', () => {
      const service = createStorageService(mockRepository as any);
      expect(Object.keys(service)).toHaveLength(8);
    });
  });
});
