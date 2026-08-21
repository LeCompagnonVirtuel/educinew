// Government & National Governance Service - AccreditationRenewalProcessing
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccreditationRenewalProcessing, AccreditationRenewalProcessingCreate } from '@educi/types';
import { GovAccreditationRenewalProcessingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAccreditationRenewalProcessingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAccreditationRenewalProcessing(schoolId: string, id: string): Promise<AccreditationRenewalProcessing> {
    const item = await this.repo.findAccreditationRenewalProcessingById(schoolId, id);
    if (!item) throw new GovAccreditationRenewalProcessingNotFoundError(id);
    return item;
  }

  async listAccreditationRenewalProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationRenewalProcessing[]> {
    return this.repo.findAllAccreditationRenewalProcessings(schoolId, filters);
  }

  async createAccreditationRenewalProcessing(schoolId: string, data: AccreditationRenewalProcessingCreate): Promise<AccreditationRenewalProcessing> {
    return this.repo.createAccreditationRenewalProcessing(schoolId, data);
  }

  async updateAccreditationRenewalProcessing(schoolId: string, id: string, data: Partial<AccreditationRenewalProcessingCreate>): Promise<AccreditationRenewalProcessing> {
    const existing = await this.repo.findAccreditationRenewalProcessingById(schoolId, id);
    if (!existing) throw new GovAccreditationRenewalProcessingNotFoundError(id);
    return this.repo.updateAccreditationRenewalProcessing(schoolId, id, data);
  }

  async deleteAccreditationRenewalProcessing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationRenewalProcessingById(schoolId, id);
    if (!existing) throw new GovAccreditationRenewalProcessingNotFoundError(id);
    return this.repo.deleteAccreditationRenewalProcessing(schoolId, id);
  }

  async countAccreditationRenewalProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccreditationRenewalProcessings(schoolId, filters);
  }
}
