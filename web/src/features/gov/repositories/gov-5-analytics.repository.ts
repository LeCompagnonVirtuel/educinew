import { SupabaseClient } from '@supabase/supabase-js';
import {
  EducationKpi, EducationKpiCreate, EducationKpiUpdate,
  RegionalAnalyticsKpi, RegionalAnalyticsKpiCreate, RegionalAnalyticsKpiUpdate,
  NationalDashboard, NationalDashboardCreate, NationalDashboardUpdate,
  DashboardWidget, DashboardWidgetCreate, DashboardWidgetUpdate,
  PredictiveAnalytic, PredictiveAnalyticCreate, PredictiveAnalyticUpdate,
  DropoutMap, DropoutMapCreate, DropoutMapUpdate,
  InfrastructureMap, InfrastructureMapCreate, InfrastructureMapUpdate,
  TeacherDistribution, TeacherDistributionCreate, TeacherDistributionUpdate,
  StudentDistribution, StudentDistributionCreate, StudentDistributionUpdate,
  BudgetAnalytic, BudgetAnalyticCreate, BudgetAnalyticUpdate,
  EducationForecast, EducationForecastCreate, EducationForecastUpdate,
  DataCollection, DataCollectionCreate, DataCollectionUpdate,
} from '@educi/types';
import {
  GovEducationKpiNotFoundError,
  GovRegionalAnalyticsKpiNotFoundError,
  GovNationalDashboardNotFoundError,
  GovDashboardWidgetNotFoundError,
  GovPredictiveAnalyticNotFoundError,
  GovDropoutMapNotFoundError,
  GovInfrastructureMapNotFoundError,
  GovTeacherDistributionNotFoundError,
  GovStudentDistributionNotFoundError,
  GovBudgetAnalyticNotFoundError,
  GovEducationForecastNotFoundError,
  GovDataCollectionNotFoundError,
} from '@educi/errors';

// ============================================================================
// GOV Module 5: Analytics & Dashboards
// ============================================================================

export interface GOV5Repository {
  educationKpi: EducationKpiRepo;
  regionalAnalyticsKpi: RegionalAnalyticsKpiRepo;
  nationalDashboard: NationalDashboardRepo;
  dashboardWidget: DashboardWidgetRepo;
  predictiveAnalytic: PredictiveAnalyticRepo;
  dropoutMap: DropoutMapRepo;
  infrastructureMap: InfrastructureMapRepo;
  teacherDistribution: TeacherDistributionRepo;
  studentDistribution: StudentDistributionRepo;
  budgetAnalytic: BudgetAnalyticRepo;
  educationForecast: EducationForecastRepo;
  dataCollection: DataCollectionRepo;
}

export interface EducationKpiRepo {
  findById(schoolId: string, id: string): Promise<EducationKpi>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<EducationKpi[]>;
  create(schoolId: string, data: Partial<EducationKpiCreate>): Promise<EducationKpi>;
  update(schoolId: string, id: string, data: Partial<EducationKpiCreate>): Promise<EducationKpi>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCategory(schoolId: string, category: string): Promise<EducationKpi[]>;
  findByYear(schoolId: string, year: number): Promise<EducationKpi[]>;
  findLatest(schoolId: string): Promise<EducationKpi | null>;
}

export interface RegionalAnalyticsKpiRepo {
  findById(schoolId: string, id: string): Promise<RegionalAnalyticsKpi>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalAnalyticsKpi[]>;
  create(schoolId: string, data: Partial<RegionalAnalyticsKpiCreate>): Promise<RegionalAnalyticsKpi>;
  update(schoolId: string, id: string, data: Partial<RegionalAnalyticsKpiCreate>): Promise<RegionalAnalyticsKpi>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<RegionalAnalyticsKpi[]>;
  findByYear(schoolId: string, year: number): Promise<RegionalAnalyticsKpi[]>;
  findLatest(schoolId: string, regionId: string): Promise<RegionalAnalyticsKpi | null>;
}

