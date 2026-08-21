// Enterprise Platform Service - WorkerPools
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntWorkerPoolService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getWorkerPool(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findWorkerPoolById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listWorkerPools(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllWorkerPools(schoolId, filters);
  }
  async createWorkerPool(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createWorkerPool(schoolId, data);
  }
  async updateWorkerPool(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findWorkerPoolById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateWorkerPool(schoolId, id, data);
  }
  async deleteWorkerPool(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWorkerPoolById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteWorkerPool(schoolId, id);
  }
  async countWorkerPools(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWorkerPools(schoolId, filters);
  }
}
