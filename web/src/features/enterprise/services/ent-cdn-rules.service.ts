// Enterprise Platform Service - CdnRules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCdnRuleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCdnRule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCdnRuleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCdnRules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCdnRules(schoolId, filters);
  }
  async createCdnRule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCdnRule(schoolId, data);
  }
  async updateCdnRule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCdnRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCdnRule(schoolId, id, data);
  }
  async deleteCdnRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCdnRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCdnRule(schoolId, id);
  }
  async countCdnRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCdnRules(schoolId, filters);
  }
}
