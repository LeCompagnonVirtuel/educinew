// Enterprise Platform Service - PoliciesAcknowledgments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPolicyAcknowledgmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPoliciesAcknowledgment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPoliciesAcknowledgmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPoliciesAcknowledgments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPoliciesAcknowledgments(schoolId, filters);
  }
  async createPoliciesAcknowledgment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPoliciesAcknowledgment(schoolId, data);
  }
  async updatePoliciesAcknowledgment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPoliciesAcknowledgmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePoliciesAcknowledgment(schoolId, id, data);
  }
  async deletePoliciesAcknowledgment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPoliciesAcknowledgmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePoliciesAcknowledgment(schoolId, id);
  }
  async countPoliciesAcknowledgments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPoliciesAcknowledgments(schoolId, filters);
  }
}
