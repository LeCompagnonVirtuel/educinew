import type { SupabaseClient } from '@supabase/supabase-js';

interface DigitalTwin {
  id: string;
  school_id: string;
  person_id: string;
  name: string;
  current_role?: string;
  skills: string[];
  experiences: DigitalTwinExperience[];
  education: DigitalTwinEducation[];
  goals: string[];
  personality_traits?: Record<string, number>;
  work_preferences: WorkPreferences;
  ai_persona?: string;
  last_synced_at: string;
  created_at: string;
  updated_at: string;
}

interface DigitalTwinExperience {
  id: string;
  title: string;
  organization: string;
  start_date: string;
  end_date?: string;
  skills_used: string[];
  achievements: string[];
}

interface DigitalTwinEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduation_year?: number;
  skills_learned: string[];
}

interface WorkPreferences {
  work_style: 'remote' | 'hybrid' | 'onsite';
  team_size: 'solo' | 'small' | 'medium' | 'large';
  pace: 'relaxed' | 'moderate' | 'fast';
  communication: 'async' | 'sync' | 'mixed';
}

interface DigitalTwinCreate {
  person_id: string;
  name: string;
  current_role?: string;
  skills?: string[];
  experiences?: DigitalTwinExperience[];
  education?: DigitalTwinEducation[];
  goals?: string[];
  work_preferences?: WorkPreferences;
  ai_persona?: string;
}

interface DigitalTwinFilters {
  person_id?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class PersonDigitalTwinService {
  private readonly TABLE = 'gewlp_digital_twins';

  constructor(private supabase: SupabaseClient) {}

  async getTwin(schoolId: string, id: string): Promise<DigitalTwin> {
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

  async listTwins(schoolId: string, filters?: DigitalTwinFilters): Promise<DigitalTwin[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.person_id) query = query.eq('person_id', filters.person_id);
    if (filters?.search) query = query.or(`name.ilike.%${filters.search}%,current_role.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createTwin(schoolId: string, data: DigitalTwinCreate): Promise<DigitalTwin> {
    const defaultPreferences: WorkPreferences = {
      work_style: 'hybrid',
      team_size: 'medium',
      pace: 'moderate',
      communication: 'mixed',
    };

    const { data: twin, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        skills: data.skills ?? [],
        experiences: data.experiences ?? [],
        education: data.education ?? [],
        goals: data.goals ?? [],
        work_preferences: data.work_preferences ?? defaultPreferences,
        last_synced_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return twin;
  }

  async updateTwin(schoolId: string, id: string, data: Partial<DigitalTwinCreate>): Promise<DigitalTwin> {
    const existing = await this.getTwin(schoolId, id);
    if (!existing) throw new Error(`Digital twin ${id} not found`);

    const { data: twin, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString(), last_synced_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return twin;
  }

  async deleteTwin(schoolId: string, id: string): Promise<void> {
    const existing = await this.getTwin(schoolId, id);
    if (!existing) throw new Error(`Digital twin ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async addExperience(schoolId: string, twinId: string, experience: Omit<DigitalTwinExperience, 'id'>): Promise<DigitalTwin> {
    const twin = await this.getTwin(schoolId, twinId);
    if (!twin) throw new Error(`Digital twin ${twinId} not found`);

    const newExperience: DigitalTwinExperience = { ...experience, id: crypto.randomUUID() };
    const experiences = [...twin.experiences, newExperience];

    return this.updateTwin(schoolId, twinId, { experiences } as Partial<DigitalTwinCreate>);
  }

  async addEducation(schoolId: string, twinId: string, education: Omit<DigitalTwinEducation, 'id'>): Promise<DigitalTwin> {
    const twin = await this.getTwin(schoolId, twinId);
    if (!twin) throw new Error(`Digital twin ${twinId} not found`);

    const newEducation: DigitalTwinEducation = { ...education, id: crypto.randomUUID() };
    const eduList = [...twin.education, newEducation];

    return this.updateTwin(schoolId, twinId, { education: eduList } as Partial<DigitalTwinCreate>);
  }

  async syncFromCareerWallet(schoolId: string, twinId: string): Promise<DigitalTwin> {
    const twin = await this.getTwin(schoolId, twinId);
    if (!twin) throw new Error(`Digital twin ${twinId} not found`);

    return this.updateTwin(schoolId, twinId, {} as Partial<DigitalTwinCreate>);
  }

  async getTwinByPerson(schoolId: string, personId: string): Promise<DigitalTwin | null> {
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
