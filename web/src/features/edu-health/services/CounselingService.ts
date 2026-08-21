import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface CounselingSession {
  id: string;
  school_id: string;
  session_number: string;
  student_id: string;
  counselor_id: string;
  session_type: 'individual' | 'group' | 'crisis' | 'follow_up' | 'initial_assessment';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  location?: string;
  reason: string;
  goals: string[];
  interventions: string[];
  session_notes?: string;
  homework_assigned?: string[];
  risk_assessment?: RiskAssessment;
  follow_up_date?: string;
  parent_notified: boolean;
  confidential: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface RiskAssessment {
  risk_level: 'low' | 'moderate' | 'high' | 'critical';
  risk_factors: string[];
  protective_factors: string[];
  immediate_safety: boolean;
  referrals_made: string[];
}

export interface CreateCounselingSession {
  student_id: string;
  counselor_id: string;
  session_type: 'individual' | 'group' | 'crisis' | 'follow_up' | 'initial_assessment';
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  location?: string;
  reason: string;
  goals?: string[];
  confidential?: boolean;
  metadata?: Record<string, unknown>;
}

export interface UpdateCounselingSession {
  status?: string;
  duration_minutes?: number;
  interventions?: string[];
  session_notes?: string;
  homework_assigned?: string[];
  risk_assessment?: RiskAssessment;
  follow_up_date?: string;
  parent_notified?: boolean;
  metadata?: Record<string, unknown>;
}

export class CounselingService {
  private readonly TABLE = 'counseling_sessions';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<CounselingSession[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('scheduled_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<CounselingSession | null> {
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

  async create(schoolId: string, session: CreateCounselingSession): Promise<CounselingSession> {
    const sessionNumber = `CS-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        session_number: sessionNumber,
        ...session,
        status: 'scheduled',
        goals: session.goals || [],
        interventions: [],
        parent_notified: false,
        confidential: session.confidential ?? true,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, session: UpdateCounselingSession): Promise<CounselingSession> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...session, updated_at: new Date().toISOString() })
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

  async getByStudent(schoolId: string, studentId: string): Promise<CounselingSession[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByCounselor(schoolId: string, counselorId: string): Promise<CounselingSession[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('counselor_id', counselorId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUpcoming(schoolId: string): Promise<CounselingSession[]> {
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

  async getCrisisSessions(schoolId: string): Promise<CounselingSession[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('session_type', 'crisis')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getHighRiskStudents(schoolId: string): Promise<CounselingSession[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('risk_assessment', 'is', null)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    scheduled: number;
    completed: number;
    crisis: number;
    noShow: number;
    averageDuration: number;
  }> {
    const sessions = await this.getAll(schoolId);
    const completed = sessions.filter((s) => s.status === 'completed');

    return {
      total: sessions.length,
      scheduled: sessions.filter((s) => s.status === 'scheduled').length,
      completed: completed.length,
      crisis: sessions.filter((s) => s.session_type === 'crisis').length,
      noShow: sessions.filter((s) => s.status === 'no_show').length,
      averageDuration: completed.length > 0
        ? completed.reduce((sum, s) => sum + s.duration_minutes, 0) / completed.length
        : 0,
    };
  }
}
