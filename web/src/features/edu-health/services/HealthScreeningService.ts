import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HealthScreening {
  id: string;
  school_id: string;
  screening_number: string;
  student_id: string;
  screening_type: 'vision' | 'hearing' | 'dental' | 'scoliosis' | 'bmi' | 'general' | 'mental_health';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_date: string;
  completed_date?: string;
  conducted_by: string;
  results: ScreeningResult[];
  referral_needed: boolean;
  referral_id?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ScreeningResult {
  id: string;
  parameter: string;
  value: string;
  unit?: string;
  normal_range?: string;
  is_normal: boolean;
  notes?: string;
}

export interface CreateHealthScreening {
  student_id: string;
  screening_type: 'vision' | 'hearing' | 'dental' | 'scoliosis' | 'bmi' | 'general' | 'mental_health';
  scheduled_date: string;
  conducted_by: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateHealthScreening {
  status?: string;
  completed_date?: string;
  results?: ScreeningResult[];
  referral_needed?: boolean;
  referral_id?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class HealthScreeningService {
  private readonly TABLE = 'health_screenings';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<HealthScreening[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('scheduled_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<HealthScreening | null> {
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

  async create(schoolId: string, screening: CreateHealthScreening): Promise<HealthScreening> {
    const screeningNumber = `HS-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        screening_number: screeningNumber,
        ...screening,
        status: 'scheduled',
        results: [],
        referral_needed: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, screening: UpdateHealthScreening): Promise<HealthScreening> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...screening, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async complete(schoolId: string, id: string, results: ScreeningResult[]): Promise<HealthScreening> {
    return this.update(schoolId, id, {
      status: 'completed',
      completed_date: new Date().toISOString(),
      results,
    });
  }

  async getByType(schoolId: string, screeningType: string): Promise<HealthScreening[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('screening_type', screeningType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByStudent(schoolId: string, studentId: string): Promise<HealthScreening[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReferrals(schoolId: string): Promise<HealthScreening[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('referral_needed', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUpcoming(schoolId: string): Promise<HealthScreening[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'scheduled')
      .gte('scheduled_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    scheduled: number;
    completed: number;
    referralsNeeded: number;
    abnormalResults: number;
  }> {
    const screenings = await this.getAll(schoolId);
    return {
      total: screenings.length,
      scheduled: screenings.filter((s) => s.status === 'scheduled').length,
      completed: screenings.filter((s) => s.status === 'completed').length,
      referralsNeeded: screenings.filter((s) => s.referral_needed).length,
      abnormalResults: screenings.filter((s) => s.results.some((r) => !r.is_normal)).length,
    };
  }
}
