import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createLockService } from '../../src/features/documents/services/lock.service';

describe('LockService', () => {
  const mockRepository = {
    lockDocument: vi.fn(),
    unlockDocument: vi.fn(),
    getLockedDocuments: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';
  const documentId = 'doc-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create service with all methods', () => {
    const service = createLockService(mockRepository as any);
    expect(service.lockDocument).toBeDefined();
    expect(service.unlockDocument).toBeDefined();
    expect(service.getLockedDocuments).toBeDefined();
    expect(service.forceUnlock).toBeDefined();
  });

  describe('lockDocument', () => {
    it('should lock document', async () => {
      const lock = { id: 'lock-1', documentId, userId, lockedAt: new Date().toISOString() };
      mockRepository.lockDocument.mockResolvedValue(lock);
      const service = createLockService(mockRepository as any);
      const result = await service.lockDocument(documentId, schoolId, userId);
      expect(result.id).toBe('lock-1');
    });

    it('should throw on missing documentId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.lockDocument('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.lockDocument(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.lockDocument(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.lockDocument.mockRejectedValue(new Error('Document already locked'));
      const service = createLockService(mockRepository as any);
      await expect(service.lockDocument(documentId, schoolId, userId)).rejects.toThrow('Document already locked');
    });

    it('should call repository with documentId, userId, and schoolId', async () => {
      mockRepository.lockDocument.mockResolvedValue({ id: 'lock-1' });
      const service = createLockService(mockRepository as any);
      await service.lockDocument(documentId, schoolId, userId);
      expect(mockRepository.lockDocument).toHaveBeenCalledWith(documentId, userId, schoolId);
    });

    it('should return lock with timestamp', async () => {
      const lock = { id: 'lock-1', lockedAt: '2026-01-01T10:00:00Z' };
      mockRepository.lockDocument.mockResolvedValue(lock);
      const service = createLockService(mockRepository as any);
      const result = await service.lockDocument(documentId, schoolId, userId);
      expect(result.lockedAt).toBeDefined();
    });

    it('should handle document not found', async () => {
      mockRepository.lockDocument.mockRejectedValue(new Error('Document not found'));
      const service = createLockService(mockRepository as any);
      await expect(service.lockDocument(documentId, schoolId, userId)).rejects.toThrow('Document not found');
    });

    it('should handle permission denied', async () => {
      mockRepository.lockDocument.mockRejectedValue(new Error('Permission denied'));
      const service = createLockService(mockRepository as any);
      await expect(service.lockDocument(documentId, schoolId, userId)).rejects.toThrow('Permission denied');
    });

    it('should return lock with user info', async () => {
      const lock = { id: 'lock-1', userId, userName: 'John Doe' };
      mockRepository.lockDocument.mockResolvedValue(lock);
      const service = createLockService(mockRepository as any);
      const result = await service.lockDocument(documentId, schoolId, userId);
      expect(result.userName).toBe('John Doe');
    });
  });

  describe('unlockDocument', () => {
    it('should unlock document', async () => {
      mockRepository.unlockDocument.mockResolvedValue(undefined);
      const service = createLockService(mockRepository as any);
      await service.unlockDocument(documentId, schoolId, userId);
      expect(mockRepository.unlockDocument).toHaveBeenCalledWith(documentId, userId);
    });

    it('should throw on missing documentId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.unlockDocument('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.unlockDocument(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.unlockDocument(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.unlockDocument.mockRejectedValue(new Error('Not locked by user'));
      const service = createLockService(mockRepository as any);
      await expect(service.unlockDocument(documentId, schoolId, userId)).rejects.toThrow('Not locked by user');
    });

    it('should call repository with correct parameters', async () => {
      mockRepository.unlockDocument.mockResolvedValue(undefined);
      const service = createLockService(mockRepository as any);
      await service.unlockDocument(documentId, schoolId, userId);
      expect(mockRepository.unlockDocument).toHaveBeenCalledWith(documentId, userId);
    });

    it('should handle document not locked', async () => {
      mockRepository.unlockDocument.mockRejectedValue(new Error('Document is not locked'));
      const service = createLockService(mockRepository as any);
      await expect(service.unlockDocument(documentId, schoolId, userId)).rejects.toThrow('Document is not locked');
    });

    it('should handle lock expired', async () => {
      mockRepository.unlockDocument.mockRejectedValue(new Error('Lock has expired'));
      const service = createLockService(mockRepository as any);
      await expect(service.unlockDocument(documentId, schoolId, userId)).rejects.toThrow('Lock has expired');
    });

    it('should handle permission denied', async () => {
      mockRepository.unlockDocument.mockRejectedValue(new Error('Permission denied'));
      const service = createLockService(mockRepository as any);
      await expect(service.unlockDocument(documentId, schoolId, userId)).rejects.toThrow('Permission denied');
    });
  });

  describe('getLockedDocuments', () => {
    it('should return locked documents', async () => {
      const docs = [{ id: 'd1', lockedBy: 'u1' }, { id: 'd2', lockedBy: 'u2' }];
      mockRepository.getLockedDocuments.mockResolvedValue(docs);
      const service = createLockService(mockRepository as any);
      const result = await service.getLockedDocuments(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.getLockedDocuments('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.getLockedDocuments(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no locked documents', async () => {
      mockRepository.getLockedDocuments.mockResolvedValue([]);
      const service = createLockService(mockRepository as any);
      const result = await service.getLockedDocuments(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getLockedDocuments.mockRejectedValue(new Error('Fetch failed'));
      const service = createLockService(mockRepository as any);
      await expect(service.getLockedDocuments(schoolId, userId)).rejects.toThrow('Fetch failed');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getLockedDocuments.mockResolvedValue([]);
      const service = createLockService(mockRepository as any);
      await service.getLockedDocuments(schoolId, userId);
      expect(mockRepository.getLockedDocuments).toHaveBeenCalledWith(schoolId);
    });

    it('should return documents with lock info', async () => {
      const docs = [{ id: 'd1', lockedBy: 'u1', lockedAt: '2026-01-01' }];
      mockRepository.getLockedDocuments.mockResolvedValue(docs);
      const service = createLockService(mockRepository as any);
      const result = await service.getLockedDocuments(schoolId, userId);
      expect(result[0].lockedAt).toBeDefined();
    });

    it('should handle many locked documents', async () => {
      const docs = Array.from({ length: 25 }, (_, i) => ({ id: `d${i}` }));
      mockRepository.getLockedDocuments.mockResolvedValue(docs);
      const service = createLockService(mockRepository as any);
      const result = await service.getLockedDocuments(schoolId, userId);
      expect(result).toHaveLength(25);
    });

    it('should handle documents locked by different users', async () => {
      const docs = [{ id: 'd1', lockedBy: 'u1' }, { id: 'd2', lockedBy: 'u2' }, { id: 'd3', lockedBy: 'u3' }];
      mockRepository.getLockedDocuments.mockResolvedValue(docs);
      const service = createLockService(mockRepository as any);
      const result = await service.getLockedDocuments(schoolId, userId);
      expect(result).toHaveLength(3);
    });
  });

  describe('forceUnlock', () => {
    it('should force unlock document', async () => {
      mockRepository.unlockDocument.mockResolvedValue(undefined);
      const service = createLockService(mockRepository as any);
      await service.forceUnlock(documentId, schoolId, userId);
      expect(mockRepository.unlockDocument).toHaveBeenCalledWith(documentId, userId);
    });

    it('should throw on missing documentId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.forceUnlock('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.forceUnlock(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createLockService(mockRepository as any);
      await expect(service.forceUnlock(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.unlockDocument.mockRejectedValue(new Error('Force unlock failed'));
      const service = createLockService(mockRepository as any);
      await expect(service.forceUnlock(documentId, schoolId, userId)).rejects.toThrow('Force unlock failed');
    });

    it('should call repository with documentId and userId', async () => {
      mockRepository.unlockDocument.mockResolvedValue(undefined);
      const service = createLockService(mockRepository as any);
      await service.forceUnlock(documentId, schoolId, userId);
      expect(mockRepository.unlockDocument).toHaveBeenCalledWith(documentId, userId);
    });

    it('should handle document not found', async () => {
      mockRepository.unlockDocument.mockRejectedValue(new Error('Document not found'));
      const service = createLockService(mockRepository as any);
      await expect(service.forceUnlock(documentId, schoolId, userId)).rejects.toThrow('Document not found');
    });

    it('should handle admin permission required', async () => {
      mockRepository.unlockDocument.mockRejectedValue(new Error('Admin permission required'));
      const service = createLockService(mockRepository as any);
      await expect(service.forceUnlock(documentId, schoolId, userId)).rejects.toThrow('Admin permission required');
    });

    it('should handle document not locked', async () => {
      mockRepository.unlockDocument.mockRejectedValue(new Error('Document is not locked'));
      const service = createLockService(mockRepository as any);
      await expect(service.forceUnlock(documentId, schoolId, userId)).rejects.toThrow('Document is not locked');
    });
  });
});
