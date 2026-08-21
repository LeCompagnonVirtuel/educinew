import type { SupabaseClient } from '@supabase/supabase-js';

interface WorkforceMetric {
  id: string;
  school_id: string;
  metric_type: 'headcount' | 'turnover' | 'retention' | 'hiring_speed' | 'cost_per_hire' | 'diversity' | 'engagement' | 'productivity';
  department?: string;
  value: number;
  unit: string;
  period_start: string;
  period_end: string;
  dimensions?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface WorkforceMetricCreate {
  metric_type: WorkforceMetric['metric_type'];
  department?: string;
  value: number;
  unit: string;
  period_start: string;
  period_end: string;
  dimensions?: Record<string, unknown>;
}

interface WorkforceDashboard {
  total_headcount: number;
  turnover_rate: number;
  retention_rate: number;
  avg_hiring_days: number;
  diversity_index: number;
  engagement_score: number;
}

interface AnalyticsFilters {
  metric_type?: string;
  department?: string;
  period_start?: string;
  period_end?: string;
  page?: number;
  limit?: number;
}

export class WorkforceAnalyticsService {
  private readonly TABLE = 'gewlp_workforce_metrics';

  constructor(private supabase: SupabaseClient) {}

  async getMetric(schoolId: string, id: string): Promise<WorkforceMetric> {
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

  async listMetrics(schoolId: string, filters?: AnalyticsFilters): Promise<WorkforceMetric[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.metric_type) query = query.eq('metric_type', filters.metric_type);
    if (filters?.department) query = query.eq('department', filters.department);
    if (filters?.period_start) query = query.gte('period_start', filters.period_start);
    if (filters?.period_end) query = query.lte('period_end', filters.period_end);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('period_start', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createMetric(schoolId: string, data: WorkforceMetricCreate): Promise<WorkforceMetric> {
    const { data: metric, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return metric;
  }

  async updateMetric(schoolId: string, id: string, data: Partial<WorkforceMetricCreate>): Promise<WorkforceMetric> {
    const existing = await this.getMetric(schoolId, id);
    if (!existing) throw new Error(`Workforce metric ${id} not found`);

    const { data: metric, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return metric;
  }

  async deleteMetric(schoolId: string, id: string): Promise<void> {
    const existing = await this.getMetric(schoolId, id);
    if (!existing) throw new Error(`Workforce metric ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async getMetricByType(schoolId: string, metricType: WorkforceMetric['metric_type'], department?: string): Promise<WorkforceMetric[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('metric_type', metricType)
      .is('deleted_at', null);

    if (department) query = query.eq('department', department);

    query = query.order('period_start', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async getDashboard(schoolId: string, department?: string): Promise<WorkforceDashboard> {
    let query = this.supabase
      .from(this.TABLE)
      .select('metric_type, value')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (department) query = query.eq('department', department);

    const { data, error } = await query;
    if (error) throw error;

    const metrics = data ?? [];
    const latestByType = new Map<string, number>();
    for (const m of metrics) {
      if (!latestByType.has(m.metric_type)) latestByType.set(m.metric_type, m.value);
    }

    return {
      total_headcount: latestByType.get('headcount') ?? 0,
      turnover_rate: latestByType.get('turnover') ?? 0,
      retention_rate: latestByType.get('retention') ?? 0,
      avg_hiring_days: latestByType.get('hiring_speed') ?? 0,
      diversity_index: latestByType.get('diversity') ?? 0,
      engagement_score: latestByType.get('engagement') ?? 0,
    };
  }

  async getMetricsTrend(schoolId: string, metricType: WorkforceMetric['metric_type'], periods: number = 12): Promise<WorkforceMetric[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('metric_type', metricType)
      .is('deleted_at', null)
      .order('period_start', { ascending: true })
      .limit(periods);
    if (error) throw error;
    return data ?? [];
  }
}
