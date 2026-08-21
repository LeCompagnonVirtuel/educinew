import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-10: Analytics — Metrics, Dashboards & Reports
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHHealthDashboard extends BaseEntity { dashboard_name: string; dashboard_type: 'executive'|'operational'|'clinical'|'safety'|'wellbeing'|'custom'; owner_id: string; layout: Record<string,unknown>; filters: Record<string,unknown>; sharing: 'private'|'team'|'school'|'public'; last_viewed_at?: string; view_count: number; status: 'active'|'archived'|'draft'; }
export interface EHDashboardWidget extends BaseEntity { dashboard_id: string; widget_type: 'chart'|'kpi'|'table'|'map'|'list'|'gauge'|'heatmap'; title: string; data_source: string; configuration: Record<string,unknown>; position: Record<string,number>; refresh_interval_seconds: number; status: 'active'|'hidden'|'error'; }
export interface EHHealthKPI extends BaseEntity { kpi_name: string; kpi_category: 'attendance'|'wellbeing'|'safety'| 'health'|'academic'|'engagement'; description: string; formula: string; unit: string; target_value: number; current_value: number; trend: 'improving'|'stable'|'declining'; period: string; data_source: string; status: 'active'|'deprecated'; }
export interface EHHealthReport extends BaseEntity { report_name: string; report_type: 'summary'|'detailed'|'comparative'|'trend'|'regulatory'|'custom'; owner_id: string; parameters: Record<string,unknown>; schedule?: string; format: 'pdf'|'csv'|'html'|'json'; recipients: string[]; last_generated_at?: string; status: 'active'|'scheduled'|'archived'; }
export interface EHReportTemplate extends BaseEntity { template_name: string; template_type: string; description: string; sections: Record<string,unknown>[]; layout: Record<string,unknown>; branding: Record<string,unknown>; version: string; status: 'draft'|'active'|'archived'; }
export interface EHReportExecution extends BaseEntity { report_id: string; execution_date: string; parameters: Record<string,unknown>; record_count: number; execution_time_ms: number; file_url?: string; file_size?: number; status: 'completed'|'failed'|'processing'|'cancelled'; error_message?: string; triggered_by: string; }
export interface EHHealthMetric extends BaseEntity { metric_name: string; metric_category: string; value: number; unit: string; period: string; dimensions: Record<string,string>; source: string; calculated_at: string; previous_value?: number; change_percentage?: number; }
export interface EHTrendAnalysis extends BaseEntity { analysis_name: string; entity_type: string; metric_name: string; time_period: string; granularity: 'daily'|'weekly'|'monthly'|'quarterly'|'annual'; data_points: Record<string,unknown>[]; trend_direction: 'up'|'down'|'flat'|'volatile'; change_rate: number; seasonality_detected: boolean; forecast?: Record<string,unknown>[]; }
export interface EHBenchmarkComparison extends BaseEntity { benchmark_name: string; metric_name: string; entity_type: string; entity_id?: string; benchmark_value: number; actual_value: number; deviation: number; deviation_percentage: number; source: string; comparison_date: string; period: string; }
export interface EHDataWarehouse extends BaseEntity { table_name: string; description: string; record_count: number; last_synced_at: string; sync_frequency: string; data_sources: string[]; schema_version: string; status: 'synced'|'syncing'|'error'|'stale'; }
export interface EHETLJob extends BaseEntity { job_name: string; source_system: string; target_table: string; schedule: string; last_run_date?: string; next_run_date: string; records_processed: number; execution_time_ms: number; status: 'active'|'paused'|'failed'|'completed'; error_log?: string; }
export interface EHAnalyticsAlert extends BaseEntity { alert_name: string; metric_name: string; condition: string; threshold_value: number; current_value: number; severity: 'info'|'warning'|'critical'; recipients: string[]; acknowledged: boolean; acknowledged_at?: string; resolved: boolean; }
export interface EHStudentAnalytics extends BaseEntity { student_id: string; period: string; attendance_rate: number; academic_score: number; wellbeing_score: number; behavior_score: number; engagement_score: number; composite_score: number; percentile_rank?: number; risk_level: 'low'|'moderate'|'high'; }
export interface EHSchoolAnalytics extends BaseEntity { school_id: string; period: string; total_students: number; attendance_rate: number; avg_wellbeing_score: number; incident_rate: number; health_score: number; safety_score: number; accessibility_score: number; overall_health_index: number; }
export interface EHAnalyticsMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_10_TABLE_NAMES: Record<string, string> = {
  EHHealthDashboard: 'eh_health_dashboards',
  EHDashboardWidget: 'eh_dashboard_widgets',
  EHHealthKPI: 'eh_health_kpis',
  EHHealthReport: 'eh_health_reports',
  EHReportTemplate: 'eh_report_templates',
  EHReportExecution: 'eh_report_executions',
  EHHealthMetric: 'eh_health_metrics_analytics',
  EHTrendAnalysis: 'eh_trend_analyses',
  EHBenchmarkComparison: 'eh_benchmark_comparisons',
  EHDataWarehouse: 'eh_data_warehouses',
  EHETLJob: 'eh_etl_jobs',
  EHAnalyticsAlert: 'eh_analytics_alerts',
  EHStudentAnalytics: 'eh_student_analytics',
  EHSchoolAnalytics: 'eh_school_analytics',
  EHAnalyticsMetric: 'eh_analytics_metrics',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_10_Repository {
  healthDashboards: CrudRepository<EHHealthDashboard>;
  dashboardWidgets: CrudRepository<EHDashboardWidget>;
  healthKPIs: CrudRepository<EHHealthKPI>;
  healthReports: CrudRepository<EHHealthReport>;
  reportTemplates: CrudRepository<EHReportTemplate>;
  reportExecutions: CrudRepository<EHReportExecution>;
  healthMetrics: CrudRepository<EHHealthMetric>;
  trendAnalyses: CrudRepository<EHTrendAnalysis>;
  benchmarkComparisons: CrudRepository<EHBenchmarkComparison>;
  dataWarehouses: CrudRepository<EHDataWarehouse>;
  etlJobs: CrudRepository<EHETLJob>;
  analyticsAlerts: CrudRepository<EHAnalyticsAlert>;
  studentAnalytics: CrudRepository<EHStudentAnalytics>;
  schoolAnalytics: CrudRepository<EHSchoolAnalytics>;
  analyticsMetrics: CrudRepository<EHAnalyticsMetric>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_10_Repository(supabase: SupabaseClient): EDU_HEALTH_10_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    healthDashboards: crud<EHHealthDashboard>(EDU_HEALTH_10_TABLE_NAMES.EHHealthDashboard),
    dashboardWidgets: crud<EHDashboardWidget>(EDU_HEALTH_10_TABLE_NAMES.EHDashboardWidget),
    healthKPIs: crud<EHHealthKPI>(EDU_HEALTH_10_TABLE_NAMES.EHHealthKPI),
    healthReports: crud<EHHealthReport>(EDU_HEALTH_10_TABLE_NAMES.EHHealthReport),
    reportTemplates: crud<EHReportTemplate>(EDU_HEALTH_10_TABLE_NAMES.EHReportTemplate),
    reportExecutions: crud<EHReportExecution>(EDU_HEALTH_10_TABLE_NAMES.EHReportExecution),
    healthMetrics: crud<EHHealthMetric>(EDU_HEALTH_10_TABLE_NAMES.EHHealthMetric),
    trendAnalyses: crud<EHTrendAnalysis>(EDU_HEALTH_10_TABLE_NAMES.EHTrendAnalysis),
    benchmarkComparisons: crud<EHBenchmarkComparison>(EDU_HEALTH_10_TABLE_NAMES.EHBenchmarkComparison),
    dataWarehouses: crud<EHDataWarehouse>(EDU_HEALTH_10_TABLE_NAMES.EHDataWarehouse),
    etlJobs: crud<EHETLJob>(EDU_HEALTH_10_TABLE_NAMES.EHETLJob),
    analyticsAlerts: crud<EHAnalyticsAlert>(EDU_HEALTH_10_TABLE_NAMES.EHAnalyticsAlert),
    studentAnalytics: crud<EHStudentAnalytics>(EDU_HEALTH_10_TABLE_NAMES.EHStudentAnalytics),
    schoolAnalytics: crud<EHSchoolAnalytics>(EDU_HEALTH_10_TABLE_NAMES.EHSchoolAnalytics),
    analyticsMetrics: crud<EHAnalyticsMetric>(EDU_HEALTH_10_TABLE_NAMES.EHAnalyticsMetric),
  };
}
