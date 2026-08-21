import { SupabaseClient } from '@supabase/supabase-js';
import { CredentialIssuanceService } from './gei2p-credentials-credential-issuance.service';

export interface Credential {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilityCredentialService {
  private readonly credentialService: CredentialIssuanceService;

  constructor(supabase: SupabaseClient) {
    this.credentialService = new CredentialIssuanceService(supabase);
  }

  async listCredentials(schoolId: string, filters?: Record<string, unknown>): Promise<Credential[]> {
    return this.credentialService.listEntities(schoolId, filters) as Promise<Credential[]>;
  }

  async getCredential(schoolId: string, id: string): Promise<Credential | null> {
    const entity = await this.credentialService.getEntity(id);
    if (entity && (entity as Credential).school_id === schoolId) return entity as Credential;
    return null;
  }

  async createCredential(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Credential | null> {
    return this.credentialService.createEntity({ ...data, school_id: schoolId } as Parameters<CredentialIssuanceService['createEntity']>[0]) as Promise<Credential | null>;
  }

  async updateCredential(schoolId: string, id: string, data: Record<string, unknown>): Promise<Credential | null> {
    const entity = await this.credentialService.getEntity(id);
    if (!entity || (entity as Credential).school_id !== schoolId) return null;
    return this.credentialService.updateEntity(id, data as Parameters<CredentialIssuanceService['updateEntity']>[1]) as Promise<Credential | null>;
  }

  async deleteCredential(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.credentialService.getEntity(id);
    if (!entity || (entity as Credential).school_id !== schoolId) return false;
    return this.credentialService.deleteEntity(id);
  }
}
