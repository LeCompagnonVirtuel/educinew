import { SupabaseClient } from '@supabase/supabase-js';
import {
  InspectionMission, InspectionMissionCreate, InspectionMissionUpdate,
  InspectionReport, InspectionReportCreate, InspectionReportUpdate,
  InspectionRecommendation, InspectionRecommendationCreate, InspectionRecommendationUpdate,
  SchoolCompliance, SchoolComplianceCreate, SchoolComplianceUpdate,
  CorrectiveAction, CorrectiveActionCreate, CorrectiveActionUpdate,
  InspectionCalendar, InspectionCalendarCreate, InspectionCalendarUpdate,
  SchoolRating, SchoolRatingCreate, SchoolRatingUpdate,
  InspectionChecklist, InspectionChecklistCreate, InspectionChecklistUpdate,
  InspectorPerformance, InspectorPerformanceCreate, InspectorPerformanceUpdate,
  ComplianceTrend, ComplianceTrendCreate, ComplianceTrendUpdate,
} from '@educi/types';
import {
  GovInspectionMissionNotFoundError,
  GovInspectionReportNotFoundError,
  GovInspectionRecommendationNotFoundError,
  GovSchoolComplianceNotFoundError,
  GovCorrectiveActionNotFoundError,
  GovInspectionCalendarNotFoundError,
  GovSchoolRatingNotFoundError,
  GovInspectionChecklistNotFoundError,
  GovInspectorPerformanceNotFoundError,
  GovComplianceTrendNotFoundError,
} from '@educi/errors';

// ============================================================================
// GOV Module 9: Observatory & Inspections
// ============================================================================

export interface GOV9Repository {
  inspectionMission: InspectionMissionRepo;
  inspectionReport: InspectionReportRepo;
  inspectionRecommendation: InspectionRecommendationRepo;
  schoolCompliance: SchoolComplianceRepo;
  correctiveAction: CorrectiveActionRepo;
  inspectionCalendar: InspectionCalendarRepo;
  schoolRating: SchoolRatingRepo;
  inspectionChecklist: InspectionChecklistRepo;
  inspectorPerformance: InspectorPerformanceRepo;
  complianceTrend: ComplianceTrendRepo;
}

export interface InspectionMissionRepo {
  findById(schoolId: string, id: string): Promise<InspectionMission>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionMission[]>;
  create(schoolId: string, data: Partial<InspectionMissionCreate>): Promise<InspectionMission>;
  update(schoolId: string, id: string, data: Partial<InspectionMissionCreate>): Promise<InspectionMission>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByInspector(schoolId: string, inspectorId: string): Promise<InspectionMission[]>;
  findByStatus(schoolId: string, status: string): Promise<InspectionMission[]>;
  complete(schoolId: string, id: string): Promise<void>;
}

export interface InspectionReportRepo {
  findById(schoolId: string, id: string): Promise<InspectionReport>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionReport[]>;
  create(schoolId: string, data: Partial<InspectionReportCreate>): Promise<InspectionReport>;
  update(schoolId: string, id: string, data: Partial<InspectionReportCreate>): Promise<InspectionReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByMission(schoolId: string, missionId: string): Promise<InspectionReport[]>;
  findBySchool(schoolId: string, schoolId_: string): Promise<InspectionReport[]>;
  findByStatus(schoolId: string, status: string): Promise<InspectionReport[]>;
  submit(schoolId: string, id: string): Promise<void>;
}

export interface InspectionRecommendationRepo {
  findById(schoolId: string, id: string): Promise<InspectionRecommendation>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionRecommendation[]>;
  create(schoolId: string, data: Partial<InspectionRecommendationCreate>): Promise<InspectionRecommendation>;
  update(schoolId: string, id: string, data: Partial<InspectionRecommendationCreate>): Promise<InspectionRecommendation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByReport(schoolId: string, reportId: string): Promise<InspectionRecommendation[]>;
  findByPriority(schoolId: string, priority: string): Promise<InspectionRecommendation[]>;
  findByStatus(schoolId: string, status: string): Promise<InspectionRecommendation[]>;
  implement(schoolId: string, id: string): Promise<void>;
}

