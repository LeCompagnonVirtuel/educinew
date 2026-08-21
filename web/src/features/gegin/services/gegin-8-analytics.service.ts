import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINDashboard, GEGINIndicator, GEGINRanking, GEGINSDGAlignment, GEGINUNESCOIndicator, GEGINBenchmark, GEGINDataExport, GEGIN8_TABLE_NAMES } from '../repositories/gegin-8-analytics.repository';
import { logger } from '@educi/logger';

export class GEGINDashboardService extends GEGINBaseService<GEGINDashboard> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN8_TABLE_NAMES.GEGINDashboard, moduleName: 'Dashboard' });
  }
}

export class GEGINIndicatorService extends GEGINBaseService<GEGINIndicator> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN8_TABLE_NAMES.GEGINIndicator, moduleName: 'Indicator' });
  }
}

export class GEGINRankingService extends GEGINBaseService<GEGINRanking> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN8_TABLE_NAMES.GEGINRanking, moduleName: 'Ranking' });
  }
}

export class GEGINSDGAlignmentService extends GEGINBaseService<GEGINSDGAlignment> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN8_TABLE_NAMES.GEGINSDGAlignment, moduleName: 'SDGAlignment' });
  }
}

export class GEGINUNESCOIndicatorService extends GEGINBaseService<GEGINUNESCOIndicator> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN8_TABLE_NAMES.GEGINUNESCOIndicator, moduleName: 'UNESCOIndicator' });
  }
}

export class GEGINBenchmarkService extends GEGINBaseService<GEGINBenchmark> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN8_TABLE_NAMES.GEGINBenchmark, moduleName: 'Benchmark' });
  }
}

export class GEGINDataExportService extends GEGINBaseService<GEGINDataExport> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN8_TABLE_NAMES.GEGINDataExport, moduleName: 'DataExport' });
  }
}

export class GEGIN8AnalyticsService {
  readonly dashboards: GEGINDashboardService;
  readonly indicators: GEGINIndicatorService;
  readonly rankings: GEGINRankingService;
  readonly sdgAlignments: GEGINSDGAlignmentService;
  readonly unescoIndicators: GEGINUNESCOIndicatorService;
  readonly benchmarks: GEGINBenchmarkService;
  readonly dataExports: GEGINDataExportService;

  constructor(supabase: SupabaseClient) {
    this.dashboards = new GEGINDashboardService(supabase);
    this.indicators = new GEGINIndicatorService(supabase);
    this.rankings = new GEGINRankingService(supabase);
    this.sdgAlignments = new GEGINSDGAlignmentService(supabase);
    this.unescoIndicators = new GEGINUNESCOIndicatorService(supabase);
    this.benchmarks = new GEGINBenchmarkService(supabase);
    this.dataExports = new GEGINDataExportService(supabase);
  }
}

export function createGEGIN8AnalyticsService(supabase: SupabaseClient): GEGIN8AnalyticsService {
  return new GEGIN8AnalyticsService(supabase);
}
