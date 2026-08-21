import type { SupabaseClient } from '@supabase/supabase-js';

interface AIOrchestrationTask {
  id: string;
  school_id: string;
  task_type: 'skill_assessment' | 'career_recommendation' | 'learning_suggestion' | 'match_scoring' | 'gap_analysis' | 'market_insight' | 'profile_enrichment';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  model_used?: string;
  confidence?: number;
  error_message?: string;
  processing_time_ms?: number;
  requested_by: string;
  created_at: string;
  updated_at: string;
}

interface AIOrchestrationTaskCreate {
  task_type: AIOrchestrationTask['task_type'];
  input: Record<string, unknown>;
  requested_by: string;
}

interface AIOrchestrationFilters {
  task_type?: string;
  status?: string;
  requested_by?: string;
  page?: number;
  limit?: number;
}

interface AIInsight {
  type: string;
  title: string;
  description: string;
  confidence: number;
  data?: Record<string, unknown>;
}

export class AIOrchestratorService {
  private readonly TABLE = 'gewlp_ai_orchestration_tasks';
  private readonly INSIGHT_TABLE = 'gewlp_ai_insights';

  constructor(private supabase: SupabaseClient) {}

  async getTask(schoolId: string, id: string): Promise<AIOrchestrationTask> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async listTasks(schoolId: string, filters?: AIOrchestrationFilters): Promise<AIOrchestrationTask[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.task_type) query = query.eq('task_type', filters.task_type);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.requested_by) query = query.eq('requested_by', filters.requested_by);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createTask(schoolId: string, data: AIOrchestrationTaskCreate): Promise<AIOrchestrationTask> {
    const { data: task, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        status: 'pending',
      })
      .select()
      .single();
    if (error) throw error;
    return task;
  }

  async updateTaskStatus(schoolId: string, id: string, status: AIOrchestrationTask['status'], output?: Record<string, unknown>, errorMessage?: string): Promise<AIOrchestrationTask> {
    const update: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (output) update.output = output;
    if (errorMessage) update.error_message = errorMessage;

    const { data: task, error } = await this.supabase
      .from(this.TABLE)
      .update(update)
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return task;
  }

  async completeTask(schoolId: string, id: string, output: Record<string, unknown>, modelUsed: string, confidence: number, processingTimeMs: number): Promise<AIOrchestrationTask> {
    const { data: task, error } = await this.supabase
      .from(this.TABLE)
      .update({
        status: 'completed',
        output,
        model_used: modelUsed,
        confidence,
        processing_time_ms: processingTimeMs,
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return task;
  }

  async failTask(schoolId: string, id: string, errorMessage: string): Promise<AIOrchestrationTask> {
    return this.updateTaskStatus(schoolId, id, 'failed', undefined, errorMessage);
  }

  async getRecentTasks(schoolId: string, taskType?: AIOrchestrationTask['task_type'], limit: number = 10): Promise<AIOrchestrationTask[]> {
    return this.listTasks(schoolId, { task_type: taskType, limit });
  }

  async saveInsight(schoolId: string, insight: AIInsight): Promise<void> {
    const { error } = await this.supabase
      .from(this.INSIGHT_TABLE)
      .insert({ school_id: schoolId, ...insight });
    if (error) throw error;
  }

  async getInsights(schoolId: string, type?: string): Promise<AIInsight[]> {
    let query = this.supabase
      .from(this.INSIGHT_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    if (type) query = query.eq('type', type);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }
}
