import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPrintService } from '../../src/features/documents/services/print.service';

describe('PrintService', () => {
  const mockRepository = {
    getDocuments: vi.fn(),
    getDocument: vi.fn(),
    getFileMetadata: vi.fn(),
    getUserActivities: vi.fn(),
    getDocumentStats: vi.fn(),
    getStorageUsage: vi.fn(),
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
    const service = createPrintService(mockRepository as any);
    expect(service.printDocument).toBeDefined();
    expect(service.getPrintHistory).toBeDefined();
    expect(service.getPrintStats).toBeDefined();
    expect(service.getPrinters).toBeDefined();
    expect(service.getPrintConfig).toBeDefined();
    expect(service.updatePrintConfig).toBeDefined();
  });

  describe('printDocument', () => {
    it('should print document with options', async () => {
      const doc = { id: documentId, name: 'doc.pdf' };
      const metadata = { size: 1024, pages: 5 };
      const options = { printerId: 'printer-1', copies: 2, paperSize: 'A4', color: true };
      mockRepository.getDocument.mockResolvedValue(doc);
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createPrintService(mockRepository as any);
      const result = await service.printDocument(documentId, schoolId, userId, options);
      expect(result.document.id).toBe(documentId);
      expect(result.options.copies).toBe(2);
    });

    it('should throw when document not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createPrintService(mockRepository as any);
      await expect(service.printDocument(documentId, schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing documentId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.printDocument('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.printDocument(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.printDocument(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Print failed'));
      const service = createPrintService(mockRepository as any);
      await expect(service.printDocument(documentId, schoolId, userId)).rejects.toThrow('Print failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      mockRepository.getFileMetadata.mockResolvedValue({ size: 1024 });
      const service = createPrintService(mockRepository as any);
      await service.printDocument(documentId, schoolId, userId);
      expect(mockRepository.getDocument).toHaveBeenCalledWith(documentId);
    });

    it('should return document with metadata', async () => {
      const doc = { id: documentId, name: 'report.pdf' };
      const metadata = { size: 2048, pages: 10 };
      mockRepository.getDocument.mockResolvedValue(doc);
      mockRepository.getFileMetadata.mockResolvedValue(metadata);
      const service = createPrintService(mockRepository as any);
      const result = await service.printDocument(documentId, schoolId, userId);
      expect(result.metadata.pages).toBe(10);
    });

    it('should handle large documents', async () => {
      const doc = { id: documentId, size: 100 * 1024 * 1024 };
      mockRepository.getDocument.mockResolvedValue(doc);
      mockRepository.getFileMetadata.mockResolvedValue({ size: 100 * 1024 * 1024 });
      const service = createPrintService(mockRepository as any);
      const result = await service.printDocument(documentId, schoolId, userId);
      expect(result.document.size).toBe(100 * 1024 * 1024);
    });

    it('should handle print without options', async () => {
      const doc = { id: documentId };
      mockRepository.getDocument.mockResolvedValue(doc);
      mockRepository.getFileMetadata.mockResolvedValue({ size: 1024 });
      const service = createPrintService(mockRepository as any);
      const result = await service.printDocument(documentId, schoolId, userId);
      expect(result.document.id).toBe(documentId);
    });
  });

  describe('getPrintHistory', () => {
    it('should return print history', async () => {
      const activities = [{ id: 'a1', action: 'print', date: '2026-01-01' }];
      mockRepository.getUserActivities.mockResolvedValue(activities);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintHistory(schoolId, userId);
      expect(result).toHaveLength(1);
    });

    it('should throw on missing schoolId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintHistory('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintHistory(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no history', async () => {
      mockRepository.getUserActivities.mockResolvedValue([]);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintHistory(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getUserActivities.mockRejectedValue(new Error('History fetch failed'));
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintHistory(schoolId, userId)).rejects.toThrow('History fetch failed');
    });

    it('should call repository with schoolId and userId', async () => {
      mockRepository.getUserActivities.mockResolvedValue([]);
      const service = createPrintService(mockRepository as any);
      await service.getPrintHistory(schoolId, userId);
      expect(mockRepository.getUserActivities).toHaveBeenCalledWith(schoolId, userId);
    });

    it('should return activities with timestamps', async () => {
      const activities = [{ id: 'a1', action: 'print', timestamp: '2026-01-01T10:00:00Z' }];
      mockRepository.getUserActivities.mockResolvedValue(activities);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintHistory(schoolId, userId);
      expect(result[0].timestamp).toBeDefined();
    });

    it('should handle many print activities', async () => {
      const activities = Array.from({ length: 50 }, (_, i) => ({ id: 'a' + i }));
      mockRepository.getUserActivities.mockResolvedValue(activities);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintHistory(schoolId, userId);
      expect(result).toHaveLength(50);
    });

    it('should handle different activity types', async () => {
      const activities = [{ id: 'a1', action: 'print' }, { id: 'a2', action: 'download' }];
      mockRepository.getUserActivities.mockResolvedValue(activities);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintHistory(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should handle network timeout', async () => {
      mockRepository.getUserActivities.mockRejectedValue(new Error('Network timeout'));
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintHistory(schoolId, userId)).rejects.toThrow('Network timeout');
    });
  });

  describe('getPrintStats', () => {
    it('should return print stats', async () => {
      const stats = { totalPrints: 150, uniqueUsers: 30 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintStats(schoolId, userId);
      expect(result.totalPrints).toBe(150);
    });

    it('should throw on missing schoolId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintStats('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintStats(schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Stats error'));
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintStats(schoolId, userId)).rejects.toThrow('Stats error');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getDocumentStats.mockResolvedValue({});
      const service = createPrintService(mockRepository as any);
      await service.getPrintStats(schoolId, userId);
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith(schoolId, undefined, undefined);
    });

    it('should return stats with date range', async () => {
      const stats = { totalPrints: 50, dateFrom: '2026-01-01', dateTo: '2026-01-31' };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintStats(schoolId, userId, '2026-01-01', '2026-01-31');
      expect(result.dateFrom).toBe('2026-01-01');
    });

    it('should handle zero prints', async () => {
      mockRepository.getDocumentStats.mockResolvedValue({ totalPrints: 0 });
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintStats(schoolId, userId);
      expect(result.totalPrints).toBe(0);
    });

    it('should handle stats with top documents', async () => {
      const stats = { totalPrints: 100, topDocuments: [{ id: 'd1', prints: 20 }] };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintStats(schoolId, userId);
      expect(result.topDocuments).toHaveLength(1);
    });

    it('should handle database error', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Database error'));
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintStats(schoolId, userId)).rejects.toThrow('Database error');
    });

    it('should handle stats with trends', async () => {
      const stats = { totalPrints: 100, trend: { daily: 5, weekly: 35 } };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintStats(schoolId, userId);
      expect(result.trend.daily).toBe(5);
    });
  });

  describe('getPrinters', () => {
    it('should return available printers', async () => {
      const quotas = [{ id: 'p1', name: 'Printer 1', status: 'online' }];
      mockRepository.getStorageUsage.mockResolvedValue(quotas);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrinters(schoolId, userId);
      expect(result).toHaveLength(1);
    });

    it('should throw on missing schoolId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrinters('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrinters(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no printers', async () => {
      mockRepository.getStorageUsage.mockResolvedValue([]);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrinters(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getStorageUsage.mockRejectedValue(new Error('Printers unavailable'));
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrinters(schoolId, userId)).rejects.toThrow('Printers unavailable');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getStorageUsage.mockResolvedValue([]);
      const service = createPrintService(mockRepository as any);
      await service.getPrinters(schoolId, userId);
      expect(mockRepository.getStorageUsage).toHaveBeenCalledWith(schoolId);
    });

    it('should return printers with status', async () => {
      const quotas = [{ id: 'p1', name: 'HP LaserJet', status: 'online' }];
      mockRepository.getStorageUsage.mockResolvedValue(quotas);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrinters(schoolId, userId);
      expect(result[0].status).toBe('online');
    });

    it('should handle multiple printers', async () => {
      const quotas = [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }];
      mockRepository.getStorageUsage.mockResolvedValue(quotas);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrinters(schoolId, userId);
      expect(result).toHaveLength(3);
    });

    it('should handle offline printers', async () => {
      const quotas = [{ id: 'p1', status: 'offline' }];
      mockRepository.getStorageUsage.mockResolvedValue(quotas);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrinters(schoolId, userId);
      expect(result[0].status).toBe('offline');
    });

    it('should handle network error', async () => {
      mockRepository.getStorageUsage.mockRejectedValue(new Error('Network error'));
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrinters(schoolId, userId)).rejects.toThrow('Network error');
    });
  });

  describe('getPrintConfig', () => {
    it('should return print config', async () => {
      const config = { defaultPrinter: 'printer-1', defaultCopies: 1 };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintConfig(schoolId, userId);
      expect(result.defaultPrinter).toBe('printer-1');
    });

    it('should throw on missing schoolId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintConfig('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintConfig(schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getWatermarkConfig.mockRejectedValue(new Error('Config error'));
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintConfig(schoolId, userId)).rejects.toThrow('Config error');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getWatermarkConfig.mockResolvedValue({});
      const service = createPrintService(mockRepository as any);
      await service.getPrintConfig(schoolId, userId);
      expect(mockRepository.getWatermarkConfig).toHaveBeenCalledWith(schoolId);
    });

    it('should return config with all fields', async () => {
      const config = { defaultPrinter: 'p1', defaultCopies: 2, duplex: true };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintConfig(schoolId, userId);
      expect(result.duplex).toBe(true);
    });

    it('should handle default config', async () => {
      const config = { defaultPrinter: null };
      mockRepository.getWatermarkConfig.mockResolvedValue(config);
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintConfig(schoolId, userId);
      expect(result.defaultPrinter).toBeNull();
    });

    it('should handle config not found', async () => {
      mockRepository.getWatermarkConfig.mockRejectedValue(new Error('Config not found'));
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintConfig(schoolId, userId)).rejects.toThrow('Config not found');
    });

    it('should handle network timeout', async () => {
      mockRepository.getWatermarkConfig.mockRejectedValue(new Error('Network timeout'));
      const service = createPrintService(mockRepository as any);
      await expect(service.getPrintConfig(schoolId, userId)).rejects.toThrow('Network timeout');
    });

    it('should return empty config', async () => {
      mockRepository.getWatermarkConfig.mockResolvedValue({});
      const service = createPrintService(mockRepository as any);
      const result = await service.getPrintConfig(schoolId, userId);
      expect(Object.keys(result)).toHaveLength(0);
    });
  });

  describe('updatePrintConfig', () => {
    it('should update print config', async () => {
      const data = { defaultPrinter: 'printer-2', defaultCopies: 3 };
      mockRepository.updateWatermarkConfig.mockResolvedValue(data);
      const service = createPrintService(mockRepository as any);
      const result = await service.updatePrintConfig(schoolId, userId, data);
      expect(result.defaultPrinter).toBe('printer-2');
    });

    it('should throw on missing schoolId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.updatePrintConfig('', userId, { defaultPrinter: 'p1' })).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.updatePrintConfig(schoolId, '', { defaultPrinter: 'p1' })).rejects.toThrow();
    });

    it('should throw on missing data', async () => {
      const service = createPrintService(mockRepository as any);
      await expect(service.updatePrintConfig(schoolId, userId, null as any)).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.updateWatermarkConfig.mockRejectedValue(new Error('Update failed'));
      const service = createPrintService(mockRepository as any);
      await expect(service.updatePrintConfig(schoolId, userId, { defaultPrinter: 'p1' })).rejects.toThrow('Update failed');
    });

    it('should call repository with schoolId and data', async () => {
      mockRepository.updateWatermarkConfig.mockResolvedValue({});
      const service = createPrintService(mockRepository as any);
      const data = { defaultPrinter: 'p1' };
      await service.updatePrintConfig(schoolId, userId, data);
      expect(mockRepository.updateWatermarkConfig).toHaveBeenCalledWith(schoolId, data);
    });

    it('should return updated config', async () => {
      const data = { defaultPrinter: 'p3', defaultCopies: 5 };
      mockRepository.updateWatermarkConfig.mockResolvedValue(data);
      const service = createPrintService(mockRepository as any);
      const result = await service.updatePrintConfig(schoolId, userId, { defaultPrinter: 'p3' });
      expect(result.defaultCopies).toBe(5);
    });

    it('should handle partial updates', async () => {
      const data = { defaultCopies: 2 };
      mockRepository.updateWatermarkConfig.mockResolvedValue(data);
      const service = createPrintService(mockRepository as any);
      const result = await service.updatePrintConfig(schoolId, userId, { defaultCopies: 2 });
      expect(result.defaultCopies).toBe(2);
    });

    it('should handle permission errors', async () => {
      mockRepository.updateWatermarkConfig.mockRejectedValue(new Error('Permission denied'));
      const service = createPrintService(mockRepository as any);
      await expect(service.updatePrintConfig(schoolId, userId, { defaultPrinter: 'p1' })).rejects.toThrow('Permission denied');
    });

    it('should handle empty data object', async () => {
      mockRepository.updateWatermarkConfig.mockResolvedValue({});
      const service = createPrintService(mockRepository as any);
      const result = await service.updatePrintConfig(schoolId, userId, {});
      expect(Object.keys(result)).toHaveLength(0);
    });
  });
});