export interface NationalDashboardRepo {
  findById(schoolId: string, id: string): Promise<NationalDashboard>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NationalDashboard[]>;
  create(schoolId: string, data: Partial<NationalDashboardCreate>): Promise<NationalDashboard>;
  update(schoolId: string, id: string, data: Partial<NationalDashboardCreate>): Promise<NationalDashboard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findActive(schoolId: string): Promise<NationalDashboard[]>;
  findByType(schoolId: string, type: string): Promise<NationalDashboard[]>;
  findByOwner(schoolId: string, ownerId: string): Promise<NationalDashboard[]>;
}

export interface DashboardWidgetRepo {
  findById(schoolId: string, id: string): Promise<DashboardWidget>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<DashboardWidget[]>;
  create(schoolId: string, data: Partial<DashboardWidgetCreate>): Promise<DashboardWidget>;
  update(schoolId: string, id: string, data: Partial<DashboardWidgetCreate>): Promise<DashboardWidget>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByDashboard(schoolId: string, dashboardId: string): Promise<DashboardWidget[]>;
  findByType(schoolId: string, type: string): Promise<DashboardWidget[]>;
}

export interface PredictiveAnalyticRepo {
  findById(schoolId: string, id: string): Promise<PredictiveAnalytic>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<PredictiveAnalytic[]>;
  create(schoolId: string, data: Partial<PredictiveAnalyticCreate>): Promise<PredictiveAnalytic>;
  update(schoolId: string, id: string, data: Partial<PredictiveAnalyticCreate>): Promise<PredictiveAnalytic>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByModelType(schoolId: string, modelType: string): Promise<PredictiveAnalytic[]>;
  findByStatus(schoolId: string, status: string): Promise<PredictiveAnalytic[]>;
  findLatest(schoolId: string, modelType: string): Promise<PredictiveAnalytic | null>;
}

export interface DropoutMapRepo {
  findById(schoolId: string, id: string): Promise<DropoutMap>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<DropoutMap[]>;
  create(schoolId: string, data: Partial<DropoutMapCreate>): Promise<DropoutMap>;
  update(schoolId: string, id: string, data: Partial<DropoutMapCreate>): Promise<DropoutMap>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<DropoutMap[]>;
  findByYear(schoolId: string, year: number): Promise<DropoutMap[]>;
  findLatest(schoolId: string): Promise<DropoutMap | null>;
}

export interface InfrastructureMapRepo {
  findById(schoolId: string, id: string): Promise<InfrastructureMap>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InfrastructureMap[]>;
  create(schoolId: string, data: Partial<InfrastructureMapCreate>): Promise<InfrastructureMap>;
  update(schoolId: string, id: string, data: Partial<InfrastructureMapCreate>): Promise<InfrastructureMap>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<InfrastructureMap[]>;
  findByType(schoolId: string, type: string): Promise<InfrastructureMap[]>;
  findLatest(schoolId: string): Promise<InfrastructureMap | null>;
}

export interface TeacherDistributionRepo {
  findById(schoolId: string, id: string): Promise<TeacherDistribution>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherDistribution[]>;
  create(schoolId: string, data: Partial<TeacherDistributionCreate>): Promise<TeacherDistribution>;
  update(schoolId: string, id: string, data: Partial<TeacherDistributionCreate>): Promise<TeacherDistribution>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<TeacherDistribution[]>;
  findByYear(schoolId: string, year: number): Promise<TeacherDistribution[]>;
  findLatest(schoolId: string): Promise<TeacherDistribution | null>;
}

export interface StudentDistributionRepo {
  findById(schoolId: string, id: string): Promise<StudentDistribution>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<StudentDistribution[]>;
  create(schoolId: string, data: Partial<StudentDistributionCreate>): Promise<StudentDistribution>;
  update(schoolId: string, id: string, data: Partial<StudentDistributionCreate>): Promise<StudentDistribution>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<StudentDistribution[]>;
  findByYear(schoolId: string, year: number): Promise<StudentDistribution[]>;
  findLatest(schoolId: string): Promise<StudentDistribution | null>;
}

