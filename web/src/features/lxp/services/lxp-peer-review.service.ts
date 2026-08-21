import type { SupabaseClient } from '@supabase/supabase-js';
import type { PeerReview } from '@educi/types';
import { LxpPeerReviewNotFoundError, LxpPeerReviewCreateError, LxpPeerReviewCompleteError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpPeerReviewService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getPeerReview(schoolId: string, id: string): Promise<PeerReview> {
    const review = await this.repo.findPeerReviewById(schoolId, id);
    if (!review) throw new LxpPeerReviewNotFoundError(id);
    return review;
  }

  async listPeerReviews(assignmentId: string): Promise<readonly PeerReview[]> {
    return this.repo.findPeerReviews(assignmentId);
  }

  async createPeerReview(data: Omit<PeerReview, 'id' | 'createdAt' | 'updatedAt'>): Promise<PeerReview> {
    const created = await this.repo.createPeerReview(data);
    if (!created) throw new LxpPeerReviewCreateError();
    return created;
  }

  async completePeerReview(schoolId: string, id: string): Promise<PeerReview> {
    const existing = await this.repo.findPeerReviewById(schoolId, id);
    if (!existing) throw new LxpPeerReviewNotFoundError(id);
    const completed = await this.repo.completePeerReview(id);
    if (!completed) throw new LxpPeerReviewCompleteError();
    return completed;
  }

  async deletePeerReview(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPeerReviewById(schoolId, id);
    if (!existing) throw new LxpPeerReviewNotFoundError(id);
    await this.repo.deletePeerReview(id);
  }
}
