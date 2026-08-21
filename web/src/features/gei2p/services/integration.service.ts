import { SupabaseClient } from '@supabase/supabase-js';
import { IntegrationService } from './gei2p-connectors-integration.service';

export interface Integration {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilityIntegrationService {
  private readonly integrationService: IntegrationService;

  constructor(supabase: SupabaseClient) {
    this.integrationService = new IntegrationService(supabase);
  }

  async listIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<Integration[]> {
    return this.integrationService.listEntities(schoolId, filters) as Promise<Integration[]>;
  }

  async getIntegration(schoolId: string, id: string): Promise<Integration | null> {
    const entity = await this.integrationService.getEntity(id);
    if (entity && (entity as Integration).school_id === schoolId) return entity as Integration;
    return null;
  }

  async createIntegration(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Integration | null> {
    return this.integrationService.createEntity({ ...data, school_id: schoolId } as Parameters<IntegrationService['createEntity']>[0]) as Promise<Integration | null>;
  }

  async updateIntegration(schoolId: string, id: string, data: Record<string, unknown>): Promise<Integration | null> {
    const entity = await this.integrationService.getEntity(id);
    if (!entity || (entity as Integration).school_id !== schoolId) return null;
    return this.integrationService.updateEntity(id, data as Parameters<IntegrationService['updateEntity']>[1]) as Promise<Integration | null>;
  }

  async deleteIntegration(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.integrationService.getEntity(id);
    if (!entity || (entity as Integration).school_id !== schoolId) return false;
    return this.integrationService.deleteEntity(id);
  }
}
