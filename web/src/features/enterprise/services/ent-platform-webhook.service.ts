// Enterprise Platform Service - PlatformWebhook
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformWebhook, PlatformWebhookCreate } from '@educi/types';
import { EntPlatformWebhookNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformWebhookService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformWebhook(schoolId: string, id: string): Promise<PlatformWebhook> {
    const item = await this.repo.findPlatformWebhookById(schoolId, id);
    if (!item) throw new EntPlatformWebhookNotFoundError(id);
    return item;
  }
  async listPlatformWebhooks(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformWebhook[]> {
    return this.repo.findAllPlatformWebhooks(schoolId, filters);
  }
  async createPlatformWebhook(schoolId: string, data: PlatformWebhookCreate): Promise<PlatformWebhook> {
    return this.repo.createPlatformWebhook(schoolId, data);
  }
  async updatePlatformWebhook(schoolId: string, id: string, data: Partial<PlatformWebhookCreate>): Promise<PlatformWebhook> {
    const existing = await this.repo.findPlatformWebhookById(schoolId, id);
    if (!existing) throw new EntPlatformWebhookNotFoundError(id);
    return this.repo.updatePlatformWebhook(schoolId, id, data);
  }
  async deletePlatformWebhook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformWebhookById(schoolId, id);
    if (!existing) throw new EntPlatformWebhookNotFoundError(id);
    return this.repo.deletePlatformWebhook(schoolId, id);
  }
  async countPlatformWebhooks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformWebhooks(schoolId, filters);
  }
}
