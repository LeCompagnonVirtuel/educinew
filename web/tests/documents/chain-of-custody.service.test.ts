import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createChainOfCustodyService } from '../../src/features/documents/services/chain-of-custody.service';

describe('ChainOfCustodyService', () => {
  let mockRepository: {
    getChainOfCustody: ReturnType<typeof vi.fn>;
    getDocument: ReturnType<typeof vi.fn>;
    getDocumentTimeline: ReturnType<typeof vi.fn>;
    getDocumentStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getChainOfCustody: vi.fn(),
      getDocument: vi.fn(),
      getDocumentTimeline: vi.fn(),
      getDocumentStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createChainOfCustodyService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getChainOfCustody).toBeInstanceOf(Function);
    expect(service.createChainOfCustodyEntry).toBeInstanceOf(Function);
    expect(service.getChainOfCustodyTimeline).toBeInstanceOf(Function);
    expect(service.getChainOfCustodyStats).toBeInstanceOf(Function);
    expect(service.validateChainOfCustody).toBeInstanceOf(Function);
    expect(service.getChainOfCustodyDocument).toBeInstanceOf(Function);
  });

  describe('getChainOfCustody', () => {
    it('should return chain of custody entries', async () => {
      const chain = [{ id: 'entry-1', action: 'transferred' }];
      mockRepository.getChainOfCustody.mockResolvedValue(chain);
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.getChainOfCustody('doc-1', 'school-1');
      expect(result).toEqual(chain);
      expect(mockRepository.getChainOfCustody).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustody('', 'school-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustody('doc-1', '')).rejects.toThrow();
    });

    it('should return empty chain when no entries exist', async () => {
      mockRepository.getChainOfCustody.mockResolvedValue([]);
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.getChainOfCustody('doc-1', 'school-1');
      expect(result).toEqual([]);
    });

    it('should pass correct documentId to repository', async () => {
      mockRepository.getChainOfCustody.mockResolvedValue([]);
      const service = createChainOfCustodyService(mockRepository);
      await service.getChainOfCustody('doc-42', 'school-1');
      expect(mockRepository.getChainOfCustody).toHaveBeenCalledWith('doc-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getChainOfCustody.mockRejectedValue(new Error('DB error'));
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustody('doc-1', 'school-1')).rejects.toThrow('DB error');
    });
  });

  describe('createChainOfCustodyEntry', () => {
    it('should create a chain of custody entry', async () => {
      const document = { id: 'doc-1' };
      const data = { action: 'transferred', from: 'user-1' };
      mockRepository.getDocument.mockResolvedValue(document);
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.createChainOfCustodyEntry('doc-1', 'school-1', 'user-1', data);
      expect(result).toBeDefined();
      expect(result.documentId).toBe('doc-1');
      expect(result.userId).toBe('user-1');
      expect(result.schoolId).toBe('school-1');
      expect(result.action).toBe('transferred');
      expect(result.createdAt).toBeDefined();
    });

    it('should throw when documentId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.createChainOfCustodyEntry('', 'school-1', 'user-1', { action: 'test' })).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.createChainOfCustodyEntry('doc-1', '', 'user-1', { action: 'test' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.createChainOfCustodyEntry('doc-1', 'school-1', '', { action: 'test' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.createChainOfCustodyEntry('doc-1', 'school-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.createChainOfCustodyEntry('doc-1', 'school-1', 'user-1', { action: 'test' })).rejects.toThrow();
    });

    it('should include timestamp in entry', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.createChainOfCustodyEntry('doc-1', 'school-1', 'user-1', { action: 'test' });
      expect(result.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    it('should spread data into entry', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.createChainOfCustodyEntry('doc-1', 'school-1', 'user-1', { action: 'viewed', details: 'Opened' });
      expect(result.action).toBe('viewed');
      expect(result.details).toBe('Opened');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Write failed'));
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.createChainOfCustodyEntry('doc-1', 'school-1', 'user-1', { action: 'test' })).rejects.toThrow('Write failed');
    });
  });

  describe('getChainOfCustodyTimeline', () => {
    it('should return the timeline', async () => {
      const timeline = [{ action: 'created', timestamp: '2026-01-01T00:00:00Z' }];
      mockRepository.getDocumentTimeline.mockResolvedValue(timeline);
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.getChainOfCustodyTimeline('doc-1', 'school-1');
      expect(result).toEqual(timeline);
      expect(mockRepository.getDocumentTimeline).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyTimeline('', 'school-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyTimeline('doc-1', '')).rejects.toThrow();
    });

    it('should pass correct documentId', async () => {
      mockRepository.getDocumentTimeline.mockResolvedValue([]);
      const service = createChainOfCustodyService(mockRepository);
      await service.getChainOfCustodyTimeline('doc-99', 'school-1');
      expect(mockRepository.getDocumentTimeline).toHaveBeenCalledWith('doc-99');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocumentTimeline.mockRejectedValue(new Error('Timeline error'));
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyTimeline('doc-1', 'school-1')).rejects.toThrow('Timeline error');
    });
  });

  describe('getChainOfCustodyStats', () => {
    it('should fetch stats successfully', async () => {
      const stats = { totalEntries: 10 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.getChainOfCustodyStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith('school-1', undefined, undefined);
    });

    it('should throw when schoolId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyStats('school-1', '')).rejects.toThrow();
    });

    it('should pass date range to repository', async () => {
      mockRepository.getDocumentStats.mockResolvedValue({ totalEntries: 5 });
      const service = createChainOfCustodyService(mockRepository);
      await service.getChainOfCustodyStats('school-1', 'user-1', '2026-01-01', '2026-12-31');
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith('school-1', '2026-01-01', '2026-12-31');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Stats failed'));
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyStats('school-1', 'user-1')).rejects.toThrow('Stats failed');
    });
  });

  describe('validateChainOfCustody', () => {
    it('should validate chain of custody as valid', async () => {
      const chain = [{ id: 'entry-1' }, { id: 'entry-2' }];
      mockRepository.getChainOfCustody.mockResolvedValue(chain);
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.validateChainOfCustody('doc-1', 'school-1');
      expect(result.isValid).toBe(true);
      expect(result.entryCount).toBe(2);
    });

    it('should validate chain of custody as invalid when empty', async () => {
      mockRepository.getChainOfCustody.mockResolvedValue([]);
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.validateChainOfCustody('doc-1', 'school-1');
      expect(result.isValid).toBe(false);
      expect(result.entryCount).toBe(0);
    });

    it('should throw when documentId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.validateChainOfCustody('', 'school-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.validateChainOfCustody('doc-1', '')).rejects.toThrow();
    });

    it('should pass correct documentId to repository', async () => {
      mockRepository.getChainOfCustody.mockResolvedValue([{ id: 'e-1' }]);
      const service = createChainOfCustodyService(mockRepository);
      await service.validateChainOfCustody('doc-42', 'school-1');
      expect(mockRepository.getChainOfCustody).toHaveBeenCalledWith('doc-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getChainOfCustody.mockRejectedValue(new Error('Validation error'));
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.validateChainOfCustody('doc-1', 'school-1')).rejects.toThrow('Validation error');
    });
  });

  describe('getChainOfCustodyDocument', () => {
    it('should return document with chain', async () => {
      const document = { id: 'doc-1', name: 'test.pdf' };
      const chain = [{ id: 'entry-1' }];
      mockRepository.getDocument.mockResolvedValue(document);
      mockRepository.getChainOfCustody.mockResolvedValue(chain);
      const service = createChainOfCustodyService(mockRepository);
      const result = await service.getChainOfCustodyDocument('doc-1', 'school-1');
      expect(result.document).toEqual(document);
      expect(result.chain).toEqual(chain);
    });

    it('should throw when documentId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyDocument('', 'school-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyDocument('doc-1', '')).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyDocument('doc-1', 'school-1')).rejects.toThrow();
    });

    it('should call both repository methods', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.getChainOfCustody.mockResolvedValue([]);
      const service = createChainOfCustodyService(mockRepository);
      await service.getChainOfCustodyDocument('doc-1', 'school-1');
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.getChainOfCustody).toHaveBeenCalledWith('doc-1');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Not found'));
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyDocument('doc-1', 'school-1')).rejects.toThrow('Not found');
    });
  });

  describe('missing required parameters', () => {
    it('should throw when getChainOfCustody receives all empty strings', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustody('', '')).rejects.toThrow();
    });

    it('should throw when createChainOfCustodyEntry receives all empty strings', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.createChainOfCustodyEntry('', '', '', undefined as any)).rejects.toThrow();
    });

    it('should throw when getChainOfCustodyTimeline receives undefined documentId', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyTimeline(undefined as any, 'school-1')).rejects.toThrow();
    });

    it('should throw when getChainOfCustodyStats receives undefined schoolId', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyStats(undefined as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when validateChainOfCustody receives null documentId', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.validateChainOfCustody(null as any, 'school-1')).rejects.toThrow();
    });

    it('should throw when getChainOfCustodyDocument receives undefined schoolId', async () => {
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyDocument('doc-1', undefined as any)).rejects.toThrow();
    });
  });

  describe('repository error handling', () => {
    it('should handle getChainOfCustody failure in validateChainOfCustody', async () => {
      mockRepository.getChainOfCustody.mockRejectedValue(new Error('Chain fetch failed'));
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.validateChainOfCustody('doc-1', 'school-1')).rejects.toThrow('Chain fetch failed');
    });

    it('should handle getDocument failure in getChainOfCustodyDocument', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Doc not found'));
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyDocument('doc-1', 'school-1')).rejects.toThrow('Doc not found');
    });

    it('should handle getChainOfCustody failure in getChainOfCustodyDocument', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.getChainOfCustody.mockRejectedValue(new Error('Chain unavailable'));
      const service = createChainOfCustodyService(mockRepository);
      await expect(service.getChainOfCustodyDocument('doc-1', 'school-1')).rejects.toThrow('Chain unavailable');
    });
  });
});
