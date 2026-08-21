// Enterprise Platform Service - AlertRules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAlertRuleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAlertRule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAlertRuleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAlertRules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAlertRules(schoolId, filters);
  }
  async createAlertRule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAlertRule(schoolId, data);
  }
  async updateAlertRule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAlertRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAlertRule(schoolId, id, data);
  }
  async deleteAlertRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAlertRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAlertRule(schoolId, id);
  }
  async countAlertRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAlertRules(schoolId, filters);
  }
}
