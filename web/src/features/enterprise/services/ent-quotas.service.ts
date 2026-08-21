// Enterprise Platform Service - Quotas
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntQuotaService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getQuota(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findQuotaById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listQuotas(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllQuotas(schoolId, filters);
  }
  async createQuota(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createQuota(schoolId, data);
  }
  async updateQuota(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findQuotaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateQuota(schoolId, id, data);
  }
  async deleteQuota(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQuotaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteQuota(schoolId, id);
  }
  async countQuotas(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countQuotas(schoolId, filters);
  }
}
