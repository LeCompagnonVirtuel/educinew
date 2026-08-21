import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HealthDashboard {
  id: string;
  school_id: string;
  dashboard_name: string;
  period_start: string;
  period_end: string;
  total_students: number;
  health_records: number;
  screenings_completed: number;
  referrals_made: number;
  incidents_recorded: number;
  high_risk_students: number;
  overdue_checkups: number;
  vaccination_rate: number;
  metrics: HealthMetric[];
  generated_at: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface HealthMetric {
  id: string;
  category: string;
  metric_name: string;
  value: number;
  unit: string;
  trend: 'improving' | 'stable' | 'declining';
  previous_value?: number;
}

export interface HealthTrend {
  period: string;
  total_incidents: number;
  screenings: number;
  referrals: number;
  average_wellbeing_score: number;
}

export class HealthAnalyticsService {
  private readonly DASHBOARDS_TABLE = 'health_dashboards';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getDashboard(schoolId: string, periodStart: string, periodEnd: string): Promise<HealthDashboard | null> {
    const { data, error } = await this.supabase
      .from(this.DASHBOARDS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('period_start', periodStart)
      .eq('period_end', periodEnd)
      .single();

    if (error) throw error;
    return data;
  }

  async createDashboard(schoolId: string, dashboard: Omit<HealthDashboard, 'id' | 'created_at' | 'updated_at'>): Promise<HealthDashboard> {
    const { data, error } = await this.supabase
      .from(this.DASHBOARDS_TABLE)
      .insert({ ...dashboard, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getDashboards(schoolId: string): Promise<HealthDashboard[]> {
    const { data, error } = await this.supabase
      .from(this.DASHBOARDS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('period_start', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getLatestDashboard(schoolId: string): Promise<HealthDashboard | null> {
    const { data, error } = await this.supabase
      .from(this.DASHBOARDS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('period_start', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  }

  async getTrends(schoolId: string, months: number): Promise<HealthTrend[]> {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const { data, error } = await this.supabase
      .from(this.DASHBOARDS_TABLE)
      .select('period_start, total_incidents, screenings_completed, referrals_made, metrics')
      .eq('school_id', schoolId)
      .gte('period_start', startDate.toISOString())
      .order('period_start', { ascending: true });

    if (error) throw error;

    return (data || []).map((d) => ({
      period: d.period_start,
      total_incidents: d.total_incidents,
      screenings: d.screenings_completed,
      referrals: d.referrals_made,
      average_wellbeing_score: 0,
    }));
  }

  async getMetricComparison(schoolId: string, metricName: string): Promise<{ current: number; previous: number; change: number }> {
    const dashboards = await this.getDashboards(schoolId);
    if (dashboards.length < 2) return { current: 0, previous: 0, change: 0 };

    const latest = dashboards[0];
    const previous = dashboards[1];

    const currentMetric = latest.metrics.find((m) => m.metric_name === metricName);
    const previousMetric = previous.metrics.find((m) => m.metric_name === metricName);

    const currentVal = currentMetric?.value || 0;
    const previousVal = previousMetric?.value || 0;
    const change = previousVal > 0 ? ((currentVal - previousVal) / previousVal) * 100 : 0;

    return { current: currentVal, previous: previousVal, change };
  }

  async getStats(schoolId: string): Promise<{
    totalDashboards: number;
    latestPeriod: string;
    currentIncidents: number;
    currentScreenings: number;
    currentReferrals: number;
  }> {
    const dashboards = await this.getDashboards(schoolId);
    const latest = dashboards[0];

    return {
      totalDashboards: dashboards.length,
      latestPeriod: latest?.period_start || '',
      currentIncidents: latest?.total_incidents || 0,
      currentScreenings: latest?.screenings_completed || 0,
      currentReferrals: latest?.referrals_made || 0,
    };
  }
}
