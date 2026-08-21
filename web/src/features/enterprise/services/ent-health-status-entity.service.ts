// Enterprise Platform Service - HealthStatusEntity
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { HealthStatusEntity, HealthStatusEntityCreate } from '@educi/types';
import { EntHealthStatusNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntHealthStatusEntityService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getHealthStatusEntity(schoolId: string, id: string): Promise<HealthStatusEntity> {
    const item = await this.repo.findHealthStatusEntityById(schoolId, id);
    if (!item) throw new EntHealthStatusNotFoundError(id);
    return item;
  }
  async listHealthStatusEntitys(schoolId: string, filters?: Record<string, unknown>): Promise<HealthStatusEntity[]> {
    return this.repo.findAllHealthStatusEntitys(schoolId, filters);
  }
  async createHealthStatusEntity(schoolId: string, data: HealthStatusEntityCreate): Promise<HealthStatusEntity> {
    return this.repo.createHealthStatusEntity(schoolId, data);
  }
  async updateHealthStatusEntity(schoolId: string, id: string, data: Partial<HealthStatusEntityCreate>): Promise<HealthStatusEntity> {
    const existing = await this.repo.findHealthStatusEntityById(schoolId, id);
    if (!existing) throw new EntHealthStatusNotFoundError(id);
    return this.repo.updateHealthStatusEntity(schoolId, id, data);
  }
  async deleteHealthStatusEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findHealthStatusEntityById(schoolId, id);
    if (!existing) throw new EntHealthStatusNotFoundError(id);
    return this.repo.deleteHealthStatusEntity(schoolId, id);
  }
  async countHealthStatusEntitys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countHealthStatusEntitys(schoolId, filters);
  }
}
