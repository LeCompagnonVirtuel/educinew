// Enterprise Platform Service - PoliciesVersions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPolicyVersionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPoliciesVersion(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPoliciesVersionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPoliciesVersions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPoliciesVersions(schoolId, filters);
  }
  async createPoliciesVersion(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPoliciesVersion(schoolId, data);
  }
  async updatePoliciesVersion(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPoliciesVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePoliciesVersion(schoolId, id, data);
  }
  async deletePoliciesVersion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPoliciesVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePoliciesVersion(schoolId, id);
  }
  async countPoliciesVersions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPoliciesVersions(schoolId, filters);
  }
}
