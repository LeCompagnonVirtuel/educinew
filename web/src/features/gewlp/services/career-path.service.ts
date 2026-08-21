import type { SupabaseClient } from '@supabase/supabase-js';

interface CareerPath {
  id: string;
  school_id: string;
  person_id: string;
  title: string;
  description?: string;
  industry: string;
  current_role?: string;
  target_role?: string;
  target_date?: string;
  milestones: CareerMilestone[];
  status: 'active' | 'achieved' | 'paused' | 'abandoned';
  created_at: string;
  updated_at: string;
}

interface CareerMilestone {
  id: string;
  title: string;
  description?: string;
  target_date?: string;
  completed_date?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  required_skills: string[];
}

interface CareerPathCreate {
  person_id: string;
  title: string;
  description?: string;
  industry: string;
  current_role?: string;
  target_role?: string;
  target_date?: string;
  milestones?: CareerMilestone[];
}

interface CareerPathFilters {
  person_id?: string;
  industry?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class CareerPathService {
  private readonly TABLE = 'gewlp_career_paths';

  constructor(private supabase: SupabaseClient) {}

  async getPath(schoolId: string, id: string): Promise<CareerPath> {
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

  async listPaths(schoolId: string, filters?: CareerPathFilters): Promise<CareerPath[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.person_id) query = query.eq('person_id', filters.person_id);
    if (filters?.industry) query = query.eq('industry', filters.industry);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createPath(schoolId: string, data: CareerPathCreate): Promise<CareerPath> {
    const { data: path, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        milestones: data.milestones ?? [],
        status: 'active',
      })
      .select()
      .single();
    if (error) throw error;
    return path;
  }

  async updatePath(schoolId: string, id: string, data: Partial<CareerPathCreate>): Promise<CareerPath> {
    const existing = await this.getPath(schoolId, id);
    if (!existing) throw new Error(`Career path ${id} not found`);

    const { data: path, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return path;
  }

  async deletePath(schoolId: string, id: string): Promise<void> {
    const existing = await this.getPath(schoolId, id);
    if (!existing) throw new Error(`Career path ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async getPersonPaths(schoolId: string, personId: string): Promise<CareerPath[]> {
    return this.listPaths(schoolId, { person_id: personId, limit: 100 });
  }

  async updateMilestoneStatus(schoolId: string, pathId: string, milestoneId: string, status: CareerMilestone['status']): Promise<CareerPath> {
    const path = await this.getPath(schoolId, pathId);
    if (!path) throw new Error(`Career path ${pathId} not found`);

    const milestones = path.milestones.map(m =>
      m.id === milestoneId ? { ...m, status, completed_date: status === 'completed' ? new Date().toISOString() : m.completed_date } : m,
    );

    return this.updatePath(schoolId, pathId, { milestones } as Partial<CareerPathCreate>);
  }

  async getPathProgress(schoolId: string, pathId: string): Promise<{ total: number; completed: number; percentage: number }> {
    const path = await this.getPath(schoolId, pathId);
    if (!path) throw new Error(`Career path ${pathId} not found`);

    const total = path.milestones.length;
    const completed = path.milestones.filter(m => m.status === 'completed').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, percentage };
  }
}