export interface SchoolComplianceRepo {
  findById(schoolId: string, id: string): Promise<SchoolCompliance>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolCompliance[]>;
  create(schoolId: string, data: Partial<SchoolComplianceCreate>): Promise<SchoolCompliance>;
  update(schoolId: string, id: string, data: Partial<SchoolComplianceCreate>): Promise<SchoolCompliance>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findBySchool(schoolId: string, schoolId_: string): Promise<SchoolCompliance[]>;
  findByStatus(schoolId: string, status: string): Promise<SchoolCompliance[]>;
  findByStandard(schoolId: string, standardId: string): Promise<SchoolCompliance[]>;
}

export interface CorrectiveActionRepo {
  findById(schoolId: string, id: string): Promise<CorrectiveAction>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<CorrectiveAction[]>;
  create(schoolId: string, data: Partial<CorrectiveActionCreate>): Promise<CorrectiveAction>;
  update(schoolId: string, id: string, data: Partial<CorrectiveActionCreate>): Promise<CorrectiveAction>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCompliance(schoolId: string, complianceId: string): Promise<CorrectiveAction[]>;
  findByStatus(schoolId: string, status: string): Promise<CorrectiveAction[]>;
  complete(schoolId: string, id: string): Promise<void>;
}

export interface InspectionCalendarRepo {
  findById(schoolId: string, id: string): Promise<InspectionCalendar>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionCalendar[]>;
  create(schoolId: string, data: Partial<InspectionCalendarCreate>): Promise<InspectionCalendar>;
  update(schoolId: string, id: string, data: Partial<InspectionCalendarCreate>): Promise<InspectionCalendar>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<InspectionCalendar[]>;
  findByInspector(schoolId: string, inspectorId: string): Promise<InspectionCalendar[]>;
}

export interface SchoolRatingRepo {
  findById(schoolId: string, id: string): Promise<SchoolRating>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolRating[]>;
  create(schoolId: string, data: Partial<SchoolRatingCreate>): Promise<SchoolRating>;
  update(schoolId: string, id: string, data: Partial<SchoolRatingCreate>): Promise<SchoolRating>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findBySchool(schoolId: string, schoolId_: string): Promise<SchoolRating[]>;
  findByRegion(schoolId: string, regionId: string): Promise<SchoolRating[]>;
  findLatest(schoolId: string, schoolId_: string): Promise<SchoolRating | null>;
}

export interface InspectionChecklistRepo {
  findById(schoolId: string, id: string): Promise<InspectionChecklist>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionChecklist[]>;
  create(schoolId: string, data: Partial<InspectionChecklistCreate>): Promise<InspectionChecklist>;
  update(schoolId: string, id: string, data: Partial<InspectionChecklistCreate>): Promise<InspectionChecklist>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByMission(schoolId: string, missionId: string): Promise<InspectionChecklist[]>;
  findByCategory(schoolId: string, category: string): Promise<InspectionChecklist[]>;
  findActive(schoolId: string): Promise<InspectionChecklist[]>;
}

export interface InspectorPerformanceRepo {
  findById(schoolId: string, id: string): Promise<InspectorPerformance>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InspectorPerformance[]>;
  create(schoolId: string, data: Partial<InspectorPerformanceCreate>): Promise<InspectorPerformance>;
  update(schoolId: string, id: string, data: Partial<InspectorPerformanceCreate>): Promise<InspectorPerformance>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByInspector(schoolId: string, inspectorId: string): Promise<InspectorPerformance[]>;
  findLatest(schoolId: string, inspectorId: string): Promise<InspectorPerformance | null>;
}

