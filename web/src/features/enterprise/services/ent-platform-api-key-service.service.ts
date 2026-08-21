// Enterprise Platform Service - PlatformApiKey
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformApiKey, PlatformApiKeyCreate } from '@educi/types';
import { EntPlatformApiKeyNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformApiKeyServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformApiKeyService(schoolId: string, id: string): Promise<PlatformApiKey> {
    const item = await this.repo.findPlatformApiKeyServiceById(schoolId, id);
    if (!item) throw new EntPlatformApiKeyNotFoundError(id);
    return item;
  }
  async listPlatformApiKeyServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformApiKey[]> {
    return this.repo.findAllPlatformApiKeyServices(schoolId, filters);
  }
  async createPlatformApiKeyService(schoolId: string, data: PlatformApiKeyCreate): Promise<PlatformApiKey> {
    return this.repo.createPlatformApiKeyService(schoolId, data);
  }
  async updatePlatformApiKeyService(schoolId: string, id: string, data: Partial<PlatformApiKeyCreate>): Promise<PlatformApiKey> {
    const existing = await this.repo.findPlatformApiKeyServiceById(schoolId, id);
    if (!existing) throw new EntPlatformApiKeyNotFoundError(id);
    return this.repo.updatePlatformApiKeyService(schoolId, id, data);
  }
  async deletePlatformApiKeyService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformApiKeyServiceById(schoolId, id);
    if (!existing) throw new EntPlatformApiKeyNotFoundError(id);
    return this.repo.deletePlatformApiKeyService(schoolId, id);
  }
  async countPlatformApiKeyServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformApiKeyServices(schoolId, filters);
  }
}
