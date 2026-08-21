import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDownloadService } from '../../src/features/documents/services/download.service';

describe('DownloadService', () => {
  const mockRepository = {
    getDocuments: vi.fn(),
    getDocument: vi.fn(),
    getFileMetadata: vi.fn(),
    getUserActivities: vi.fn(),
    getDocumentStats: vi.fn(),
    getShareLinks: vi.fn(),
    createShareLink: vi.fn(),
    revokeShareLink: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';
  const documentId = 'doc-1';
  const linkId = 'link-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create service with all methods', () => {
    const service = createDownloadService(mockRepository as any);
    expect(service.downloadDocument).toBeDefined();
    expect(service.getDownloadHistory).toBeDefined();
    expect(service.getDownloadStats).toBeDefined();
    expect(service.getDownloadLinks).toBeDefined();
    expect(service.createDownloadLink).toBeDefined();
    expect(service.revokeDownloadLink).toBeDefined();
  });

  describe('downloadDocument', () => {
    it('should download document with metadata', async () => {
      const doc = { id: documentId, name: 'doc.pdf' };
      const metadata = { size: 1024, mimeType: 'application/pdf' };
      mockRepository.getDocument.mockResolvedValue(doc);
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createDownloadService(mockRepository as any);
      const result = await service.downloadDocument(documentId, schoolId, userId);
      expect(result.document.id).toBe(documentId);
      expect(result.metadata.size).toBe(1024);
    });

    it('should throw when document not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createDownloadService(mockRepository as any);
      await expect(service.downloadDocument(documentId, schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing documentId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.downloadDocument('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.downloadDocument(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.downloadDocument(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Download failed'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.downloadDocument(documentId, schoolId, userId)).rejects.toThrow('Download failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      mockRepository.getFileMetadata.mockResolvedValue({ size: 1024 });
      const service = createDownloadService(mockRepository as any);
      await service.downloadDocument(documentId, schoolId, userId);
      expect(mockRepository.getDocument).toHaveBeenCalledWith(documentId);
    });

    it('should return document with name', async () => {
      const doc = { id: documentId, name: 'report.pdf' };
      mockRepository.getDocument.mockResolvedValue(doc);
      mockRepository.getFileMetadata.mockResolvedValue({ size: 2048 });
      const service = createDownloadService(mockRepository as any);
      const result = await service.downloadDocument(documentId, schoolId, userId);
      expect(result.document.name).toBe('report.pdf');
    });

    it('should handle large documents', async () => {
      const doc = { id: documentId, size: 500 * 1024 * 1024 };
      mockRepository.getDocument.mockResolvedValue(doc);
      mockRepository.getFileMetadata.mockResolvedValue({ size: 500 * 1024 * 1024 });
      const service = createDownloadService(mockRepository as any);
      const result = await service.downloadDocument(documentId, schoolId, userId);
      expect(result.metadata.size).toBe(500 * 1024 * 1024);
    });

    it('should handle document not found after metadata fetch', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      mockRepository.getFileMetadata.mockResolvedValue({ size: 1024 });
      const service = createDownloadService(mockRepository as any);
      await expect(service.downloadDocument(documentId, schoolId, userId)).rejects.toThrow();
    });
  });

  describe('getDownloadHistory', () => {
    it('should return download history', async () => {
      const activities = [{ id: 'a1', action: 'download', date: '2026-01-01' }];
      mockRepository.getUserActivities.mockResolvedValue(activities);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadHistory(schoolId, userId);
      expect(result).toHaveLength(1);
    });

    it('should throw on missing schoolId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadHistory('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadHistory(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no history', async () => {
      mockRepository.getUserActivities.mockResolvedValue([]);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadHistory(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getUserActivities.mockRejectedValue(new Error('History fetch failed'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadHistory(schoolId, userId)).rejects.toThrow('History fetch failed');
    });

    it('should call repository with schoolId and userId', async () => {
      mockRepository.getUserActivities.mockResolvedValue([]);
      const service = createDownloadService(mockRepository as any);
      await service.getDownloadHistory(schoolId, userId);
      expect(mockRepository.getUserActivities).toHaveBeenCalledWith(schoolId, userId);
    });

    it('should return activities with timestamps', async () => {
      const activities = [{ id: 'a1', action: 'download', timestamp: '2026-01-01T10:00:00Z' }];
      mockRepository.getUserActivities.mockResolvedValue(activities);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadHistory(schoolId, userId);
      expect(result[0].timestamp).toBeDefined();
    });

    it('should handle many download activities', async () => {
      const activities = Array.from({ length: 100 }, (_, i) => ({ id: 'a' + i }));
      mockRepository.getUserActivities.mockResolvedValue(activities);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadHistory(schoolId, userId);
      expect(result).toHaveLength(100);
    });

    it('should handle different download types', async () => {
      const activities = [{ id: 'a1', action: 'download' }, { id: 'a2', action: 'preview' }];
      mockRepository.getUserActivities.mockResolvedValue(activities);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadHistory(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should handle network timeout', async () => {
      mockRepository.getUserActivities.mockRejectedValue(new Error('Network timeout'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadHistory(schoolId, userId)).rejects.toThrow('Network timeout');
    });
  });

  describe('getDownloadStats', () => {
    it('should return download stats', async () => {
      const stats = { totalDownloads: 200, uniqueUsers: 50 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadStats(schoolId, userId);
      expect(result.totalDownloads).toBe(200);
    });

    it('should throw on missing schoolId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadStats('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadStats(schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Stats error'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadStats(schoolId, userId)).rejects.toThrow('Stats error');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getDocumentStats.mockResolvedValue({});
      const service = createDownloadService(mockRepository as any);
      await service.getDownloadStats(schoolId, userId);
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith(schoolId, undefined, undefined);
    });

    it('should return stats with date range', async () => {
      const stats = { totalDownloads: 100, dateFrom: '2026-01-01', dateTo: '2026-01-31' };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadStats(schoolId, userId, '2026-01-01', '2026-01-31');
      expect(result.dateFrom).toBe('2026-01-01');
    });

    it('should handle zero downloads', async () => {
      mockRepository.getDocumentStats.mockResolvedValue({ totalDownloads: 0 });
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadStats(schoolId, userId);
      expect(result.totalDownloads).toBe(0);
    });

    it('should handle stats with top documents', async () => {
      const stats = { totalDownloads: 100, topDocuments: [{ id: 'd1', downloads: 20 }] };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadStats(schoolId, userId);
      expect(result.topDocuments).toHaveLength(1);
    });

    it('should handle database error', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Database error'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadStats(schoolId, userId)).rejects.toThrow('Database error');
    });

    it('should handle stats with trends', async () => {
      const stats = { totalDownloads: 100, trend: { daily: 10, weekly: 70 } };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadStats(schoolId, userId);
      expect(result.trend.daily).toBe(10);
    });
  });

  describe('getDownloadLinks', () => {
    it('should return download links', async () => {
      const links = [{ id: 'l1', url: 'https://example.com/download/doc-1' }];
      mockRepository.getShareLinks.mockResolvedValue(links);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadLinks(documentId, userId);
      expect(result).toHaveLength(1);
    });

    it('should throw on missing documentId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadLinks('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadLinks(documentId, '')).rejects.toThrow();
    });

    it('should return empty array when no links', async () => {
      mockRepository.getShareLinks.mockResolvedValue([]);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadLinks(documentId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getShareLinks.mockRejectedValue(new Error('Links fetch failed'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadLinks(documentId, userId)).rejects.toThrow('Links fetch failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getShareLinks.mockResolvedValue([]);
      const service = createDownloadService(mockRepository as any);
      await service.getDownloadLinks(documentId, userId);
      expect(mockRepository.getShareLinks).toHaveBeenCalledWith(documentId);
    });

    it('should return links with expiration', async () => {
      const links = [{ id: 'l1', expiresAt: '2026-12-31' }];
      mockRepository.getShareLinks.mockResolvedValue(links);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadLinks(documentId, userId);
      expect(result[0].expiresAt).toBeDefined();
    });

    it('should handle many links', async () => {
      const links = Array.from({ length: 20 }, (_, i) => ({ id: 'l' + i }));
      mockRepository.getShareLinks.mockResolvedValue(links);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadLinks(documentId, userId);
      expect(result).toHaveLength(20);
    });

    it('should handle expired links', async () => {
      const links = [{ id: 'l1', expired: true }];
      mockRepository.getShareLinks.mockResolvedValue(links);
      const service = createDownloadService(mockRepository as any);
      const result = await service.getDownloadLinks(documentId, userId);
      expect(result[0].expired).toBe(true);
    });

    it('should handle network error', async () => {
      mockRepository.getShareLinks.mockRejectedValue(new Error('Network error'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.getDownloadLinks(documentId, userId)).rejects.toThrow('Network error');
    });
  });

  describe('createDownloadLink', () => {
    it('should create download link', async () => {
      const options = { expiresAt: '2026-12-31', maxDownloads: 10 };
      const link = { id: linkId, url: 'https://example.com/dl/doc-1', ...options };
      mockRepository.createShareLink.mockResolvedValue(link);
      const service = createDownloadService(mockRepository as any);
      const result = await service.createDownloadLink(documentId, schoolId, userId, options);
      expect(result.id).toBe(linkId);
    });

    it('should throw on missing documentId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.createDownloadLink('', schoolId, userId, {})).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.createDownloadLink(documentId, '', userId, {})).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.createDownloadLink(documentId, schoolId, '', {})).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.createShareLink.mockRejectedValue(new Error('Link creation failed'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.createDownloadLink(documentId, schoolId, userId, {})).rejects.toThrow('Link creation failed');
    });

    it('should call repository with documentId and options', async () => {
      mockRepository.createShareLink.mockResolvedValue({ id: linkId });
      const service = createDownloadService(mockRepository as any);
      const options = { maxDownloads: 5 };
      await service.createDownloadLink(documentId, schoolId, userId, options);
      expect(mockRepository.createShareLink).toHaveBeenCalledWith(documentId, options);
    });

    it('should return link with url', async () => {
      const link = { id: linkId, url: 'https://example.com/dl/doc-1' };
      mockRepository.createShareLink.mockResolvedValue(link);
      const service = createDownloadService(mockRepository as any);
      const result = await service.createDownloadLink(documentId, schoolId, userId, {});
      expect(result.url).toContain('https://');
    });

    it('should handle password protected links', async () => {
      const options = { password: 'secret123' };
      const link = { id: linkId, passwordProtected: true };
      mockRepository.createShareLink.mockResolvedValue(link);
      const service = createDownloadService(mockRepository as any);
      const result = await service.createDownloadLink(documentId, schoolId, userId, options);
      expect(result.passwordProtected).toBe(true);
    });

    it('should handle public links', async () => {
      const options = { isPublic: true };
      const link = { id: linkId, isPublic: true };
      mockRepository.createShareLink.mockResolvedValue(link);
      const service = createDownloadService(mockRepository as any);
      const result = await service.createDownloadLink(documentId, schoolId, userId, options);
      expect(result.isPublic).toBe(true);
    });

    it('should handle link creation with expiry', async () => {
      const options = { expiresAt: '2026-06-30' };
      const link = { id: linkId, expiresAt: '2026-06-30' };
      mockRepository.createShareLink.mockResolvedValue(link);
      const service = createDownloadService(mockRepository as any);
      const result = await service.createDownloadLink(documentId, schoolId, userId, options);
      expect(result.expiresAt).toBe('2026-06-30');
    });
  });

  describe('revokeDownloadLink', () => {
    it('should revoke download link', async () => {
      mockRepository.revokeShareLink.mockResolvedValue(undefined);
      const service = createDownloadService(mockRepository as any);
      await service.revokeDownloadLink(linkId, userId);
      expect(mockRepository.revokeShareLink).toHaveBeenCalledWith(linkId);
    });

    it('should throw on missing linkId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.revokeDownloadLink('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createDownloadService(mockRepository as any);
      await expect(service.revokeDownloadLink(linkId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.revokeShareLink.mockRejectedValue(new Error('Revoke failed'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.revokeDownloadLink(linkId, userId)).rejects.toThrow('Revoke failed');
    });

    it('should call repository with linkId', async () => {
      mockRepository.revokeShareLink.mockResolvedValue(undefined);
      const service = createDownloadService(mockRepository as any);
      await service.revokeDownloadLink(linkId, userId);
      expect(mockRepository.revokeShareLink).toHaveBeenCalledWith(linkId);
    });

    it('should handle link not found', async () => {
      mockRepository.revokeShareLink.mockRejectedValue(new Error('Link not found'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.revokeDownloadLink(linkId, userId)).rejects.toThrow('Link not found');
    });

    it('should handle already revoked link', async () => {
      mockRepository.revokeShareLink.mockRejectedValue(new Error('Link already revoked'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.revokeDownloadLink(linkId, userId)).rejects.toThrow('Link already revoked');
    });

    it('should handle permission denied', async () => {
      mockRepository.revokeShareLink.mockRejectedValue(new Error('Permission denied'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.revokeDownloadLink(linkId, userId)).rejects.toThrow('Permission denied');
    });

    it('should handle network timeout', async () => {
      mockRepository.revokeShareLink.mockRejectedValue(new Error('Network timeout'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.revokeDownloadLink(linkId, userId)).rejects.toThrow('Network timeout');
    });

    it('should handle concurrent revocation', async () => {
      mockRepository.revokeShareLink.mockRejectedValue(new Error('Link is being revoked'));
      const service = createDownloadService(mockRepository as any);
      await expect(service.revokeDownloadLink(linkId, userId)).rejects.toThrow('Link is being revoked');
    });
  });
});
