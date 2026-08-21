// Enterprise Platform Service - EtlJobs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEtlJobService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEtlJob(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findEtlJobById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listEtlJobs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllEtlJobs(schoolId, filters);
  }
  async createEtlJob(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createEtlJob(schoolId, data);
  }
  async updateEtlJob(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findEtlJobById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateEtlJob(schoolId, id, data);
  }
  async deleteEtlJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEtlJobById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteEtlJob(schoolId, id);
  }
  async countEtlJobs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEtlJobs(schoolId, filters);
  }
}
