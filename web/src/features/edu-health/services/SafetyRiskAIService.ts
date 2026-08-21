import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SafetyRiskAssessment {
  id: string;
  school_id: string;
  assessment_number: string;
  assessment_type: 'proactive' | 'reactive' | 'predictive' | 'periodic';
  scope: 'campus' | 'zone' | 'building' | 'individual';
  scope_id?: string;
  risk_level: 'low' | 'moderate' | 'high' | 'critical';
  overall_score: number;
  risk_factors: RiskFactor[];
  mitigations: MitigationEntry[];
  status: 'draft' | 'active' | 'under_review' | 'expired';
  assessed_by: string;
  assessment_date: string;
  review_date: string;
  model_id?: string;
  ai_confidence?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface RiskFactor {
  id: string;
  category: string;
  description: string;
  likelihood: number;
  impact: number;
  risk_score: number;
  status: 'identified' | 'mitigated' | 'accepted' | 'monitoring';
}

export interface MitigationEntry {
  id: string;
  risk_factor_id: string;
  description: string;
  responsible: string;
  deadline: string;
  status: 'planned' | 'in_progress' | 'completed' | 'overdue';
  effectiveness?: number;
}

export interface CreateSafetyRiskAssessment {
  assessment_type: 'proactive' | 'reactive' | 'predictive' | 'periodic';
  scope: 'campus' | 'zone' | 'building' | 'individual';
  scope_id?: string;
  assessed_by: string;
  review_date: string;
  risk_factors?: RiskFactor[];
  mitigations?: MitigationEntry[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateSafetyRiskAssessment {
  risk_level?: string;
  overall_score?: number;
  risk_factors?: RiskFactor[];
  mitigations?: MitigationEntry[];
  status?: string;
  review_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class SafetyRiskAIService {
  private readonly TABLE = 'safety_risk_assessments';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SafetyRiskAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SafetyRiskAssessment | null> {
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

  async create(schoolId: string, assessment: CreateSafetyRiskAssessment): Promise<SafetyRiskAssessment> {
    const assessmentNumber = `SRA-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        assessment_number: assessmentNumber,
        ...assessment,
        risk_level: 'low',
        overall_score: 0,
        risk_factors: assessment.risk_factors || [],
        mitigations: assessment.mitigations || [],
        status: 'draft',
        assessment_date: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, assessment: UpdateSafetyRiskAssessment): Promise<SafetyRiskAssessment> {
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

  async getByScope(schoolId: string, scope: string): Promise<SafetyRiskAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('scope', scope)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getHighRisk(schoolId: string): Promise<SafetyRiskAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('risk_level', ['high', 'critical'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReview(schoolId: string): Promise<SafetyRiskAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .lte('review_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    highRisk: number;
    pendingReview: number;
    averageScore: number;
  }> {
    const assessments = await this.getAll(schoolId);
    const active = assessments.filter((a) => a.status === 'active');

    return {
      total: assessments.length,
      active: active.length,
      highRisk: assessments.filter((a) => a.risk_level === 'high' || a.risk_level === 'critical').length,
      pendingReview: assessments.filter(
        (a) => a.status === 'active' && a.review_date <= new Date().toISOString().split('T')[0]
      ).length,
      averageScore: active.length > 0
        ? active.reduce((sum, a) => sum + a.overall_score, 0) / active.length
        : 0,
    };
  }
}
