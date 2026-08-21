import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createOfflineService } from '../../src/features/documents/services/offline.service';

describe('OfflineService', () => {
  let mockRepository: {
    getOfflineDocuments: ReturnType<typeof vi.fn>;
    markForOffline: ReturnType<typeof vi.fn>;
    removeFromOffline: ReturnType<typeof vi.fn>;
    syncOfflineChanges: ReturnType<typeof vi.fn>;
    getOfflineSyncStatus: ReturnType<typeof vi.fn>;
    updateOfflineDocument: ReturnType<typeof vi.fn>;
    getDocument: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getOfflineDocuments: vi.fn(),
      markForOffline: vi.fn(),
      removeFromOffline: vi.fn(),
      syncOfflineChanges: vi.fn(),
      getOfflineSyncStatus: vi.fn(),
      updateOfflineDocument: vi.fn(),
      getDocument: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createOfflineService(mockRepository as any);
    expect(service).toBeDefined();
    expect(service.getOfflineDocuments).toBeInstanceOf(Function);
    expect(service.markForOffline).toBeInstanceOf(Function);
    expect(service.removeFromOffline).toBeInstanceOf(Function);
    expect(service.syncOfflineChanges).toBeInstanceOf(Function);
    expect(service.getOfflineSyncStatus).toBeInstanceOf(Function);
    expect(service.updateOfflineDocument).toBeInstanceOf(Function);
  });

  describe('getOfflineDocuments', () => {
    it('should return offline documents', async () => {
      const documents = [{ id: 'doc-1', name: 'Report.pdf' }];
      mockRepository.getOfflineDocuments.mockResolvedValue(documents);
      const service = createOfflineService(mockRepository as any);
      const result = await service.getOfflineDocuments('school-1', 'user-1');
      expect(result).toEqual(documents);
      expect(mockRepository.getOfflineDocuments).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should return empty list when no offline documents', async () => {
      mockRepository.getOfflineDocuments.mockResolvedValue([]);
      const service = createOfflineService(mockRepository as any);
      const result = await service.getOfflineDocuments('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should return multiple offline documents', async () => {
      mockRepository.getOfflineDocuments.mockResolvedValue([{ id: 'doc-1' }, { id: 'doc-2' }]);
      const service = createOfflineService(mockRepository as any);
      const result = await service.getOfflineDocuments('school-1', 'user-1');
      expect(result).toHaveLength(2);
    });

    it('should throw if schoolId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.getOfflineDocuments('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.getOfflineDocuments('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.getOfflineDocuments('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getOfflineDocuments.mockRejectedValue(new Error('DB error'));
      const service = createOfflineService(mockRepository as any);
      await expect(service.getOfflineDocuments('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should not swallow errors', async () => {
      mockRepository.getOfflineDocuments.mockRejectedValue(new Error('Connection timeout'));
      const service = createOfflineService(mockRepository as any);
      await expect(service.getOfflineDocuments('school-1', 'user-1')).rejects.toThrow('Connection timeout');
    });
  });

  describe('markForOffline', () => {
    it('should mark document for offline', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1', schoolId: 'school-1' });
      const result = { id: 'doc-1', offline: true };
      mockRepository.markForOffline.mockResolvedValue(result);
      const service = createOfflineService(mockRepository as any);
      const response = await service.markForOffline('doc-1', 'user-1');
      expect(response).toEqual(result);
      expect(mockRepository.markForOffline).toHaveBeenCalledWith('doc-1', 'school-1', 'user-1');
    });

    it('should mark document for offline with options', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1', schoolId: 'school-1' });
      mockRepository.markForOffline.mockResolvedValue({ offline: true });
      const service = createOfflineService(mockRepository as any);
      await service.markForOffline('doc-1', 'user-1', { priority: 'high' });
      expect(mockRepository.markForOffline).toHaveBeenCalledWith('doc-1', 'school-1', 'user-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.markForOffline('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.markForOffline('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.markForOffline('', '')).rejects.toThrow('documentId is required');
    });

    it('should throw if document not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createOfflineService(mockRepository as any);
      await expect(service.markForOffline('doc-999', 'user-1')).rejects.toThrow();
    });

    it('should handle repository errors on getDocument', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('DB error'));
      const service = createOfflineService(mockRepository as any);
      await expect(service.markForOffline('doc-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should handle repository errors on markForOffline', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1', schoolId: 'school-1' });
      mockRepository.markForOffline.mockRejectedValue(new Error('Mark failed'));
      const service = createOfflineService(mockRepository as any);
      await expect(service.markForOffline('doc-1', 'user-1')).rejects.toThrow('Mark failed');
    });
  });

  describe('removeFromOffline', () => {
    it('should remove document from offline', async () => {
      mockRepository.removeFromOffline.mockResolvedValue({ removed: true });
      const service = createOfflineService(mockRepository as any);
      const result = await service.removeFromOffline('doc-1', 'user-1');
      expect(result).toEqual({ removed: true });
      expect(mockRepository.removeFromOffline).toHaveBeenCalledWith('doc-1', 'user-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.removeFromOffline('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.removeFromOffline('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.removeFromOffline('', '')).rejects.toThrow('documentId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.removeFromOffline.mockRejectedValue(new Error('Remove failed'));
      const service = createOfflineService(mockRepository as any);
      await expect(service.removeFromOffline('doc-1', 'user-1')).rejects.toThrow('Remove failed');
    });
  });

  describe('syncOfflineChanges', () => {
    it('should sync offline changes', async () => {
      const syncResult = { synced: 5, conflicts: 0 };
      mockRepository.syncOfflineChanges.mockResolvedValue(syncResult);
      const service = createOfflineService(mockRepository as any);
      const result = await service.syncOfflineChanges('school-1', 'user-1');
      expect(result).toEqual(syncResult);
      expect(mockRepository.syncOfflineChanges).toHaveBeenCalledWith('user-1');
    });

    it('should return zero sync results', async () => {
      mockRepository.syncOfflineChanges.mockResolvedValue({ synced: 0, conflicts: 0 });
      const service = createOfflineService(mockRepository as any);
      const result = await service.syncOfflineChanges('school-1', 'user-1');
      expect(result).toEqual({ synced: 0, conflicts: 0 });
    });

    it('should return sync with conflicts', async () => {
      mockRepository.syncOfflineChanges.mockResolvedValue({ synced: 3, conflicts: 2 });
      const service = createOfflineService(mockRepository as any);
      const result = await service.syncOfflineChanges('school-1', 'user-1');
      expect(result).toEqual({ synced: 3, conflicts: 2 });
    });

    it('should throw if schoolId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.syncOfflineChanges('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.syncOfflineChanges('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.syncOfflineChanges('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.syncOfflineChanges.mockRejectedValue(new Error('Sync failed'));
      const service = createOfflineService(mockRepository as any);
      await expect(service.syncOfflineChanges('school-1', 'user-1')).rejects.toThrow('Sync failed');
    });
  });

  describe('getOfflineSyncStatus', () => {
    it('should return offline sync status', async () => {
      const status = { pending: 3, lastSync: '2024-01-15T10:00:00Z' };
      mockRepository.getOfflineSyncStatus.mockResolvedValue(status);
      const service = createOfflineService(mockRepository as any);
      const result = await service.getOfflineSyncStatus('school-1', 'user-1');
      expect(result).toEqual(status);
      expect(mockRepository.getOfflineSyncStatus).toHaveBeenCalledWith('user-1');
    });

    it('should return status with no pending changes', async () => {
      mockRepository.getOfflineSyncStatus.mockResolvedValue({ pending: 0, lastSync: '2024-01-15T10:00:00Z' });
      const service = createOfflineService(mockRepository as any);
      const result = await service.getOfflineSyncStatus('school-1', 'user-1');
      expect(result).toEqual({ pending: 0, lastSync: '2024-01-15T10:00:00Z' });
    });

    it('should throw if schoolId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.getOfflineSyncStatus('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.getOfflineSyncStatus('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.getOfflineSyncStatus('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getOfflineSyncStatus.mockRejectedValue(new Error('Status query failed'));
      const service = createOfflineService(mockRepository as any);
      await expect(service.getOfflineSyncStatus('school-1', 'user-1')).rejects.toThrow('Status query failed');
    });
  });

  describe('updateOfflineDocument', () => {
    it('should update offline document', async () => {
      const data = { name: 'Updated Report.pdf' };
      const updated = { id: 'doc-1', ...data };
      mockRepository.updateOfflineDocument.mockResolvedValue(updated);
      const service = createOfflineService(mockRepository as any);
      const result = await service.updateOfflineDocument('doc-1', 'user-1', data);
      expect(result).toEqual(updated);
      expect(mockRepository.updateOfflineDocument).toHaveBeenCalledWith('doc-1', 'user-1', data);
    });

    it('should throw if documentId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.updateOfflineDocument('', 'user-1', { name: 'Test' })).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.updateOfflineDocument('doc-1', '', { name: 'Test' })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.updateOfflineDocument('doc-1', 'user-1', null as any)).rejects.toThrow('update data is required');
    });

    it('should throw if both documentId and userId missing', async () => {
      const service = createOfflineService(mockRepository as any);
      await expect(service.updateOfflineDocument('', '', { name: 'Test' })).rejects.toThrow('documentId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.updateOfflineDocument.mockRejectedValue(new Error('Update failed'));
      const service = createOfflineService(mockRepository as any);
      await expect(service.updateOfflineDocument('doc-1', 'user-1', { name: 'Test' })).rejects.toThrow('Update failed');
    });

    it('should not swallow errors', async () => {
      mockRepository.updateOfflineDocument.mockRejectedValue(new Error('Conflict detected'));
      const service = createOfflineService(mockRepository as any);
      await expect(service.updateOfflineDocument('doc-1', 'user-1', { name: 'Test' })).rejects.toThrow('Conflict detected');
    });
  });

  describe('method existence', () => {
    it('should have all 6 methods defined', () => {
      const service = createOfflineService(mockRepository as any);
      const methods = ['getOfflineDocuments', 'markForOffline', 'removeFromOffline', 'syncOfflineChanges', 'getOfflineSyncStatus', 'updateOfflineDocument'];
      methods.forEach((method) => {
        expect(service[method as keyof typeof service]).toBeDefined();
      });
    });

    it('should return object with correct shape', () => {
      const service = createOfflineService(mockRepository as any);
      expect(Object.keys(service)).toHaveLength(6);
    });

    it('should pass correct arguments to getOfflineDocuments', async () => {
      mockRepository.getOfflineDocuments.mockResolvedValue([]);
      const service = createOfflineService(mockRepository as any);
      await service.getOfflineDocuments('school-1', 'user-1');
      expect(mockRepository.getOfflineDocuments).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should pass correct arguments to removeFromOffline', async () => {
      mockRepository.removeFromOffline.mockResolvedValue({ removed: true });
      const service = createOfflineService(mockRepository as any);
      await service.removeFromOffline('doc-1', 'user-1');
      expect(mockRepository.removeFromOffline).toHaveBeenCalledWith('doc-1', 'user-1');
    });

    it('should pass correct arguments to syncOfflineChanges', async () => {
      mockRepository.syncOfflineChanges.mockResolvedValue({ synced: 0, conflicts: 0 });
      const service = createOfflineService(mockRepository as any);
      await service.syncOfflineChanges('school-1', 'user-1');
      expect(mockRepository.syncOfflineChanges).toHaveBeenCalledWith('user-1');
    });

    it('should pass correct arguments to getOfflineSyncStatus', async () => {
      mockRepository.getOfflineSyncStatus.mockResolvedValue({ pending: 0 });
      const service = createOfflineService(mockRepository as any);
      await service.getOfflineSyncStatus('school-1', 'user-1');
      expect(mockRepository.getOfflineSyncStatus).toHaveBeenCalledWith('user-1');
    });

    it('should pass correct arguments to updateOfflineDocument', async () => {
      mockRepository.updateOfflineDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createOfflineService(mockRepository as any);
      await service.updateOfflineDocument('doc-1', 'user-1', { name: 'Test' });
      expect(mockRepository.updateOfflineDocument).toHaveBeenCalledWith('doc-1', 'user-1', { name: 'Test' });
    });

    it('should handle document not found in markForOffline', async () => {
      mockRepository.getDocument.mockResolvedValue(undefined);
      const service = createOfflineService(mockRepository as any);
      await expect(service.markForOffline('doc-999', 'user-1')).rejects.toThrow();
    });
  });
});
