import { SupabaseClient } from '@supabase/supabase-js';
import {
  Ministry, MinistryCreate, MinistryUpdate,
  MinistryDepartment, MinistryDepartmentCreate, MinistryDepartmentUpdate,
  Directorate, DirectorateCreate, DirectorateUpdate,
  EducationPolicy, EducationPolicyCreate, EducationPolicyUpdate,
  NationalProgram, NationalProgramCreate, NationalProgramUpdate,
  EducationStrategy, EducationStrategyCreate, EducationStrategyUpdate,
  Circular, CircularCreate, CircularUpdate,
  OfficialDocument, OfficialDocumentCreate, OfficialDocumentUpdate,
  EducationCalendar, EducationCalendarCreate, EducationCalendarUpdate,
  NationalStatistic, NationalStatisticCreate, NationalStatisticUpdate,
  MinistryUser, MinistryUserCreate, MinistryUserUpdate,
  MinistryNotification, MinistryNotificationCreate, MinistryNotificationUpdate,
} from '@educi/types';
import {
  GovMinistryNotFoundError,
  GovMinistryDepartmentNotFoundError,
  GovDirectorateNotFoundError,
  GovEducationPolicyNotFoundError,
  GovNationalProgramNotFoundError,
  GovEducationStrategyNotFoundError,
  GovCircularNotFoundError,
  GovOfficialDocumentNotFoundError,
  GovEducationCalendarNotFoundError,
  GovNationalStatisticNotFoundError,
  GovMinistryUserNotFoundError,
  GovMinistryNotificationNotFoundError,
} from '@educi/errors';

// ============================================================================
// GOV Module 1: Ministry & National Administration
// Entities: Ministry, MinistryDepartment, Directorate, EducationPolicy,
//   NationalProgram, EducationStrategy, Circular, OfficialDocument,
//   EducationCalendar, NationalStatistic, MinistryUser, MinistryNotification
// ============================================================================

export interface GOV1Repository {
  ministry: MinistryRepo;
  ministryDepartment: MinistryDepartmentRepo;
  directorate: DirectorateRepo;
  educationPolicy: EducationPolicyRepo;
  nationalProgram: NationalProgramRepo;
  educationStrategy: EducationStrategyRepo;
  circular: CircularRepo;
  officialDocument: OfficialDocumentRepo;
  educationCalendar: EducationCalendarRepo;
  nationalStatistic: NationalStatisticRepo;
  ministryUser: MinistryUserRepo;
  ministryNotification: MinistryNotificationRepo;
}

