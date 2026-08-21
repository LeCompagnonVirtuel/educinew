import type { SupabaseClient } from '@supabase/supabase-js';

interface LaborMarketData {
  id: string;
  school_id: string;
  occupation: string;
  industry: string;
  region?: string;
  avg_salary: number;
  salary_min: number;
  salary_max: number;
  demand_level: 'low' | 'moderate' | 'high' | 'very_high';
  supply_level: 'surplus' | 'balanced' | 'shortage';
  growth_rate: number;
  openings_count: number;
  top_skills: string[];
  education_requirements: string[];
  data_source?: string;
  data_date: string;
  created_at: string;
  updated_at: string;
}

interface LaborMarketDataCreate {
  occupation: string;
  industry: string;
  region?: string;
  avg_salary: number;
  salary_min: number;
  salary_max: number;
  demand_level: LaborMarketData['demand_level'];
  supply_level: LaborMarketData['supply_level'];
  growth_rate: number;
  openings_count?: number;
  top_skills?: string[];
  education_requirements?: string[];
  data_source?: string;
  data_date: string;
}

interface LaborMarketFilters {
  occupation?: string;
  industry?: string;
  region?: string;
  demand_level?: string;
  supply_level?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class LaborMarketService {
  private readonly TABLE = 'gewlp_labor_market_data';

  constructor(private supabase: SupabaseClient) {}

  async getData(schoolId: string, id: string): Promise<LaborMarketData> {
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

  async listData(schoolId: string, filters?: LaborMarketFilters): Promise<LaborMarketData[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.occupation) query = query.eq('occupation', filters.occupation);
    if (filters?.industry) query = query.eq('industry', filters.industry);
    if (filters?.region) query = query.eq('region', filters.region);
    if (filters?.demand_level) query = query.eq('demand_level', filters.demand_level);
    if (filters?.supply_level) query = query.eq('supply_level', filters.supply_level);
    if (filters?.search) query = query.or(`occupation.ilike.%${filters.search}%,industry.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('data_date', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createData(schoolId: string, data: LaborMarketDataCreate): Promise<LaborMarketData> {
    const { data: record, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        openings_count: data.openings_count ?? 0,
        top_skills: data.top_skills ?? [],
        education_requirements: data.education_requirements ?? [],
      })
      .select()
      .single();
    if (error) throw error;
    return record;
  }

  async updateData(schoolId: string, id: string, data: Partial<LaborMarketDataCreate>): Promise<LaborMarketData> {
    const existing = await this.getData(schoolId, id);
    if (!existing) throw new Error(`Labor market data ${id} not found`);

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

  async deleteData(schoolId: string, id: string): Promise<void> {
    const existing = await this.getData(schoolId, id);
    if (!existing) throw new Error(`Labor market data ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async getHighDemandOccupations(schoolId: string, region?: string): Promise<LaborMarketData[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('demand_level', ['high', 'very_high'])
      .is('deleted_at', null)
      .order('growth_rate', { ascending: false });

    if (region) query = query.eq('region', region);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async getShortageOccupations(schoolId: string): Promise<LaborMarketData[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('supply_level', 'shortage')
      .is('deleted_at', null)
      .order('growth_rate', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async getSalaryByOccupation(schoolId: string, occupation: string): Promise<LaborMarketData[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('occupation', occupation)
      .is('deleted_at', null)
      .order('data_date', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
}
