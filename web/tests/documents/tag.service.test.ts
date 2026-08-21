import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTagService } from '../../src/features/documents/services/tag.service';

const mockRepository = {
  getTags: vi.fn(),
  getTag: vi.fn(),
  createTag: vi.fn(),
  updateTag: vi.fn(),
  deleteTag: vi.fn(),
  addTagToDocument: vi.fn(),
  removeTagFromDocument: vi.fn(),
  getDocumentsByTag: vi.fn(),
  bulkTagDocuments: vi.fn(),
};

describe('TagService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create TagService with all methods', () => {
    const service = createTagService(mockRepository as any);
    expect(typeof service.getTags).toBe('function');
    expect(typeof service.createTag).toBe('function');
    expect(typeof service.updateTag).toBe('function');
    expect(typeof service.deleteTag).toBe('function');
    expect(typeof service.getTagDocuments).toBe('function');
    expect(typeof service.untagDocuments).toBe('function');
    expect(typeof service.bulkTag).toBe('function');
  });

  it('should fetch tags', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTags.mockResolvedValue([{ id: 't1', name: 'Important' }]);
    const result = await service.getTags('school1', 'user1');
    expect(result).toEqual([{ id: 't1', name: 'Important' }]);
  });

  it('should throw if schoolId missing for getTags', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.getTags('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getTags', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.getTags('school1', '')).rejects.toThrow('userId is required');
  });

  it('should create a tag', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTags.mockResolvedValue([]);
    mockRepository.createTag.mockResolvedValue({ id: 't1', name: 'New Tag' });
    const result = await service.createTag('school1', 'user1', { name: 'New Tag' });
    expect(result).toEqual({ id: 't1', name: 'New Tag' });
  });

  it('should throw if duplicate tag name exists', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTags.mockResolvedValue([{ id: 't1', name: 'Existing' }]);
    await expect(service.createTag('school1', 'user1', { name: 'Existing' })).rejects.toThrow();
  });

  it('should throw if schoolId missing for createTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.createTag('', 'user1', { name: 'Tag' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for createTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.createTag('school1', '', { name: 'Tag' })).rejects.toThrow('userId is required');
  });

  it('should throw if tag name missing for createTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.createTag('school1', 'user1', {})).rejects.toThrow('tag name is required');
  });

  it('should update a tag', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTag.mockResolvedValue({ id: 't1' });
    mockRepository.updateTag.mockResolvedValue({ id: 't1', name: 'Updated' });
    const result = await service.updateTag('t1', 'user1', { name: 'Updated' });
    expect(result).toEqual({ id: 't1', name: 'Updated' });
  });

  it('should throw if tag not found for updateTag', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTag.mockResolvedValue(null);
    await expect(service.updateTag('t1', 'user1', { name: 'Tag' })).rejects.toThrow();
  });

  it('should throw if tagId missing for updateTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.updateTag('', 'user1', { name: 'Tag' })).rejects.toThrow('tagId is required');
  });

  it('should throw if userId missing for updateTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.updateTag('t1', '', { name: 'Tag' })).rejects.toThrow('userId is required');
  });

  it('should throw if data missing for updateTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.updateTag('t1', 'user1', null as any)).rejects.toThrow('update data is required');
  });

  it('should delete a tag', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTag.mockResolvedValue({ id: 't1' });
    mockRepository.deleteTag.mockResolvedValue(undefined);
    await service.deleteTag('t1', 'user1');
    expect(mockRepository.deleteTag).toHaveBeenCalledWith('t1');
  });

  it('should throw if tag not found for deleteTag', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTag.mockResolvedValue(null);
    await expect(service.deleteTag('t1', 'user1')).rejects.toThrow();
  });

  it('should throw if tagId missing for deleteTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.deleteTag('', 'user1')).rejects.toThrow('tagId is required');
  });

  it('should throw if userId missing for deleteTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.deleteTag('t1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch tag documents', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getDocumentsByTag.mockResolvedValue([{ id: 'doc1' }]);
    const result = await service.getTagDocuments('t1', 'school1', 'user1');
    expect(result).toEqual([{ id: 'doc1' }]);
  });

  it('should throw if tagId missing for getTagDocuments', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.getTagDocuments('', 'school1', 'user1')).rejects.toThrow('tagId is required');
  });

  it('should throw if schoolId missing for getTagDocuments', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.getTagDocuments('t1', '', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getTagDocuments', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.getTagDocuments('t1', 'school1', '')).rejects.toThrow('userId is required');
  });

  it('should untag a document', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.removeTagFromDocument.mockResolvedValue(undefined);
    await service.untagDocuments('doc1', 't1', 'user1');
    expect(mockRepository.removeTagFromDocument).toHaveBeenCalledWith('doc1', 't1');
  });

  it('should throw if documentId missing for untagDocuments', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.untagDocuments('', 't1', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if tagId missing for untagDocuments', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.untagDocuments('doc1', '', 'user1')).rejects.toThrow('tagId is required');
  });

  it('should throw if userId missing for untagDocuments', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.untagDocuments('doc1', 't1', '')).rejects.toThrow('userId is required');
  });

  it('should bulk tag documents', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.bulkTagDocuments.mockResolvedValue({ tagged: 3 });
    const result = await service.bulkTag(['doc1', 'doc2', 'doc3'], ['t1', 't2'], 'user1');
    expect(result).toEqual({ tagged: 3 });
  });

  it('should throw if documentIds empty for bulkTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.bulkTag([], ['t1'], 'user1')).rejects.toThrow('documentIds are required');
  });

  it('should throw if tagIds empty for bulkTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.bulkTag(['doc1'], [], 'user1')).rejects.toThrow('tagIds are required');
  });

  it('should throw if userId missing for bulkTag', async () => {
    const service = createTagService(mockRepository as any);
    await expect(service.bulkTag(['doc1'], ['t1'], '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for getTags', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTags.mockRejectedValue(new Error('DB error'));
    await expect(service.getTags('school1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for createTag', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTags.mockResolvedValue([]);
    mockRepository.createTag.mockRejectedValue(new Error('Create failed'));
    await expect(service.createTag('school1', 'user1', { name: 'Tag' })).rejects.toThrow('Create failed');
  });

  it('should handle repository errors for updateTag', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTag.mockResolvedValue({ id: 't1' });
    mockRepository.updateTag.mockRejectedValue(new Error('Update failed'));
    await expect(service.updateTag('t1', 'user1', { name: 'Tag' })).rejects.toThrow('Update failed');
  });

  it('should handle repository errors for deleteTag', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getTag.mockResolvedValue({ id: 't1' });
    mockRepository.deleteTag.mockRejectedValue(new Error('Delete failed'));
    await expect(service.deleteTag('t1', 'user1')).rejects.toThrow('Delete failed');
  });

  it('should handle repository errors for getTagDocuments', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.getDocumentsByTag.mockRejectedValue(new Error('Fetch failed'));
    await expect(service.getTagDocuments('t1', 'school1', 'user1')).rejects.toThrow('Fetch failed');
  });

  it('should handle repository errors for untagDocuments', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.removeTagFromDocument.mockRejectedValue(new Error('Untag failed'));
    await expect(service.untagDocuments('doc1', 't1', 'user1')).rejects.toThrow('Untag failed');
  });

  it('should handle repository errors for bulkTag', async () => {
    const service = createTagService(mockRepository as any);
    mockRepository.bulkTagDocuments.mockRejectedValue(new Error('Bulk failed'));
    await expect(service.bulkTag(['doc1'], ['t1'], 'user1')).rejects.toThrow('Bulk failed');
  });
});
