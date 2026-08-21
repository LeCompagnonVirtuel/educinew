import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Review {
  id: string;
  school_id: string;
  order_id: string;
  reviewer_school_id: string;
  reviewee_school_id: string;
  rating: number;
  title?: string;
  comment?: string;
  status: 'active' | 'hidden' | 'flagged';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewRequest {
  school_id: string;
  order_id: string;
  reviewer_school_id: string;
  reviewee_school_id: string;
  rating: number;
  title?: string;
  comment?: string;
  status?: Review['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateReviewRequest {
  rating?: number;
  title?: string | null;
  comment?: string | null;
  status?: Review['status'];
  metadata?: Record<string, unknown>;
}

export class ReviewService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Review | null> {
    const { data, error } = await this.supabase
      .from('gei2p_reviews')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching review', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Review;
  }

  async listEntities(schoolId: string, filters?: { order_id?: string; reviewer_school_id?: string; reviewee_school_id?: string; limit?: number; offset?: number }): Promise<Review[]> {
    let query = this.supabase
      .from('gei2p_reviews')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.order_id) query = query.eq('order_id', filters.order_id);
    if (filters?.reviewer_school_id) query = query.eq('reviewer_school_id', filters.reviewer_school_id);
    if (filters?.reviewee_school_id) query = query.eq('reviewee_school_id', filters.reviewee_school_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing reviews', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Review[];
  }

  async createEntity(data: CreateReviewRequest): Promise<Review | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_reviews')
      .insert({
        school_id: data.school_id,
        order_id: data.order_id,
        reviewer_school_id: data.reviewer_school_id,
        reviewee_school_id: data.reviewee_school_id,
        rating: data.rating,
        title: data.title,
        comment: data.comment,
        status: data.status || 'active',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating review', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Review created', { id: created.id }, 'gei2p');
    return created as Review;
  }

  async updateEntity(id: string, data: UpdateReviewRequest): Promise<Review | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_reviews')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating review', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Review updated', { id }, 'gei2p');
    return updated as Review;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_reviews')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting review', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Review deleted', { id }, 'gei2p');
    return true;
  }
}
