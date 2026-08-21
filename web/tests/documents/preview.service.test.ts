import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPreviewService } from '../../src/features/documents/services/preview.service';

describe('PreviewService', () => {
  const mockRepository = {
    getDocuments: vi.fn(),
    getDocument: vi.fn(),
    convertDocument: vi.fn(),
    getWatermarkConfig: vi.fn(),
    updateWatermarkConfig: vi.fn(),
    getDocumentTimeline: vi.fn(),
    getDocumentStats: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';
  const documentId = 'doc-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create service with all methods', () => {
    const service = createPreviewService(mockRepository as any);
    expect(service.getDocumentPreview).toBeDefined();
    expect(service.generatePreview).toBeDefined();
    expect(service.getPreviewConfig).toBeDefined();
    expect(service.updatePreviewConfig).toBeDefined();
    expect(service.getPreviewHistory).toBeDefined();
    expect(service.getPreviewStats).toBeDefined();
  });

  describe('getDocumentPreview', () => {
    it('should return document preview', async () => {
      const doc = { id: documentId, name: 'doc.pdf', previewUrl: '/preview/doc-1' };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getDocumentPreview(documentId, schoolId, userId);
      expect(result.id).toBe(documentId);
    });

    it('should throw when document not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createPreviewService(mockRepository as any);
      await expect(service.getDocumentPreview(documentId, schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing documentId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.getDocumentPreview('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.getDocumentPreview(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.getDocumentPreview(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Preview failed'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.getDocumentPreview(documentId, schoolId, userId)).rejects.toThrow('Preview failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      const service = createPreviewService(mockRepository as any);
      await service.getDocumentPreview(documentId, schoolId, userId);
      expect(mockRepository.getDocument).toHaveBeenCalledWith(documentId);
    });

    it('should return document with preview URL', async () => {
      const doc = { id: documentId, previewUrl: '/preview/doc-1' };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getDocumentPreview(documentId, schoolId, userId);
      expect(result.previewUrl).toBeDefined();
    });

    it('should handle documents without preview', async () => {
      const doc = { id: documentId, previewUrl: null };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getDocumentPreview(documentId, schoolId, userId);
      expect(result.previewUrl).toBeNull();
    });

    it('should handle permission errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Permission denied'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.getDocumentPreview(documentId, schoolId, userId)).rejects.toThrow('Permission denied');
    });
  });

  describe('generatePreview', () => {
    it('should generate preview with default format', async () => {
      const doc = { id: documentId };
      mockRepository.getDocument.mockResolvedValue(doc);
      mockRepository.convertDocument.mockResolvedValue({ previewUrl: '/preview/doc-1.pdf' });
      const service = createPreviewService(mockRepository as any);
      const result = await service.generatePreview(documentId, schoolId);
      expect(result.previewUrl).toContain('/preview/');
    });

    it('should throw when document not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createPreviewService(mockRepository as any);
      await expect(service.generatePreview(documentId, schoolId)).rejects.toThrow();
    });

    it('should throw on missing documentId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.generatePreview('', schoolId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.generatePreview(documentId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Generation failed'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.generatePreview(documentId, schoolId)).rejects.toThrow('Generation failed');
    });

    it('should call convertDocument with default format', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      mockRepository.convertDocument.mockResolvedValue({ previewUrl: '/preview/doc-1.pdf' });
      const service = createPreviewService(mockRepository as any);
      await service.generatePreview(documentId, schoolId);
      expect(mockRepository.convertDocument).toHaveBeenCalledWith(documentId, schoolId, 'pdf');
    });

    it('should handle different preview formats', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      mockRepository.convertDocument.mockResolvedValue({ previewUrl: '/preview/doc-1.png' });
      const service = createPreviewService(mockRepository as any);
      const result = await service.generatePreview(documentId, schoolId, { format: 'png' });
      expect(result.previewUrl).toContain('/preview/');
    });

    it('should handle conversion errors', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      mockRepository.convertDocument.mockRejectedValue(new Error('Conversion failed'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.generatePreview(documentId, schoolId)).rejects.toThrow('Conversion failed');
    });

    it('should handle unsupported format', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      mockRepository.convertDocument.mockRejectedValue(new Error('Unsupported format'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.generatePreview(documentId, schoolId, { format: 'xyz' })).rejects.toThrow('Unsupported format');
    });

    it('should handle large document preview', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId, size: 100 * 1024 * 1024 });
      mockRepository.convertDocument.mockResolvedValue({ previewUrl: '/preview/doc-1.pdf' });
      const service = createPreviewService(mockRepository as any);
      const result = await service.generatePreview(documentId, schoolId);
      expect(result.previewUrl).toBeDefined();
    });
  });

  describe('getPreviewConfig', () => {
    it('should return preview config', async () => {
      const config = { quality: 'high', format: 'pdf' };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewConfig(schoolId, userId);
      expect(result.quality).toBe('high');
    });

    it('should throw on missing schoolId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewConfig('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewConfig(schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getWatermarkConfig.mockRejectedValue(new Error('Config error'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewConfig(schoolId, userId)).rejects.toThrow('Config error');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getWatermarkConfig.mockResolvedValue({});
      const service = createPreviewService(mockRepository as any);
      await service.getPreviewConfig(schoolId, userId);
      expect(mockRepository.getWatermarkConfig).toHaveBeenCalledWith(schoolId);
    });

    it('should return config with all fields', async () => {
      const config = { quality: 'medium', format: 'pdf', maxPages: 100 };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewConfig(schoolId, userId);
      expect(result.maxPages).toBe(100);
    });

    it('should handle default config', async () => {
      const config = { quality: 'low' };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewConfig(schoolId, userId);
      expect(result.quality).toBe('low');
    });

    it('should handle config not found', async () => {
      mockRepository.getWatermarkConfig.mockRejectedValue(new Error('Config not found'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewConfig(schoolId, userId)).rejects.toThrow('Config not found');
    });

    it('should handle network timeout', async () => {
      mockRepository.getWatermarkConfig.mockRejectedValue(new Error('Network timeout'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewConfig(schoolId, userId)).rejects.toThrow('Network timeout');
    });

    it('should return empty config', async () => {
      mockRepository.getWatermarkConfig.mockResolvedValue({});
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewConfig(schoolId, userId);
      expect(Object.keys(result)).toHaveLength(0);
    });
  });

  describe('updatePreviewConfig', () => {
    it('should update preview config', async () => {
      const data = { quality: 'medium' };
      mockRepository.updateWatermarkConfig.mockResolvedValue(data);
      const service = createPreviewService(mockRepository as any);
      const result = await service.updatePreviewConfig(schoolId, userId, data);
      expect(result.quality).toBe('medium');
    });

    it('should throw on missing schoolId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.updatePreviewConfig('', userId, { quality: 'high' })).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.updatePreviewConfig(schoolId, '', { quality: 'high' })).rejects.toThrow();
    });

    it('should throw on missing data', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.updatePreviewConfig(schoolId, userId, null as any)).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.updateWatermarkConfig.mockRejectedValue(new Error('Update failed'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.updatePreviewConfig(schoolId, userId, { quality: 'high' })).rejects.toThrow('Update failed');
    });

    it('should call repository with schoolId and data', async () => {
      mockRepository.updateWatermarkConfig.mockResolvedValue({});
      const service = createPreviewService(mockRepository as any);
      const data = { quality: 'high' };
      await service.updatePreviewConfig(schoolId, userId, data);
      expect(mockRepository.updateWatermarkConfig).toHaveBeenCalledWith(schoolId, data);
    });

    it('should return updated config', async () => {
      const data = { quality: 'low', format: 'jpg' };
      mockRepository.updateWatermarkConfig.mockResolvedValue(data);
      const service = createPreviewService(mockRepository as any);
      const result = await service.updatePreviewConfig(schoolId, userId, { quality: 'low' });
      expect(result.format).toBe('jpg');
    });

    it('should handle partial updates', async () => {
      const data = { maxPages: 50 };
      mockRepository.updateWatermarkConfig.mockResolvedValue(data);
      const service = createPreviewService(mockRepository as any);
      const result = await service.updatePreviewConfig(schoolId, userId, { maxPages: 50 });
      expect(result.maxPages).toBe(50);
    });

    it('should handle permission errors', async () => {
      mockRepository.updateWatermarkConfig.mockRejectedValue(new Error('Permission denied'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.updatePreviewConfig(schoolId, userId, { quality: 'high' })).rejects.toThrow('Permission denied');
    });

    it('should handle empty data object', async () => {
      mockRepository.updateWatermarkConfig.mockResolvedValue({});
      const service = createPreviewService(mockRepository as any);
      const result = await service.updatePreviewConfig(schoolId, userId, {});
      expect(Object.keys(result)).toHaveLength(0);
    });
  });

  describe('getPreviewHistory', () => {
    it('should return preview history', async () => {
      const history = [{ id: 'h1', action: 'preview', date: '2026-01-01' }];
      mockRepository.getDocumentTimeline.mockResolvedValue(history);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewHistory(documentId, userId);
      expect(result).toHaveLength(1);
    });

    it('should throw on missing documentId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewHistory('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewHistory(documentId, '')).rejects.toThrow();
    });

    it('should return empty array when no history', async () => {
      mockRepository.getDocumentTimeline.mockResolvedValue([]);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewHistory(documentId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocumentTimeline.mockRejectedValue(new Error('Timeline failed'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewHistory(documentId, userId)).rejects.toThrow('Timeline failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getDocumentTimeline.mockResolvedValue([]);
      const service = createPreviewService(mockRepository as any);
      await service.getPreviewHistory(documentId, userId);
      expect(mockRepository.getDocumentTimeline).toHaveBeenCalledWith(documentId);
    });

    it('should return history with timestamps', async () => {
      const history = [{ id: 'h1', action: 'preview', timestamp: '2026-01-01T10:00:00Z' }];
      mockRepository.getDocumentTimeline.mockResolvedValue(history);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewHistory(documentId, userId);
      expect(result[0].timestamp).toBeDefined();
    });

    it('should handle many history entries', async () => {
      const history = Array.from({ length: 50 }, (_, i) => ({ id: `h${i}` }));
      mockRepository.getDocumentTimeline.mockResolvedValue(history);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewHistory(documentId, userId);
      expect(result).toHaveLength(50);
    });

    it('should handle different action types', async () => {
      const history = [{ id: 'h1', action: 'preview' }, { id: 'h2', action: 'download' }];
      mockRepository.getDocumentTimeline.mockResolvedValue(history);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewHistory(documentId, userId);
      expect(result).toHaveLength(2);
    });

    it('should handle network error', async () => {
      mockRepository.getDocumentTimeline.mockRejectedValue(new Error('Network error'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewHistory(documentId, userId)).rejects.toThrow('Network error');
    });
  });

  describe('getPreviewStats', () => {
    it('should return preview stats', async () => {
      const stats = { totalPreviews: 100, uniqueDocuments: 50 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewStats(schoolId, userId);
      expect(result.totalPreviews).toBe(100);
    });

    it('should throw on missing schoolId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewStats('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewStats(schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Stats error'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewStats(schoolId, userId)).rejects.toThrow('Stats error');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getDocumentStats.mockResolvedValue({});
      const service = createPreviewService(mockRepository as any);
      await service.getPreviewStats(schoolId, userId);
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith(schoolId, undefined, undefined);
    });

    it('should return stats with date range', async () => {
      const stats = { totalPreviews: 50, dateFrom: '2026-01-01', dateTo: '2026-01-31' };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewStats(schoolId, userId, '2026-01-01', '2026-01-31');
      expect(result.dateFrom).toBe('2026-01-01');
    });

    it('should handle zero stats', async () => {
      mockRepository.getDocumentStats.mockResolvedValue({ totalPreviews: 0 });
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewStats(schoolId, userId);
      expect(result.totalPreviews).toBe(0);
    });

    it('should handle stats with top documents', async () => {
      const stats = { totalPreviews: 100, topDocuments: [{ id: 'd1', previews: 20 }] };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewStats(schoolId, userId);
      expect(result.topDocuments).toHaveLength(1);
    });

    it('should handle database error', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Database error'));
      const service = createPreviewService(mockRepository as any);
      await expect(service.getPreviewStats(schoolId, userId)).rejects.toThrow('Database error');
    });

    it('should handle stats with trends', async () => {
      const stats = { totalPreviews: 100, trend: { daily: 10, weekly: 70 } };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createPreviewService(mockRepository as any);
      const result = await service.getPreviewStats(schoolId, userId);
      expect(result.trend.daily).toBe(10);
    });
  });
});
