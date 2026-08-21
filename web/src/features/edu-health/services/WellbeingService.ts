import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Wellbeing {
  id: string;
  school_id: string;
  student_id: string;
  overall_score: number;
  emotional_score: number;
  social_score: number;
  physical_score: number;
  academic_score: number;
  risk_level: 'low' | 'moderate' | 'high' | 'critical';
  risk_factors: string[];
  protective_factors: string[];
  mood_entries: MoodEntry[];
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  sleep_hours?: number;
  stress_level?: number;
  last_assessment_date: string;
  next_assessment_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';
  energy_level: number;
  notes?: string;
}

export interface CreateWellbeing {
  student_id: string;
  overall_score: number;
  emotional_score: number;
  social_score: number;
  physical_score: number;
  academic_score: number;
  risk_level: 'low' | 'moderate' | 'high' | 'critical';
  risk_factors?: string[];
  protective_factors?: string[];
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  sleep_hours?: number;
  stress_level?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateWellbeing {
  overall_score?: number;
  emotional_score?: number;
  social_score?: number;
  physical_score?: number;
  academic_score?: number;
  risk_level?: string;
  risk_factors?: string[];
  protective_factors?: string[];
  mood_entries?: MoodEntry[];
  activity_level?: string;
  sleep_hours?: number;
  stress_level?: number;
  last_assessment_date?: string;
  next_assessment_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class WellbeingService {
  private readonly TABLE = 'student_wellbeing';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Wellbeing[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Wellbeing | null> {
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

  async getByStudentId(schoolId: string, studentId: string): Promise<Wellbeing | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, wellbeing: CreateWellbeing): Promise<Wellbeing> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...wellbeing,
        risk_factors: wellbeing.risk_factors || [],
        protective_factors: wellbeing.protective_factors || [],
        mood_entries: [],
        activity_level: wellbeing.activity_level || 'moderate',
        last_assessment_date: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, wellbeing: UpdateWellbeing): Promise<Wellbeing> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...wellbeing, updated_at: new Date().toISOString() })
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

  async addMoodEntry(schoolId: string, id: string, entry: MoodEntry): Promise<Wellbeing> {
    const record = await this.getById(schoolId, id);
    if (!record) throw new Error('Wellbeing record not found');

    return this.update(schoolId, id, {
      mood_entries: [...record.mood_entries, entry],
    });
  }

  async getHighRisk(schoolId: string): Promise<Wellbeing[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('risk_level', ['high', 'critical'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByRiskLevel(schoolId: string, riskLevel: string): Promise<Wellbeing[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('risk_level', riskLevel)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    lowRisk: number;
    moderateRisk: number;
    highRisk: number;
    criticalRisk: number;
    averageScore: number;
  }> {
    const records = await this.getAll(schoolId);
    const totalScore = records.reduce((sum, r) => sum + r.overall_score, 0);

    return {
      total: records.length,
      lowRisk: records.filter((r) => r.risk_level === 'low').length,
      moderateRisk: records.filter((r) => r.risk_level === 'moderate').length,
      highRisk: records.filter((r) => r.risk_level === 'high').length,
      criticalRisk: records.filter((r) => r.risk_level === 'critical').length,
      averageScore: records.length > 0 ? totalScore / records.length : 0,
    };
  }
}
