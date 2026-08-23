import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-12: Economic Intelligence — Forecasting, Analytics, Benchmarking
// ============================================================================

export interface GEFIEconomicForecast extends BaseEntity { name: string; model_type: 'REVENUE'|'ENROLLMENT'|'EXPENSE'|'CASH_FLOW'|'INVESTMENT'|'CUSTOM'; parameters: Record<string,unknown>; forecast_horizon_months: number; confidence_level: number; accuracy_score: number; last_trained_at: string; status: 'ACTIVE'|'ARCHIVED'|'TRAINING'; metadata: Record<string,unknown>; }
export interface GEFIEconomicForecastResult extends BaseEntity { forecast_id: string; period: string; predicted_value: number; lower_bound: number; upper_bound: number; actual_value?: number; error?: number; generated_at: string; metadata: Record<string,unknown>; }
export interface GEFIEconomicIndicator extends BaseEntity { name: string; code: string; category: 'MACRO'|'MICRO'|'SECTOR'|'LOCAL'; unit: string; source: string; frequency: 'DAILY'|'WEEKLY'|'MONTHLY'|'QUARTERLY'|'ANNUAL'; latest_value: number; previous_value: number; trend: 'UP'|'DOWN'|'STABLE'; last_updated: string; metadata: Record<string,unknown>; }
export interface GEFIEconomicIndicatorValue extends BaseEntity { indicator_id: string; date: string; value: number; revised_value?: number; source: string; metadata: Record<string,unknown>; }
export interface GEFIEconomicScenario extends BaseEntity { name: string; description: string; type: 'BASE'|'OPTIMISTIC'|'PESSIMISTIC'|'STRESS'|'CUSTOM'; assumptions: Record<string,unknown>; probability: number; impact_score: number; status: 'DRAFT'|'ACTIVE'|'ARCHIVED'; created_by: string; created_at: string; metadata: Record<string,unknown>; }
export interface GEFIEconomicScenarioResult extends BaseEntity { scenario_id: string; metric_name: string; base_value: number; scenario_value: number; variance: number; variance_percentage: number; period: string; metadata: Record<string,unknown>; }
export interface GEFISchoolBenchmark extends BaseEntity { name: string; description: string; category: 'FINANCIAL'|'ACADEMIC'|'OPERATIONAL'|'STAFFING'|'INFRASTRUCTURE'; metric_name: string; school_count: number; avg_value: number; median_value: number; min_value: number; max_value: number; p25_value: number; p75_value: number; period: string; status: 'ACTIVE'|'ARCHIVED'; metadata: Record<string,unknown>; }
export interface GEFISchoolBenchmarkData extends BaseEntity { benchmark_id: string; school_id: string; value: number; rank: number; percentile: number; period: string; metadata: Record<string,unknown>; }
export interface GEFIEconomicCorrelation extends BaseEntity { variable_a: string; variable_b: string; correlation_coefficient: number; p_value: number; confidence_interval: number; sample_size: number; period: string; relationship_type: 'POSITIVE'|'NEGATIVE'|'NEUTRAL'; strength: 'WEAK'|'MODERATE'|'STRONG'|'VERY_STRONG'; metadata: Record<string,unknown>; }
export interface GEFIRiskModel extends BaseEntity { name: string; model_type: 'CREDIT'|'MARKET'|'OPERATIONAL'|'LIQUIDITY'|'REPUTATION'|'REGULATORY'; risk_factors: Record<string,unknown>[]; threshold: number; alert_level: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; last_calculated: string; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIRiskAssessment extends BaseEntity { model_id: string; entity_type: string; entity_id: string; risk_score: number; risk_level: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; risk_factors: Record<string,unknown>; recommendations: string[]; assessed_at: string; valid_until: string; metadata: Record<string,unknown>; }
export interface GEFIMarketData extends BaseEntity { asset_name: string; asset_type: string; price: number; change: number; change_percentage: number; volume: number; market_cap?: number; timestamp: string; source: string; metadata: Record<string,unknown>; }
export interface GEFIEconomicAlert extends BaseEntity { alert_type: 'THRESHOLD'|'TREND'|'ANOMALY'|'PREDICTION'; severity: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; title: string; message: string; metric_name: string; current_value: number; threshold_value?: number; triggered_at: string; acknowledged: boolean; acknowledged_by?: string; acknowledged_at?: string; metadata: Record<string,unknown>; }
export interface GEFIEconomicReport extends BaseEntity { name: string; type: 'DAILY'|'WEEKLY'|'MONTHLY'|'QUARTERLY'|'ANNUAL'|'CUSTOM'; sections: Record<string,unknown>[]; recipients: string[]; schedule?: string; last_generated?: string; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIEconomicReportExecution extends BaseEntity { report_id: string; parameters: Record<string,unknown>; status: 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'; file_url?: string; error?: string; started_at: string; completed_at?: string; duration_ms?: number; metadata: Record<string,unknown>; }
export interface GEFIEconomicDataFeed extends BaseEntity { name: string; provider: string; url: string; frequency: string; last_fetched: string; status: 'ACTIVE'|'ERROR'|'DISABLED'; error_count: number; metadata: Record<string,unknown>; }
export interface GEFIEconomicDataPoint extends BaseEntity { feed_id: string; key: string; value: number; unit: string; timestamp: string; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI12Repository {
  economicForecast: CrudRepository<GEFIEconomicForecast>;
  economicForecastResult: CrudRepository<GEFIEconomicForecastResult>;
  economicIndicator: CrudRepository<GEFIEconomicIndicator>;
  economicIndicatorValue: CrudRepository<GEFIEconomicIndicatorValue>;
  economicScenario: CrudRepository<GEFIEconomicScenario>;
  economicScenarioResult: CrudRepository<GEFIEconomicScenarioResult>;
  schoolBenchmark: CrudRepository<GEFISchoolBenchmark>;
  schoolBenchmarkData: CrudRepository<GEFISchoolBenchmarkData>;
  economicCorrelation: CrudRepository<GEFIEconomicCorrelation>;
  riskModel: CrudRepository<GEFIRiskModel>;
  riskAssessment: CrudRepository<GEFIRiskAssessment>;
  marketData: CrudRepository<GEFIMarketData>;
  economicAlert: CrudRepository<GEFIEconomicAlert>;
  economicReport: CrudRepository<GEFIEconomicReport>;
  economicReportExecution: CrudRepository<GEFIEconomicReportExecution>;
  economicDataFeed: CrudRepository<GEFIEconomicDataFeed>;
  economicDataPoint: CrudRepository<GEFIEconomicDataPoint>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI12Repository(supabase: SupabaseClient): GEFI12Repository {
  return {
    economicForecast: createCrudRepository<GEFIEconomicForecast>(supabase, 'gefi_economic_forecasts'),
    economicForecastResult: createCrudRepository<GEFIEconomicForecastResult>(supabase, 'gefi_economic_forecast_results'),
    economicIndicator: createCrudRepository<GEFIEconomicIndicator>(supabase, 'gefi_economic_indicators'),
    economicIndicatorValue: createCrudRepository<GEFIEconomicIndicatorValue>(supabase, 'gefi_economic_indicator_values'),
    economicScenario: createCrudRepository<GEFIEconomicScenario>(supabase, 'gefi_economic_scenarios'),
    economicScenarioResult: createCrudRepository<GEFIEconomicScenarioResult>(supabase, 'gefi_economic_scenario_results'),
    schoolBenchmark: createCrudRepository<GEFISchoolBenchmark>(supabase, 'gefi_school_benchmarks'),
    schoolBenchmarkData: createCrudRepository<GEFISchoolBenchmarkData>(supabase, 'gefi_school_benchmark_data'),
    economicCorrelation: createCrudRepository<GEFIEconomicCorrelation>(supabase, 'gefi_economic_correlations'),
    riskModel: createCrudRepository<GEFIRiskModel>(supabase, 'gefi_risk_models'),
    riskAssessment: createCrudRepository<GEFIRiskAssessment>(supabase, 'gefi_risk_assessments'),
    marketData: createCrudRepository<GEFIMarketData>(supabase, 'gefi_market_data'),
    economicAlert: createCrudRepository<GEFIEconomicAlert>(supabase, 'gefi_economic_alerts'),
    economicReport: createCrudRepository<GEFIEconomicReport>(supabase, 'gefi_economic_reports'),
    economicReportExecution: createCrudRepository<GEFIEconomicReportExecution>(supabase, 'gefi_economic_report_executions'),
    economicDataFeed: createCrudRepository<GEFIEconomicDataFeed>(supabase, 'gefi_economic_data_feeds'),
    economicDataPoint: createCrudRepository<GEFIEconomicDataPoint>(supabase, 'gefi_economic_data_points'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_economic_intelligence_audit_trails'),
  };
}
