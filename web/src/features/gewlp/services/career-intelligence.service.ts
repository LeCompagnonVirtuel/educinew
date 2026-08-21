import type { SupabaseClient } from '@supabase/supabase-js';

interface CareerInsight {
  id: string;
  school_id: string;
  title: string;
  category: 'trend' | 'forecast' | 'salary' | 'demand' | 'skill_gap' | 'market_shift';
  content: string;
  data?: Record<string, unknown>;
  industry?: string;
  region?: string;
  source?: string;
  confidence_score: number;
  valid_until?: string;
  created_at: string;
  updated_at: string;
}

interface CareerInsightCreate {
  title: string;
  category: CareerInsight['category'];
  content: string;
  data?: Record<string, unknown>;
  industry?: string;
  region?: string;
  source?: string;
  confidence_score?: number;
  valid_until?: string;
}

interface InsightFilters {
  category?: string;
  industry?: string;
  region?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class CareerIntelligenceService {
  private readonly TABLE = 'gewlp_career_insights';

  constructor(private supabase: SupabaseClient) {}

  async getInsight(schoolId: string, id: string): Promise<CareerInsight> {
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

  async listInsights(schoolId: string, filters?: InsightFilters): Promise<CareerInsight[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.industry) query = query.eq('industry', filters.industry);
    if (filters?.region) query = query.eq('region', filters.region);
    if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createInsight(schoolId: string, data: CareerInsightCreate): Promise<CareerInsight> {
    const { data: insight, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...data, school_id: schoolId, confidence_score: data.confidence_score ?? 0.5 })
      .select()
      .single();
    if (error) throw error;
    return insight;
  }

  async updateInsight(schoolId: string, id: string, data: Partial<CareerInsightCreate>): Promise<CareerInsight> {
    const existing = await this.getInsight(schoolId, id);
    if (!existing) throw new Error(`Career insight ${id} not found`);

    const { data: insight, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return insight;
  }

  async deleteInsight(schoolId: string, id: string): Promise<void> {
    const existing = await this.getInsight(schoolId, id);
    if (!existing) throw new Error(`Career insight ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async getActiveInsights(schoolId: string, industry?: string): Promise<CareerInsight[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .gte('valid_until', new Date().toISOString())
      .order('confidence_score', { ascending: false });

    if (industry) query = query.eq('industry', industry);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async getByCategory(schoolId: string, category: CareerInsight['category']): Promise<CareerInsight[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category)
      .is('deleted_at', null)
      .order('confidence_score', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
}
