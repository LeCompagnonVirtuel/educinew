import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SafeguardingAnalytics {
  id: string;
  school_id: string;
  period_start: string;
  period_end: string;
  total_concerns: number;
  new_concerns: number;
  concerns_by_type: Record<string, number>;
  concerns_by_severity: Record<string, number>;
  resolution_rate: number;
  average_resolution_days: number;
  referrals_to_agency: number;
  repeat_concerns: number;
  trends: SafeguardingTrend[];
  generated_at: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SafeguardingTrend {
  date: string;
  concerns_count: number;
  resolved_count: number;
}

export interface SafeguardingReport {
  id: string;
  school_id: string;
  report_type: 'monthly' | 'termly' | 'annual' | 'ad_hoc';
  period_start: string;
  period_end: string;
  executive_summary: string;
  key_metrics: Record<string, number>;
  concerns_analyzed: number;
  actions_recommended: string[];
  compliance_status: string;
  generated_at: string;
}

export class SafeguardingAnalyticsService {
  private readonly ANALYTICS_TABLE = 'safeguarding_analytics';
  private readonly REPORTS_TABLE = 'safeguarding_reports';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SafeguardingAnalytics[]> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SafeguardingAnalytics | null> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, analytics: Omit<SafeguardingAnalytics, 'id' | 'created_at' | 'updated_at'>): Promise<SafeguardingAnalytics> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .insert({ ...analytics, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, analytics: Partial<SafeguardingAnalytics>): Promise<SafeguardingAnalytics> {
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

  async getLatest(schoolId: string): Promise<SafeguardingAnalytics | null> {
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

  async getConcernTypeBreakdown(schoolId: string): Promise<Record<string, number>> {
    const latest = await this.getLatest(schoolId);
    return latest?.concerns_by_type || {};
  }

  async getSeverityBreakdown(schoolId: string): Promise<Record<string, number>> {
    const latest = await this.getLatest(schoolId);
    return latest?.concerns_by_severity || {};
  }

  async getReports(schoolId: string): Promise<SafeguardingReport[]> {
    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('generated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createReport(schoolId: string, report: Omit<SafeguardingReport, 'id' | 'generated_at'>): Promise<SafeguardingReport> {
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
    latestTotalConcerns: number;
    latestResolutionRate: number;
    latestReferrals: number;
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
      latestTotalConcerns: latest?.total_concerns || 0,
      latestResolutionRate: latest?.resolution_rate || 0,
      latestReferrals: latest?.referrals_to_agency || 0,
      totalReports: (reports || []).length,
    };
  }
}
