import { SupabaseClient } from '@supabase/supabase-js';
import {
  GovernmentFunding, GovernmentFundingCreate, GovernmentFundingUpdate,
  FundingAllocation, FundingAllocationCreate, FundingAllocationUpdate,
  Scholarship, ScholarshipCreate, ScholarshipUpdate,
  ScholarshipApplication, ScholarshipApplicationCreate, ScholarshipApplicationUpdate,
  Grant, GrantCreate, GrantUpdate,
  GrantProject, GrantProjectCreate, GrantProjectUpdate,
  Donor, DonorCreate, DonorUpdate,
  NgoPartner, NgoPartnerCreate, NgoPartnerUpdate,
  BudgetAllocation, BudgetAllocationCreate, BudgetAllocationUpdate,
  RegionalBudget, RegionalBudgetCreate, RegionalBudgetUpdate,
  FundDisbursement, FundDisbursementCreate, FundDisbursementUpdate,
  FundingReport, FundingReportCreate, FundingReportUpdate,
} from '@educi/types';
import {
  GovGovernmentFundingNotFoundError,
  GovFundingAllocationNotFoundError,
  GovScholarshipNotFoundError,
  GovScholarshipApplicationNotFoundError,
  GovGrantNotFoundError,
  GovGrantProjectNotFoundError,
  GovDonorNotFoundError,
  GovNgoPartnerNotFoundError,
  GovBudgetAllocationNotFoundError,
  GovRegionalBudgetNotFoundError,
  GovFundDisbursementNotFoundError,
  GovFundingReportNotFoundError,
} from '@educi/errors';

// ============================================================================
// GOV Module 4: Funding & Finance
// ============================================================================

export interface GOV4Repository {
  governmentFunding: GovernmentFundingRepo;
  fundingAllocation: FundingAllocationRepo;
  scholarship: ScholarshipRepo;
  scholarshipApplication: ScholarshipApplicationRepo;
  grant: GrantRepo;
  grantProject: GrantProjectRepo;
  donor: DonorRepo;
  ngoPartner: NgoPartnerRepo;
  budgetAllocation: BudgetAllocationRepo;
  regionalBudget: RegionalBudgetRepo;
  fundDisbursement: FundDisbursementRepo;
  fundingReport: FundingReportRepo;
}

