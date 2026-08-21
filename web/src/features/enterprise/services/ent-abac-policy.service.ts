// Enterprise Platform Service - AbacPolicy
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AbacPolicy, AbacPolicyCreate } from '@educi/types';
import { EntAbacPolicyNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAbacPolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAbacPolicy(schoolId: string, id: string): Promise<AbacPolicy> {
    const item = await this.repo.findAbacPolicyById(schoolId, id);
    if (!item) throw new EntAbacPolicyNotFoundError(id);
    return item;
  }
  async listAbacPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<AbacPolicy[]> {
    return this.repo.findAllAbacPolicys(schoolId, filters);
  }
  async createAbacPolicy(schoolId: string, data: AbacPolicyCreate): Promise<AbacPolicy> {
    return this.repo.createAbacPolicy(schoolId, data);
  }
  async updateAbacPolicy(schoolId: string, id: string, data: Partial<AbacPolicyCreate>): Promise<AbacPolicy> {
    const existing = await this.repo.findAbacPolicyById(schoolId, id);
    if (!existing) throw new EntAbacPolicyNotFoundError(id);
    return this.repo.updateAbacPolicy(schoolId, id, data);
  }
  async deleteAbacPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAbacPolicyById(schoolId, id);
    if (!existing) throw new EntAbacPolicyNotFoundError(id);
    return this.repo.deleteAbacPolicy(schoolId, id);
  }
  async countAbacPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAbacPolicys(schoolId, filters);
  }
}
