// Enterprise Platform Service - IngressRules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIngressRuleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIngressRule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findIngressRuleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listIngressRules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllIngressRules(schoolId, filters);
  }
  async createIngressRule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createIngressRule(schoolId, data);
  }
  async updateIngressRule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findIngressRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateIngressRule(schoolId, id, data);
  }
  async deleteIngressRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIngressRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteIngressRule(schoolId, id);
  }
  async countIngressRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIngressRules(schoolId, filters);
  }
}
