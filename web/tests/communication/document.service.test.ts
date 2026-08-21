import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDocumentService } from '../../src/features/communication/services/document.service';

const mockRepository = {
  getDocuments: vi.fn(),
  getDocument: vi.fn(),
  createDocument: vi.fn(),
  updateDocument: vi.fn(),
  deleteDocument: vi.fn(),
  shareDocument: vi.fn(),
  getDocumentVersions: vi.fn(),
  addDocumentVersion: vi.fn(),
  addDocumentComment: vi.fn(),
  getDocumentStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('DocumentService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create DocumentService with all methods', () => {
    const service = createDocumentService(mockRepository as any);
    expect(typeof service.getDocuments).toBe('function');
    expect(typeof service.getDocument).toBe('function');
    expect(typeof service.createDocument).toBe('function');
    expect(typeof service.updateDocument).toBe('function');
    expect(typeof service.deleteDocument).toBe('function');
    expect(typeof service.moveDocument).toBe('function');
    expect(typeof service.shareDocument).toBe('function');
    expect(typeof service.getDocumentVersions).toBe('function');
    expect(typeof service.addDocumentVersion).toBe('function');
    expect(typeof service.addDocumentComment).toBe('function');
    expect(typeof service.getDocumentStats).toBe('function');
  });

  it('should fetch documents', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocuments.mockResolvedValue([{ id: 'd1' }]);
    const result = await service.getDocuments('school1', 'user1');
    expect(result).toEqual([{ id: 'd1' }]);
  });

  it('should throw if schoolId missing for getDocuments', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.getDocuments('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should fetch a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'd1', name: 'Report' });
    const result = await service.getDocument('d1', 'user1');
    expect(result).toEqual({ id: 'd1', name: 'Report' });
  });

  it('should throw if document not found', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.getDocument('d1', 'user1')).rejects.toThrow();
  });

  it('should create a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.createDocument.mockResolvedValue({ id: 'd1', name: 'New Doc' });
    const result = await service.createDocument('school1', 'user1', { name: 'New Doc' });
    expect(result.name).toBe('New Doc');
  });

  it('should throw if name missing for createDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.createDocument('school1', 'user1', {})).rejects.toThrow('document name is required');
  });

  it('should update a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'd1', schoolId: 'school1', version: 1 });
    mockRepository.updateDocument.mockResolvedValue({ id: 'd1', version: 2 });
    const result = await service.updateDocument('d1', 'user1', { content: 'Updated' });
    expect(result.version).toBe(2);
  });

  it('should throw if data missing for updateDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.updateDocument('d1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should throw if document not found for update', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.updateDocument('d1', 'user1', { content: 'X' })).rejects.toThrow();
  });

  it('should delete a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'd1', schoolId: 'school1' });
    await service.deleteDocument('d1', 'user1');
    expect(mockRepository.deleteDocument).toHaveBeenCalledWith('d1');
  });

  it('should throw if document not found for delete', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.deleteDocument('d1', 'user1')).rejects.toThrow();
  });

  it('should move a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'd1', schoolId: 'school1' });
    mockRepository.updateDocument.mockResolvedValue({ id: 'd1', folderId: 'f2' });
    const result = await service.moveDocument('d1', 'user1', 'f2');
    expect(result.folderId).toBe('f2');
  });

  it('should throw if targetFolderId missing for moveDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.moveDocument('d1', 'user1', '')).rejects.toThrow('targetFolderId is required');
  });

  it('should share a document', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'd1', schoolId: 'school1' });
    mockRepository.shareDocument.mockResolvedValue({ id: 'share1', userId: 'user2', permissionLevel: 'read' });
    const result = await service.shareDocument('d1', 'user1', 'user2', 'read');
    expect(result.permissionLevel).toBe('read');
  });

  it('should throw if shareWithUserId missing for shareDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.shareDocument('d1', 'user1', '', 'read')).rejects.toThrow('shareWithUserId is required');
  });

  it('should throw if permissionLevel missing for shareDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.shareDocument('d1', 'user1', 'user2', '')).rejects.toThrow('permissionLevel is required');
  });

  it('should get document versions', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'd1' });
    mockRepository.getDocumentVersions.mockResolvedValue([{ version: 1 }, { version: 2 }]);
    const result = await service.getDocumentVersions('d1', 'user1');
    expect(result).toHaveLength(2);
  });

  it('should throw if document not found for getDocumentVersions', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.getDocumentVersions('d1', 'user1')).rejects.toThrow();
  });

  it('should add document version', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'd1', schoolId: 'school1', version: 1 });
    mockRepository.addDocumentVersion.mockResolvedValue({ id: 'v1', versionNumber: 2 });
    const result = await service.addDocumentVersion('d1', 'user1', { content: 'v2' });
    expect(result.versionNumber).toBe(2);
  });

  it('should throw if data missing for addDocumentVersion', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.addDocumentVersion('d1', 'user1', undefined)).rejects.toThrow('version data is required');
  });

  it('should add document comment', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'd1', schoolId: 'school1' });
    mockRepository.addDocumentComment.mockResolvedValue({ id: 'c1', content: 'Nice' });
    const result = await service.addDocumentComment('d1', 'user1', 'Nice');
    expect(result.content).toBe('Nice');
  });

  it('should throw if content missing for addDocumentComment', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.addDocumentComment('d1', 'user1', '')).rejects.toThrow('comment content is required');
  });

  it('should get document stats', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocumentStats.mockResolvedValue({ total: 20 });
    const result = await service.getDocumentStats('school1');
    expect(result).toEqual({ total: 20 });
  });

  it('should handle getDocuments with filters', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocuments.mockResolvedValue([]);
    await service.getDocuments('school1', 'user1', { type: 'pdf' });
    expect(mockRepository.getDocuments).toHaveBeenCalledWith('school1', 'user1', { type: 'pdf' });
  });

  it('should handle getDocumentStats with date range', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocumentStats.mockResolvedValue({ total: 10 });
    await service.getDocumentStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getDocumentStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should log event on createDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.createDocument.mockResolvedValue({ id: 'd1' });
    await service.createDocument('school1', 'user1', { name: 'D' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'document.created', expect.any(Object));
  });

  it('should log event on deleteDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'd1', schoolId: 'school1' });
    await service.deleteDocument('d1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'document.deleted', expect.any(Object));
  });

  it('should throw if documentId missing for getDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.getDocument('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if documentId missing for updateDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.updateDocument('', 'user1', { content: 'X' })).rejects.toThrow('documentId is required');
  });

  it('should throw if documentId missing for deleteDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.deleteDocument('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if documentId missing for moveDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.moveDocument('', 'user1', 'f2')).rejects.toThrow('documentId is required');
  });

  it('should throw if documentId missing for shareDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.shareDocument('', 'user1', 'user2', 'read')).rejects.toThrow('documentId is required');
  });

  it('should throw if documentId missing for getDocumentVersions', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.getDocumentVersions('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if documentId missing for addDocumentVersion', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.addDocumentVersion('', 'user1', { content: 'v2' })).rejects.toThrow('documentId is required');
  });

  it('should throw if documentId missing for addDocumentComment', async () => {
    const service = createDocumentService(mockRepository as any);
    await expect(service.addDocumentComment('', 'user1', 'C')).rejects.toThrow('documentId is required');
  });

  it('should throw if document not found for moveDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.moveDocument('d1', 'user1', 'f2')).rejects.toThrow();
  });

  it('should throw if document not found for shareDocument', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.shareDocument('d1', 'user1', 'user2', 'read')).rejects.toThrow();
  });

  it('should throw if document not found for addDocumentVersion', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.addDocumentVersion('d1', 'user1', { content: 'v2' })).rejects.toThrow();
  });

  it('should throw if document not found for addDocumentComment', async () => {
    const service = createDocumentService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.addDocumentComment('d1', 'user1', 'C')).rejects.toThrow();
  });
});
