// Enterprise Platform Service - AutoScalingPolicies
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAutoScalingPolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAutoScalingPolicie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAutoScalingPolicieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAutoScalingPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAutoScalingPolicies(schoolId, filters);
  }
  async createAutoScalingPolicie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAutoScalingPolicie(schoolId, data);
  }
  async updateAutoScalingPolicie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAutoScalingPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAutoScalingPolicie(schoolId, id, data);
  }
  async deleteAutoScalingPolicie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAutoScalingPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAutoScalingPolicie(schoolId, id);
  }
  async countAutoScalingPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAutoScalingPolicies(schoolId, filters);
  }
}
