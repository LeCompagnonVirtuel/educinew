import type { SupabaseClient } from '@supabase/supabase-js';

interface EducationEmploymentLink {
  id: string;
  school_id: string;
  person_id: string;
  education_program: string;
  institution?: string;
  graduation_year?: number;
  employment_status: 'employed' | 'unemployed' | 'self_employed' | 'in_education' | 'retired';
  current_employer?: string;
  job_title?: string;
  industry?: string;
  is_field_related: boolean;
  salary_range?: string;
  time_to_employment_days?: number;
  survey_date: string;
  created_at: string;
  updated_at: string;
}

interface EducationEmploymentLinkCreate {
  person_id: string;
  education_program: string;
  institution?: string;
  graduation_year?: number;
  employment_status: EducationEmploymentLink['employment_status'];
  current_employer?: string;
  job_title?: string;
  industry?: string;
  is_field_related?: boolean;
  salary_range?: string;
  time_to_employment_days?: number;
  survey_date: string;
}

interface OutcomeStats {
  total_graduates: number;
  employed_count: number;
  employment_rate: number;
  field_related_rate: number;
  avg_time_to_employment: number | null;
  top_industries: { industry: string; count: number }[];
}

interface EducationEmploymentFilters {
  person_id?: string;
  education_program?: string;
  employment_status?: string;
  graduation_year?: number;
  is_field_related?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export class EducationEmploymentService {
  private readonly TABLE = 'gewlp_education_employment_links';

  constructor(private supabase: SupabaseClient) {}

  async getLink(schoolId: string, id: string): Promise<EducationEmploymentLink> {
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

  async listLinks(schoolId: string, filters?: EducationEmploymentFilters): Promise<EducationEmploymentLink[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.person_id) query = query.eq('person_id', filters.person_id);
    if (filters?.education_program) query = query.eq('education_program', filters.education_program);
    if (filters?.employment_status) query = query.eq('employment_status', filters.employment_status);
    if (filters?.graduation_year) query = query.eq('graduation_year', filters.graduation_year);
    if (filters?.is_field_related !== undefined) query = query.eq('is_field_related', filters.is_field_related);
    if (filters?.search) query = query.or(`education_program.ilike.%${filters.search}%,job_title.ilike.%${filters.search}%,current_employer.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('survey_date', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createLink(schoolId: string, data: EducationEmploymentLinkCreate): Promise<EducationEmploymentLink> {
    const { data: link, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...data, school_id: schoolId, is_field_related: data.is_field_related ?? false })
      .select()
      .single();
    if (error) throw error;
    return link;
  }

  async updateLink(schoolId: string, id: string, data: Partial<EducationEmploymentLinkCreate>): Promise<EducationEmploymentLink> {
    const existing = await this.getLink(schoolId, id);
    if (!existing) throw new Error(`Education employment link ${id} not found`);

    const { data: link, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return link;
  }

  async deleteLink(schoolId: string, id: string): Promise<void> {
    const existing = await this.getLink(schoolId, id);
    if (!existing) throw new Error(`Education employment link ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async getOutcomeStats(schoolId: string, educationProgram: string, graduationYear?: number): Promise<OutcomeStats> {
    let query = this.supabase
      .from(this.TABLE)
      .select('employment_status, is_field_related, time_to_employment_days, industry')
      .eq('school_id', schoolId)
      .eq('education_program', educationProgram)
      .is('deleted_at', null);

    if (graduationYear) query = query.eq('graduation_year', graduationYear);

    const { data, error } = await query;
    if (error) throw error;

    const records = data ?? [];
    const total = records.length;
    if (total === 0) {
      return { total_graduates: 0, employed_count: 0, employment_rate: 0, field_related_rate: 0, avg_time_to_employment: null, top_industries: [] };
    }

    const employed = records.filter(r => r.employment_status === 'employed').length;
    const fieldRelated = records.filter(r => r.is_field_related).length;
    const timesToEmploy = records.filter(r => r.time_to_employment_days != null).map(r => r.time_to_employment_days as number);
    const avgTime = timesToEmploy.length > 0 ? Math.round(timesToEmploy.reduce((a, b) => a + b, 0) / timesToEmploy.length) : null;

    const industryCount = new Map<string, number>();
    for (const r of records) {
      if (r.industry) industryCount.set(r.industry, (industryCount.get(r.industry) ?? 0) + 1);
    }
    const topIndustries = [...industryCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([industry, count]) => ({ industry, count }));

    return {
      total_graduates: total,
      employed_count: employed,
      employment_rate: Math.round((employed / total) * 100),
      field_related_rate: total > 0 ? Math.round((fieldRelated / total) * 100) : 0,
      avg_time_to_employment: avgTime,
      top_industries: topIndustries,
    };
  }
}
