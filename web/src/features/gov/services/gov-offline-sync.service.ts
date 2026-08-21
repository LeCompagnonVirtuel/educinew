// Government & National Governance Service - OfflineSync
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { OfflineSync, OfflineSyncCreate } from '@educi/types';
import { GovOfflineSyncNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovOfflineSyncService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getOfflineSync(schoolId: string, id: string): Promise<OfflineSync> {
    const item = await this.repo.findOfflineSyncById(schoolId, id);
    if (!item) throw new GovOfflineSyncNotFoundError(id);
    return item;
  }

  async listOfflineSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<OfflineSync[]> {
    return this.repo.findAllOfflineSyncs(schoolId, filters);
  }

  async createOfflineSync(schoolId: string, data: OfflineSyncCreate): Promise<OfflineSync> {
    return this.repo.createOfflineSync(schoolId, data);
  }

  async updateOfflineSync(schoolId: string, id: string, data: Partial<OfflineSyncCreate>): Promise<OfflineSync> {
    const existing = await this.repo.findOfflineSyncById(schoolId, id);
    if (!existing) throw new GovOfflineSyncNotFoundError(id);
    return this.repo.updateOfflineSync(schoolId, id, data);
  }

  async deleteOfflineSync(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findOfflineSyncById(schoolId, id);
    if (!existing) throw new GovOfflineSyncNotFoundError(id);
    return this.repo.deleteOfflineSync(schoolId, id);
  }

  async countOfflineSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countOfflineSyncs(schoolId, filters);
  }
}
