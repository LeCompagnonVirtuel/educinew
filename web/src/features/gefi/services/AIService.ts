import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface AIModel {
  id: string;
  school_id: string;
  model_code: string;
  name: string;
  description: string;
  provider: 'deepseek' | 'gemini' | 'custom';
  model_type: 'prediction' | 'classification' | 'anomaly_detection' | 'recommendation' | 'nlp';
  endpoint: string;
  api_key_encrypted?: string;
  parameters: Record<string, unknown>;
  status: 'active' | 'inactive' | 'error';
  last_trained_at?: string;
  accuracy_score?: number;
  usage_count: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface AIRequest {
  id: string;
  model_id: string;
  input_data: Record<string, unknown>;
  output_data?: Record<string, unknown>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  processing_time_ms?: number;
  error?: string;
  school_id: string;
  created_at: string;
}

export interface CreateAIModel {
  name: string;
  description: string;
  provider: 'deepseek' | 'gemini' | 'custom';
  model_type: 'prediction' | 'classification' | 'anomaly_detection' | 'recommendation' | 'nlp';
  endpoint: string;
  api_key_encrypted?: string;
  parameters: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateAIModel {
  name?: string;
  description?: string;
  endpoint?: string;
  api_key_encrypted?: string;
  parameters?: Record<string, unknown>;
  status?: string;
  metadata?: Record<string, unknown>;
}

export class AIService {
  private readonly MODELS_TABLE = 'ai_models';
  private readonly REQUESTS_TABLE = 'ai_requests';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllModels(schoolId: string): Promise<AIModel[]> {
    const { data, error } = await this.supabase
      .from(this.MODELS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getModelById(schoolId: string, id: string): Promise<AIModel | null> {
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

  async createModel(schoolId: string, model: CreateAIModel): Promise<AIModel> {
    const modelCode = `AI-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.MODELS_TABLE)
      .insert({
        model_code: modelCode,
        ...model,
        status: 'active',
        usage_count: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateModel(schoolId: string, id: string, model: UpdateAIModel): Promise<AIModel> {
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

  async predict(schoolId: string, modelId: string, inputData: Record<string, unknown>): Promise<AIRequest> {
    const { data, error } = await this.supabase
      .from(this.REQUESTS_TABLE)
      .insert({
        model_id: modelId,
        input_data: inputData,
        status: 'processing',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;

    await this.supabase
      .from(this.MODELS_TABLE)
      .update({ usage_count: this.supabase.rpc ? 0 : 0, updated_at: new Date().toISOString() })
      .eq('id', modelId);

    return data;
  }

  async completeRequest(schoolId: string, requestId: string, outputData: Record<string, unknown>, processingTimeMs: number): Promise<AIRequest> {
    const { data, error } = await this.supabase
      .from(this.REQUESTS_TABLE)
      .update({
        output_data: outputData,
        status: 'completed',
        processing_time_ms: processingTimeMs,
      })
      .eq('school_id', schoolId)
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async failRequest(schoolId: string, requestId: string, errorMessage: string): Promise<AIRequest> {
    const { data, error } = await this.supabase
      .from(this.REQUESTS_TABLE)
      .update({
        status: 'failed',
        error: errorMessage,
      })
      .eq('school_id', schoolId)
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getActiveModels(schoolId: string): Promise<AIModel[]> {
    const { data, error } = await this.supabase
      .from(this.MODELS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, modelType: string): Promise<AIModel[]> {
    const { data, error } = await this.supabase
      .from(this.MODELS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('model_type', modelType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getRequests(schoolId: string, modelId: string): Promise<AIRequest[]> {
    const { data, error } = await this.supabase
      .from(this.REQUESTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('model_id', modelId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getUsageStats(schoolId: string): Promise<{ totalRequests: number; successRate: number; averageProcessingTime: number }> {
    const { data, error } = await this.supabase
      .from(this.REQUESTS_TABLE)
      .select('status, processing_time_ms')
      .eq('school_id', schoolId);

    if (error) throw error;

    const totalRequests = (data || []).length;
    const completedRequests = (data || []).filter((r) => r.status === 'completed');
    const successRate = totalRequests > 0 ? (completedRequests.length / totalRequests) * 100 : 0;
    const averageProcessingTime = completedRequests.length > 0
      ? completedRequests.reduce((sum, r) => sum + (r.processing_time_ms || 0), 0) / completedRequests.length
      : 0;

    return { totalRequests, successRate, averageProcessingTime };
  }
}
