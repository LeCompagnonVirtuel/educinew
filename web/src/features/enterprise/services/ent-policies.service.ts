// Enterprise Platform Service - Policies
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPolicie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPolicieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPolicies(schoolId, filters);
  }
  async createPolicie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPolicie(schoolId, data);
  }
  async updatePolicie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePolicie(schoolId, id, data);
  }
  async deletePolicie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePolicie(schoolId, id);
  }
  async countPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPolicies(schoolId, filters);
  }
}