export interface BudgetAnalyticRepo {
  findById(schoolId: string, id: string): Promise<BudgetAnalytic>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<BudgetAnalytic[]>;
  create(schoolId: string, data: Partial<BudgetAnalyticCreate>): Promise<BudgetAnalytic>;
  update(schoolId: string, id: string, data: Partial<BudgetAnalyticCreate>): Promise<BudgetAnalytic>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<BudgetAnalytic[]>;
  findByYear(schoolId: string, year: number): Promise<BudgetAnalytic[]>;
  findLatest(schoolId: string): Promise<BudgetAnalytic | null>;
}

export interface EducationForecastRepo {
  findById(schoolId: string, id: string): Promise<EducationForecast>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<EducationForecast[]>;
  create(schoolId: string, data: Partial<EducationForecastCreate>): Promise<EducationForecast>;
  update(schoolId: string, id: string, data: Partial<EducationForecastCreate>): Promise<EducationForecast>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByModelType(schoolId: string, modelType: string): Promise<EducationForecast[]>;
  findByTargetYear(schoolId: string, targetYear: number): Promise<EducationForecast[]>;
  findLatest(schoolId: string, modelType: string): Promise<EducationForecast | null>;
}

export interface DataCollectionRepo {
  findById(schoolId: string, id: string): Promise<DataCollection>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<DataCollection[]>;
  create(schoolId: string, data: Partial<DataCollectionCreate>): Promise<DataCollection>;
  update(schoolId: string, id: string, data: Partial<DataCollectionCreate>): Promise<DataCollection>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByStatus(schoolId: string, status: string): Promise<DataCollection[]>;
  findByType(schoolId: string, type: string): Promise<DataCollection[]>;
  complete(schoolId: string, id: string): Promise<void>;
}

// ============================================================================
// Factory
// ============================================================================

