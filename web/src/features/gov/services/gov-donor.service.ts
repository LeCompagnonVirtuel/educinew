// Government & National Governance Service - Donor
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Donor, DonorCreate } from '@educi/types';
import { GovDonorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDonorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDonor(schoolId: string, id: string): Promise<Donor> {
    const item = await this.repo.findDonorById(schoolId, id);
    if (!item) throw new GovDonorNotFoundError(id);
    return item;
  }

  async listDonors(schoolId: string, filters?: Record<string, unknown>): Promise<Donor[]> {
    return this.repo.findAllDonors(schoolId, filters);
  }

  async createDonor(schoolId: string, data: DonorCreate): Promise<Donor> {
    return this.repo.createDonor(schoolId, data);
  }

  async updateDonor(schoolId: string, id: string, data: Partial<DonorCreate>): Promise<Donor> {
    const existing = await this.repo.findDonorById(schoolId, id);
    if (!existing) throw new GovDonorNotFoundError(id);
    return this.repo.updateDonor(schoolId, id, data);
  }

  async deleteDonor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDonorById(schoolId, id);
    if (!existing) throw new GovDonorNotFoundError(id);
    return this.repo.deleteDonor(schoolId, id);
  }

  async countDonors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDonors(schoolId, filters);
  }
}
