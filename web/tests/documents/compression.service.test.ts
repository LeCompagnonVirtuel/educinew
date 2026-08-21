import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCompressionService } from '../../src/features/documents/services/compression.service';

describe('CompressionService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      compressDocument: vi.fn(),
      decompressDocument: vi.fn(),
      getCompressionStats: vi.fn(),
      getDocument: vi.fn(),
      getConversionHistory: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createCompressionService(mockRepository);
    expect(service).toBeDefined();
    expect(service.compressDocuments).toBeInstanceOf(Function);
    expect(service.decompressDocument).toBeInstanceOf(Function);
    expect(service.getCompressionStats).toBeInstanceOf(Function);
  });

  describe('compressDocuments', () => {
    it('should compress documents', async () => {
      mockRepository.compressDocument.mockResolvedValue({ id: 'doc-1', compressedSize: 512 });
      const service = createCompressionService(mockRepository);
      const result = await service.compressDocuments(['doc-1', 'doc-2'], 'school-1', 'user-1', 'high');
      expect(result).toEqual(expect.objectContaining({ totalProcessed: 2, successCount: 2, failureCount: 0 }));
      expect(mockRepository.compressDocument).toHaveBeenCalledWith('doc-1', 'school-1', 'high');
    });
  });

  describe('decompressDocument', () => {
    it('should decompress a document', async () => {
      mockRepository.decompressDocument.mockResolvedValue({ id: 'doc-1', decompressed: true });
      const service = createCompressionService(mockRepository);
      const result = await service.decompressDocument('doc-1', 'school-1', 'user-1');
      expect(result).toEqual({ id: 'doc-1', decompressed: true });
      expect(mockRepository.decompressDocument).toHaveBeenCalledWith('doc-1', 'school-1');
    });
  });

  describe('getCompressionStats', () => {
    it('should return compression statistics', async () => {
      const stats = { totalCompressed: 10, spaceSaved: 5120 };
      mockRepository.getCompressionStats.mockResolvedValue(stats);
      const service = createCompressionService(mockRepository);
      const result = await service.getCompressionStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getCompressionStats).toHaveBeenCalledWith('school-1');
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing documentIds for compressDocuments', async () => {
      const service = createCompressionService(mockRepository);
      await expect(service.compressDocuments([], 'school-1', 'user-1')).rejects.toThrow('documentIds are required');
    });

    it('should throw on missing schoolId for compressDocuments', async () => {
      const service = createCompressionService(mockRepository);
      await expect(service.compressDocuments(['doc-1'], '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing userId for compressDocuments', async () => {
      const service = createCompressionService(mockRepository);
      await expect(service.compressDocuments(['doc-1'], 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw on missing documentId for decompressDocument', async () => {
      const service = createCompressionService(mockRepository);
      await expect(service.decompressDocument('', 'school-1', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw on missing schoolId for getCompressionStats', async () => {
      const service = createCompressionService(mockRepository);
      await expect(service.getCompressionStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in compressDocuments', async () => {
      mockRepository.compressDocument.mockRejectedValue(new Error('Compression failed'));
      const service = createCompressionService(mockRepository);
      const result = await service.compressDocuments(['doc-1'], 'school-1', 'user-1');
      expect(result.failureCount).toBe(1);
      expect(result.successCount).toBe(0);
    });

    it('should handle repository errors in decompressDocument', async () => {
      mockRepository.decompressDocument.mockRejectedValue(new Error('Decompression failed'));
      const service = createCompressionService(mockRepository);
      await expect(service.decompressDocument('doc-1', 'school-1', 'user-1')).rejects.toThrow('Decompression failed');
    });

    it('should handle repository errors in getCompressionStats', async () => {
      mockRepository.getCompressionStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createCompressionService(mockRepository);
      await expect(service.getCompressionStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });
});
