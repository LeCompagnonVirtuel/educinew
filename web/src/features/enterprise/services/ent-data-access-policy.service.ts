// Enterprise Platform Service - DataAccessPolicy
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataAccessPolicy, DataAccessPolicyCreate } from '@educi/types';
import { EntDataAccessPolicyNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataAccessPolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataAccessPolicy(schoolId: string, id: string): Promise<DataAccessPolicy> {
    const item = await this.repo.findDataAccessPolicyById(schoolId, id);
    if (!item) throw new EntDataAccessPolicyNotFoundError(id);
    return item;
  }
  async listDataAccessPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<DataAccessPolicy[]> {
    return this.repo.findAllDataAccessPolicys(schoolId, filters);
  }
  async createDataAccessPolicy(schoolId: string, data: DataAccessPolicyCreate): Promise<DataAccessPolicy> {
    return this.repo.createDataAccessPolicy(schoolId, data);
  }
  async updateDataAccessPolicy(schoolId: string, id: string, data: Partial<DataAccessPolicyCreate>): Promise<DataAccessPolicy> {
    const existing = await this.repo.findDataAccessPolicyById(schoolId, id);
    if (!existing) throw new EntDataAccessPolicyNotFoundError(id);
    return this.repo.updateDataAccessPolicy(schoolId, id, data);
  }
  async deleteDataAccessPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataAccessPolicyById(schoolId, id);
    if (!existing) throw new EntDataAccessPolicyNotFoundError(id);
    return this.repo.deleteDataAccessPolicy(schoolId, id);
  }
  async countDataAccessPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataAccessPolicys(schoolId, filters);
  }
}
