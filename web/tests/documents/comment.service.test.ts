import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCommentService } from '../../src/features/documents/services/comment.service';

const mockRepository = {
  getComments: vi.fn(),
  getComment: vi.fn(),
  addComment: vi.fn(),
  updateComment: vi.fn(),
  deleteComment: vi.fn(),
};

describe('CommentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create CommentService with all methods', () => {
    const service = createCommentService(mockRepository as any);
    expect(typeof service.getComments).toBe('function');
    expect(typeof service.getComment).toBe('function');
    expect(typeof service.createComment).toBe('function');
    expect(typeof service.updateComment).toBe('function');
    expect(typeof service.deleteComment).toBe('function');
  });

  it('should fetch comments', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComments.mockResolvedValue([{ id: 'c1', content: 'Nice' }]);
    const result = await service.getComments('doc1', 'user1');
    expect(result).toEqual([{ id: 'c1', content: 'Nice' }]);
  });

  it('should throw if documentId missing for getComments', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.getComments('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for getComments', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.getComments('doc1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single comment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComment.mockResolvedValue({ id: 'c1', content: 'Great work' });
    const result = await service.getComment('c1', 'user1');
    expect(result).toEqual({ id: 'c1', content: 'Great work' });
  });

  it('should throw if comment not found', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComment.mockResolvedValue(null);
    await expect(service.getComment('c1', 'user1')).rejects.toThrow();
  });

  it('should throw if commentId missing for getComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.getComment('', 'user1')).rejects.toThrow('commentId is required');
  });

  it('should throw if userId missing for getComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.getComment('c1', '')).rejects.toThrow('userId is required');
  });

  it('should create a comment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.addComment.mockResolvedValue({ id: 'c1', content: 'Looks good' });
    const result = await service.createComment('doc1', 'user1', 'Looks good');
    expect(result).toEqual({ id: 'c1', content: 'Looks good' });
  });

  it('should create a reply comment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.addComment.mockResolvedValue({ id: 'c2', content: 'Thanks', parentId: 'c1' });
    const result = await service.createComment('doc1', 'user1', 'Thanks', 'c1');
    expect(result).toEqual({ id: 'c2', content: 'Thanks', parentId: 'c1' });
  });

  it('should throw if documentId missing for createComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.createComment('', 'user1', 'content')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for createComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.createComment('doc1', '', 'content')).rejects.toThrow('userId is required');
  });

  it('should throw if content empty for createComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.createComment('doc1', 'user1', '')).rejects.toThrow('comment content is required');
  });

  it('should throw if content whitespace for createComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.createComment('doc1', 'user1', '   ')).rejects.toThrow('comment content is required');
  });

  it('should update a comment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComment.mockResolvedValue({ id: 'c1' });
    mockRepository.updateComment.mockResolvedValue({ id: 'c1', content: 'Updated' });
    const result = await service.updateComment('c1', 'user1', 'Updated');
    expect(result).toEqual({ id: 'c1', content: 'Updated' });
  });

  it('should throw if comment not found for updateComment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComment.mockResolvedValue(null);
    await expect(service.updateComment('c1', 'user1', 'content')).rejects.toThrow();
  });

  it('should throw if commentId missing for updateComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.updateComment('', 'user1', 'content')).rejects.toThrow('commentId is required');
  });

  it('should throw if userId missing for updateComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.updateComment('c1', '', 'content')).rejects.toThrow('userId is required');
  });

  it('should throw if content empty for updateComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.updateComment('c1', 'user1', '')).rejects.toThrow('comment content is required');
  });

  it('should delete a comment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComment.mockResolvedValue({ id: 'c1' });
    mockRepository.deleteComment.mockResolvedValue(undefined);
    await service.deleteComment('c1', 'user1');
    expect(mockRepository.deleteComment).toHaveBeenCalledWith('c1', 'user1');
  });

  it('should throw if comment not found for deleteComment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComment.mockResolvedValue(null);
    await expect(service.deleteComment('c1', 'user1')).rejects.toThrow();
  });

  it('should throw if commentId missing for deleteComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.deleteComment('', 'user1')).rejects.toThrow('commentId is required');
  });

  it('should throw if userId missing for deleteComment', async () => {
    const service = createCommentService(mockRepository as any);
    await expect(service.deleteComment('c1', '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for getComments', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComments.mockRejectedValue(new Error('DB error'));
    await expect(service.getComments('doc1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for createComment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.addComment.mockRejectedValue(new Error('Create failed'));
    await expect(service.createComment('doc1', 'user1', 'content')).rejects.toThrow('Create failed');
  });

  it('should handle repository errors for updateComment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComment.mockResolvedValue({ id: 'c1' });
    mockRepository.updateComment.mockRejectedValue(new Error('Update failed'));
    await expect(service.updateComment('c1', 'user1', 'content')).rejects.toThrow('Update failed');
  });

  it('should handle repository errors for deleteComment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComment.mockResolvedValue({ id: 'c1' });
    mockRepository.deleteComment.mockRejectedValue(new Error('Delete failed'));
    await expect(service.deleteComment('c1', 'user1')).rejects.toThrow('Delete failed');
  });

  it('should handle repository errors for getComment', async () => {
    const service = createCommentService(mockRepository as any);
    mockRepository.getComment.mockRejectedValue(new Error('Fetch failed'));
    await expect(service.getComment('c1', 'user1')).rejects.toThrow('Fetch failed');
  });
});
