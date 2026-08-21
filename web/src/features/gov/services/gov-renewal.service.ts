// Government & National Governance Service - Renewal
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Renewal, RenewalCreate } from '@educi/types';
import { GovRenewalNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRenewalService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRenewal(schoolId: string, id: string): Promise<Renewal> {
    const item = await this.repo.findRenewalById(schoolId, id);
    if (!item) throw new GovRenewalNotFoundError(id);
    return item;
  }

  async listRenewals(schoolId: string, filters?: Record<string, unknown>): Promise<Renewal[]> {
    return this.repo.findAllRenewals(schoolId, filters);
  }

  async createRenewal(schoolId: string, data: RenewalCreate): Promise<Renewal> {
    return this.repo.createRenewal(schoolId, data);
  }

  async updateRenewal(schoolId: string, id: string, data: Partial<RenewalCreate>): Promise<Renewal> {
    const existing = await this.repo.findRenewalById(schoolId, id);
    if (!existing) throw new GovRenewalNotFoundError(id);
    return this.repo.updateRenewal(schoolId, id, data);
  }

  async deleteRenewal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRenewalById(schoolId, id);
    if (!existing) throw new GovRenewalNotFoundError(id);
    return this.repo.deleteRenewal(schoolId, id);
  }

  async countRenewals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRenewals(schoolId, filters);
  }
}
