import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SafetyAnalytics {
  id: string;
  school_id: string;
  period_start: string;
  period_end: string;
  total_incidents: number;
  incidents_by_type: Record<string, number>;
  incidents_by_severity: Record<string, number>;
  incidents_by_location: Record<string, number>;
  average_response_time: number;
  emergency_services_called: number;
  injuries_reported: number;
  property_damage_count: number;
  trends: SafetyTrend[];
  generated_at: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SafetyTrend {
  date: string;
  incidents_count: number;
  severity_average: number;
}

export interface SafetyReport {
  id: string;
  school_id: string;
  report_type: 'monthly' | 'quarterly' | 'annual' | 'incident_specific';
  period_start: string;
  period_end: string;
  executive_summary: string;
  incident_analysis: string;
  recommendations: string[];
  compliance_status: string;
  generated_at: string;
}

export class SafetyAnalyticsService {
  private readonly ANALYTICS_TABLE = 'safety_analytics';
  private readonly REPORTS_TABLE = 'safety_reports';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SafetyAnalytics[]> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SafetyAnalytics | null> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, analytics: Omit<SafetyAnalytics, 'id' | 'created_at' | 'updated_at'>): Promise<SafetyAnalytics> {
    const { data, error } = await this.supabase
      .from(this.ANALYTICS_TABLE)
      .insert({ ...analytics, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, analytics: Partial<SafetyAnalytics>): Promise<SafetyAnalytics> {
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

  async getLatest(schoolId: string): Promise<SafetyAnalytics | null> {
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

  async getLocationHotspots(schoolId: string): Promise<{ location: string; count: number }[]> {
    const latest = await this.getLatest(schoolId);
    if (!latest) return [];

    return Object.entries(latest.incidents_by_location)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count);
  }

  async getReports(schoolId: string): Promise<SafetyReport[]> {
    const { data, error } = await this.supabase
      .from(this.REPORTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .order('generated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createReport(schoolId: string, report: Omit<SafetyReport, 'id' | 'generated_at'>): Promise<SafetyReport> {
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
    latestIncidents: number;
    latestInjuries: number;
    latestAvgResponseTime: number;
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
      latestIncidents: latest?.total_incidents || 0,
      latestInjuries: latest?.injuries_reported || 0,
      latestAvgResponseTime: latest?.average_response_time || 0,
      totalReports: (reports || []).length,
    };
  }
}
