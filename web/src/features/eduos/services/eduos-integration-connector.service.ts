import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntegrationConnector } from '@educi/types';
import { EduOSIntegrationConnectorError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSIntegrationConnectorService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getIntegrationConnector(schoolId: string, id: string): Promise<IntegrationConnector> {
    const item = await this.repo.getIntegrationConnector(schoolId, id);
    if (!item) throw new EduOSIntegrationConnectorError(id);
    return item;
  }
  async listIntegrationConnectors(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationConnector[]> {
    return this.repo.listIntegrationConnectors(schoolId, filters);
  }
  async createIntegrationConnector(schoolId: string, data: Partial<IntegrationConnector>): Promise<IntegrationConnector> {
    return this.repo.createIntegrationConnector(schoolId, data as any);
  }
  async updateIntegrationConnector(schoolId: string, id: string, data: Partial<IntegrationConnector>): Promise<IntegrationConnector> {
    const existing = await this.repo.getIntegrationConnector(schoolId, id);
    if (!existing) throw new EduOSIntegrationConnectorError(id);
    return this.repo.updateIntegrationConnector(schoolId, id, data as any);
  }
  async deleteIntegrationConnector(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIntegrationConnector(schoolId, id);
    if (!existing) throw new EduOSIntegrationConnectorError(id);
    return this.repo.deleteIntegrationConnector(schoolId, id);
  }
}

