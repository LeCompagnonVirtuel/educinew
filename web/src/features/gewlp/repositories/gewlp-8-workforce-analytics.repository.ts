import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-8: Workforce Analytics — Workforce Intelligence & Insights
// ============================================================================

export interface GewlpWorkforceMetric extends BaseEntity { company_id: string; metric_name: string; metric_type: 'headcount'|'turnover'|'engagement'|'productivity'|'diversity'|'cost'|'retention'|'absenteeism'; value: number; unit: string; period: string; comparison_period?: string; comparison_value?: number; dimension: Record<string,string>; status: 'current'|'historical'|'projected'; }
export interface GewlpWorkforceReport extends BaseEntity { company_id: string; report_type: 'snapshot'|'trend'| 'benchmark'|'forecast'|'custom'; title: string; description: string; period: string; filters: Record<string,unknown>; data: Record<string,unknown>; generated_at: string; generated_by: string; status: 'draft'|'final'; }
export interface GewlpWorkforceDashboard extends BaseEntity { company_id: string; name: string; description: string; widgets: Record<string,unknown>[]; layout: Record<string,unknown>; owner_id: string; shared_with: string[]; status: 'active'|'archived'; }
export interface GewlpTurnoverAnalysis extends BaseEntity { company_id: string; period: string; department?: string; voluntary_count: number; involuntary_count: number; total_count: number; turnover_rate: number; avg_tenure_months: number; cost_estimate: number; currency: string; top_reasons: Record<string,unknown>[]; }
export interface GewlpDiversityReport extends BaseEntity { company_id: string; period: string; dimensions: Record<string,unknown>[]; gender_distribution: Record<string,number>; ethnicity_distribution: Record<string,number>; age_distribution: Record<string,number>; inclusion_score: number; status: 'draft'|'published'; }
export interface GewlpCompensationBenchmark extends BaseEntity { company_id: string; job_title: string; industry: string; region: string; company_size: string; base_salary_p25: number; base_salary_p50: number; base_salary_p75: number; total_comp_p25: number; total_comp_p50: number; total_comp_p75: number; currency: string; data_date: string; }
export interface GewlpAbsenteeismRecord extends BaseEntity { employee_id: string; company_id: string; date: string; reason: 'sick'|'personal'|'vacation'|'bereavement'|'jury_duty'|'other'; hours_absent: number; approved: boolean; approved_by?: string; notes?: string; }
export interface GewlpWorkforceAlert extends BaseEntity { company_id: string; alert_type: 'turnover_spike'|'engagement_drop'|'absenteeism_rise'|'skill_shortage'|'budget_overrun'|'compliance_risk'; severity: 'info'|'warning'|'critical'; title: string; description: string; metric_value: number; threshold: number; triggered_at: string; acknowledged_at?: string; acknowledged_by?: string; status: 'active'|'acknowledged'|'resolved'; }
export interface GewlpWorkforceProjection extends BaseEntity { company_id: string; metric_name: string; projection_type: 'linear'|'seasonal'|'ml_model'; data_points: Record<string,unknown>[]; confidence_level: number; generated_at: string; status: 'active'|'superseded'; }
export interface GewlpDepartmentAnalytics extends BaseEntity { company_id: string; department: string; period: string; headcount: number; avg_tenure_months: number; avg_performance_rating: number; engagement_score: number; turnover_rate: number; training_hours_per_employee: number; cost_per_employee: number; currency: string; }
export interface GewlpWorkforceInsight extends BaseEntity { company_id: string; insight_type: 'trend'|'anomaly'|'correlation'|'prediction'|'recommendation'; title: string; description: string; confidence: number; data: Record<string,unknown>; generated_at: string; status: 'new'|'reviewed'|'acted'|'dismissed'; }
export interface GewlpBenchmarkComparison extends BaseEntity { company_id: string; metric_name: string; company_value: number; industry_avg: number; industry_top10: number; industry_bottom10: number; percentile: number; period: string; }

export const Gewlp8TableNames: Record<string, string> = {
  GewlpWorkforceMetric: 'gewlp_workforce_metrics',
  GewlpWorkforceReport: 'gewlp_workforce_reports',
  GewlpWorkforceDashboard: 'gewlp_workforce_dashboards',
  GewlpTurnoverAnalysis: 'gewlp_turnover_analyses',
  GewlpDiversityReport: 'gewlp_diversity_reports',
  GewlpCompensationBenchmark: 'gewlp_compensation_benchmarks',
  GewlpAbsenteeismRecord: 'gewlp_absenteeism_records',
  GewlpWorkforceAlert: 'gewlp_workforce_alerts',
  GewlpWorkforceProjection: 'gewlp_workforce_projections',
  GewlpDepartmentAnalytics: 'gewlp_department_analytics',
  GewlpWorkforceInsight: 'gewlp_workforce_insights',
  GewlpBenchmarkComparison: 'gewlp_benchmark_comparisons',
};

export interface Gewlp8Repository {
  workforceMetrics: CrudRepository<GewlpWorkforceMetric>;
  workforceReports: CrudRepository<GewlpWorkforceReport>;
  workforceDashboards: CrudRepository<GewlpWorkforceDashboard>;
  turnoverAnalyses: CrudRepository<GewlpTurnoverAnalysis>;
  diversityReports: CrudRepository<GewlpDiversityReport>;
  compensationBenchmarks: CrudRepository<GewlpCompensationBenchmark>;
  absenteeismRecords: CrudRepository<GewlpAbsenteeismRecord>;
  workforceAlerts: CrudRepository<GewlpWorkforceAlert>;
  workforceProjections: CrudRepository<GewlpWorkforceProjection>;
  departmentAnalytics: CrudRepository<GewlpDepartmentAnalytics>;
  workforceInsights: CrudRepository<GewlpWorkforceInsight>;
  benchmarkComparisons: CrudRepository<GewlpBenchmarkComparison>;
}

export function createGewlp8Repository(supabase: SupabaseClient): Gewlp8Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    workforceMetrics: crud<GewlpWorkforceMetric>(Gewlp8TableNames.GewlpWorkforceMetric),
    workforceReports: crud<GewlpWorkforceReport>(Gewlp8TableNames.GewlpWorkforceReport),
    workforceDashboards: crud<GewlpWorkforceDashboard>(Gewlp8TableNames.GewlpWorkforceDashboard),
    turnoverAnalyses: crud<GewlpTurnoverAnalysis>(Gewlp8TableNames.GewlpTurnoverAnalysis),
    diversityReports: crud<GewlpDiversityReport>(Gewlp8TableNames.GewlpDiversityReport),
    compensationBenchmarks: crud<GewlpCompensationBenchmark>(Gewlp8TableNames.GewlpCompensationBenchmark),
    absenteeismRecords: crud<GewlpAbsenteeismRecord>(Gewlp8TableNames.GewlpAbsenteeismRecord),
    workforceAlerts: crud<GewlpWorkforceAlert>(Gewlp8TableNames.GewlpWorkforceAlert),
    workforceProjections: crud<GewlpWorkforceProjection>(Gewlp8TableNames.GewlpWorkforceProjection),
    departmentAnalytics: crud<GewlpDepartmentAnalytics>(Gewlp8TableNames.GewlpDepartmentAnalytics),
    workforceInsights: crud<GewlpWorkforceInsight>(Gewlp8TableNames.GewlpWorkforceInsight),
    benchmarkComparisons: crud<GewlpBenchmarkComparison>(Gewlp8TableNames.GewlpBenchmarkComparison),
  };
}
