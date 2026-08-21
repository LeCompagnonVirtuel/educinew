import type { SupabaseClient } from '@supabase/supabase-js';

interface CareerWalletEntry {
  id: string;
  school_id: string;
  person_id: string;
  entry_type: 'experience' | 'education' | 'skill' | 'credential' | 'project' | 'publication';
  title: string;
  organization?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  skills_used: string[];
  is_current: boolean;
  verified: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface CareerWalletEntryCreate {
  person_id: string;
  entry_type: CareerWalletEntry['entry_type'];
  title: string;
  organization?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  skills_used?: string[];
  is_current?: boolean;
  metadata?: Record<string, unknown>;
}

interface CareerWalletFilters {
  person_id?: string;
  entry_type?: string;
  is_current?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export class CareerWalletService {
  private readonly TABLE = 'gewlp_career_wallet_entries';

  constructor(private supabase: SupabaseClient) {}

  async getEntry(schoolId: string, id: string): Promise<CareerWalletEntry> {
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

  async listEntries(schoolId: string, filters?: CareerWalletFilters): Promise<CareerWalletEntry[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.person_id) query = query.eq('person_id', filters.person_id);
    if (filters?.entry_type) query = query.eq('entry_type', filters.entry_type);
    if (filters?.is_current !== undefined) query = query.eq('is_current', filters.is_current);
    if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('start_date', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createEntry(schoolId: string, data: CareerWalletEntryCreate): Promise<CareerWalletEntry> {
    const { data: entry, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        skills_used: data.skills_used ?? [],
        is_current: data.is_current ?? false,
        verified: false,
      })
      .select()
      .single();
    if (error) throw error;
    return entry;
  }

  async updateEntry(schoolId: string, id: string, data: Partial<CareerWalletEntryCreate>): Promise<CareerWalletEntry> {
    const existing = await this.getEntry(schoolId, id);
    if (!existing) throw new Error(`Career wallet entry ${id} not found`);

    const { data: entry, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return entry;
  }

  async deleteEntry(schoolId: string, id: string): Promise<void> {
    const existing = await this.getEntry(schoolId, id);
    if (!existing) throw new Error(`Career wallet entry ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async verifyEntry(schoolId: string, id: string): Promise<CareerWalletEntry> {
    const { data: entry, error } = await this.supabase
      .from(this.TABLE)
      .update({ verified: true, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return entry;
  }

  async getPersonTimeline(schoolId: string, personId: string): Promise<CareerWalletEntry[]> {
    return this.listEntries(schoolId, { person_id: personId, limit: 1000 });
  }

  async getPersonSkillsSummary(schoolId: string, personId: string): Promise<string[]> {
    const entries = await this.listEntries(schoolId, { person_id: personId, limit: 1000 });
    const allSkills = entries.flatMap(e => e.skills_used);
    return [...new Set(allSkills)];
  }

  async getCurrentEntries(schoolId: string, personId: string): Promise<CareerWalletEntry[]> {
    return this.listEntries(schoolId, { person_id: personId, is_current: true, limit: 100 });
  }
}
