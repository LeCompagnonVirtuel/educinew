// Enterprise Platform Service - ProxyConfigs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProxyConfigService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProxyConfig(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findProxyConfigById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listProxyConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllProxyConfigs(schoolId, filters);
  }
  async createProxyConfig(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createProxyConfig(schoolId, data);
  }
  async updateProxyConfig(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findProxyConfigById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateProxyConfig(schoolId, id, data);
  }
  async deleteProxyConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProxyConfigById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteProxyConfig(schoolId, id);
  }
  async countProxyConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProxyConfigs(schoolId, filters);
  }
}
