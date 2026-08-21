// Enterprise Platform Service - APIUsage
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { APIUsage, APIUsageCreate } from '@educi/types';
import { EntApiUsageNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntApiUsageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getApiUsage(schoolId: string, id: string): Promise<APIUsage> {
    const item = await this.repo.findApiUsageById(schoolId, id);
    if (!item) throw new EntApiUsageNotFoundError(id);
    return item;
  }
  async listApiUsages(schoolId: string, filters?: Record<string, unknown>): Promise<APIUsage[]> {
    return this.repo.findAllApiUsages(schoolId, filters);
  }
  async createApiUsage(schoolId: string, data: APIUsageCreate): Promise<APIUsage> {
    return this.repo.createApiUsage(schoolId, data);
  }
  async updateApiUsage(schoolId: string, id: string, data: Partial<APIUsageCreate>): Promise<APIUsage> {
    const existing = await this.repo.findApiUsageById(schoolId, id);
    if (!existing) throw new EntApiUsageNotFoundError(id);
    return this.repo.updateApiUsage(schoolId, id, data);
  }
  async deleteApiUsage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findApiUsageById(schoolId, id);
    if (!existing) throw new EntApiUsageNotFoundError(id);
    return this.repo.deleteApiUsage(schoolId, id);
  }
  async countApiUsages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countApiUsages(schoolId, filters);
  }
}
