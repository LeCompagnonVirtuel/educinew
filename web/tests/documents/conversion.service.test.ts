import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createConversionService } from '../../src/features/documents/services/conversion.service';

describe('ConversionService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      convertDocument: vi.fn(),
      getConversionHistory: vi.fn(),
      batchConvert: vi.fn(),
      getDocument: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createConversionService(mockRepository);
    expect(service).toBeDefined();
    expect(service.convertDocument).toBeInstanceOf(Function);
    expect(service.getConversionHistory).toBeInstanceOf(Function);
    expect(service.bulkConvert).toBeInstanceOf(Function);
  });

  describe('convertDocument', () => {
    it('should convert a document', async () => {
      mockRepository.convertDocument.mockResolvedValue({ id: 'conv-1', status: 'completed' });
      const service = createConversionService(mockRepository);
      const result = await service.convertDocument('doc-1', 'school-1', 'user-1', 'pdf');
      expect(result).toEqual({ id: 'conv-1', status: 'completed' });
      expect(mockRepository.convertDocument).toHaveBeenCalledWith('doc-1', 'school-1', 'pdf');
    });
  });

  describe('getConversionHistory', () => {
    it('should return conversion history', async () => {
      const history = [{ id: 'conv-1', date: '2026-01-01' }];
      mockRepository.getConversionHistory.mockResolvedValue(history);
      const service = createConversionService(mockRepository);
      const result = await service.getConversionHistory('school-1', 'user-1');
      expect(result).toEqual(history);
      expect(mockRepository.getConversionHistory).toHaveBeenCalledWith('school-1');
    });
  });

  describe('bulkConvert', () => {
    it('should bulk convert documents', async () => {
      mockRepository.batchConvert.mockResolvedValue({ batchId: 'batch-1', status: 'processing' });
      const service = createConversionService(mockRepository);
      const result = await service.bulkConvert(['doc-1', 'doc-2'], 'school-1', 'user-1', 'pdf');
      expect(result).toEqual({ batchId: 'batch-1', status: 'processing' });
      expect(mockRepository.batchConvert).toHaveBeenCalledWith(['doc-1', 'doc-2'], 'school-1', 'pdf');
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing documentId for convertDocument', async () => {
      const service = createConversionService(mockRepository);
      await expect(service.convertDocument('', 'school-1', 'user-1', 'pdf')).rejects.toThrow('documentId is required');
    });

    it('should throw on missing schoolId for convertDocument', async () => {
      const service = createConversionService(mockRepository);
      await expect(service.convertDocument('doc-1', '', 'user-1', 'pdf')).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing targetFormat for convertDocument', async () => {
      const service = createConversionService(mockRepository);
      await expect(service.convertDocument('doc-1', 'school-1', 'user-1', '')).rejects.toThrow('targetFormat is required');
    });

    it('should throw on missing schoolId for getConversionHistory', async () => {
      const service = createConversionService(mockRepository);
      await expect(service.getConversionHistory('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing documentIds for bulkConvert', async () => {
      const service = createConversionService(mockRepository);
      await expect(service.bulkConvert([], 'school-1', 'user-1', 'pdf')).rejects.toThrow('documentIds are required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in convertDocument', async () => {
      mockRepository.convertDocument.mockRejectedValue(new Error('Conversion failed'));
      const service = createConversionService(mockRepository);
      await expect(service.convertDocument('doc-1', 'school-1', 'user-1', 'pdf')).rejects.toThrow('Conversion failed');
    });

    it('should handle repository errors in getConversionHistory', async () => {
      mockRepository.getConversionHistory.mockRejectedValue(new Error('History query failed'));
      const service = createConversionService(mockRepository);
      await expect(service.getConversionHistory('school-1', 'user-1')).rejects.toThrow('History query failed');
    });

    it('should handle repository errors in bulkConvert', async () => {
      mockRepository.batchConvert.mockRejectedValue(new Error('Batch failed'));
      const service = createConversionService(mockRepository);
      await expect(service.bulkConvert(['doc-1'], 'school-1', 'user-1', 'pdf')).rejects.toThrow('Batch failed');
    });
  });
});
