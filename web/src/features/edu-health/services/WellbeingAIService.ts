import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface WellbeingAIModel {
  id: string;
  school_id: string;
  model_name: string;
  model_type: 'sentiment' | 'risk' | 'trend' | 'recommendation' | 'intervention';
  status: 'active' | 'inactive' | 'training';
  accuracy_score: number;
  last_trained_at?: string;
  training_data_count: number;
  features: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface WellbeingAIPrediction {
  id: string;
  school_id: string;
  prediction_number: string;
  student_id: string;
  model_id: string;
  prediction_type: 'mood' | 'risk' | 'engagement' | 'dropout' | 'intervention';
  prediction: WellbeingPrediction;
  confidence: number;
  input_features: Record<string, unknown>;
  status: 'pending' | 'completed' | 'reviewed';
  reviewed_by?: string;
  action_taken?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface WellbeingPrediction {
  value: number;
  label: string;
  risk_level: 'low' | 'moderate' | 'high' | 'critical';
  contributing_factors: string[];
  recommended_actions: string[];
}

export interface CreateWellbeingAIModel {
  model_name: string;
  model_type: 'sentiment' | 'risk' | 'trend' | 'recommendation' | 'intervention';
  features: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateWellbeingAIModel {
  model_name?: string;
  status?: string;
  accuracy_score?: number;
  last_trained_at?: string;
  training_data_count?: number;
  metadata?: Record<string, unknown>;
}

export class WellbeingAIService {
  private readonly MODELS_TABLE = 'wellbeing_ai_models';
  private readonly PREDICTIONS_TABLE = 'wellbeing_ai_predictions';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllModels(schoolId: string): Promise<WellbeingAIModel[]> {
    const { data, error } = await this.supabase
      .from(this.MODELS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getModelById(schoolId: string, id: string): Promise<WellbeingAIModel | null> {
    const { data, error } = await this.supabase
      .from(this.MODELS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createModel(schoolId: string, model: CreateWellbeingAIModel): Promise<WellbeingAIModel> {
    const { data, error } = await this.supabase
      .from(this.MODELS_TABLE)
      .insert({
        ...model,
        status: 'inactive',
        accuracy_score: 0,
        training_data_count: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateModel(schoolId: string, id: string, model: UpdateWellbeingAIModel): Promise<WellbeingAIModel> {
    const { data, error } = await this.supabase
      .from(this.MODELS_TABLE)
      .update({ ...model, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.MODELS_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async createPrediction(schoolId: string, studentId: string, modelId: string, predictionType: string, inputFeatures: Record<string, unknown>): Promise<WellbeingAIPrediction> {
    const predictionNumber = `WAP-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.PREDICTIONS_TABLE)
      .insert({
        prediction_number: predictionNumber,
        student_id: studentId,
        model_id: modelId,
        prediction_type: predictionType,
        prediction: { value: 0, label: '', risk_level: 'low', contributing_factors: [], recommended_actions: [] },
        confidence: 0,
        input_features: inputFeatures,
        status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async completePrediction(schoolId: string, id: string, prediction: WellbeingPrediction, confidence: number): Promise<WellbeingAIPrediction> {
    const { data, error } = await this.supabase
      .from(this.PREDICTIONS_TABLE)
      .update({
        prediction,
        confidence,
        status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getPredictions(schoolId: string, studentId: string): Promise<WellbeingAIPrediction[]> {
    const { data, error } = await this.supabase
      .from(this.PREDICTIONS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getHighRiskPredictions(schoolId: string): Promise<WellbeingAIPrediction[]> {
    const { data, error } = await this.supabase
      .from(this.PREDICTIONS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;

    return (data || []).filter(
      (p) => p.prediction.risk_level === 'high' || p.prediction.risk_level === 'critical'
    );
  }

  async getStats(schoolId: string): Promise<{
    totalModels: number;
    activeModels: number;
    totalPredictions: number;
    highRiskCount: number;
    averageConfidence: number;
  }> {
    const models = await this.getAllModels(schoolId);
    const { data: predictions } = await this.supabase
      .from(this.PREDICTIONS_TABLE)
      .select('prediction, confidence, status')
      .eq('school_id', schoolId);

    const allPredictions = predictions || [];
    const completed = allPredictions.filter((p) => p.status === 'completed');

    return {
      totalModels: models.length,
      activeModels: models.filter((m) => m.status === 'active').length,
      totalPredictions: allPredictions.length,
      highRiskCount: completed.filter(
        (p) => p.prediction?.risk_level === 'high' || p.prediction?.risk_level === 'critical'
      ).length,
      averageConfidence: completed.length > 0
        ? completed.reduce((sum, p) => sum + (p.confidence || 0), 0) / completed.length
        : 0,
    };
  }
}
