import type { SupabaseClient } from '@supabase/supabase-js';

interface EmploymentProfile {
  id: string;
  school_id: string;
  person_id: string;
  headline?: string;
  summary?: string;
  industry?: string;
  experience_years: number;
  availability: 'immediate' | 'two_weeks' | 'one_month' | 'flexible';
  preferred_work_type: 'full_time' | 'part_time' | 'contract' | 'internship' | 'freelance';
  preferred_location?: string;
  salary_expectation?: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

interface EmploymentProfileCreate {
  person_id: string;
  headline?: string;
  summary?: string;
  industry?: string;
  experience_years?: number;
  availability?: EmploymentProfile['availability'];
  preferred_work_type?: EmploymentProfile['preferred_work_type'];
  preferred_location?: string;
  salary_expectation?: number;
  is_public?: boolean;
}

interface EmploymentFilters {
  person_id?: string;
  industry?: string;
  availability?: string;
  preferred_work_type?: string;
  is_public?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export class EmploymentPlatformService {
  private readonly TABLE = 'gewlp_employment_profiles';

  constructor(private supabase: SupabaseClient) {}

  async getProfile(schoolId: string, id: string): Promise<EmploymentProfile> {
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

  async listProfiles(schoolId: string, filters?: EmploymentFilters): Promise<EmploymentProfile[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.person_id) query = query.eq('person_id', filters.person_id);
    if (filters?.industry) query = query.eq('industry', filters.industry);
    if (filters?.availability) query = query.eq('availability', filters.availability);
    if (filters?.preferred_work_type) query = query.eq('preferred_work_type', filters.preferred_work_type);
    if (filters?.is_public !== undefined) query = query.eq('is_public', filters.is_public);
    if (filters?.search) query = query.or(`headline.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createProfile(schoolId: string, data: EmploymentProfileCreate): Promise<EmploymentProfile> {
    const { data: profile, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        experience_years: data.experience_years ?? 0,
        availability: data.availability ?? 'flexible',
        preferred_work_type: data.preferred_work_type ?? 'full_time',
        is_public: data.is_public ?? true,
      })
      .select()
      .single();
    if (error) throw error;
    return profile;
  }

  async updateProfile(schoolId: string, id: string, data: Partial<EmploymentProfileCreate>): Promise<EmploymentProfile> {
    const existing = await this.getProfile(schoolId, id);
    if (!existing) throw new Error(`Employment profile ${id} not found`);

    const { data: profile, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return profile;
  }

  async deleteProfile(schoolId: string, id: string): Promise<void> {
    const existing = await this.getProfile(schoolId, id);
    if (!existing) throw new Error(`Employment profile ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async getPublicProfiles(schoolId: string, filters?: EmploymentFilters): Promise<EmploymentProfile[]> {
    return this.listProfiles(schoolId, { ...filters, is_public: true });
  }

  async getProfileByPerson(schoolId: string, personId: string): Promise<EmploymentProfile | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('person_id', personId)
      .is('deleted_at', null)
      .single();
    if (error) return null;
    return data;
  }
}
