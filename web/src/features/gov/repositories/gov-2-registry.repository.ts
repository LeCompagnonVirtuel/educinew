import { SupabaseClient } from '@supabase/supabase-js';
import {
  EducationRegion, EducationRegionCreate, EducationRegionUpdate,
  EducationDistrict, EducationDistrictCreate, EducationDistrictUpdate,
  Academy, AcademyCreate, AcademyUpdate,
  RegionalDirectorate, RegionalDirectorateCreate, RegionalDirectorateUpdate,
  Inspector, InspectorCreate, InspectorUpdate,
  InspectionVisit, InspectionVisitCreate, InspectionVisitUpdate,
  RegionalReport, RegionalReportCreate, RegionalReportUpdate,
  RegionalKpi, RegionalKpiCreate, RegionalKpiUpdate,
  DistrictReport, DistrictReportCreate, DistrictReportUpdate,
  RegionUser, RegionUserCreate, RegionUserUpdate,
} from '@educi/types';
import {
  GovEducationRegionNotFoundError,
  GovEducationDistrictNotFoundError,
  GovAcademyNotFoundError,
  GovRegionalDirectorateNotFoundError,
  GovInspectorNotFoundError,
  GovInspectionVisitNotFoundError,
  GovRegionalReportNotFoundError,
  GovRegionalKpiNotFoundError,
  GovDistrictReportNotFoundError,
  GovRegionUserNotFoundError,
} from '@educi/errors';

// ============================================================================
// GOV Module 2: Registry & Regional Education Governance
// ============================================================================

export interface GOV2Repository {
  educationRegion: EducationRegionRepo;
  educationDistrict: EducationDistrictRepo;
  academy: AcademyRepo;
  regionalDirectorate: RegionalDirectorateRepo;
  inspector: InspectorRepo;
  inspectionVisit: InspectionVisitRepo;
  regionalReport: RegionalReportRepo;
  regionalKpi: RegionalKpiRepo;
  districtReport: DistrictReportRepo;
  regionUser: RegionUserRepo;
}

