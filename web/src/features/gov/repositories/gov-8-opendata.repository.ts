import { SupabaseClient } from '@supabase/supabase-js';
import {
  SchoolNetwork, SchoolNetworkCreate, SchoolNetworkUpdate,
  NetworkMember, NetworkMemberCreate, NetworkMemberUpdate,
  SchoolChain, SchoolChainCreate, SchoolChainUpdate,
  SchoolFranchise, SchoolFranchiseCreate, SchoolFranchiseUpdate,
  ReligiousSchoolGroup, ReligiousSchoolGroupCreate, ReligiousSchoolGroupUpdate,
  PrivateSchoolGroup, PrivateSchoolGroupCreate, PrivateSchoolGroupUpdate,
  NgoSchoolGroup, NgoSchoolGroupCreate, NgoSchoolGroupUpdate,
  InternationalSchoolGroup, InternationalSchoolGroupCreate, InternationalSchoolGroupUpdate,
  NetworkAgreement, NetworkAgreementCreate, NetworkAgreementUpdate,
  NetworkReport, NetworkReportCreate, NetworkReportUpdate,
} from '@educi/types';
import {
  GovSchoolNetworkNotFoundError,
  GovNetworkMemberNotFoundError,
  GovSchoolChainNotFoundError,
  GovSchoolFranchiseNotFoundError,
  GovReligiousSchoolGroupNotFoundError,
  GovPrivateSchoolGroupNotFoundError,
  GovNgoSchoolGroupNotFoundError,
  GovInternationalSchoolGroupNotFoundError,
  GovNetworkAgreementNotFoundError,
  GovNetworkReportNotFoundError,
} from '@educi/errors';

// ============================================================================
// GOV Module 8: Open Data & School Networks
// ============================================================================

export interface GOV8Repository {
  schoolNetwork: SchoolNetworkRepo;
  networkMember: NetworkMemberRepo;
  schoolChain: SchoolChainRepo;
  schoolFranchise: SchoolFranchiseRepo;
  religiousSchoolGroup: ReligiousSchoolGroupRepo;
  privateSchoolGroup: PrivateSchoolGroupRepo;
  ngoSchoolGroup: NgoSchoolGroupRepo;
  internationalSchoolGroup: InternationalSchoolGroupRepo;
  networkAgreement: NetworkAgreementRepo;
  networkReport: NetworkReportRepo;
}

export interface SchoolNetworkRepo {
  findById(schoolId: string, id: string): Promise<SchoolNetwork>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolNetwork[]>;
  create(schoolId: string, data: Partial<SchoolNetworkCreate>): Promise<SchoolNetwork>;
  update(schoolId: string, id: string, data: Partial<SchoolNetworkCreate>): Promise<SchoolNetwork>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findActive(schoolId: string): Promise<SchoolNetwork[]>;
  findByType(schoolId: string, type: string): Promise<SchoolNetwork[]>;
  findByName(schoolId: string, name: string): Promise<SchoolNetwork | null>;
}

export interface NetworkMemberRepo {
  findById(schoolId: string, id: string): Promise<NetworkMember>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkMember[]>;
  create(schoolId: string, data: Partial<NetworkMemberCreate>): Promise<NetworkMember>;
  update(schoolId: string, id: string, data: Partial<NetworkMemberCreate>): Promise<NetworkMember>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByNetwork(schoolId: string, networkId: string): Promise<NetworkMember[]>;
  findBySchool(schoolId: string, schoolId_: string): Promise<NetworkMember[]>;
  findActive(schoolId: string): Promise<NetworkMember[]>;
}

export interface SchoolChainRepo {
  findById(schoolId: string, id: string): Promise<SchoolChain>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolChain[]>;
  create(schoolId: string, data: Partial<SchoolChainCreate>): Promise<SchoolChain>;
  update(schoolId: string, id: string, data: Partial<SchoolChainCreate>): Promise<SchoolChain>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findActive(schoolId: string): Promise<SchoolChain[]>;
  findByName(schoolId: string, name: string): Promise<SchoolChain | null>;
  findByOwner(schoolId: string, ownerId: string): Promise<SchoolChain[]>;
}

export interface SchoolFranchiseRepo {
  findById(schoolId: string, id: string): Promise<SchoolFranchise>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolFranchise[]>;
  create(schoolId: string, data: Partial<SchoolFranchiseCreate>): Promise<SchoolFranchise>;
  update(schoolId: string, id: string, data: Partial<SchoolFranchiseCreate>): Promise<SchoolFranchise>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByChain(schoolId: string, chainId: string): Promise<SchoolFranchise[]>;
  findByStatus(schoolId: string, status: string): Promise<SchoolFranchise[]>;
  approve(schoolId: string, id: string): Promise<void>;
}