export interface MinistryRepo {
  findById(schoolId: string, id: string): Promise<Ministry>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Ministry[]>;
  create(schoolId: string, data: Partial<MinistryCreate>): Promise<Ministry>;
  update(schoolId: string, id: string, data: Partial<MinistryCreate>): Promise<Ministry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCode(schoolId: string, code: string): Promise<Ministry>;
  findActive(schoolId: string): Promise<Ministry[]>;
  findByCountry(schoolId: string, country: string): Promise<Ministry[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<Ministry>;
}

export interface MinistryDepartmentRepo {
  findById(schoolId: string, id: string): Promise<MinistryDepartment>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryDepartment[]>;
  create(schoolId: string, data: Partial<MinistryDepartmentCreate>): Promise<MinistryDepartment>;
  update(schoolId: string, id: string, data: Partial<MinistryDepartmentCreate>): Promise<MinistryDepartment>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByMinistryId(schoolId: string, ministryId: string): Promise<MinistryDepartment[]>;
  findActive(schoolId: string): Promise<MinistryDepartment[]>;
  findByCode(schoolId: string, code: string): Promise<MinistryDepartment>;
  updateStatus(schoolId: string, id: string, status: string): Promise<MinistryDepartment>;
}

export interface DirectorateRepo {
  findById(schoolId: string, id: string): Promise<Directorate>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Directorate[]>;
  create(schoolId: string, data: Partial<DirectorateCreate>): Promise<Directorate>;
  update(schoolId: string, id: string, data: Partial<DirectorateCreate>): Promise<Directorate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByMinistry(schoolId: string, ministryId: string): Promise<Directorate[]>;
  findByRegion(schoolId: string, regionId: string): Promise<Directorate[]>;
  findActive(schoolId: string): Promise<Directorate[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<Directorate>;
}

export interface EducationPolicyRepo {
  findById(schoolId: string, id: string): Promise<EducationPolicy>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<EducationPolicy[]>;
  create(schoolId: string, data: Partial<EducationPolicyCreate>): Promise<EducationPolicy>;
  update(schoolId: string, id: string, data: Partial<EducationPolicyCreate>): Promise<EducationPolicy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByStatus(schoolId: string, status: string): Promise<EducationPolicy[]>;
  findByMinistry(schoolId: string, ministryId: string): Promise<EducationPolicy[]>;
  findActive(schoolId: string): Promise<EducationPolicy[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<EducationPolicy[]>;
}

export interface NationalProgramRepo {
  findById(schoolId: string, id: string): Promise<NationalProgram>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NationalProgram[]>;
  create(schoolId: string, data: Partial<NationalProgramCreate>): Promise<NationalProgram>;
  update(schoolId: string, id: string, data: Partial<NationalProgramCreate>): Promise<NationalProgram>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByPolicyId(schoolId: string, policyId: string): Promise<NationalProgram[]>;
  findActive(schoolId: string): Promise<NationalProgram[]>;
  findByAcademicYear(schoolId: string, academicYear: string): Promise<NationalProgram[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<NationalProgram>;
}

export interface EducationStrategyRepo {
  findById(schoolId: string, id: string): Promise<EducationStrategy>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<EducationStrategy[]>;
  create(schoolId: string, data: Partial<EducationStrategyCreate>): Promise<EducationStrategy>;
  update(schoolId: string, id: string, data: Partial<EducationStrategyCreate>): Promise<EducationStrategy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByMinistry(schoolId: string, ministryId: string): Promise<EducationStrategy[]>;
  findActive(schoolId: string): Promise<EducationStrategy[]>;
  findByStatus(schoolId: string, status: string): Promise<EducationStrategy[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<EducationStrategy>;
}

export interface CircularRepo {
  findById(schoolId: string, id: string): Promise<Circular>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Circular[]>;
  create(schoolId: string, data: Partial<CircularCreate>): Promise<Circular>;
  update(schoolId: string, id: string, data: Partial<CircularCreate>): Promise<Circular>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByMinistry(schoolId: string, ministryId: string): Promise<Circular[]>;
  findActive(schoolId: string): Promise<Circular[]>;
  findByPriority(schoolId: string, priority: string): Promise<Circular[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<Circular>;
}

export interface OfficialDocumentRepo {
  findById(schoolId: string, id: string): Promise<OfficialDocument>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<OfficialDocument[]>;
  create(schoolId: string, data: Partial<OfficialDocumentCreate>): Promise<OfficialDocument>;
  update(schoolId: string, id: string, data: Partial<OfficialDocumentCreate>): Promise<OfficialDocument>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByType(schoolId: string, type: string): Promise<OfficialDocument[]>;
  findActive(schoolId: string): Promise<OfficialDocument[]>;
  findByMinistry(schoolId: string, ministryId: string): Promise<OfficialDocument[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<OfficialDocument>;
}

export interface EducationCalendarRepo {
  findById(schoolId: string, id: string): Promise<EducationCalendar>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<EducationCalendar[]>;
  create(schoolId: string, data: Partial<EducationCalendarCreate>): Promise<EducationCalendar>;
  update(schoolId: string, id: string, data: Partial<EducationCalendarCreate>): Promise<EducationCalendar>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByAcademicYear(schoolId: string, academicYear: string): Promise<EducationCalendar[]>;
  findActive(schoolId: string): Promise<EducationCalendar[]>;
  findByType(schoolId: string, type: string): Promise<EducationCalendar[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<EducationCalendar>;
}

export interface NationalStatisticRepo {
  findById(schoolId: string, id: string): Promise<NationalStatistic>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NationalStatistic[]>;
  create(schoolId: string, data: Partial<NationalStatisticCreate>): Promise<NationalStatistic>;
  update(schoolId: string, id: string, data: Partial<NationalStatisticCreate>): Promise<NationalStatistic>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCategory(schoolId: string, category: string): Promise<NationalStatistic[]>;
  findActive(schoolId: string): Promise<NationalStatistic[]>;
  findByYear(schoolId: string, year: number): Promise<NationalStatistic[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<NationalStatistic>;
}

export interface MinistryUserRepo {
  findById(schoolId: string, id: string): Promise<MinistryUser>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryUser[]>;
  create(schoolId: string, data: Partial<MinistryUserCreate>): Promise<MinistryUser>;
  update(schoolId: string, id: string, data: Partial<MinistryUserCreate>): Promise<MinistryUser>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByMinistry(schoolId: string, ministryId: string): Promise<MinistryUser[]>;
  findActive(schoolId: string): Promise<MinistryUser[]>;
  findByRole(schoolId: string, role: string): Promise<MinistryUser[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<MinistryUser>;
}

export interface MinistryNotificationRepo {
  findById(schoolId: string, id: string): Promise<MinistryNotification>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryNotification[]>;
  create(schoolId: string, data: Partial<MinistryNotificationCreate>): Promise<MinistryNotification>;
  update(schoolId: string, id: string, data: Partial<MinistryNotificationCreate>): Promise<MinistryNotification>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByMinistry(schoolId: string, ministryId: string): Promise<MinistryNotification[]>;
  findUnread(schoolId: string, userId: string): Promise<MinistryNotification[]>;
  markAsRead(schoolId: string, id: string): Promise<void>;
  findByPriority(schoolId: string, priority: string): Promise<MinistryNotification[]>;
}

// ============================================================================
// Implementation
// ============================================================================

function createMinistryRepo(supabase: SupabaseClient): MinistryRepo {
  const table = 'gov_ministries';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovMinistryNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovMinistryNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByCode(schoolId, code) {
      const { data, error } = await supabase.from(table).select('*').eq('code', code).eq('school_id', schoolId).single();
      if (error) throw new GovMinistryNotFoundError(code);
      return data;
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByCountry(schoolId, country) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('country', country);
      if (error) throw error;
      return data ?? [];
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovMinistryNotFoundError(id);
      return data;
    },
  };
}

function createMinistryDepartmentRepo(supabase: SupabaseClient): MinistryDepartmentRepo {
  const table = 'gov_ministry_departments';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovMinistryDepartmentNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovMinistryDepartmentNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByMinistryId(schoolId, ministryId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('ministry_id', ministryId);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByCode(schoolId, code) {
      const { data, error } = await supabase.from(table).select('*').eq('code', code).eq('school_id', schoolId).single();
      if (error) throw new GovMinistryDepartmentNotFoundError(code);
      return data;
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovMinistryDepartmentNotFoundError(id);
      return data;
    },
  };
}

function createDirectorateRepo(supabase: SupabaseClient): DirectorateRepo {
  const table = 'gov_directorates';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovDirectorateNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovDirectorateNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByMinistry(schoolId, ministryId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('ministry_id', ministryId);
      if (error) throw error;
      return data ?? [];
    },
    async findByRegion(schoolId, regionId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('region_id', regionId);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovDirectorateNotFoundError(id);
      return data;
    },
  };
}

function createEducationPolicyRepo(supabase: SupabaseClient): EducationPolicyRepo {
  const table = 'gov_education_policies';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovEducationPolicyNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovEducationPolicyNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByStatus(schoolId, status) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', status);
      if (error) throw error;
      return data ?? [];
    },
    async findByMinistry(schoolId, ministryId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('ministry_id', ministryId);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByDateRange(schoolId, startDate, endDate) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).gte('start_date', startDate).lte('end_date', endDate);
      if (error) throw error;
      return data ?? [];
    },
  };
}

function createNationalProgramRepo(supabase: SupabaseClient): NationalProgramRepo {
  const table = 'gov_national_programs';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovNationalProgramNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovNationalProgramNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByPolicyId(schoolId, policyId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('policy_id', policyId);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByAcademicYear(schoolId, academicYear) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('academic_year', academicYear);
      if (error) throw error;
      return data ?? [];
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovNationalProgramNotFoundError(id);
      return data;
    },
  };
}

function createEducationStrategyRepo(supabase: SupabaseClient): EducationStrategyRepo {
  const table = 'gov_education_strategies';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovEducationStrategyNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovEducationStrategyNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByMinistry(schoolId, ministryId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('ministry_id', ministryId);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByStatus(schoolId, status) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', status);
      if (error) throw error;
      return data ?? [];
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovEducationStrategyNotFoundError(id);
      return data;
    },
  };
}

function createCircularRepo(supabase: SupabaseClient): CircularRepo {
  const table = 'gov_circulars';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovCircularNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovCircularNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByMinistry(schoolId, ministryId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('ministry_id', ministryId);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByPriority(schoolId, priority) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('priority', priority);
      if (error) throw error;
      return data ?? [];
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovCircularNotFoundError(id);
      return data;
    },
  };
}

function createOfficialDocumentRepo(supabase: SupabaseClient): OfficialDocumentRepo {
  const table = 'gov_official_documents';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovOfficialDocumentNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovOfficialDocumentNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByType(schoolId, type) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('type', type);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByMinistry(schoolId, ministryId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('ministry_id', ministryId);
      if (error) throw error;
      return data ?? [];
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovOfficialDocumentNotFoundError(id);
      return data;
    },
  };
}

function createEducationCalendarRepo(supabase: SupabaseClient): EducationCalendarRepo {
  const table = 'gov_education_calendars';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovEducationCalendarNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovEducationCalendarNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByAcademicYear(schoolId, academicYear) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('academic_year', academicYear);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByType(schoolId, type) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('type', type);
      if (error) throw error;
      return data ?? [];
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovEducationCalendarNotFoundError(id);
      return data;
    },
  };
}

