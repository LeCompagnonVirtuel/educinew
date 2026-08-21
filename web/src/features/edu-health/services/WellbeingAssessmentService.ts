import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface WellbeingAssessment {
  id: string;
  school_id: string;
  assessment_number: string;
  student_id: string;
  assessment_type: 'screening' | 'comprehensive' | 'follow_up' | 'crisis' | 'routine';
  tool_used: string;
  administered_by: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_date: string;
  completed_date?: string;
  scores: AssessmentScore[];
  overall_risk: 'low' | 'moderate' | 'high' | 'critical';
  recommendations: string[];
  follow_up_required: boolean;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface AssessmentScore {
  domain: string;
  score: number;
  max_score: number;
  interpretation: string;
}

export interface CreateWellbeingAssessment {
  student_id: string;
  assessment_type: 'screening' | 'comprehensive' | 'follow_up' | 'crisis' | 'routine';
  tool_used: string;
  administered_by: string;
  scheduled_date: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateWellbeingAssessment {
  status?: string;
  completed_date?: string;
  scores?: AssessmentScore[];
  overall_risk?: string;
  recommendations?: string[];
  follow_up_required?: boolean;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class WellbeingAssessmentService {
  private readonly TABLE = 'wellbeing_assessments';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<WellbeingAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<WellbeingAssessment | null> {
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

  async create(schoolId: string, assessment: CreateWellbeingAssessment): Promise<WellbeingAssessment> {
    const assessmentNumber = `WA-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        assessment_number: assessmentNumber,
        ...assessment,
        status: 'scheduled',
        scores: [],
        overall_risk: 'low',
        recommendations: [],
        follow_up_required: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, assessment: UpdateWellbeingAssessment): Promise<WellbeingAssessment> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...assessment, updated_at: new Date().toISOString() })
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

  async complete(schoolId: string, id: string, scores: AssessmentScore[], overallRisk: string, recommendations: string[]): Promise<WellbeingAssessment> {
    return this.update(schoolId, id, {
      status: 'completed',
      completed_date: new Date().toISOString(),
      scores,
      overall_risk: overallRisk as 'low' | 'moderate' | 'high' | 'critical',
      recommendations,
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<WellbeingAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, assessmentType: string): Promise<WellbeingAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('assessment_type', assessmentType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getHighRisk(schoolId: string): Promise<WellbeingAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('overall_risk', ['high', 'critical'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingFollowUp(schoolId: string): Promise<WellbeingAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('follow_up_required', true)
      .not('follow_up_date', 'is', null)
      .lte('follow_up_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    completed: number;
    highRisk: number;
    pendingFollowUp: number;
    averageScore: number;
  }> {
    const assessments = await this.getAll(schoolId);
    const completed = assessments.filter((a) => a.status === 'completed');
    const allScores = completed.flatMap((a) => a.scores.map((s) => (s.score / s.max_score) * 100));

    return {
      total: assessments.length,
      completed: completed.length,
      highRisk: assessments.filter((a) => a.overall_risk === 'high' || a.overall_risk === 'critical').length,
      pendingFollowUp: assessments.filter((a) => a.follow_up_required && a.follow_up_date).length,
      averageScore: allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0,
    };
  }
}
