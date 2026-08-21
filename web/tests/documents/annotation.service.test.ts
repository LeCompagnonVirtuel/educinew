import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAnnotationService } from '../../src/features/documents/services/annotation.service';

describe('AnnotationService', () => {
  let mockRepository: {
    getAnnotations: ReturnType<typeof vi.fn>;
    createAnnotation: ReturnType<typeof vi.fn>;
    updateAnnotation: ReturnType<typeof vi.fn>;
    deleteAnnotation: ReturnType<typeof vi.fn>;
    getAnnotationStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getAnnotations: vi.fn(),
      createAnnotation: vi.fn(),
      updateAnnotation: vi.fn(),
      deleteAnnotation: vi.fn(),
      getAnnotationStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAnnotationService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getAnnotations).toBeInstanceOf(Function);
    expect(service.createAnnotation).toBeInstanceOf(Function);
    expect(service.updateAnnotation).toBeInstanceOf(Function);
    expect(service.deleteAnnotation).toBeInstanceOf(Function);
    expect(service.getAnnotationStats).toBeInstanceOf(Function);
  });

  describe('getAnnotations', () => {
    it('should return annotations for a document', async () => {
      const annotations = [{ id: 'a-1', type: 'note', content: 'Check this' }];
      mockRepository.getAnnotations.mockResolvedValue(annotations);
      const service = createAnnotationService(mockRepository);
      const result = await service.getAnnotations('doc-1', 'user-1');
      expect(result).toEqual(annotations);
      expect(mockRepository.getAnnotations).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.getAnnotations('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.getAnnotations('doc-1', '')).rejects.toThrow();
    });

    it('should return empty array when no annotations exist', async () => {
      mockRepository.getAnnotations.mockResolvedValue([]);
      const service = createAnnotationService(mockRepository);
      const result = await service.getAnnotations('doc-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should pass correct documentId to repository', async () => {
      mockRepository.getAnnotations.mockResolvedValue([]);
      const service = createAnnotationService(mockRepository);
      await service.getAnnotations('doc-42', 'user-1');
      expect(mockRepository.getAnnotations).toHaveBeenCalledWith('doc-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getAnnotations.mockRejectedValue(new Error('Fetch failed'));
      const service = createAnnotationService(mockRepository);
      await expect(service.getAnnotations('doc-1', 'user-1')).rejects.toThrow('Fetch failed');
    });
  });

  describe('createAnnotation', () => {
    it('should create an annotation successfully', async () => {
      const data = { type: 'note', content: 'Important section', page: 1 };
      const annotation = { id: 'a-1', ...data };
      mockRepository.createAnnotation.mockResolvedValue(annotation);
      const service = createAnnotationService(mockRepository);
      const result = await service.createAnnotation('doc-1', 'user-1', data);
      expect(result).toEqual(annotation);
      expect(mockRepository.createAnnotation).toHaveBeenCalledWith('doc-1', 'user-1', data);
    });

    it('should throw when documentId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.createAnnotation('', 'user-1', { type: 'note' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.createAnnotation('doc-1', '', { type: 'note' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.createAnnotation('doc-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should pass all parameters to repository', async () => {
      const data = { type: 'highlight', page: 5 };
      mockRepository.createAnnotation.mockResolvedValue({ id: 'a-1', ...data });
      const service = createAnnotationService(mockRepository);
      await service.createAnnotation('doc-99', 'user-42', data);
      expect(mockRepository.createAnnotation).toHaveBeenCalledWith('doc-99', 'user-42', data);
    });

    it('should propagate repository errors', async () => {
      mockRepository.createAnnotation.mockRejectedValue(new Error('Create failed'));
      const service = createAnnotationService(mockRepository);
      await expect(service.createAnnotation('doc-1', 'user-1', { type: 'note' })).rejects.toThrow('Create failed');
    });
  });

  describe('updateAnnotation', () => {
    it('should update an annotation successfully', async () => {
      const annotations = [{ id: 'a-1', type: 'note' }];
      const data = { content: 'Updated content' };
      const updated = { id: 'a-1', ...data };
      mockRepository.getAnnotations.mockResolvedValue(annotations);
      mockRepository.updateAnnotation.mockResolvedValue(updated);
      const service = createAnnotationService(mockRepository);
      const result = await service.updateAnnotation('doc-1', 'a-1', 'user-1', data);
      expect(result).toEqual(updated);
      expect(mockRepository.getAnnotations).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.updateAnnotation).toHaveBeenCalledWith('a-1', 'user-1', data);
    });

    it('should throw when documentId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('', 'a-1', 'user-1', { content: 'test' })).rejects.toThrow();
    });

    it('should throw when annotationId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('doc-1', '', 'user-1', { content: 'test' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('doc-1', 'a-1', '', { content: 'test' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('doc-1', 'a-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should throw when annotation is not found', async () => {
      mockRepository.getAnnotations.mockResolvedValue([]);
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('doc-1', 'a-1', 'user-1', { content: 'test' })).rejects.toThrow();
    });

    it('should find correct annotation from list', async () => {
      const annotations = [{ id: 'a-1' }, { id: 'a-2' }, { id: 'a-3' }];
      mockRepository.getAnnotations.mockResolvedValue(annotations);
      mockRepository.updateAnnotation.mockResolvedValue({ id: 'a-2' });
      const service = createAnnotationService(mockRepository);
      await service.updateAnnotation('doc-1', 'a-2', 'user-1', { content: 'updated' });
      expect(mockRepository.updateAnnotation).toHaveBeenCalledWith('a-2', 'user-1', { content: 'updated' });
    });

    it('should propagate repository errors', async () => {
      mockRepository.getAnnotations.mockResolvedValue([{ id: 'a-1' }]);
      mockRepository.updateAnnotation.mockRejectedValue(new Error('Update failed'));
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('doc-1', 'a-1', 'user-1', { content: 'test' })).rejects.toThrow('Update failed');
    });
  });

  describe('deleteAnnotation', () => {
    it('should delete an annotation successfully', async () => {
      const annotations = [{ id: 'a-1', type: 'note' }];
      mockRepository.getAnnotations.mockResolvedValue(annotations);
      mockRepository.deleteAnnotation.mockResolvedValue(undefined);
      const service = createAnnotationService(mockRepository);
      await service.deleteAnnotation('doc-1', 'a-1', 'user-1');
      expect(mockRepository.getAnnotations).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.deleteAnnotation).toHaveBeenCalledWith('a-1', 'user-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.deleteAnnotation('', 'a-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when annotationId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.deleteAnnotation('doc-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.deleteAnnotation('doc-1', 'a-1', '')).rejects.toThrow();
    });

    it('should throw when annotation is not found', async () => {
      mockRepository.getAnnotations.mockResolvedValue([]);
      const service = createAnnotationService(mockRepository);
      await expect(service.deleteAnnotation('doc-1', 'a-1', 'user-1')).rejects.toThrow();
    });

    it('should find correct annotation from list', async () => {
      const annotations = [{ id: 'a-1' }, { id: 'a-2' }];
      mockRepository.getAnnotations.mockResolvedValue(annotations);
      mockRepository.deleteAnnotation.mockResolvedValue(undefined);
      const service = createAnnotationService(mockRepository);
      await service.deleteAnnotation('doc-1', 'a-2', 'user-1');
      expect(mockRepository.deleteAnnotation).toHaveBeenCalledWith('a-2', 'user-1');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getAnnotations.mockResolvedValue([{ id: 'a-1' }]);
      mockRepository.deleteAnnotation.mockRejectedValue(new Error('Delete failed'));
      const service = createAnnotationService(mockRepository);
      await expect(service.deleteAnnotation('doc-1', 'a-1', 'user-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('getAnnotationStats', () => {
    it('should fetch annotation stats', async () => {
      const stats = { totalAnnotations: 20, byType: { note: 15, highlight: 5 } };
      mockRepository.getAnnotationStats.mockResolvedValue(stats);
      const service = createAnnotationService(mockRepository);
      const result = await service.getAnnotationStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getAnnotationStats).toHaveBeenCalledWith('school-1');
    });

    it('should throw when schoolId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.getAnnotationStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.getAnnotationStats('school-1', '')).rejects.toThrow();
    });

    it('should pass correct schoolId to repository', async () => {
      mockRepository.getAnnotationStats.mockResolvedValue({ totalAnnotations: 0 });
      const service = createAnnotationService(mockRepository);
      await service.getAnnotationStats('school-42', 'user-1');
      expect(mockRepository.getAnnotationStats).toHaveBeenCalledWith('school-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getAnnotationStats.mockRejectedValue(new Error('Stats failed'));
      const service = createAnnotationService(mockRepository);
      await expect(service.getAnnotationStats('school-1', 'user-1')).rejects.toThrow('Stats failed');
    });
  });

  describe('missing required parameters', () => {
    it('should throw when getAnnotations receives all empty strings', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.getAnnotations('', '')).rejects.toThrow();
    });

    it('should throw when createAnnotation receives undefined documentId', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.createAnnotation(undefined as any, 'user-1', { type: 'note' })).rejects.toThrow();
    });

    it('should throw when updateAnnotation receives all empty strings', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('', '', '', undefined as any)).rejects.toThrow();
    });

    it('should throw when deleteAnnotation receives undefined annotationId', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.deleteAnnotation('doc-1', undefined as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when getAnnotationStats receives null schoolId', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.getAnnotationStats(null as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when createAnnotation receives null data', async () => {
      const service = createAnnotationService(mockRepository);
      await expect(service.createAnnotation('doc-1', 'user-1', null as any)).rejects.toThrow();
    });
  });

  describe('repository error handling', () => {
    it('should handle getAnnotations failure in updateAnnotation', async () => {
      mockRepository.getAnnotations.mockRejectedValue(new Error('Fetch error'));
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('doc-1', 'a-1', 'user-1', { content: 'test' })).rejects.toThrow('Fetch error');
    });

    it('should handle getAnnotations failure in deleteAnnotation', async () => {
      mockRepository.getAnnotations.mockRejectedValue(new Error('Connection lost'));
      const service = createAnnotationService(mockRepository);
      await expect(service.deleteAnnotation('doc-1', 'a-1', 'user-1')).rejects.toThrow('Connection lost');
    });

    it('should handle updateAnnotation failure after finding annotation', async () => {
      mockRepository.getAnnotations.mockResolvedValue([{ id: 'a-1' }]);
      mockRepository.updateAnnotation.mockRejectedValue(new Error('Update error'));
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('doc-1', 'a-1', 'user-1', { content: 'test' })).rejects.toThrow('Update error');
    });

    it('should handle deleteAnnotation failure after finding annotation', async () => {
      mockRepository.getAnnotations.mockResolvedValue([{ id: 'a-1' }]);
      mockRepository.deleteAnnotation.mockRejectedValue(new Error('Delete error'));
      const service = createAnnotationService(mockRepository);
      await expect(service.deleteAnnotation('doc-1', 'a-1', 'user-1')).rejects.toThrow('Delete error');
    });

    it('should handle createAnnotation database error', async () => {
      mockRepository.createAnnotation.mockRejectedValue(new Error('Database write failed'));
      const service = createAnnotationService(mockRepository);
      await expect(service.createAnnotation('doc-1', 'user-1', { type: 'note' })).rejects.toThrow('Database write failed');
    });
  });

  describe('annotation lookup', () => {
    it('should not find annotation when list is empty', async () => {
      mockRepository.getAnnotations.mockResolvedValue([]);
      const service = createAnnotationService(mockRepository);
      await expect(service.updateAnnotation('doc-1', 'a-1', 'user-1', { content: 'test' })).rejects.toThrow();
    });

    it('should match correct annotation from multiple', async () => {
      const annotations = [{ id: 'a-1' }, { id: 'a-2' }, { id: 'a-3' }];
      mockRepository.getAnnotations.mockResolvedValue(annotations);
      mockRepository.updateAnnotation.mockResolvedValue({ id: 'a-3' });
      const service = createAnnotationService(mockRepository);
      await service.updateAnnotation('doc-1', 'a-3', 'user-1', { content: 'updated' });
      expect(mockRepository.updateAnnotation).toHaveBeenCalledWith('a-3', 'user-1', { content: 'updated' });
    });

    it('should not find annotation for deletion when list is empty', async () => {
      mockRepository.getAnnotations.mockResolvedValue([]);
      const service = createAnnotationService(mockRepository);
      await expect(service.deleteAnnotation('doc-1', 'a-1', 'user-1')).rejects.toThrow();
    });
  });
});