export interface ComplianceTrendRepo {
  findById(schoolId: string, id: string): Promise<ComplianceTrend>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceTrend[]>;
  create(schoolId: string, data: Partial<ComplianceTrendCreate>): Promise<ComplianceTrend>;
  update(schoolId: string, id: string, data: Partial<ComplianceTrendCreate>): Promise<ComplianceTrend>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findBySchool(schoolId: string, schoolId_: string): Promise<ComplianceTrend[]>;
  findByRegion(schoolId: string, regionId: string): Promise<ComplianceTrend[]>;
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

export function createGOV9Repository(supabase: SupabaseClient): GOV9Repository {
  return {
    inspectionMission: makeRepo(supabase, 'gov_inspection_missions', GovInspectionMissionNotFoundError, {
      async findByInspector(schoolId: string, inspectorId: string) {
        const { data, error } = await supabase.from('gov_inspection_missions').select('*').eq('school_id', schoolId).eq('inspector_id', inspectorId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_inspection_missions').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async complete(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_inspection_missions').update({ status: 'completed' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovInspectionMissionNotFoundError(id);
      },
    }),
    inspectionReport: makeRepo(supabase, 'gov_inspection_reports', GovInspectionReportNotFoundError, {
      async findByMission(schoolId: string, missionId: string) {
        const { data, error } = await supabase.from('gov_inspection_reports').select('*').eq('school_id', schoolId).eq('mission_id', missionId);
        if (error) throw error;
        return data ?? [];
      },
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_inspection_reports').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_inspection_reports').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async submit(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_inspection_reports').update({ status: 'submitted' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovInspectionReportNotFoundError(id);
      },
    }),
    inspectionRecommendation: makeRepo(supabase, 'gov_inspection_recommendations', GovInspectionRecommendationNotFoundError, {
      async findByReport(schoolId: string, reportId: string) {
        const { data, error } = await supabase.from('gov_inspection_recommendations').select('*').eq('school_id', schoolId).eq('report_id', reportId);
        if (error) throw error;
        return data ?? [];
      },
      async findByPriority(schoolId: string, priority: string) {
        const { data, error } = await supabase.from('gov_inspection_recommendations').select('*').eq('school_id', schoolId).eq('priority', priority);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_inspection_recommendations').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async implement(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_inspection_recommendations').update({ status: 'implemented' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovInspectionRecommendationNotFoundError(id);
      },
    }),
    schoolCompliance: makeRepo(supabase, 'gov_school_compliances', GovSchoolComplianceNotFoundError, {
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_school_compliances').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_school_compliances').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async findByStandard(schoolId: string, standardId: string) {
        const { data, error } = await supabase.from('gov_school_compliances').select('*').eq('school_id', schoolId).eq('standard_id', standardId);
        if (error) throw error;
        return data ?? [];
      },
    }),
    correctiveAction: makeRepo(supabase, 'gov_corrective_actions', GovCorrectiveActionNotFoundError, {
      async findByCompliance(schoolId: string, complianceId: string) {
        const { data, error } = await supabase.from('gov_corrective_actions').select('*').eq('school_id', schoolId).eq('compliance_id', complianceId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_corrective_actions').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async complete(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_corrective_actions').update({ status: 'completed' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovCorrectiveActionNotFoundError(id);
      },
    }),
    inspectionCalendar: makeRepo(supabase, 'gov_inspection_calendars', GovInspectionCalendarNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_inspection_calendars').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByInspector(schoolId: string, inspectorId: string) {
        const { data, error } = await supabase.from('gov_inspection_calendars').select('*').eq('school_id', schoolId).eq('inspector_id', inspectorId);
        if (error) throw error;
        return data ?? [];
      },
    }),
    schoolRating: makeRepo(supabase, 'gov_school_ratings', GovSchoolRatingNotFoundError, {
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_school_ratings').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_school_ratings').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_school_ratings').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    inspectionChecklist: makeRepo(supabase, 'gov_inspection_checklists', GovInspectionChecklistNotFoundError, {
      async findByMission(schoolId: string, missionId: string) {
        const { data, error } = await supabase.from('gov_inspection_checklists').select('*').eq('school_id', schoolId).eq('mission_id', missionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCategory(schoolId: string, category: string) {
        const { data, error } = await supabase.from('gov_inspection_checklists').select('*').eq('school_id', schoolId).eq('category', category);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_inspection_checklists').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
    }),
    inspectorPerformance: makeRepo(supabase, 'gov_inspector_performances', GovInspectorPerformanceNotFoundError, {
      async findByInspector(schoolId: string, inspectorId: string) {
        const { data, error } = await supabase.from('gov_inspector_performances').select('*').eq('school_id', schoolId).eq('inspector_id', inspectorId);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string, inspectorId: string) {
        const { data, error } = await supabase.from('gov_inspector_performances').select('*').eq('school_id', schoolId).eq('inspector_id', inspectorId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    complianceTrend: makeRepo(supabase, 'gov_compliance_trends', GovComplianceTrendNotFoundError, {
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_compliance_trends').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_compliance_trends').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
    }),
  };
}
