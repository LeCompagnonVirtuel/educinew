import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRedactionService } from '../../src/features/documents/services/redaction.service';

describe('RedactionService', () => {
  let mockRepository: {
    getRedactions: ReturnType<typeof vi.fn>;
    createRedaction: ReturnType<typeof vi.fn>;
    applyRedaction: ReturnType<typeof vi.fn>;
    removeRedaction: ReturnType<typeof vi.fn>;
    getRedactionStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getRedactions: vi.fn(),
      createRedaction: vi.fn(),
      applyRedaction: vi.fn(),
      removeRedaction: vi.fn(),
      getRedactionStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createRedactionService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getRedactions).toBeInstanceOf(Function);
    expect(service.createRedaction).toBeInstanceOf(Function);
    expect(service.applyRedaction).toBeInstanceOf(Function);
    expect(service.removeRedaction).toBeInstanceOf(Function);
    expect(service.getRedactionStats).toBeInstanceOf(Function);
  });

  describe('getRedactions', () => {
    it('should return redactions for a document', async () => {
      const redactions = [{ id: 'r-1', type: 'text', reason: 'PII' }];
      mockRepository.getRedactions.mockResolvedValue(redactions);
      const service = createRedactionService(mockRepository);
      const result = await service.getRedactions('doc-1', 'user-1');
      expect(result).toEqual(redactions);
      expect(mockRepository.getRedactions).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.getRedactions('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.getRedactions('doc-1', '')).rejects.toThrow();
    });

    it('should return empty array when no redactions exist', async () => {
      mockRepository.getRedactions.mockResolvedValue([]);
      const service = createRedactionService(mockRepository);
      const result = await service.getRedactions('doc-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should pass correct documentId to repository', async () => {
      mockRepository.getRedactions.mockResolvedValue([]);
      const service = createRedactionService(mockRepository);
      await service.getRedactions('doc-42', 'user-1');
      expect(mockRepository.getRedactions).toHaveBeenCalledWith('doc-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getRedactions.mockRejectedValue(new Error('Fetch failed'));
      const service = createRedactionService(mockRepository);
      await expect(service.getRedactions('doc-1', 'user-1')).rejects.toThrow('Fetch failed');
    });
  });

  describe('createRedaction', () => {
    it('should create a redaction successfully', async () => {
      const data = { type: 'text', reason: 'PII', start: 0, end: 10 };
      const redaction = { id: 'r-1', ...data };
      mockRepository.createRedaction.mockResolvedValue(redaction);
      const service = createRedactionService(mockRepository);
      const result = await service.createRedaction('doc-1', 'user-1', data);
      expect(result).toEqual(redaction);
      expect(mockRepository.createRedaction).toHaveBeenCalledWith('doc-1', 'user-1', data);
    });

    it('should throw when documentId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.createRedaction('', 'user-1', { type: 'text' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.createRedaction('doc-1', '', { type: 'text' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.createRedaction('doc-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should pass all parameters to repository', async () => {
      const data = { type: 'image', reason: 'Confidential' };
      mockRepository.createRedaction.mockResolvedValue({ id: 'r-1', ...data });
      const service = createRedactionService(mockRepository);
      await service.createRedaction('doc-99', 'user-42', data);
      expect(mockRepository.createRedaction).toHaveBeenCalledWith('doc-99', 'user-42', data);
    });

    it('should propagate repository errors', async () => {
      mockRepository.createRedaction.mockRejectedValue(new Error('Create failed'));
      const service = createRedactionService(mockRepository);
      await expect(service.createRedaction('doc-1', 'user-1', { type: 'text' })).rejects.toThrow('Create failed');
    });
  });

  describe('applyRedaction', () => {
    it('should apply a redaction successfully', async () => {
      const redactions = [{ id: 'r-1', type: 'text' }];
      mockRepository.getRedactions.mockResolvedValue(redactions);
      mockRepository.applyRedaction.mockResolvedValue(undefined);
      const service = createRedactionService(mockRepository);
      await service.applyRedaction('doc-1', 'r-1', 'user-1');
      expect(mockRepository.getRedactions).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.applyRedaction).toHaveBeenCalledWith('doc-1', 'r-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.applyRedaction('', 'r-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when redactionId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.applyRedaction('doc-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.applyRedaction('doc-1', 'r-1', '')).rejects.toThrow();
    });

    it('should throw when redaction is not found', async () => {
      mockRepository.getRedactions.mockResolvedValue([]);
      const service = createRedactionService(mockRepository);
      await expect(service.applyRedaction('doc-1', 'r-1', 'user-1')).rejects.toThrow();
    });

    it('should find correct redaction from list', async () => {
      const redactions = [{ id: 'r-1' }, { id: 'r-2' }, { id: 'r-3' }];
      mockRepository.getRedactions.mockResolvedValue(redactions);
      mockRepository.applyRedaction.mockResolvedValue(undefined);
      const service = createRedactionService(mockRepository);
      await service.applyRedaction('doc-1', 'r-2', 'user-1');
      expect(mockRepository.applyRedaction).toHaveBeenCalledWith('doc-1', 'r-2');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getRedactions.mockRejectedValue(new Error('Apply failed'));
      const service = createRedactionService(mockRepository);
      await expect(service.applyRedaction('doc-1', 'r-1', 'user-1')).rejects.toThrow('Apply failed');
    });
  });

  describe('removeRedaction', () => {
    it('should remove a redaction successfully', async () => {
      const redactions = [{ id: 'r-1', type: 'text' }];
      mockRepository.getRedactions.mockResolvedValue(redactions);
      mockRepository.removeRedaction.mockResolvedValue(undefined);
      const service = createRedactionService(mockRepository);
      await service.removeRedaction('doc-1', 'r-1', 'user-1');
      expect(mockRepository.getRedactions).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.removeRedaction).toHaveBeenCalledWith('doc-1', 'r-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.removeRedaction('', 'r-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when redactionId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.removeRedaction('doc-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.removeRedaction('doc-1', 'r-1', '')).rejects.toThrow();
    });

    it('should throw when redaction is not found', async () => {
      mockRepository.getRedactions.mockResolvedValue([]);
      const service = createRedactionService(mockRepository);
      await expect(service.removeRedaction('doc-1', 'r-1', 'user-1')).rejects.toThrow();
    });

    it('should find correct redaction from list', async () => {
      const redactions = [{ id: 'r-1' }, { id: 'r-2' }];
      mockRepository.getRedactions.mockResolvedValue(redactions);
      mockRepository.removeRedaction.mockResolvedValue(undefined);
      const service = createRedactionService(mockRepository);
      await service.removeRedaction('doc-1', 'r-2', 'user-1');
      expect(mockRepository.removeRedaction).toHaveBeenCalledWith('doc-1', 'r-2');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getRedactions.mockRejectedValue(new Error('Remove failed'));
      const service = createRedactionService(mockRepository);
      await expect(service.removeRedaction('doc-1', 'r-1', 'user-1')).rejects.toThrow('Remove failed');
    });
  });

  describe('getRedactionStats', () => {
    it('should fetch redaction stats', async () => {
      const stats = { totalRedactions: 15, appliedRedactions: 10 };
      mockRepository.getRedactionStats.mockResolvedValue(stats);
      const service = createRedactionService(mockRepository);
      const result = await service.getRedactionStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getRedactionStats).toHaveBeenCalledWith('school-1');
    });

    it('should throw when schoolId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.getRedactionStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.getRedactionStats('school-1', '')).rejects.toThrow();
    });

    it('should pass correct schoolId to repository', async () => {
      mockRepository.getRedactionStats.mockResolvedValue({ totalRedactions: 0 });
      const service = createRedactionService(mockRepository);
      await service.getRedactionStats('school-42', 'user-1');
      expect(mockRepository.getRedactionStats).toHaveBeenCalledWith('school-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getRedactionStats.mockRejectedValue(new Error('Stats failed'));
      const service = createRedactionService(mockRepository);
      await expect(service.getRedactionStats('school-1', 'user-1')).rejects.toThrow('Stats failed');
    });
  });

  describe('missing required parameters', () => {
    it('should throw when getRedactions receives all empty strings', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.getRedactions('', '')).rejects.toThrow();
    });

    it('should throw when createRedaction receives undefined documentId', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.createRedaction(undefined as any, 'user-1', { type: 'text' })).rejects.toThrow();
    });

    it('should throw when applyRedaction receives all empty strings', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.applyRedaction('', '', '')).rejects.toThrow();
    });

    it('should throw when removeRedaction receives undefined redactionId', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.removeRedaction('doc-1', undefined as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when getRedactionStats receives null schoolId', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.getRedactionStats(null as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when createRedaction receives null data', async () => {
      const service = createRedactionService(mockRepository);
      await expect(service.createRedaction('doc-1', 'user-1', null as any)).rejects.toThrow();
    });
  });

  describe('repository error handling', () => {
    it('should handle getRedactions failure in applyRedaction', async () => {
      mockRepository.getRedactions.mockRejectedValue(new Error('Fetch error'));
      const service = createRedactionService(mockRepository);
      await expect(service.applyRedaction('doc-1', 'r-1', 'user-1')).rejects.toThrow('Fetch error');
    });

    it('should handle getRedactions failure in removeRedaction', async () => {
      mockRepository.getRedactions.mockRejectedValue(new Error('Connection lost'));
      const service = createRedactionService(mockRepository);
      await expect(service.removeRedaction('doc-1', 'r-1', 'user-1')).rejects.toThrow('Connection lost');
    });

    it('should handle applyRedaction failure after finding redaction', async () => {
      mockRepository.getRedactions.mockResolvedValue([{ id: 'r-1' }]);
      mockRepository.applyRedaction.mockRejectedValue(new Error('Apply error'));
      const service = createRedactionService(mockRepository);
      await expect(service.applyRedaction('doc-1', 'r-1', 'user-1')).rejects.toThrow('Apply error');
    });

    it('should handle removeRedaction failure after finding redaction', async () => {
      mockRepository.getRedactions.mockResolvedValue([{ id: 'r-1' }]);
      mockRepository.removeRedaction.mockRejectedValue(new Error('Remove error'));
      const service = createRedactionService(mockRepository);
      await expect(service.removeRedaction('doc-1', 'r-1', 'user-1')).rejects.toThrow('Remove error');
    });

    it('should handle createRedaction database error', async () => {
      mockRepository.createRedaction.mockRejectedValue(new Error('Database write failed'));
      const service = createRedactionService(mockRepository);
      await expect(service.createRedaction('doc-1', 'user-1', { type: 'text' })).rejects.toThrow('Database write failed');
    });
  });

  describe('redaction lookup', () => {
    it('should not find redaction when list is empty', async () => {
      mockRepository.getRedactions.mockResolvedValue([]);
      const service = createRedactionService(mockRepository);
      await expect(service.applyRedaction('doc-1', 'r-1', 'user-1')).rejects.toThrow();
    });

    it('should match correct redaction from multiple', async () => {
      const redactions = [{ id: 'r-1' }, { id: 'r-2' }, { id: 'r-3' }];
      mockRepository.getRedactions.mockResolvedValue(redactions);
      mockRepository.applyRedaction.mockResolvedValue(undefined);
      const service = createRedactionService(mockRepository);
      await service.applyRedaction('doc-1', 'r-3', 'user-1');
      expect(mockRepository.applyRedaction).toHaveBeenCalledWith('doc-1', 'r-3');
    });
  });
});
