import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createThumbnailService } from '../../src/features/documents/services/thumbnail.service';

describe('ThumbnailService', () => {
  const mockRepository = {
    getDocuments: vi.fn(),
    getDocument: vi.fn(),
    deleteDocument: vi.fn(),
    getFileMetadata: vi.fn(),
    getWatermarkConfig: vi.fn(),
    updateWatermarkConfig: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';
  const documentId = 'doc-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create service with all methods', () => {
    const service = createThumbnailService(mockRepository as any);
    expect(service.generateThumbnail).toBeDefined();
    expect(service.getThumbnail).toBeDefined();
    expect(service.deleteThumbnail).toBeDefined();
    expect(service.getThumbnails).toBeDefined();
    expect(service.regenerateThumbnail).toBeDefined();
    expect(service.getThumbnailConfig).toBeDefined();
    expect(service.updateThumbnailConfig).toBeDefined();
  });

  describe('generateThumbnail', () => {
    it('should generate thumbnail for document', async () => {
      const metadata = { id: documentId, thumbnailUrl: '/thumbs/doc-1.png' };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.generateThumbnail(documentId, schoolId, userId);
      expect(result.id).toBe(documentId);
    });

    it('should throw on missing documentId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.generateThumbnail('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.generateThumbnail(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.generateThumbnail(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getFileMetadata.mockRejectedValue(new Error('Thumbnail generation failed'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.generateThumbnail(documentId, schoolId, userId)).rejects.toThrow('Thumbnail generation failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getFileMetadata.mockResolvedValue({ id: documentId });
      const service = createThumbnailService(mockRepository as any);
      await service.generateThumbnail(documentId, schoolId, userId);
      expect(mockRepository.getFileMetadata).toHaveBeenCalledWith(documentId);
    });

    it('should return thumbnail metadata', async () => {
      const metadata = { id: documentId, width: 200, height: 200, format: 'png' };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.generateThumbnail(documentId, schoolId, userId);
      expect(result.width).toBe(200);
    });

    it('should handle large documents', async () => {
      const metadata = { id: documentId, size: 50 * 1024 * 1024 };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.generateThumbnail(documentId, schoolId, userId);
      expect(result.size).toBe(50 * 1024 * 1024);
    });
  });

  describe('getThumbnail', () => {
    it('should return thumbnail for document', async () => {
      const doc = { id: documentId, thumbnailUrl: '/thumbs/doc-1.png' };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnail(documentId, schoolId, userId);
      expect(result.id).toBe(documentId);
    });

    it('should throw when document not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnail(documentId, schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing documentId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnail('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnail(documentId, '', userId)).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('DB error'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnail(documentId, schoolId, userId)).rejects.toThrow('DB error');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      const service = createThumbnailService(mockRepository as any);
      await service.getThumbnail(documentId, schoolId, userId);
      expect(mockRepository.getDocument).toHaveBeenCalledWith(documentId);
    });

    it('should return thumbnail with URL', async () => {
      const doc = { id: documentId, thumbnailUrl: '/thumbs/doc-1.png' };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnail(documentId, schoolId, userId);
      expect(result.thumbnailUrl).toBeDefined();
    });

    it('should handle documents without thumbnails', async () => {
      const doc = { id: documentId, thumbnailUrl: null };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnail(documentId, schoolId, userId);
      expect(result.thumbnailUrl).toBeNull();
    });
  });

  describe('deleteThumbnail', () => {
    it('should delete thumbnail', async () => {
      mockRepository.deleteDocument.mockResolvedValue(undefined);
      const service = createThumbnailService(mockRepository as any);
      await service.deleteThumbnail(documentId, schoolId, userId);
      expect(mockRepository.deleteDocument).toHaveBeenCalledWith(documentId);
    });

    it('should throw on missing documentId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.deleteThumbnail('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.deleteThumbnail(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.deleteThumbnail(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.deleteDocument.mockRejectedValue(new Error('Delete failed'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.deleteThumbnail(documentId, schoolId, userId)).rejects.toThrow('Delete failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.deleteDocument.mockResolvedValue(undefined);
      const service = createThumbnailService(mockRepository as any);
      await service.deleteThumbnail(documentId, schoolId, userId);
      expect(mockRepository.deleteDocument).toHaveBeenCalledWith(documentId);
    });

    it('should handle non-existent thumbnail', async () => {
      mockRepository.deleteDocument.mockRejectedValue(new Error('Thumbnail not found'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.deleteThumbnail(documentId, schoolId, userId)).rejects.toThrow('Thumbnail not found');
    });

    it('should handle permission errors', async () => {
      mockRepository.deleteDocument.mockRejectedValue(new Error('Permission denied'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.deleteThumbnail(documentId, schoolId, userId)).rejects.toThrow('Permission denied');
    });
  });

  describe('getThumbnails', () => {
    it('should return thumbnails list', async () => {
      const docs = [{ id: 'd1' }, { id: 'd2' }];
      mockRepository.getDocuments.mockResolvedValue(docs);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnails(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnails('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnails(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no thumbnails', async () => {
      mockRepository.getDocuments.mockResolvedValue([]);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnails(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocuments.mockRejectedValue(new Error('Fetch failed'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnails(schoolId, userId)).rejects.toThrow('Fetch failed');
    });

    it('should pass schoolId to repository', async () => {
      mockRepository.getDocuments.mockResolvedValue([]);
      const service = createThumbnailService(mockRepository as any);
      await service.getThumbnails(schoolId, userId);
      expect(mockRepository.getDocuments).toHaveBeenCalledWith(schoolId);
    });

    it('should return thumbnails with metadata', async () => {
      const docs = [{ id: 'd1', thumbnailUrl: '/thumbs/d1.png', name: 'doc1.pdf' }];
      mockRepository.getDocuments.mockResolvedValue(docs);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnails(schoolId, userId);
      expect(result[0].name).toBe('doc1.pdf');
    });

    it('should handle many thumbnails', async () => {
      const docs = Array.from({ length: 50 }, (_, i) => ({ id: `d${i}` }));
      mockRepository.getDocuments.mockResolvedValue(docs);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnails(schoolId, userId);
      expect(result).toHaveLength(50);
    });
  });

  describe('regenerateThumbnail', () => {
    it('should regenerate thumbnail for document', async () => {
      const metadata = { id: documentId, thumbnailUrl: '/thumbs/doc-1-new.png' };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.regenerateThumbnail(documentId, schoolId, userId);
      expect(result.id).toBe(documentId);
    });

    it('should throw on missing documentId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.regenerateThumbnail('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.regenerateThumbnail(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.regenerateThumbnail(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getFileMetadata.mockRejectedValue(new Error('Regeneration failed'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.regenerateThumbnail(documentId, schoolId, userId)).rejects.toThrow('Regeneration failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getFileMetadata.mockResolvedValue({ id: documentId });
      const service = createThumbnailService(mockRepository as any);
      await service.regenerateThumbnail(documentId, schoolId, userId);
      expect(mockRepository.getFileMetadata).toHaveBeenCalledWith(documentId);
    });

    it('should return updated thumbnail', async () => {
      const metadata = { id: documentId, thumbnailUrl: '/thumbs/doc-1-v2.png', version: 2 };
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.regenerateThumbnail(documentId, schoolId, userId);
      expect(result.version).toBe(2);
    });

    it('should handle concurrent regeneration', async () => {
      mockRepository.getFileMetadata.mockRejectedValue(new Error('Thumbnail being regenerated'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.regenerateThumbnail(documentId, schoolId, userId)).rejects.toThrow('Thumbnail being regenerated');
    });
  });

  describe('getThumbnailConfig', () => {
    it('should return thumbnail config', async () => {
      const config = { width: 200, height: 200, format: 'png' };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnailConfig(schoolId, userId);
      expect(result.width).toBe(200);
    });

    it('should throw on missing schoolId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnailConfig('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnailConfig(schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getWatermarkConfig.mockRejectedValue(new Error('Config not found'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.getThumbnailConfig(schoolId, userId)).rejects.toThrow('Config not found');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getWatermarkConfig.mockResolvedValue({});
      const service = createThumbnailService(mockRepository as any);
      await service.getThumbnailConfig(schoolId, userId);
      expect(mockRepository.getWatermarkConfig).toHaveBeenCalledWith(schoolId);
    });

    it('should return config with all fields', async () => {
      const config = { width: 200, height: 200, format: 'png', quality: 80 };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnailConfig(schoolId, userId);
      expect(result.quality).toBe(80);
    });

    it('should handle default config', async () => {
      const config = { width: 150, height: 150, format: 'jpg' };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.getThumbnailConfig(schoolId, userId);
      expect(result.format).toBe('jpg');
    });
  });

  describe('updateThumbnailConfig', () => {
    it('should update thumbnail config', async () => {
      const config = { width: 300, height: 300 };
      mockRepository.updateWatermarkConfig.mockResolvedValue(config);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.updateThumbnailConfig(schoolId, userId, config);
      expect(result.width).toBe(300);
    });

    it('should throw on missing schoolId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.updateThumbnailConfig('', userId, { width: 200 })).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.updateThumbnailConfig(schoolId, '', { width: 200 })).rejects.toThrow();
    });

    it('should throw on missing config', async () => {
      const service = createThumbnailService(mockRepository as any);
      await expect(service.updateThumbnailConfig(schoolId, userId, null as any)).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.updateWatermarkConfig.mockRejectedValue(new Error('Update failed'));
      const service = createThumbnailService(mockRepository as any);
      await expect(service.updateThumbnailConfig(schoolId, userId, { width: 200 })).rejects.toThrow('Update failed');
    });

    it('should call repository with schoolId and config', async () => {
      mockRepository.updateWatermarkConfig.mockResolvedValue({});
      const service = createThumbnailService(mockRepository as any);
      const config = { width: 300 };
      await service.updateThumbnailConfig(schoolId, userId, config);
      expect(mockRepository.updateWatermarkConfig).toHaveBeenCalledWith(schoolId, config);
    });

    it('should return updated config', async () => {
      const config = { width: 400, height: 400, format: 'webp' };
      mockRepository.updateWatermarkConfig.mockResolvedValue(config);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.updateThumbnailConfig(schoolId, userId, { width: 400 });
      expect(result.format).toBe('webp');
    });

    it('should handle partial config updates', async () => {
      const config = { width: 250 };
      mockRepository.updateWatermarkConfig.mockResolvedValue(config);
      const service = createThumbnailService(mockRepository as any);
      const result = await service.updateThumbnailConfig(schoolId, userId, { width: 250 });
      expect(result.width).toBe(250);
    });
  });
});
