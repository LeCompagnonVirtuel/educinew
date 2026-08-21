import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINResearchProject, GEGINPublication, GEGINPeerReview, GEGINGrant, GEGINPatent, GEGINCollaboration, GEGINEthicsReview, GEGIN6_TABLE_NAMES } from '../repositories/gegin-6-research.repository';
import { logger } from '@educi/logger';

export class GEGINResearchProjectService extends GEGINBaseService<GEGINResearchProject> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN6_TABLE_NAMES.GEGINResearchProject, moduleName: 'ResearchProject' });
  }
}

export class GEGINPublicationService extends GEGINBaseService<GEGINPublication> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN6_TABLE_NAMES.GEGINPublication, moduleName: 'Publication' });
  }
}

export class GEGINPeerReviewService extends GEGINBaseService<GEGINPeerReview> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN6_TABLE_NAMES.GEGINPeerReview, moduleName: 'PeerReview' });
  }
}

export class GEGINGrantService extends GEGINBaseService<GEGINGrant> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN6_TABLE_NAMES.GEGINGrant, moduleName: 'Grant' });
  }
}

export class GEGINPatentService extends GEGINBaseService<GEGINPatent> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN6_TABLE_NAMES.GEGINPatent, moduleName: 'Patent' });
  }
}

export class GEGINCollaborationService extends GEGINBaseService<GEGINCollaboration> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN6_TABLE_NAMES.GEGINCollaboration, moduleName: 'Collaboration' });
  }
}

export class GEGINEthicsReviewService extends GEGINBaseService<GEGINEthicsReview> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN6_TABLE_NAMES.GEGINEthicsReview, moduleName: 'EthicsReview' });
  }
}

export class GEGIN6ResearchService {
  readonly researchProjects: GEGINResearchProjectService;
  readonly publications: GEGINPublicationService;
  readonly peerReviews: GEGINPeerReviewService;
  readonly grants: GEGINGrantService;
  readonly patents: GEGINPatentService;
  readonly collaborations: GEGINCollaborationService;
  readonly ethicsReviews: GEGINEthicsReviewService;

  constructor(supabase: SupabaseClient) {
    this.researchProjects = new GEGINResearchProjectService(supabase);
    this.publications = new GEGINPublicationService(supabase);
    this.peerReviews = new GEGINPeerReviewService(supabase);
    this.grants = new GEGINGrantService(supabase);
    this.patents = new GEGINPatentService(supabase);
    this.collaborations = new GEGINCollaborationService(supabase);
    this.ethicsReviews = new GEGINEthicsReviewService(supabase);
  }
}

export function createGEGIN6ResearchService(supabase: SupabaseClient): GEGIN6ResearchService {
  return new GEGIN6ResearchService(supabase);
}
