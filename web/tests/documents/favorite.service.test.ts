import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFavoriteService } from '../../src/features/documents/services/favorite.service';

describe('FavoriteService', () => {
  const mockRepository = {
    getFavoriteDocuments: vi.fn(),
    getFavoriteFolders: vi.fn(),
    getDocument: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';
  const documentId = 'doc-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create service with all methods', () => {
    const service = createFavoriteService(mockRepository as any);
    expect(service.getFavoriteDocuments).toBeDefined();
    expect(service.getFavoriteFolders).toBeDefined();
    expect(service.addFavorite).toBeDefined();
    expect(service.removeFavorite).toBeDefined();
  });

  describe('getFavoriteDocuments', () => {
    it('should return favorite documents', async () => {
      const docs = [{ id: 'd1', name: 'doc1.pdf' }, { id: 'd2', name: 'doc2.pdf' }];
      mockRepository.getFavoriteDocuments.mockResolvedValue(docs);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteDocuments(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.getFavoriteDocuments('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.getFavoriteDocuments(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no favorites', async () => {
      mockRepository.getFavoriteDocuments.mockResolvedValue([]);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteDocuments(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getFavoriteDocuments.mockRejectedValue(new Error('Fetch failed'));
      const service = createFavoriteService(mockRepository as any);
      await expect(service.getFavoriteDocuments(schoolId, userId)).rejects.toThrow('Fetch failed');
    });

    it('should call repository with schoolId and userId', async () => {
      mockRepository.getFavoriteDocuments.mockResolvedValue([]);
      const service = createFavoriteService(mockRepository as any);
      await service.getFavoriteDocuments(schoolId, userId);
      expect(mockRepository.getFavoriteDocuments).toHaveBeenCalledWith(schoolId, userId);
    });

    it('should return documents with names', async () => {
      const docs = [{ id: 'd1', name: 'report.pdf', type: 'document' }];
      mockRepository.getFavoriteDocuments.mockResolvedValue(docs);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteDocuments(schoolId, userId);
      expect(result[0].name).toBe('report.pdf');
    });

    it('should handle many favorite documents', async () => {
      const docs = Array.from({ length: 50 }, (_, i) => ({ id: `d${i}` }));
      mockRepository.getFavoriteDocuments.mockResolvedValue(docs);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteDocuments(schoolId, userId);
      expect(result).toHaveLength(50);
    });

    it('should handle documents with different types', async () => {
      const docs = [{ id: 'd1', type: 'pdf' }, { id: 'd2', type: 'image' }];
      mockRepository.getFavoriteDocuments.mockResolvedValue(docs);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteDocuments(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should handle network timeout', async () => {
      mockRepository.getFavoriteDocuments.mockRejectedValue(new Error('Network timeout'));
      const service = createFavoriteService(mockRepository as any);
      await expect(service.getFavoriteDocuments(schoolId, userId)).rejects.toThrow('Network timeout');
    });
  });

  describe('getFavoriteFolders', () => {
    it('should return favorite folders', async () => {
      const folders = [{ id: 'f1', name: 'Folder 1' }, { id: 'f2', name: 'Folder 2' }];
      mockRepository.getFavoriteFolders.mockResolvedValue(folders);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteFolders(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.getFavoriteFolders('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.getFavoriteFolders(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no favorite folders', async () => {
      mockRepository.getFavoriteFolders.mockResolvedValue([]);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteFolders(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getFavoriteFolders.mockRejectedValue(new Error('Fetch failed'));
      const service = createFavoriteService(mockRepository as any);
      await expect(service.getFavoriteFolders(schoolId, userId)).rejects.toThrow('Fetch failed');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getFavoriteFolders.mockResolvedValue([]);
      const service = createFavoriteService(mockRepository as any);
      await service.getFavoriteFolders(schoolId, userId);
      expect(mockRepository.getFavoriteFolders).toHaveBeenCalledWith(schoolId);
    });

    it('should return folders with names', async () => {
      const folders = [{ id: 'f1', name: 'Projects' }];
      mockRepository.getFavoriteFolders.mockResolvedValue(folders);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteFolders(schoolId, userId);
      expect(result[0].name).toBe('Projects');
    });

    it('should handle nested folders', async () => {
      const folders = [{ id: 'f1', name: 'Level 1', parentId: null }, { id: 'f2', name: 'Level 2', parentId: 'f1' }];
      mockRepository.getFavoriteFolders.mockResolvedValue(folders);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteFolders(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should handle many favorite folders', async () => {
      const folders = Array.from({ length: 20 }, (_, i) => ({ id: `f${i}` }));
      mockRepository.getFavoriteFolders.mockResolvedValue(folders);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.getFavoriteFolders(schoolId, userId);
      expect(result).toHaveLength(20);
    });

    it('should handle database connection error', async () => {
      mockRepository.getFavoriteFolders.mockRejectedValue(new Error('Database connection lost'));
      const service = createFavoriteService(mockRepository as any);
      await expect(service.getFavoriteFolders(schoolId, userId)).rejects.toThrow('Database connection lost');
    });
  });

  describe('addFavorite', () => {
    it('should add document to favorites', async () => {
      const doc = { id: documentId, name: 'doc.pdf' };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.addFavorite(documentId, schoolId, userId);
      expect(result.id).toBe(documentId);
    });

    it('should throw when document not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createFavoriteService(mockRepository as any);
      await expect(service.addFavorite(documentId, schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing documentId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.addFavorite('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.addFavorite(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.addFavorite(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Add favorite failed'));
      const service = createFavoriteService(mockRepository as any);
      await expect(service.addFavorite(documentId, schoolId, userId)).rejects.toThrow('Add favorite failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      const service = createFavoriteService(mockRepository as any);
      await service.addFavorite(documentId, schoolId, userId);
      expect(mockRepository.getDocument).toHaveBeenCalledWith(documentId);
    });

    it('should return document with favorite status', async () => {
      const doc = { id: documentId, isFavorite: true };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.addFavorite(documentId, schoolId, userId);
      expect(result.isFavorite).toBe(true);
    });

    it('already favorited document', async () => {
      const doc = { id: documentId, isFavorite: true };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createFavoriteService(mockRepository as any);
      const result = await service.addFavorite(documentId, schoolId, userId);
      expect(result.isFavorite).toBe(true);
    });

    it('should handle document in trash', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Document is in trash'));
      const service = createFavoriteService(mockRepository as any);
      await expect(service.addFavorite(documentId, schoolId, userId)).rejects.toThrow('Document is in trash');
    });
  });

  describe('removeFavorite', () => {
    it('should remove document from favorites', async () => {
      const doc = { id: documentId };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createFavoriteService(mockRepository as any);
      await service.removeFavorite(documentId, schoolId, userId);
      expect(mockRepository.getDocument).toHaveBeenCalledWith(documentId);
    });

    it('should throw when document not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createFavoriteService(mockRepository as any);
      await expect(service.removeFavorite(documentId, schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing documentId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.removeFavorite('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.removeFavorite(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createFavoriteService(mockRepository as any);
      await expect(service.removeFavorite(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Remove favorite failed'));
      const service = createFavoriteService(mockRepository as any);
      await expect(service.removeFavorite(documentId, schoolId, userId)).rejects.toThrow('Remove favorite failed');
    });

    it('should call repository with documentId', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: documentId });
      const service = createFavoriteService(mockRepository as any);
      await service.removeFavorite(documentId, schoolId, userId);
      expect(mockRepository.getDocument).toHaveBeenCalledWith(documentId);
    });

    it('should handle already unfavorited document', async () => {
      const doc = { id: documentId, isFavorite: false };
      mockRepository.getDocument.mockResolvedValue(doc);
      const service = createFavoriteService(mockRepository as any);
      await service.removeFavorite(documentId, schoolId, userId);
      expect(mockRepository.getDocument).toHaveBeenCalled();
    });

    it('should handle permission errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Permission denied'));
      const service = createFavoriteService(mockRepository as any);
      await expect(service.removeFavorite(documentId, schoolId, userId)).rejects.toThrow('Permission denied');
    });

    it('should handle concurrent access', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Document is being modified'));
      const service = createFavoriteService(mockRepository as any);
      await expect(service.removeFavorite(documentId, schoolId, userId)).rejects.toThrow('Document is being modified');
    });
  });
});
