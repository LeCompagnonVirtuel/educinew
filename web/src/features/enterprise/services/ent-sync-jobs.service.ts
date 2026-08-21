// Enterprise Platform Service - SyncJobs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSyncJobService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSyncJob(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSyncJobById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSyncJobs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSyncJobs(schoolId, filters);
  }
  async createSyncJob(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSyncJob(schoolId, data);
  }
  async updateSyncJob(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSyncJobById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSyncJob(schoolId, id, data);
  }
  async deleteSyncJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSyncJobById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSyncJob(schoolId, id);
  }
  async countSyncJobs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSyncJobs(schoolId, filters);
  }
}
