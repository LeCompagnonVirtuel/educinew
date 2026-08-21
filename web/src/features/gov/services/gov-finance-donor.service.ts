import type { SupabaseClient } from '@supabase/supabase-js';
import type { Donor, DonorCreate } from '@educi/types';
import { GovDonorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFinanceDonorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Donor> {
    const item = await this.repo.findDonorById(schoolId, id);
    if (!item) throw new GovDonorNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Donor[]> {
    return this.repo.findAllDonors(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<DonorCreate>): Promise<Donor> {
    return this.repo.createDonor(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<DonorCreate>): Promise<Donor> {
    const existing = await this.repo.findDonorById(schoolId, id);
    if (!existing) throw new GovDonorNotFoundError(id);
    return this.repo.updateDonor(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDonorById(schoolId, id);
    if (!existing) throw new GovDonorNotFoundError(id);
    return this.repo.deleteDonor(schoolId, id);
  }
}
