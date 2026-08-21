import type { SupabaseClient } from '@supabase/supabase-js';

interface TalentProfile {
  id: string;
  school_id: string;
  person_id: string;
  display_name: string;
  headline?: string;
  skills: string[];
  experience_level: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  hourly_rate?: number;
  availability: 'immediate' | 'two_weeks' | 'one_month' | 'contract';
  portfolio_url?: string;
  endorsements_count: number;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

interface TalentProfileCreate {
  person_id: string;
  display_name: string;
  headline?: string;
  skills?: string[];
  experience_level?: TalentProfile['experience_level'];
  hourly_rate?: number;
  availability?: TalentProfile['availability'];
  portfolio_url?: string;
}

interface TalentFilters {
  experience_level?: string;
  availability?: string;
  min_rating?: number;
  min_hourly_rate?: number;
  max_hourly_rate?: number;
  skills?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

interface TalentMatch {
  talent_id: string;
  match_score: number;
  matched_skills: string[];
}

export class TalentMarketplaceService {
  private readonly TABLE = 'gewlp_talent_profiles';

  constructor(private supabase: SupabaseClient) {}

  async getProfile(schoolId: string, id: string): Promise<TalentProfile> {
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

  async listProfiles(schoolId: string, filters?: TalentFilters): Promise<TalentProfile[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.experience_level) query = query.eq('experience_level', filters.experience_level);
    if (filters?.availability) query = query.eq('availability', filters.availability);
    if (filters?.min_rating) query = query.gte('rating', filters.min_rating);
    if (filters?.min_hourly_rate) query = query.gte('hourly_rate', filters.min_hourly_rate);
    if (filters?.max_hourly_rate) query = query.lte('hourly_rate', filters.max_hourly_rate);
    if (filters?.search) query = query.or(`display_name.ilike.%${filters.search}%,headline.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('rating', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createProfile(schoolId: string, data: TalentProfileCreate): Promise<TalentProfile> {
    const { data: profile, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        skills: data.skills ?? [],
        experience_level: data.experience_level ?? 'entry',
        availability: data.availability ?? 'immediate',
        endorsements_count: 0,
        rating: 0,
        is_featured: false,
      })
      .select()
      .single();
    if (error) throw error;
    return profile;
  }

  async updateProfile(schoolId: string, id: string, data: Partial<TalentProfileCreate>): Promise<TalentProfile> {
    const existing = await this.getProfile(schoolId, id);
    if (!existing) throw new Error(`Talent profile ${id} not found`);

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
    if (!existing) throw new Error(`Talent profile ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async searchBySkills(schoolId: string, requiredSkills: string[], minRating?: number): Promise<TalentMatch[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('id, skills, rating')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .overlaps('skills', requiredSkills);

    if (minRating) query = query.gte('rating', minRating);

    const { data, error } = await query;
    if (error) throw error;

    return (data ?? [])
      .map(t => ({
        talent_id: t.id,
        match_score: t.skills.filter(s => requiredSkills.includes(s)).length / requiredSkills.length,
        matched_skills: t.skills.filter(s => requiredSkills.includes(s)),
      }))
      .sort((a, b) => b.match_score - a.match_score);
  }

  async featureProfile(schoolId: string, id: string): Promise<TalentProfile> {
    const { data: profile, error } = await this.supabase
      .from(this.TABLE)
      .update({ is_featured: true, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return profile;
  }

  async unfeatureProfile(schoolId: string, id: string): Promise<TalentProfile> {
    const { data: profile, error } = await this.supabase
      .from(this.TABLE)
      .update({ is_featured: false, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return profile;
  }

  async getFeatured(schoolId: string): Promise<TalentProfile[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_featured', true)
      .is('deleted_at', null)
      .order('rating', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
}
