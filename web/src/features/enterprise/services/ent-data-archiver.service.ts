// Enterprise Platform Service - DataArchiver
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataArchiver, DataArchiverCreate } from '@educi/types';
import { EntDataArchiverNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataArchiverService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataArchiver(schoolId: string, id: string): Promise<DataArchiver> {
    const item = await this.repo.findDataArchiverById(schoolId, id);
    if (!item) throw new EntDataArchiverNotFoundError(id);
    return item;
  }
  async listDataArchivers(schoolId: string, filters?: Record<string, unknown>): Promise<DataArchiver[]> {
    return this.repo.findAllDataArchivers(schoolId, filters);
  }
  async createDataArchiver(schoolId: string, data: DataArchiverCreate): Promise<DataArchiver> {
    return this.repo.createDataArchiver(schoolId, data);
  }
  async updateDataArchiver(schoolId: string, id: string, data: Partial<DataArchiverCreate>): Promise<DataArchiver> {
    const existing = await this.repo.findDataArchiverById(schoolId, id);
    if (!existing) throw new EntDataArchiverNotFoundError(id);
    return this.repo.updateDataArchiver(schoolId, id, data);
  }
  async deleteDataArchiver(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataArchiverById(schoolId, id);
    if (!existing) throw new EntDataArchiverNotFoundError(id);
    return this.repo.deleteDataArchiver(schoolId, id);
  }
  async countDataArchivers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataArchivers(schoolId, filters);
  }
}
