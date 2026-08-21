import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HealthAIAnalysis {
  id: string;
  school_id: string;
  analysis_number: string;
  student_id?: string;
  analysis_type: 'risk_prediction' | 'anomaly_detection' | 'pattern_recognition' | 'recommendation' | 'sentiment';
  model_used: string;
  input_data: Record<string, unknown>;
  output: AIOutput;
  confidence_score: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  processed_at?: string;
  reviewed_by?: string;
  review_notes?: string;
  action_taken?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface AIOutput {
  summary: string;
  risk_level: 'low' | 'moderate' | 'high' | 'critical';
  recommendations: string[];
  indicators: AIIndicator[];
}

export interface AIIndicator {
  name: string;
  value: number;
  trend: 'improving' | 'stable' | 'declining';
  significance: 'low' | 'moderate' | 'high';
}

export interface CreateHealthAIAnalysis {
  student_id?: string;
  analysis_type: 'risk_prediction' | 'anomaly_detection' | 'pattern_recognition' | 'recommendation' | 'sentiment';
  model_used: string;
  input_data: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateHealthAIAnalysis {
  status?: string;
  output?: AIOutput;
  confidence_score?: number;
  processed_at?: string;
  reviewed_by?: string;
  review_notes?: string;
  action_taken?: string;
  metadata?: Record<string, unknown>;
}

export class HealthAIService {
  private readonly TABLE = 'health_ai_analyses';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<HealthAIAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<HealthAIAnalysis | null> {
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

  async create(schoolId: string, analysis: CreateHealthAIAnalysis): Promise<HealthAIAnalysis> {
    const analysisNumber = `HAI-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        analysis_number: analysisNumber,
        ...analysis,
        status: 'pending',
        output: { summary: '', risk_level: 'low', recommendations: [], indicators: [] },
        confidence_score: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, analysis: UpdateHealthAIAnalysis): Promise<HealthAIAnalysis> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...analysis, updated_at: new Date().toISOString() })
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

  async complete(schoolId: string, id: string, output: AIOutput, confidenceScore: number): Promise<HealthAIAnalysis> {
    return this.update(schoolId, id, {
      status: 'completed',
      output,
      confidence_score: confidenceScore,
      processed_at: new Date().toISOString(),
    });
  }

  async fail(schoolId: string, id: string, reason: string): Promise<HealthAIAnalysis> {
    return this.update(schoolId, id, {
      status: 'failed',
      action_taken: reason,
    });
  }

  async getByType(schoolId: string, analysisType: string): Promise<HealthAIAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('analysis_type', analysisType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByStudent(schoolId: string, studentId: string): Promise<HealthAIAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getHighRisk(schoolId: string): Promise<HealthAIAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;

    return (data || []).filter((a) => a.output.risk_level === 'high' || a.output.risk_level === 'critical');
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    completed: number;
    highRisk: number;
    averageConfidence: number;
    byType: Record<string, number>;
  }> {
    const analyses = await this.getAll(schoolId);
    const completed = analyses.filter((a) => a.status === 'completed');
    const byType: Record<string, number> = {};
    analyses.forEach((a) => {
      byType[a.analysis_type] = (byType[a.analysis_type] || 0) + 1;
    });

    return {
      total: analyses.length,
      completed: completed.length,
      highRisk: completed.filter((a) => a.output.risk_level === 'high' || a.output.risk_level === 'critical').length,
      averageConfidence: completed.length > 0
        ? completed.reduce((sum, a) => sum + a.confidence_score, 0) / completed.length
        : 0,
      byType,
    };
  }
}
