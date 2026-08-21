import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINGraduate, GEGINEmployer, GEGINJobPosting, GEGINApplication, GEGINSkillMatch, GEGINInternship, GEGIN7_TABLE_NAMES } from '../repositories/gegin-7-employment.repository';
import { logger } from '@educi/logger';

export class GEGINGraduateService extends GEGINBaseService<GEGINGraduate> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN7_TABLE_NAMES.GEGINGraduate, moduleName: 'Graduate' });
  }
}

export class GEGINEmployerService extends GEGINBaseService<GEGINEmployer> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN7_TABLE_NAMES.GEGINEmployer, moduleName: 'Employer' });
  }
}

export class GEGINJobPostingService extends GEGINBaseService<GEGINJobPosting> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN7_TABLE_NAMES.GEGINJobPosting, moduleName: 'JobPosting' });
  }
}

export class GEGINApplicationService extends GEGINBaseService<GEGINApplication> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN7_TABLE_NAMES.GEGINApplication, moduleName: 'Application' });
  }
}

export class GEGINSkillMatchService extends GEGINBaseService<GEGINSkillMatch> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN7_TABLE_NAMES.GEGINSkillMatch, moduleName: 'SkillMatch' });
  }
}

export class GEGINInternshipService extends GEGINBaseService<GEGINInternship> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN7_TABLE_NAMES.GEGINInternship, moduleName: 'Internship' });
  }
}

export class GEGIN7EmploymentService {
  readonly graduates: GEGINGraduateService;
  readonly employers: GEGINEmployerService;
  readonly jobPostings: GEGINJobPostingService;
  readonly applications: GEGINApplicationService;
  readonly skillMatches: GEGINSkillMatchService;
  readonly internships: GEGINInternshipService;

  constructor(supabase: SupabaseClient) {
    this.graduates = new GEGINGraduateService(supabase);
    this.employers = new GEGINEmployerService(supabase);
    this.jobPostings = new GEGINJobPostingService(supabase);
    this.applications = new GEGINApplicationService(supabase);
    this.skillMatches = new GEGINSkillMatchService(supabase);
    this.internships = new GEGINInternshipService(supabase);
  }
}

export function createGEGIN7EmploymentService(supabase: SupabaseClient): GEGIN7EmploymentService {
  return new GEGIN7EmploymentService(supabase);
}
