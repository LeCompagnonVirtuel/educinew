import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createViewingService } from '../../src/features/documents/services/viewing.service';

describe('ViewingService', () => {
  let mockRepository: {
    getDocument: ReturnType<typeof vi.fn>;
    trackDocumentView: ReturnType<typeof vi.fn>;
    getDocumentAnalytics: ReturnType<typeof vi.fn>;
    getDocumentTimeline: ReturnType<typeof vi.fn>;
    getDocumentStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getDocument: vi.fn(),
      trackDocumentView: vi.fn(),
      getDocumentAnalytics: vi.fn(),
      getDocumentTimeline: vi.fn(),
      getDocumentStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createViewingService(mockRepository);
    expect(service).toBeDefined();
    expect(service.createViewingSession).toBeInstanceOf(Function);
    expect(service.getViewingSession).toBeInstanceOf(Function);
    expect(service.endViewingSession).toBeInstanceOf(Function);
    expect(service.getViewingHistory).toBeInstanceOf(Function);
    expect(service.getActiveViewers).toBeInstanceOf(Function);
    expect(service.getViewingStats).toBeInstanceOf(Function);
  });

  describe('createViewingSession', () => {
    it('should create a viewing session successfully', async () => {
      const document = { id: 'doc-1', name: 'test.pdf' };
      mockRepository.getDocument.mockResolvedValue(document);
      mockRepository.trackDocumentView.mockResolvedValue(undefined);
      const service = createViewingService(mockRepository);
      const result = await service.createViewingSession('doc-1', 'school-1', 'user-1');
      expect(result).toBeDefined();
      expect(result.documentId).toBe('doc-1');
      expect(result.userId).toBe('user-1');
      expect(result.schoolId).toBe('school-1');
      expect(result.status).toBe('active');
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.trackDocumentView).toHaveBeenCalledWith('doc-1', 'user-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.createViewingSession('', 'school-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.createViewingSession('doc-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.createViewingSession('doc-1', 'school-1', '')).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createViewingService(mockRepository);
      await expect(service.createViewingSession('doc-1', 'school-1', 'user-1')).rejects.toThrow();
    });

    it('should include startedAt timestamp in session', async () => {
      const document = { id: 'doc-1' };
      mockRepository.getDocument.mockResolvedValue(document);
      mockRepository.trackDocumentView.mockResolvedValue(undefined);
      const service = createViewingService(mockRepository);
      const result = await service.createViewingSession('doc-1', 'school-1', 'user-1');
      expect(result.startedAt).toBeDefined();
      expect(new Date(result.startedAt).toISOString()).toBe(result.startedAt);
    });

    it('should track document view after fetching document', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.trackDocumentView.mockResolvedValue(undefined);
      const service = createViewingService(mockRepository);
      await service.createViewingSession('doc-1', 'school-1', 'user-1');
      expect(mockRepository.trackDocumentView).toHaveBeenCalledOnce();
      expect(mockRepository.trackDocumentView).toHaveBeenCalledWith('doc-1', 'user-1');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('DB connection failed'));
      const service = createViewingService(mockRepository);
      await expect(service.createViewingSession('doc-1', 'school-1', 'user-1')).rejects.toThrow('DB connection failed');
    });
  });

  describe('getViewingSession', () => {
    it('should fetch viewing session successfully', async () => {
      const document = { id: 'doc-1', name: 'test.pdf' };
      const analytics = { views: 10 };
      mockRepository.getDocument.mockResolvedValue(document);
      mockRepository.getDocumentAnalytics.mockResolvedValue(analytics);
      const service = createViewingService(mockRepository);
      const result = await service.getViewingSession('doc-1', 'user-1');
      expect(result).toEqual({ document, analytics });
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.getDocumentAnalytics).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getViewingSession('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getViewingSession('doc-1', '')).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createViewingService(mockRepository);
      await expect(service.getViewingSession('doc-1', 'user-1')).rejects.toThrow();
    });

    it('should call getDocumentAnalytics with correct documentId', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.getDocumentAnalytics.mockResolvedValue({ views: 0 });
      const service = createViewingService(mockRepository);
      await service.getViewingSession('doc-1', 'user-1');
      expect(mockRepository.getDocumentAnalytics).toHaveBeenCalledWith('doc-1');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Analytics unavailable'));
      const service = createViewingService(mockRepository);
      await expect(service.getViewingSession('doc-1', 'user-1')).rejects.toThrow('Analytics unavailable');
    });
  });

  describe('endViewingSession', () => {
    it('should end viewing session successfully', async () => {
      const document = { id: 'doc-1' };
      mockRepository.getDocument.mockResolvedValue(document);
      const service = createViewingService(mockRepository);
      await service.endViewingSession('doc-1', 'user-1');
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.endViewingSession('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.endViewingSession('doc-1', '')).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createViewingService(mockRepository);
      await expect(service.endViewingSession('doc-1', 'user-1')).rejects.toThrow();
    });

    it('should not return a value on success', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createViewingService(mockRepository);
      const result = await service.endViewingSession('doc-1', 'user-1');
      expect(result).toBeUndefined();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Session end failed'));
      const service = createViewingService(mockRepository);
      await expect(service.endViewingSession('doc-1', 'user-1')).rejects.toThrow('Session end failed');
    });
  });

  describe('getViewingHistory', () => {
    it('should fetch viewing history successfully', async () => {
      const timeline = [{ action: 'view', timestamp: '2026-01-01T00:00:00Z' }];
      mockRepository.getDocumentTimeline.mockResolvedValue(timeline);
      const service = createViewingService(mockRepository);
      const result = await service.getViewingHistory('doc-1', 'user-1');
      expect(result).toEqual(timeline);
      expect(mockRepository.getDocumentTimeline).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getViewingHistory('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getViewingHistory('doc-1', '')).rejects.toThrow();
    });

    it('should return empty timeline when no history exists', async () => {
      mockRepository.getDocumentTimeline.mockResolvedValue([]);
      const service = createViewingService(mockRepository);
      const result = await service.getViewingHistory('doc-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should pass correct documentId to repository', async () => {
      mockRepository.getDocumentTimeline.mockResolvedValue([]);
      const service = createViewingService(mockRepository);
      await service.getViewingHistory('doc-42', 'user-1');
      expect(mockRepository.getDocumentTimeline).toHaveBeenCalledWith('doc-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocumentTimeline.mockRejectedValue(new Error('Timeline fetch failed'));
      const service = createViewingService(mockRepository);
      await expect(service.getViewingHistory('doc-1', 'user-1')).rejects.toThrow('Timeline fetch failed');
    });
  });

  describe('getActiveViewers', () => {
    it('should fetch active viewers successfully', async () => {
      const analytics = { activeViewers: ['user-1', 'user-2'] };
      mockRepository.getDocumentAnalytics.mockResolvedValue(analytics);
      const service = createViewingService(mockRepository);
      const result = await service.getActiveViewers('doc-1', 'school-1');
      expect(result).toEqual(analytics);
      expect(mockRepository.getDocumentAnalytics).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getActiveViewers('', 'school-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getActiveViewers('doc-1', '')).rejects.toThrow();
    });

    it('should return empty analytics when no viewers exist', async () => {
      mockRepository.getDocumentAnalytics.mockResolvedValue({ activeViewers: [] });
      const service = createViewingService(mockRepository);
      const result = await service.getActiveViewers('doc-1', 'school-1');
      expect(result).toEqual({ activeViewers: [] });
    });

    it('should pass correct documentId to repository', async () => {
      mockRepository.getDocumentAnalytics.mockResolvedValue({ activeViewers: [] });
      const service = createViewingService(mockRepository);
      await service.getActiveViewers('doc-99', 'school-1');
      expect(mockRepository.getDocumentAnalytics).toHaveBeenCalledWith('doc-99');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocumentAnalytics.mockRejectedValue(new Error('Analytics error'));
      const service = createViewingService(mockRepository);
      await expect(service.getActiveViewers('doc-1', 'school-1')).rejects.toThrow('Analytics error');
    });
  });

  describe('getViewingStats', () => {
    it('should fetch viewing stats successfully', async () => {
      const stats = { totalViews: 100, uniqueViewers: 25 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createViewingService(mockRepository);
      const result = await service.getViewingStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith('school-1', undefined, undefined);
    });

    it('should throw when schoolId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getViewingStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getViewingStats('school-1', '')).rejects.toThrow();
    });

    it('should pass date range to repository', async () => {
      const stats = { totalViews: 50 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createViewingService(mockRepository);
      await service.getViewingStats('school-1', 'user-1', '2026-01-01', '2026-12-31');
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith('school-1', '2026-01-01', '2026-12-31');
    });

    it('should pass only dateFrom when dateTo is not provided', async () => {
      mockRepository.getDocumentStats.mockResolvedValue({ totalViews: 10 });
      const service = createViewingService(mockRepository);
      await service.getViewingStats('school-1', 'user-1', '2026-01-01');
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith('school-1', '2026-01-01', undefined);
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createViewingService(mockRepository);
      await expect(service.getViewingStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });

  describe('missing required parameters', () => {
    it('should throw when createViewingSession receives all empty strings', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.createViewingSession('', '', '')).rejects.toThrow();
    });

    it('should throw when getViewingSession receives undefined documentId', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getViewingSession(undefined as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when endViewingSession receives all empty strings', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.endViewingSession('', '')).rejects.toThrow();
    });

    it('should throw when getViewingHistory receives undefined parameters', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getViewingHistory(undefined as any, undefined as any)).rejects.toThrow();
    });

    it('should throw when getActiveViewers receives null documentId', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getActiveViewers(null as any, 'school-1')).rejects.toThrow();
    });

    it('should throw when getViewingStats receives undefined schoolId', async () => {
      const service = createViewingService(mockRepository);
      await expect(service.getViewingStats(undefined as any, 'user-1')).rejects.toThrow();
    });
  });

  describe('repository error handling', () => {
    it('should handle trackDocumentView failure in createViewingSession', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.trackDocumentView.mockRejectedValue(new Error('Tracking failed'));
      const service = createViewingService(mockRepository);
      await expect(service.createViewingSession('doc-1', 'school-1', 'user-1')).rejects.toThrow('Tracking failed');
    });

    it('should handle getDocumentAnalytics failure in getViewingSession', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.getDocumentAnalytics.mockRejectedValue(new Error('Analytics down'));
      const service = createViewingService(mockRepository);
      await expect(service.getViewingSession('doc-1', 'user-1')).rejects.toThrow('Analytics down');
    });

    it('should handle getDocumentAnalytics failure in getActiveViewers', async () => {
      mockRepository.getDocumentAnalytics.mockRejectedValue(new Error('Connection timeout'));
      const service = createViewingService(mockRepository);
      await expect(service.getActiveViewers('doc-1', 'school-1')).rejects.toThrow('Connection timeout');
    });
  });
});