function makeRepo<T>(supabase: SupabaseClient, table: string, Err: new (id: string) => Error, extra: Record<string, any> = {}) {
  const base = {
    async findById(schoolId: string, id: string): Promise<T> {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new Err(id);
      return data;
    },
    async findAll(schoolId: string, filters?: Record<string, unknown>): Promise<T[]> {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
    async create(schoolId: string, data: Partial<any>): Promise<T> {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId: string, id: string, data: Partial<any>): Promise<T> {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new Err(id);
      return d;
    },
    async delete(schoolId: string, id: string): Promise<void> {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId: string): Promise<number> {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
  };
  return Object.assign(base, extra) as any;
}

export function createGOV5Repository(supabase: SupabaseClient): GOV5Repository {
  return {
    educationKpi: makeRepo(supabase, 'gov_education_kpis', GovEducationKpiNotFoundError, {
      async findByCategory(schoolId: string, category: string) {
        const { data, error } = await supabase.from('gov_education_kpis').select('*').eq('school_id', schoolId).eq('category', category);
        if (error) throw error;
        return data ?? [];
      },
      async findByYear(schoolId: string, year: number) {
        const { data, error } = await supabase.from('gov_education_kpis').select('*').eq('school_id', schoolId).eq('year', year);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string) {
        const { data, error } = await supabase.from('gov_education_kpis').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    regionalAnalyticsKpi: makeRepo(supabase, 'gov_regional_analytics_kpis', GovRegionalAnalyticsKpiNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_regional_analytics_kpis').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByYear(schoolId: string, year: number) {
        const { data, error } = await supabase.from('gov_regional_analytics_kpis').select('*').eq('school_id', schoolId).eq('year', year);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_regional_analytics_kpis').select('*').eq('school_id', schoolId).eq('region_id', regionId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    nationalDashboard: makeRepo(supabase, 'gov_national_dashboards', GovNationalDashboardNotFoundError, {
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_national_dashboards').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_national_dashboards').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
      async findByOwner(schoolId: string, ownerId: string) {
        const { data, error } = await supabase.from('gov_national_dashboards').select('*').eq('school_id', schoolId).eq('owner_id', ownerId);
        if (error) throw error;
        return data ?? [];
      },
    }),
    dashboardWidget: makeRepo(supabase, 'gov_dashboard_widgets', GovDashboardWidgetNotFoundError, {
      async findByDashboard(schoolId: string, dashboardId: string) {
        const { data, error } = await supabase.from('gov_dashboard_widgets').select('*').eq('school_id', schoolId).eq('dashboard_id', dashboardId);
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_dashboard_widgets').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
    }),
    predictiveAnalytic: makeRepo(supabase, 'gov_predictive_analytics', GovPredictiveAnalyticNotFoundError, {
      async findByModelType(schoolId: string, modelType: string) {
        const { data, error } = await supabase.from('gov_predictive_analytics').select('*').eq('school_id', schoolId).eq('model_type', modelType);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_predictive_analytics').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string, modelType: string) {
        const { data, error } = await supabase.from('gov_predictive_analytics').select('*').eq('school_id', schoolId).eq('model_type', modelType).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    dropoutMap: makeRepo(supabase, 'gov_dropout_maps', GovDropoutMapNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_dropout_maps').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByYear(schoolId: string, year: number) {
        const { data, error } = await supabase.from('gov_dropout_maps').select('*').eq('school_id', schoolId).eq('year', year);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string) {
        const { data, error } = await supabase.from('gov_dropout_maps').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    infrastructureMap: makeRepo(supabase, 'gov_infrastructure_maps', GovInfrastructureMapNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_infrastructure_maps').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_infrastructure_maps').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string) {
        const { data, error } = await supabase.from('gov_infrastructure_maps').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    teacherDistribution: makeRepo(supabase, 'gov_teacher_distributions', GovTeacherDistributionNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_teacher_distributions').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByYear(schoolId: string, year: number) {
        const { data, error } = await supabase.from('gov_teacher_distributions').select('*').eq('school_id', schoolId).eq('year', year);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string) {
        const { data, error } = await supabase.from('gov_teacher_distributions').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    studentDistribution: makeRepo(supabase, 'gov_student_distributions', GovStudentDistributionNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_student_distributions').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByYear(schoolId: string, year: number) {
        const { data, error } = await supabase.from('gov_student_distributions').select('*').eq('school_id', schoolId).eq('year', year);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string) {
        const { data, error } = await supabase.from('gov_student_distributions').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    budgetAnalytic: makeRepo(supabase, 'gov_budget_analytics', GovBudgetAnalyticNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_budget_analytics').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByYear(schoolId: string, year: number) {
        const { data, error } = await supabase.from('gov_budget_analytics').select('*').eq('school_id', schoolId).eq('year', year);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string) {
        const { data, error } = await supabase.from('gov_budget_analytics').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    educationForecast: makeRepo(supabase, 'gov_education_forecasts', GovEducationForecastNotFoundError, {
      async findByModelType(schoolId: string, modelType: string) {
        const { data, error } = await supabase.from('gov_education_forecasts').select('*').eq('school_id', schoolId).eq('model_type', modelType);
        if (error) throw error;
        return data ?? [];
      },
      async findByTargetYear(schoolId: string, targetYear: number) {
        const { data, error } = await supabase.from('gov_education_forecasts').select('*').eq('school_id', schoolId).eq('target_year', targetYear);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string, modelType: string) {
        const { data, error } = await supabase.from('gov_education_forecasts').select('*').eq('school_id', schoolId).eq('model_type', modelType).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    dataCollection: makeRepo(supabase, 'gov_data_collections', GovDataCollectionNotFoundError, {
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_data_collections').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_data_collections').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
      async complete(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_data_collections').update({ status: 'completed' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovDataCollectionNotFoundError(id);
      },
    }),
  };
}
