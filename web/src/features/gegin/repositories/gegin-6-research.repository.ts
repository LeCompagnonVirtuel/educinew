import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-6: Research — Research Management Framework
// ============================================================================

export interface GEGINResearchProject extends BaseEntity {
  title: string;
  description: string;
  principal_investigator_id: string;
  co_investigators: string[];
  institution_id: string;
  type: 'basic' | 'applied' | 'development' | 'interdisciplinary';
  status: 'proposed' | 'approved' | 'active' | 'completed' | 'suspended' | 'cancelled';
  start_date: string;
  end_date?: string;
  budget: number;
  spent: number;
  funding_source?: string;
  ethics_approval_status: 'pending' | 'approved' | 'rejected';
  metadata: Record<string, unknown>;
}

export interface GEGINPublication extends BaseEntity {
  title: string;
  abstract: string;
  authors: string[];
  type: 'article' | 'thesis' | 'report' | 'conference' | 'patent' | 'book' | 'other';
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'published' | 'rejected';
  journal?: string;
  doi?: string;
  isbn?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publication_date?: string;
  keywords: string[];
  funding_source?: string;
  document_url?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINPeerReview extends BaseEntity {
  publication_id: string;
  reviewer_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  recommendation: 'accept' | 'minor_revision' | 'major_revision' | 'reject';
  comments?: string;
  submitted_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINGrant extends BaseEntity {
  name: string;
  provider: string;
  type: 'research' | 'capacity_building' | 'infrastructure' | 'other';
  amount: number;
  currency: string;
  eligibility_criteria: Record<string, unknown>;
  application_deadline: string;
  status: 'open' | 'closed' | 'under_review' | 'awarded';
  metadata: Record<string, unknown>;
}

export interface GEGINPatent extends BaseEntity {
  title: string;
  description: string;
  inventors: string[];
  filing_date: string;
  grant_date?: string;
  patent_number?: string;
  jurisdiction: string;
  status: 'filed' | 'pending' | 'granted' | 'rejected' | 'expired';
  technology_area: string;
  metadata: Record<string, unknown>;
}

export interface GEGINCollaboration extends BaseEntity {
  title: string;
  description: string;
  lead_institution_id: string;
  partner_institutions: string[];
  type: 'research' | 'academic' | 'industry' | 'government';
  status: 'proposed' | 'active' | 'completed' | 'suspended';
  start_date: string;
  end_date?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINEthicsReview extends BaseEntity {
  project_id: string;
  submitted_by: string;
  review_board: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'conditional';
  conditions?: string;
  submitted_at: string;
  reviewed_at?: string;
  expiry_date?: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN6_TABLE_NAMES: Record<string, string> = {
  GEGINResearchProject: 'gegin_research_projects',
  GEGINPublication: 'gegin_publications',
  GEGINPeerReview: 'gegin_peer_reviews',
  GEGINGrant: 'gegin_grants',
  GEGINPatent: 'gegin_patents',
  GEGINCollaboration: 'gegin_collaborations',
  GEGINEthicsReview: 'gegin_ethics_reviews',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN6Repository {
  researchProjects: CrudRepository<GEGINResearchProject>;
  publications: CrudRepository<GEGINPublication>;
  peerReviews: CrudRepository<GEGINPeerReview>;
  grants: CrudRepository<GEGINGrant>;
  patents: CrudRepository<GEGINPatent>;
  collaborations: CrudRepository<GEGINCollaboration>;
  ethicsReviews: CrudRepository<GEGINEthicsReview>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN6Repository(supabase: SupabaseClient): GEGIN6Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    researchProjects: crud<GEGINResearchProject>(GEGIN6_TABLE_NAMES.GEGINResearchProject),
    publications: crud<GEGINPublication>(GEGIN6_TABLE_NAMES.GEGINPublication),
    peerReviews: crud<GEGINPeerReview>(GEGIN6_TABLE_NAMES.GEGINPeerReview),
    grants: crud<GEGINGrant>(GEGIN6_TABLE_NAMES.GEGINGrant),
    patents: crud<GEGINPatent>(GEGIN6_TABLE_NAMES.GEGINPatent),
    collaborations: crud<GEGINCollaboration>(GEGIN6_TABLE_NAMES.GEGINCollaboration),
    ethicsReviews: crud<GEGINEthicsReview>(GEGIN6_TABLE_NAMES.GEGINEthicsReview),
  };
}
