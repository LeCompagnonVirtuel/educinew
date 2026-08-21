import type { SupabaseClient } from '@supabase/supabase-js';

interface LearningRecord {
  id: string;
  school_id: string;
  person_id: string;
  title: string;
  provider?: string;
  type: 'course' | 'certification' | 'workshop' | 'seminar' | 'self_study' | 'on_the_job';
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
  start_date?: string;
  end_date?: string;
  completion_date?: string;
  credential_earned?: string;
  skills_gained: string[];
  hours_spent: number;
  rating?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface LearningRecordCreate {
  person_id: string;
  title: string;
  provider?: string;
  type: LearningRecord['type'];
  start_date?: string;
  end_date?: string;
  skills_gained?: string[];
  hours_spent?: number;
  notes?: string;
}

interface LearningFilters {
  person_id?: string;
  type?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class LifelongLearningService {
  private readonly TABLE = 'gewlp_learning_records';

  constructor(private supabase: SupabaseClient) {}

  async getRecord(schoolId: string, id: string): Promise<LearningRecord> {
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

  async listRecords(schoolId: string, filters?: LearningFilters): Promise<LearningRecord[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.person_id) query = query.eq('person_id', filters.person_id);
    if (filters?.type) query = query.eq('type', filters.type);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,provider.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createRecord(schoolId: string, data: LearningRecordCreate): Promise<LearningRecord> {
    const { data: record, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        skills_gained: data.skills_gained ?? [],
        hours_spent: data.hours_spent ?? 0,
        status: 'enrolled',
      })
      .select()
      .single();
    if (error) throw error;
    return record;
  }

  async updateRecord(schoolId: string, id: string, data: Partial<LearningRecordCreate>): Promise<LearningRecord> {
    const existing = await this.getRecord(schoolId, id);
    if (!existing) throw new Error(`Learning record ${id} not found`);

    const { data: record, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return record;
  }

  async deleteRecord(schoolId: string, id: string): Promise<void> {
    const existing = await this.getRecord(schoolId, id);
    if (!existing) throw new Error(`Learning record ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async completeRecord(schoolId: string, id: string, credentialEarned?: string): Promise<LearningRecord> {
    const { data: record, error } = await this.supabase
      .from(this.TABLE)
      .update({
        status: 'completed',
        completion_date: new Date().toISOString(),
        credential_earned: credentialEarned,
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return record;
  }

  async getPersonLearningHistory(schoolId: string, personId: string): Promise<LearningRecord[]> {
    return this.listRecords(schoolId, { person_id: personId, limit: 1000 });
  }

  async getTotalHoursLearned(schoolId: string, personId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('hours_spent')
      .eq('school_id', schoolId)
      .eq('person_id', personId)
      .is('deleted_at', null);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.hours_spent ?? 0), 0);
  }

  async getCompletedCount(schoolId: string, personId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from(this.TABLE)
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('person_id', personId)
      .eq('status', 'completed')
      .is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }
}
