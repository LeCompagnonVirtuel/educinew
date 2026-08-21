// Enterprise Platform Service - DataGovernancePolicies
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGovernancePolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataGovernancePolicie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataGovernancePolicieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataGovernancePolicies(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataGovernancePolicies(schoolId, filters);
  }
  async createDataGovernancePolicie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataGovernancePolicie(schoolId, data);
  }
  async updateDataGovernancePolicie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataGovernancePolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataGovernancePolicie(schoolId, id, data);
  }
  async deleteDataGovernancePolicie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataGovernancePolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataGovernancePolicie(schoolId, id);
  }
  async countDataGovernancePolicies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataGovernancePolicies(schoolId, filters);
  }
}
