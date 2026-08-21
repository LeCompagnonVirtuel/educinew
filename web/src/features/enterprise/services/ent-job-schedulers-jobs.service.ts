// Enterprise Platform Service - JobSchedulersJobs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntScheduledJobService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getJobSchedulersJob(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findJobSchedulersJobById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listJobSchedulersJobs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllJobSchedulersJobs(schoolId, filters);
  }
  async createJobSchedulersJob(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createJobSchedulersJob(schoolId, data);
  }
  async updateJobSchedulersJob(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findJobSchedulersJobById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateJobSchedulersJob(schoolId, id, data);
  }
  async deleteJobSchedulersJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findJobSchedulersJobById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteJobSchedulersJob(schoolId, id);
  }
  async countJobSchedulersJobs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countJobSchedulersJobs(schoolId, filters);
  }
}