export interface EducationRegionRepo {
  findById(schoolId: string, id: string): Promise<EducationRegion>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<EducationRegion[]>;
  create(schoolId: string, data: Partial<EducationRegionCreate>): Promise<EducationRegion>;
  update(schoolId: string, id: string, data: Partial<EducationRegionCreate>): Promise<EducationRegion>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findActive(schoolId: string): Promise<EducationRegion[]>;
  findByCode(schoolId: string, code: string): Promise<EducationRegion>;
  findByCountry(schoolId: string, country: string): Promise<EducationRegion[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<EducationRegion>;
}

export interface EducationDistrictRepo {
  findById(schoolId: string, id: string): Promise<EducationDistrict>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<EducationDistrict[]>;
  create(schoolId: string, data: Partial<EducationDistrictCreate>): Promise<EducationDistrict>;
  update(schoolId: string, id: string, data: Partial<EducationDistrictCreate>): Promise<EducationDistrict>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<EducationDistrict[]>;
  findActive(schoolId: string): Promise<EducationDistrict[]>;
  findByCode(schoolId: string, code: string): Promise<EducationDistrict>;
  updateStatus(schoolId: string, id: string, status: string): Promise<EducationDistrict>;
}

export interface AcademyRepo {
  findById(schoolId: string, id: string): Promise<Academy>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Academy[]>;
  create(schoolId: string, data: Partial<AcademyCreate>): Promise<Academy>;
  update(schoolId: string, id: string, data: Partial<AcademyCreate>): Promise<Academy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByDistrict(schoolId: string, districtId: string): Promise<Academy[]>;
  findActive(schoolId: string): Promise<Academy[]>;
  findByType(schoolId: string, type: string): Promise<Academy[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<Academy>;
}

export interface RegionalDirectorateRepo {
  findById(schoolId: string, id: string): Promise<RegionalDirectorate>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalDirectorate[]>;
  create(schoolId: string, data: Partial<RegionalDirectorateCreate>): Promise<RegionalDirectorate>;
  update(schoolId: string, id: string, data: Partial<RegionalDirectorateCreate>): Promise<RegionalDirectorate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<RegionalDirectorate[]>;
  findActive(schoolId: string): Promise<RegionalDirectorate[]>;
  findByCountry(schoolId: string, country: string): Promise<RegionalDirectorate[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<RegionalDirectorate>;
}

export interface InspectorRepo {
  findById(schoolId: string, id: string): Promise<Inspector>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Inspector[]>;
  create(schoolId: string, data: Partial<InspectorCreate>): Promise<Inspector>;
  update(schoolId: string, id: string, data: Partial<InspectorCreate>): Promise<Inspector>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<Inspector[]>;
  findActive(schoolId: string): Promise<Inspector[]>;
  findBySpecialization(schoolId: string, specialization: string): Promise<Inspector[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<Inspector>;
}

export interface InspectionVisitRepo {
  findById(schoolId: string, id: string): Promise<InspectionVisit>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionVisit[]>;
  create(schoolId: string, data: Partial<InspectionVisitCreate>): Promise<InspectionVisit>;
  update(schoolId: string, id: string, data: Partial<InspectionVisitCreate>): Promise<InspectionVisit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findBySchool(schoolId: string, targetSchoolId: string): Promise<InspectionVisit[]>;
  findActive(schoolId: string): Promise<InspectionVisit[]>;
  findByInspector(schoolId: string, inspectorId: string): Promise<InspectionVisit[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<InspectionVisit>;
}

export interface RegionalReportRepo {
  findById(schoolId: string, id: string): Promise<RegionalReport>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalReport[]>;
  create(schoolId: string, data: Partial<RegionalReportCreate>): Promise<RegionalReport>;
  update(schoolId: string, id: string, data: Partial<RegionalReportCreate>): Promise<RegionalReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<RegionalReport[]>;
  findByType(schoolId: string, type: string): Promise<RegionalReport[]>;
  findActive(schoolId: string): Promise<RegionalReport[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<RegionalReport>;
}

export interface RegionalKpiRepo {
  findById(schoolId: string, id: string): Promise<RegionalKpi>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalKpi[]>;
  create(schoolId: string, data: Partial<RegionalKpiCreate>): Promise<RegionalKpi>;
  update(schoolId: string, id: string, data: Partial<RegionalKpiCreate>): Promise<RegionalKpi>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<RegionalKpi[]>;
  findActive(schoolId: string): Promise<RegionalKpi[]>;
  findByCategory(schoolId: string, category: string): Promise<RegionalKpi[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<RegionalKpi>;
}

export interface DistrictReportRepo {
  findById(schoolId: string, id: string): Promise<DistrictReport>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<DistrictReport[]>;
  create(schoolId: string, data: Partial<DistrictReportCreate>): Promise<DistrictReport>;
  update(schoolId: string, id: string, data: Partial<DistrictReportCreate>): Promise<DistrictReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByDistrict(schoolId: string, districtId: string): Promise<DistrictReport[]>;
  findByType(schoolId: string, type: string): Promise<DistrictReport[]>;
  findActive(schoolId: string): Promise<DistrictReport[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<DistrictReport>;
}

export interface RegionUserRepo {
  findById(schoolId: string, id: string): Promise<RegionUser>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<RegionUser[]>;
  create(schoolId: string, data: Partial<RegionUserCreate>): Promise<RegionUser>;
  update(schoolId: string, id: string, data: Partial<RegionUserCreate>): Promise<RegionUser>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<RegionUser[]>;
  findActive(schoolId: string): Promise<RegionUser[]>;
  findByRole(schoolId: string, role: string): Promise<RegionUser[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<RegionUser>;
}

// ============================================================================
// Helpers
// ============================================================================

function makeRepo<T extends { id: string; school_id: string }>(
  supabase: SupabaseClient,
  table: string,
  NotFoundError: new (id: string) => Error,
  extraMethods: Record<string, (q: any, schoolId: string, ...args: unknown[]) => any> = {},
) {
  const base = {
    async findById(schoolId: string, id: string): Promise<T> {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new NotFoundError(id);
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
      if (error) throw new NotFoundError(id);
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
    async findActive(schoolId: string): Promise<T[]> {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return (data ?? []) as T[];
    },
    async updateStatus(schoolId: string, id: string, status: string): Promise<T> {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new NotFoundError(id);
      return data;
    },
  };
  return Object.assign(base, extraMethods) as any;
}

// ============================================================================
// Factory
// ============================================================================

export function createGOV2Repository(supabase: SupabaseClient): GOV2Repository {
  return {
    educationRegion: makeRepo(supabase, 'gov_education_regions', GovEducationRegionNotFoundError, {
      async findByCode(schoolId: string, code: string) {
        const { data, error } = await supabase.from('gov_education_regions').select('*').eq('code', code).eq('school_id', schoolId).single();
        if (error) throw new GovEducationRegionNotFoundError(code);
        return data;
      },
      async findByCountry(schoolId: string, country: string) {
        const { data, error } = await supabase.from('gov_education_regions').select('*').eq('school_id', schoolId).eq('country', country);
        if (error) throw error;
        return data ?? [];
      },
    }),
    educationDistrict: makeRepo(supabase, 'gov_education_districts', GovEducationDistrictNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_education_districts').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCode(schoolId: string, code: string) {
        const { data, error } = await supabase.from('gov_education_districts').select('*').eq('code', code).eq('school_id', schoolId).single();
        if (error) throw new GovEducationDistrictNotFoundError(code);
        return data;
      },
    }),
    academy: makeRepo(supabase, 'gov_academies', GovAcademyNotFoundError, {
      async findByDistrict(schoolId: string, districtId: string) {
        const { data, error } = await supabase.from('gov_academies').select('*').eq('school_id', schoolId).eq('district_id', districtId);
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_academies').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
    }),
    regionalDirectorate: makeRepo(supabase, 'gov_regional_directorates', GovRegionalDirectorateNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_regional_directorates').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCountry(schoolId: string, country: string) {
        const { data, error } = await supabase.from('gov_regional_directorates').select('*').eq('school_id', schoolId).eq('country', country);
        if (error) throw error;
        return data ?? [];
      },
    }),
    inspector: makeRepo(supabase, 'gov_inspectors', GovInspectorNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_inspectors').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findBySpecialization(schoolId: string, specialization: string) {
        const { data, error } = await supabase.from('gov_inspectors').select('*').eq('school_id', schoolId).eq('specialization', specialization);
        if (error) throw error;
        return data ?? [];
      },
    }),
    inspectionVisit: makeRepo(supabase, 'gov_inspection_visits', GovInspectionVisitNotFoundError, {
      async findBySchool(schoolId: string, targetSchoolId: string) {
        const { data, error } = await supabase.from('gov_inspection_visits').select('*').eq('school_id', schoolId).eq('target_school_id', targetSchoolId);
        if (error) throw error;
        return data ?? [];
      },
      async findByInspector(schoolId: string, inspectorId: string) {
        const { data, error } = await supabase.from('gov_inspection_visits').select('*').eq('school_id', schoolId).eq('inspector_id', inspectorId);
        if (error) throw error;
        return data ?? [];
      },
    }),
    regionalReport: makeRepo(supabase, 'gov_regional_reports', GovRegionalReportNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_regional_reports').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_regional_reports').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
    }),
    regionalKpi: makeRepo(supabase, 'gov_regional_kpis', GovRegionalKpiNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_regional_kpis').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCategory(schoolId: string, category: string) {
        const { data, error } = await supabase.from('gov_regional_kpis').select('*').eq('school_id', schoolId).eq('category', category);
        if (error) throw error;
        return data ?? [];
      },
    }),
    districtReport: makeRepo(supabase, 'gov_district_reports', GovDistrictReportNotFoundError, {
      async findByDistrict(schoolId: string, districtId: string) {
        const { data, error } = await supabase.from('gov_district_reports').select('*').eq('school_id', schoolId).eq('district_id', districtId);
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_district_reports').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
    }),
    regionUser: makeRepo(supabase, 'gov_region_users', GovRegionUserNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_region_users').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByRole(schoolId: string, role: string) {
        const { data, error } = await supabase.from('gov_region_users').select('*').eq('school_id', schoolId).eq('role', role);
        if (error) throw error;
        return data ?? [];
      },
    }),
  };
}
