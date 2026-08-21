// Enterprise Platform Service - NetworksPolicies
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNetworkPolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNetworksPolicie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNetworksPolicieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNetworksPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNetworksPolicies(schoolId, filters);
  }
  async createNetworksPolicie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNetworksPolicie(schoolId, data);
  }
  async updateNetworksPolicie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNetworksPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNetworksPolicie(schoolId, id, data);
  }
  async deleteNetworksPolicie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworksPolicieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNetworksPolicie(schoolId, id);
  }
  async countNetworksPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNetworksPolicies(schoolId, filters);
  }
}
