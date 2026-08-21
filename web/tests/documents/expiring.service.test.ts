import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExpiringService } from '../../src/features/documents/services/expiring.service';

describe('ExpiringService', () => {
  let mockRepository: {
    getExpiredDocuments: ReturnType<typeof vi.fn>;
    getDocument: ReturnType<typeof vi.fn>;
    getDocumentStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getExpiredDocuments: vi.fn(),
      getDocument: vi.fn(),
      getDocumentStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createExpiringService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getExpiringDocuments).toBeInstanceOf(Function);
    expect(service.getExpiringDocument).toBeInstanceOf(Function);
    expect(service.createExpiry).toBeInstanceOf(Function);
    expect(service.updateExpiry).toBeInstanceOf(Function);
    expect(service.deleteExpiry).toBeInstanceOf(Function);
    expect(service.extendExpiry).toBeInstanceOf(Function);
    expect(service.getExpiryStats).toBeInstanceOf(Function);
  });

  describe('getExpiringDocuments', () => {
    it('should return expiring documents', async () => {
      const documents = [{ id: 'doc-1', expiresAt: '2026-02-01T00:00:00Z' }];
      mockRepository.getExpiredDocuments.mockResolvedValue(documents);
      const service = createExpiringService(mockRepository);
      const result = await service.getExpiringDocuments('school-1', 'user-1');
      expect(result).toEqual(documents);
      expect(mockRepository.getExpiredDocuments).toHaveBeenCalledWith('school-1');
    });

    it('should throw when schoolId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiringDocuments('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiringDocuments('school-1', '')).rejects.toThrow();
    });

    it('should return empty array when no documents are expiring', async () => {
      mockRepository.getExpiredDocuments.mockResolvedValue([]);
      const service = createExpiringService(mockRepository);
      const result = await service.getExpiringDocuments('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should propagate repository errors', async () => {
      mockRepository.getExpiredDocuments.mockRejectedValue(new Error('Query failed'));
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiringDocuments('school-1', 'user-1')).rejects.toThrow('Query failed');
    });
  });

  describe('getExpiringDocument', () => {
    it('should fetch an expiring document', async () => {
      const document = { id: 'doc-1', expiresAt: '2026-02-01T00:00:00Z' };
      mockRepository.getDocument.mockResolvedValue(document);
      const service = createExpiringService(mockRepository);
      const result = await service.getExpiringDocument('doc-1', 'school-1');
      expect(result).toEqual(document);
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiringDocument('', 'school-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiringDocument('doc-1', '')).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiringDocument('doc-1', 'school-1')).rejects.toThrow();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Not found'));
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiringDocument('doc-1', 'school-1')).rejects.toThrow('Not found');
    });
  });

  describe('createExpiry', () => {
    it('should create an expiry successfully', async () => {
      const document = { id: 'doc-1' };
      const data = { expiresAt: '2026-06-01T00:00:00Z', reason: 'Policy' };
      mockRepository.getDocument.mockResolvedValue(document);
      const service = createExpiringService(mockRepository);
      const result = await service.createExpiry('doc-1', 'school-1', 'user-1', data);
      expect(result).toBeDefined();
      expect(result.documentId).toBe('doc-1');
      expect(result.createdBy).toBe('user-1');
      expect(result.expiresAt).toBe('2026-06-01T00:00:00Z');
    });

    it('should throw when documentId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.createExpiry('', 'school-1', 'user-1', { expiresAt: '2026-06-01T00:00:00Z' })).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.createExpiry('doc-1', '', 'user-1', { expiresAt: '2026-06-01T00:00:00Z' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.createExpiry('doc-1', 'school-1', '', { expiresAt: '2026-06-01T00:00:00Z' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.createExpiry('doc-1', 'school-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createExpiringService(mockRepository);
      await expect(service.createExpiry('doc-1', 'school-1', 'user-1', { expiresAt: '2026-06-01T00:00:00Z' })).rejects.toThrow();
    });

    it('should include createdAt timestamp', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createExpiringService(mockRepository);
      const result = await service.createExpiry('doc-1', 'school-1', 'user-1', { expiresAt: '2026-06-01T00:00:00Z' });
      expect(result.createdAt).toBeDefined();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Write failed'));
      const service = createExpiringService(mockRepository);
      await expect(service.createExpiry('doc-1', 'school-1', 'user-1', { expiresAt: '2026-06-01T00:00:00Z' })).rejects.toThrow('Write failed');
    });
  });

  describe('updateExpiry', () => {
    it('should update an expiry successfully', async () => {
      const document = { id: 'doc-1' };
      const data = { expiresAt: '2026-08-01T00:00:00Z' };
      mockRepository.getDocument.mockResolvedValue(document);
      const service = createExpiringService(mockRepository);
      const result = await service.updateExpiry('doc-1', 'school-1', 'user-1', data);
      expect(result).toBeDefined();
      expect(result.documentId).toBe('doc-1');
      expect(result.updatedBy).toBe('user-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.updateExpiry('', 'school-1', 'user-1', { expiresAt: '2026-08-01T00:00:00Z' })).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.updateExpiry('doc-1', '', 'user-1', { expiresAt: '2026-08-01T00:00:00Z' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.updateExpiry('doc-1', 'school-1', '', { expiresAt: '2026-08-01T00:00:00Z' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.updateExpiry('doc-1', 'school-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createExpiringService(mockRepository);
      await expect(service.updateExpiry('doc-1', 'school-1', 'user-1', { expiresAt: '2026-08-01T00:00:00Z' })).rejects.toThrow();
    });

    it('should include updatedAt timestamp', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createExpiringService(mockRepository);
      const result = await service.updateExpiry('doc-1', 'school-1', 'user-1', { expiresAt: '2026-08-01T00:00:00Z' });
      expect(result.updatedAt).toBeDefined();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Update failed'));
      const service = createExpiringService(mockRepository);
      await expect(service.updateExpiry('doc-1', 'school-1', 'user-1', { expiresAt: '2026-08-01T00:00:00Z' })).rejects.toThrow('Update failed');
    });
  });

  describe('deleteExpiry', () => {
    it('should delete an expiry successfully', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createExpiringService(mockRepository);
      await service.deleteExpiry('doc-1', 'school-1', 'user-1');
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.deleteExpiry('', 'school-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.deleteExpiry('doc-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.deleteExpiry('doc-1', 'school-1', '')).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createExpiringService(mockRepository);
      await expect(service.deleteExpiry('doc-1', 'school-1', 'user-1')).rejects.toThrow();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Delete failed'));
      const service = createExpiringService(mockRepository);
      await expect(service.deleteExpiry('doc-1', 'school-1', 'user-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('extendExpiry', () => {
    it('should extend an expiry successfully', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createExpiringService(mockRepository);
      const result = await service.extendExpiry('doc-1', 'school-1', 'user-1', 30);
      expect(result).toBeDefined();
      expect(result.documentId).toBe('doc-1');
      expect(result.extendedBy).toBe(30);
      expect(result.extendedAt).toBeDefined();
    });

    it('should throw when documentId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.extendExpiry('', 'school-1', 'user-1', 30)).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.extendExpiry('doc-1', '', 'user-1', 30)).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.extendExpiry('doc-1', 'school-1', '', 30)).rejects.toThrow();
    });

    it('should throw when extensionDays is zero', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.extendExpiry('doc-1', 'school-1', 'user-1', 0)).rejects.toThrow();
    });

    it('should throw when extensionDays is negative', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.extendExpiry('doc-1', 'school-1', 'user-1', -5)).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createExpiringService(mockRepository);
      await expect(service.extendExpiry('doc-1', 'school-1', 'user-1', 30)).rejects.toThrow();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Extension failed'));
      const service = createExpiringService(mockRepository);
      await expect(service.extendExpiry('doc-1', 'school-1', 'user-1', 30)).rejects.toThrow('Extension failed');
    });
  });

  describe('getExpiryStats', () => {
    it('should fetch expiry stats successfully', async () => {
      const stats = { expiringCount: 5, expiredCount: 3 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createExpiringService(mockRepository);
      const result = await service.getExpiryStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith('school-1');
    });

    it('should throw when schoolId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiryStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiryStats('school-1', '')).rejects.toThrow();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createExpiringService(mockRepository);
      await expect(service.getExpiryStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });
});
