import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDocumentService } from '../../src/features/documents/services/document.service';

const mockRepository = {
  getDocuments: vi.fn(),
  getDocument: vi.fn(),
  createDocument: vi.fn(),
  updateDocument: vi.fn(),
  deleteDocument: vi.fn(),
  restoreDocument: vi.fn(),
  permanentDeleteDocument: vi.fn(),
  bulkDeleteDocuments: vi.fn(),
  bulkRestoreDocuments: vi.fn(),
  searchDocuments: vi.fn(),
};

describe('DocumentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create DocumentService with all methods', () => {
    const service = createDocumentService(mockRepository as any);
    expect(typeof service.getDocuments).toBe('function');
    expect(typeof service.getDocument).toBe('function');
    expect(typeof service.createDocument).toBe('function');
    expect(typeof service.updateDocument).toBe('function');
    expect(typeof service.deleteDocument).toBe('function');
    expect(typeof service.restoreDocument).toBe('function');
    expect(typeof service.permanentDeleteDocument).toBe('function');
    expect(typeof service.bulkDeleteDocuments).toBe('function');
    expect(typeof service.bulkRestoreDocuments).toBe('function');
    expect(typeof service.searchDocuments).toBe('function');
  });

  it('should fetch documents', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocuments.mockResolvedValue([{ id: 'doc1' }]);
    const result = await service.getDocuments('school1', 'user1');
    expect(result).toEqual([{ id: 'doc1' }]);
    expect(mockRepository.getDocuments).toHaveBeenCalledWith('school1', undefined);
  });

  it('should fetch documents with filters', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocuments.mockResolvedValue([{ id: 'doc1' }]);
    const filters = { status: 'active' };
    await service.getDocuments('school1', 'user1', filters);
    expect(mockRepository.getDocuments).toHaveBeenCalledWith('school1', filters);
  });

  it('should throw if schoolId missing for getDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.getDocuments('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.getDocuments('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1', name: 'Test Doc' });
    const result = await service.getDocument('doc1', 'user1');
    expect(result).toEqual({ id: 'doc1', name: 'Test Doc' });
  });

  it('should throw if document not found', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.getDocument('doc1', 'user1')).rejects.toThrow();
  });

  it('should throw if documentId missing for getDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.getDocument('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for getDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.getDocument('doc1', '')).rejects.toThrow('userId is required');
  });

  it('should create a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.createDocument.mockResolvedValue({ id: 'doc1', name: 'New Doc' });
    const result = await service.createDocument('school1', 'user1', { name: 'New Doc' });
    expect(result).toEqual({ id: 'doc1', name: 'New Doc' });
    expect(mockRepository.createDocument).toHaveBeenCalledWith({ name: 'New Doc', createdBy: 'user1' }, 'school1');
  });

  it('should throw if schoolId missing for createDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.createDocument('', 'user1', { name: 'Doc' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for createDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.createDocument('school1', '', { name: 'Doc' })).rejects.toThrow('userId is required');
  });

  it('should throw if document name missing for createDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.createDocument('school1', 'user1', {})).rejects.toThrow('document name is required');
  });

  it('should throw if data is null for createDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.createDocument('school1', 'user1', null as any)).rejects.toThrow('document name is required');
  });

  it('should update a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.updateDocument.mockResolvedValue({ id: 'doc1', name: 'Updated' });
    const result = await service.updateDocument('doc1', 'user1', { name: 'Updated' });
    expect(result).toEqual({ id: 'doc1', name: 'Updated' });
  });

  it('should throw if documentId missing for updateDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.updateDocument('', 'user1', { name: 'Doc' })).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for updateDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.updateDocument('doc1', '', { name: 'Doc' })).rejects.toThrow('userId is required');
  });

  it('should throw if data missing for updateDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.updateDocument('doc1', 'user1', null as any)).rejects.toThrow('update data is required');
  });

  it('should throw if document not found for updateDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.updateDocument('doc1', 'user1', { name: 'Doc' })).rejects.toThrow();
  });

  it('should delete a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.deleteDocument.mockResolvedValue(undefined);
    await service.deleteDocument('doc1', 'user1');
    expect(mockRepository.deleteDocument).toHaveBeenCalledWith('doc1');
  });

  it('should throw if documentId missing for deleteDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.deleteDocument('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for deleteDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.deleteDocument('doc1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if document not found for deleteDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.deleteDocument('doc1', 'user1')).rejects.toThrow();
  });

  it('should restore a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.restoreDocument.mockResolvedValue({ id: 'doc1', deleted: false });
    const result = await service.restoreDocument('doc1', 'user1');
    expect(result).toEqual({ id: 'doc1', deleted: false });
  });

  it('should throw if documentId missing for restoreDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.restoreDocument('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for restoreDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.restoreDocument('doc1', '')).rejects.toThrow('userId is required');
  });

  it('should permanently delete a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.permanentDeleteDocument.mockResolvedValue(undefined);
    await service.permanentDeleteDocument('doc1', 'user1');
    expect(mockRepository.permanentDeleteDocument).toHaveBeenCalledWith('doc1');
  });

  it('should throw if documentId missing for permanentDeleteDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.permanentDeleteDocument('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for permanentDeleteDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.permanentDeleteDocument('doc1', '')).rejects.toThrow('userId is required');
  });

  it('should bulk delete documents', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.bulkDeleteDocuments.mockResolvedValue({ deleted: 3 });
    const result = await service.bulkDeleteDocuments(['doc1', 'doc2', 'doc3'], 'user1');
    expect(result).toEqual({ deleted: 3 });
  });

  it('should throw if documentIds empty for bulkDeleteDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.bulkDeleteDocuments([], 'user1')).rejects.toThrow('documentIds are required');
  });

  it('should throw if documentIds null for bulkDeleteDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.bulkDeleteDocuments(null as any, 'user1')).rejects.toThrow('documentIds are required');
  });

  it('should throw if userId missing for bulkDeleteDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.bulkDeleteDocuments(['doc1'], '')).rejects.toThrow('userId is required');
  });

  it('should bulk restore documents', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.bulkRestoreDocuments.mockResolvedValue({ restored: 2 });
    const result = await service.bulkRestoreDocuments(['doc1', 'doc2'], 'user1');
    expect(result).toEqual({ restored: 2 });
  });

  it('should throw if documentIds empty for bulkRestoreDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.bulkRestoreDocuments([], 'user1')).rejects.toThrow('documentIds are required');
  });

  it('should throw if documentIds null for bulkRestoreDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.bulkRestoreDocuments(null as any, 'user1')).rejects.toThrow('documentIds are required');
  });

  it('should throw if userId missing for bulkRestoreDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.bulkRestoreDocuments(['doc1'], '')).rejects.toThrow('userId is required');
  });

  it('should search documents', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.searchDocuments.mockResolvedValue([{ id: 'doc1', name: 'Test' }]);
    const result = await service.searchDocuments('school1', 'Test', 'user1');
    expect(result).toEqual([{ id: 'doc1', name: 'Test' }]);
  });

  it('should throw if schoolId missing for searchDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.searchDocuments('', 'query', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if query too short for searchDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.searchDocuments('school1', 'a', 'user1')).rejects.toThrow();
  });

  it('should throw if query empty for searchDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.searchDocuments('school1', '', 'user1')).rejects.toThrow();
  });

  it('should throw if userId missing for searchDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.searchDocuments('school1', 'query', '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for getDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocuments.mockRejectedValue(new Error('DB error'));
    await expect(service.getDocuments('school1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for createDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.createDocument.mockRejectedValue(new Error('Create failed'));
    await expect(service.createDocument('school1', 'user1', { name: 'Doc' })).rejects.toThrow('Create failed');
  });

  it('should handle repository errors for updateDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.updateDocument.mockRejectedValue(new Error('Update failed'));
    await expect(service.updateDocument('doc1', 'user1', { name: 'Doc' })).rejects.toThrow('Update failed');
  });

  it('should handle repository errors for deleteDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.deleteDocument.mockRejectedValue(new Error('Delete failed'));
    await expect(service.deleteDocument('doc1', 'user1')).rejects.toThrow('Delete failed');
  });

  it('should handle repository errors for searchDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.searchDocuments.mockRejectedValue(new Error('Search failed'));
    await expect(service.searchDocuments('school1', 'query', 'user1')).rejects.toThrow('Search failed');
  });

  it('should handle repository errors for bulkDeleteDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.bulkDeleteDocuments.mockRejectedValue(new Error('Bulk delete failed'));
    await expect(service.bulkDeleteDocuments(['doc1'], 'user1')).rejects.toThrow('Bulk delete failed');
  });

  it('should handle repository errors for bulkRestoreDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.bulkRestoreDocuments.mockRejectedValue(new Error('Bulk restore failed'));
    await expect(service.bulkRestoreDocuments(['doc1'], 'user1')).rejects.toThrow('Bulk restore failed');
  });
});
