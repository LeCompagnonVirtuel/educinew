import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-5: Mobility — Student & Staff Mobility Framework
// ============================================================================

export interface GEGINExchange extends BaseEntity {
  student_id: string;
  origin_institution: string;
  destination_institution: string;
  program: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'active' | 'completed' | 'cancelled';
  credits_transferred?: number;
  agreement_url?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINVisa extends BaseEntity {
  user_id: string;
  country_code: string;
  visa_type: 'student' | 'work' | 'research' | 'other';
  application_date: string;
  issue_date?: string;
  expiry_date?: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  document_url?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINAccommodation extends BaseEntity {
  user_id: string;
  exchange_id?: string;
  type: 'dormitory' | 'homestay' | 'apartment' | 'other';
  address: string;
  start_date: string;
  end_date: string;
  monthly_cost: number;
  currency: string;
  status: 'reserved' | 'active' | 'completed' | 'cancelled';
  metadata: Record<string, unknown>;
}

export interface GEGINScholarship extends BaseEntity {
  name: string;
  provider: string;
  type: 'full' | 'partial' | 'tuition_only' | 'living_expenses';
  amount: number;
  currency: string;
  eligibility_criteria: Record<string, unknown>;
  application_deadline: string;
  status: 'open' | 'closed' | 'under_review';
  metadata: Record<string, unknown>;
}

export interface GEGINMobilityRecord extends BaseEntity {
  user_id: string;
  type: 'incoming' | 'outgoing' | 'virtual';
  institution: string;
  program: string;
  start_date: string;
  end_date?: string;
  credits_earned?: number;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  evaluation?: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN5_TABLE_NAMES: Record<string, string> = {
  GEGINExchange: 'gegin_exchanges',
  GEGINVisa: 'gegin_visas',
  GEGINAccommodation: 'gegin_accommodations',
  GEGINScholarship: 'gegin_scholarships',
  GEGINMobilityRecord: 'gegin_mobility_records',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN5Repository {
  exchanges: CrudRepository<GEGINExchange>;
  visas: CrudRepository<GEGINVisa>;
  accommodations: CrudRepository<GEGINAccommodation>;
  scholarships: CrudRepository<GEGINScholarship>;
  mobilityRecords: CrudRepository<GEGINMobilityRecord>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN5Repository(supabase: SupabaseClient): GEGIN5Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    exchanges: crud<GEGINExchange>(GEGIN5_TABLE_NAMES.GEGINExchange),
    visas: crud<GEGINVisa>(GEGIN5_TABLE_NAMES.GEGINVisa),
    accommodations: crud<GEGINAccommodation>(GEGIN5_TABLE_NAMES.GEGINAccommodation),
    scholarships: crud<GEGINScholarship>(GEGIN5_TABLE_NAMES.GEGINScholarship),
    mobilityRecords: crud<GEGINMobilityRecord>(GEGIN5_TABLE_NAMES.GEGINMobilityRecord),
  };
}
