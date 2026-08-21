// Enterprise Platform Service - PlatformApiKey
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformApiKey, PlatformApiKeyCreate } from '@educi/types';
import { EntPlatformApiKeyNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformApiKeyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformApiKey(schoolId: string, id: string): Promise<PlatformApiKey> {
    const item = await this.repo.findPlatformApiKeyById(schoolId, id);
    if (!item) throw new EntPlatformApiKeyNotFoundError(id);
    return item;
  }
  async listPlatformApiKeys(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformApiKey[]> {
    return this.repo.findAllPlatformApiKeys(schoolId, filters);
  }
  async createPlatformApiKey(schoolId: string, data: PlatformApiKeyCreate): Promise<PlatformApiKey> {
    return this.repo.createPlatformApiKey(schoolId, data);
  }
  async updatePlatformApiKey(schoolId: string, id: string, data: Partial<PlatformApiKeyCreate>): Promise<PlatformApiKey> {
    const existing = await this.repo.findPlatformApiKeyById(schoolId, id);
    if (!existing) throw new EntPlatformApiKeyNotFoundError(id);
    return this.repo.updatePlatformApiKey(schoolId, id, data);
  }
  async deletePlatformApiKey(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformApiKeyById(schoolId, id);
    if (!existing) throw new EntPlatformApiKeyNotFoundError(id);
    return this.repo.deletePlatformApiKey(schoolId, id);
  }
  async countPlatformApiKeys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformApiKeys(schoolId, filters);
  }
}
