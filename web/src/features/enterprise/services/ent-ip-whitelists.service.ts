// Enterprise Platform Service - IpWhitelists
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIpWhitelistService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIpWhitelist(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findIpWhitelistById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listIpWhitelists(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllIpWhitelists(schoolId, filters);
  }
  async createIpWhitelist(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createIpWhitelist(schoolId, data);
  }
  async updateIpWhitelist(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findIpWhitelistById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateIpWhitelist(schoolId, id, data);
  }
  async deleteIpWhitelist(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIpWhitelistById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteIpWhitelist(schoolId, id);
  }
  async countIpWhitelists(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIpWhitelists(schoolId, filters);
  }
}