export interface GovernmentFundingRepo {
  findById(schoolId: string, id: string): Promise<GovernmentFunding>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentFunding[]>;
  create(schoolId: string, data: Partial<GovernmentFundingCreate>): Promise<GovernmentFunding>;
  update(schoolId: string, id: string, data: Partial<GovernmentFundingCreate>): Promise<GovernmentFunding>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByFiscalYear(schoolId: string, fiscalYear: string): Promise<GovernmentFunding[]>;
  findByStatus(schoolId: string, status: string): Promise<GovernmentFunding[]>;
  findByMinistry(schoolId: string, ministryId: string): Promise<GovernmentFunding[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface FundingAllocationRepo {
  findById(schoolId: string, id: string): Promise<FundingAllocation>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<FundingAllocation[]>;
  create(schoolId: string, data: Partial<FundingAllocationCreate>): Promise<FundingAllocation>;
  update(schoolId: string, id: string, data: Partial<FundingAllocationCreate>): Promise<FundingAllocation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByFunding(schoolId: string, fundingId: string): Promise<FundingAllocation[]>;
  findBySchool(schoolId: string, schoolId_: string): Promise<FundingAllocation[]>;
  findByStatus(schoolId: string, status: string): Promise<FundingAllocation[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface ScholarshipRepo {
  findById(schoolId: string, id: string): Promise<Scholarship>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Scholarship[]>;
  create(schoolId: string, data: Partial<ScholarshipCreate>): Promise<Scholarship>;
  update(schoolId: string, id: string, data: Partial<ScholarshipCreate>): Promise<Scholarship>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByStatus(schoolId: string, status: string): Promise<Scholarship[]>;
  findByAcademicYear(schoolId: string, academicYear: string): Promise<Scholarship[]>;
  findActive(schoolId: string): Promise<Scholarship[]>;
}

export interface ScholarshipApplicationRepo {
  findById(schoolId: string, id: string): Promise<ScholarshipApplication>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ScholarshipApplication[]>;
  create(schoolId: string, data: Partial<ScholarshipApplicationCreate>): Promise<ScholarshipApplication>;
  update(schoolId: string, id: string, data: Partial<ScholarshipApplicationCreate>): Promise<ScholarshipApplication>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByScholarship(schoolId: string, scholarshipId: string): Promise<ScholarshipApplication[]>;
  findByStudent(schoolId: string, studentId: string): Promise<ScholarshipApplication[]>;
  findByStatus(schoolId: string, status: string): Promise<ScholarshipApplication[]>;
  approve(schoolId: string, id: string): Promise<void>;
  reject(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface GrantRepo {
  findById(schoolId: string, id: string): Promise<Grant>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Grant[]>;
  create(schoolId: string, data: Partial<GrantCreate>): Promise<Grant>;
  update(schoolId: string, id: string, data: Partial<GrantCreate>): Promise<Grant>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByDonor(schoolId: string, donorId: string): Promise<Grant[]>;
  findByStatus(schoolId: string, status: string): Promise<Grant[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface GrantProjectRepo {
  findById(schoolId: string, id: string): Promise<GrantProject>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<GrantProject[]>;
  create(schoolId: string, data: Partial<GrantProjectCreate>): Promise<GrantProject>;
  update(schoolId: string, id: string, data: Partial<GrantProjectCreate>): Promise<GrantProject>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByGrant(schoolId: string, grantId: string): Promise<GrantProject[]>;
  findByStatus(schoolId: string, status: string): Promise<GrantProject[]>;
  findBySchool(schoolId: string, schoolId_: string): Promise<GrantProject[]>;
  complete(schoolId: string, id: string): Promise<void>;
}

export interface DonorRepo {
  findById(schoolId: string, id: string): Promise<Donor>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Donor[]>;
  create(schoolId: string, data: Partial<DonorCreate>): Promise<Donor>;
  update(schoolId: string, id: string, data: Partial<DonorCreate>): Promise<Donor>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findActive(schoolId: string): Promise<Donor[]>;
  findByType(schoolId: string, type: string): Promise<Donor[]>;
  findByName(schoolId: string, name: string): Promise<Donor | null>;
}

export interface NgoPartnerRepo {
  findById(schoolId: string, id: string): Promise<NgoPartner>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NgoPartner[]>;
  create(schoolId: string, data: Partial<NgoPartnerCreate>): Promise<NgoPartner>;
  update(schoolId: string, id: string, data: Partial<NgoPartnerCreate>): Promise<NgoPartner>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findActive(schoolId: string): Promise<NgoPartner[]>;
  findBySpecialization(schoolId: string, specialization: string): Promise<NgoPartner[]>;
  findByName(schoolId: string, name: string): Promise<NgoPartner | null>;
}

export interface BudgetAllocationRepo {
  findById(schoolId: string, id: string): Promise<BudgetAllocation>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<BudgetAllocation[]>;
  create(schoolId: string, data: Partial<BudgetAllocationCreate>): Promise<BudgetAllocation>;
  update(schoolId: string, id: string, data: Partial<BudgetAllocationCreate>): Promise<BudgetAllocation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findBySchool(schoolId: string, schoolId_: string): Promise<BudgetAllocation[]>;
  findByFiscalYear(schoolId: string, fiscalYear: string): Promise<BudgetAllocation[]>;
  findByStatus(schoolId: string, status: string): Promise<BudgetAllocation[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface RegionalBudgetRepo {
  findById(schoolId: string, id: string): Promise<RegionalBudget>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalBudget[]>;
  create(schoolId: string, data: Partial<RegionalBudgetCreate>): Promise<RegionalBudget>;
  update(schoolId: string, id: string, data: Partial<RegionalBudgetCreate>): Promise<RegionalBudget>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByRegion(schoolId: string, regionId: string): Promise<RegionalBudget[]>;
  findByFiscalYear(schoolId: string, fiscalYear: string): Promise<RegionalBudget[]>;
  findByStatus(schoolId: string, status: string): Promise<RegionalBudget[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface FundDisbursementRepo {
  findById(schoolId: string, id: string): Promise<FundDisbursement>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<FundDisbursement[]>;
  create(schoolId: string, data: Partial<FundDisbursementCreate>): Promise<FundDisbursement>;
  update(schoolId: string, id: string, data: Partial<FundDisbursementCreate>): Promise<FundDisbursement>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByAllocation(schoolId: string, allocationId: string): Promise<FundDisbursement[]>;
  findByStatus(schoolId: string, status: string): Promise<FundDisbursement[]>;
  process(schoolId: string, id: string): Promise<void>;
}

export interface FundingReportRepo {
  findById(schoolId: string, id: string): Promise<FundingReport>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<FundingReport[]>;
  create(schoolId: string, data: Partial<FundingReportCreate>): Promise<FundingReport>;
  update(schoolId: string, id: string, data: Partial<FundingReportCreate>): Promise<FundingReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findBySchool(schoolId: string, schoolId_: string): Promise<FundingReport[]>;
  findByType(schoolId: string, type: string): Promise<FundingReport[]>;
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

export function createGOV4Repository(supabase: SupabaseClient): GOV4Repository {
  return {
    governmentFunding: makeRepo(supabase, 'gov_government_fundings', GovGovernmentFundingNotFoundError, {
      async findByFiscalYear(schoolId: string, fiscalYear: string) {
        const { data, error } = await supabase.from('gov_government_fundings').select('*').eq('school_id', schoolId).eq('fiscal_year', fiscalYear);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_government_fundings').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async findByMinistry(schoolId: string, ministryId: string) {
        const { data, error } = await supabase.from('gov_government_fundings').select('*').eq('school_id', schoolId).eq('ministry_id', ministryId);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_government_fundings').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovGovernmentFundingNotFoundError(id);
      },
    }),
    fundingAllocation: makeRepo(supabase, 'gov_funding_allocations', GovFundingAllocationNotFoundError, {
      async findByFunding(schoolId: string, fundingId: string) {
        const { data, error } = await supabase.from('gov_funding_allocations').select('*').eq('school_id', schoolId).eq('funding_id', fundingId);
        if (error) throw error;
        return data ?? [];
      },
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_funding_allocations').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_funding_allocations').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_funding_allocations').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovFundingAllocationNotFoundError(id);
      },
    }),
    scholarship: makeRepo(supabase, 'gov_scholarships', GovScholarshipNotFoundError, {
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_scholarships').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async findByAcademicYear(schoolId: string, academicYear: string) {
        const { data, error } = await supabase.from('gov_scholarships').select('*').eq('school_id', schoolId).eq('academic_year', academicYear);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_scholarships').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
    }),
    scholarshipApplication: makeRepo(supabase, 'gov_scholarship_applications', GovScholarshipApplicationNotFoundError, {
      async findByScholarship(schoolId: string, scholarshipId: string) {
        const { data, error } = await supabase.from('gov_scholarship_applications').select('*').eq('school_id', schoolId).eq('scholarship_id', scholarshipId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStudent(schoolId: string, studentId: string) {
        const { data, error } = await supabase.from('gov_scholarship_applications').select('*').eq('school_id', schoolId).eq('student_id', studentId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_scholarship_applications').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_scholarship_applications').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovScholarshipApplicationNotFoundError(id);
      },
      async reject(schoolId: string, id: string, reason: string) {
        const { error } = await supabase.from('gov_scholarship_applications').update({ status: 'rejected', rejection_reason: reason }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovScholarshipApplicationNotFoundError(id);
      },
    }),
    grant: makeRepo(supabase, 'gov_grants', GovGrantNotFoundError, {
      async findByDonor(schoolId: string, donorId: string) {
        const { data, error } = await supabase.from('gov_grants').select('*').eq('school_id', schoolId).eq('donor_id', donorId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_grants').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_grants').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovGrantNotFoundError(id);
      },
    }),
    grantProject: makeRepo(supabase, 'gov_grant_projects', GovGrantProjectNotFoundError, {
      async findByGrant(schoolId: string, grantId: string) {
        const { data, error } = await supabase.from('gov_grant_projects').select('*').eq('school_id', schoolId).eq('grant_id', grantId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_grant_projects').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_grant_projects').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async complete(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_grant_projects').update({ status: 'completed' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovGrantProjectNotFoundError(id);
      },
    }),
    donor: makeRepo(supabase, 'gov_donors', GovDonorNotFoundError, {
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_donors').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_donors').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
      async findByName(schoolId: string, name: string) {
        const { data, error } = await supabase.from('gov_donors').select('*').eq('school_id', schoolId).eq('name', name).single();
        if (error) return null;
        return data;
      },
    }),
    ngoPartner: makeRepo(supabase, 'gov_ngo_partners', GovNgoPartnerNotFoundError, {
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_ngo_partners').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findBySpecialization(schoolId: string, specialization: string) {
        const { data, error } = await supabase.from('gov_ngo_partners').select('*').eq('school_id', schoolId).eq('specialization', specialization);
        if (error) throw error;
        return data ?? [];
      },
      async findByName(schoolId: string, name: string) {
        const { data, error } = await supabase.from('gov_ngo_partners').select('*').eq('school_id', schoolId).eq('name', name).single();
        if (error) return null;
        return data;
      },
    }),
    budgetAllocation: makeRepo(supabase, 'gov_budget_allocations', GovBudgetAllocationNotFoundError, {
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_budget_allocations').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async findByFiscalYear(schoolId: string, fiscalYear: string) {
        const { data, error } = await supabase.from('gov_budget_allocations').select('*').eq('school_id', schoolId).eq('fiscal_year', fiscalYear);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_budget_allocations').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_budget_allocations').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovBudgetAllocationNotFoundError(id);
      },
    }),
    regionalBudget: makeRepo(supabase, 'gov_regional_budgets', GovRegionalBudgetNotFoundError, {
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_regional_budgets').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findByFiscalYear(schoolId: string, fiscalYear: string) {
        const { data, error } = await supabase.from('gov_regional_budgets').select('*').eq('school_id', schoolId).eq('fiscal_year', fiscalYear);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_regional_budgets').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_regional_budgets').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovRegionalBudgetNotFoundError(id);
      },
    }),
    fundDisbursement: makeRepo(supabase, 'gov_fund_disbursements', GovFundDisbursementNotFoundError, {
      async findByAllocation(schoolId: string, allocationId: string) {
        const { data, error } = await supabase.from('gov_fund_disbursements').select('*').eq('school_id', schoolId).eq('allocation_id', allocationId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_fund_disbursements').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async process(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_fund_disbursements').update({ status: 'processed' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovFundDisbursementNotFoundError(id);
      },
    }),
    fundingReport: makeRepo(supabase, 'gov_funding_reports', GovFundingReportNotFoundError, {
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_funding_reports').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_funding_reports').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
    }),
  };
}
