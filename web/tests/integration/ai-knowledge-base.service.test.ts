import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAIKnowledgeBaseService } from '../../src/features/integration/services/ai-knowledge-base.service';

describe('AIKnowledgeBaseService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getKnowledgeBases: vi.fn(),
      getKnowledgeBaseById: vi.fn(),
      createKnowledgeBase: vi.fn(),
      updateKnowledgeBase: vi.fn(),
      deleteKnowledgeBase: vi.fn(),
      addDocument: vi.fn(),
      removeDocument: vi.fn(),
      searchKnowledge: vi.fn(),
      getKnowledgeBaseStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAIKnowledgeBaseService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getKnowledgeBases).toBeInstanceOf(Function);
    expect(service.getKnowledgeBaseById).toBeInstanceOf(Function);
    expect(service.createKnowledgeBase).toBeInstanceOf(Function);
    expect(service.updateKnowledgeBase).toBeInstanceOf(Function);
    expect(service.deleteKnowledgeBase).toBeInstanceOf(Function);
    expect(service.addDocument).toBeInstanceOf(Function);
    expect(service.removeDocument).toBeInstanceOf(Function);
    expect(service.searchKnowledge).toBeInstanceOf(Function);
    expect(service.getKnowledgeBaseStats).toBeInstanceOf(Function);
  });

  describe('getKnowledgeBases', () => {
    it('should return knowledge bases list', async () => {
      mockRepository.getKnowledgeBases.mockResolvedValue([{ id: 'kb-1', name: 'Course Materials', documentCount: 50 }]);
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.getKnowledgeBases('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return knowledge bases with filters', async () => {
      mockRepository.getKnowledgeBases.mockResolvedValue([{ id: 'kb-1' }]);
      const service = createAIKnowledgeBaseService(mockRepository);
      await service.getKnowledgeBases('school-1', { status: 'active' });
      expect(mockRepository.getKnowledgeBases).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.getKnowledgeBases('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getKnowledgeBases.mockResolvedValue([]);
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.getKnowledgeBases('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated knowledge bases', async () => {
      mockRepository.getKnowledgeBases.mockResolvedValue({ data: [{ id: 'kb-1' }], total: 10 });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.getKnowledgeBases('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getKnowledgeBases.mockResolvedValue([{ id: 'kb-1', type: 'course_materials' }]);
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.getKnowledgeBases('school-1', { type: 'course_materials' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getKnowledgeBases.mockRejectedValue(new Error('DB error'));
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.getKnowledgeBases('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getKnowledgeBaseById', () => {
    it('should return a single knowledge base', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue({ id: 'kb-1', name: 'Course Materials', documentCount: 50 });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.getKnowledgeBaseById('kb-1');
      expect(result.id).toBe('kb-1');
    });

    it('should throw if knowledge base not found', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue(null);
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.getKnowledgeBaseById('nonexistent')).rejects.toThrow('Knowledge base not found');
    });

    it('should throw if id is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.getKnowledgeBaseById('')).rejects.toThrow('Knowledge base ID is required');
    });

    it('should return knowledge base with documents', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue({ id: 'kb-1', documents: [{ id: 'doc-1', title: 'Lecture 1' }] });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.getKnowledgeBaseById('kb-1');
      expect(result.documents).toHaveLength(1);
    });

    it('should return knowledge base with embedding model', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue({ id: 'kb-1', embeddingModel: 'text-embedding-ada-002' });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.getKnowledgeBaseById('kb-1');
      expect(result.embeddingModel).toBe('text-embedding-ada-002');
    });

    it('should handle repository errors', async () => {
      mockRepository.getKnowledgeBaseById.mockRejectedValue(new Error('Query timeout'));
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.getKnowledgeBaseById('kb-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createKnowledgeBase', () => {
    it('should create a knowledge base', async () => {
      mockRepository.createKnowledgeBase.mockResolvedValue({ id: 'kb-1', name: 'Course Materials', status: 'active' });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.createKnowledgeBase('school-1', 'user-1', { name: 'Course Materials', type: 'course_materials' });
      expect(result.id).toBe('kb-1');
      expect(mockRepository.createKnowledgeBase).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.createKnowledgeBase('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.createKnowledgeBase('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.createKnowledgeBase('school-1', 'user-1', { name: '' })).rejects.toThrow('Knowledge base name is required');
    });

    it('should create knowledge base with embedding model', async () => {
      mockRepository.createKnowledgeBase.mockResolvedValue({ id: 'kb-1', embeddingModel: 'text-embedding-ada-002' });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.createKnowledgeBase('school-1', 'user-1', { name: 'T', type: 'course_materials', embeddingModel: 'text-embedding-ada-002' });
      expect(result.embeddingModel).toBe('text-embedding-ada-002');
    });

    it('should create knowledge base with description', async () => {
      mockRepository.createKnowledgeBase.mockResolvedValue({ id: 'kb-1', description: 'Course lecture notes and materials' });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.createKnowledgeBase('school-1', 'user-1', { name: 'T', type: 'course_materials', description: 'Course lecture notes and materials' });
      expect(result.description).toBe('Course lecture notes and materials');
    });

    it('should handle creation failure', async () => {
      mockRepository.createKnowledgeBase.mockRejectedValue(new Error('Invalid config'));
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.createKnowledgeBase('school-1', 'user-1', { name: 'T', type: 'course_materials' })).rejects.toThrow('Invalid config');
    });
  });

  describe('updateKnowledgeBase', () => {
    it('should update a knowledge base', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue({ id: 'kb-1', name: 'Old' });
      mockRepository.updateKnowledgeBase.mockResolvedValue({ id: 'kb-1', name: 'Updated' });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.updateKnowledgeBase('kb-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if knowledge base not found', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue(null);
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.updateKnowledgeBase('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.updateKnowledgeBase('', 'user-1', { name: 'New' })).rejects.toThrow('Knowledge base ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.updateKnowledgeBase('kb-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update knowledge base config', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue({ id: 'kb-1' });
      mockRepository.updateKnowledgeBase.mockResolvedValue({ id: 'kb-1', embeddingModel: 'new-model' });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.updateKnowledgeBase('kb-1', 'user-1', { embeddingModel: 'new-model' });
      expect(result.embeddingModel).toBe('new-model');
    });

    it('should handle update failure', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue({ id: 'kb-1' });
      mockRepository.updateKnowledgeBase.mockRejectedValue(new Error('Cannot update'));
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.updateKnowledgeBase('kb-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteKnowledgeBase', () => {
    it('should delete a knowledge base', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue({ id: 'kb-1' });
      mockRepository.deleteKnowledgeBase.mockResolvedValue({ success: true });
      const service = createAIKnowledgeBaseService(mockRepository);
      await service.deleteKnowledgeBase('kb-1', 'user-1');
      expect(mockRepository.deleteKnowledgeBase).toHaveBeenCalledWith('kb-1');
    });

    it('should throw if knowledge base not found', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue(null);
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.deleteKnowledgeBase('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.deleteKnowledgeBase('', 'user-1')).rejects.toThrow('Knowledge base ID is required');
    });

    it('should handle deletion with active usage', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue({ id: 'kb-1' });
      mockRepository.deleteKnowledgeBase.mockRejectedValue(new Error('Knowledge base is in use'));
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.deleteKnowledgeBase('kb-1', 'user-1')).rejects.toThrow('Knowledge base is in use');
    });

    it('should force delete knowledge base', async () => {
      mockRepository.getKnowledgeBaseById.mockResolvedValue({ id: 'kb-1' });
      mockRepository.deleteKnowledgeBase.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.deleteKnowledgeBase('kb-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('addDocument', () => {
    it('should add a document to knowledge base', async () => {
      mockRepository.addDocument.mockResolvedValue({ knowledgeBaseId: 'kb-1', documentId: 'doc-1', status: 'indexing' });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.addDocument('kb-1', { documentId: 'doc-1' });
      expect(result.status).toBe('indexing');
    });

    it('should throw if knowledgeBaseId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.addDocument('', { documentId: 'doc-1' })).rejects.toThrow('Knowledge base ID is required');
    });

    it('should throw if documentId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.addDocument('kb-1', { documentId: '' })).rejects.toThrow('Document ID is required');
    });

    it('should handle add failure', async () => {
      mockRepository.addDocument.mockRejectedValue(new Error('Document already exists'));
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.addDocument('kb-1', { documentId: 'doc-1' })).rejects.toThrow('Document already exists');
    });

    it('should return indexing details', async () => {
      mockRepository.addDocument.mockResolvedValue({ knowledgeBaseId: 'kb-1', documentId: 'doc-1', status: 'indexing', chunksCreated: 10 });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.addDocument('kb-1', { documentId: 'doc-1' });
      expect(result.chunksCreated).toBe(10);
    });
  });

  describe('removeDocument', () => {
    it('should remove a document from knowledge base', async () => {
      mockRepository.removeDocument.mockResolvedValue({ success: true });
      const service = createAIKnowledgeBaseService(mockRepository);
      await service.removeDocument('kb-1', 'doc-1');
      expect(mockRepository.removeDocument).toHaveBeenCalledWith('kb-1', 'doc-1');
    });

    it('should throw if knowledgeBaseId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.removeDocument('', 'doc-1')).rejects.toThrow('Knowledge base ID is required');
    });

    it('should throw if documentId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.removeDocument('kb-1', '')).rejects.toThrow('Document ID is required');
    });

    it('should handle removal failure', async () => {
      mockRepository.removeDocument.mockRejectedValue(new Error('Document not found'));
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.removeDocument('kb-1', 'doc-1')).rejects.toThrow('Document not found');
    });
  });

  describe('searchKnowledge', () => {
    it('should search knowledge base', async () => {
      mockRepository.searchKnowledge.mockResolvedValue([{ documentId: 'doc-1', content: 'Relevant content', score: 0.95 }]);
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.searchKnowledge('kb-1', { query: 'What is calculus?' });
      expect(result).toHaveLength(1);
      expect(result[0].score).toBe(0.95);
    });

    it('should throw if knowledgeBaseId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.searchKnowledge('', { query: 'test' })).rejects.toThrow('Knowledge base ID is required');
    });

    it('should throw if query is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.searchKnowledge('kb-1', { query: '' })).rejects.toThrow('Search query is required');
    });

    it('should return empty results', async () => {
      mockRepository.searchKnowledge.mockResolvedValue([]);
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.searchKnowledge('kb-1', { query: 'nonexistent topic' });
      expect(result).toEqual([]);
    });

    it('should search with top-k', async () => {
      mockRepository.searchKnowledge.mockResolvedValue(Array.from({ length: 5 }, (_, i) => ({ documentId: `doc-${i}`, score: 0.9 - i * 0.1 })));
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.searchKnowledge('kb-1', { query: 'test', topK: 5 });
      expect(result).toHaveLength(5);
    });

    it('should handle search failure', async () => {
      mockRepository.searchKnowledge.mockRejectedValue(new Error('Index not ready'));
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.searchKnowledge('kb-1', { query: 'test' })).rejects.toThrow('Index not ready');
    });
  });

  describe('getKnowledgeBaseStats', () => {
    it('should return knowledge base stats', async () => {
      mockRepository.getKnowledgeBaseStats.mockResolvedValue({ knowledgeBaseId: 'kb-1', totalDocuments: 50, totalChunks: 500, totalQueries: 1000 });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.getKnowledgeBaseStats('kb-1');
      expect(result.totalDocuments).toBe(50);
      expect(result.totalChunks).toBe(500);
    });

    it('should return stats with filters', async () => {
      mockRepository.getKnowledgeBaseStats.mockResolvedValue({ knowledgeBaseId: 'kb-1', queries: [] });
      const service = createAIKnowledgeBaseService(mockRepository);
      await service.getKnowledgeBaseStats('kb-1', { since: '2024-01-01' });
      expect(mockRepository.getKnowledgeBaseStats).toHaveBeenCalledWith('kb-1', { since: '2024-01-01' });
    });

    it('should throw if knowledgeBaseId is missing', async () => {
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.getKnowledgeBaseStats('')).rejects.toThrow('Knowledge base ID is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getKnowledgeBaseStats.mockResolvedValue({ knowledgeBaseId: 'kb-1', totalDocuments: 0 });
      const service = createAIKnowledgeBaseService(mockRepository);
      const result = await service.getKnowledgeBaseStats('kb-1');
      expect(result.totalDocuments).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getKnowledgeBaseStats.mockRejectedValue(new Error('DB error'));
      const service = createAIKnowledgeBaseService(mockRepository);
      await expect(service.getKnowledgeBaseStats('kb-1')).rejects.toThrow('DB error');
    });
  });
});