function createNationalStatisticRepo(supabase: SupabaseClient): NationalStatisticRepo {
  const table = 'gov_national_statistics';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovNationalStatisticNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovNationalStatisticNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByCategory(schoolId, category) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('category', category);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByYear(schoolId, year) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('year', year);
      if (error) throw error;
      return data ?? [];
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovNationalStatisticNotFoundError(id);
      return data;
    },
  };
}

function createMinistryUserRepo(supabase: SupabaseClient): MinistryUserRepo {
  const table = 'gov_ministry_users';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovMinistryUserNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovMinistryUserNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByMinistry(schoolId, ministryId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('ministry_id', ministryId);
      if (error) throw error;
      return data ?? [];
    },
    async findActive(schoolId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('status', 'active');
      if (error) throw error;
      return data ?? [];
    },
    async findByRole(schoolId, role) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('role', role);
      if (error) throw error;
      return data ?? [];
    },
    async updateStatus(schoolId, id, status) {
      const { data, error } = await supabase.from(table).update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovMinistryUserNotFoundError(id);
      return data;
    },
  };
}

function createMinistryNotificationRepo(supabase: SupabaseClient): MinistryNotificationRepo {
  const table = 'gov_ministry_notifications';
  return {
    async findById(schoolId, id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new GovMinistryNotificationNotFoundError(id);
      return data;
    },
    async findAll(schoolId, filters) {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    async create(schoolId, data) {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId, id, data) {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new GovMinistryNotificationNotFoundError(id);
      return d;
    },
    async delete(schoolId, id) {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId) {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
    async findByMinistry(schoolId, ministryId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('ministry_id', ministryId);
      if (error) throw error;
      return data ?? [];
    },
    async findUnread(schoolId, userId) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('user_id', userId).eq('read', false);
      if (error) throw error;
      return data ?? [];
    },
    async markAsRead(schoolId, id) {
      const { error } = await supabase.from(table).update({ read: true }).eq('id', id).eq('school_id', schoolId);
      if (error) throw new GovMinistryNotificationNotFoundError(id);
    },
    async findByPriority(schoolId, priority) {
      const { data, error } = await supabase.from(table).select('*').eq('school_id', schoolId).eq('priority', priority);
      if (error) throw error;
      return data ?? [];
    },
  };
}

// ============================================================================
// Factory
// ============================================================================

export function createGOV1Repository(supabase: SupabaseClient): GOV1Repository {
  return {
    ministry: createMinistryRepo(supabase),
    ministryDepartment: createMinistryDepartmentRepo(supabase),
    directorate: createDirectorateRepo(supabase),
    educationPolicy: createEducationPolicyRepo(supabase),
    nationalProgram: createNationalProgramRepo(supabase),
    educationStrategy: createEducationStrategyRepo(supabase),
    circular: createCircularRepo(supabase),
    officialDocument: createOfficialDocumentRepo(supabase),
    educationCalendar: createEducationCalendarRepo(supabase),
    nationalStatistic: createNationalStatisticRepo(supabase),
    ministryUser: createMinistryUserRepo(supabase),
    ministryNotification: createMinistryNotificationRepo(supabase),
  };
}
