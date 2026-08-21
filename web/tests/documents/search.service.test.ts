import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSearchService } from '../../src/features/documents/services/search.service';

const mockRepository = {
  fullTextSearch: vi.fn(),
  searchByMetadata: vi.fn(),
  searchByContent: vi.fn(),
  getSearchSuggestions: vi.fn(),
  saveSearchQuery: vi.fn(),
  getSavedSearches: vi.fn(),
  getSearchStats: vi.fn(),
  getDocumentsByTag: vi.fn(),
  getDocumentsByCategory: vi.fn(),
  getDocumentsByDate: vi.fn(),
  getDocumentsByAuthor: vi.fn(),
};

describe('SearchService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create SearchService with all methods', () => {
    const service = createSearchService(mockRepository as any);
    expect(typeof service.searchDocuments).toBe('function');
    expect(typeof service.searchFullText).toBe('function');
    expect(typeof service.searchOCR).toBe('function');
    expect(typeof service.searchByMetadata).toBe('function');
    expect(typeof service.searchByTags).toBe('function');
    expect(typeof service.searchByCategory).toBe('function');
    expect(typeof service.searchByDate).toBe('function');
    expect(typeof service.searchByAuthor).toBe('function');
    expect(typeof service.getSearchStats).toBe('function');
  });

  it('should search documents', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.fullTextSearch.mockResolvedValue([{ id: 'doc1', name: 'Test' }]);
    const result = await service.searchDocuments('school1', 'test query', 'user1');
    expect(result).toEqual([{ id: 'doc1', name: 'Test' }]);
  });

  it('should search documents with options', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.fullTextSearch.mockResolvedValue([{ id: 'doc1' }]);
    await service.searchDocuments('school1', 'query', 'user1', { limit: 10, offset: 0 });
    expect(mockRepository.fullTextSearch).toHaveBeenCalledWith('school1', 'query', { limit: 10, offset: 0 });
  });

  it('should throw if schoolId missing for searchDocuments', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchDocuments('', 'query', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if query too short for searchDocuments', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchDocuments('school1', 'a', 'user1')).rejects.toThrow();
  });

  it('should throw if query empty for searchDocuments', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchDocuments('school1', '', 'user1')).rejects.toThrow();
  });

  it('should throw if userId missing for searchDocuments', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchDocuments('school1', 'query', '')).rejects.toThrow('userId is required');
  });

  it('should perform full text search', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.fullTextSearch.mockResolvedValue([{ id: 'doc1' }]);
    const result = await service.searchFullText('school1', 'hello', 'user1');
    expect(result).toEqual([{ id: 'doc1' }]);
  });

  it('should throw if schoolId missing for searchFullText', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchFullText('', 'query', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if query short for searchFullText', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchFullText('school1', 'a', 'user1')).rejects.toThrow();
  });

  it('should throw if userId missing for searchFullText', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchFullText('school1', 'query', '')).rejects.toThrow('userId is required');
  });

  it('should perform OCR search', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.searchByContent.mockResolvedValue([{ id: 'doc1' }]);
    const result = await service.searchOCR('school1', 'ocr text', 'user1');
    expect(result).toEqual([{ id: 'doc1' }]);
  });

  it('should throw if schoolId missing for searchOCR', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchOCR('', 'query', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if query short for searchOCR', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchOCR('school1', 'a', 'user1')).rejects.toThrow();
  });

  it('should throw if userId missing for searchOCR', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchOCR('school1', 'query', '')).rejects.toThrow('userId is required');
  });

  it('should search by metadata', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.searchByMetadata.mockResolvedValue([{ id: 'doc1' }]);
    const result = await service.searchByMetadata('school1', 'user1', { status: 'active' });
    expect(result).toEqual([{ id: 'doc1' }]);
  });

  it('should throw if schoolId missing for searchByMetadata', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByMetadata('', 'user1', { key: 'val' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for searchByMetadata', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByMetadata('school1', '', { key: 'val' })).rejects.toThrow('userId is required');
  });

  it('should throw if filters missing for searchByMetadata', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByMetadata('school1', 'user1', null as any)).rejects.toThrow('filters are required');
  });

  it('should search by tags', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.getDocumentsByTag.mockResolvedValue([{ id: 'doc1' }]);
    const result = await service.searchByTags('school1', ['t1'], 'user1');
    expect(result).toEqual([{ id: 'doc1' }]);
  });

  it('should throw if schoolId missing for searchByTags', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByTags('', ['t1'], 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if tagIds empty for searchByTags', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByTags('school1', [], 'user1')).rejects.toThrow('tagIds are required');
  });

  it('should throw if userId missing for searchByTags', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByTags('school1', ['t1'], '')).rejects.toThrow('userId is required');
  });

  it('should search by category', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.getDocumentsByCategory.mockResolvedValue([{ id: 'doc1' }]);
    const result = await service.searchByCategory('school1', 'reports', 'user1');
    expect(result).toEqual([{ id: 'doc1' }]);
  });

  it('should throw if schoolId missing for searchByCategory', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByCategory('', 'cat', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if category missing for searchByCategory', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByCategory('school1', '', 'user1')).rejects.toThrow('category is required');
  });

  it('should throw if userId missing for searchByCategory', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByCategory('school1', 'cat', '')).rejects.toThrow('userId is required');
  });

  it('should search by date', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.getDocumentsByDate.mockResolvedValue([{ id: 'doc1' }]);
    const result = await service.searchByDate('school1', '2024-01-01', '2024-01-31', 'user1');
    expect(result).toEqual([{ id: 'doc1' }]);
  });

  it('should throw if schoolId missing for searchByDate', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByDate('', '2024-01-01', '2024-01-31', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if dateFrom missing for searchByDate', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByDate('school1', '', '2024-01-31', 'user1')).rejects.toThrow('dateFrom is required');
  });

  it('should throw if dateTo missing for searchByDate', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByDate('school1', '2024-01-01', '', 'user1')).rejects.toThrow('dateTo is required');
  });

  it('should throw if userId missing for searchByDate', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByDate('school1', '2024-01-01', '2024-01-31', '')).rejects.toThrow('userId is required');
  });

  it('should search by author', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.getDocumentsByAuthor.mockResolvedValue([{ id: 'doc1' }]);
    const result = await service.searchByAuthor('school1', 'author1', 'user1');
    expect(result).toEqual([{ id: 'doc1' }]);
  });

  it('should throw if schoolId missing for searchByAuthor', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByAuthor('', 'author1', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if authorId missing for searchByAuthor', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByAuthor('school1', '', 'user1')).rejects.toThrow('authorId is required');
  });

  it('should throw if userId missing for searchByAuthor', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchByAuthor('school1', 'author1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch search stats', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.getSearchStats.mockResolvedValue({ totalSearches: 50 });
    const result = await service.getSearchStats('school1', 'user1');
    expect(result).toEqual({ totalSearches: 50 });
  });

  it('should throw if schoolId missing for getSearchStats', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.getSearchStats('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getSearchStats', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.getSearchStats('school1', '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for searchDocuments', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.fullTextSearch.mockRejectedValue(new Error('Search failed'));
    await expect(service.searchDocuments('school1', 'query', 'user1')).rejects.toThrow('Search failed');
  });

  it('should handle repository errors for searchByMetadata', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.searchByMetadata.mockRejectedValue(new Error('Metadata failed'));
    await expect(service.searchByMetadata('school1', 'user1', { key: 'val' })).rejects.toThrow('Metadata failed');
  });

  it('should handle repository errors for searchOCR', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.searchByContent.mockRejectedValue(new Error('OCR failed'));
    await expect(service.searchOCR('school1', 'query', 'user1')).rejects.toThrow('OCR failed');
  });

  it('should handle repository errors for getSearchStats', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.getSearchStats.mockRejectedValue(new Error('Stats failed'));
    await expect(service.getSearchStats('school1', 'user1')).rejects.toThrow('Stats failed');
  });
});
