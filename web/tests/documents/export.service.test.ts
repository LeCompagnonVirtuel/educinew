import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExportService } from '../../src/features/documents/services/export.service';

describe('ExportService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      exportDocuments: vi.fn(),
      importDocuments: vi.fn(),
      getExportHistory: vi.fn(),
      getImportHistory: vi.fn(),
      getDocumentsByFolder: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createExportService(mockRepository);
    expect(service).toBeDefined();
    expect(service.exportDocuments).toBeInstanceOf(Function);
    expect(service.importDocuments).toBeInstanceOf(Function);
    expect(service.getExportHistory).toBeInstanceOf(Function);
    expect(service.getImportHistory).toBeInstanceOf(Function);
  });

  describe('exportDocuments', () => {
    it('should export documents', async () => {
      mockRepository.exportDocuments.mockResolvedValue({ id: 'exp-1', status: 'processing' });
      const service = createExportService(mockRepository);
      const result = await service.exportDocuments(['doc-1', 'doc-2'], 'school-1', 'user-1', 'pdf');
      expect(result).toEqual({ id: 'exp-1', status: 'processing' });
      expect(mockRepository.exportDocuments).toHaveBeenCalledWith(['doc-1', 'doc-2'], 'school-1', 'pdf');
    });
  });

  describe('getExportHistory', () => {
    it('should return export history', async () => {
      const history = [{ id: 'exp-1', date: '2026-01-01', status: 'completed' }];
      mockRepository.getExportHistory.mockResolvedValue(history);
      const service = createExportService(mockRepository);
      const result = await service.getExportHistory('school-1', 'user-1');
      expect(result).toEqual(history);
      expect(mockRepository.getExportHistory).toHaveBeenCalledWith('school-1');
    });
  });

  describe('getImportHistory', () => {
    it('should return import history', async () => {
      const history = [{ id: 'imp-1', date: '2026-01-01', status: 'completed' }];
      mockRepository.getImportHistory.mockResolvedValue(history);
      const service = createExportService(mockRepository);
      const result = await service.getImportHistory('school-1', 'user-1');
      expect(result).toEqual(history);
      expect(mockRepository.getImportHistory).toHaveBeenCalledWith('school-1');
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing documentIds for exportDocuments', async () => {
      const service = createExportService(mockRepository);
      await expect(service.exportDocuments([], 'school-1', 'user-1', 'pdf')).rejects.toThrow('documentIds are required');
    });

    it('should throw on missing schoolId for exportDocuments', async () => {
      const service = createExportService(mockRepository);
      await expect(service.exportDocuments(['doc-1'], '', 'user-1', 'pdf')).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing format for exportDocuments', async () => {
      const service = createExportService(mockRepository);
      await expect(service.exportDocuments(['doc-1'], 'school-1', 'user-1', '')).rejects.toThrow('format is required');
    });

    it('should throw on missing schoolId for getExportHistory', async () => {
      const service = createExportService(mockRepository);
      await expect(service.getExportHistory('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing schoolId for getImportHistory', async () => {
      const service = createExportService(mockRepository);
      await expect(service.getImportHistory('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in exportDocuments', async () => {
      mockRepository.exportDocuments.mockRejectedValue(new Error('Export failed'));
      const service = createExportService(mockRepository);
      await expect(service.exportDocuments(['doc-1'], 'school-1', 'user-1', 'pdf')).rejects.toThrow('Export failed');
    });

    it('should handle repository errors in getExportHistory', async () => {
      mockRepository.getExportHistory.mockRejectedValue(new Error('History query failed'));
      const service = createExportService(mockRepository);
      await expect(service.getExportHistory('school-1', 'user-1')).rejects.toThrow('History query failed');
    });

    it('should handle repository errors in getImportHistory', async () => {
      mockRepository.getImportHistory.mockRejectedValue(new Error('History query failed'));
      const service = createExportService(mockRepository);
      await expect(service.getImportHistory('school-1', 'user-1')).rejects.toThrow('History query failed');
    });
  });
});
