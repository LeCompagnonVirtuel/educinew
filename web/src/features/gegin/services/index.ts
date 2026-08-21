import { SupabaseClient } from '@supabase/supabase-js';
import { GEGIN1GovernanceService, createGEGIN1GovernanceService } from './gegin-1-governance.service';
import { GEGIN2OrganizationsService, createGEGIN2OrganizationsService } from './gegin-2-organizations.service';
import { GEGIN3IdentityService, createGEGIN3IdentityService } from './gegin-3-identity.service';
import { GEGIN4QualificationsService, createGEGIN4QualificationsService } from './gegin-4-qualifications.service';
import { GEGIN5MobilityService, createGEGIN5MobilityService } from './gegin-5-mobility.service';
import { GEGIN6ResearchService, createGEGIN6ResearchService } from './gegin-6-research.service';
import { GEGIN7EmploymentService, createGEGIN7EmploymentService } from './gegin-7-employment.service';
import { GEGIN8AnalyticsService, createGEGIN8AnalyticsService } from './gegin-8-analytics.service';
import { GEGIN9MultilangService, createGEGIN9MultilangService } from './gegin-9-multilang.service';
import { GEGIN10ComplianceService, createGEGIN10ComplianceService } from './gegin-10-compliance.service';
import { GEGIN11MarketplaceService, createGEGIN11MarketplaceService } from './gegin-11-marketplace.service';
import { GEGIN12DigitalTwinService, createGEGIN12DigitalTwinService } from './gegin-12-digital-twin.service';

// ============================================================================
// GEGIN Master Service — Global Education Governance Integration
// ============================================================================

export interface GEGINServices {
  governance: GEGIN1GovernanceService;
  organizations: GEGIN2OrganizationsService;
  identity: GEGIN3IdentityService;
  qualifications: GEGIN4QualificationsService;
  mobility: GEGIN5MobilityService;
  research: GEGIN6ResearchService;
  employment: GEGIN7EmploymentService;
  analytics: GEGIN8AnalyticsService;
  multilang: GEGIN9MultilangService;
  compliance: GEGIN10ComplianceService;
  marketplace: GEGIN11MarketplaceService;
  digitalTwin: GEGIN12DigitalTwinService;
}

export class GEGINMasterService {
  readonly governance: GEGIN1GovernanceService;
  readonly organizations: GEGIN2OrganizationsService;
  readonly identity: GEGIN3IdentityService;
  readonly qualifications: GEGIN4QualificationsService;
  readonly mobility: GEGIN5MobilityService;
  readonly research: GEGIN6ResearchService;
  readonly employment: GEGIN7EmploymentService;
  readonly analytics: GEGIN8AnalyticsService;
  readonly multilang: GEGIN9MultilangService;
  readonly compliance: GEGIN10ComplianceService;
  readonly marketplace: GEGIN11MarketplaceService;
  readonly digitalTwin: GEGIN12DigitalTwinService;

  constructor(supabase: SupabaseClient) {
    this.governance = createGEGIN1GovernanceService(supabase);
    this.organizations = createGEGIN2OrganizationsService(supabase);
    this.identity = createGEGIN3IdentityService(supabase);
    this.qualifications = createGEGIN4QualificationsService(supabase);
    this.mobility = createGEGIN5MobilityService(supabase);
    this.research = createGEGIN6ResearchService(supabase);
    this.employment = createGEGIN7EmploymentService(supabase);
    this.analytics = createGEGIN8AnalyticsService(supabase);
    this.multilang = createGEGIN9MultilangService(supabase);
    this.compliance = createGEGIN10ComplianceService(supabase);
    this.marketplace = createGEGIN11MarketplaceService(supabase);
    this.digitalTwin = createGEGIN12DigitalTwinService(supabase);
  }
}

export function createGEGINMasterService(supabase: SupabaseClient): GEGINMasterService {
  return new GEGINMasterService(supabase);
}

// ============================================================================
// Re-export all services
// ============================================================================

export * from './gegin-base.service';
export * from './gegin-1-governance.service';
export * from './gegin-2-organizations.service';
export * from './gegin-3-identity.service';
export * from './gegin-4-qualifications.service';
export * from './gegin-5-mobility.service';
export * from './gegin-6-research.service';
export * from './gegin-7-employment.service';
export * from './gegin-8-analytics.service';
export * from './gegin-9-multilang.service';
export * from './gegin-10-compliance.service';
export * from './gegin-11-marketplace.service';
export * from './gegin-12-digital-twin.service';
