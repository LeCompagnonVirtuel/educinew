import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-2: Organizations — Educational Organization Framework
// ============================================================================

export interface GEGINOrganization extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  type: 'institution' | 'department' | 'faculty' | 'school' | 'research_center' | 'administrative';
  status: 'active' | 'inactive' | 'archived';
  parent_id?: string;
  head_id?: string;
  country_code: string;
  city: string;
  address?: string;
  website_url?: string;
  contact_email?: string;
  contact_phone?: string;
  established_date: string;
  accreditation_status: 'accredited' | 'pending' | 'suspended' | 'revoked';
  metadata: Record<string, unknown>;
}

export interface GEGINOrganizationMembership extends BaseEntity {
  organization_id: string;
  user_id: string;
  role: 'member' | 'admin' | 'viewer' | 'contributor';
  status: 'active' | 'inactive' | 'suspended';
  joined_date: string;
  expiry_date?: string;
  permissions: string[];
  metadata: Record<string, unknown>;
}

export interface GEGINOrganizationProject extends BaseEntity {
  organization_id: string;
  title: string;
  description: string;
  type: 'research' | 'development' | 'capacity_building' | 'digital_transformation';
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  start_date: string;
  end_date?: string;
  budget: number;
  spent: number;
  lead_id?: string;
  team_members: string[];
  metadata: Record<string, unknown>;
}

export interface GEGINOrganizationFunding extends BaseEntity {
  organization_id: string;
  source: string;
  type: 'grant' | 'donation' | 'subscription' | 'government' | 'other';
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'disbursed' | 'completed' | 'rejected';
  application_date: string;
  approval_date?: string;
  disbursement_date?: string;
  conditions?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINOrganizationPartnership extends BaseEntity {
  organization_id: string;
  partner_organization_id: string;
  type: 'academic' | 'research' | 'industry' | 'government' | 'ngo';
  status: 'active' | 'inactive' | 'suspended';
  start_date: string;
  end_date?: string;
  agreement_url?: string;
  contact_person: string;
  contact_email?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINOrganizationRegionalFramework extends BaseEntity {
  name: string;
  description: string;
  region: string;
  countries: string[];
  type: 'harmonization' | 'quality assurance' | 'recognition' | 'mobility';
  status: 'active' | 'inactive' | 'draft';
  established_date: string;
  member_organizations: string[];
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN2_TABLE_NAMES: Record<string, string> = {
  GEGINOrganization: 'gegin_organizations',
  GEGINOrganizationMembership: 'gegin_organization_memberships',
  GEGINOrganizationProject: 'gegin_organization_projects',
  GEGINOrganizationFunding: 'gegin_organization_funding',
  GEGINOrganizationPartnership: 'gegin_organization_partnerships',
  GEGINOrganizationRegionalFramework: 'gegin_organization_regional_frameworks',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN2Repository {
  organizations: CrudRepository<GEGINOrganization>;
  memberships: CrudRepository<GEGINOrganizationMembership>;
  projects: CrudRepository<GEGINOrganizationProject>;
  funding: CrudRepository<GEGINOrganizationFunding>;
  partnerships: CrudRepository<GEGINOrganizationPartnership>;
  regionalFrameworks: CrudRepository<GEGINOrganizationRegionalFramework>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN2Repository(supabase: SupabaseClient): GEGIN2Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    organizations: crud<GEGINOrganization>(GEGIN2_TABLE_NAMES.GEGINOrganization),
    memberships: crud<GEGINOrganizationMembership>(GEGIN2_TABLE_NAMES.GEGINOrganizationMembership),
    projects: crud<GEGINOrganizationProject>(GEGIN2_TABLE_NAMES.GEGINOrganizationProject),
    funding: crud<GEGINOrganizationFunding>(GEGIN2_TABLE_NAMES.GEGINOrganizationFunding),
    partnerships: crud<GEGINOrganizationPartnership>(GEGIN2_TABLE_NAMES.GEGINOrganizationPartnership),
    regionalFrameworks: crud<GEGINOrganizationRegionalFramework>(GEGIN2_TABLE_NAMES.GEGINOrganizationRegionalFramework),
  };
}
