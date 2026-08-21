// Enterprise Platform Service - AccessPolicy
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessPolicy, AccessPolicyCreate } from '@educi/types';
import { EntAccessPolicyNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAccessPolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAccessPolicy(schoolId: string, id: string): Promise<AccessPolicy> {
    const item = await this.repo.findAccessPolicyById(schoolId, id);
    if (!item) throw new EntAccessPolicyNotFoundError(id);
    return item;
  }
  async listAccessPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<AccessPolicy[]> {
    return this.repo.findAllAccessPolicys(schoolId, filters);
  }
  async createAccessPolicy(schoolId: string, data: AccessPolicyCreate): Promise<AccessPolicy> {
    return this.repo.createAccessPolicy(schoolId, data);
  }
  async updateAccessPolicy(schoolId: string, id: string, data: Partial<AccessPolicyCreate>): Promise<AccessPolicy> {
    const existing = await this.repo.findAccessPolicyById(schoolId, id);
    if (!existing) throw new EntAccessPolicyNotFoundError(id);
    return this.repo.updateAccessPolicy(schoolId, id, data);
  }
  async deleteAccessPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccessPolicyById(schoolId, id);
    if (!existing) throw new EntAccessPolicyNotFoundError(id);
    return this.repo.deleteAccessPolicy(schoolId, id);
  }
  async countAccessPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccessPolicys(schoolId, filters);
  }
}
