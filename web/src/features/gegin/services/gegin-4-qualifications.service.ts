import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINQualification, GEGINQualificationFramework, GEGINSkill, GEGINCompetency, GEGINEquivalence, GEGINCreditTransfer, GEGINRecognition, GEGIN4_TABLE_NAMES } from '../repositories/gegin-4-qualifications.repository';
import { logger } from '@educi/logger';

export class GEGINQualificationService extends GEGINBaseService<GEGINQualification> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN4_TABLE_NAMES.GEGINQualification, moduleName: 'Qualification' });
  }
}

export class GEGINQualificationFrameworkService extends GEGINBaseService<GEGINQualificationFramework> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN4_TABLE_NAMES.GEGINQualificationFramework, moduleName: 'QualificationFramework' });
  }
}

export class GEGINSkillService extends GEGINBaseService<GEGINSkill> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN4_TABLE_NAMES.GEGINSkill, moduleName: 'Skill' });
  }
}

export class GEGINCompetencyService extends GEGINBaseService<GEGINCompetency> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN4_TABLE_NAMES.GEGINCompetency, moduleName: 'Competency' });
  }
}

export class GEGINEquivalenceService extends GEGINBaseService<GEGINEquivalence> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN4_TABLE_NAMES.GEGINEquivalence, moduleName: 'Equivalence' });
  }
}

export class GEGINCreditTransferService extends GEGINBaseService<GEGINCreditTransfer> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN4_TABLE_NAMES.GEGINCreditTransfer, moduleName: 'CreditTransfer' });
  }
}

export class GEGINRecognitionService extends GEGINBaseService<GEGINRecognition> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN4_TABLE_NAMES.GEGINRecognition, moduleName: 'Recognition' });
  }
}

export class GEGIN4QualificationsService {
  readonly qualifications: GEGINQualificationService;
  readonly frameworks: GEGINQualificationFrameworkService;
  readonly skills: GEGINSkillService;
  readonly competencies: GEGINCompetencyService;
  readonly equivalences: GEGINEquivalenceService;
  readonly creditTransfers: GEGINCreditTransferService;
  readonly recognitions: GEGINRecognitionService;

  constructor(supabase: SupabaseClient) {
    this.qualifications = new GEGINQualificationService(supabase);
    this.frameworks = new GEGINQualificationFrameworkService(supabase);
    this.skills = new GEGINSkillService(supabase);
    this.competencies = new GEGINCompetencyService(supabase);
    this.equivalences = new GEGINEquivalenceService(supabase);
    this.creditTransfers = new GEGINCreditTransferService(supabase);
    this.recognitions = new GEGINRecognitionService(supabase);
  }
}

export function createGEGIN4QualificationsService(supabase: SupabaseClient): GEGIN4QualificationsService {
  return new GEGIN4QualificationsService(supabase);
}
