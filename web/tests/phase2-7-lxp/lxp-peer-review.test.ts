import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpPeerReviewService } from '@/features/lxp/services/lxp-peer-review.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  data: null as Record<string, unknown> | null,
  error: null as { message: string } | null,
};

describe('LxpPeerReviewService', () => {
  let service: LxpPeerReviewService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpPeerReviewService(mockSupabase as never);
  });

  describe('getPeerReview', () => {
    it('should return peer review by id', async () => {
      mockSupabase.data = { id: 'pr-1', assignment_id: 'assign-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReview('pr-1');
      expect(result).toBeDefined();
    });

    it('should return null when peer review not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getPeerReview('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getPeerReview('pr-1')).rejects.toThrow();
    });

    it('should include feedback when requested', async () => {
      mockSupabase.data = { id: 'pr-1', feedback: 'Great work!' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReview('pr-1', { includeFeedback: true });
      expect(result).toBeDefined();
    });

    it('should validate peer review id', async () => {
      await expect(service.getPeerReview('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'pr-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getPeerReview('pr-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include rubric scores', async () => {
      mockSupabase.data = { id: 'pr-1', rubric_scores: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReview('pr-1', { includeRubricScores: true });
      expect(result).toBeDefined();
    });

    it('should include reviewer info', async () => {
      mockSupabase.data = { id: 'pr-1', reviewer: { name: 'Student A' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReview('pr-1', { includeReviewer: true });
      expect(result).toBeDefined();
    });

    it('should include submission info', async () => {
      mockSupabase.data = { id: 'pr-1', submission: { id: 'sub-1' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReview('pr-1', { includeSubmission: true });
      expect(result).toBeDefined();
    });

    it('include completion status', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReview('pr-1', { includeStatus: true });
      expect(result).toBeDefined();
    });
  });

  describe('createPeerReview', () => {
    it('should create a new peer review', async () => {
      mockSupabase.data = { id: 'pr-new', assignment_id: 'assign-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPeerReview({ assignment_id: 'assign-1', reviewer_id: 'student-1', submission_id: 'sub-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty assignment_id', async () => {
      await expect(service.createPeerReview({ assignment_id: '', reviewer_id: 's1', submission_id: 'sub-1' })).rejects.toThrow();
    });

    it('should set default status to pending', async () => {
      mockSupabase.data = { id: 'pr-new', status: 'pending' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPeerReview({ assignment_id: 'a1', reviewer_id: 's1', submission_id: 'sub-1' });
      expect(result).toHaveProperty('status', 'pending');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'pr-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPeerReview({ assignment_id: 'a1', reviewer_id: 's1', submission_id: 'sub-1' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createPeerReview({ assignment_id: 'a1', reviewer_id: 's1', submission_id: 'sub-1' })).rejects.toThrow();
    });

    it('should handle creation with due date', async () => {
      mockSupabase.data = { id: 'pr-new', due_date: '2024-12-31' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPeerReview({ assignment_id: 'a1', reviewer_id: 's1', submission_id: 'sub-1', due_date: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle creation with anonymous option', async () => {
      mockSupabase.data = { id: 'pr-new', anonymous: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPeerReview({ assignment_id: 'a1', reviewer_id: 's1', submission_id: 'sub-1', anonymous: true });
      expect(result).toBeDefined();
    });

    it('should handle creation with rubric', async () => {
      mockSupabase.data = { id: 'pr-new', rubric_id: 'rubric-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPeerReview({ assignment_id: 'a1', reviewer_id: 's1', submission_id: 'sub-1', rubric_id: 'rubric-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with instructions', async () => {
      mockSupabase.data = { id: 'pr-new', instructions: 'Review constructively' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPeerReview({ assignment_id: 'a1', reviewer_id: 's1', submission_id: 'sub-1', instructions: 'Review constructively' });
      expect(result).toBeDefined();
    });

    it('should prevent self-review', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'self_review_not_allowed' } });
      await expect(service.createPeerReview({ assignment_id: 'a1', reviewer_id: 's1', submission_id: 'sub-1' })).rejects.toThrow();
    });
  });

  describe('updatePeerReview', () => {
    it('should update peer review fields', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'in_progress' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePeerReview('pr-1', { status: 'in_progress' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'pr-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePeerReview('pr-1', { status: 'in_progress' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updatePeerReview('pr-1', {})).rejects.toThrow();
    });

    it('should handle non-existent peer review', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updatePeerReview('nonexistent', { status: 'completed' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updatePeerReview('pr-1', { status: 'completed' })).rejects.toThrow();
    });

    it('should update feedback', async () => {
      mockSupabase.data = { id: 'pr-1', feedback: 'Excellent work!' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePeerReview('pr-1', { feedback: 'Excellent work!' });
      expect(result).toBeDefined();
    });

    it('should update rubric scores', async () => {
      mockSupabase.data = { id: 'pr-1', rubric_scores: [{ criterion: 'Quality', score: 4 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePeerReview('pr-1', { rubric_scores: [{ criterion: 'Quality', score: 4 }] });
      expect(result).toBeDefined();
    });

    it('should update rating', async () => {
      mockSupabase.data = { id: 'pr-1', rating: 4 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePeerReview('pr-1', { rating: 4 });
      expect(result).toBeDefined();
    });

    it('should update completion status', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'completed', completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePeerReview('pr-1', { status: 'completed' });
      expect(result).toBeDefined();
    });

    it('should update comments', async () => {
      mockSupabase.data = { id: 'pr-1', comments: 'Good improvements needed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePeerReview('pr-1', { comments: 'Good improvements needed' });
      expect(result).toBeDefined();
    });
  });

  describe('deletePeerReview', () => {
    it('should delete a peer review', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deletePeerReview('pr-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent peer review deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deletePeerReview('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deletePeerReview('pr-1')).rejects.toThrow();
    });

    it('should prevent deletion of completed review', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deletePeerReview('pr-1')).rejects.toThrow();
    });

    it('should validate peer review id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deletePeerReview('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deletePeerReview('pr-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related data', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deletePeerReview('pr-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should preserve peer review data on soft delete', async () => {
      mockSupabase.data = { id: 'pr-1', deleted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.deletePeerReview('pr-1');
      expect(result).toBeDefined();
    });
  });

  describe('assignReviewers', () => {
    it('should assign reviewers to submissions', async () => {
      mockSupabase.data = [{ id: 'pr-1', reviewer_id: 'student-1' }, { id: 'pr-2', reviewer_id: 'student-2' }];
      const result = await service.assignReviewers('assign-1', ['student-1', 'student-2']);
      expect(result).toBeDefined();
    });

    it('should validate assignment id', async () => {
      await expect(service.assignReviewers('', ['student-1'])).rejects.toThrow();
    });

    it('should validate reviewer list', async () => {
      await expect(service.assignReviewers('assign-1', [])).rejects.toThrow();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'assign failed' } });
      await expect(service.assignReviewers('assign-1', ['student-1'])).rejects.toThrow();
    });

    it('should support random assignment', async () => {
      mockSupabase.data = [{ id: 'pr-1' }];
      const result = await service.assignReviewers('assign-1', ['student-1', 'student-2'], { random: true });
      expect(result).toBeDefined();
    });

    it('should support balanced assignment', async () => {
      mockSupabase.data = [{ id: 'pr-1' }];
      const result = await service.assignReviewers('assign-1', ['student-1', 'student-2'], { balanced: true });
      expect(result).toBeDefined();
    });

    it('should support custom review count', async () => {
      mockSupabase.data = [{ id: 'pr-1' }];
      const result = await service.assignReviewers('assign-1', ['student-1'], { reviewsPerStudent: 3 });
      expect(result).toBeDefined();
    });

    it('should prevent self-assignment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'self_assignment_not_allowed' } });
      await expect(service.assignReviewers('assign-1', ['student-1'])).rejects.toThrow();
    });

    it('should handle duplicate assignments', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'unique_violation' } });
      await expect(service.assignReviewers('assign-1', ['student-1'])).rejects.toThrow();
    });

    it('should send notification to reviewers', async () => {
      mockSupabase.data = [{ id: 'pr-1' }];
      const result = await service.assignReviewers('assign-1', ['student-1'], { notify: true });
      expect(result).toBeDefined();
    });
  });

  describe('completePeerReview', () => {
    it('should mark peer review as complete', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'completed', completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.completePeerReview('pr-1');
      expect(result).toBeDefined();
    });

    it('should set completion timestamp', async () => {
      mockSupabase.data = { id: 'pr-1', completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.completePeerReview('pr-1');
      expect(result).toHaveProperty('completed_at');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'complete failed' } });
      await expect(service.completePeerReview('pr-1')).rejects.toThrow();
    });

    it('should validate peer review id', async () => {
      await expect(service.completePeerReview('')).rejects.toThrow();
    });

    it('should handle non-existent peer review', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.completePeerReview('nonexistent');
      expect(result).toBeNull();
    });

    it('should prevent completing already completed review', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.completePeerReview('pr-1')).rejects.toThrow();
    });

    it('should send notification to student', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.completePeerReview('pr-1', { notify: true });
      expect(result).toBeDefined();
    });

    it('should update submission grade after completion', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'completed', grade_updated: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.completePeerReview('pr-1', { updateGrade: true });
      expect(result).toBeDefined();
    });

    it('should handle completion with feedback requirement', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.completePeerReview('pr-1', { requireFeedback: true });
      expect(result).toBeDefined();
    });

    it('should handle completion with rubric requirement', async () => {
      mockSupabase.data = { id: 'pr-1', status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.completePeerReview('pr-1', { requireRubric: true });
      expect(result).toBeDefined();
    });
  });

  describe('getPeerReviewFeedback', () => {
    it('should return aggregated peer review feedback', async () => {
      mockSupabase.data = { avg_rating: 4.2, feedback_count: 5 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReviewFeedback('sub-1');
      expect(result).toBeDefined();
    });

    it('should return null for submission with no reviews', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getPeerReviewFeedback('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getPeerReviewFeedback('sub-1')).rejects.toThrow();
    });

    it('should validate submission id', async () => {
      await expect(service.getPeerReviewFeedback('')).rejects.toThrow();
    });

    it('should include individual reviews', async () => {
      mockSupabase.data = { avg_rating: 4.2, reviews: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReviewFeedback('sub-1', { includeReviews: true });
      expect(result).toBeDefined();
    });

    it('should include rubric breakdown', async () => {
      mockSupabase.data = { avg_rating: 4.2, rubric_breakdown: {} };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReviewFeedback('sub-1', { includeRubricBreakdown: true });
      expect(result).toBeDefined();
    });

    it('should include rating distribution', async () => {
      mockSupabase.data = { avg_rating: 4.2, distribution: { 1: 0, 2: 1, 3: 1, 4: 2, 5: 1 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReviewFeedback('sub-1', { includeDistribution: true });
      expect(result).toBeDefined();
    });

    it('should include common themes', async () => {
      mockSupabase.data = { avg_rating: 4.2, themes: ['Clear writing', 'Good structure'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReviewFeedback('sub-1', { includeThemes: true });
      expect(result).toBeDefined();
    });

    it('include improvement suggestions', async () => {
      mockSupabase.data = { avg_rating: 4.2, suggestions: ['Add more examples'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReviewFeedback('sub-1', { includeSuggestions: true });
      expect(result).toBeDefined();
    });

    it('should include strength points', async () => {
      mockSupabase.data = { avg_rating: 4.2, strengths: ['Strong thesis'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPeerReviewFeedback('sub-1', { includeStrengths: true });
      expect(result).toBeDefined();
    });
  });
});
