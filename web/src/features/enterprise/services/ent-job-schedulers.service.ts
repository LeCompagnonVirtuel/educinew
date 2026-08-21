// Enterprise Platform Service - JobSchedulers
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntJobSchedulerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getJobScheduler(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findJobSchedulerById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listJobSchedulers(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllJobSchedulers(schoolId, filters);
  }
  async createJobScheduler(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createJobScheduler(schoolId, data);
  }
  async updateJobScheduler(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findJobSchedulerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateJobScheduler(schoolId, id, data);
  }
  async deleteJobScheduler(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findJobSchedulerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteJobScheduler(schoolId, id);
  }
  async countJobSchedulers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countJobSchedulers(schoolId, filters);
  }
}
