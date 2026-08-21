import { SupabaseClient } from '@supabase/supabase-js';
import { GlobalIdentityService } from './gei2p-identity-global-identity.service';

export interface Identity {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilityIdentityService {
  private readonly identityService: GlobalIdentityService;

  constructor(supabase: SupabaseClient) {
    this.identityService = new GlobalIdentityService(supabase);
  }

  async listIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<Identity[]> {
    return this.identityService.listEntities(schoolId, filters) as Promise<Identity[]>;
  }

  async getIdentity(schoolId: string, id: string): Promise<Identity | null> {
    const entity = await this.identityService.getEntity(id);
    if (entity && (entity as Identity).school_id === schoolId) return entity as Identity;
    return null;
  }

  async createIdentity(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Identity | null> {
    return this.identityService.createEntity({ ...data, school_id: schoolId, user_id: userId } as Parameters<GlobalIdentityService['createEntity']>[0]) as Promise<Identity | null>;
  }

  async updateIdentity(schoolId: string, id: string, data: Record<string, unknown>): Promise<Identity | null> {
    const entity = await this.identityService.getEntity(id);
    if (!entity || (entity as Identity).school_id !== schoolId) return null;
    return this.identityService.updateEntity(id, data as Parameters<GlobalIdentityService['updateEntity']>[1]) as Promise<Identity | null>;
  }

  async deleteIdentity(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.identityService.getEntity(id);
    if (!entity || (entity as Identity).school_id !== schoolId) return false;
    return this.identityService.deleteEntity(id);
  }
}
