// Government & National Governance Service - InternationalPartnership
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalPartnership, InternationalPartnershipCreate } from '@educi/types';
import { GovInternationalPartnershipNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInternationalPartnershipService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInternationalPartnership(schoolId: string, id: string): Promise<InternationalPartnership> {
    const item = await this.repo.findInternationalPartnershipById(schoolId, id);
    if (!item) throw new GovInternationalPartnershipNotFoundError(id);
    return item;
  }

  async listInternationalPartnerships(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalPartnership[]> {
    return this.repo.findAllInternationalPartnerships(schoolId, filters);
  }

  async createInternationalPartnership(schoolId: string, data: InternationalPartnershipCreate): Promise<InternationalPartnership> {
    return this.repo.createInternationalPartnership(schoolId, data);
  }

  async updateInternationalPartnership(schoolId: string, id: string, data: Partial<InternationalPartnershipCreate>): Promise<InternationalPartnership> {
    const existing = await this.repo.findInternationalPartnershipById(schoolId, id);
    if (!existing) throw new GovInternationalPartnershipNotFoundError(id);
    return this.repo.updateInternationalPartnership(schoolId, id, data);
  }

  async deleteInternationalPartnership(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalPartnershipById(schoolId, id);
    if (!existing) throw new GovInternationalPartnershipNotFoundError(id);
    return this.repo.deleteInternationalPartnership(schoolId, id);
  }

  async countInternationalPartnerships(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInternationalPartnerships(schoolId, filters);
  }
}
