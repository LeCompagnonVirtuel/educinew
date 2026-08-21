import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createHighlightService } from '../../src/features/documents/services/highlight.service';

describe('HighlightService', () => {
  let mockRepository: {
    getHighlights: ReturnType<typeof vi.fn>;
    createHighlight: ReturnType<typeof vi.fn>;
    updateHighlight: ReturnType<typeof vi.fn>;
    deleteHighlight: ReturnType<typeof vi.fn>;
    getHighlightStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getHighlights: vi.fn(),
      createHighlight: vi.fn(),
      updateHighlight: vi.fn(),
      deleteHighlight: vi.fn(),
      getHighlightStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createHighlightService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getHighlights).toBeInstanceOf(Function);
    expect(service.createHighlight).toBeInstanceOf(Function);
    expect(service.updateHighlight).toBeInstanceOf(Function);
    expect(service.deleteHighlight).toBeInstanceOf(Function);
    expect(service.getHighlightStats).toBeInstanceOf(Function);
  });

  describe('getHighlights', () => {
    it('should return highlights for a document', async () => {
      const highlights = [{ id: 'h-1', color: 'yellow', text: 'Important' }];
      mockRepository.getHighlights.mockResolvedValue(highlights);
      const service = createHighlightService(mockRepository);
      const result = await service.getHighlights('doc-1', 'user-1');
      expect(result).toEqual(highlights);
      expect(mockRepository.getHighlights).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.getHighlights('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.getHighlights('doc-1', '')).rejects.toThrow();
    });

    it('should return empty array when no highlights exist', async () => {
      mockRepository.getHighlights.mockResolvedValue([]);
      const service = createHighlightService(mockRepository);
      const result = await service.getHighlights('doc-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should pass correct documentId to repository', async () => {
      mockRepository.getHighlights.mockResolvedValue([]);
      const service = createHighlightService(mockRepository);
      await service.getHighlights('doc-42', 'user-1');
      expect(mockRepository.getHighlights).toHaveBeenCalledWith('doc-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getHighlights.mockRejectedValue(new Error('Fetch failed'));
      const service = createHighlightService(mockRepository);
      await expect(service.getHighlights('doc-1', 'user-1')).rejects.toThrow('Fetch failed');
    });
  });

  describe('createHighlight', () => {
    it('should create a highlight successfully', async () => {
      const data = { color: 'yellow', text: 'Important section', start: 0, end: 50 };
      const highlight = { id: 'h-1', ...data };
      mockRepository.createHighlight.mockResolvedValue(highlight);
      const service = createHighlightService(mockRepository);
      const result = await service.createHighlight('doc-1', 'user-1', data);
      expect(result).toEqual(highlight);
      expect(mockRepository.createHighlight).toHaveBeenCalledWith('doc-1', 'user-1', data);
    });

    it('should throw when documentId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.createHighlight('', 'user-1', { color: 'yellow' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.createHighlight('doc-1', '', { color: 'yellow' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.createHighlight('doc-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should pass all parameters to repository', async () => {
      const data = { color: 'green', text: 'Another highlight' };
      mockRepository.createHighlight.mockResolvedValue({ id: 'h-1', ...data });
      const service = createHighlightService(mockRepository);
      await service.createHighlight('doc-99', 'user-42', data);
      expect(mockRepository.createHighlight).toHaveBeenCalledWith('doc-99', 'user-42', data);
    });

    it('should propagate repository errors', async () => {
      mockRepository.createHighlight.mockRejectedValue(new Error('Create failed'));
      const service = createHighlightService(mockRepository);
      await expect(service.createHighlight('doc-1', 'user-1', { color: 'yellow' })).rejects.toThrow('Create failed');
    });
  });

  describe('updateHighlight', () => {
    it('should update a highlight successfully', async () => {
      const highlights = [{ id: 'h-1', color: 'yellow' }];
      const data = { color: 'green', text: 'Updated text' };
      const updated = { id: 'h-1', ...data };
      mockRepository.getHighlights.mockResolvedValue(highlights);
      mockRepository.updateHighlight.mockResolvedValue(updated);
      const service = createHighlightService(mockRepository);
      const result = await service.updateHighlight('doc-1', 'h-1', 'user-1', data);
      expect(result).toEqual(updated);
      expect(mockRepository.getHighlights).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.updateHighlight).toHaveBeenCalledWith('h-1', 'user-1', data);
    });

    it('should throw when documentId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('', 'h-1', 'user-1', { color: 'green' })).rejects.toThrow();
    });

    it('should throw when highlightId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('doc-1', '', 'user-1', { color: 'green' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('doc-1', 'h-1', '', { color: 'green' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('doc-1', 'h-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should throw when highlight is not found', async () => {
      mockRepository.getHighlights.mockResolvedValue([]);
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('doc-1', 'h-1', 'user-1', { color: 'green' })).rejects.toThrow();
    });

    it('should find correct highlight from list', async () => {
      const highlights = [{ id: 'h-1' }, { id: 'h-2' }, { id: 'h-3' }];
      mockRepository.getHighlights.mockResolvedValue(highlights);
      mockRepository.updateHighlight.mockResolvedValue({ id: 'h-2' });
      const service = createHighlightService(mockRepository);
      await service.updateHighlight('doc-1', 'h-2', 'user-1', { color: 'blue' });
      expect(mockRepository.updateHighlight).toHaveBeenCalledWith('h-2', 'user-1', { color: 'blue' });
    });

    it('should propagate repository errors', async () => {
      mockRepository.getHighlights.mockResolvedValue([{ id: 'h-1' }]);
      mockRepository.updateHighlight.mockRejectedValue(new Error('Update failed'));
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('doc-1', 'h-1', 'user-1', { color: 'green' })).rejects.toThrow('Update failed');
    });
  });

  describe('deleteHighlight', () => {
    it('should delete a highlight successfully', async () => {
      const highlights = [{ id: 'h-1', color: 'yellow' }];
      mockRepository.getHighlights.mockResolvedValue(highlights);
      mockRepository.deleteHighlight.mockResolvedValue(undefined);
      const service = createHighlightService(mockRepository);
      await service.deleteHighlight('doc-1', 'h-1', 'user-1');
      expect(mockRepository.getHighlights).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.deleteHighlight).toHaveBeenCalledWith('h-1', 'user-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.deleteHighlight('', 'h-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when highlightId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.deleteHighlight('doc-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.deleteHighlight('doc-1', 'h-1', '')).rejects.toThrow();
    });

    it('should throw when highlight is not found', async () => {
      mockRepository.getHighlights.mockResolvedValue([]);
      const service = createHighlightService(mockRepository);
      await expect(service.deleteHighlight('doc-1', 'h-1', 'user-1')).rejects.toThrow();
    });

    it('should find correct highlight from list', async () => {
      const highlights = [{ id: 'h-1' }, { id: 'h-2' }];
      mockRepository.getHighlights.mockResolvedValue(highlights);
      mockRepository.deleteHighlight.mockResolvedValue(undefined);
      const service = createHighlightService(mockRepository);
      await service.deleteHighlight('doc-1', 'h-2', 'user-1');
      expect(mockRepository.deleteHighlight).toHaveBeenCalledWith('h-2', 'user-1');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getHighlights.mockResolvedValue([{ id: 'h-1' }]);
      mockRepository.deleteHighlight.mockRejectedValue(new Error('Delete failed'));
      const service = createHighlightService(mockRepository);
      await expect(service.deleteHighlight('doc-1', 'h-1', 'user-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('getHighlightStats', () => {
    it('should fetch highlight stats', async () => {
      const stats = { totalHighlights: 30, byColor: { yellow: 20, green: 10 } };
      mockRepository.getHighlightStats.mockResolvedValue(stats);
      const service = createHighlightService(mockRepository);
      const result = await service.getHighlightStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getHighlightStats).toHaveBeenCalledWith('school-1');
    });

    it('should throw when schoolId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.getHighlightStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.getHighlightStats('school-1', '')).rejects.toThrow();
    });

    it('should pass correct schoolId to repository', async () => {
      mockRepository.getHighlightStats.mockResolvedValue({ totalHighlights: 0 });
      const service = createHighlightService(mockRepository);
      await service.getHighlightStats('school-42', 'user-1');
      expect(mockRepository.getHighlightStats).toHaveBeenCalledWith('school-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getHighlightStats.mockRejectedValue(new Error('Stats failed'));
      const service = createHighlightService(mockRepository);
      await expect(service.getHighlightStats('school-1', 'user-1')).rejects.toThrow('Stats failed');
    });
  });

  describe('missing required parameters', () => {
    it('should throw when getHighlights receives all empty strings', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.getHighlights('', '')).rejects.toThrow();
    });

    it('should throw when createHighlight receives undefined documentId', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.createHighlight(undefined as any, 'user-1', { color: 'yellow' })).rejects.toThrow();
    });

    it('should throw when updateHighlight receives all empty strings', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('', '', '', undefined as any)).rejects.toThrow();
    });

    it('should throw when deleteHighlight receives undefined highlightId', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.deleteHighlight('doc-1', undefined as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when getHighlightStats receives null schoolId', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.getHighlightStats(null as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when createHighlight receives null data', async () => {
      const service = createHighlightService(mockRepository);
      await expect(service.createHighlight('doc-1', 'user-1', null as any)).rejects.toThrow();
    });
  });

  describe('repository error handling', () => {
    it('should handle getHighlights failure in updateHighlight', async () => {
      mockRepository.getHighlights.mockRejectedValue(new Error('Fetch error'));
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('doc-1', 'h-1', 'user-1', { color: 'green' })).rejects.toThrow('Fetch error');
    });

    it('should handle getHighlights failure in deleteHighlight', async () => {
      mockRepository.getHighlights.mockRejectedValue(new Error('Connection lost'));
      const service = createHighlightService(mockRepository);
      await expect(service.deleteHighlight('doc-1', 'h-1', 'user-1')).rejects.toThrow('Connection lost');
    });

    it('should handle updateHighlight failure after finding highlight', async () => {
      mockRepository.getHighlights.mockResolvedValue([{ id: 'h-1' }]);
      mockRepository.updateHighlight.mockRejectedValue(new Error('Update error'));
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('doc-1', 'h-1', 'user-1', { color: 'green' })).rejects.toThrow('Update error');
    });

    it('should handle deleteHighlight failure after finding highlight', async () => {
      mockRepository.getHighlights.mockResolvedValue([{ id: 'h-1' }]);
      mockRepository.deleteHighlight.mockRejectedValue(new Error('Delete error'));
      const service = createHighlightService(mockRepository);
      await expect(service.deleteHighlight('doc-1', 'h-1', 'user-1')).rejects.toThrow('Delete error');
    });

    it('should handle createHighlight database error', async () => {
      mockRepository.createHighlight.mockRejectedValue(new Error('Database write failed'));
      const service = createHighlightService(mockRepository);
      await expect(service.createHighlight('doc-1', 'user-1', { color: 'yellow' })).rejects.toThrow('Database write failed');
    });
  });

  describe('highlight lookup', () => {
    it('should not find highlight when list is empty', async () => {
      mockRepository.getHighlights.mockResolvedValue([]);
      const service = createHighlightService(mockRepository);
      await expect(service.updateHighlight('doc-1', 'h-1', 'user-1', { color: 'green' })).rejects.toThrow();
    });

    it('should match correct highlight from multiple', async () => {
      const highlights = [{ id: 'h-1' }, { id: 'h-2' }, { id: 'h-3' }];
      mockRepository.getHighlights.mockResolvedValue(highlights);
      mockRepository.updateHighlight.mockResolvedValue({ id: 'h-3' });
      const service = createHighlightService(mockRepository);
      await service.updateHighlight('doc-1', 'h-3', 'user-1', { color: 'blue' });
      expect(mockRepository.updateHighlight).toHaveBeenCalledWith('h-3', 'user-1', { color: 'blue' });
    });

    it('should not find highlight for deletion when list is empty', async () => {
      mockRepository.getHighlights.mockResolvedValue([]);
      const service = createHighlightService(mockRepository);
      await expect(service.deleteHighlight('doc-1', 'h-1', 'user-1')).rejects.toThrow();
    });
  });
});
