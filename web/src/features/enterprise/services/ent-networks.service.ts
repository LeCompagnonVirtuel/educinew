// Enterprise Platform Service - Networks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNetworkService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNetwork(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNetworkById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNetworks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNetworks(schoolId, filters);
  }
  async createNetwork(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNetwork(schoolId, data);
  }
  async updateNetwork(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNetworkById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNetwork(schoolId, id, data);
  }
  async deleteNetwork(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworkById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNetwork(schoolId, id);
  }
  async countNetworks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNetworks(schoolId, filters);
  }
}
