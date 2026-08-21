// Government & National Governance Service - EducationPolicy
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationPolicy, EducationPolicyCreate } from '@educi/types';
import { GovEducationPolicyNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEducationPolicyService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEducationPolicy(schoolId: string, id: string): Promise<EducationPolicy> {
    const item = await this.repo.findEducationPolicyById(schoolId, id);
    if (!item) throw new GovEducationPolicyNotFoundError(id);
    return item;
  }

  async listEducationPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<EducationPolicy[]> {
    return this.repo.findAllEducationPolicies(schoolId, filters);
  }

  async createEducationPolicy(schoolId: string, data: EducationPolicyCreate): Promise<EducationPolicy> {
    return this.repo.createEducationPolicy(schoolId, data);
  }

  async updateEducationPolicy(schoolId: string, id: string, data: Partial<EducationPolicyCreate>): Promise<EducationPolicy> {
    const existing = await this.repo.findEducationPolicyById(schoolId, id);
    if (!existing) throw new GovEducationPolicyNotFoundError(id);
    return this.repo.updateEducationPolicy(schoolId, id, data);
  }

  async deleteEducationPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationPolicyById(schoolId, id);
    if (!existing) throw new GovEducationPolicyNotFoundError(id);
    return this.repo.deleteEducationPolicy(schoolId, id);
  }

  async countEducationPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEducationPolicies(schoolId, filters);
  }
}
