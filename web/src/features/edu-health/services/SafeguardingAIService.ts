import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SafeguardingAIAlert {
  id: string;
  school_id: string;
  alert_number: string;
  student_id: string;
  alert_type: 'risk_escalation' | 'pattern_detection' | 'anomaly' | 'threshold_breach' | 'predictive';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved' | 'false_positive';
  model_id: string;
  confidence: number;
  trigger_data: Record<string, unknown>;
  analysis: SafeguardingAIAnalysis;
  assigned_to?: string;
  acknowledged_by?: string;
  acknowledged_at?: string;
  resolved_at?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SafeguardingAIAnalysis {
  summary: string;
  risk_factors: string[];
  protective_factors: string[];
  recommended_actions: string[];
  urgency_score: number;
}

export interface CreateSafeguardingAIAlert {
  student_id: string;
  alert_type: 'risk_escalation' | 'pattern_detection' | 'anomaly' | 'threshold_breach' | 'predictive';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  model_id: string;
  confidence: number;
  trigger_data: Record<string, unknown>;
  analysis: SafeguardingAIAnalysis;
  metadata?: Record<string, unknown>;
}

export interface UpdateSafeguardingAIAlert {
  status?: string;
  assigned_to?: string;
  acknowledged_by?: string;
  acknowledged_at?: string;
  resolved_at?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class SafeguardingAIService {
  private readonly TABLE = 'safeguarding_ai_alerts';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SafeguardingAIAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SafeguardingAIAlert | null> {
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

  async create(schoolId: string, alert: CreateSafeguardingAIAlert): Promise<SafeguardingAIAlert> {
    const alertNumber = `SAI-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        alert_number: alertNumber,
        ...alert,
        status: 'new',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, alert: UpdateSafeguardingAIAlert): Promise<SafeguardingAIAlert> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...alert, updated_at: new Date().toISOString() })
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

  async acknowledge(schoolId: string, id: string, acknowledgedBy: string): Promise<SafeguardingAIAlert> {
    return this.update(schoolId, id, {
      status: 'acknowledged',
      acknowledged_by: acknowledgedBy,
      acknowledged_at: new Date().toISOString(),
    });
  }

  async resolve(schoolId: string, id: string): Promise<SafeguardingAIAlert> {
    return this.update(schoolId, id, {
      status: 'resolved',
      resolved_at: new Date().toISOString(),
    });
  }

  async markFalsePositive(schoolId: string, id: string): Promise<SafeguardingAIAlert> {
    return this.update(schoolId, id, {
      status: 'false_positive',
    });
  }

  async getNew(schoolId: string): Promise<SafeguardingAIAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'new')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getCritical(schoolId: string): Promise<SafeguardingAIAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('severity', 'critical')
      .not('status', 'in', ['resolved', 'false_positive'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByStudent(schoolId: string, studentId: string): Promise<SafeguardingAIAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    new: number;
    critical: number;
    resolved: number;
    falsePositives: number;
    averageConfidence: number;
  }> {
    const alerts = await this.getAll(schoolId);

    return {
      total: alerts.length,
      new: alerts.filter((a) => a.status === 'new').length,
      critical: alerts.filter((a) => a.severity === 'critical' && !['resolved', 'false_positive'].includes(a.status)).length,
      resolved: alerts.filter((a) => a.status === 'resolved').length,
      falsePositives: alerts.filter((a) => a.status === 'false_positive').length,
      averageConfidence: alerts.length > 0
        ? alerts.reduce((sum, a) => sum + a.confidence, 0) / alerts.length
        : 0,
    };
  }
}