export interface ReligiousSchoolGroupRepo {
  findById(schoolId: string, id: string): Promise<ReligiousSchoolGroup>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ReligiousSchoolGroup[]>;
  create(schoolId: string, data: Partial<ReligiousSchoolGroupCreate>): Promise<ReligiousSchoolGroup>;
  update(schoolId: string, id: string, data: Partial<ReligiousSchoolGroupCreate>): Promise<ReligiousSchoolGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByReligion(schoolId: string, religion: string): Promise<ReligiousSchoolGroup[]>;
  findActive(schoolId: string): Promise<ReligiousSchoolGroup[]>;
  findByName(schoolId: string, name: string): Promise<ReligiousSchoolGroup | null>;
}

export interface PrivateSchoolGroupRepo {
  findById(schoolId: string, id: string): Promise<PrivateSchoolGroup>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<PrivateSchoolGroup[]>;
  create(schoolId: string, data: Partial<PrivateSchoolGroupCreate>): Promise<PrivateSchoolGroup>;
  update(schoolId: string, id: string, data: Partial<PrivateSchoolGroupCreate>): Promise<PrivateSchoolGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByOwner(schoolId: string, ownerId: string): Promise<PrivateSchoolGroup[]>;
  findActive(schoolId: string): Promise<PrivateSchoolGroup[]>;
  findByName(schoolId: string, name: string): Promise<PrivateSchoolGroup | null>;
}

export interface NgoSchoolGroupRepo {
  findById(schoolId: string, id: string): Promise<NgoSchoolGroup>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NgoSchoolGroup[]>;
  create(schoolId: string, data: Partial<NgoSchoolGroupCreate>): Promise<NgoSchoolGroup>;
  update(schoolId: string, id: string, data: Partial<NgoSchoolGroupCreate>): Promise<NgoSchoolGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByNgo(schoolId: string, ngoId: string): Promise<NgoSchoolGroup[]>;
  findActive(schoolId: string): Promise<NgoSchoolGroup[]>;
  findByName(schoolId: string, name: string): Promise<NgoSchoolGroup | null>;
}

export interface InternationalSchoolGroupRepo {
  findById(schoolId: string, id: string): Promise<InternationalSchoolGroup>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalSchoolGroup[]>;
  create(schoolId: string, data: Partial<InternationalSchoolGroupCreate>): Promise<InternationalSchoolGroup>;
  update(schoolId: string, id: string, data: Partial<InternationalSchoolGroupCreate>): Promise<InternationalSchoolGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCountry(schoolId: string, countryId: string): Promise<InternationalSchoolGroup[]>;
  findActive(schoolId: string): Promise<InternationalSchoolGroup[]>;
  findByName(schoolId: string, name: string): Promise<InternationalSchoolGroup | null>;
}

export interface NetworkAgreementRepo {
  findById(schoolId: string, id: string): Promise<NetworkAgreement>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkAgreement[]>;
  create(schoolId: string, data: Partial<NetworkAgreementCreate>): Promise<NetworkAgreement>;
  update(schoolId: string, id: string, data: Partial<NetworkAgreementCreate>): Promise<NetworkAgreement>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByNetwork(schoolId: string, networkId: string): Promise<NetworkAgreement[]>;
  findByStatus(schoolId: string, status: string): Promise<NetworkAgreement[]>;
  approve(schoolId: string, id: string): Promise<void>;
  findExpired(schoolId: string): Promise<NetworkAgreement[]>;
}

