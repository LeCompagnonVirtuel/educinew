// Enterprise Platform Service - AlertRule
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AlertRule, AlertRuleCreate } from '@educi/types';
import { EntAlertRuleNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAlertRuleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAlertRule(schoolId: string, id: string): Promise<AlertRule> {
    const item = await this.repo.findAlertRuleById(schoolId, id);
    if (!item) throw new EntAlertRuleNotFoundError(id);
    return item;
  }
  async listAlertRules(schoolId: string, filters?: Record<string, unknown>): Promise<AlertRule[]> {
    return this.repo.findAllAlertRules(schoolId, filters);
  }
  async createAlertRule(schoolId: string, data: AlertRuleCreate): Promise<AlertRule> {
    return this.repo.createAlertRule(schoolId, data);
  }
  async updateAlertRule(schoolId: string, id: string, data: Partial<AlertRuleCreate>): Promise<AlertRule> {
    const existing = await this.repo.findAlertRuleById(schoolId, id);
    if (!existing) throw new EntAlertRuleNotFoundError(id);
    return this.repo.updateAlertRule(schoolId, id, data);
  }
  async deleteAlertRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAlertRuleById(schoolId, id);
    if (!existing) throw new EntAlertRuleNotFoundError(id);
    return this.repo.deleteAlertRule(schoolId, id);
  }
  async countAlertRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAlertRules(schoolId, filters);
  }
}
