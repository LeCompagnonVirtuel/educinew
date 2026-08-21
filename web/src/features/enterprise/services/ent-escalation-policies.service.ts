// Enterprise Platform Service - EscalationPolicies
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEscalationPolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEscalationPolicie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findEscalationPolicieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listEscalationPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllEscalationPolicies(schoolId, filters);
  }
  async createEscalationPolicie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createEscalationPolicie(schoolId, data);
  }
  async updateEscalationPolicie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findEscalationPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateEscalationPolicie(schoolId, id, data);
  }
  async deleteEscalationPolicie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEscalationPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteEscalationPolicie(schoolId, id);
  }
  async countEscalationPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEscalationPolicies(schoolId, filters);
  }
}
