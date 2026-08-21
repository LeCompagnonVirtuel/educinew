// Enterprise Platform Service - DataArchive
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataArchive, DataArchiveCreate } from '@educi/types';
import { EntDataArchiveNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataArchiveService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataArchive(schoolId: string, id: string): Promise<DataArchive> {
    const item = await this.repo.findDataArchiveById(schoolId, id);
    if (!item) throw new EntDataArchiveNotFoundError(id);
    return item;
  }
  async listDataArchives(schoolId: string, filters?: Record<string, unknown>): Promise<DataArchive[]> {
    return this.repo.findAllDataArchives(schoolId, filters);
  }
  async createDataArchive(schoolId: string, data: DataArchiveCreate): Promise<DataArchive> {
    return this.repo.createDataArchive(schoolId, data);
  }
  async updateDataArchive(schoolId: string, id: string, data: Partial<DataArchiveCreate>): Promise<DataArchive> {
    const existing = await this.repo.findDataArchiveById(schoolId, id);
    if (!existing) throw new EntDataArchiveNotFoundError(id);
    return this.repo.updateDataArchive(schoolId, id, data);
  }
  async deleteDataArchive(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataArchiveById(schoolId, id);
    if (!existing) throw new EntDataArchiveNotFoundError(id);
    return this.repo.deleteDataArchive(schoolId, id);
  }
  async countDataArchives(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataArchives(schoolId, filters);
  }
}
