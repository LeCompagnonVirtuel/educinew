// Government & National Governance Service - DataRestore
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataRestore, DataRestoreCreate } from '@educi/types';
import { GovDataRestoreNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDataRestoreService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDataRestore(schoolId: string, id: string): Promise<DataRestore> {
    const item = await this.repo.findDataRestoreById(schoolId, id);
    if (!item) throw new GovDataRestoreNotFoundError(id);
    return item;
  }

  async listDataRestores(schoolId: string, filters?: Record<string, unknown>): Promise<DataRestore[]> {
    return this.repo.findAllDataRestores(schoolId, filters);
  }

  async createDataRestore(schoolId: string, data: DataRestoreCreate): Promise<DataRestore> {
    return this.repo.createDataRestore(schoolId, data);
  }

  async updateDataRestore(schoolId: string, id: string, data: Partial<DataRestoreCreate>): Promise<DataRestore> {
    const existing = await this.repo.findDataRestoreById(schoolId, id);
    if (!existing) throw new GovDataRestoreNotFoundError(id);
    return this.repo.updateDataRestore(schoolId, id, data);
  }

  async deleteDataRestore(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataRestoreById(schoolId, id);
    if (!existing) throw new GovDataRestoreNotFoundError(id);
    return this.repo.deleteDataRestore(schoolId, id);
  }

  async countDataRestores(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataRestores(schoolId, filters);
  }
}
