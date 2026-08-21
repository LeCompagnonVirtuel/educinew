import type { SupabaseClient } from '@supabase/supabase-js';

interface LearningPath {
  id: string;
  school_id: string;
  title: string;
  description?: string;
  target_role?: string;
  industry?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_hours: number;
  modules: LearningModule[];
  status: 'draft' | 'active' | 'archived';
  created_at: string;
  updated_at: string;
}

interface LearningModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  type: 'course' | 'project' | 'assessment' | 'reading';
  resource_url?: string;
  estimated_hours: number;
  skills_taught: string[];
  is_required: boolean;
}

interface LearningPathCreate {
  title: string;
  description?: string;
  target_role?: string;
  industry?: string;
  difficulty?: LearningPath['difficulty'];
  estimated_hours?: number;
  modules?: LearningModule[];
}

interface LearningPathFilters {
  target_role?: string;
  industry?: string;
  difficulty?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class LearningPathService {
  private readonly TABLE = 'gewlp_learning_paths';

  constructor(private supabase: SupabaseClient) {}

  async getPath(schoolId: string, id: string): Promise<LearningPath> {
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

  async listPaths(schoolId: string, filters?: LearningPathFilters): Promise<LearningPath[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.target_role) query = query.eq('target_role', filters.target_role);
    if (filters?.industry) query = query.eq('industry', filters.industry);
    if (filters?.difficulty) query = query.eq('difficulty', filters.difficulty);
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

  async createPath(schoolId: string, data: LearningPathCreate): Promise<LearningPath> {
    const { data: path, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        difficulty: data.difficulty ?? 'beginner',
        estimated_hours: data.estimated_hours ?? 0,
        modules: data.modules ?? [],
        status: 'draft',
      })
      .select()
      .single();
    if (error) throw error;
    return path;
  }

  async updatePath(schoolId: string, id: string, data: Partial<LearningPathCreate>): Promise<LearningPath> {
    const existing = await this.getPath(schoolId, id);
    if (!existing) throw new Error(`Learning path ${id} not found`);

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
    if (!existing) throw new Error(`Learning path ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async publishPath(schoolId: string, id: string): Promise<LearningPath> {
    return this.updatePath(schoolId, id, { status: 'active' } as Partial<LearningPathCreate>);
  }

  async archivePath(schoolId: string, id: string): Promise<LearningPath> {
    return this.updatePath(schoolId, id, { status: 'archived' } as Partial<LearningPathCreate>);
  }

  async getPathModules(schoolId: string, pathId: string): Promise<LearningModule[]> {
    const path = await this.getPath(schoolId, pathId);
    if (!path) throw new Error(`Learning path ${pathId} not found`);
    return path.modules.sort((a, b) => a.order - b.order);
  }

  async addModule(schoolId: string, pathId: string, module: Omit<LearningModule, 'id'>): Promise<LearningPath> {
    const path = await this.getPath(schoolId, pathId);
    if (!path) throw new Error(`Learning path ${pathId} not found`);

    const newModule: LearningModule = { ...module, id: crypto.randomUUID() };
    const modules = [...path.modules, newModule];

    return this.updatePath(schoolId, pathId, { modules } as Partial<LearningPathCreate>);
  }
}
