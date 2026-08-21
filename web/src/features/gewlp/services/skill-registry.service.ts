import type { SupabaseClient } from '@supabase/supabase-js';

interface Skill {
  id: string;
  school_id: string;
  name: string;
  category: string;
  description?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  framework?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SkillCreate {
  name: string;
  category: string;
  description?: string;
  level: Skill['level'];
  framework?: string;
  is_active?: boolean;
}

interface SkillFilters {
  category?: string;
  level?: string;
  is_active?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export class SkillRegistryService {
  private readonly TABLE = 'gewlp_skills';

  constructor(private supabase: SupabaseClient) {}

  async getSkill(schoolId: string, id: string): Promise<Skill> {
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

  async listSkills(schoolId: string, filters?: SkillFilters): Promise<Skill[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.level) query = query.eq('level', filters.level);
    if (filters?.is_active !== undefined) query = query.eq('is_active', filters.is_active);
    if (filters?.search) query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('name', { ascending: true }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createSkill(schoolId: string, data: SkillCreate): Promise<Skill> {
    const { data: skill, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...data, school_id: schoolId, is_active: data.is_active ?? true })
      .select()
      .single();
    if (error) throw error;
    return skill;
  }

  async updateSkill(schoolId: string, id: string, data: Partial<SkillCreate>): Promise<Skill> {
    const existing = await this.getSkill(schoolId, id);
    if (!existing) throw new Error(`Skill ${id} not found`);

    const { data: skill, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return skill;
  }

  async deleteSkill(schoolId: string, id: string): Promise<void> {
    const existing = await this.getSkill(schoolId, id);
    if (!existing) throw new Error(`Skill ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async countSkills(schoolId: string, filters?: SkillFilters): Promise<number> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.level) query = query.eq('level', filters.level);
    if (filters?.is_active !== undefined) query = query.eq('is_active', filters.is_active);

    const { count, error } = await query;
    if (error) throw error;
    return count ?? 0;
  }
}
