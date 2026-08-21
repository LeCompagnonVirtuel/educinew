// Enterprise Platform Service - DataMaskingRules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataMaskingRuleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataMaskingRule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataMaskingRuleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataMaskingRules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataMaskingRules(schoolId, filters);
  }
  async createDataMaskingRule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataMaskingRule(schoolId, data);
  }
  async updateDataMaskingRule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataMaskingRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataMaskingRule(schoolId, id, data);
  }
  async deleteDataMaskingRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataMaskingRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataMaskingRule(schoolId, id);
  }
  async countDataMaskingRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataMaskingRules(schoolId, filters);
  }
}
