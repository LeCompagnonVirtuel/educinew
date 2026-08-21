import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAnalyticsService } from '../../src/features/documents/services/analytics.service';

describe('AnalyticsService', () => {
  let mockRepository: {
    getAnalytics: ReturnType<typeof vi.fn>;
    getDocumentAnalytics: ReturnType<typeof vi.fn>;
    trackDocumentView: ReturnType<typeof vi.fn>;
    trackDocumentDownload: ReturnType<typeof vi.fn>;
    getTopDocuments: ReturnType<typeof vi.fn>;
    getUsageStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getAnalytics: vi.fn(),
      getDocumentAnalytics: vi.fn(),
      trackDocumentView: vi.fn(),
      trackDocumentDownload: vi.fn(),
      getTopDocuments: vi.fn(),
      getUsageStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAnalyticsService(mockRepository as any);
    expect(service).toBeDefined();
    expect(service.getAnalytics).toBeInstanceOf(Function);
    expect(service.getDocumentAnalytics).toBeInstanceOf(Function);
    expect(service.trackDocumentView).toBeInstanceOf(Function);
    expect(service.trackDocumentDownload).toBeInstanceOf(Function);
    expect(service.getTopDocuments).toBeInstanceOf(Function);
    expect(service.getUsageStats).toBeInstanceOf(Function);
  });

  describe('getAnalytics', () => {
    it('should return analytics', async () => {
      const analytics = { totalViews: 500, totalDownloads: 120 };
      mockRepository.getAnalytics.mockResolvedValue(analytics);
      const service = createAnalyticsService(mockRepository as any);
      const result = await service.getAnalytics('school-1', 'user-1');
      expect(result).toEqual(analytics);
      expect(mockRepository.getAnalytics).toHaveBeenCalledWith('school-1');
    });

    it('should accept optional filters', async () => {
      mockRepository.getAnalytics.mockResolvedValue({ totalViews: 10 });
      const service = createAnalyticsService(mockRepository as any);
      await service.getAnalytics('school-1', 'user-1', { dateFrom: '2024-01-01' });
      expect(mockRepository.getAnalytics).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getAnalytics('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getAnalytics('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getAnalytics('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getAnalytics.mockRejectedValue(new Error('DB error'));
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getAnalytics('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should not swallow errors', async () => {
      mockRepository.getAnalytics.mockRejectedValue(new Error('Connection timeout'));
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getAnalytics('school-1', 'user-1')).rejects.toThrow('Connection timeout');
    });
  });

  describe('getDocumentAnalytics', () => {
    it('should return document analytics', async () => {
      const analytics = { views: 42, downloads: 12, lastViewed: '2024-01-15' };
      mockRepository.getDocumentAnalytics.mockResolvedValue(analytics);
      const service = createAnalyticsService(mockRepository as any);
      const result = await service.getDocumentAnalytics('doc-1', 'school-1', 'user-1');
      expect(result).toEqual(analytics);
      expect(mockRepository.getDocumentAnalytics).toHaveBeenCalledWith('doc-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getDocumentAnalytics('', 'school-1', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getDocumentAnalytics('doc-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getDocumentAnalytics('doc-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if all params missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getDocumentAnalytics('', '', '')).rejects.toThrow('documentId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocumentAnalytics.mockRejectedValue(new Error('Analytics failed'));
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getDocumentAnalytics('doc-1', 'school-1', 'user-1')).rejects.toThrow('Analytics failed');
    });
  });

  describe('trackDocumentView', () => {
    it('should track document view', async () => {
      const event = { documentId: 'doc-1', userId: 'user-1', timestamp: '2024-01-15T10:00:00Z' };
      mockRepository.trackDocumentView.mockResolvedValue(event);
      const service = createAnalyticsService(mockRepository as any);
      const result = await service.trackDocumentView('doc-1', 'school-1', 'user-1');
      expect(result).toEqual(event);
      expect(mockRepository.trackDocumentView).toHaveBeenCalledWith('doc-1', 'user-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentView('', 'school-1', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentView('doc-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentView('doc-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if all params missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentView('', '', '')).rejects.toThrow('documentId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.trackDocumentView.mockRejectedValue(new Error('Track failed'));
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentView('doc-1', 'school-1', 'user-1')).rejects.toThrow('Track failed');
    });
  });

  describe('trackDocumentDownload', () => {
    it('should track document download', async () => {
      const event = { documentId: 'doc-1', userId: 'user-1', timestamp: '2024-01-15T10:05:00Z' };
      mockRepository.trackDocumentDownload.mockResolvedValue(event);
      const service = createAnalyticsService(mockRepository as any);
      const result = await service.trackDocumentDownload('doc-1', 'school-1', 'user-1');
      expect(result).toEqual(event);
      expect(mockRepository.trackDocumentDownload).toHaveBeenCalledWith('doc-1', 'user-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentDownload('', 'school-1', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentDownload('doc-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentDownload('doc-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if all params missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentDownload('', '', '')).rejects.toThrow('documentId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.trackDocumentDownload.mockRejectedValue(new Error('Track failed'));
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.trackDocumentDownload('doc-1', 'school-1', 'user-1')).rejects.toThrow('Track failed');
    });
  });

  describe('getTopDocuments', () => {
    it('should return top documents', async () => {
      const documents = [{ id: 'doc-1', views: 100 }, { id: 'doc-2', views: 80 }];
      mockRepository.getTopDocuments.mockResolvedValue(documents);
      const service = createAnalyticsService(mockRepository as any);
      const result = await service.getTopDocuments('school-1', 'user-1');
      expect(result).toEqual(documents);
      expect(mockRepository.getTopDocuments).toHaveBeenCalledWith('school-1', 'views', undefined);
    });

    it('should pass limit parameter', async () => {
      mockRepository.getTopDocuments.mockResolvedValue([]);
      const service = createAnalyticsService(mockRepository as any);
      await service.getTopDocuments('school-1', 'user-1', 5);
      expect(mockRepository.getTopDocuments).toHaveBeenCalledWith('school-1', 'views', 5);
    });

    it('should return empty when no documents', async () => {
      mockRepository.getTopDocuments.mockResolvedValue([]);
      const service = createAnalyticsService(mockRepository as any);
      const result = await service.getTopDocuments('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should throw if schoolId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getTopDocuments('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getTopDocuments('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getTopDocuments('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getTopDocuments.mockRejectedValue(new Error('Query failed'));
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getTopDocuments('school-1', 'user-1')).rejects.toThrow('Query failed');
    });

    it('should not swallow errors', async () => {
      mockRepository.getTopDocuments.mockRejectedValue(new Error('Connection refused'));
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getTopDocuments('school-1', 'user-1')).rejects.toThrow('Connection refused');
    });
  });

  describe('getUsageStats', () => {
    it('should return usage stats', async () => {
      const stats = { activeUsers: 25, totalSessions: 150 };
      mockRepository.getUsageStats.mockResolvedValue(stats);
      const service = createAnalyticsService(mockRepository as any);
      const result = await service.getUsageStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getUsageStats).toHaveBeenCalledWith('school-1', undefined, undefined);
    });

    it('should pass date parameters', async () => {
      mockRepository.getUsageStats.mockResolvedValue({ activeUsers: 10 });
      const service = createAnalyticsService(mockRepository as any);
      await service.getUsageStats('school-1', 'user-1', '2024-01-01', '2024-12-31');
      expect(mockRepository.getUsageStats).toHaveBeenCalledWith('school-1', '2024-01-01', '2024-12-31');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getUsageStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getUsageStats('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getUsageStats('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getUsageStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getUsageStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });

    it('should not swallow errors', async () => {
      mockRepository.getUsageStats.mockRejectedValue(new Error('ECONNREFUSED'));
      const service = createAnalyticsService(mockRepository as any);
      await expect(service.getUsageStats('school-1', 'user-1')).rejects.toThrow('ECONNREFUSED');
    });
  });

  describe('method existence', () => {
    it('should have all 6 methods defined', () => {
      const service = createAnalyticsService(mockRepository as any);
      const methods = ['getAnalytics', 'getDocumentAnalytics', 'trackDocumentView', 'trackDocumentDownload', 'getTopDocuments', 'getUsageStats'];
      methods.forEach((method) => {
        expect(service[method as keyof typeof service]).toBeDefined();
      });
    });

    it('should return object with correct shape', () => {
      const service = createAnalyticsService(mockRepository as any);
      expect(Object.keys(service)).toHaveLength(6);
    });

    it('should pass correct arguments to getAnalytics', async () => {
      mockRepository.getAnalytics.mockResolvedValue({ totalViews: 0 });
      const service = createAnalyticsService(mockRepository as any);
      await service.getAnalytics('school-1', 'user-1');
      expect(mockRepository.getAnalytics).toHaveBeenCalledWith('school-1');
    });

    it('should pass correct arguments to getDocumentAnalytics', async () => {
      mockRepository.getDocumentAnalytics.mockResolvedValue({ views: 0 });
      const service = createAnalyticsService(mockRepository as any);
      await service.getDocumentAnalytics('doc-1', 'school-1', 'user-1');
      expect(mockRepository.getDocumentAnalytics).toHaveBeenCalledWith('doc-1');
    });

    it('should pass correct arguments to trackDocumentView', async () => {
      mockRepository.trackDocumentView.mockResolvedValue({ tracked: true });
      const service = createAnalyticsService(mockRepository as any);
      await service.trackDocumentView('doc-1', 'school-1', 'user-1');
      expect(mockRepository.trackDocumentView).toHaveBeenCalledWith('doc-1', 'user-1');
    });

    it('should pass correct arguments to trackDocumentDownload', async () => {
      mockRepository.trackDocumentDownload.mockResolvedValue({ tracked: true });
      const service = createAnalyticsService(mockRepository as any);
      await service.trackDocumentDownload('doc-1', 'school-1', 'user-1');
      expect(mockRepository.trackDocumentDownload).toHaveBeenCalledWith('doc-1', 'user-1');
    });

    it('should pass correct arguments to getTopDocuments', async () => {
      mockRepository.getTopDocuments.mockResolvedValue([]);
      const service = createAnalyticsService(mockRepository as any);
      await service.getTopDocuments('school-1', 'user-1', 10);
      expect(mockRepository.getTopDocuments).toHaveBeenCalledWith('school-1', 'views', 10);
    });

    it('should pass correct arguments to getUsageStats', async () => {
      mockRepository.getUsageStats.mockResolvedValue({ activeUsers: 0 });
      const service = createAnalyticsService(mockRepository as any);
      await service.getUsageStats('school-1', 'user-1', '2024-01-01', '2024-12-31');
      expect(mockRepository.getUsageStats).toHaveBeenCalledWith('school-1', '2024-01-01', '2024-12-31');
    });
  });
});
