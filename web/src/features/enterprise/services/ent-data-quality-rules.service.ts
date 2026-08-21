// Enterprise Platform Service - DataQualityRules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntQualityRuleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataQualityRule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataQualityRuleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataQualityRules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataQualityRules(schoolId, filters);
  }
  async createDataQualityRule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataQualityRule(schoolId, data);
  }
  async updateDataQualityRule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataQualityRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataQualityRule(schoolId, id, data);
  }
  async deleteDataQualityRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataQualityRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataQualityRule(schoolId, id);
  }
  async countDataQualityRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataQualityRules(schoolId, filters);
  }
}
