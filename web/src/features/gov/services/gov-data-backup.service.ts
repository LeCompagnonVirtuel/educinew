// Government & National Governance Service - DataBackup
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataBackup, DataBackupCreate } from '@educi/types';
import { GovDataBackupNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDataBackupService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDataBackup(schoolId: string, id: string): Promise<DataBackup> {
    const item = await this.repo.findDataBackupById(schoolId, id);
    if (!item) throw new GovDataBackupNotFoundError(id);
    return item;
  }

  async listDataBackups(schoolId: string, filters?: Record<string, unknown>): Promise<DataBackup[]> {
    return this.repo.findAllDataBackups(schoolId, filters);
  }

  async createDataBackup(schoolId: string, data: DataBackupCreate): Promise<DataBackup> {
    return this.repo.createDataBackup(schoolId, data);
  }

  async updateDataBackup(schoolId: string, id: string, data: Partial<DataBackupCreate>): Promise<DataBackup> {
    const existing = await this.repo.findDataBackupById(schoolId, id);
    if (!existing) throw new GovDataBackupNotFoundError(id);
    return this.repo.updateDataBackup(schoolId, id, data);
  }

  async deleteDataBackup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataBackupById(schoolId, id);
    if (!existing) throw new GovDataBackupNotFoundError(id);
    return this.repo.deleteDataBackup(schoolId, id);
  }

  async countDataBackups(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataBackups(schoolId, filters);
  }
}
