import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalPartnership, InternationalPartnershipCreate } from '@educi/types';
import { GovInternationalPartnershipNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovOpendataInternationalPartnershipService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InternationalPartnership> {
    const item = await this.repo.findInternationalPartnershipById(schoolId, id);
    if (!item) throw new GovInternationalPartnershipNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalPartnership[]> {
    return this.repo.findAllInternationalPartnerships(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InternationalPartnershipCreate>): Promise<InternationalPartnership> {
    return this.repo.createInternationalPartnership(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InternationalPartnershipCreate>): Promise<InternationalPartnership> {
    const existing = await this.repo.findInternationalPartnershipById(schoolId, id);
    if (!existing) throw new GovInternationalPartnershipNotFoundError(id);
    return this.repo.updateInternationalPartnership(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalPartnershipById(schoolId, id);
    if (!existing) throw new GovInternationalPartnershipNotFoundError(id);
    return this.repo.deleteInternationalPartnership(schoolId, id);
  }
}
