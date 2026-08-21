import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMetadataService } from '../../src/features/documents/services/metadata.service';

describe('MetadataService', () => {
  const mockRepository = {
    getFileMetadata: vi.fn(),
    getFileChecksum: vi.fn(),
    getStorageBreakdown: vi.fn(),
    getStorageStats: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';
  const documentId = 'doc-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create service with all methods', () => {
    const service = createMetadataService(mockRepository as any);
    expect(service.getFileMetadata).toBeDefined();
    expect(service.getFileChecksum).toBeDefined();
    expect(service.getStorageBreakdown).toBeDefined();
  });

  describe('getFileMetadata', () => {
    it('should return file metadata', async () => {
      const metadata = { id: documentId, size: 1024, mimeType: 'application/pdf', name: 'doc.pdf' };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getFileMetadata(documentId, schoolId, userId);
      expect(result.size).toBe(1024);
    });

    it('should throw when metadata not found', async () => {
      mockRepository.getFileMetadata.mockResolvedValue(null);
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileMetadata(documentId, schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing documentId', async () => {
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileMetadata('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileMetadata(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileMetadata(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getFileMetadata.mockRejectedValue(new Error('Metadata fetch failed'));
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileMetadata(documentId, schoolId, userId)).rejects.toThrow('Metadata fetch failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getFileMetadata.mockResolvedValue({ id: documentId });
      const service = createMetadataService(mockRepository as any);
      await service.getFileMetadata(documentId, schoolId, userId);
      expect(mockRepository.getFileMetadata).toHaveBeenCalledWith(documentId);
    });

    it('should return metadata with all properties', async () => {
      const metadata = { id: documentId, size: 2048, mimeType: 'image/png', name: 'image.png', checksum: 'abc123' };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getFileMetadata(documentId, schoolId, userId);
      expect(result.checksum).toBe('abc123');
    });

    it('should handle large files', async () => {
      const metadata = { id: documentId, size: 1024 * 1024 * 100 };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getFileMetadata(documentId, schoolId, userId);
      expect(result.size).toBe(1024 * 1024 * 100);
    });

    it('should handle zero size files', async () => {
      const metadata = { id: documentId, size: 0 };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getFileMetadata(documentId, schoolId, userId);
      expect(result.size).toBe(0);
    });
  });

  describe('getFileChecksum', () => {
    it('should return file checksum', async () => {
      const checksum = { hash: 'abc123def456', algorithm: 'sha256' };
      mockRepository.getFileChecksum.mockResolvedValue(checksum);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getFileChecksum(documentId, schoolId, userId);
      expect(result.hash).toBe('abc123def456');
    });

    it('should throw on missing documentId', async () => {
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileChecksum('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileChecksum(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileChecksum(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getFileChecksum.mockRejectedValue(new Error('Checksum computation failed'));
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileChecksum(documentId, schoolId, userId)).rejects.toThrow('Checksum computation failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getFileChecksum.mockResolvedValue({ hash: 'abc' });
      const service = createMetadataService(mockRepository as any);
      await service.getFileChecksum(documentId, schoolId, userId);
      expect(mockRepository.getFileChecksum).toHaveBeenCalledWith(documentId);
    });

    it('should return checksum with algorithm', async () => {
      const checksum = { hash: 'abc123', algorithm: 'md5' };
      mockRepository.getFileChecksum.mockResolvedValue(checksum);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getFileChecksum(documentId, schoolId, userId);
      expect(result.algorithm).toBe('md5');
    });

    it('should handle different hash algorithms', async () => {
      const checksum = { hash: 'sha512hash', algorithm: 'sha512' };
      mockRepository.getFileChecksum.mockResolvedValue(checksum);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getFileChecksum(documentId, schoolId, userId);
      expect(result.algorithm).toBe('sha512');
    });

    it('should handle empty checksum', async () => {
      const checksum = { hash: '', algorithm: 'sha256' };
      mockRepository.getFileChecksum.mockResolvedValue(checksum);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getFileChecksum(documentId, schoolId, userId);
      expect(result.hash).toBe('');
    });

    it('should handle network errors', async () => {
      mockRepository.getFileChecksum.mockRejectedValue(new Error('Network timeout'));
      const service = createMetadataService(mockRepository as any);
      await expect(service.getFileChecksum(documentId, schoolId, userId)).rejects.toThrow('Network timeout');
    });
  });

  describe('getStorageBreakdown', () => {
    it('should return storage breakdown', async () => {
      const breakdown = { documents: 2.5, images: 1.5, videos: 1.0, other: 0.5 };
      mockRepository.getStorageBreakdown.mockResolvedValue(breakdown);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getStorageBreakdown(schoolId, userId);
      expect(result.documents).toBe(2.5);
    });

    it('should throw on missing schoolId', async () => {
      const service = createMetadataService(mockRepository as any);
      await expect(service.getStorageBreakdown('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createMetadataService(mockRepository as any);
      await expect(service.getStorageBreakdown(schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getStorageBreakdown.mockRejectedValue(new Error('Breakdown unavailable'));
      const service = createMetadataService(mockRepository as any);
      await expect(service.getStorageBreakdown(schoolId, userId)).rejects.toThrow('Breakdown unavailable');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getStorageBreakdown.mockResolvedValue({});
      const service = createMetadataService(mockRepository as any);
      await service.getStorageBreakdown(schoolId, userId);
      expect(mockRepository.getStorageBreakdown).toHaveBeenCalledWith(schoolId);
    });

    it('should return breakdown with all categories', async () => {
      const breakdown = { documents: 1, images: 2, videos: 3, other: 4, total: 10 };
      mockRepository.getStorageBreakdown.mockResolvedValue(breakdown);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getStorageBreakdown(schoolId, userId);
      expect(result.total).toBe(10);
    });

    it('should handle empty storage', async () => {
      const breakdown = { documents: 0, images: 0, videos: 0, other: 0 };
      mockRepository.getStorageBreakdown.mockResolvedValue(breakdown);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getStorageBreakdown(schoolId, userId);
      expect(result.documents).toBe(0);
    });

    it('should include file counts in breakdown', async () => {
      const breakdown = { documents: 5, images: 3, totalFiles: 150, totalSize: 25 * 1024 * 1024 };
      mockRepository.getStorageBreakdown.mockResolvedValue(breakdown);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getStorageBreakdown(schoolId, userId);
      expect(result.totalFiles).toBe(150);
    });

    it('should handle single category breakdown', async () => {
      const breakdown = { documents: 10, images: 0, videos: 0, other: 0 };
      mockRepository.getStorageBreakdown.mockResolvedValue(breakdown);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getStorageBreakdown(schoolId, userId);
      expect(result.documents).toBe(10);
    });

    it('should handle overflow storage', async () => {
      const breakdown = { documents: 100, images: 50, videos: 200, other: 50 };
      mockRepository.getStorageBreakdown.mockResolvedValue(breakdown);
      const service = createMetadataService(mockRepository as any);
      const result = await service.getStorageBreakdown(schoolId, userId);
      expect(result.videos).toBe(200);
    });

    it('should handle database errors', async () => {
      mockRepository.getStorageBreakdown.mockRejectedValue(new Error('Database connection lost'));
      const service = createMetadataService(mockRepository as any);
      await expect(service.getStorageBreakdown(schoolId, userId)).rejects.toThrow('Database connection lost');
    });
  });
});
