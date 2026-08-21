import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINExchange, GEGINVisa, GEGINAccommodation, GEGINScholarship, GEGINMobilityRecord, GEGIN5_TABLE_NAMES } from '../repositories/gegin-5-mobility.repository';
import { logger } from '@educi/logger';

export class GEGINExchangeService extends GEGINBaseService<GEGINExchange> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN5_TABLE_NAMES.GEGINExchange, moduleName: 'Exchange' });
  }
}

export class GEGINVisaService extends GEGINBaseService<GEGINVisa> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN5_TABLE_NAMES.GEGINVisa, moduleName: 'Visa' });
  }
}

export class GEGINAccommodationService extends GEGINBaseService<GEGINAccommodation> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN5_TABLE_NAMES.GEGINAccommodation, moduleName: 'Accommodation' });
  }
}

export class GEGINScholarshipService extends GEGINBaseService<GEGINScholarship> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN5_TABLE_NAMES.GEGINScholarship, moduleName: 'Scholarship' });
  }
}

export class GEGINMobilityRecordService extends GEGINBaseService<GEGINMobilityRecord> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN5_TABLE_NAMES.GEGINMobilityRecord, moduleName: 'MobilityRecord' });
  }
}

export class GEGIN5MobilityService {
  readonly exchanges: GEGINExchangeService;
  readonly visas: GEGINVisaService;
  readonly accommodations: GEGINAccommodationService;
  readonly scholarships: GEGINScholarshipService;
  readonly mobilityRecords: GEGINMobilityRecordService;

  constructor(supabase: SupabaseClient) {
    this.exchanges = new GEGINExchangeService(supabase);
    this.visas = new GEGINVisaService(supabase);
    this.accommodations = new GEGINAccommodationService(supabase);
    this.scholarships = new GEGINScholarshipService(supabase);
    this.mobilityRecords = new GEGINMobilityRecordService(supabase);
  }
}

export function createGEGIN5MobilityService(supabase: SupabaseClient): GEGIN5MobilityService {
  return new GEGIN5MobilityService(supabase);
}
