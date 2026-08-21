// Enterprise Platform Service - ZeroTrustPolicy
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ZeroTrustPolicy, ZeroTrustPolicyCreate } from '@educi/types';
import { EntZeroTrustPolicyNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntZeroTrustPolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getZeroTrustPolicy(schoolId: string, id: string): Promise<ZeroTrustPolicy> {
    const item = await this.repo.findZeroTrustPolicyById(schoolId, id);
    if (!item) throw new EntZeroTrustPolicyNotFoundError(id);
    return item;
  }
  async listZeroTrustPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<ZeroTrustPolicy[]> {
    return this.repo.findAllZeroTrustPolicys(schoolId, filters);
  }
  async createZeroTrustPolicy(schoolId: string, data: ZeroTrustPolicyCreate): Promise<ZeroTrustPolicy> {
    return this.repo.createZeroTrustPolicy(schoolId, data);
  }
  async updateZeroTrustPolicy(schoolId: string, id: string, data: Partial<ZeroTrustPolicyCreate>): Promise<ZeroTrustPolicy> {
    const existing = await this.repo.findZeroTrustPolicyById(schoolId, id);
    if (!existing) throw new EntZeroTrustPolicyNotFoundError(id);
    return this.repo.updateZeroTrustPolicy(schoolId, id, data);
  }
  async deleteZeroTrustPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findZeroTrustPolicyById(schoolId, id);
    if (!existing) throw new EntZeroTrustPolicyNotFoundError(id);
    return this.repo.deleteZeroTrustPolicy(schoolId, id);
  }
  async countZeroTrustPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countZeroTrustPolicys(schoolId, filters);
  }
}
