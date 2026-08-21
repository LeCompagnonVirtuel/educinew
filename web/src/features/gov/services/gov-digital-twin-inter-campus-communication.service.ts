import type { SupabaseClient } from '@supabase/supabase-js';
import type { InterCampusCommunication, InterCampusCommunicationCreate } from '@educi/types';
import { GovInterCampusCommunicationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDigitalTwinInterCampusCommunicationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InterCampusCommunication> {
    const item = await this.repo.findInterCampusCommunicationById(schoolId, id);
    if (!item) throw new GovInterCampusCommunicationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InterCampusCommunication[]> {
    return this.repo.findAllInterCampusCommunications(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InterCampusCommunicationCreate>): Promise<InterCampusCommunication> {
    return this.repo.createInterCampusCommunication(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InterCampusCommunicationCreate>): Promise<InterCampusCommunication> {
    const existing = await this.repo.findInterCampusCommunicationById(schoolId, id);
    if (!existing) throw new GovInterCampusCommunicationNotFoundError(id);
    return this.repo.updateInterCampusCommunication(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInterCampusCommunicationById(schoolId, id);
    if (!existing) throw new GovInterCampusCommunicationNotFoundError(id);
    return this.repo.deleteInterCampusCommunication(schoolId, id);
  }
}
