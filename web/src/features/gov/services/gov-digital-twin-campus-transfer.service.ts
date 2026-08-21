import type { SupabaseClient } from '@supabase/supabase-js';
import type { CampusTransfer, CampusTransferCreate } from '@educi/types';
import { GovCampusTransferNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDigitalTwinCampusTransferService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<CampusTransfer> {
    const item = await this.repo.findCampusTransferById(schoolId, id);
    if (!item) throw new GovCampusTransferNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<CampusTransfer[]> {
    return this.repo.findAllCampusTransfers(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CampusTransferCreate>): Promise<CampusTransfer> {
    return this.repo.createCampusTransfer(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CampusTransferCreate>): Promise<CampusTransfer> {
    const existing = await this.repo.findCampusTransferById(schoolId, id);
    if (!existing) throw new GovCampusTransferNotFoundError(id);
    return this.repo.updateCampusTransfer(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusTransferById(schoolId, id);
    if (!existing) throw new GovCampusTransferNotFoundError(id);
    return this.repo.deleteCampusTransfer(schoolId, id);
  }
}
