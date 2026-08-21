import type { SupabaseClient } from '@supabase/supabase-js';
import type { NgoPartner, NgoPartnerCreate } from '@educi/types';
import { GovNgoPartnerNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFinanceNgoPartnerService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<NgoPartner> {
    const item = await this.repo.findNgoPartnerById(schoolId, id);
    if (!item) throw new GovNgoPartnerNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<NgoPartner[]> {
    return this.repo.findAllNgoPartners(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<NgoPartnerCreate>): Promise<NgoPartner> {
    return this.repo.createNgoPartner(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<NgoPartnerCreate>): Promise<NgoPartner> {
    const existing = await this.repo.findNgoPartnerById(schoolId, id);
    if (!existing) throw new GovNgoPartnerNotFoundError(id);
    return this.repo.updateNgoPartner(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNgoPartnerById(schoolId, id);
    if (!existing) throw new GovNgoPartnerNotFoundError(id);
    return this.repo.deleteNgoPartner(schoolId, id);
  }
}
