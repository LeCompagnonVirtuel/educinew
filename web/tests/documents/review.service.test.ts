import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createReviewService } from '../../src/features/documents/services/review.service';

describe('ReviewService', () => {
  let mockRepository: {
    getComments: ReturnType<typeof vi.fn>;
    getComment: ReturnType<typeof vi.fn>;
    getDocument: ReturnType<typeof vi.fn>;
    addComment: ReturnType<typeof vi.fn>;
    updateComment: ReturnType<typeof vi.fn>;
    deleteComment: ReturnType<typeof vi.fn>;
    replyToComment: ReturnType<typeof vi.fn>;
    getDocumentStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getComments: vi.fn(),
      getComment: vi.fn(),
      getDocument: vi.fn(),
      addComment: vi.fn(),
      updateComment: vi.fn(),
      deleteComment: vi.fn(),
      replyToComment: vi.fn(),
      getDocumentStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createReviewService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getReviews).toBeInstanceOf(Function);
    expect(service.getReview).toBeInstanceOf(Function);
    expect(service.createReview).toBeInstanceOf(Function);
    expect(service.updateReview).toBeInstanceOf(Function);
    expect(service.deleteReview).toBeInstanceOf(Function);
    expect(service.addReviewComment).toBeInstanceOf(Function);
    expect(service.getReviewStats).toBeInstanceOf(Function);
  });

  describe('getReviews', () => {
    it('should return reviews for a document', async () => {
      const comments = [{ id: 'c-1', content: 'Looks good' }];
      mockRepository.getComments.mockResolvedValue(comments);
      const service = createReviewService(mockRepository);
      const result = await service.getReviews('doc-1', 'school-1', 'user-1');
      expect(result).toEqual(comments);
      expect(mockRepository.getComments).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReviews('', 'school-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReviews('doc-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReviews('doc-1', 'school-1', '')).rejects.toThrow();
    });

    it('should return empty array when no reviews exist', async () => {
      mockRepository.getComments.mockResolvedValue([]);
      const service = createReviewService(mockRepository);
      const result = await service.getReviews('doc-1', 'school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should propagate repository errors', async () => {
      mockRepository.getComments.mockRejectedValue(new Error('Fetch failed'));
      const service = createReviewService(mockRepository);
      await expect(service.getReviews('doc-1', 'school-1', 'user-1')).rejects.toThrow('Fetch failed');
    });
  });

  describe('getReview', () => {
    it('should fetch a single review', async () => {
      const review = { id: 'c-1', content: 'Needs revision' };
      mockRepository.getComment.mockResolvedValue(review);
      const service = createReviewService(mockRepository);
      const result = await service.getReview('c-1', 'doc-1');
      expect(result).toEqual(review);
      expect(mockRepository.getComment).toHaveBeenCalledWith('c-1');
    });

    it('should throw when reviewId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReview('', 'doc-1')).rejects.toThrow();
    });

    it('should throw when documentId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReview('c-1', '')).rejects.toThrow();
    });

    it('should throw when review is not found', async () => {
      mockRepository.getComment.mockResolvedValue(null);
      const service = createReviewService(mockRepository);
      await expect(service.getReview('c-1', 'doc-1')).rejects.toThrow();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getComment.mockRejectedValue(new Error('Not found'));
      const service = createReviewService(mockRepository);
      await expect(service.getReview('c-1', 'doc-1')).rejects.toThrow('Not found');
    });
  });

  describe('createReview', () => {
    it('should create a review successfully', async () => {
      const document = { id: 'doc-1' };
      const review = { id: 'c-1', content: 'Approved' };
      mockRepository.getDocument.mockResolvedValue(document);
      mockRepository.addComment.mockResolvedValue(review);
      const service = createReviewService(mockRepository);
      const result = await service.createReview('doc-1', 'school-1', 'user-1', 'Approved');
      expect(result).toEqual(review);
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.addComment).toHaveBeenCalledWith('doc-1', 'user-1', 'Approved');
    });

    it('should throw when documentId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.createReview('', 'school-1', 'user-1', 'content')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.createReview('doc-1', '', 'user-1', 'content')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.createReview('doc-1', 'school-1', '', 'content')).rejects.toThrow();
    });

    it('should throw when content is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.createReview('doc-1', 'school-1', 'user-1', '')).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createReviewService(mockRepository);
      await expect(service.createReview('doc-1', 'school-1', 'user-1', 'content')).rejects.toThrow();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Create failed'));
      const service = createReviewService(mockRepository);
      await expect(service.createReview('doc-1', 'school-1', 'user-1', 'content')).rejects.toThrow('Create failed');
    });
  });

  describe('updateReview', () => {
    it('should update a review successfully', async () => {
      const review = { id: 'c-1', content: 'old' };
      const updated = { id: 'c-1', content: 'updated' };
      mockRepository.getComment.mockResolvedValue(review);
      mockRepository.updateComment.mockResolvedValue(updated);
      const service = createReviewService(mockRepository);
      const result = await service.updateReview('c-1', 'doc-1', 'user-1', 'updated');
      expect(result).toEqual(updated);
      expect(mockRepository.updateComment).toHaveBeenCalledWith('c-1', 'user-1', 'updated');
    });

    it('should throw when reviewId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.updateReview('', 'doc-1', 'user-1', 'content')).rejects.toThrow();
    });

    it('should throw when documentId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.updateReview('c-1', '', 'user-1', 'content')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.updateReview('c-1', 'doc-1', '', 'content')).rejects.toThrow();
    });

    it('should throw when content is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.updateReview('c-1', 'doc-1', 'user-1', '')).rejects.toThrow();
    });

    it('should throw when review is not found', async () => {
      mockRepository.getComment.mockResolvedValue(null);
      const service = createReviewService(mockRepository);
      await expect(service.updateReview('c-1', 'doc-1', 'user-1', 'content')).rejects.toThrow();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getComment.mockResolvedValue({ id: 'c-1' });
      mockRepository.updateComment.mockRejectedValue(new Error('Update failed'));
      const service = createReviewService(mockRepository);
      await expect(service.updateReview('c-1', 'doc-1', 'user-1', 'content')).rejects.toThrow('Update failed');
    });
  });

  describe('deleteReview', () => {
    it('should delete a review successfully', async () => {
      mockRepository.getComment.mockResolvedValue({ id: 'c-1' });
      mockRepository.deleteComment.mockResolvedValue(undefined);
      const service = createReviewService(mockRepository);
      await service.deleteReview('c-1', 'doc-1', 'user-1');
      expect(mockRepository.deleteComment).toHaveBeenCalledWith('c-1', 'user-1');
    });

    it('should throw when reviewId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.deleteReview('', 'doc-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when documentId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.deleteReview('c-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.deleteReview('c-1', 'doc-1', '')).rejects.toThrow();
    });

    it('should throw when review is not found', async () => {
      mockRepository.getComment.mockResolvedValue(null);
      const service = createReviewService(mockRepository);
      await expect(service.deleteReview('c-1', 'doc-1', 'user-1')).rejects.toThrow();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getComment.mockResolvedValue({ id: 'c-1' });
      mockRepository.deleteComment.mockRejectedValue(new Error('Delete failed'));
      const service = createReviewService(mockRepository);
      await expect(service.deleteReview('c-1', 'doc-1', 'user-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('addReviewComment', () => {
    it('should add a comment to a review', async () => {
      const review = { id: 'c-1' };
      const reply = { id: 'c-2', content: 'Reply text' };
      mockRepository.getComment.mockResolvedValue(review);
      mockRepository.replyToComment.mockResolvedValue(reply);
      const service = createReviewService(mockRepository);
      const result = await service.addReviewComment('c-1', 'doc-1', 'user-1', 'Reply text');
      expect(result).toEqual(reply);
      expect(mockRepository.replyToComment).toHaveBeenCalledWith('c-1', 'user-1', 'Reply text');
    });

    it('should throw when reviewId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.addReviewComment('', 'doc-1', 'user-1', 'content')).rejects.toThrow();
    });

    it('should throw when documentId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.addReviewComment('c-1', '', 'user-1', 'content')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.addReviewComment('c-1', 'doc-1', '', 'content')).rejects.toThrow();
    });

    it('should throw when content is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.addReviewComment('c-1', 'doc-1', 'user-1', '')).rejects.toThrow();
    });

    it('should throw when review is not found', async () => {
      mockRepository.getComment.mockResolvedValue(null);
      const service = createReviewService(mockRepository);
      await expect(service.addReviewComment('c-1', 'doc-1', 'user-1', 'content')).rejects.toThrow();
    });

    it('should propagate repository errors', async () => {
      mockRepository.getComment.mockResolvedValue({ id: 'c-1' });
      mockRepository.replyToComment.mockRejectedValue(new Error('Reply failed'));
      const service = createReviewService(mockRepository);
      await expect(service.addReviewComment('c-1', 'doc-1', 'user-1', 'content')).rejects.toThrow('Reply failed');
    });
  });

  describe('getReviewStats', () => {
    it('should fetch review stats successfully', async () => {
      const stats = { totalReviews: 10 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createReviewService(mockRepository);
      const result = await service.getReviewStats('school-1', 'user-1');
      expect(result).toEqual(stats);
    });

    it('should throw when schoolId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReviewStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReviewStats('school-1', '')).rejects.toThrow();
    });

    it('should pass date range to repository', async () => {
      const stats = { totalReviews: 5 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createReviewService(mockRepository);
      await service.getReviewStats('school-1', 'user-1', '2026-01-01', '2026-12-31');
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith('school-1', '2026-01-01', '2026-12-31');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Stats failed'));
      const service = createReviewService(mockRepository);
      await expect(service.getReviewStats('school-1', 'user-1')).rejects.toThrow('Stats failed');
    });
  });

  describe('missing required parameters', () => {
    it('should throw when getReviews receives all empty strings', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReviews('', '', '')).rejects.toThrow();
    });

    it('should throw when getReview receives undefined reviewId', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReview(undefined as any, 'doc-1')).rejects.toThrow();
    });

    it('should throw when createReview receives all empty strings', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.createReview('', '', '', '')).rejects.toThrow();
    });

    it('should throw when updateReview receives undefined parameters', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.updateReview(undefined as any, undefined as any, undefined as any, undefined as any)).rejects.toThrow();
    });

    it('should throw when deleteReview receives null reviewId', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.deleteReview(null as any, 'doc-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when addReviewComment receives undefined content', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.addReviewComment('c-1', 'doc-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should throw when getReviewStats receives undefined schoolId', async () => {
      const service = createReviewService(mockRepository);
      await expect(service.getReviewStats(undefined as any, 'user-1')).rejects.toThrow();
    });
  });

  describe('repository error handling', () => {
    it('should handle getDocument failure in createReview', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Connection lost'));
      const service = createReviewService(mockRepository);
      await expect(service.createReview('doc-1', 'school-1', 'user-1', 'content')).rejects.toThrow('Connection lost');
    });

    it('should handle addComment failure in createReview', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.addComment.mockRejectedValue(new Error('Write failed'));
      const service = createReviewService(mockRepository);
      await expect(service.createReview('doc-1', 'school-1', 'user-1', 'content')).rejects.toThrow('Write failed');
    });

    it('should handle replyToComment failure in addReviewComment', async () => {
      mockRepository.getComment.mockResolvedValue({ id: 'c-1' });
      mockRepository.replyToComment.mockRejectedValue(new Error('Reply failed'));
      const service = createReviewService(mockRepository);
      await expect(service.addReviewComment('c-1', 'doc-1', 'user-1', 'reply')).rejects.toThrow('Reply failed');
    });
  });
});
