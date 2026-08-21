import { SupabaseClient } from '@supabase/supabase-js';
import { ConnectorService, Connector } from './gei2p-connectors-connector.service';

export class InteroperabilityConnectorService {
  private readonly connectorService: ConnectorService;

  constructor(supabase: SupabaseClient) {
    this.connectorService = new ConnectorService(supabase);
  }

  async listConnectors(schoolId: string, filters?: Record<string, unknown>): Promise<Connector[]> {
    return this.connectorService.listEntities(schoolId, filters as { status?: string; connector_type?: string; limit?: number; offset?: number });
  }

  async getConnector(schoolId: string, id: string): Promise<Connector | null> {
    const entity = await this.connectorService.getEntity(id);
    if (entity && entity.school_id === schoolId) return entity;
    return null;
  }

  async createConnector(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Connector | null> {
    return this.connectorService.createEntity({ ...data, school_id: schoolId } as Parameters<ConnectorService['createEntity']>[0]);
  }

  async updateConnector(schoolId: string, id: string, data: Record<string, unknown>): Promise<Connector | null> {
    const entity = await this.connectorService.getEntity(id);
    if (!entity || entity.school_id !== schoolId) return null;
    return this.connectorService.updateEntity(id, data as Parameters<ConnectorService['updateEntity']>[1]);
  }

  async deleteConnector(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.connectorService.getEntity(id);
    if (!entity || entity.school_id !== schoolId) return false;
    return this.connectorService.deleteEntity(id);
  }
}