export interface NetworkReportRepo {
  findById(schoolId: string, id: string): Promise<NetworkReport>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkReport[]>;
  create(schoolId: string, data: Partial<NetworkReportCreate>): Promise<NetworkReport>;
  update(schoolId: string, id: string, data: Partial<NetworkReportCreate>): Promise<NetworkReport>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByNetwork(schoolId: string, networkId: string): Promise<NetworkReport[]>;
  findByType(schoolId: string, type: string): Promise<NetworkReport[]>;
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

export function createGOV8Repository(supabase: SupabaseClient): GOV8Repository {
  return {
    schoolNetwork: makeRepo(supabase, 'gov_school_networks', GovSchoolNetworkNotFoundError, {
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_school_networks').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_school_networks').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
      async findByName(schoolId: string, name: string) {
        const { data, error } = await supabase.from('gov_school_networks').select('*').eq('school_id', schoolId).eq('name', name).single();
        if (error) return null;
        return data;
      },
    }),
    networkMember: makeRepo(supabase, 'gov_network_members', GovNetworkMemberNotFoundError, {
      async findByNetwork(schoolId: string, networkId: string) {
        const { data, error } = await supabase.from('gov_network_members').select('*').eq('school_id', schoolId).eq('network_id', networkId);
        if (error) throw error;
        return data ?? [];
      },
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_network_members').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_network_members').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
    }),
    schoolChain: makeRepo(supabase, 'gov_school_chains', GovSchoolChainNotFoundError, {
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_school_chains').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByName(schoolId: string, name: string) {
        const { data, error } = await supabase.from('gov_school_chains').select('*').eq('school_id', schoolId).eq('name', name).single();
        if (error) return null;
        return data;
      },
      async findByOwner(schoolId: string, ownerId: string) {
        const { data, error } = await supabase.from('gov_school_chains').select('*').eq('school_id', schoolId).eq('owner_id', ownerId);
        if (error) throw error;
        return data ?? [];
      },
    }),
    schoolFranchise: makeRepo(supabase, 'gov_school_franchises', GovSchoolFranchiseNotFoundError, {
      async findByChain(schoolId: string, chainId: string) {
        const { data, error } = await supabase.from('gov_school_franchises').select('*').eq('school_id', schoolId).eq('chain_id', chainId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_school_franchises').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_school_franchises').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovSchoolFranchiseNotFoundError(id);
      },
    }),
    religiousSchoolGroup: makeRepo(supabase, 'gov_religious_school_groups', GovReligiousSchoolGroupNotFoundError, {
      async findByReligion(schoolId: string, religion: string) {
        const { data, error } = await supabase.from('gov_religious_school_groups').select('*').eq('school_id', schoolId).eq('religion', religion);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_religious_school_groups').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByName(schoolId: string, name: string) {
        const { data, error } = await supabase.from('gov_religious_school_groups').select('*').eq('school_id', schoolId).eq('name', name).single();
        if (error) return null;
        return data;
      },
    }),
    privateSchoolGroup: makeRepo(supabase, 'gov_private_school_groups', GovPrivateSchoolGroupNotFoundError, {
      async findByOwner(schoolId: string, ownerId: string) {
        const { data, error } = await supabase.from('gov_private_school_groups').select('*').eq('school_id', schoolId).eq('owner_id', ownerId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_private_school_groups').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByName(schoolId: string, name: string) {
        const { data, error } = await supabase.from('gov_private_school_groups').select('*').eq('school_id', schoolId).eq('name', name).single();
        if (error) return null;
        return data;
      },
    }),
    ngoSchoolGroup: makeRepo(supabase, 'gov_ngo_school_groups', GovNgoSchoolGroupNotFoundError, {
      async findByNgo(schoolId: string, ngoId: string) {
        const { data, error } = await supabase.from('gov_ngo_school_groups').select('*').eq('school_id', schoolId).eq('ngo_id', ngoId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_ngo_school_groups').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByName(schoolId: string, name: string) {
        const { data, error } = await supabase.from('gov_ngo_school_groups').select('*').eq('school_id', schoolId).eq('name', name).single();
        if (error) return null;
        return data;
      },
    }),
    internationalSchoolGroup: makeRepo(supabase, 'gov_international_school_groups', GovInternationalSchoolGroupNotFoundError, {
      async findByCountry(schoolId: string, countryId: string) {
        const { data, error } = await supabase.from('gov_international_school_groups').select('*').eq('school_id', schoolId).eq('country_id', countryId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_international_school_groups').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByName(schoolId: string, name: string) {
        const { data, error } = await supabase.from('gov_international_school_groups').select('*').eq('school_id', schoolId).eq('name', name).single();
        if (error) return null;
        return data;
      },
    }),
    networkAgreement: makeRepo(supabase, 'gov_network_agreements', GovNetworkAgreementNotFoundError, {
      async findByNetwork(schoolId: string, networkId: string) {
        const { data, error } = await supabase.from('gov_network_agreements').select('*').eq('school_id', schoolId).eq('network_id', networkId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_network_agreements').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_network_agreements').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovNetworkAgreementNotFoundError(id);
      },
      async findExpired(schoolId: string) {
        const { data, error } = await supabase.from('gov_network_agreements').select('*').eq('school_id', schoolId).lt('end_date', new Date().toISOString());
        if (error) throw error;
        return data ?? [];
      },
    }),
    networkReport: makeRepo(supabase, 'gov_network_reports', GovNetworkReportNotFoundError, {
      async findByNetwork(schoolId: string, networkId: string) {
        const { data, error } = await supabase.from('gov_network_reports').select('*').eq('school_id', schoolId).eq('network_id', networkId);
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_network_reports').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
    }),
  };
}
