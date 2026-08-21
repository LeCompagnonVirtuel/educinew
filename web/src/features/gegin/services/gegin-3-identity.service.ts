import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINPassport, GEGINCredential, GEGINBlockchainRecord, GEGINAuthMethod, GEGINBiometricData, GEGIN3_TABLE_NAMES } from '../repositories/gegin-3-identity.repository';
import { logger } from '@educi/logger';

export class GEGINPassportService extends GEGINBaseService<GEGINPassport> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN3_TABLE_NAMES.GEGINPassport, moduleName: 'Passport' });
  }
}

export class GEGINCredentialService extends GEGINBaseService<GEGINCredential> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN3_TABLE_NAMES.GEGINCredential, moduleName: 'Credential' });
  }
}

export class GEGINBlockchainRecordService extends GEGINBaseService<GEGINBlockchainRecord> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN3_TABLE_NAMES.GEGINBlockchainRecord, moduleName: 'BlockchainRecord' });
  }
}

export class GEGINAuthMethodService extends GEGINBaseService<GEGINAuthMethod> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN3_TABLE_NAMES.GEGINAuthMethod, moduleName: 'AuthMethod' });
  }
}

export class GEGINBiometricDataService extends GEGINBaseService<GEGINBiometricData> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN3_TABLE_NAMES.GEGINBiometricData, moduleName: 'BiometricData' });
  }
}

export class GEGIN3IdentityService {
  readonly passports: GEGINPassportService;
  readonly credentials: GEGINCredentialService;
  readonly blockchainRecords: GEGINBlockchainRecordService;
  readonly authMethods: GEGINAuthMethodService;
  readonly biometricData: GEGINBiometricDataService;

  constructor(supabase: SupabaseClient) {
    this.passports = new GEGINPassportService(supabase);
    this.credentials = new GEGINCredentialService(supabase);
    this.blockchainRecords = new GEGINBlockchainRecordService(supabase);
    this.authMethods = new GEGINAuthMethodService(supabase);
    this.biometricData = new GEGINBiometricDataService(supabase);
  }
}

export function createGEGIN3IdentityService(supabase: SupabaseClient): GEGIN3IdentityService {
  return new GEGIN3IdentityService(supabase);
}
