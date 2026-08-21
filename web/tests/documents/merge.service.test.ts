import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMergeService } from '../../src/features/documents/services/merge.service';

describe('MergeService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      mergeDocuments: vi.fn(),
      splitDocument: vi.fn(),
      getMergeHistory: vi.fn(),
      getDocument: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createMergeService(mockRepository);
    expect(service).toBeDefined();
    expect(service.mergeDocuments).toBeInstanceOf(Function);
    expect(service.splitPDF).toBeInstanceOf(Function);
    expect(service.getMergeHistory).toBeInstanceOf(Function);
  });

  describe('mergeDocuments', () => {
    it('should merge multiple documents', async () => {
      mockRepository.mergeDocuments.mockResolvedValue({ id: 'merge-1', status: 'completed' });
      const service = createMergeService(mockRepository);
      const result = await service.mergeDocuments(['doc-1', 'doc-2'], 'school-1', 'user-1', { name: 'merged.pdf' });
      expect(result).toEqual({ id: 'merge-1', status: 'completed' });
      expect(mockRepository.mergeDocuments).toHaveBeenCalledWith(['doc-1', 'doc-2'], 'school-1', { name: 'merged.pdf' });
    });
  });

  describe('splitPDF', () => {
    it('should split a document', async () => {
      mockRepository.splitDocument.mockResolvedValue({ id: 'split-1', parts: 3 });
      const service = createMergeService(mockRepository);
      const result = await service.splitPDF('doc-1', 'school-1', 'user-1', { pages: '1-3,5' });
      expect(result).toEqual({ id: 'split-1', parts: 3 });
      expect(mockRepository.splitDocument).toHaveBeenCalledWith('doc-1', 'school-1', { pages: '1-3,5' });
    });
  });

  describe('getMergeHistory', () => {
    it('should return merge history', async () => {
      const history = [{ id: 'merge-1', date: '2026-01-01' }];
      mockRepository.getMergeHistory.mockResolvedValue(history);
      const service = createMergeService(mockRepository);
      const result = await service.getMergeHistory('school-1', 'user-1');
      expect(result).toEqual(history);
      expect(mockRepository.getMergeHistory).toHaveBeenCalledWith('school-1');
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing documentIds for mergeDocuments', async () => {
      const service = createMergeService(mockRepository);
      await expect(service.mergeDocuments([], 'school-1', 'user-1')).rejects.toThrow('At least 2 documentIds are required');
    });

    it('should throw on single documentId for mergeDocuments', async () => {
      const service = createMergeService(mockRepository);
      await expect(service.mergeDocuments(['doc-1'], 'school-1', 'user-1')).rejects.toThrow('At least 2 documentIds are required');
    });

    it('should throw on missing schoolId for mergeDocuments', async () => {
      const service = createMergeService(mockRepository);
      await expect(service.mergeDocuments(['doc-1', 'doc-2'], '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing documentId for splitPDF', async () => {
      const service = createMergeService(mockRepository);
      await expect(service.splitPDF('', 'school-1', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw on missing schoolId for getMergeHistory', async () => {
      const service = createMergeService(mockRepository);
      await expect(service.getMergeHistory('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in mergeDocuments', async () => {
      mockRepository.mergeDocuments.mockRejectedValue(new Error('Merge failed'));
      const service = createMergeService(mockRepository);
      await expect(service.mergeDocuments(['doc-1', 'doc-2'], 'school-1', 'user-1')).rejects.toThrow('Merge failed');
    });

    it('should handle repository errors in splitPDF', async () => {
      mockRepository.splitDocument.mockRejectedValue(new Error('Split failed'));
      const service = createMergeService(mockRepository);
      await expect(service.splitPDF('doc-1', 'school-1', 'user-1')).rejects.toThrow('Split failed');
    });

    it('should handle repository errors in getMergeHistory', async () => {
      mockRepository.getMergeHistory.mockRejectedValue(new Error('History query failed'));
      const service = createMergeService(mockRepository);
      await expect(service.getMergeHistory('school-1', 'user-1')).rejects.toThrow('History query failed');
    });
  });
});
