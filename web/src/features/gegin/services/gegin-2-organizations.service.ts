import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINOrganization, GEGINOrganizationMembership, GEGINOrganizationProject, GEGINOrganizationFunding, GEGINOrganizationPartnership, GEGINOrganizationRegionalFramework, GEGIN2_TABLE_NAMES } from '../repositories/gegin-2-organizations.repository';
import { logger } from '@educi/logger';

export class GEGINOrganizationService extends GEGINBaseService<GEGINOrganization> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN2_TABLE_NAMES.GEGINOrganization, moduleName: 'Organization' });
  }
}

export class GEGINOrganizationMembershipService extends GEGINBaseService<GEGINOrganizationMembership> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN2_TABLE_NAMES.GEGINOrganizationMembership, moduleName: 'OrganizationMembership' });
  }
}

export class GEGINOrganizationProjectService extends GEGINBaseService<GEGINOrganizationProject> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN2_TABLE_NAMES.GEGINOrganizationProject, moduleName: 'OrganizationProject' });
  }
}

export class GEGINOrganizationFundingService extends GEGINBaseService<GEGINOrganizationFunding> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN2_TABLE_NAMES.GEGINOrganizationFunding, moduleName: 'OrganizationFunding' });
  }
}

export class GEGINOrganizationPartnershipService extends GEGINBaseService<GEGINOrganizationPartnership> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN2_TABLE_NAMES.GEGINOrganizationPartnership, moduleName: 'OrganizationPartnership' });
  }
}

export class GEGINOrganizationRegionalFrameworkService extends GEGINBaseService<GEGINOrganizationRegionalFramework> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN2_TABLE_NAMES.GEGINOrganizationRegionalFramework, moduleName: 'OrganizationRegionalFramework' });
  }
}

export class GEGIN2OrganizationsService {
  readonly organizations: GEGINOrganizationService;
  readonly memberships: GEGINOrganizationMembershipService;
  readonly projects: GEGINOrganizationProjectService;
  readonly funding: GEGINOrganizationFundingService;
  readonly partnerships: GEGINOrganizationPartnershipService;
  readonly regionalFrameworks: GEGINOrganizationRegionalFrameworkService;

  constructor(supabase: SupabaseClient) {
    this.organizations = new GEGINOrganizationService(supabase);
    this.memberships = new GEGINOrganizationMembershipService(supabase);
    this.projects = new GEGINOrganizationProjectService(supabase);
    this.funding = new GEGINOrganizationFundingService(supabase);
    this.partnerships = new GEGINOrganizationPartnershipService(supabase);
    this.regionalFrameworks = new GEGINOrganizationRegionalFrameworkService(supabase);
  }
}

export function createGEGIN2OrganizationsService(supabase: SupabaseClient): GEGIN2OrganizationsService {
  return new GEGIN2OrganizationsService(supabase);
}
