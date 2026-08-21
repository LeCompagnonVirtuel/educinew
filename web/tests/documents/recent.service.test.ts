import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRecentService } from '../../src/features/documents/services/recent.service';

describe('RecentService', () => {
  const mockRepository = {
    getRecentDocuments: vi.fn(),
    getRecentFolders: vi.fn(),
    getRecentActivities: vi.fn(),
    logActivity: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';
  const documentId = 'doc-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create service with all methods', () => {
    const service = createRecentService(mockRepository as any);
    expect(service.getRecentDocuments).toBeDefined();
    expect(service.getRecentFolders).toBeDefined();
    expect(service.getRecentActivities).toBeDefined();
    expect(service.clearRecentHistory).toBeDefined();
    expect(service.getRecentStats).toBeDefined();
    expect(service.addToRecent).toBeDefined();
  });

  describe('getRecentDocuments', () => {
    it('should return recent documents', async () => {
      const docs = [{ id: 'd1', viewedAt: '2026-01-01' }, { id: 'd2', viewedAt: '2026-01-02' }];
      mockRepository.getRecentDocuments.mockResolvedValue(docs);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentDocuments(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentDocuments('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentDocuments(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no recent documents', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentDocuments(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getRecentDocuments.mockRejectedValue(new Error('Fetch failed'));
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentDocuments(schoolId, userId)).rejects.toThrow('Fetch failed');
    });

    it('should call repository with schoolId and userId', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      await service.getRecentDocuments(schoolId, userId);
      expect(mockRepository.getRecentDocuments).toHaveBeenCalledWith(schoolId, userId, undefined);
    });

    it('should return documents with timestamps', async () => {
      const docs = [{ id: 'd1', viewedAt: '2026-01-01T10:00:00Z' }];
      mockRepository.getRecentDocuments.mockResolvedValue(docs);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentDocuments(schoolId, userId);
      expect(result[0].viewedAt).toBeDefined();
    });

    it('should handle many recent documents', async () => {
      const docs = Array.from({ length: 100 }, (_, i) => ({ id: `d${i}` }));
      mockRepository.getRecentDocuments.mockResolvedValue(docs);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentDocuments(schoolId, userId);
      expect(result).toHaveLength(100);
    });

    it('should handle documents with different types', async () => {
      const docs = [{ id: 'd1', type: 'pdf' }, { id: 'd2', type: 'image' }];
      mockRepository.getRecentDocuments.mockResolvedValue(docs);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentDocuments(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should handle network timeout', async () => {
      mockRepository.getRecentDocuments.mockRejectedValue(new Error('Network timeout'));
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentDocuments(schoolId, userId)).rejects.toThrow('Network timeout');
    });
  });

  describe('getRecentFolders', () => {
    it('should return recent folders', async () => {
      const folders = [{ id: 'f1', name: 'Folder 1' }];
      mockRepository.getRecentFolders.mockResolvedValue(folders);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentFolders(schoolId, userId);
      expect(result).toHaveLength(1);
    });

    it('should throw on missing schoolId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentFolders('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentFolders(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no recent folders', async () => {
      mockRepository.getRecentFolders.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentFolders(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getRecentFolders.mockRejectedValue(new Error('Fetch failed'));
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentFolders(schoolId, userId)).rejects.toThrow('Fetch failed');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getRecentFolders.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      await service.getRecentFolders(schoolId, userId);
      expect(mockRepository.getRecentFolders).toHaveBeenCalledWith(schoolId);
    });

    it('should return folders with access times', async () => {
      const folders = [{ id: 'f1', name: 'Projects', accessedAt: '2026-01-01' }];
      mockRepository.getRecentFolders.mockResolvedValue(folders);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentFolders(schoolId, userId);
      expect(result[0].accessedAt).toBeDefined();
    });

    it('should handle nested folders', async () => {
      const folders = [{ id: 'f1', name: 'Level 1' }, { id: 'f2', name: 'Level 2' }];
      mockRepository.getRecentFolders.mockResolvedValue(folders);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentFolders(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should handle many recent folders', async () => {
      const folders = Array.from({ length: 30 }, (_, i) => ({ id: `f${i}` }));
      mockRepository.getRecentFolders.mockResolvedValue(folders);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentFolders(schoolId, userId);
      expect(result).toHaveLength(30);
    });

    it('should handle database connection error', async () => {
      mockRepository.getRecentFolders.mockRejectedValue(new Error('Database connection lost'));
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentFolders(schoolId, userId)).rejects.toThrow('Database connection lost');
    });
  });

  describe('getRecentActivities', () => {
    it('should return recent activities', async () => {
      const activities = [{ id: 'a1', action: 'view' }, { id: 'a2', action: 'edit' }];
      mockRepository.getRecentActivities.mockResolvedValue(activities);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentActivities(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentActivities('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentActivities(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no recent activities', async () => {
      mockRepository.getRecentActivities.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentActivities(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getRecentActivities.mockRejectedValue(new Error('Fetch failed'));
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentActivities(schoolId, userId)).rejects.toThrow('Fetch failed');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getRecentActivities.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      await service.getRecentActivities(schoolId, userId);
      expect(mockRepository.getRecentActivities).toHaveBeenCalledWith(schoolId, undefined);
    });

    it('should return activities with action types', async () => {
      const activities = [{ id: 'a1', action: 'download', timestamp: '2026-01-01' }];
      mockRepository.getRecentActivities.mockResolvedValue(activities);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentActivities(schoolId, userId);
      expect(result[0].action).toBe('download');
    });

    it('should handle many activities', async () => {
      const activities = Array.from({ length: 200 }, (_, i) => ({ id: `a${i}` }));
      mockRepository.getRecentActivities.mockResolvedValue(activities);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentActivities(schoolId, userId);
      expect(result).toHaveLength(200);
    });

    it('should handle activities from different users', async () => {
      const activities = [{ id: 'a1', userId: 'u1' }, { id: 'a2', userId: 'u2' }];
      mockRepository.getRecentActivities.mockResolvedValue(activities);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentActivities(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should handle network error', async () => {
      mockRepository.getRecentActivities.mockRejectedValue(new Error('Network error'));
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentActivities(schoolId, userId)).rejects.toThrow('Network error');
    });
  });

  describe('clearRecentHistory', () => {
    it('should clear recent history', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([{ id: 'd1' }, { id: 'd2' }]);
      mockRepository.logActivity.mockResolvedValue(undefined);
      const service = createRecentService(mockRepository as any);
      await service.clearRecentHistory(schoolId, userId);
      expect(mockRepository.logActivity).toHaveBeenCalledTimes(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.clearRecentHistory('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.clearRecentHistory(schoolId, '')).rejects.toThrow();
    });

    it('should handle empty recent history', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      await service.clearRecentHistory(schoolId, userId);
      expect(mockRepository.logActivity).not.toHaveBeenCalled();
    });

    it('should handle repository errors', async () => {
      mockRepository.getRecentDocuments.mockRejectedValue(new Error('Clear failed'));
      const service = createRecentService(mockRepository as any);
      await expect(service.clearRecentHistory(schoolId, userId)).rejects.toThrow('Clear failed');
    });

    it('should log activity for each document', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([{ id: 'd1' }, { id: 'd2' }, { id: 'd3' }]);
      mockRepository.logActivity.mockResolvedValue(undefined);
      const service = createRecentService(mockRepository as any);
      await service.clearRecentHistory(schoolId, userId);
      expect(mockRepository.logActivity).toHaveBeenCalledTimes(3);
    });

    it('should call logActivity with correct parameters', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([{ id: 'd1' }]);
      mockRepository.logActivity.mockResolvedValue(undefined);
      const service = createRecentService(mockRepository as any);
      await service.clearRecentHistory(schoolId, userId);
      expect(mockRepository.logActivity).toHaveBeenCalledWith(
        expect.objectContaining({ documentId: 'd1', action: 'recent_cleared' }),
        schoolId
      );
    });

    it('should handle partial failure', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([{ id: 'd1' }, { id: 'd2' }]);
      mockRepository.logActivity.mockRejectedValueOnce(new Error('Log failed'));
      const service = createRecentService(mockRepository as any);
      await expect(service.clearRecentHistory(schoolId, userId)).rejects.toThrow('Log failed');
    });

    it('should handle many documents', async () => {
      const docs = Array.from({ length: 50 }, (_, i) => ({ id: `d${i}` }));
      mockRepository.getRecentDocuments.mockResolvedValue(docs);
      mockRepository.logActivity.mockResolvedValue(undefined);
      const service = createRecentService(mockRepository as any);
      await service.clearRecentHistory(schoolId, userId);
      expect(mockRepository.logActivity).toHaveBeenCalledTimes(50);
    });

    it('should handle database error during log', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([{ id: 'd1' }]);
      mockRepository.logActivity.mockRejectedValue(new Error('Database error'));
      const service = createRecentService(mockRepository as any);
      await expect(service.clearRecentHistory(schoolId, userId)).rejects.toThrow('Database error');
    });
  });

  describe('getRecentStats', () => {
    it('should return recent stats', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([{ id: 'd1' }, { id: 'd2' }, { id: 'd3' }]);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentStats(schoolId, userId);
      expect(result.totalRecent).toBe(3);
    });

    it('should throw on missing schoolId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentStats('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentStats(schoolId, '')).rejects.toThrow();
    });

    it('should handle zero recent documents', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentStats(schoolId, userId);
      expect(result.totalRecent).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getRecentDocuments.mockRejectedValue(new Error('Stats failed'));
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentStats(schoolId, userId)).rejects.toThrow('Stats failed');
    });

    it('should include schoolId in stats', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentStats(schoolId, userId);
      expect(result.schoolId).toBe(schoolId);
    });

    it('should include userId in stats', async () => {
      mockRepository.getRecentDocuments.mockResolvedValue([]);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentStats(schoolId, userId);
      expect(result.userId).toBe(userId);
    });

    it('should handle many recent documents', async () => {
      const docs = Array.from({ length: 100 }, (_, i) => ({ id: `d${i}` }));
      mockRepository.getRecentDocuments.mockResolvedValue(docs);
      const service = createRecentService(mockRepository as any);
      const result = await service.getRecentStats(schoolId, userId);
      expect(result.totalRecent).toBe(100);
    });

    it('should handle network timeout', async () => {
      mockRepository.getRecentDocuments.mockRejectedValue(new Error('Network timeout'));
      const service = createRecentService(mockRepository as any);
      await expect(service.getRecentStats(schoolId, userId)).rejects.toThrow('Network timeout');
    });
  });

  describe('addToRecent', () => {
    it('should add document to recent', async () => {
      mockRepository.logActivity.mockResolvedValue({ id: 'activity-1' });
      const service = createRecentService(mockRepository as any);
      const result = await service.addToRecent(documentId, schoolId, userId, 'document');
      expect(result.id).toBe('activity-1');
    });

    it('should throw on missing documentId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.addToRecent('', schoolId, userId, 'document')).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.addToRecent(documentId, '', userId, 'document')).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.addToRecent(documentId, schoolId, '', 'document')).rejects.toThrow();
    });

    it('should throw on missing type', async () => {
      const service = createRecentService(mockRepository as any);
      await expect(service.addToRecent(documentId, schoolId, userId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.logActivity.mockRejectedValue(new Error('Log failed'));
      const service = createRecentService(mockRepository as any);
      await expect(service.addToRecent(documentId, schoolId, userId, 'document')).rejects.toThrow('Log failed');
    });

    it('should call repository with correct parameters', async () => {
      mockRepository.logActivity.mockResolvedValue({ id: 'a1' });
      const service = createRecentService(mockRepository as any);
      await service.addToRecent(documentId, schoolId, userId, 'document');
      expect(mockRepository.logActivity).toHaveBeenCalledWith(
        expect.objectContaining({ documentId, action: 'recent_view', userId, type: 'document' }),
        schoolId
      );
    });

    it('should return activity with id', async () => {
      mockRepository.logActivity.mockResolvedValue({ id: 'activity-42' });
      const service = createRecentService(mockRepository as any);
      const result = await service.addToRecent(documentId, schoolId, userId, 'folder');
      expect(result.id).toBe('activity-42');
    });

    it('should handle different activity types', async () => {
      mockRepository.logActivity.mockResolvedValue({ id: 'a1' });
      const service = createRecentService(mockRepository as any);
      await service.addToRecent(documentId, schoolId, userId, 'folder');
      expect(mockRepository.logActivity).toHaveBeenCalled();
    });

    it('should handle database error', async () => {
      mockRepository.logActivity.mockRejectedValue(new Error('Database insert failed'));
      const service = createRecentService(mockRepository as any);
      await expect(service.addToRecent(documentId, schoolId, userId, 'document')).rejects.toThrow('Database insert failed');
    });
  });
});
