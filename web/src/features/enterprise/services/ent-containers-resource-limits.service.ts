// Enterprise Platform Service - ContainersResourceLimits
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntContainerResourceLimitService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getContainersResourceLimit(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findContainersResourceLimitById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listContainersResourceLimits(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllContainersResourceLimits(schoolId, filters);
  }
  async createContainersResourceLimit(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createContainersResourceLimit(schoolId, data);
  }
  async updateContainersResourceLimit(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findContainersResourceLimitById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateContainersResourceLimit(schoolId, id, data);
  }
  async deleteContainersResourceLimit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findContainersResourceLimitById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteContainersResourceLimit(schoolId, id);
  }
  async countContainersResourceLimits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countContainersResourceLimits(schoolId, filters);
  }
}
