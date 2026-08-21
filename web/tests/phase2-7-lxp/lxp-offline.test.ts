import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpOfflineService } from '@/features/lxp/services/lxp-offline.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  data: null as Record<string, unknown> | null,
  error: null as { message: string } | null,
};

describe('LxpOfflineService', () => {
  let service: LxpOfflineService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpOfflineService(mockSupabase as never);
  });

  describe('getOfflineContent', () => {
    it('should return offline content by id', async () => {
      mockSupabase.data = { id: 'offline-1', content_type: 'video' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineContent('offline-1');
      expect(result).toBeDefined();
    });

    it('should return null when content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getOfflineContent('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getOfflineContent('offline-1')).rejects.toThrow();
    });

    it('should validate content id', async () => {
      await expect(service.getOfflineContent('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'offline-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getOfflineContent('offline-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include sync status', async () => {
      mockSupabase.data = { id: 'offline-1', sync_status: 'synced' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineContent('offline-1', { includeSyncStatus: true });
      expect(result).toBeDefined();
    });

    it('should include download info', async () => {
      mockSupabase.data = { id: 'offline-1', download_url: 'https://example.com/file.mp4' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineContent('offline-1', { includeDownloadUrl: true });
      expect(result).toBeDefined();
    });

    it('should include file size', async () => {
      mockSupabase.data = { id: 'offline-1', file_size: 524288000 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getOfflineContent('offline-1', { includeFileSize: true });
      expect(result).toBeDefined();
    });
  });

  describe('requestDownload', () => {
    it('should request download for content', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'downloading', download_url: 'https://example.com/file.mp4' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.requestDownload('content-1', 'user-1');
      expect(result).toBeDefined();
    });

    it('should validate content id', async () => {
      await expect(service.requestDownload('', 'user-1')).rejects.toThrow();
    });

    it('should validate user id', async () => {
      await expect(service.requestDownload('content-1', '')).rejects.toThrow();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'request failed' } });
      await expect(service.requestDownload('content-1', 'user-1')).rejects.toThrow();
    });

    it('should set downloading status', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'downloading' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.requestDownload('content-1', 'user-1');
      expect(result).toHaveProperty('status', 'downloading');
    });

    it('should include download URL', async () => {
      mockSupabase.data = { id: 'offline-1', download_url: 'https://example.com/file.mp4' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.requestDownload('content-1', 'user-1');
      expect(result).toHaveProperty('download_url');
    });

    it('should handle duplicate download request', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.requestDownload('content-1', 'user-1');
      expect(result).toBeDefined();
    });

    it('should handle download with quality options', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'downloading' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.requestDownload('content-1', 'user-1', { quality: '720p' });
      expect(result).toBeDefined();
    });

    it('should handle download with size limit', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'downloading' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.requestDownload('content-1', 'user-1', { maxFileSize: 100 * 1024 * 1024 });
      expect(result).toBeDefined();
    });

    it('should handle download with WiFi only', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'downloading' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.requestDownload('content-1', 'user-1', { wifiOnly: true });
      expect(result).toBeDefined();
    });
  });

  describe('updateSyncStatus', () => {
    it('should update sync status', async () => {
      mockSupabase.data = { id: 'offline-1', sync_status: 'synced', last_synced: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateSyncStatus('offline-1', 'synced');
      expect(result).toBeDefined();
    });

    it('should set pending sync status', async () => {
      mockSupabase.data = { id: 'offline-1', sync_status: 'pending' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateSyncStatus('offline-1', 'pending');
      expect(result).toHaveProperty('sync_status', 'pending');
    });

    it('should set error sync status', async () => {
      mockSupabase.data = { id: 'offline-1', sync_status: 'error', error_message: 'Sync failed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateSyncStatus('offline-1', 'error', 'Sync failed');
      expect(result).toHaveProperty('sync_status', 'error');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateSyncStatus('offline-1', 'synced')).rejects.toThrow();
    });

    it('should validate content id', async () => {
      await expect(service.updateSyncStatus('', 'synced')).rejects.toThrow();
    });

    it('should validate sync status', async () => {
      await expect(service.updateSyncStatus('offline-1', 'invalid')).rejects.toThrow();
    });

    it('should set last_synced timestamp', async () => {
      mockSupabase.data = { id: 'offline-1', last_synced: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateSyncStatus('offline-1', 'synced');
      expect(result).toHaveProperty('last_synced');
    });

    it('should handle non-existent content', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateSyncStatus('nonexistent', 'synced');
      expect(result).toBeNull();
    });
  });

  describe('getPendingSyncs', () => {
    it('should return pending syncs for user', async () => {
      mockSupabase.data = [{ id: 'sync-1', sync_status: 'pending' }];
      const result = await service.getPendingSyncs('user-1');
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 'sync-1' }];
      const result = await service.getPendingSyncs('user-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should return empty array when no pending syncs', async () => {
      mockSupabase.data = [];
      const result = await service.getPendingSyncs('user-1');
      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'list failed' } });
      await expect(service.getPendingSyncs('user-1')).rejects.toThrow();
    });

    it('should validate user id', async () => {
      await expect(service.getPendingSyncs('')).rejects.toThrow();
    });

    it('should filter by content type', async () => {
      mockSupabase.data = [{ id: 'sync-1', content_type: 'video' }];
      const result = await service.getPendingSyncs('user-1', { contentType: 'video' });
      expect(result).toBeDefined();
    });

    it('should sort by priority', async () => {
      mockSupabase.data = [{ id: 'sync-1' }];
      const result = await service.getPendingSyncs('user-1', { sortBy: 'priority' });
      expect(result).toBeDefined();
    });

    it('should include file size info', async () => {
      mockSupabase.data = [{ id: 'sync-1', file_size: 1024 }];
      const result = await service.getPendingSyncs('user-1', { includeFileSize: true });
      expect(result).toBeDefined();
    });
  });

  describe('cancelDownload', () => {
    it('should cancel an active download', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'cancelled' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.cancelDownload('offline-1');
      expect(result).toBeDefined();
    });

    it('should set cancelled status', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'cancelled' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.cancelDownload('offline-1');
      expect(result).toHaveProperty('status', 'cancelled');
    });

    it('should handle non-existent download', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.cancelDownload('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'cancel failed' } });
      await expect(service.cancelDownload('offline-1')).rejects.toThrow();
    });

    it('should validate content id', async () => {
      await expect(service.cancelDownload('')).rejects.toThrow();
    });

    it('should handle cancelling completed download', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.cancelDownload('offline-1')).rejects.toThrow();
    });

    it('should handle concurrent cancel attempts', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'cancelled' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 3 }, () => service.cancelDownload('offline-1'));
      await Promise.all(promises);
      expect(mockSupabase.update).toHaveBeenCalled();
    });

    it('should clean up partial downloads', async () => {
      mockSupabase.data = { id: 'offline-1', status: 'cancelled', partial_path: '/tmp/partial' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.cancelDownload('offline-1');
      expect(result).toBeDefined();
    });
  });

  describe('getDownloadHistory', () => {
    it('should return download history for user', async () => {
      mockSupabase.data = [{ id: 'dl-1', content_id: 'content-1', status: 'completed' }];
      const result = await service.getDownloadHistory('user-1');
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 'dl-1' }];
      const result = await service.getDownloadHistory('user-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should filter by status', async () => {
      mockSupabase.data = [{ id: 'dl-1', status: 'completed' }];
      const result = await service.getDownloadHistory('user-1', { status: 'completed' });
      expect(result).toBeDefined();
    });

    it('should return empty array when no history', async () => {
      mockSupabase.data = [];
      const result = await service.getDownloadHistory('user-1');
      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'list failed' } });
      await expect(service.getDownloadHistory('user-1')).rejects.toThrow();
    });

    it('should validate user id', async () => {
      await expect(service.getDownloadHistory('')).rejects.toThrow();
    });

    it('should sort by download date', async () => {
      mockSupabase.data = [{ id: 'dl-1' }];
      const result = await service.getDownloadHistory('user-1', { sortBy: 'downloaded_at', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should filter by content type', async () => {
      mockSupabase.data = [{ id: 'dl-1', content_type: 'video' }];
      const result = await service.getDownloadHistory('user-1', { contentType: 'video' });
      expect(result).toBeDefined();
    });
  });

  describe('getStorageUsage', () => {
    it('should return storage usage for user', async () => {
      mockSupabase.data = { total_size: 1073741824, content_count: 10 };
      const result = await service.getStorageUsage('user-1');
      expect(result).toBeDefined();
    });

    it('should return breakdown by content type', async () => {
      mockSupabase.data = { total_size: 1073741824, by_type: { video: 500000000, audio: 200000000 } };
      const result = await service.getStorageUsage('user-1');
      expect(result).toHaveProperty('by_type');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'usage failed' } });
      await expect(service.getStorageUsage('user-1')).rejects.toThrow();
    });

    it('should validate user id', async () => {
      await expect(service.getStorageUsage('')).rejects.toThrow();
    });

    it('should return available storage', async () => {
      mockSupabase.data = { total_size: 1073741824, available: 4294967296 };
      const result = await service.getStorageUsage('user-1');
      expect(result).toHaveProperty('available');
    });

    it('should return last sync time', async () => {
      mockSupabase.data = { total_size: 1024, last_sync: new Date().toISOString() };
      const result = await service.getStorageUsage('user-1');
      expect(result).toHaveProperty('last_sync');
    });

    it('should return content count', async () => {
      mockSupabase.data = { total_size: 1024, content_count: 5 };
      const result = await service.getStorageUsage('user-1');
      expect(result).toHaveProperty('content_count');
    });

    it('should return sync status summary', async () => {
      mockSupabase.data = { total_size: 1024, sync_summary: { synced: 3, pending: 1, error: 1 } };
      const result = await service.getStorageUsage('user-1');
      expect(result).toHaveProperty('sync_summary');
    });
  });
});
