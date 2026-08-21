// Enterprise Platform Service - DataRetentionPolicies
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataRetentionPolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataRetentionPolicie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataRetentionPolicieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataRetentionPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataRetentionPolicies(schoolId, filters);
  }
  async createDataRetentionPolicie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataRetentionPolicie(schoolId, data);
  }
  async updateDataRetentionPolicie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataRetentionPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataRetentionPolicie(schoolId, id, data);
  }
  async deleteDataRetentionPolicie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataRetentionPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataRetentionPolicie(schoolId, id);
  }
  async countDataRetentionPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataRetentionPolicies(schoolId, filters);
  }
}
