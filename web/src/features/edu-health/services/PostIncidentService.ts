import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface PostIncidentReview {
  id: string;
  school_id: string;
  review_number: string;
  incident_id: string;
  incident_type: string;
  review_type: 'debrief' | 'investigation' | 'improvement' | 'compliance';
  status: 'scheduled' | 'in_progress' | 'completed' | 'archived';
  review_date: string;
  attendees: string[];
  facilitator_id: string;
  timeline_reconstruction: string;
  what_went_well: string[];
  what_could_improve: string[];
  action_items: ActionItem[];
  policy_changes_recommended: string[];
  training_needs: string[];
  report_url?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ActionItem {
  id: string;
  description: string;
  responsible: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  completed_date?: string;
}

export interface CreatePostIncidentReview {
  incident_id: string;
  incident_type: string;
  review_type: 'debrief' | 'investigation' | 'improvement' | 'compliance';
  review_date: string;
  attendees: string[];
  facilitator_id: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdatePostIncidentReview {
  status?: string;
  timeline_reconstruction?: string;
  what_went_well?: string[];
  what_could_improve?: string[];
  action_items?: ActionItem[];
  policy_changes_recommended?: string[];
  training_needs?: string[];
  report_url?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class PostIncidentService {
  private readonly TABLE = 'post_incident_reviews';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<PostIncidentReview[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<PostIncidentReview | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, review: CreatePostIncidentReview): Promise<PostIncidentReview> {
    const reviewNumber = `PIR-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        review_number: reviewNumber,
        ...review,
        status: 'scheduled',
        what_went_well: [],
        what_could_improve: [],
        action_items: [],
        policy_changes_recommended: [],
        training_needs: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, review: UpdatePostIncidentReview): Promise<PostIncidentReview> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...review, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async addActionItem(schoolId: string, id: string, actionItem: ActionItem): Promise<PostIncidentReview> {
    const review = await this.getById(schoolId, id);
    if (!review) throw new Error('Review not found');

    return this.update(schoolId, id, {
      action_items: [...review.action_items, actionItem],
    });
  }

  async complete(schoolId: string, id: string): Promise<PostIncidentReview> {
    return this.update(schoolId, id, {
      status: 'completed',
    });
  }

  async getByIncident(schoolId: string, incidentId: string): Promise<PostIncidentReview[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('incident_id', incidentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingActionItems(schoolId: string): Promise<PostIncidentReview[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('action_items', 'eq', '[]')
      .is('deleted_at', null);

    if (error) throw error;

    return (data || []).filter((r) =>
      r.action_items.some((a) => a.status !== 'completed')
    );
  }

  async getOverdueActionItems(schoolId: string): Promise<PostIncidentReview[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (error) throw error;

    return (data || []).filter((r) =>
      r.action_items.some(
        (a) => a.status !== 'completed' && a.deadline < new Date().toISOString().split('T')[0]
      )
    );
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    completed: number;
    pendingActionItems: number;
    overdueActionItems: number;
    averageCompletionDays: number;
  }> {
    const reviews = await this.getAll(schoolId);
    const completed = reviews.filter((r) => r.status === 'completed');
    const allActionItems = reviews.flatMap((r) => r.action_items);
    const overdue = allActionItems.filter(
      (a) => a.status !== 'completed' && a.deadline < new Date().toISOString().split('T')[0]
    );

    return {
      total: reviews.length,
      completed: completed.length,
      pendingActionItems: allActionItems.filter((a) => a.status !== 'completed').length,
      overdueActionItems: overdue.length,
      averageCompletionDays: 0,
    };
  }
}
