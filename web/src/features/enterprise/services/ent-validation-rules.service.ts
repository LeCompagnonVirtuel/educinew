// Enterprise Platform Service - ValidationRules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntValidationRuleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getValidationRule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findValidationRuleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listValidationRules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllValidationRules(schoolId, filters);
  }
  async createValidationRule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createValidationRule(schoolId, data);
  }
  async updateValidationRule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findValidationRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateValidationRule(schoolId, id, data);
  }
  async deleteValidationRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findValidationRuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteValidationRule(schoolId, id);
  }
  async countValidationRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countValidationRules(schoolId, filters);
  }
}
