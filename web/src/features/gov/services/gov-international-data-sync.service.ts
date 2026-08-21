// Government & National Governance Service - InternationalDataSync
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalDataSync, InternationalDataSyncCreate } from '@educi/types';
import { GovInternationalDataSyncNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInternationalDataSyncService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInternationalDataSync(schoolId: string, id: string): Promise<InternationalDataSync> {
    const item = await this.repo.findInternationalDataSyncById(schoolId, id);
    if (!item) throw new GovInternationalDataSyncNotFoundError(id);
    return item;
  }

  async listInternationalDataSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalDataSync[]> {
    return this.repo.findAllInternationalDataSyncs(schoolId, filters);
  }

  async createInternationalDataSync(schoolId: string, data: InternationalDataSyncCreate): Promise<InternationalDataSync> {
    return this.repo.createInternationalDataSync(schoolId, data);
  }

  async updateInternationalDataSync(schoolId: string, id: string, data: Partial<InternationalDataSyncCreate>): Promise<InternationalDataSync> {
    const existing = await this.repo.findInternationalDataSyncById(schoolId, id);
    if (!existing) throw new GovInternationalDataSyncNotFoundError(id);
    return this.repo.updateInternationalDataSync(schoolId, id, data);
  }

  async deleteInternationalDataSync(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalDataSyncById(schoolId, id);
    if (!existing) throw new GovInternationalDataSyncNotFoundError(id);
    return this.repo.deleteInternationalDataSync(schoolId, id);
  }

  async countInternationalDataSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInternationalDataSyncs(schoolId, filters);
  }
}
