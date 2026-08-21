import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface WellbeingAnalytics {
  id: string;
  school_id: string;
  period_start: string;
  period_end: string;
  total_students_assessed: number;
  average_wellbeing_score: number;
  average_emotional_score: number;
  average_social_score: number;
  average_physical_score: number;
  average_academic_score: number;
  risk_distribution: RiskDistribution;
  mood_trends: MoodTrend[];
  intervention_effectiveness: number;
  generated_at: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface RiskDistribution {
  low: number;
  moderate: number;
  high: number;
  critical: number;
}

export interface MoodTrend {
  date: string;
  average_mood: number;
  assessments_count: number;
}

export interface WellbeingReport {
  school_id: string;
  report_type: 'weekly' | 'monthly' | 'termly' | 'annual';
  period_start: string;
  period_end: string;
  summary: string;
  key_findings: string[];
  recommendations: string[];
  generated_at: string;
}

export class WellbeingAnalyticsService {
  private readonly ANALYTICS_TABLE = 'wellbeing_analytics';
  private readonly REPORTS_TABLE = 'wellbeing_reports';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<WellbeingAnalytics[]> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<WellbeingAnalytics | null> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, analytics: Omit<WellbeingAnalytics, 'id' | 'created_at' | 'updated_at'>): Promise<WellbeingAnalytics> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .insert({ ...analytics, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, analytics: Partial<WellbeingAnalytics>): Promise<WellbeingAnalytics> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .update({ ...analytics, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getLatest(schoolId: string): Promise<WellbeingAnalytics | null> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('period_end', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  }

  async getTrends(schoolId: string, months: number): Promise<{ period: string; averageScore: number; riskDistribution: RiskDistribution }[]> {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .select('period_start, average_wellbeing_score, risk_distribution')
      .eq('school_id', schoolId)
      .gte('period_start', startDate.toISOString())
      .order('period_start', { ascending: true });

    if (error) throw error;

    return (data || []).map((d) => ({
      period: d.period_start,
      averageScore: d.average_wellbeing_score,
      riskDistribution: d.risk_distribution,
    }));
  }

  async getReports(schoolId: string): Promise<WellbeingReport[]> {
    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('generated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createReport(schoolId: string, report: Omit<WellbeingReport, 'generated_at'>): Promise<WellbeingReport> {
    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .insert({ ...report, generated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getStats(schoolId: string): Promise<{
    totalRecords: number;
    latestAverageScore: number;
    latestRiskDistribution: RiskDistribution | null;
    totalReports: number;
  }> {
    const analytics = await this.getAll(schoolId);
    const latest = analytics[0];

    const { data: reports } = await this.supabase
      .from(this.REPORTS_TABLE)
      .select('id')
      .eq('school_id', schoolId);

    return {
      totalRecords: analytics.length,
      latestAverageScore: latest?.average_wellbeing_score || 0,
      latestRiskDistribution: latest?.risk_distribution || null,
      totalReports: (reports || []).length,
    };
  }
}
