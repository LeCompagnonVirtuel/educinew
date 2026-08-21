import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-8: Analytics — Educational Analytics Framework
// ============================================================================

export interface GEGINDashboard extends BaseEntity {
  name: string;
  description?: string;
  type: 'system' | 'custom' | 'shared';
  category: 'academic' | 'financial' | 'operational' | 'hr' | 'attendance' | 'behavior' | 'custom';
  owner_id?: string;
  layout: Record<string, unknown>;
  filters: Record<string, unknown>;
  is_public: boolean;
  access_roles: string[];
  status: 'active' | 'inactive' | 'draft';
  metadata: Record<string, unknown>;
}

export interface GEGINIndicator extends BaseEntity {
  name: string;
  description: string;
  category: 'academic' | 'financial' | 'operational' | 'hr' | 'attendance' | 'behavior' | 'custom';
  metric_type: 'count' | 'average' | 'percentage' | 'ratio' | 'trend';
  data_source: string;
  calculation_formula?: string;
  unit?: string;
  target_value?: number;
  threshold_warning?: number;
  threshold_critical?: number;
  status: 'active' | 'inactive' | 'draft';
  metadata: Record<string, unknown>;
}

export interface GEGINRanking extends BaseEntity {
  name: string;
  description: string;
  type: 'institutional' | 'regional' | 'national' | 'international';
  category: 'academic' | 'research' | 'innovation' | 'sustainability';
  methodology: Record<string, unknown>;
  data_sources: string[];
  frequency: 'annual' | 'biannual' | 'quarterly' | 'monthly';
  last_published?: string;
  status: 'active' | 'inactive' | 'draft';
  metadata: Record<string, unknown>;
}

export interface GEGINSDGAlignment extends BaseEntity {
  institution_id: string;
  sdg_number: number;
  sdg_name: string;
  alignment_score: number;
  description: string;
  initiatives: string[];
  evidence_urls: string[];
  assessed_date: string;
  metadata: Record<string, unknown>;
}

export interface GEGINUNESCOIndicator extends BaseEntity {
  institution_id: string;
  indicator_code: string;
  indicator_name: string;
  category: string;
  value: number;
  unit: string;
  year: number;
  source?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINBenchmark extends BaseEntity {
  name: string;
  description: string;
  type: 'internal' | 'external' | 'industry' | 'best_practice';
  metric: string;
  benchmark_value: number;
  unit: string;
  source?: string;
  effective_date: string;
  expiry_date?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINDataExport extends BaseEntity {
  name: string;
  description?: string;
  query_config: Record<string, unknown>;
  format: 'csv' | 'excel' | 'json' | 'pdf';
  schedule?: Record<string, unknown>;
  last_generated?: string;
  file_url?: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN8_TABLE_NAMES: Record<string, string> = {
  GEGINDashboard: 'gegin_dashboards',
  GEGINIndicator: 'gegin_indicators',
  GEGINRanking: 'gegin_rankings',
  GEGINSDGAlignment: 'gegin_sdg_alignments',
  GEGINUNESCOIndicator: 'gegin_unesco_indicators',
  GEGINBenchmark: 'gegin_benchmarks',
  GEGINDataExport: 'gegin_data_exports',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN8Repository {
  dashboards: CrudRepository<GEGINDashboard>;
  indicators: CrudRepository<GEGINIndicator>;
  rankings: CrudRepository<GEGINRanking>;
  sdgAlignments: CrudRepository<GEGINSDGAlignment>;
  unescoIndicators: CrudRepository<GEGINUNESCOIndicator>;
  benchmarks: CrudRepository<GEGINBenchmark>;
  dataExports: CrudRepository<GEGINDataExport>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN8Repository(supabase: SupabaseClient): GEGIN8Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    dashboards: crud<GEGINDashboard>(GEGIN8_TABLE_NAMES.GEGINDashboard),
    indicators: crud<GEGINIndicator>(GEGIN8_TABLE_NAMES.GEGINIndicator),
    rankings: crud<GEGINRanking>(GEGIN8_TABLE_NAMES.GEGINRanking),
    sdgAlignments: crud<GEGINSDGAlignment>(GEGIN8_TABLE_NAMES.GEGINSDGAlignment),
    unescoIndicators: crud<GEGINUNESCOIndicator>(GEGIN8_TABLE_NAMES.GEGINUNESCOIndicator),
    benchmarks: crud<GEGINBenchmark>(GEGIN8_TABLE_NAMES.GEGINBenchmark),
    dataExports: crud<GEGINDataExport>(GEGIN8_TABLE_NAMES.GEGINDataExport),
  };
}
