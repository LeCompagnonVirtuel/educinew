// Government & National Governance Service - DonorReporting
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DonorReporting, DonorReportingCreate } from '@educi/types';
import { GovDonorReportingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDonorReportingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDonorReporting(schoolId: string, id: string): Promise<DonorReporting> {
    const item = await this.repo.findDonorReportingById(schoolId, id);
    if (!item) throw new GovDonorReportingNotFoundError(id);
    return item;
  }

  async listDonorReportings(schoolId: string, filters?: Record<string, unknown>): Promise<DonorReporting[]> {
    return this.repo.findAllDonorReportings(schoolId, filters);
  }

  async createDonorReporting(schoolId: string, data: DonorReportingCreate): Promise<DonorReporting> {
    return this.repo.createDonorReporting(schoolId, data);
  }

  async updateDonorReporting(schoolId: string, id: string, data: Partial<DonorReportingCreate>): Promise<DonorReporting> {
    const existing = await this.repo.findDonorReportingById(schoolId, id);
    if (!existing) throw new GovDonorReportingNotFoundError(id);
    return this.repo.updateDonorReporting(schoolId, id, data);
  }

  async deleteDonorReporting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDonorReportingById(schoolId, id);
    if (!existing) throw new GovDonorReportingNotFoundError(id);
    return this.repo.deleteDonorReporting(schoolId, id);
  }

  async countDonorReportings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDonorReportings(schoolId, filters);
  }
}
